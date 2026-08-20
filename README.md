# famous Baby

**An almanac for naming.** A baby-naming reference site for parents who want a story behind the name, not just a sound. Search a curated dataset of famous people by *anything except their name* — birthplace, era, field, awards, collaborators — and arrive at a name with a life already attached.

Static HTML + Vue 3 (loaded from CDN, no build step). All data lives in `data.js`; all UI in `index.html`, `app.js`, and `styles.css`.

---

## Quick start

The site is pure static HTML — no `npm install`, no build step. You just need Python 3 (preinstalled on macOS) to serve the files. From a fresh clone:

```bash
git clone https://github.com/YOUR_USERNAME/famous-baby.git
cd famous-baby
./run.sh
```

That starts a local web server on **http://localhost:8080** and opens the page in your browser. Stop the server with `Ctrl+C`.

If `./run.sh` doesn't execute (permissions), run it once manually with `bash run.sh`, or fall back to:

```bash
python3 -m http.server 8080
```

…and open `http://localhost:8080` yourself.

---

## Why no build step?

Vue 3 is loaded from a CDN as an ES module (see the import at the top of `app.js`). The site needs only:

- Python 3 (any version 3.6+) to serve files
- A modern browser (anything from the last 5 years; ES modules required)

No Node.js, no bundler, no package manager.

(There is a `package.json` at the root, and it is not a build step — it has no
dependencies and nothing installs it. It says `"type": "module"` and nothing
else that matters, so that Node reads this repo's own `.js` files as the ES
modules they already are. Without it the `.mjs` maintenance tools cannot
`import { PEOPLE } from './data.js'` at all. The browser never reads it.) Edit a file, refresh the browser, see the change. Cache-busting query strings on `app.js` and `data.js` mean a normal refresh always picks up edits — no hard reload needed.

---

## What's in the repo

```
famous-baby/
├── README.md          ← you are here
├── run.sh             ← one-command launcher
├── index.html         ← page shell + Vue templates
├── app.js             ← Vue 3 app logic, search, filtering, modal
├── styles.css         ← editorial + sports themes (toggleable)
├── data.js            ← THE dataset — ~424 famous people
├── photos/            ← portraits, one per entry id: <id>.jpg
├── photos.js          ← GENERATED manifest of which ids have a portrait
├── fetch_photos.py    ← (utility) downloads portraits + rewrites photos.js
├── merge_data.js      ← (utility) tooling for batch merges into data.js
├── find_short_bios.mjs ← (utility) lists entries with short bios
├── verify_lengths.mjs ← (utility) verifies bio character counts
└── .gitignore
```

The four files that *make the site* are `index.html`, `app.js`, `styles.css`, and `data.js`. The `.mjs` and `merge_data.js` scripts are tooling — handy for editing the dataset but not required to run the site.

---

## Editing the data

Every entry in `data.js` follows this schema:

```js
{ id:'kebab-case-id',
  name:'Full Name',
  gender:'male' | 'female' | 'nonbinary',
  birthYear: 1942,
  birthPlace:'City, Country',
  country:'Country',
  field:'Top Field',          // e.g. Music, Sports, Film, Science
  subfield:'Sub Field',       // e.g. Pop, NBA, Director, Physics
  teams:    [{name:'Team', years:[start, end]}],   // [] if N/A
  awards:   [{name:'Award', year:YYYY}],           // [] if none
  collaborators:['Other Person', '…'],             // [] if none
  bio:'One sentence to several sentences.'         // editorial voice
}
```

After editing, sanity-check the file:

```bash
node --check data.js
```

A silent exit means it parses. Any error tells you the line and column to fix.

---

## Photos

Portraits live in `photos/` and are matched to entries **by filename**: `photos/<person.id>.jpg`. A name that doesn't equal an id is a photo that never shows.

