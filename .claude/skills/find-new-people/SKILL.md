---
name: find-new-people
description: Find people who should be in the famous-baby roster but aren't — by country, by era, or to raise the total — and write them into data.js with photographs. Use for "add more names", "fill in this country", "we need modern names", "get the numbers up".
---

# Finding people to add

Everything comes from Wikidata. Nothing is recalled: if a fact isn't in the
query result it doesn't go in the file.

## Choose the shape of the ask

| Ask | Route |
|---|---|
| every country should have somebody | `node roster_missing.mjs` → `roster_candidates.py` → `roster_pick.py` → `roster_write.py` |
| more people in particular countries | write `roster_missing.json` yourself → `roster_candidates.py 30` → `roster_deepen.py N` |
| people born since a year | `roster_modern.py YEAR COUNT` |
| a list somebody has already curated | `roster_from_supabase.py` → `roster_write.py` |

### Candidates from Supabase

```bash
python3 roster_from_supabase.py --env ../Polyjamorous/.env --limit 200
python3 roster_from_supabase.py --env ../Polyjamorous/.env --genre Techno
python3 roster_from_supabase.py --names-file names.txt      # no database needed
```

The `artists` table in PolyJamerous is a curated roster of electronic
musicians across 32 genres — which is precisely where this dataset is
thinnest: 457 Music entries and two of them electronic.

**Supabase says who is worth having; Wikidata still says who they are.** That
table carries no birth date, no birthplace and no photograph, so nothing in it
can be imported directly. Every name goes through the same Wikidata lookup as
every other route, and anything Wikidata has never heard of is dropped rather
than guessed at. Sitelinks then rank what survives, so the best-known arrive
first.

"Most popular" is approximated from that schema the only way it can be —
artists somebody wrote a real biography for, and who carry a MusicBrainz id.
It is a shortlist heuristic, nothing more; the real ordering happens after
Wikidata confirms them.

**Credentials never enter this repo.** Pass `--env` pointing at a file that
holds `DATABASE_URL`, or set it in the environment; it is read and never
echoed. `psycopg2` isn't installed here — either
`pip3 install --user psycopg2-binary`, or export the names yourself and use
`--names-file`, which needs no database at all.

`--dry` first, always. Read the list before it's written — that is where the
wrong person gets caught, and it has caught several.

## Then the photographs, in this order

The pipeline and its ordering rules live in `fill-photos` — read that
rather than trusting this summary, which is here for sequence only.

```bash
python3 fetch_photos.py --targets photo_refetch.json --width 1400
./facecrop photos photos/faces 420 0.78
./resize_photos.sh 512 72
python3 fetch_photos.py --manifest
```

## And then the generated files — this part is not optional

Three files are built *from* the dataset and go stale the moment it grows.
None of them errors when stale; they just quietly stop being true.

```bash
node roster_clean.mjs --fix     # duplicates always appear in a big pass
python3 fetch_photos.py --manifest
python3 build_atlas.py          # after the manifest, never before
node names_popularity.mjs
node roster_stats.mjs           # the numbers to report
```

- **`atlas.js`** maps an id to a cell **by position**. Rebuild the sheet
  without the manifest, or the manifest without the sheet, and every face
  silently moves onto the wrong person. This is the worst failure in the
  project: it looks fine and is completely wrong.
- **`names.js`** holds a popularity series only for given names in the roster.
  Adding 1,200 people without rerunning it left the name graph appearing on
  39% of cards, and it looked like the feature had been deleted.
- **`photos.js`** is globbed from `photos/*.jpg`. Anything else parked in that
  folder is enrolled as a person — a sprite sheet once joined the roster as
  someone called "atlas".

Order matters: dedupe first (it removes entries, orphaning their photographs),
delete the orphans, then manifest, then atlas.

Order matters: fetch large, cut faces from the large file, shrink the
originals last. Cropping an already-downsized picture has nothing left to give
— that mistake produced 382px faces stretched across a whole country.

Build `photo_refetch.json` from the block just written — id, name, birthYear —
skipping ids already in `photos.js`.

## Traps

- **`data.js` is an ES module with a `.js` name.** Node reads it as CommonJS.
  Copy to a temp `.mjs` to import it.
- **The array ends `].filter(p => p.field !== '__skip__');`** — that string is
  the insertion point, not a closing bracket.
- **Wikipedia intro extracts cap at 20 titles per request.** Past that they
  return empty with no error, which reads as "the article never mentions their
  birth year" and silently discards good people. 60 of 104 once.
- **The query service times out** on anything walking all humans. Filter on
  sitelinks and step the floor down until it answers.
- **Names must be deduped loosely.** The roster holds "Beyoncé Knowles"; an
  exact-match check lets "Beyoncé" straight through.
- **An id must equal its photo filename.** A mismatch is a person who can never
  show a face and nothing warns you.

## The ranking is not the decision

Sitelinks measure fame and nothing else. Sorted that way a third of the world
leads with a politician and several countries lead with a dictator. Hence
`FIELD_WEIGHT`, `BLOCKLIST` and `OVERRIDES` in `roster_pick.py`. Cap per
country on any global pass or the result is all American singers.

Finish by reporting: people, portraits, countries covered, duplicates.
