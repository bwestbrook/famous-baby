---
name: augmentProfile
description: Deepen profiles that already have content — longer bios, contemporaries, friends and foes, more awards and collaborators. Use for "make these richer", "expand the bios", "add more detail to the good entries".
---

# Augmenting a profile that already has something

`fillInProfile` fills what's empty. This deepens what's thin: entries that
already read properly and could carry more.

## What to add

1. **A longer bio.** The shortest bios are the ones to grow — sort by length
   and start at the bottom. Add sentences that carry a fact, not adjectives.
2. **`contemporaries`** — people working at the same time in the same field.
   This is what makes the roster feel like a world rather than a list.
3. **`friends`** and **`foes`** — real, documented relationships only. A foe is
   a rivalry someone wrote about, not a disagreement inferred from dates.
4. **More `awards` and `collaborators`** on entries that have one or two.
5. **`homophones` and `similarSpellings`** — names that sound alike or are
   spelled a step apart. Directly useful on a naming site, and present on only
   about half the roster.

## Prefer connections inside the roster

A `collaborator` or `contemporary` already in `data.js` becomes a link the card
can follow; one who isn't becomes a search that finds nothing. Check first:

```bash
node --input-type=module -e "
import {mkdtempSync,copyFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';
import {join} from 'node:path';import {pathToFileURL} from 'node:url';
const d=mkdtempSync(join(tmpdir(),'fb-'));copyFileSync('data.js',join(d,'a.mjs'));
const {PEOPLE}=await import(pathToFileURL(join(d,'a.mjs')).href);rmSync(d,{recursive:true,force:true});
console.log(PEOPLE.filter(p=>/NAME/i.test(p.name)).map(p=>p.name+' — '+p.country));"
```

## Rules

- **Every added sentence must be checkable** against the article. This pass is
  where invented detail would enter the dataset, and it would never be caught.
- **Don't rewrite what's there.** Add to it. The older bios were written by
  hand and are better than anything generated.
- **Stop when the entry is good.** Length is not the goal; a name with a life
  attached is.
