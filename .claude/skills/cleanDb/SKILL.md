---
name: cleanDb
description: Clean the famous-baby dataset — remove duplicate people, find entries that are broken or invisible, and refresh the bios of people who are still alive and still doing things. Use for "clean the DB", "dedupe", "check for errors", "the bios are out of date".
---

# Cleaning the dataset

Three passes. The first two are mechanical; the third needs judgement and a
source, and only applies to the living.

## 1. The mechanical pass

```bash
node roster_clean.mjs           # report
node roster_clean.mjs --fix     # remove duplicates, keeping the fuller twin
```

It finds duplicate ids, the same person under two ids, photographs with no
entry, entries with no country the globe can place, and files on disk that
nothing points at. `--fix` only ever removes duplicates; everything else is
reported for a person to decide.

Two things it learned the hard way, both now built in:

- **Entries are brace-matched, never regex-matched.** An entry contains nested
  objects — `teams` and `awards` are arrays of them — so a lazy
  `/\{ id:'x'[\s\S]*?\},/` stops at the first inner `},` and leaves half an
  entry behind. That produced a `data.js` that wouldn't parse.
- **The result is imported before it is written.** If it doesn't parse, the
  file is left untouched.

Afterwards, a dropped twin may have owned the photograph. Move it onto the
surviving id or delete it, then `python3 fetch_photos.py --manifest`.

## 2. What the checker can't see

Read `verifyProfile` for these — the photograph being the wrong person, a
country that is a birthplace accident, a field that doesn't match what someone
is known for. None of them are detectable mechanically.

## 3. Refreshing bios — living people only

A dead person's biography does not change. A living one's does: a new album, a
new film, an election, a world record, a retirement. This pass is for them.

**Establish that they are alive before touching anything.** The roster has no
death field, so ask Wikidata:

```sparql
SELECT ?person ?personLabel ?death WHERE {
  ?person rdfs:label "NAME"@en .
  OPTIONAL { ?person wdt:P570 ?death }
}
```

No `P570` and a birth year within living memory means alive. If in doubt, skip
— saying someone is still recording when they died last year is the worst
thing this dataset could do, and nobody would catch it.

Then work from the current English Wikipedia article, not from memory:

```bash
python3 -c "import importlib.util;spec=importlib.util.spec_from_file_location('fp','fetch_photos.py');fp=importlib.util.module_from_spec(spec);spec.loader.exec_module(fp);d=fp.lookup_batch(['NAME'],640);print(d['NAME']['extract'][:1500])"
```

Batch at 20 titles at most — extracts come back empty past that, with no error.

**Add, don't rewrite.** The older bios were written by hand and are better than
anything generated. A refresh is a clause or a sentence on the end, and every
one of them has to be in the article.

## Finish

`node roster_clean.mjs` again to confirm, then `/rosterStats` for the counts,
and report what was removed by name. A person quietly disappearing from the
roster is worse than a duplicate staying in it.
