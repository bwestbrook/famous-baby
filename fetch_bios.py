#!/usr/bin/env python3
"""Fill in the bios that were never written, from the articles already cited.

Measured before this ran: of 2,550 entries, 673 had no bio at all and 1,197
carried an import stub — "Born in Gatundu, Kenya, in 1893. Journalist." for
Jomo Kenyatta — which tells a reader nothing the card does not already show
them in its own fields. That is 1,870 entries, and 1,764 of them already have
a Wikipedia article resolved and birth-year-verified by fetch_sources.py.

So the bio comes off the article the card already links. Wikipedia is CC BY-SA
and the card credits and links it under every bio, which is the condition of
using the text — don't remove that credit.

    python3 fetch_bios.py --dry-run     # what would change, and to what
    python3 fetch_bios.py               # write them into data.js
    python3 fetch_bios.py --limit 40    # a sample first

Hand-written bios are never touched: only an empty one, or one matching the
generated stub exactly, is replaced.
"""
import argparse, json, os, re, shutil, sys, time
import urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(ROOT, 'bios_cache.json')
API = 'https://en.wikipedia.org/w/api.php'
UA = 'famous-baby/1.0 (https://github.com/bwestbrook/famous-baby) bios'
EXTRACT_LIMIT = 20
MAX_CHARS = 520

ENTRY = re.compile(r"^\s*\{\s*id:")
ID = re.compile(r"id:\s*'([^']+)'")
BIO = re.compile(r"(bio:\s*)(['\"])((?:\\.|(?!\2).)*)\2")
# "Born in Bangui, Central African Republic, in 1989. Association football
# player." — the shape the importer writes when it has nothing else.
STUB = re.compile(r"^Born in .*, in -?\d+\. [A-Za-z ,\-]+\.$")


def wiki_titles():
    src = open(os.path.join(ROOT, 'sources.js'), encoding='utf-8').read()
    return json.loads(src[src.index('{'):src.rindex('}') + 1])


def needs_bio(text):
    t = (text or '').strip()
    return (not t) or bool(STUB.match(t))


def trim(extract):
    """The first few sentences, and never a half one.

    An intro can run to a page. Three sentences is a paragraph a reader will
    actually finish, and cutting on a sentence end rather than a character
    count is the difference between a bio and a truncation.
    """
    t = re.sub(r'\s+', ' ', (extract or '').strip())
    if not t:
        return ''
    # Don't split on the full stop in "St.", "Mr.", "c. 1897" or initials.
    parts = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9"“])', t)
    out = ''
    for p in parts:
        if out and len(out) + 1 + len(p) > MAX_CHARS:
            break
        out = (out + ' ' + p).strip()
        if len(out) >= MAX_CHARS or out.count('. ') >= 3:
            break
    if len(out) > MAX_CHARS:
        cut = out.rfind('. ', 0, MAX_CHARS)
        out = out[:cut + 1] if cut > 120 else ''
    return out.strip()


def lookup(titles):
    params = urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'formatversion': '2',
        'redirects': '1', 'prop': 'extracts', 'exintro': '1',
        'explaintext': '1', 'exlimit': 'max', 'titles': '|'.join(titles),
    })
    req = urllib.request.Request(API + '?' + params, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.load(res)
    q = data.get('query') or {}
    back = {}
    for m in (q.get('normalized') or []) + (q.get('redirects') or []):
        back[m['to']] = m['from']
    out = {}
    for page in (q.get('pages') or []):
        title = page.get('title')
        asked = back.get(title, title)
        while asked in back:
            asked = back[asked]
        out[asked] = page.get('extract') or ''
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--pause', type=float, default=0.15)
    args = ap.parse_args()

    titles = wiki_titles()
    lines = open(os.path.join(ROOT, 'data.js'), encoding='utf-8').read().split('\n')

    todo = []
    for n, line in enumerate(lines):
        if not ENTRY.match(line):
            continue
        i, b = ID.search(line), BIO.search(line)
        if not i or not b or not needs_bio(b.group(3)):
            continue
        t = titles.get(i.group(1))
        if t:
            todo.append((n, i.group(1), t))
    if args.limit:
        todo = todo[:args.limit]
    print('%d entries want a bio and have an article' % len(todo))

    cache = {}
    if os.path.exists(CACHE):
        try:
            cache = json.load(open(CACHE, encoding='utf-8'))
        except Exception:
            cache = {}

    fetch = [t for t in todo if t[1] not in cache]
    for k in range(0, len(fetch), EXTRACT_LIMIT):
        chunk = fetch[k:k + EXTRACT_LIMIT]
        try:
            got = lookup([c[2] for c in chunk])
        except Exception as e:
            print('  batch failed (%s)' % e, file=sys.stderr)
            continue
        for _, pid, title in chunk:
            cache[pid] = trim(got.get(title, ''))
        if (k // EXTRACT_LIMIT) % 10 == 0 or k + EXTRACT_LIMIT >= len(fetch):
            json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)
            print('  %d/%d fetched' % (min(k + EXTRACT_LIMIT, len(fetch)), len(fetch)), flush=True)
        time.sleep(args.pause)
    json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)

    wrote, skipped, shown = 0, 0, 0
    for n, pid, _ in todo:
        bio = (cache.get(pid) or '').strip()
        # A one-line answer is no better than the stub it would replace.
        if len(bio) < 120:
            skipped += 1
            continue
        m = BIO.search(lines[n])
        lines[n] = lines[n][:m.start()] + m.group(1) + json.dumps(bio, ensure_ascii=False) + lines[n][m.end():]
        wrote += 1
        if args.dry_run and shown < 5:
            shown += 1
            print('\n  %s\n    %s' % (pid, bio[:200] + ('…' if len(bio) > 200 else '')))

    print('\n%d bios written, %d skipped as too thin' % (wrote, skipped))
    if args.dry_run:
        print('(dry run — data.js untouched)')
        return
    shutil.copyfile(os.path.join(ROOT, 'data.js'), os.path.join(ROOT, 'data.js.bak'))
    open(os.path.join(ROOT, 'data.js'), 'w', encoding='utf-8').write('\n'.join(lines))
    print('data.js written; previous copy at data.js.bak')


if __name__ == '__main__':
    main()