`photos.js` is the manifest the site reads to know which entries have a face — the globe's country popout uses it to decide whose portraits to float above a country. It is **generated, never hand-edited**. After adding or renaming a portrait, rerun:

```bash
python3 fetch_photos.py --manifest      # rebuild photos.js from the folder
python3 fetch_photos.py id=Wiki_Title   # or fetch a new one (also rebuilds)
```

Fetched images are Wikipedia thumbnails capped at 640px (`--width` to change). The originals run to 8 MB apiece, which the globe layer can't afford to load several of at once.

To fill in whole countries rather than named people:

```bash
node photo_targets.mjs 3                        # who to try, per country
python3 fetch_photos.py --targets photo_targets.json
./resize_photos.sh                              # 512px / q72, macOS sips
```

`photo_targets.mjs` ranks candidates per country and lists countries with no portrait first, so a run cut short still spreads as widely as possible. The fetcher only keeps a photo when the article's opening paragraph contains that person's birth year — matching a name to an article title is usually right, but "no image" is a better answer than the wrong face.

### Two copies of every portrait

- `photos/<id>.jpg` — the whole picture. What the person's card shows, and the one **committed**.
- `photos/faces/<id>.jpg` — a tight square crop of the face. Build input for the sprite sheet, and **not in git**.

Only `atlas.jpg` reaches the browser; nothing ever requests a face crop over
HTTP. Keeping 2,325 of them in the repository cost 58 MB and a fresh blob
apiece every time the crop parameters moved, so they are gitignored and
regenerated instead. **A fresh clone has no `photos/faces/`** — run `facecrop`
before `build_atlas.py`, or the sheet falls back to uncropped portraits and the
mosaic shows a lot of chests.

The mosaic fits a portrait into a tessera, so a head-and-shoulders shot reads well and a full-length one leaves the face a few pixels tall. Regenerate the crops after adding photos:

```bash
swiftc -O facecrop.swift -o facecrop     # once; needs Xcode command line tools
./facecrop photos photos/faces 512 0.72
```

Face detection is Vision's, which ships with macOS — no pip or npm dependency. Of the current 2,325 it finds a face in 2,236; paintings and statues (Mansa Musa, Nzinga Mbande) account for the 89 that fall back to a crop of the upper-middle, which is where a portrait's subject almost always is. `build_atlas.py` falls back to the uncropped portrait if a crop is missing, so a missing face file is never fatal.

**Always finish with `resize_photos.sh`.** Wikipedia doesn't always honour the width asked for, and the fetcher saves every file as `<id>.jpg` whatever the bytes really are, so PNGs arrive wearing a `.jpg` suffix.

It only touches what needs touching: a real JPEG already inside the edge
budget is left byte for byte, so git sees no change. It used to re-encode
everything and keep whichever copy came out smaller, which is not the same
thing — on a pass where four portraits were new, that rewrote 967 files to
save one megabyte between them. Every one of those is a new blob, which is why
history holds 711 MB of photographs against 169 MB on disk.

### The sprite sheet the globe draws from

The globe's mosaic has several hundred faces on screen at once, every frame. As
separate elements that is several hundred decodes, and a decoded image costs its
pixel area times four bytes whatever the file weighs — which is how this page
used to run a phone out of memory. So the faces are composed into one sheet:

```bash
python3 build_atlas.py            # 48px cells → atlas.jpg + atlas.js
python3 build_atlas.py --cell 64  # sharper, four times the memory
```

**Rerun it after adding or removing any portrait.** `atlas.js` maps an id to a
cell *by position*, so regenerating only one of the two files silently shifts
every face onto the wrong person.

The sheet lives at the repo root, deliberately **not** in `photos/`.
`fetch_photos.py --manifest` rebuilds `photos.js` by globbing `photos/*.jpg` and
taking every filename stem as a person's id — so a sprite sheet parked in there
gets enrolled in the roster as someone called "atlas", which it duly was.

---

## Name origins

