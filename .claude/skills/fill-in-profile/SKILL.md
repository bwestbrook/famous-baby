---
name: fill-in-profile
description: Fill the empty fields on stub entries in data.js — middleName, teams, awards, collaborators, and a real bio in place of the imported one-liner. Use for "flesh these out", "fill in the blanks", "these entries are bare".
---

# Filling in a stub

The imported entries carry the minimum: name, date, birthplace, country,
field, subfield, and a bio that reads "Born in Kabul, Afghanistan, in 1965.
Physician and physician writer." That is deliberately plain — a bio that reads
well and is quietly wrong is worse than a short one that's right — and this is
the pass that replaces it.

## The empty fields, in order of worth

1. **`bio`** — a sentence or three in the site's voice. What they did, why the
   name is worth knowing. Every clause has to be checkable.
2. **`awards`** — `[{name:'Award', year:YYYY}]`. The thing that makes someone
   findable by something other than their name.
3. **`collaborators`** — names of other people, which the card turns into links
   into the rest of the roster. Prefer people already in `data.js`.
4. **`teams`** — `[{name:'Team', years:[start,end]}]`, for anyone who played
   for something.
5. **`middleName`** — 38% of the roster has none recorded. It's a naming site;
   middle names are content, not metadata.

## Where the facts come from

The English Wikipedia article, and nothing else without saying so. Use the
same lookup the photo fetcher uses so the evidence is the article text rather
than memory:

```bash
python3 -c "import importlib.util;spec=importlib.util.spec_from_file_location('fp','fetch_photos.py');fp=importlib.util.module_from_spec(spec);spec.loader.exec_module(fp);d=fp.lookup_batch(['NAME'],640);print(d['NAME']['extract'][:1200])"
```

Batch at 20 titles at most — extracts silently come back empty past that.

## Rules

- **Leave a field empty rather than guess it.** An empty `awards` array is
  honest; an invented award is not, and nobody will ever catch it.
- **Match the surrounding voice.** Read neighbouring bios first. They are
  editorial, specific and short.
- **Don't touch the taxonomy.** Map onto `field`/`subfield` values that already
  exist rather than inventing new ones.
- Work in batches, and `node --check` a `.mjs` copy of `data.js` afterwards.
