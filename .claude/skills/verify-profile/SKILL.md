---
name: verify-profile
description: Check that entries in data.js are actually correct — dates, birthplace, country, the photograph being the right person, and the field they're filed under. Use for "check these profiles", "is this right", "audit the roster", or after a bulk import.
---

# Verifying a profile

Most of the roster arrived by automated import. It is right more often than
not, and the failures are specific and worth hunting.

## What actually goes wrong

1. **The photograph is somebody else.** The worst failure, because it is
   invisible. It happens when a name resolves to the wrong article, or when a
   file is fetched under an id that doesn't belong to it. Check the id against
   the person: `photos/<id>.jpg` and `photos/faces/<id>.jpg` must both be that
   person. This has happened — Waberi's photograph was saved under a
   marathon runner's id.
2. **Country is a birthplace accident.** John McCain was born in the Panama
   Canal Zone; that does not make him Panama's answer. Ask whether the country
   would claim them.
3. **Field is wrong.** The classifier weights Wikidata occupations, and
   Wikidata calls Vargas Llosa a film director and Kasparov a writer. Check
   `field`/`subfield` against what the person is actually known for.
4. **Duplicates.** Same person twice under different ids — check by folded
   name as well as by id. Four exist in the roster right now: herbie-hancock,
   gilberto-gil, otto-hahn, irene-joliot-curie.
5. **Dates.** BCE years, estimated ancient dates, and off-by-one birth years.
6. **The blocklist.** Anyone whose fame rests on mass killing should not be a
   suggested baby name.

## How to check

Confirm against the English Wikipedia article's opening paragraph — that is
the same evidence `fetch_photos.py` uses, and it carries the birth year, the
birthplace and what the person did.

```bash
python3 -c "import importlib.util;spec=importlib.util.spec_from_file_location('fp','fetch_photos.py');fp=importlib.util.module_from_spec(spec);spec.loader.exec_module(fp);print(fp.lookup_batch(['NAME'],640))"
```

Structural checks worth running over the whole file:

- every `id` unique
- every id in `photos.js` matches an entry
- every entry's `country` appears in `COUNTRY_COORDS` in `app.js`, or the globe
  can never place them
- `birthYear` present, `field` and `subfield` from the existing taxonomy

Report what's wrong and fix it; don't quietly drop a person to make a count
look better.
