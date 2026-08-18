---
name: addNew
description: Add people to the famous-baby roster — more per country, more countries, or a different era — sourced from Wikidata with photographs fetched and cropped. Use when asked to grow the roster, fill in countries, add modern or historical names, or get the numbers up.
---

# Adding people to the roster

Every person in `data.js` comes from Wikidata and every photograph from
Wikipedia. Nothing here is recalled or invented — if a fact isn't in the
query result, it doesn't go in the file.

## The three ways in

Pick by what's being asked for:

| Ask | Tool |
|---|---|
| "every country should have someone" | `roster_missing.mjs` → `roster_candidates.py` → `roster_pick.py` → `roster_write.py` |
| "more people in *these* countries" | write `roster_missing.json` by hand → `roster_candidates.py 22` → `roster_deepen.py N` |
| "people born since YEAR" / "modern names" | `roster_modern.py YEAR COUNT` |

Every one of them takes `--dry` first. Read the dry run before writing.

## Then, always, in this order

```bash
python3 fetch_photos.py --targets photo_refetch.json --width 1400
./facecrop photos photos/faces 420 0.78     # swiftc -O facecrop.swift -o facecrop, once
./resize_photos.sh 512 72
python3 fetch_photos.py --manifest
```

Build `photo_refetch.json` from the entries just written — id, name, birthYear —
skipping ids already in `photos.js`. Fetch at 1400px, crop faces from *that*,
and only then shrink the originals: cropping an already-downsized picture has
no detail left to give.

## What bites

- **`data.js` is an ES module with a `.js` name.** Node reads it as CommonJS and
  throws on `export`. Copy to a temp `.mjs` and import that.
- **The array doesn't end in `]`.** It ends `].filter(p => p.field !== '__skip__');`
  — that string is the insertion point.
- **Wikipedia's intro extracts cap at 20 titles per request**, not the 50 a
  query takes. Past that they come back empty with no error, which reads as
  "this article never mentions their birth year" and silently discards good
  people. `EXTRACT_LIMIT` in `fetch_photos.py`.
- **The Wikidata query service times out** on anything that walks all humans.
  Filter on sitelinks and step the floor down until it answers.
- **Birth years before 1500 can't be checked** against the article text —
  Wikidata stores an estimate the article argues with. Accepted unverified.
- **A photo is only kept if the article's opening paragraph carries the birth
  year.** Don't relax that: a name matched to the wrong article should fail.
- **Ids must equal the photo filename.** A mismatch is a person who can never
  show a face, and nothing warns you.

## Judgement, not just ranking

Sitelinks measure fame and nothing else. Sorted that way a third of the world
leads with a politician and several countries lead with a dictator. So:

- `FIELD_WEIGHT` in `roster_pick.py` weights musicians, writers, film-makers,
  artists and scientists over heads of state.
- `BLOCKLIST` names people whose fame rests on mass killing. Names them —
  a rule clever enough to infer it would catch people it shouldn't.
- `OVERRIDES` is where a human decision goes when the ranking is wrong.
- Cap per country on a global pass, or the result is all American singers.

Read the dry run and fix the bad ones there. This is an almanac for naming a
baby; the ranking picks, a person decides.

## Afterwards

`node --check` a copy of `data.js`, confirm no duplicate ids and no photo id
without an entry, then report the counts: people, portraits, countries covered.
