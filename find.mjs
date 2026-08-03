import {PEOPLE} from './data.js';
console.log('total:', PEOPLE.length);
const rows = PEOPLE.map(p=>{
  const b=p.bio||'';
  const sentences=(b.match(/[.!?]/g)||[]).length;
  return {id:p.id,name:p.name,len:b.length,sent:sentences,bio:b};
});
const queue = rows.slice().sort((a,b)=>a.len-b.len);
for(const r of queue.slice(0,30)){
  console.log(`${r.len}\t${r.sent}\t${r.id}\t::\t${r.bio}`);
}