The card says what a name *is*, not just how often it was given. English
Wiktionary writes that as a proper-noun sense on the name's own page — "A female
given name from Shona", "A male given name from Arabic, variant of Karim" —
which is already the sentence the card wants.

```bash
python3 fetch_name_origins.py           # everything not already cached
python3 fetch_name_origins.py --force   # ignore the cache and refetch
```

Writes `name_origins.js`, keyed by the given name folded the way `app.js` folds
it (NFKD, accents stripped, lower case) so the lookup is a plain index. Answers
are cached in `name_origins_cache.json`, **misses included** — about half the
roster's given names have no Wiktionary page, and without remembering that, a
re-run spends its whole time asking again.

Eight requests at a time: serially this is a half-hour job, since the round trip
is ~0.9s and there are ~1,850 distinct given names. The script sends a
descriptive `User-Agent`, which Wikimedia asks of automated clients.

Wiktionary is **CC BY-SA**, so the card credits it wherever it shows an origin.
That credit is a condition of using the text, not a courtesy — don't remove it.

---

## Sources on the card

Every bio here was written off Wikipedia and every name origin off Wiktionary,
and for a long time the card said neither. It now carries a **Sources** line
under the bio linking to both.

```bash
python3 fetch_sources.py              # everything not already cached
python3 fetch_sources.py --limit 25   # a sample, to check the hit rate
python3 fetch_sources.py --force      # ignore the cache
```

Writes `sources.js` — entry id to English Wikipedia article title. Answers are
cached in `sources_cache.json`, misses included. **Rerun it after adding
people**, or their cards link nowhere.

Matching a name to an article title is usually right and occasionally very
wrong: names are shared, and some resolve to a band, a ship or a town. So the
same check `fetch_photos.py` uses applies here — **the birth year has to appear
in the article's opening paragraph.** A wrong link is worse than no link.

Current run, 2,514 entries:

| | |
|---|---|
| Linked, birth year verified | **2,227** |
| Linked, unverifiable (born pre-1500 or undated) | 154 |
| Rejected — disambiguation page | 11 |
| Rejected — no article | 4 |
| Rejected — intro never names the birth year | ~118 |
| **Total linked** | **2,439 (97%)** |

The links carry `rel="noopener"` and deliberately **not** `noreferrer`. The
point of them is to send readers *and* the credit that comes with them; strip
the referrer and Wikipedia sees the traffic arrive from nowhere. `noopener`
alone is the safety part.

`name_origins.js` stores the Wiktionary title beside each sentence (`{t, s}`),
so the credit links to the page actually quoted rather than to a guess at how
the name is spelled.

---

## Themes

Top-right of the masthead toggles between two aesthetics, both fully styled:

- **Editorial** — cream paper, Fraunces serif, magazine almanac feel
- **Broadcast** — navy + accent blue + condensed italic display, NFL/NBA scoreboard feel

Choice persists in `localStorage` so it survives reloads.

---

## Daily content routines

Two automated tasks run daily on the original author's machine via Cowork's scheduled tasks (configured outside the repo). They edit `data.js` directly:

- **6:01 AM** — adds 10 new entries using a rotation strategy (gaps / today's birthdays / connections to existing entries).
- **7:07 AM** — augments existing bios with verifiable additional sentences, picking the shortest bios first.

If you fork the project these routines won't follow you — they're personal-machine workflows, not part of the repo.

---

## Deploying

Because the site is fully static, you can host it free on **GitHub Pages**:

1. Push `main` to GitHub.
2. Settings → Pages → Build from branch → `main` → `/ (root)` → Save.
3. Wait ~1 minute. Your site is live at `https://YOUR_USERNAME.github.io/famous-baby/`.

Any commit pushed to `main` redeploys automatically.

---

## Status

This is a working prototype. The 424-entry dataset is hand-curated (with daily augmentation). The product question — whether story-led naming earns enough engagement to stand on its own as a destination — is what the dataset is built to answer.
