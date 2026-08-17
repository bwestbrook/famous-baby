// names_popularity.mjs — build the popularity series behind the name graph.
//
//   node names_popularity.mjs        # writes names.js
//
// Two sources, because a baby and a dog are named from different books:
//
//   BABY — US Social Security Administration, via hadley/data-baby-names.
//          Every name in the top thousand of either sex, 1880 to 2008, as a
//          share of births that year. Real counts, US only. The card says so:
//          a chart labelled "US births" can't be mistaken for the world.
//
//   PET  — New York City dog licences (NYC Open Data), counted by the dog's
//          year of birth. One city, but it is the largest public register of
//          animal names there is, and nothing else is both free and per-year.
//
// Only names somebody in the roster actually carries are kept, which is what
// makes the file small enough to ship: 800-odd names out of a hundred thousand.
//
// Series are stored as { s: startYear, v: [...] } with one value per year from
// s onward. Baby values are parts-per-million of births; pet values are counts.

import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { get } from 'node:https';

const BABY_CSV = 'https://raw.githubusercontent.com/hadley/data-baby-names/master/baby-names.csv';
const PET_API = 'https://data.cityofnewyork.us/resource/nu7n-tubp.json'
  + '?$select=animalname,animalbirth,count(*) as n&$group=animalname,animalbirth&$limit=200000';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    get(encodeURI(url), res => {
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

// The same rule app.js uses to decide what a person's given name is.
const givenName = (name) => String(name || '').trim().split(/\s+/)[0] || '';
// Compared without case or accents: the roster writes "Zinédine", the SSA
// writes "ZINEDINE", and they are the same name.
const key = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();

const { PEOPLE } = await loadModule('data.js');
const wanted = new Map();               // folded key -> display name
for (const p of PEOPLE) {
  const g = givenName(p.name);
  if (g.length > 1) wanted.set(key(g), g);
}
console.log(`${wanted.size} distinct given names in the roster`);

// ---- babies ---------------------------------------------------------------
console.log('fetching SSA series…');
const csv = await fetchText(BABY_CSV);
const babyRaw = new Map();              // key -> Map(year -> parts per million)
let minYear = Infinity, maxYear = -Infinity;
for (const line of csv.split('\n').slice(1)) {
  if (!line) continue;
  // year,"name",percent,"sex" — the name is quoted, the numbers are not.
  const m = line.match(/^(\d+),"([^"]+)",([\d.eE+-]+),"([^"]+)"/);
  if (!m) continue;
  const k = key(m[2]);
  if (!wanted.has(k)) continue;
  const year = +m[1];
  // Both sexes are listed separately; a name can appear twice in a year.
  const ppm = Math.round(parseFloat(m[3]) * 1e6);
  if (!babyRaw.has(k)) babyRaw.set(k, new Map());
  const series = babyRaw.get(k);
  series.set(year, (series.get(year) || 0) + ppm);
  if (year < minYear) minYear = year;
  if (year > maxYear) maxYear = year;
}
console.log(`  ${babyRaw.size} of them appear in the SSA data (${minYear}-${maxYear})`);

// ---- pets -----------------------------------------------------------------
console.log('fetching NYC dog licences…');
const petRows = JSON.parse(await fetchText(PET_API));
const petRaw = new Map();
let petMin = Infinity, petMax = -Infinity;
const thisYear = maxYear + 20;          // a sanity ceiling, not a real clock
for (const r of petRows) {
  const nm = (r.animalname || '').trim();
  if (nm.length < 2) continue;
  const k = key(nm);
  if (!wanted.has(k)) continue;
  const year = +r.animalbirth;
  // The register has dogs born in year 1 and in the future; ignore those.
  if (!(year >= 1980 && year <= thisYear)) continue;
  if (!petRaw.has(k)) petRaw.set(k, new Map());
  const series = petRaw.get(k);
  series.set(year, (series.get(year) || 0) + (+r.n || 0));
  if (year < petMin) petMin = year;
  if (year > petMax) petMax = year;
}
console.log(`  ${petRaw.size} of them appear in the licence register (${petMin}-${petMax})`);

// ---- write ----------------------------------------------------------------
function pack(raw, lo, hi) {
  const out = {};
  for (const [k, series] of raw) {
    const vals = [];
    for (let y = lo; y <= hi; y++) vals.push(series.get(y) || 0);
    // Trim the dead years off both ends so a name that only ran for a decade
    // doesn't ship a century of zeroes.
    let a = 0, b = vals.length - 1;
    while (a < vals.length && vals[a] === 0) a++;
    while (b >= a && vals[b] === 0) b--;
    if (a > b) continue;
    out[k] = { s: lo + a, v: vals.slice(a, b + 1) };
  }
  return out;
}

const baby = pack(babyRaw, minYear, maxYear);
const pet = pack(petRaw, petMin, petMax);
const js = `// Generated by names_popularity.mjs — do not edit by hand.
//
// How often a given name was used, over time, from two public registers.
//
//   BABY_NAMES — US Social Security Administration, 1880-${maxYear}, every name in
//                the top thousand of either sex. Values are parts per million
//                of US births that year. US only; the card says so.
//   PET_NAMES  — New York City dog licences, by the dog's year of birth.
//                Values are counts of licensed dogs. One city, but it is the
//                largest public register of animal names available.
//
// Keyed by the given name folded to lower case without accents, which is how
// app.js looks a person's name up. { s: firstYear, v: [one value per year] }.
export const BABY_NAMES = ${JSON.stringify(baby)};

export const PET_NAMES = ${JSON.stringify(pet)};

export const NAME_SOURCES = {
  baby: { label: 'US births', note: 'US Social Security Administration' },
  pet:  { label: 'NYC dog licences', note: 'New York City Open Data' },
};
`;
writeFileSync('names.js', js);
console.log(`\nwrote names.js — ${Object.keys(baby).length} baby series, ${Object.keys(pet).length} pet series`);
