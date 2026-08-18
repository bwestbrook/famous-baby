#!/usr/bin/env python3
"""
roster_modern.py — add people born since a given year.

    python3 roster_modern.py 1990 100 --dry
    python3 roster_modern.py 1990 100

The roster reaches every country now, but it leans old: the breadth pass took
whoever a country is best known for, and that is usually somebody long dead.
A naming almanac needs the other end too — the names being given to children
now are the ones carried by people who are famous now.

Asked of Wikidata the same way as everything else: humans born on or after the
year given, with an English Wikipedia article, ranked by sitelinks and weighted
by field so the list isn't all footballers. Country comes from place of birth,
mapped onto the roster's own country names.
"""

from __future__ import annotations
import json
import pathlib
import re
import sys

from roster_candidates import ask
from roster_pick import BLOCKED, FIELD_WEIGHT, _fold, classify, parse_year, slug
from roster_write import entry_source, unique_id

MODERN = """
SELECT ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?article ?genderLabel
       (GROUP_CONCAT(DISTINCT ?occLabel; separator="; ") AS ?occs) WHERE {
  ?person wdt:P31 wd:Q5 ;
          wdt:P569 ?birth ;
          wdt:P19 ?bp ;
          wikibase:sitelinks ?sitelinks .
  FILTER(?sitelinks >= %d)
  FILTER(?birth >= "%d-01-01"^^xsd:dateTime)
  FILTER(?birth < "2012-01-01"^^xsd:dateTime)
  ?bp wdt:P17 ?country .
  ?article schema:about ?person ; schema:isPartOf <https://en.wikipedia.org/> .
  OPTIONAL { ?person wdt:P106 ?occ . ?occ rdfs:label ?occLabel FILTER(lang(?occLabel)="en") }
  OPTIONAL { ?person wdt:P21 ?g . ?g rdfs:label ?genderLabel FILTER(lang(?genderLabel)="en") }
  OPTIONAL { ?bp rdfs:label ?birthPlaceLabel FILTER(lang(?birthPlaceLabel)="en") }
  ?country rdfs:label ?countryLabel FILTER(lang(?countryLabel)="en")
  ?person rdfs:label ?personLabel FILTER(lang(?personLabel)="en")
}
GROUP BY ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?article ?genderLabel
ORDER BY DESC(?sitelinks)
LIMIT %d
"""


def country_aliases(repo: pathlib.Path) -> dict[str, str]:
    """The globe's own name map, read out of app.js rather than copied."""
    app = (repo / 'app.js').read_text(encoding='utf-8')
    start = app.index('const GEO_NAME_ALIASES')
    block = app[start:app.index('};', start)]
    out = dict(re.findall(r"'([^']+)':\s*'([^']+)'", block))
    # Wikidata's own spellings for the same places.
    out.update({
        'United States of America': 'USA', 'United Kingdom': 'UK',
        'Kingdom of the Netherlands': 'Netherlands',
        'Democratic Republic of the Congo': 'DR Congo',
        'Republic of the Congo': 'Congo',
        'Czech Republic': 'Czechia', 'Republic of Ireland': 'Ireland',
        'Kingdom of Denmark': 'Denmark', "People's Republic of China": 'China',
        'Republic of Korea': 'South Korea', 'Ivory Coast': "Côte d'Ivoire",
        'Cape Verde': 'Cabo Verde', 'Timor-Leste': 'East Timor',
    })
    return out


