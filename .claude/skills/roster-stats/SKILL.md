---
name: roster-stats
description: Show what is actually in the famous-baby dataset as ASCII tables — totals, photo coverage, spread by calling and decade, how full the entries are, and which countries are thinnest. Use for "show me the stats", "how big is the DB", "where is the roster thin", or before and after a bulk import.
---

# Reading the dataset

Run it from the repository root, not from this skill's own directory — the
script lives beside `data.js`, which is what it reads.

```bash
cd /Users/benjaminwestbrook/Repositories/famous-baby
node roster_stats.mjs           # the standard read
node roster_stats.mjs --full    # every country instead of the top and bottom
```

Counts only — nothing here changes anything. Run it before and after any
import so the effect of a pass is a number rather than an impression.

## What the tables are for

- **ROSTER** — the headline: people, how many have a photograph, how many
  countries, and any duplicate ids. Duplicates are listed by name because they
  are otherwise invisible; four have been sitting in the file for a long time.
- **BY CALLING** — the site's balance. Sports and Music run away with it on
  every automated pass, because that is what sitelinks reward. If a pass makes
  those bars longer and the others flat, the field weighting needs looking at.
- **BY CENTURY** — the long view, hundred-year chunks including BC. Decades
  say where the roster is bunched; centuries say whether it reaches back at
  all, which was the point of going to 1000 AD in the first place.
- **BY DECADE OF BIRTH** — whether the roster is a museum or a nursery. A
  naming almanac wants both ends: names being given now, and names with a
  century behind them.
- **BY CATEGORY** — subfield inside calling, which is the level the site
  actually filters on. Grouped as `field › category`, because "Classical"
  under Music and "Classical" under Architecture are different things and the
  data keeps them apart. This is where a calling turns out to be one category
  wearing a field's name — Sports is mostly NBA, Music mostly Pop.
- **HOW FULL THE ENTRIES ARE** — the honest one. Most entries are imported
  stubs. This is the queue for `fill-in-profile` and `augment-profile`, and the
  number to watch is bios over 120 characters.
- **THINNEST** — countries under five photographs, which is where
  `find-new-people` should point next.

## Reading it

The photo column matters more than the people column: a person without a
photograph never appears on the globe, so a country with twelve entries and
one portrait is a country with one face.

Quote the numbers when reporting a pass — before and after — rather than
saying it went well.
