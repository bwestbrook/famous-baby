#!/usr/bin/env python3
"""
fetch_photos.py — download Wikimedia photos for entries by ID.

Usage:
    python3 fetch_photos.py                # downloads the default set
    python3 fetch_photos.py id1=Wiki_Title id2=Other_Title  # custom set
    python3 fetch_photos.py --width 900 …  # bigger thumbnails
    python3 fetch_photos.py --manifest     # only rewrite photos.js

Output: ./photos/<id>.jpg for each entry it can resolve, plus ./photos.js —
the manifest the site reads to know which entries have a face.

Thumbnails, not originals. The globe's photo layer loads several of these at
once, and Wikipedia's originals run to 8 MB apiece; asking the thumbnailer for
a bounded width brings that to tens of KB with no visible loss at the sizes
this site displays.

Skips files that already exist. Safe to rerun.
"""

from __future__ import annotations
import json
import pathlib
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

USER_AGENT = 'famous-baby/1.0 (https://github.com/benjaminwestbrook/famous-baby) Python/urllib'

# Wide enough for the person card on a retina screen; small enough that a dozen
# can load on the globe without a stall.
DEFAULT_WIDTH = 640

# Titles per API call. The hard cap is 50, but intro extracts stop at 20.
EXTRACT_LIMIT = 20

# Default set: ten Americans, one per field the US roster carries, so the
# country popout has a face from Music through Architecture rather than four
# musicians. Pair entry-id ↔ Wikipedia title.
DEFAULTS: list[tuple[str, str]] = [
    ('barack-obama',          'Barack_Obama'),
    ('martin-luther-king-jr', 'Martin_Luther_King_Jr.'),
    ('toni-morrison',         'Toni_Morrison'),
    ('katherine-johnson',     'Katherine_Johnson'),
    ('okeeffe',               "Georgia_O'Keeffe"),
    ('meryl-streep',          'Meryl_Streep'),
    ('aretha-franklin',       'Aretha_Franklin'),
    ('steve-jobs',            'Steve_Jobs'),
    ('frank-lloyd-wright',    'Frank_Lloyd_Wright'),
    ('julia-child',           'Julia_Child'),
]


