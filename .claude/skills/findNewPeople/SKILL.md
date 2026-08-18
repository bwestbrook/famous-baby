---
name: findNewPeople
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

`--dry` first, always. Read the list before it's written — that is where the
wrong person gets caught, and it has caught several.

## Then the photographs, in this order

```bash
python3 fetch_photos.py --targets photo_refetch.json --width 1400
./facecrop photos photos/faces 420 0.78
./resize_photos.sh 512 72
python3 fetch_photos.py --manifest
```

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
