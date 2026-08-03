import { PEOPLE } from './data.js';
const rows = PEOPLE.map(p => ({id:p.id, name:p.name, len:(p.bio||'').length, bio:p.bio,
  birthYear:p.birthYear, birthPlace:p.birthPlace, country:p.country, field:p.field, subfield:p.subfield,
  awards:(p.awards||[]).map(a=>a.name+(a.year?` (${a.year})`:'')).join('; '),
  teams:(p.teams||[]).map(t=>t.name).join('; ')}));
rows.sort((a,b)=>a.len-b.len);
console.log('total entries:', PEOPLE.length);
for (const r of rows.slice(0,20)) {
  console.log('\n---', r.id, '|', r.name, '| len', r.len);
  console.log('  ', r.birthYear, r.birthPlace, r.country, '|', r.field, '/', r.subfield);
  console.log('   teams:', r.teams);
  console.log('   awards:', r.awards);
  console.log('   BIO:', r.bio);
}