def fetch_image_url(wiki_title: str, width: int) -> str | None:
    """Return a thumbnail URL no wider than `width` for the article's lead image.

    The REST summary endpoint hands back either a 320px thumb or the full
    original with no size in between, so go through the action API instead,
    which renders to whatever width we ask for.
    """
    params = urllib.parse.urlencode({
        'action': 'query',
        'format': 'json',
        'formatversion': '2',
        'redirects': '1',
        'prop': 'pageimages',
        'piprop': 'thumbnail',
        'pithumbsize': str(width),
        'titles': wiki_title,
    })
    api = f'https://en.wikipedia.org/w/api.php?{params}'
    req = urllib.request.Request(api, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(req, timeout=15) as r:
        data = json.loads(r.read().decode('utf-8'))
    pages = (data.get('query') or {}).get('pages') or []
    for page in pages:
        thumb = page.get('thumbnail')
        if thumb and thumb.get('source'):
            return thumb['source']
    return None


def lookup_batch(titles: list[str], width: int) -> dict[str, dict]:
    """Resolve many article titles at once, keyed by the title we asked for.

    One request per country instead of one per candidate. Each value carries
    the thumbnail URL, the intro text and whether the page is a disambiguation
    — everything `plausible()` needs to decide if we found the right person.
    """
    if not titles:
        return {}
    # Chunked at 20, not 50. A query takes 50 titles, but intro extracts cap
    # at 20 per request and the rest come back empty with no error — which
    # reads exactly like "this article never mentions their birth year" and
    # quietly threw away 60 good portraits out of 104.
    if len(titles) > EXTRACT_LIMIT:
        merged: dict[str, dict] = {}
        for i in range(0, len(titles), EXTRACT_LIMIT):
            merged.update(lookup_batch(titles[i:i + EXTRACT_LIMIT], width))
            time.sleep(0.1)
        return merged
    params = urllib.parse.urlencode({
        'action': 'query',
        'format': 'json',
        'formatversion': '2',
        'redirects': '1',
        'prop': 'pageimages|extracts|pageprops',
        'piprop': 'thumbnail',
        'pithumbsize': str(width),
        'exintro': '1',
        'explaintext': '1',
        # Without this the API returns an extract for the FIRST page only,
        # whatever else you asked for — so every other candidate in a batch
        # looked like it had no intro and failed the birth-year check.
        'exlimit': 'max',
        'titles': '|'.join(titles),
    })
    api = f'https://en.wikipedia.org/w/api.php?{params}'
    req = urllib.request.Request(api, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = json.loads(r.read().decode('utf-8'))
    query = data.get('query') or {}

    # Follow the title through normalisation and redirects so the answer can be
    # found under the name we asked for. A birth name usually redirects to the
    # name the world used — 'Eleanora Fagan' lands on Billie Holiday — and that
    # redirect is exactly what makes those entries resolvable at all.
    hop: dict[str, str] = {}
    for key in ('normalized', 'redirects'):
        for item in query.get(key) or []:
            hop[item['from']] = item['to']

    def final(title: str) -> str:
        seen = set()
        while title in hop and title not in seen:
            seen.add(title)
            title = hop[title]
        return title

    pages = {p.get('title'): p for p in (query.get('pages') or [])}
    out: dict[str, dict] = {}
    for asked in titles:
        page = pages.get(final(asked))
        if not page or page.get('missing'):
            continue
        thumb = page.get('thumbnail') or {}
        out[asked] = {
            'title': page.get('title'),
            'url': thumb.get('source'),
            'extract': page.get('extract') or '',
            'disambiguation': 'disambiguation' in (page.get('pageprops') or {}),
        }
    return out


def plausible(info: dict, birth_year: int | None) -> tuple[bool, str]:
    """Is this article actually the person we meant?

    Matching a full name to an article title is usually right but not always —
    plenty of names are shared, and some resolve to a band, a ship or a town.
    Requiring the birth year to appear in the opening paragraph is a cheap,
    strong check: it is nearly always there for a person, and almost never
    there for the wrong one. Entries with no birth year can't be checked this
    way, so they're taken on the thumbnail alone and reported as unverified.
    """
    if not info.get('url'):
        return False, 'no image'
    if info.get('disambiguation'):
        return False, 'disambiguation page'
    if birth_year and birth_year >= 1500:
        if str(birth_year) not in (info.get('extract') or ''):
            return False, f'intro never says {birth_year}'
        return True, 'ok'
    # Older than that and the check stops meaning anything: the Buddha's dates
    # are an estimate, Wikidata stores -500 and the article argues about the
    # century. The article title matching the name is the evidence available.
    if birth_year:
        return True, 'ok (ancient — birth year not checkable)'
    return True, 'ok (no birth year to check)'


def download(entry_id: str, wiki_title: str, out_dir: pathlib.Path, width: int) -> tuple[str, str]:
    # Skip if already present (any extension).
    existing = list(out_dir.glob(f'{entry_id}.*'))
    if existing:
        return entry_id, f'SKIP (exists: {existing[0].name})'

    try:
        img_url = fetch_image_url(wiki_title, width)
        if not img_url:
            return entry_id, 'NO_IMAGE for title'
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


def write_manifest(out_dir: pathlib.Path, repo: pathlib.Path) -> int:
    """Regenerate photos.js from whatever is actually on disk.

    The site can't probe a directory over HTTP, and blind-loading 680 <img>
    tags to see which 404 is worse, so the folder listing becomes a module.
    Derived, never hand-edited: rerun this script after adding a face.
    """
    ids = sorted(p.stem for p in out_dir.glob('*.jpg'))
    body = '\n'.join(f"  '{i}'," for i in ids)
    (repo / 'photos.js').write_text(
        "// Generated by fetch_photos.py — do not edit by hand.\n"
        "// Entry ids with a portrait in ./photos/<id>.jpg. The globe's country\n"
        "// popout reads this to know whose faces it can float over a country.\n"
        "export const PHOTO_IDS = [\n"
        f"{body}\n"
        "];\n"
        "\nexport const HAS_PHOTO = new Set(PHOTO_IDS);\n",
        encoding='utf-8',
    )
    return len(ids)


def save_image(entry_id: str, img_url: str, out_dir: pathlib.Path, tries: int = 4) -> str:
    """Download one thumbnail, backing off when Wikimedia says slow down.

    A batch run asks for a couple of hundred images in a few minutes, which
    earns a 429 (and sometimes a 503) partway through. Retrying with a growing
    pause turns those from lost countries into slow ones.
    """
    dest = out_dir / f'{entry_id}.jpg'
    req = urllib.request.Request(img_url, headers={'User-Agent': USER_AGENT})
    last: Exception | None = None
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=45) as r:
                dest.write_bytes(r.read())
            return f'{dest.stat().st_size / 1024:.0f} KB'
        except urllib.error.HTTPError as e:
            last = e
            if e.code not in (429, 503, 500):
                raise
            # Honour Retry-After when it's offered, else back off 2s, 4s, 8s.
            wait = e.headers.get('Retry-After') if e.headers else None
            time.sleep(float(wait) if wait and str(wait).isdigit() else 2 ** (attempt + 1))
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 ** (attempt + 1))
    raise last if last else RuntimeError('download failed')


