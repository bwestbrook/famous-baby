// roster_stats.mjs — what is actually in the dataset, as a table.
//
//   node roster_stats.mjs            # the standard read
//   node roster_stats.mjs --full     # every country, not the top of the list
//
// Counts only. Nothing here decides anything; it is for looking at the shape
// of the roster and finding where it is thin.

import { readFileSync, existsSync, mkdtempSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const FULL = process.argv.includes('--full');

// data.js and photos.js are ES modules with a .js name, which node reads as
// CommonJS. Copy to .mjs and import that.
async function load(name) {
  if (!existsSync(name)) return null;
  const dir = mkdtempSync(join(tmpdir(), 'famous-baby-'));
  try {
    const dest = join(dir, name.replace(/\.js$/, '.mjs'));
    copyFileSync(name, dest);
    return await import(pathToFileURL(dest).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const { PEOPLE } = await load('data.js');
const photos = await load('photos.js');
const HAS_PHOTO = photos ? photos.HAS_PHOTO : new Set();

// ---- table drawing --------------------------------------------------------
const pad = (s, n) => String(s).padEnd(n);
const rpad = (s, n) => String(s).padStart(n);
function table(title, headers, rows, aligns = []) {
  const cols = headers.length;
  const w = headers.map((h, i) =>
    Math.max(String(h).length, ...rows.map(r => String(r[i] ?? '').length)));
  const line = (l, m, r) => l + w.map(n => '─'.repeat(n + 2)).join(m) + r;
  const fmt = (cells) => '│ ' + cells.map((c, i) =>
    (aligns[i] === 'r' ? rpad(c ?? '', w[i]) : pad(c ?? '', w[i]))).join(' │ ') + ' │';
  const out = [];
  out.push('');
  out.push(title);
  out.push(line('┌', '┬', '┐'));
  out.push(fmt(headers));
  out.push(line('├', '┼', '┤'));
  for (const r of rows) out.push(fmt(r));
  out.push(line('└', '┴', '┘'));
  console.log(out.join('\n'));
}
// A bar that means something at a glance; width scales to the biggest value.
const bar = (n, max, width = 22) =>
  '█'.repeat(Math.max(n > 0 ? 1 : 0, Math.round((n / max) * width)));
const pct = (n, d) => (d ? (100 * n / d).toFixed(0) + '%' : '—');

// ---- the numbers ----------------------------------------------------------
const total = PEOPLE.length;
const shot = PEOPLE.filter(p => HAS_PHOTO.has(p.id)).length;
const countries = new Map();
for (const p of PEOPLE) {
  if (!p.country) continue;
  if (!countries.has(p.country)) countries.set(p.country, { n: 0, shot: 0 });
  const e = countries.get(p.country);
  e.n++;
  if (HAS_PHOTO.has(p.id)) e.shot++;
}
const ids = PEOPLE.map(p => p.id);
const dups = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];

table('ROSTER', ['', 'count', 'share'], [
  ['people', total, ''],
  ['with a photograph', shot, pct(shot, total)],
  ['countries', countries.size, ''],
  ['countries with 5+ photographed', [...countries.values()].filter(c => c.shot >= 5).length,
    pct([...countries.values()].filter(c => c.shot >= 5).length, countries.size)],
  ['countries with none', [...countries.values()].filter(c => c.shot === 0).length, ''],
  ['duplicate ids', dups.length, dups.length ? dups.join(', ') : 'none'],
], ['l', 'r', 'r']);

// by field
const fields = new Map();
for (const p of PEOPLE) {
  if (!p.field) continue;
  if (!fields.has(p.field)) fields.set(p.field, { n: 0, shot: 0 });
  const e = fields.get(p.field);
  e.n++;
  if (HAS_PHOTO.has(p.id)) e.shot++;
}
const fieldRows = [...fields].sort((a, b) => b[1].n - a[1].n);
const fieldMax = fieldRows[0] ? fieldRows[0][1].n : 1;
table('BY CALLING', ['field', 'people', 'photos', ''],
  fieldRows.map(([f, e]) => [f, e.n, e.shot, bar(e.n, fieldMax)]), ['l', 'r', 'r', 'l']);

// by century — the long view. Decades say where the roster is bunched;
// hundred-year chunks say whether it reaches back at all.
const cents = new Map();
for (const p of PEOPLE) {
  if (p.birthYear == null) continue;
  const c = Math.floor(p.birthYear / 100) * 100;
  if (!cents.has(c)) cents.set(c, { n: 0, shot: 0 });
  const e = cents.get(c);
  e.n++;
  if (HAS_PHOTO.has(p.id)) e.shot++;
}
const centRows = [...cents].sort((a, b) => a[0] - b[0]);
const centMax = Math.max(...centRows.map(r => r[1].n));
const centLabel = (c) => c < 0 ? `${Math.abs(c)}s BC` : `${c}–${c + 99}`;
table('BY CENTURY', ['born', 'people', 'photos', ''],
  centRows.map(([c, e]) => [centLabel(c), e.n, e.shot, bar(e.n, centMax)]),
  ['l', 'r', 'r', 'l']);

// by decade, for the part of the roster that is dense enough to have decades
const eras = new Map();
for (const p of PEOPLE) {
  if (p.birthYear == null) continue;
  const key = p.birthYear < 1800 ? 'before 1800'
    : p.birthYear < 1900 ? '1800s'
    : `${Math.floor(p.birthYear / 10) * 10}s`;
  eras.set(key, (eras.get(key) || 0) + 1);
}
const order = (k) => k === 'before 1800' ? -2 : k === '1800s' ? -1 : parseInt(k, 10);
const eraRows = [...eras].sort((a, b) => order(a[0]) - order(b[0]));
const eraMax = Math.max(...eraRows.map(r => r[1]));
table('BY DECADE OF BIRTH', ['born', 'people', ''],
  eraRows.map(([k, n]) => [k, n, bar(n, eraMax)]), ['l', 'r', 'l']);

// by category — the subfield inside each calling, which is the level the site
// actually filters on. Grouped under its field so "Classical" under Music and
// "Classical" under Architecture stay separate, as they do in the data.
const cats = new Map();
for (const p of PEOPLE) {
  if (!p.field || !p.subfield) continue;
  const key = p.field + ' › ' + p.subfield;
  if (!cats.has(key)) cats.set(key, { n: 0, shot: 0 });
  const e = cats.get(key);
  e.n++;
  if (HAS_PHOTO.has(p.id)) e.shot++;
}
const catRows = [...cats].sort((a, b) => b[1].n - a[1].n);
const catMax = catRows[0] ? catRows[0][1].n : 1;
const catsShown = FULL ? catRows : catRows.slice(0, 24);
table(FULL ? `EVERY CATEGORY (${catRows.length})`
           : `BY CATEGORY — top 24 of ${catRows.length} (--full for all)`,
  ['field › category', 'people', 'photos', ''],
  catsShown.map(([k, e]) => [k, e.n, e.shot, bar(e.n, catMax)]),
  ['l', 'r', 'r', 'l']);

// how complete the entries are
const has = (p, k) => Array.isArray(p[k]) ? p[k].length > 0 : !!(p[k] && String(p[k]).trim());
const longBio = PEOPLE.filter(p => (p.bio || '').length > 120).length;
table('HOW FULL THE ENTRIES ARE', ['field', 'filled', 'share'], [
  ['bio over 120 chars', longBio, pct(longBio, total)],
  ['middleName', PEOPLE.filter(p => has(p, 'middleName')).length, pct(PEOPLE.filter(p => has(p, 'middleName')).length, total)],
  ['awards', PEOPLE.filter(p => has(p, 'awards')).length, pct(PEOPLE.filter(p => has(p, 'awards')).length, total)],
  ['collaborators', PEOPLE.filter(p => has(p, 'collaborators')).length, pct(PEOPLE.filter(p => has(p, 'collaborators')).length, total)],
  ['teams', PEOPLE.filter(p => has(p, 'teams')).length, pct(PEOPLE.filter(p => has(p, 'teams')).length, total)],
  ['contemporaries', PEOPLE.filter(p => has(p, 'contemporaries')).length, pct(PEOPLE.filter(p => has(p, 'contemporaries')).length, total)],
  ['birth month and day', PEOPLE.filter(p => p.birthMonth && p.birthDay).length, pct(PEOPLE.filter(p => p.birthMonth && p.birthDay).length, total)],
], ['l', 'r', 'r']);

// countries — the deepest, and the thinnest, which is where work is needed
const byCountry = [...countries].sort((a, b) => b[1].n - a[1].n);
const cMax = byCountry[0] ? byCountry[0][1].n : 1;
const shown = FULL ? byCountry : byCountry.slice(0, 15);
table(FULL ? 'EVERY COUNTRY' : 'DEEPEST COUNTRIES (--full for all)',
  ['country', 'people', 'photos', ''],
  shown.map(([c, e]) => [c, e.n, e.shot, bar(e.n, cMax)]), ['l', 'r', 'r', 'l']);

if (!FULL) {
  const thin = byCountry.filter(([, e]) => e.shot < 5).sort((a, b) => a[1].shot - b[1].shot);
  table(`THINNEST — ${thin.length} countries under 5 photographs`,
    ['country', 'people', 'photos'],
    thin.slice(0, 15).map(([c, e]) => [c, e.n, e.shot]), ['l', 'r', 'r']);
}

const women = PEOPLE.filter(p => p.gender === 'female').length;
const men = PEOPLE.filter(p => p.gender === 'male').length;
console.log(`\nwomen ${women} (${pct(women, total)})   men ${men} (${pct(men, total)})   `
  + `other/unrecorded ${total - women - men}\n`);
