#!/usr/bin/env python3
"""Find each person's Wikipedia article, so the card can cite where it got them.

The bios are written from Wikipedia and the name origins come from Wiktionary,
and until now the card said neither. This resolves every roster entry to a
real article title and writes sources.js, which the card turns into links.

Matching a name to an article title is usually right and occasionally very
wrong — names are shared, and some resolve to a band, a ship or a town. So the
same check fetch_photos.py uses applies here: the birth year has to appear in
the article's opening paragraph. It nearly always does for a person and almost
never does for the wrong one. A wrong link is worse than no link.

    python3 fetch_sources.py              # everything not already cached
    python3 fetch_sources.py --limit 25   # a sample, to see the hit rate
    python3 fetch_sources.py --force      # ignore the cache

Answers are cached in sources_cache.json, misses included.
"""
import argparse, json, os, re, sys, time
import urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(ROOT, 'sources_cache.json')
API = 'https://en.wikipedia.org/w/api.php'
UA = 'famous-baby/1.0 (https://github.com/bwestbrook/famous-baby) source-links'
# Intro extracts cap at 20 titles a request whatever the query limit says; ask
# for more and the surplus come back empty, which reads exactly like "this
# article never mentions their birth year".
EXTRACT_LIMIT = 20


def roster():
    """id, name and birth year for every entry, straight out of data.js."""
    line_re = re.compile(r"^\s*\{\s*id:")
    id_re = re.compile(r"id:\s*'([^']+)'")
    name_re = re.compile(r"[^a-zA-Z]name:\s*(['\"])((?:\\.|(?!\1).)*)\1")
    year_re = re.compile(r"birthYear:\s*(-?\d+)")
    out = []
    with open(os.path.join(ROOT, 'data.js'), encoding='utf-8') as f:
        for line in f:
            if not line_re.match(line):
                continue
            i, n = id_re.search(line), name_re.search(line)
            if not i or not n:
                continue
            y = year_re.search(line)
            out.append({
                'id': i.group(1),
                'name': n.group(2).replace("\\'", "'"),
                'year': int(y.group(1)) if y else None,
            })
    return out


def lookup(titles):
    """Resolve a batch of titles: canonical name, intro text, disambiguation."""
    if not titles:
        return {}
    params = urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'formatversion': '2',
        'redirects': '1', 'prop': 'extracts|pageprops',
        'exintro': '1', 'explaintext': '1', 'exlimit': 'max',
        'titles': '|'.join(titles),
    })
    req = urllib.request.Request(API + '?' + params, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=25) as res:
        data = json.load(res)
    q = data.get('query') or {}
    # `redirects` and `normalized` say which title we asked for became which,
    # so the answer can be keyed back to the question.
    back = {}
    for m in (q.get('normalized') or []) + (q.get('redirects') or []):
        back[m['to']] = m['from']
    out = {}
    for page in (q.get('pages') or []):
        title = page.get('title')
        asked = back.get(title, title)
        # A redirect can be normalised first, so walk back to the original.
        while asked in back:
            asked = back[asked]
        out[asked] = {
            'title': title,
            'missing': page.get('missing', False),
            'extract': page.get('extract') or '',
            'disambiguation': 'disambiguation' in (page.get('pageprops') or {}),
        }
    return out


def verdict(info, year):
    """Same rule as the photo fetcher: the intro has to know the birth year."""
    if not info or info.get('missing'):
        return None, 'no article'
    if info.get('disambiguation'):
        return None, 'disambiguation page'
    if year and year >= 1500:
        if str(year) not in info['extract']:
            return None, 'intro never says %d' % year
        return info['title'], 'ok'
    # Older than that and the check stops meaning anything — ancient dates are
    # estimates and the article argues about the century.
    return info['title'], 'ok (unverified: ancient or undated)'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--pause', type=float, default=0.15)
    args = ap.parse_args()

    cache = {}
    if os.path.exists(CACHE) and not args.force:
        try:
            cache = json.load(open(CACHE, encoding='utf-8'))
        except Exception:
            cache = {}

    people = roster()
    todo = [p for p in people if p['id'] not in cache]
    cached = len(people) - len(todo)
    if args.limit:
        todo = todo[:args.limit]
    print('%d entries, %d cached, %d to resolve' % (len(people), cached, len(todo)))

    reasons = {}
    for i in range(0, len(todo), EXTRACT_LIMIT):
        chunk = todo[i:i + EXTRACT_LIMIT]
        try:
            found = lookup([p['name'] for p in chunk])
        except Exception as e:
            print('  batch failed (%s), skipping' % e, file=sys.stderr)
            continue
        for p in chunk:
            title, why = verdict(found.get(p['name']), p['year'])
            cache[p['id']] = title
            reasons[why] = reasons.get(why, 0) + 1
        if (i // EXTRACT_LIMIT) % 10 == 0 or i + EXTRACT_LIMIT >= len(todo):
            json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)
            hits = sum(1 for v in cache.values() if v)
            print('  %d/%d  (%d linked)' % (min(i + EXTRACT_LIMIT, len(todo)), len(todo), hits), flush=True)
        time.sleep(args.pause)

    json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)

    ids = {p['id'] for p in people}
    found = {k: v for k, v in sorted(cache.items()) if v and k in ids}
    with open(os.path.join(ROOT, 'sources.js'), 'w', encoding='utf-8') as f:
        f.write('// Generated by fetch_sources.py — do not edit by hand.\n')
        f.write('//\n')
        f.write("// Each person's English Wikipedia article, verified by finding their\n")
        f.write('// birth year in its opening paragraph. The card links these as sources.\n')
        f.write('export const WIKI = ')
        json.dump(found, f, ensure_ascii=False, indent=0, sort_keys=True)
        f.write(';\n')

    print('sources.js: %d of %d linked (%.0f%%)'
          % (len(found), len(people), 100.0 * len(found) / max(1, len(people))))
    for why, n in sorted(reasons.items(), key=lambda kv: -kv[1]):
        print('   %-42s %d' % (why, n))


if __name__ == '__main__':
    main()