def main() -> int:
    repo = pathlib.Path(__file__).parent
    nums = [int(a) for a in sys.argv[1:] if a.isdigit()]
    since = nums[0] if nums else 1990
    want = nums[1] if len(nums) > 1 else 100
    dry = '--dry' in sys.argv

    aliases = country_aliases(repo)
    src = (repo / 'data.js').read_text(encoding='utf-8')
    taken_ids = set(re.findall(r"id:['\"]([^'\"]+)['\"]", src))
    taken_names = {_fold(n) for n in re.findall(r"name:['\"]([^'\"]+)['\"]", src)}
    known_countries = set(re.findall(r"country:['\"]([^'\"]+)['\"]", src))

    print(f'asking Wikidata for people born {since} or later…')
    # The floor is what makes this query finish at all: without it the service
    # walks every human with a birth date and times out. Raised until it
    # returns, then the field weighting sorts what comes back.
    rows = []
    for floor, mult in ((70, 4), (55, 3), (45, 2)):
        try:
            rows = ask(MODERN % (floor, since, want * mult))
            print(f'  sitelinks floor {floor}: {len(rows)} rows')
            if len(rows) >= want * 2:
                break
        except Exception as e:  # noqa: BLE001
            print(f'  sitelinks floor {floor}: {type(e).__name__}, trying a higher one')
    if not rows:
        print('the query service would not answer; try again in a minute', file=sys.stderr)
        return 1
    print(f'  {len(rows)} candidates back\n')

    scored = []
    seen = set()
    for b in rows:
        name = re.sub(r'_', ' ', b['article']['value'].rsplit('/', 1)[-1])
        from urllib.parse import unquote
        name = unquote(name)
        if name in seen:
            continue
        seen.add(name)
        fold = _fold(name)
        if fold in BLOCKED or fold in taken_names:
            continue
        # Exact match isn't enough: the roster files Beyoncé under "Beyoncé
        # Knowles", so the bare stage name sails past and you get her twice.
        # Treat one name as the other if either is the whole opening of it.
        if any(t.startswith(fold + ' ') or fold.startswith(t + ' ') for t in taken_names):
            continue
        year = parse_year(b['birth']['value'])
        if year is None:
            continue
        raw_country = b['countryLabel']['value']
        country = aliases.get(raw_country, raw_country)
        # Don't invent a country the globe has never heard of.
        if country not in known_countries:
            continue
        field, subfield = classify(b['occs']['value'])
        scored.append((int(b['sitelinks']['value']) * FIELD_WEIGHT.get(field, 1.0), {
            'country': country, 'name': name,
            'birth': b['birth']['value'], 'birthYear': year,
            'birthPlace': b.get('birthPlaceLabel', {}).get('value', ''),
            'gender': b.get('genderLabel', {}).get('value', ''),
            'field': field, 'subfield': subfield,
            'occupations': b['occs']['value'],
        }))
    scored.sort(key=lambda t: -t[0])

    lines, added = [], []
    per_country: dict[str, int] = {}
    for _, p in scored:
        if len(added) >= want:
            break
        # No more than a handful from any one country, or the whole list is
        # American pop singers and English footballers.
        if per_country.get(p['country'], 0) >= 6:
            continue
        pid = unique_id(slug(p['name']), taken_ids)
        taken_ids.add(pid)
        taken_names.add(_fold(p['name']))
        per_country[p['country']] = per_country.get(p['country'], 0) + 1
        lines.append(entry_source(p, pid))
        added.append((p['country'], p['name'], p['birthYear'], p['field'], pid))

    by_field: dict[str, int] = {}
    for *_, field, _pid in added:
        by_field[field] = by_field.get(field, 0) + 1
    print(f'{len(added)} to add, across {len(per_country)} countries')
    print('  ' + '  '.join(f'{f}:{n}' for f, n in sorted(by_field.items(), key=lambda kv: -kv[1])))
    print()
    for country, name, year, field, _ in added[:8]:
        print(f'  {country:16s} {name[:26]:27} {year}  {field}')
    if len(added) > 8:
        print(f'  … and {len(added) - 8} more')

    if dry:
        print('\n(dry run)')
        return 0

    marker = "].filter(p => p.field !== '__skip__');"
    block = (f'\n  // ---- Modern pass: {len(added)} people born {since} or later, so the\n'
             '  //      roster carries the names being given now and not only the\n'
             '  //      ones a country is remembered for.\n' + '\n'.join(lines) + '\n')
    (repo / 'data.js').write_text(src.replace(marker, block + marker, 1), encoding='utf-8')
    print(f'\nappended {len(added)} entries to data.js')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
