#!/usr/bin/env python3
"""
roster_deaths.py — record when people died, so the living can be told apart.

    python3 roster_deaths.py --dry
    python3 roster_deaths.py

Adds `deathYear` to any entry Wikidata has a date of death for. Absence is
meaningful and is left absent: for anyone born within living memory it means
still here, and for anyone older it means nobody recorded it. Writing a guess
either way would be worse than the gap.

Matched on name and birth year together. Name alone resolves "John Williams"
to whichever John Williams ranks highest, and killing off the wrong one is a
particularly bad way to be wrong.
"""

from __future__ import annotations
import pathlib
import re
import sys
import time

from roster_candidates import ask
from roster_pick import _fold

Q = """
SELECT ?nm ?birth ?death WHERE {
  VALUES ?nm { %s }
  ?person rdfs:label|skos:altLabel ?nm .
  ?person wdt:P31 wd:Q5 ; wdt:P569 ?birth ; wdt:P570 ?death .
}
"""


def year_of(stamp: str) -> int | None:
    if not stamp:
        return None
    neg = stamp.startswith('-')
    digits = stamp[1:5] if neg else stamp[:4]
    if not digits.isdigit():
        return None
    return -int(digits) if neg else int(digits)


def main() -> int:
    repo = pathlib.Path(__file__).parent
    dry = '--dry' in sys.argv
    src = (repo / 'data.js').read_text(encoding='utf-8')

    # id, name and birth year straight off each entry, in file order.
    entries = []
    for m in re.finditer(r"\{\s*id:['\"]([^'\"]+)['\"],\s*name:['\"]((?:[^'\"\\]|\\.)*)['\"]", src):
        head = src[m.start():m.start() + 400]
        by = re.search(r"birthYear:(-?\d+)", head)
        dy = re.search(r"deathYear:(-?\d+)", head)
        if not by or dy:
            continue                      # no birth year to match on, or already done
        entries.append({'id': m.group(1), 'name': m.group(2).replace("\\'", "'"),
                        'birthYear': int(by.group(1)), 'at': m.start()})
    print(f'{len(entries)} entries to check\n')

    deaths: dict[str, int] = {}
    for i in range(0, len(entries), 40):
        chunk = entries[i:i + 40]
        vals = ' '.join('"%s"@en' % e['name'].replace('\\', '').replace('"', '') for e in chunk)
        try:
            rows = ask(Q % vals)
        except Exception as e:  # noqa: BLE001
            print(f'  batch {i // 40 + 1}: {type(e).__name__}')
            continue
        want = {e['name']: e for e in chunk}
        for b in rows:
            e = want.get(b['nm']['value'])
            if not e:
                continue
            # Same name, same birth year, or it is somebody else entirely.
            if year_of(b['birth']['value']) != e['birthYear']:
                continue
            d = year_of(b['death']['value'])
            if d is not None and d >= e['birthYear']:
                deaths[e['id']] = d
        print(f'  batch {i // 40 + 1}: {len(deaths)} deaths recorded')
        time.sleep(1.1)

    print(f'\n{len(deaths)} of {len(entries)} have a recorded date of death')
    if dry:
        for e in entries[:10]:
            if e['id'] in deaths:
                print(f"   {e['name'][:28]:29} {e['birthYear']} – {deaths[e['id']]}")
        return 0

    # Insert deathYear straight after birthYear, so the field sits where a
    # reader expects it and the file stays diffable.
    out, n = [], 0
    pos = 0
    for e in sorted(entries, key=lambda x: x['at']):
        if e['id'] not in deaths:
            continue
        head_end = src.index('}', e['at'])
        seg = src[e['at']:head_end]
        m = re.search(r"birthYear:(-?\d+)", seg)
        if not m:
            continue
        cut = e['at'] + m.end()
        out.append(src[pos:cut])
        out.append(f", deathYear:{deaths[e['id']]}")
        pos = cut
        n += 1
    out.append(src[pos:])
    (repo / 'data.js').write_text(''.join(out), encoding='utf-8')
    print(f'wrote deathYear onto {n} entries')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
