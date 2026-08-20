#!/usr/bin/env python3
"""
roster_candidates.py — find someone worth adding for every country on the map.

    node roster_missing.mjs                 # writes roster_missing.json
    python3 roster_candidates.py            # writes roster_candidates.json

For each country the globe draws but the roster has nobody from, ask Wikidata
for the best-known people *born there*, and write them out for review. Nothing
is invented: every candidate carries a Wikidata id, a birth date, a birthplace
and an English Wikipedia article, and the fetcher checks the birth year against
that article's opening paragraph before it will keep a photo.

Born there, not a citizen of there. Citizenship pulls in anyone naturalised —
asking Wikidata for famous Peruvians by citizenship offers a pope born in
Chicago. Place of birth, and the country that place is in, is the question the
site actually asks.

Countries are keyed by ISO 3166-1 numeric, which the atlas carries for 174 of
its 177 shapes, rather than by name: "Bosnia and Herz.", "Côte d'Ivoire" and
"eSwatini" have no chance of matching a Wikidata label by string.
"""

from __future__ import annotations
import json
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ENDPOINT = 'https://query.wikidata.org/sparql'
UA = ('famous-baby/1.0 (https://github.com/bwestbrook/famous-baby; '
      'roster expansion) Python/urllib')

# ISO 3166-1 numeric (P299) -> country item, for the shapes the atlas numbers.
# An ISO numeric outlives the state that was issued it: 112 belongs to Belarus
# and also to the Byelorussian Soviet Socialist Republic, 704 to Vietnam and to
# North Vietnam. Both come back, the loop below keeps whichever arrived last,
# and asking for people born in a country that stopped existing in 1991 returns
# nobody at all — which reads exactly like "this country has no famous people"
# and is how Belarus, Benin, Djibouti and Vanuatu all came back empty.
#
# So: no item that carries a dissolution date, and where a code still has more
# than one claimant, prefer the one that is a sovereign state today.
ISO_TO_QID = """
SELECT ?iso ?country ?countryLabel WHERE {
  VALUES ?iso { %s }
  ?country wdt:P299 ?iso .
  FILTER NOT EXISTS { ?country wdt:P576 ?dissolved }
  FILTER NOT EXISTS { ?country wdt:P582 ?ended }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
"""

# The best-known people born in a country. Grouped so one row is one person
# however many occupations they have, and ordered by sitelink count — the
# nearest thing Wikidata has to "how widely is this person known".
CANDIDATES = """
SELECT ?person ?personLabel ?birth ?birthPlaceLabel ?sitelinks ?article ?genderLabel
       (GROUP_CONCAT(DISTINCT ?occLabel; separator="; ") AS ?occs) WHERE {
  ?person wdt:P31 wd:Q5 ;
          wdt:P19 ?bp ;
          wdt:P569 ?birth ;
          wikibase:sitelinks ?sitelinks .
  ?bp wdt:P17 wd:%s .
  ?article schema:about ?person ; schema:isPartOf <https://en.wikipedia.org/> .
  OPTIONAL { ?person wdt:P106 ?occ . ?occ rdfs:label ?occLabel FILTER(lang(?occLabel)="en") }
  OPTIONAL { ?person wdt:P21 ?gender . ?gender rdfs:label ?genderLabel FILTER(lang(?genderLabel)="en") }
  OPTIONAL { ?bp rdfs:label ?birthPlaceLabel FILTER(lang(?birthPlaceLabel)="en") }
  ?person rdfs:label ?personLabel FILTER(lang(?personLabel)="en")
}
GROUP BY ?person ?personLabel ?birth ?birthPlaceLabel ?sitelinks ?article ?genderLabel
ORDER BY DESC(?sitelinks)
LIMIT %d
"""


def ask(query: str, tries: int = 3) -> list[dict]:
    """POST the query (they get long) and hand back the bindings."""
    body = urllib.parse.urlencode({'query': query, 'format': 'json'}).encode()
    req = urllib.request.Request(
        ENDPOINT, data=body,
        headers={'User-Agent': UA,
                 'Accept': 'application/sparql-results+json',
                 'Content-Type': 'application/x-www-form-urlencoded'})
    last: Exception | None = None
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.loads(r.read().decode('utf-8'))['results']['bindings']
        except Exception as e:  # noqa: BLE001
            last = e
            # The query service throttles hard; give it room rather than
            # hammering it into a longer ban.
            time.sleep(5 * (attempt + 1))
    raise last if last else RuntimeError('query failed')


def resolve_countries(isos: list[int]) -> dict[int, tuple[str, str]]:
    """ISO numeric -> (qid, label). Asked in chunks; some codes have no item."""
    out: dict[int, tuple[str, str]] = {}
    for i in range(0, len(isos), 60):
        chunk = isos[i:i + 60]
        # P299 is a string property, zero-padded to three digits.
        values = ' '.join(f'"{n:03d}"' for n in chunk)
        for b in ask(ISO_TO_QID % values):
            qid = b['country']['value'].rsplit('/', 1)[-1]
            iso = int(b['iso']['value'])
            # First claimant wins rather than last. With the dissolved states
            # filtered out there is normally only one, but a tie must not be
            # settled by result order.
            out.setdefault(iso, (qid, b['countryLabel']['value']))
        time.sleep(1)
    return out


def main() -> int:
    repo = pathlib.Path(__file__).parent
    missing = json.loads((repo / 'roster_missing.json').read_text(encoding='utf-8'))
    per = int(sys.argv[1]) if len(sys.argv) > 1 else 12

    numbered = [m for m in missing if m.get('iso')]
    print(f'{len(missing)} countries with nobody; {len(numbered)} carry an ISO code\n')

    print('resolving country items…')
    qids = resolve_countries([int(m['iso']) for m in numbered])
    print(f'  resolved {len(qids)}/{len(numbered)}\n')

    out = []
    for n, m in enumerate(numbered, 1):
        iso = int(m['iso'])
        if iso not in qids:
            print(f'  {m["atlas"]:26s} no Wikidata item for ISO {iso}')
            continue
        qid, label = qids[iso]
        try:
            rows = ask(CANDIDATES % (qid, per))
        except Exception as e:  # noqa: BLE001
            print(f'  {m["atlas"]:26s} FAILED {type(e).__name__}')
            continue
        people = []
        seen = set()
        for b in rows:
            pid = b['person']['value'].rsplit('/', 1)[-1]
            if pid in seen:
                continue
            seen.add(pid)
            people.append({
                'qid': pid,
                'name': b['personLabel']['value'],
                'birth': b['birth']['value'][:10],
                'birthPlace': b.get('birthPlaceLabel', {}).get('value', ''),
                'gender': b.get('genderLabel', {}).get('value', ''),
                'occupations': b['occs']['value'],
                'sitelinks': int(b['sitelinks']['value']),
                'article': urllib.parse.unquote(b['article']['value'].rsplit('/', 1)[-1]).replace('_', ' '),
            })
        out.append({'atlas': m['atlas'], 'country': m['mapped'], 'iso': iso,
                    'qid': qid, 'wikidataLabel': label, 'candidates': people})
        print(f'  [{n:3d}/{len(numbered)}] {m["atlas"]:26s} {len(people):2d} candidates'
              f'  top: {people[0]["name"] if people else "—"}')
        time.sleep(1.2)      # be a good citizen of a free query service

    (repo / 'roster_candidates.json').write_text(json.dumps(out, indent=1, ensure_ascii=False) + '\n',
                                                 encoding='utf-8')
    filled = sum(1 for c in out if c['candidates'])
    print(f'\nwrote roster_candidates.json — {filled}/{len(out)} countries have someone')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
