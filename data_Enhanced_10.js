// Famous People Dataset — Enhanced Bios
// Schema: id, name, gender, birthYear, birthPlace, country, field, subfield, teams, awards, collaborators, bio

export const PEOPLE = [
  // NBA — Expanded editorial context for legendary players
  { 
    id:'george-mikan', name:'George Mikan', gender:'male', birthYear:1924, birthPlace:'Joliet, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minneapolis Lakers',years:[1948,1956]}], awards:[{name:'NBA Champion',year:1949},{name:'NBA Champion',year:1950}],
    collaborators:['Vern Mikkelsen','Jim Pollard'], 
    bio:'The NBA\'s first dominant "big man," Mikan fundamentally changed basketball rules, leading the Minneapolis Lakers to five championships and defining the center position.' 
  },
  { 
    id:'bob-cousy', name:'Bob Cousy', gender:'male', birthYear:1928, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1950,1963]}], awards:[{name:'NBA MVP',year:1957},{name:'NBA Champion',year:1957}],
    collaborators:['Bill Russell','Red Auerbach'], 
    bio:'Known as "The Houdini of the Hardwood," Cousy was a visionary point guard whose flashy passing and ball-handling helped the Celtics build their 1950s dynasty.' 
  },
  { 
    id:'bill-russell', name:'Bill Russell', gender:'male', birthYear:1934, birthPlace:'West Monroe, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1956,1969]}], awards:[{name:'NBA Champion',year:1957},{name:'NBA MVP',year:1958}],
    collaborators:['Red Auerbach','Bob Cousy'], 
    bio:'The ultimate winner in sports history, Russell anchored the Celtics defense to 11 titles in 13 seasons and became a powerful voice for civil rights.' 
  },
  { 
    id:'wilt-chamberlain', name:'Wilt Chamberlain', gender:'male', birthYear:1936, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia Warriors',years:[1959,1962]},{name:'Lakers',years:[1968,1973]}], awards:[{name:'NBA MVP',year:1960}],
    collaborators:['Jerry West'], 
    bio:'A physical marvel who once scored 100 points in a single game; he remains the only player to average 40 and 50 points in a season.' 
  },
  { 
    id:'michael-jordan', name:'Michael Jordan', gender:'male', birthYear:1963, birthPlace:'Brooklyn, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1984,1998]}], awards:[{name:'NBA MVP',year:1988},{name:'NBA Champion',year:1991}],
    collaborators:['Scottie Pippen','Phil Jackson'], 
    bio:'Widely considered the greatest of all time, Jordan combined elite scoring and defense with a global marketing presence that transformed the NBA.' 
  },

  // Film & Arts — Enriched descriptions of career impact
  { 
    id:'katharine-hepburn', name:'Katharine Hepburn', gender:'female', birthYear:1907, birthPlace:'Hartford, Connecticut', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award',year:1933},{name:'Academy Award',year:1967}],
    collaborators:['Spencer Tracy','Cary Grant'], 
    bio:'A fierce, independent screen legend who holds the record for four Best Actress Oscars; she redefined femininity in Hollywood over a sixty-year career.' 
  },
  { 
    id:'bette-davis', name:'Bette Davis', gender:'female', birthYear:1908, birthPlace:'Lowell, Massachusetts', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award',year:1935},{name:'Academy Award',year:1938}],
    collaborators:['William Wyler'], 
    bio:'Regarded as one of the greatest actors in film history, Davis was known for her willingness to play unsympathetic, intense characters and her distinctive "Davis eyes."' 
  },
  { 
    id:'yoko-ono', name:'Yoko Ono', gender:'female', birthYear:1933, birthPlace:'Tokyo, Japan', country:'Japan', field:'Art', subfield:'Conceptual Artist',
    teams:[], awards:[],
    collaborators:['John Lennon','John Cage'], 
    bio:'A pioneer of conceptual and performance art within the Fluxus movement; her avant-garde work often explores peace, feminism, and human participation.' 
  },
  { 
    id:'liv-ullmann', name:'Liv Ullmann', gender:'female', birthYear:1938, birthPlace:'Tokyo, Japan', country:'Norway', field:'Film', subfield:'Actress',
    teams:[], awards:[],
    collaborators:['Ingmar Bergman'], 
    bio:'The muse of director Ingmar Bergman, Ullmann provided profound, haunting performances in masterpieces like Persona and Scenes from a Marriage.' 
  },
  { 
    id:'maya-angelou', name:'Maya Angelou', gender:'female', birthYear:1928, birthPlace:'St. Louis, Missouri', country:'USA', field:'Literature', subfield:'Memoirist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2011}],
    collaborators:['James Baldwin'], 
    bio:'A legendary poet and civil rights activist whose memoir "I Know Why the Caged Bird Sings" remains a definitive work of 20th-century American literature.' 
  },

].filter(p => p.field !== '__skip__');

// Computed constants for faceted search
export const FIELDS = [...new Set(PEOPLE.map(p => p.field))].sort();
export const GENDERS = [...new Set(PEOPLE.map(p => p.gender))].sort();
export const ERAS = [
  { label: 'Pre-1900', min: 0, max: 1899 },
  { label: '1900-1949', min: 1900, max: 1949 },
  { label: '1950-Present', min: 1950, max: 2100 }
];