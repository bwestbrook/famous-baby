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

No Node.js, no bundler, no package manager. Edit a file, refresh the browser, see the change. Cache-busting query strings on `app.js` and `data.js` mean a normal refresh always picks up edits — no hard reload needed.

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
