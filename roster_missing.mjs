// roster_missing.mjs — which countries the globe draws but the roster can't fill.
//
//   node roster_missing.mjs        # writes roster_missing.json
//
// The globe draws 177 shapes from world-atlas. Every one of them is a country
// somebody was born in, and every one of them should be able to show a face.
// This lists the ones that can't yet, ready for roster_candidates.py to go
// looking for people.
//
// Each shape carries its ISO 3166-1 numeric code (174 of the 177 do), which is
// what the Wikidata lookup keys on — "Bosnia and Herz." and "eSwatini" have no
// chance of matching a Wikidata label by string.

import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const WORLD_TOPO = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const TOPOJSON = 'https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js';

// data.js is an ES module with a .js extension, which node reads as CommonJS.
async function loadModule(name) {
  const dir = mkdtempSync(join(tmpdir(), 'famous-baby-'));
  try {
    const dest = join(dir, name.replace(/\.js$/, '.mjs'));
    copyFileSync(name, dest);
    return await import(pathToFileURL(dest).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// This node is old enough to predate global fetch, and the repo has no
// dependencies to lean on, so use the http module directly.
import { get } from 'node:https';
function fetchText(url) {
  return new Promise((resolve, reject) => {
    get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchText(new URL(res.headers.location, url).href));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`${url} -> ${res.statusCode}`)); }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', c => { body += c; });
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

const { PEOPLE } = await loadModule('data.js');

// The same outlines and the same name aliases the globe itself uses, read out
// of app.js rather than duplicated here — a second copy would drift.
const app = readFileSync('app.js', 'utf8');
const aliasBlock = app.slice(app.indexOf('const GEO_NAME_ALIASES'),
                             app.indexOf('};', app.indexOf('const GEO_NAME_ALIASES')));
const aliases = Object.fromEntries(
  [...aliasBlock.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m => [m[1], m[2]]));

const mod = { exports: {} };
new Function('module', 'exports', await fetchText(TOPOJSON))(mod, mod.exports);
const topo = JSON.parse(await fetchText(WORLD_TOPO));
const features = mod.exports.feature(topo, topo.objects.countries).features;

const have = new Set(PEOPLE.filter(p => p.country).map(p => p.country));

const missing = [];
for (const f of features) {
  const atlas = f.properties && f.properties.name;
  if (!atlas) continue;
  const mapped = aliases[atlas] || atlas;
  if (have.has(mapped)) continue;
  missing.push({ iso: f.id ?? null, atlas, mapped });
}

writeFileSync('roster_missing.json', JSON.stringify(missing, null, 1) + '\n');
const noIso = missing.filter(m => !m.iso).map(m => m.atlas);
console.log(`${features.length} shapes on the globe, ${have.size} country names in the roster`);
console.log(`${missing.length} with nobody at all -> roster_missing.json`);
if (noIso.length) console.log(`no ISO code (skipped by the lookup): ${noIso.join(', ')}`);
