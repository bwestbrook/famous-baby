---
name: rosterStats
description: Show what is actually in the famous-baby dataset as ASCII tables — totals, photo coverage, spread by calling and decade, how full the entries are, and which countries are thinnest. Use for "show me the stats", "how big is the DB", "where is the roster thin", or before and after a bulk import.
---

# Reading the dataset

```bash
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
- **BY DECADE OF BIRTH** — whether the roster is a museum or a nursery. A
  naming almanac wants both ends: names being given now, and names with a
  century behind them.
- **HOW FULL THE ENTRIES ARE** — the honest one. Most entries are imported
  stubs. This is the queue for `fillInProfile` and `augmentProfile`, and the
  number to watch is bios over 120 characters.
- **THINNEST** — countries under five photographs, which is where
  `findNewPeople` should point next.

## Reading it

The photo column matters more than the people column: a person without a
photograph never appears on the globe, so a country with twelve entries and
one portrait is a country with one face.

Quote the numbers when reporting a pass — before and after — rather than
saying it went well.
