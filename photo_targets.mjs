// photo_targets.mjs — work out who to photograph next, country by country.
//
//   node photo_targets.mjs [perCountry]      (default 3)
//
// Writes photo_targets.json: for every country in the roster, an ordered list
// of candidates who don't have a portrait yet. fetch_photos.py --targets walks
// that file, tries each candidate against Wikipedia in turn, and stops once a
// country has its quota — so a name with no article costs nothing but a miss.
//
// Breadth first: countries with no photo at all are listed before countries
// topping up, because one face everywhere beats five faces in three places.

import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// data.js and photos.js are ES modules with a .js extension, which node reads
// as CommonJS — `import { PEOPLE } from './data.js'` throws. Copy them to .mjs
// and import that instead. The browser has no such problem; this is a node
// quirk, not a fault in the files.
async function loadModules(names) {
  const dir = mkdtempSync(join(tmpdir(), 'famous-baby-'));
  try {
    const out = [];
    for (const n of names) {
      const dest = join(dir, n.replace(/\.js$/, '.mjs'));
      copyFileSync(n, dest);
      out.push(await import(pathToFileURL(dest).href));
    }
    return out;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const [{ PEOPLE }, { HAS_PHOTO }] = await loadModules(['data.js', 'photos.js']);

const args = process.argv.slice(2);
// --have lists everyone who already has a portrait, so the fetcher can pull
// them again at a higher resolution. The face crops are cut from these files,
// and a crop of an already-downsized picture has no detail left to give.
const haveMode = args.includes('--have');
const perCountry = Math.max(1, Number(args.find(a => /^\d+$/.test(a))) || 3);
// How many names to put in front of the fetcher per country. It stops once a
// country has its quota, so a longer slate costs nothing but misses — and the
// misses are cheap, one batched API call each. The default of 14 is a breadth
// figure: fine when every country wants two or three, useless for depth, where
// the USA is 328 portraits short and 14 a pass would take two dozen passes.
//   node photo_targets.mjs 60 --slate 80
const slateAt = args.indexOf('--slate');
const slate = slateAt >= 0 ? Math.max(1, Number(args[slateAt + 1]) || 14) : 14;

// A rough notability proxy, since the roster carries no sitelink count. Awards
// weigh most: an entry someone bothered to list awards for is an entry the
// wider world has heard of, and those are the ones with a photo on Wikipedia.
function score(p) {
  const awards = (p.awards || []).length;
  const collabs = (p.collaborators || []).length;
  const teams = (p.teams || []).length;
  const bio = (p.bio || '').length;
  return awards * 3 + collabs + teams + bio / 200;
}

if (haveMode) {
  const have = PEOPLE
    .filter(p => HAS_PHOTO.has(p.id))
    .map(p => ({ id: p.id, name: p.name, birthYear: p.birthYear || null, field: p.field || '' }));
  const { writeFileSync: wf } = await import('node:fs');
  wf('photo_refetch.json', JSON.stringify([{ country: 'ALL', have: 0, want: have.length, candidates: have }], null, 1) + '\n');
  console.log(`wrote photo_refetch.json (${have.length} portraits to pull again)`);
  process.exit(0);
}

const byCountry = new Map();
for (const p of PEOPLE) {
  if (!p.country) continue;
  if (!byCountry.has(p.country)) byCountry.set(p.country, { have: 0, candidates: [] });
  const e = byCountry.get(p.country);
  if (HAS_PHOTO.has(p.id)) { e.have++; continue; }
  e.candidates.push(p);
}

const out = [];
for (const [country, e] of byCountry) {
  const want = Math.max(0, perCountry - e.have);
  if (!want) continue;
  const ranked = e.candidates.sort((a, b) => score(b) - score(a));
  out.push({
    country,
    have: e.have,
    want,
    // Try a generous slate: most misses are people with no English article,
    // and each miss is one cheap API call.
    candidates: ranked.slice(0, slate).map(p => ({
      id: p.id,
      name: p.name,
      birthYear: p.birthYear || null,
      field: p.field || '',
    })),
  });
}

// Countries with nothing first, then the thinnest, so a truncated run still
// spreads as widely as possible.
out.sort((a, b) => a.have - b.have || b.want - a.want || a.country.localeCompare(b.country));

writeFileSync('photo_targets.json', JSON.stringify(out, null, 1) + '\n');

const bare = out.filter(c => c.have === 0).length;
console.log(`${byCountry.size} countries in the roster`);
console.log(`${bare} with no portrait at all; ${out.length} short of ${perCountry}`);
console.log(`wrote photo_targets.json (${out.reduce((n, c) => n + c.candidates.length, 0)} candidates)`);
