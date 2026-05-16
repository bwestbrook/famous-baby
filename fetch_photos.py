#!/usr/bin/env python3
"""
fetch_photos.py — download Wikimedia photos for entries by ID.

Usage:
    python3 fetch_photos.py                # downloads the 10 default entries
    python3 fetch_photos.py id1=Wiki_Title id2=Other_Title  # custom set

Output: ./photos/<id>.<ext> for each entry it can resolve.

Skips files that already exist. Safe to rerun.
"""

from __future__ import annotations
import json
import pathlib
import sys
import urllib.parse
import urllib.request

USER_AGENT = 'famous-baby/1.0 (https://github.com/benjaminwestbrook/famous-baby) Python/urllib'

# Default 10-entry set: 5 pre-1950, 5 post-1950. Pair entry-id ↔ Wikipedia title.
DEFAULTS: list[tuple[str, str]] = [
    # pre-1950
    ('ada-lovelace',      'Ada_Lovelace'),
    ('marie-curie',       'Marie_Curie'),
    ('einstein',          'Albert_Einstein'),
    ('emmy-noether',      'Emmy_Noether'),
    ('frida-kahlo',       'Frida_Kahlo'),
    # post-1950
    ('michael-jordan',    'Michael_Jordan'),
    ('beyonce',           'Beyoncé'),
    ('stephen-curry',     'Stephen_Curry'),
    ('taylor-swift',      'Taylor_Swift'),
    ('greta-thunberg',    'Greta_Thunberg'),
]


def fetch_image_url(wiki_title: str) -> str | None:
    """Hit the Wikipedia REST summary endpoint and return the original-image URL."""
    api = f'https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(wiki_title)}'
    req = urllib.request.Request(api, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read().decode('utf-8'))
    thumb = data.get('originalimage') or data.get('thumbnail')
    return thumb.get('source') if thumb else None


def download(entry_id: str, wiki_title: str, out_dir: pathlib.Path) -> tuple[str, str]:
    # Skip if already present (any extension).
    existing = list(out_dir.glob(f'{entry_id}.*'))
    if existing:
        return entry_id, f'SKIP (exists: {existing[0].name})'

    try:
        img_url = fetch_image_url(wiki_title)
        if not img_url:
            return entry_id, 'NO_IMAGE in summary'
        # Always save as .jpg regardless of source extension — the site's <img>
        # tag points at `<id>.jpg`, and browsers will sniff and render whatever
        # bytes are there (PNG, WebP, etc.) so the lookup stays deterministic.
        dest = out_dir / f'{entry_id}.jpg'
        req = urllib.request.Request(img_url, headers={'User-Agent': USER_AGENT})
        with urllib.request.urlopen(req, timeout=30) as r:
            dest.write_bytes(r.read())
        size_kb = dest.stat().st_size / 1024
        return entry_id, f'OK  {dest.name} ({size_kb:.0f} KB)'
    except Exception as e:  # noqa: BLE001
        return entry_id, f'ERROR {type(e).__name__}: {e}'


def parse_args(argv: list[str]) -> list[tuple[str, str]]:
    """If args are given, expect `id=Wiki_Title` pairs; otherwise return defaults."""
    if not argv:
        return DEFAULTS
    pairs: list[tuple[str, str]] = []
    for a in argv:
        if '=' not in a:
            print(f'  ignoring (bad format): {a!r}', file=sys.stderr)
            continue
        eid, title = a.split('=', 1)
        pairs.append((eid.strip(), title.strip()))
    return pairs


def main() -> int:
    out_dir = pathlib.Path(__file__).parent / 'photos'
    out_dir.mkdir(exist_ok=True)

    targets = parse_args(sys.argv[1:])
    print(f'Fetching {len(targets)} image(s) → {out_dir}\n')

    results = [download(eid, title, out_dir) for eid, title in targets]

    for eid, status in results:
        print(f'  {eid:24s}  {status}')

    n_ok = sum(1 for _, s in results if s.startswith('OK'))
    n_skip = sum(1 for _, s in results if s.startswith('SKIP'))
    n_err = sum(1 for _, s in results if 'ERROR' in s or 'NO_IMAGE' in s)
    print(f'\nDone: {n_ok} downloaded, {n_skip} already present, {n_err} failed.')
    return 0 if n_err == 0 else 1


if __name__ == '__main__':
    raise SystemExit(main())
