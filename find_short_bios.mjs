import { PEOPLE } from './data.js';

const items = PEOPLE.map(p => {
  const bio = p.bio || '';
  const sentenceEndings = (bio.match(/[.!?](?=\s|$)/g) || []).length;
  return { id: p.id, name: p.name, len: bio.length, sentences: sentenceEndings, bio };
});

items.sort((a, b) => a.len - b.len);

for (const it of items.slice(0, 35)) {
  console.log(`${it.len}\t${it.sentences}\t${it.id}\t${it.bio}`);
}
console.log('---');
console.log('Total entries:', PEOPLE.length);
