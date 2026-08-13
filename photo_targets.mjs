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

const perCountry = Math.max(1, Number(process.argv[2]) || 3);

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
    candidates: ranked.slice(0, 14).map(p => ({
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
