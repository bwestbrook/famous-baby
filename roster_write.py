#!/usr/bin/env python3
"""
roster_write.py — turn the picked candidates into data.js entries.

    python3 roster_write.py --dry      # print what it would add
    python3 roster_write.py            # append them to data.js

Everything written here comes from Wikidata: name, date of birth, birthplace,
occupations. Nothing is remembered or inferred. The bio is deliberately a plain
factual line rather than the editorial prose the older entries carry — a bio
that reads well and is quietly wrong is worse than a short one that's right,
and bios are their own pass.

Entries are appended just before the `.filter(p => p.field !== '__skip__')`
that closes the PEOPLE array — the array does not end with a bare `]`.
"""

from __future__ import annotations
import json
import pathlib
import re
import sys
import unicodedata

GENDER_MAP = {
    'male': 'male', 'female': 'female',
    'trans woman': 'female', 'trans man': 'male',
    'non-binary': 'nonbinary', 'genderqueer': 'nonbinary',
    'intersex': 'nonbinary',
}


def esc(s: str) -> str:
    """Single-quoted JS string body."""
    return (s or '').replace('\\', '\\\\').replace("'", "\\'")


def unique_id(base: str, taken: set[str]) -> str:
    slug = base or 'unnamed'
    if slug not in taken:
        return slug
    n = 2
    while f'{slug}-{n}' in taken:
        n += 1
    return f'{slug}-{n}'


def occupation_phrase(occs: str) -> str:
    """The first couple of occupations, tidied into a sentence fragment."""
    parts = [p.strip() for p in (occs or '').split(';') if p.strip()]
    # Drop the ones that say nothing about a person.
    parts = [p for p in parts if p.lower() not in
             {'writer', 'politician', 'artist', 'scientist', 'lawyer', 'model',
              'university teacher', 'businessperson', 'teacher'}] or parts
    if not parts:
        return ''
    picked = parts[:2]
    phrase = picked[0]
    if len(picked) > 1:
        phrase += ' and ' + picked[1]
    return phrase[0].upper() + phrase[1:]


def entry_source(p: dict, pid: str) -> str:
    year = p['birthYear']
    month = day = None
    m = re.match(r'^-?\d{4}-(\d{2})-(\d{2})', p['birth'] or '')
    if m:
        month, day = int(m.group(1)), int(m.group(2))
        if month == 0 or day == 0:
            month = day = None
    place = p['birthPlace'] or p['country']
    birth_place = f"{place}, {p['country']}" if place != p['country'] else place

    bits = [f"Born in {birth_place}"]
    if year is not None:
        bits.append(f"in {year} BC" if year < 0 else f"in {year}")
    phrase = occupation_phrase(p['occupations'])
    bio = ', '.join(bits) + '.'
    if phrase:
        bio += f' {phrase}.'

    gender = GENDER_MAP.get((p.get('gender') or '').lower(), 'male')
    fields = [
        f"id:'{esc(pid)}'",
        f"name:'{esc(p['name'])}'",
        "middleName:''",
        f"gender:'{gender}'",
        f"birthYear:{year if year is not None else 'null'}",
    ]
    if month:
        fields.append(f'birthMonth:{month}')
        fields.append(f'birthDay:{day}')
    fields += [
        f"birthPlace:'{esc(birth_place)}'",
        f"country:'{esc(p['country'])}'",
        f"field:'{esc(p['field'])}'",
        f"subfield:'{esc(p['subfield'])}'",
        'teams:[]', 'awards:[]', 'collaborators:[]',
        f"bio:'{esc(bio)}'",
    ]
    return '  { ' + ', '.join(fields) + ' },'


def main() -> int:
    repo = pathlib.Path(__file__).parent
    dry = '--dry' in sys.argv
    picks = json.loads((repo / 'roster_picks.json').read_text(encoding='utf-8'))
    data_path = repo / 'data.js'
    src = data_path.read_text(encoding='utf-8')

    taken = set(re.findall(r"id:'([^']+)'", src))
    have_countries = set(re.findall(r"country:[\"']([^\"']+)[\"']", src))

    lines, added = [], []
    for p in sorted(picks, key=lambda x: x['country']):
        if p['country'] in have_countries:
            continue                       # somebody already covers it
        if p['birthYear'] is None:
            continue
        pid = unique_id(p['id'], taken)
        taken.add(pid)
        lines.append(entry_source(p, pid))
        added.append((p['country'], p['name'], pid))

    print(f'{len(added)} entries to add, {len(picks) - len(added)} skipped\n')
    for country, name, pid in added[:6]:
        print(f'  {country:24s} {name}  ({pid})')
    if len(added) > 6:
        print(f'  … and {len(added) - 6} more')

    if dry:
        print('\n(dry run)')
        print(lines[0] if lines else '')
        return 0

    marker = "].filter(p => p.field !== '__skip__');"
    if marker not in src:
        print('could not find the end of the PEOPLE array', file=sys.stderr)
        return 1
    block = ('\n  // ---- Breadth pass: one person for every country the globe draws.\n'
             '  //      Sourced from Wikidata (see roster_candidates.py); bios are\n'
             '  //      deliberately plain and factual until the bio pass reaches them.\n'
             + '\n'.join(lines) + '\n')
    src = src.replace(marker, block + marker, 1)
    data_path.write_text(src, encoding='utf-8')
    print(f'\nappended {len(added)} entries to data.js')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
