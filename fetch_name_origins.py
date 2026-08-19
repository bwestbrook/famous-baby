#!/usr/bin/env python3
"""Where each given name in the roster comes from, out of Wiktionary.

The card could say how often a name was given but never what it *is*. English
Wiktionary carries that as a proper-noun sense on the name's own page — "A
female given name from Shona", "A male given name from Arabic, variant of
Karim" — which is exactly the sentence the card wants, already written.

Writes name_origins.js, keyed the way app.js folds a name (NFKD, accents
stripped, lower case) so the lookup is a plain index. Generated; don't hand-edit.

    python3 fetch_name_origins.py           # everything not already cached
    python3 fetch_name_origins.py --force   # ignore the cache and refetch

Answers are cached in name_origins_cache.json, misses included: roughly one
name in six has no Wiktionary page, and without remembering that a re-run
spends its whole time asking again.
"""
import argparse, json, os, re, sys, threading, time, unicodedata
from concurrent.futures import ThreadPoolExecutor
import urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(ROOT, 'name_origins_cache.json')
API = 'https://en.wiktionary.org/api/rest_v1/page/definition/'
# Wikimedia asks that automated clients identify themselves and say where to
# complain. An anonymous script that doesn't is inviting a block.
UA = 'famous-baby/1.0 (https://github.com/bwestbrook/famous-baby) name-origins'

TAGS = re.compile(r'<[^>]+>')
WS = re.compile(r'\s+')


def fold(s):
    """The key app.js looks names up by — foldName() in the setup block."""
    s = unicodedata.normalize('NFKD', str(s or ''))
    return ''.join(c for c in s if not unicodedata.combining(c)).lower().strip()


def given_names():
    """Every distinct first token of a `name:` on an entry line in data.js."""
    line_re = re.compile(r"^\s*\{\s*id:")
    name_re = re.compile(r"[^a-zA-Z]name:\s*(['\"])((?:\\.|(?!\1).)*)\1")
    out = {}
    with open(os.path.join(ROOT, 'data.js'), encoding='utf-8') as f:
        for line in f:
            if not line_re.match(line):
                continue
            m = name_re.search(line)
            if not m:
                continue
            first = m.group(2).strip().split()[0] if m.group(2).strip() else ''
            first = re.sub(r"[^^\w'\-]", '', first, flags=re.UNICODE)
            if not first:
                continue
            # First one wins: the same folded key can arrive spelled several
            # ways, and Wiktionary titles are case- and accent-sensitive.
            out.setdefault(fold(first), first)
    return out


def best_sense(payload):
    """The proper-noun sense that actually says something about the name.

    A page can carry several: a bare "A male given name." alongside "A female
    given name from the Germanic languages." The one naming a source language
    or a longer form is the one worth showing, so senses carrying "from",
    "short form", "variant", "diminutive" or "feminine/masculine form" win.
    """
    best, best_score = None, -1
    for sec in (payload.get('en') or []):
        if sec.get('partOfSpeech') != 'Proper noun':
            continue
        for d in (sec.get('definitions') or []):
            text = WS.sub(' ', TAGS.sub('', d.get('definition') or '')).strip()
            if not text or 'given name' not in text.lower():
                continue
            score = len(text)
            if re.search(r'\bfrom\b|short form|variant|diminutive|form of', text, re.I):
                score += 1000
            if score > best_score:
                best, best_score = text, score
    return best


def fetch(name, tries=3):
    url = API + urllib.parse.quote(name.replace(' ', '_'), safe='')
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=15) as res:
                return best_sense(json.load(res))
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None                    # no page: a real answer, cache it
            if e.code in (429, 503):
                time.sleep(2 * (attempt + 1))  # asked to slow down
                continue
            return None
        except Exception:
            time.sleep(1 + attempt)
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--pause', type=float, default=0.05)
    # Serial, this is a 28-minute job: the round trip is ~0.9s and there
    # are 1,851 names. Eight at a time brings it under four minutes and is
    # still far below what Wikimedia asks anonymous clients to stay under.
    ap.add_argument('--workers', type=int, default=8)
    args = ap.parse_args()

    cache = {}
    if os.path.exists(CACHE) and not args.force:
        try:
            cache = json.load(open(CACHE, encoding='utf-8'))
        except Exception:
            cache = {}

    names = given_names()
    todo = [k for k in names if k not in cache]
    print('%d given names, %d already cached, %d to fetch'
          % (len(names), len(names) - len(todo), len(todo)))

    lock = threading.Lock()
    done = [0]

    def work(key):
        got = fetch(names[key])
        time.sleep(args.pause)
        with lock:
            cache[key] = got
            done[0] += 1
            n = done[0]
            if n % 100 == 0 or n == len(todo):
                json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)
                hits = sum(1 for v in cache.values() if v)
                print('  %d/%d  (%d with an origin)' % (n, len(todo), hits), flush=True)

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        list(pool.map(work, sorted(todo)))

    json.dump(cache, open(CACHE, 'w', encoding='utf-8'), ensure_ascii=False)

    # A bare "A male given name." is a page that exists and says nothing — it
    # tells the reader only what the name already told them. Measured, 51 of
    # 788 read like that, and a row carrying one is worse than no row at all.
    bare = re.compile(r'^A (male|female|unisex) given name\.?$', re.I)
    # Each entry carries the sentence and the Wiktionary title it came off, so
    # the card can credit the page it is quoting with a link to it rather than
    # a guess at the spelling.
    found = {
        k: {'t': names[k], 's': v} for k, v in sorted(cache.items())
        if v and k in names and not bare.match(v.strip())
    }
    with open(os.path.join(ROOT, 'name_origins.js'), 'w', encoding='utf-8') as f:
        f.write('// Generated by fetch_name_origins.py — do not edit by hand.\n')
        f.write('//\n')
        f.write('// What each given name in the roster is, from English Wiktionary\n')
        f.write('// (CC BY-SA 4.0). Keyed by the name folded the way app.js folds it:\n')
        f.write('// NFKD, accents stripped, lower case. { t: Wiktionary title, s: sentence }.\n')
        f.write('export const NAME_ORIGINS = ')
        json.dump(found, f, ensure_ascii=False, indent=0, sort_keys=True)
        f.write(';\n')

    print('name_origins.js: %d of %d names have an origin (%.0f%%)'
          % (len(found), len(names), 100.0 * len(found) / max(1, len(names))))


if __name__ == '__main__':
    main()
