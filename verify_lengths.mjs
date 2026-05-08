import { PEOPLE } from './data.js';
const ids = ['stephen-curry','hilary-duff','barack-obama','dua-lipa','kanye-west','lana-del-rey','simeon-rice','beyonce','megan-rapinoe','tony-parker','khris-middleton','jameis-winston','chimamanda','bob-marley','gwen-stefani','thomas-jones','chaplin','carmelo-anthony','james-harden','james-baldwin'];
let total = 0;
for (const id of ids) {
  const p = PEOPLE.find(x => x.id === id);
  console.log(id, p.bio.length);
  total += p.bio.length;
}
console.log('avg:', Math.round(total/ids.length));