def run_targets(path: pathlib.Path, out_dir: pathlib.Path, repo: pathlib.Path, width: int, force: bool = False) -> int:
    """Walk photo_targets.json, filling each country's quota.

    Country by country: one lookup for all its candidates, then take them in
    rank order until the quota is met. A candidate with no article, no photo or
    a mismatched birth year costs nothing but a line of output.
    """
    targets = json.loads(path.read_text(encoding='utf-8'))
    print(f'{len(targets)} countries to fill, ≤{width}px\n')

    filled = skipped = 0
    unverified: list[str] = []
    for t in targets:
        country, want = t['country'], t['want']
        candidates = t['candidates']
        if not candidates:
            print(f'  {country:24s}  — nobody left to try')
            continue
        try:
            found = lookup_batch([c['name'] for c in candidates], width)
        except Exception as e:  # noqa: BLE001
            print(f'  {country:24s}  LOOKUP FAILED {type(e).__name__}: {e}')
            continue

        got = 0
        notes: list[str] = []
        for c in candidates:
            if got >= want:
                break
            # --force pulls the picture again even though we have one: the
            # face crops are cut from these files, and cropping an
            # already-downsized picture has no detail left to give.
            if not force and list(out_dir.glob(f"{c['id']}.*")):
                got += 1
                continue
            info = found.get(c['name'])
            if not info:
                notes.append(f"{c['name']}: no article")
                continue
            ok, why = plausible(info, c.get('birthYear'))
            if not ok:
                notes.append(f"{c['name']}: {why}")
                continue
            try:
                size = save_image(c['id'], info['url'], out_dir)
            except Exception as e:  # noqa: BLE001
                notes.append(f"{c['name']}: download failed ({type(e).__name__})")
                continue
            got += 1
            filled += 1
            if 'no birth year' in why:
                unverified.append(f"{c['id']} ({country})")
            print(f"  {country:24s}  + {c['name']} ({size})")
        if got == 0:
            skipped += 1
        # Always say what didn't resolve. Reporting misses only when a country
        # came up completely empty hid 91 failures in a refetch that looked
        # like it had worked.
        for note in notes:
            print(f'  {country:24s}  - {note}')
        time.sleep(0.15)      # be a good citizen of someone else's API

    n = write_manifest(out_dir, repo)
    print(f'\nAdded {filled} portrait(s); {skipped} countries still bare.')
    if unverified:
        print(f'Unverified (no birth year in the roster to check against): {", ".join(unverified)}')
    print(f'photos.js rewritten: {n} portrait(s).')
    return 0


def parse_args(argv: list[str]) -> tuple[list[tuple[str, str]], int, bool, str | None, bool]:
    """`id=Wiki_Title` pairs plus `--width N`, `--manifest`, `--targets FILE`."""
    width = DEFAULT_WIDTH
    manifest_only = False
    targets_file: str | None = None
    force = False
    pairs: list[tuple[str, str]] = []
    rest = list(argv)
    while rest:
        a = rest.pop(0)
        if a == '--manifest':
            manifest_only = True
        elif a == '--force':
            force = True
        elif a in ('--width', '--targets'):
            if not rest:
                print(f'  {a} needs a value', file=sys.stderr)
                continue
            val = rest.pop(0)
            if a == '--width':
                width = int(val)
            else:
                targets_file = val
        elif a.startswith('--width='):
            width = int(a.split('=', 1)[1])
        elif a.startswith('--targets='):
            targets_file = a.split('=', 1)[1]
        elif '=' in a:
            eid, title = a.split('=', 1)
            pairs.append((eid.strip(), title.strip()))
        else:
            print(f'  ignoring (bad format): {a!r}', file=sys.stderr)
    return (pairs or DEFAULTS), width, manifest_only, targets_file, force


def main() -> int:
    repo = pathlib.Path(__file__).parent
    out_dir = repo / 'photos'
    out_dir.mkdir(exist_ok=True)

    targets, width, manifest_only, targets_file, force = parse_args(sys.argv[1:])

    if manifest_only:
        n = write_manifest(out_dir, repo)
        print(f'photos.js rewritten: {n} portrait(s).')
        return 0

    if targets_file:
        return run_targets(pathlib.Path(targets_file), out_dir, repo, width, force)

    print(f'Fetching {len(targets)} image(s) at ≤{width}px → {out_dir}\n')

    results = [download(eid, title, out_dir, width) for eid, title in targets]

    for eid, status in results:
        print(f'  {eid:24s}  {status}')

    n_ok = sum(1 for _, s in results if s.startswith('OK'))
    n_skip = sum(1 for _, s in results if s.startswith('SKIP'))
    n_err = sum(1 for _, s in results if 'ERROR' in s or 'NO_IMAGE' in s)
    n_manifest = write_manifest(out_dir, repo)
    print(f'\nDone: {n_ok} downloaded, {n_skip} already present, {n_err} failed.')
    print(f'photos.js rewritten: {n_manifest} portrait(s).')
    return 0 if n_err == 0 else 1


if __name__ == '__main__':
    raise SystemExit(main())
