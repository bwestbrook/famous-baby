// roster_clean.mjs — find what is broken in the dataset, and optionally fix it.
//
//   node roster_clean.mjs           # report only
//   node roster_clean.mjs --fix     # remove duplicates, keeping the fuller entry
//
// Mechanical checks only. Anything needing judgement — is this the right
// person, is this bio still true — is the skill's job, not this file's.

import { readFileSync, writeFileSync, mkdtempSync, copyFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const FIX = process.argv.includes('--fix');

async function load(name) {
  const dir = mkdtempSync(join(tmpdir(), 'famous-baby-'));
  try {
    const dest = join(dir, name.replace(/\.js$/, '.mjs'));
    copyFileSync(name, dest);
    return await import(pathToFileURL(dest).href);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

const { PEOPLE } = await load('data.js');
const { PHOTO_IDS } = await load('photos.js');
const app = readFileSync('app.js', 'utf8');
const coordBlock = app.slice(app.indexOf('const COUNTRY_COORDS'),
                             app.indexOf('};', app.indexOf('const COUNTRY_COORDS')));
// Keys are single- or double-quoted, and "Côte d'Ivoire" is double-quoted
// precisely because it contains an apostrophe — a naive ['"][^'"]+['"] can't
// span it and reports fifteen Ivorians as unplaceable.
const haveCoords = new Set([...coordBlock.matchAll(/(?:'([^']+)'|"([^"]+)")\s*:\s*\[/g)]
  .map(m => m[1] ?? m[2]));

const fold = (s) => String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
// How much an entry actually says, for deciding which twin to keep.
const weight = (p) => {
  let n = (p.bio || '').length / 50;
  for (const k of ['middleName', 'awards', 'teams', 'collaborators', 'contemporaries', 'homophones']) {
    const v = p[k];
    n += Array.isArray(v) ? v.length : (v ? 1 : 0);
  }
  if (p.birthMonth) n += 1;
  return n;
};

const problems = [];
const say = (kind, detail) => problems.push({ kind, detail });

// ---- duplicates -----------------------------------------------------------
const byId = new Map();
for (const p of PEOPLE) {
  if (!byId.has(p.id)) byId.set(p.id, []);
  byId.get(p.id).push(p);
}
const dupIds = [...byId].filter(([, list]) => list.length > 1);
for (const [id, list] of dupIds) say('duplicate id', `${id} × ${list.length} (${list[0].name})`);

const byName = new Map();
for (const p of PEOPLE) {
  const k = fold(p.name) + '|' + (p.birthYear ?? '');
  if (!byName.has(k)) byName.set(k, []);
  byName.get(k).push(p);
}
const dupNames = [...byName].filter(([, l]) => l.length > 1 && new Set(l.map(p => p.id)).size > 1);
for (const [, list] of dupNames) {
  say('same person, different ids', list.map(p => `${p.name} [${p.id}]`).join(' / '));
}

// ---- things that make a person invisible ----------------------------------
const ids = new Set(PEOPLE.map(p => p.id));
for (const pid of PHOTO_IDS) if (!ids.has(pid)) say('photo with no entry', pid);
for (const p of PEOPLE) {
  if (!p.country) say('no country', p.id);
  else if (!haveCoords.has(p.country)) say('country the globe cannot place', `${p.id} — ${p.country}`);
  if (p.birthYear == null) say('no birth year', p.id);
  if (!p.field || !p.subfield) say('no field or subfield', p.id);
  if (!p.name) say('no name', p.id);
}
// files on disk that nothing points at, and manifest rows with no file
if (existsSync('photos')) {
  const onDisk = new Set(readdirSync('photos').filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4)));
  const listed = new Set(PHOTO_IDS);
  for (const f of onDisk) if (!listed.has(f)) say('photo on disk, not in photos.js', f);
  for (const f of listed) if (!onDisk.has(f)) say('in photos.js, missing on disk', f);
  if (existsSync('photos/faces')) {
    const faces = new Set(readdirSync('photos/faces').filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4)));
    const missing = [...listed].filter(f => !faces.has(f));
    if (missing.length) say('no face crop', `${missing.length} of ${listed.size} — run facecrop`);
  }
}

// ---- report ---------------------------------------------------------------
const groups = new Map();
for (const { kind, detail } of problems) {
  if (!groups.has(kind)) groups.set(kind, []);
  groups.get(kind).push(detail);
}
console.log(`\n${PEOPLE.length} people, ${PHOTO_IDS.length} portraits\n`);
if (!problems.length) console.log('nothing wrong that a machine can see.\n');
for (const [kind, list] of [...groups].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${kind} — ${list.length}`);
  for (const d of list.slice(0, 12)) console.log('   ' + d);
  if (list.length > 12) console.log(`   … and ${list.length - 12} more`);
  console.log('');
}

// ---- fix ------------------------------------------------------------------
if (!FIX) {
  if (dupIds.length || dupNames.length) console.log('run with --fix to remove the duplicates.\n');
} else {
  let src = readFileSync('data.js', 'utf8');
  let removed = 0;
  const drop = [];
  for (const [, list] of [...dupIds, ...dupNames.map(([k, l]) => [k, l])]) {
    // Keep whichever twin says more; drop the rest.
    const keep = list.slice().sort((a, b) => weight(b) - weight(a))[0];
    for (const p of list) if (p !== keep) drop.push(p);
  }
  // Brace-match, never regex. An entry contains nested objects — teams and
  // awards are arrays of them — so a lazy /\{ id:'x'[\s\S]*?\},/ stops at the
  // first inner `},` and leaves half an entry behind. It did exactly that,
  // and produced a data.js that would not parse.
  const cutEntry = (text, id) => {
    const at = text.indexOf("{ id:'" + id + "'");
    if (at < 0) return null;
    let depth = 0;
    for (let i = at; i < text.length; i++) {
      const c = text[i];
      // Quotes can hold braces; skip over strings wholesale.
      if (c === "'" || c === '"') {
        const q = c;
        i++;
        while (i < text.length && text[i] !== q) { if (text[i] === '\\') i++; i++; }
        continue;
      }
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) {
          let end = i + 1;
          if (text[end] === ',') end++;
          // Take the line's leading whitespace and its newline with it.
          let start = at;
          while (start > 0 && (text[start - 1] === ' ' || text[start - 1] === '\t')) start--;
          if (text[start - 1] === '\n') start--;
          return text.slice(0, start) + text.slice(end);
        }
      }
    }
    return null;
  };
  for (const p of drop) {
    const next = cutEntry(src, p.id);
    if (next) { src = next; removed++; }
    else console.log(`could not locate ${p.id} to remove — left alone`);
  }
  if (removed) {
    // Never write a data.js that doesn't parse. Cheaper than the alternative,
    // which is discovering it from a blank page.
    const check = mkdtempSync(join(tmpdir(), 'famous-baby-'));
    const probe = join(check, 'check.mjs');
    writeFileSync(probe, src);
    try {
      await import(pathToFileURL(probe).href);
    } catch (e) {
      rmSync(check, { recursive: true, force: true });
      console.log('\nthe result would not parse — data.js left untouched:');
      console.log('  ' + e.message);
      process.exit(1);
    }
    rmSync(check, { recursive: true, force: true });
    writeFileSync('data.js', src);
    console.log(`removed ${removed} duplicate entr${removed === 1 ? 'y' : 'ies'} from data.js`);
    console.log('re-run to confirm, then: python3 fetch_photos.py --manifest\n');
  }
}
