---
name: fill-photos
description: Get a photograph onto every person in the roster, and keep the generated image files honest. Use for "fill in the missing photos", "backfill portraits", "regenerate the atlas", or after any pass that adds or removes people.
---

# Photographs

The single description of this pipeline. Other skills point here rather than
repeating it, because the ordering rules are the whole content and a second
copy drifts.

## Who is missing one

```bash
node --input-type=module -e "
import {mkdtempSync,copyFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';
import {join} from 'node:path';import {pathToFileURL} from 'node:url';
const d=mkdtempSync(join(tmpdir(),'fb-'));
for(const f of ['data.js','photos.js']) copyFileSync(f, join(d,f.replace('.js','.mjs')));
const {PEOPLE}=await import(pathToFileURL(join(d,'data.mjs')).href);
const {HAS_PHOTO}=await import(pathToFileURL(join(d,'photos.mjs')).href);
rmSync(d,{recursive:true,force:true});
const out=PEOPLE.filter(p=>!HAS_PHOTO.has(p.id))
  .map(p=>({id:p.id,name:p.name,birthYear:p.birthYear,field:p.field}));
console.log(JSON.stringify([{country:'BACKFILL',have:0,want:out.length,candidates:out}],null,1));
" > photo_refetch.json
```

## The pipeline, in this order and no other

```bash
python3 fetch_photos.py --targets photo_refetch.json --width 1400
./facecrop photos photos/faces 420 0.78    # swiftc -O facecrop.swift -o facecrop, once
./resize_photos.sh 512 72
python3 fetch_photos.py --manifest
python3 build_atlas.py
```

**Fetch large, crop from the large file, shrink last.** Cropping an
already-downsized picture has nothing left to give — doing it the other way
produced 382px faces stretched across whole countries.

**`build_atlas.py` after the manifest, never before.** `atlas.js` maps an id to
a cell *by position*. The sheet and the manifest out of step puts every face on
the wrong person, silently, and the result looks completely fine. It is the
worst failure in this project.

**One tracked photograph per person.** `photos/faces/` is derived and is not
in git — it was a second copy of every portrait, 60 MB of the tree and half
the churn. `facecrop` rebuilds it locally; `build_atlas.py` reads it and
produces `atlas.jpg`, which is what the mosaic actually draws. So the repo
carries one picture per person plus one sheet, and nothing else.

**Nothing but portraits in `photos/`.** `--manifest` globs `photos/*.jpg` and
takes every filename stem as a person's id; a sprite sheet parked there once
joined the roster as someone called "atlas".

## Why some never resolve

A photo is only kept when the article's opening paragraph carries that person's
birth year. Don't relax it — a name matched to the wrong article should fail
rather than put a stranger's face on someone. Genuine misses:

- no article, or an article with no lead image
- born before 1500, where the check is skipped and the photo taken unverified
- a stage name in the roster and a birth name in Wikipedia, or the reverse

For those, pass an explicit title: `python3 fetch_photos.py "id=Article Title"`.

## Weight

`photos/` is around 170 MB; `.git` is four times that, because every re-encode
is a new blob forever. `resize_photos.sh` now leaves a file alone if it is
already a JPEG within budget — keep it that way. Re-encoding everything to save
a megabyte costs a permanent copy of every portrait.

## Afterwards

`node roster_clean.mjs` — it reports photographs with no entry, entries with no
photograph, and missing face crops. Then `node roster_stats.mjs` for the count
to report.
