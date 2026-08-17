#!/usr/bin/env python3
"""
roster_deepen.py — fill a region out to several people per country.

    node roster_missing.mjs            # or hand-write roster_missing.json
    python3 roster_candidates.py 22    # harvest deep candidate lists
    python3 roster_deepen.py 5 --dry   # what it would add
    python3 roster_deepen.py 5         # append to data.js

The breadth pass gave every country one face. This gives a region enough of
them for the slideshow to be a slideshow. It reuses the classifier and the
blocklist from roster_pick.py rather than keeping a second copy — one place
decides what a person's field is, and one list decides who is left out.

Anyone already in the roster is skipped, by Wikidata id and by name, so this
can be run again as coverage grows without making a second Kwame Nkrumah.
"""

from __future__ import annotations
import json
import pathlib
import re
import sys

from roster_pick import BLOCKED, FIELD_WEIGHT, _fold, classify, parse_year, slug
from roster_write import entry_source, unique_id


def main() -> int:
    repo = pathlib.Path(__file__).parent
    per = next((int(a) for a in sys.argv[1:] if a.isdigit()), 5)
    dry = '--dry' in sys.argv

    data_path = repo / 'data.js'
    src = data_path.read_text(encoding='utf-8')
    taken_ids = set(re.findall(r"id:['\"]([^'\"]+)['\"]", src))
    taken_names = {_fold(n) for n in re.findall(r"name:['\"]([^'\"]+)['\"]", src)}
    counts: dict[str, int] = {}
    for c in re.findall(r"country:['\"]([^'\"]+)['\"]", src):
        counts[c] = counts.get(c, 0) + 1

    data = json.loads((repo / 'roster_candidates.json').read_text(encoding='utf-8'))
    lines, added = [], []
    for entry in data:
        country = entry['country']
        want = max(0, per - counts.get(country, 0))
        if not want:
            continue
        scored = []
        for c in entry['candidates']:
            name = c['article'] or c['name']
            if _fold(name) in BLOCKED or _fold(c['name']) in BLOCKED:
                continue
            if _fold(name) in taken_names:          # already in the roster
                continue
            year = parse_year(c['birth'])
            if year is None:
                continue
            field, subfield = classify(c['occupations'])
            scored.append((c['sitelinks'] * FIELD_WEIGHT.get(field, 1.0), field, subfield, c, name, year))
        scored.sort(key=lambda t: -t[0])

        for _, field, subfield, c, name, year in scored[:want]:
            pid = unique_id(slug(name), taken_ids)
            taken_ids.add(pid)
            taken_names.add(_fold(name))
            pick = {
                'country': country, 'id': pid, 'name': name,
                'birth': c['birth'], 'birthYear': year,
                'birthPlace': c['birthPlace'], 'gender': c['gender'],
                'field': field, 'subfield': subfield, 'occupations': c['occupations'],
            }
            lines.append(entry_source(pick, pid))
            added.append((country, name, pid, field))

    by_country: dict[str, int] = {}
    for country, *_ in added:
        by_country[country] = by_country.get(country, 0) + 1
    print(f'{len(added)} entries across {len(by_country)} countries '
          f'(target {per} each)\n')
    for country in sorted(by_country):
        print(f'  {country:26s} +{by_country[country]}')

    if dry:
        print('\n(dry run)')
        return 0

    marker = "].filter(p => p.field !== '__skip__');"
    if marker not in src:
        print('could not find the end of the PEOPLE array', file=sys.stderr)
        return 1
    block = (f'\n  // ---- Depth pass: {len(added)} more, sourced the same way as the\n'
             '  //      breadth pass (Wikidata, born in the country, ranked by\n'
             '  //      sitelinks and weighted away from heads of state).\n'
             + '\n'.join(lines) + '\n')
    data_path.write_text(src.replace(marker, block + marker, 1), encoding='utf-8')
    print(f'\nappended {len(added)} entries to data.js')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
