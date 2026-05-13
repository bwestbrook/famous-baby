// Mock dataset of famous people, structured to support faceted search.
// Schema per entry:
//   id, name, middleName, homophones, similarSpellings,
//   gender, birthYear, birthPlace, country, field, subfield,
//   teams: [{ name, years: [start, end] }],
//   awards: [{ name, year }],
//   collaborators: [string],
//   bio: short editorial line.
// New fields:
//   middleName: factual middle name (or names, space-separated). '' when unknown / not applicable.
//   contemporaries: 1–6 same-era peers in the same field (best-effort, may be empty).
//   friends: 1–6 known allies/associates (best-effort, may be empty).
//   foes: 1–6 known rivals/opponents (best-effort, may be empty).
//   homophones: 1–4 first-name variants that SOUND alike (['Catherine','Kathryn','Catharine']).
//   similarSpellings: 1–4 first-name variants that LOOK alike (['Aidan','Ayden','Adan']).

export const PEOPLE = [

  // =====================================================================
  //  NBA — 100 players, ordered by birth year
  // =====================================================================
  { id:'george-mikan', name:'George Mikan', middleName:'Lawrence', homophones:['Georg','Jorje'], similarSpellings:['Georje','Jorge','Georeg','Geirge'], gender:'male', birthYear:1924, birthMonth:6, birthDay:18, birthPlace:'Joliet, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minneapolis Lakers',years:[1948,1956]}], awards:[{name:'NBA Champion',year:1949},{name:'NBA Champion',year:1950}],
    collaborators:['Vern Mikkelsen','Jim Pollard'], contemporaries:[], friends:[], foes:[], bio:"The original NBA superstar; five-time pro champion with the Minneapolis Lakers and the man who forced the league to widen the lane." },

  { id:'bob-cousy', name:'Bob Cousy', middleName:'Joseph', homophones:['Bobb','Bobbe'], similarSpellings:['Rob','Robert','Bobby','Bobbi'], gender:'male', birthYear:1928, birthMonth:8, birthDay:9, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1950,1963]}], awards:[{name:'NBA MVP',year:1957},{name:'NBA Champion',year:1957}],
    collaborators:['Bill Russell','Red Auerbach'], contemporaries:[], friends:[], foes:[],
    bio:"The Houdini of the Hardwood — six-time NBA champion, 1957 MVP, and pioneer of the behind-the-back dribble." },

  { id:'bob-pettit', name:'Bob Pettit', middleName:'Lee', homophones:['Bobb','Bobbe'], similarSpellings:['Rob','Robert','Bobby','Bobbi'], gender:'male', birthYear:1932, birthMonth:12, birthDay:12, birthPlace:'Baton Rouge, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'St. Louis Hawks',years:[1954,1965]}], awards:[{name:'NBA MVP',year:1956},{name:'NBA Champion',year:1958}],
    collaborators:['Cliff Hagan','Slater Martin'], contemporaries:[], friends:[], foes:[],
    bio:"First player to reach 20,000 NBA points and the lone superstar of the St. Louis Hawks; twice league MVP." },

  { id:'bill-russell', name:'Bill Russell', middleName:'Felton', homophones:[], similarSpellings:['Will','Bil','William','Billy'], gender:'male', birthYear:1934, birthMonth:2, birthDay:12, birthPlace:'West Monroe, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1956,1969]}], awards:[{name:'NBA MVP',year:1958},{name:'NBA Champion',year:1957}],
    collaborators:['Bob Cousy','John Havlicek','K. C. Jones'], contemporaries:['Wilt Chamberlain','Bob Cousy','Oscar Robertson'], friends:['Bob Cousy','K. C. Jones','John Havlicek'], foes:['Wilt Chamberlain'],
    bio:"Eleven-time NBA champion and five-time MVP; in 1966 he became the first Black head coach in any major North American sport." },

  { id:'elgin-baylor', name:'Elgin Baylor', middleName:'Gay', homophones:[], similarSpellings:['Elgan','Elgen','Elgyn','Eljin'], gender:'male', birthYear:1934, birthMonth:9, birthDay:16, birthPlace:'Washington, D.C.', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minneapolis Lakers',years:[1958,1960]},{name:'Los Angeles Lakers',years:[1960,1971]}], awards:[{name:'NBA Rookie of the Year',year:1959}],
    collaborators:['Jerry West','Wilt Chamberlain'], contemporaries:[], friends:[], foes:[], bio:"High-flying Lakers forward who once averaged 38.3 points a game while serving in the Army Reserve." },

  { id:'wilt-chamberlain', name:'Wilt Chamberlain', middleName:'Norman', homophones:[], similarSpellings:['Wilton','Will','Wylt','Welt'], gender:'male', birthYear:1936, birthMonth:8, birthDay:21, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia Warriors',years:[1959,1962]},{name:'Philadelphia 76ers',years:[1965,1968]},{name:'Los Angeles Lakers',years:[1968,1973]}],
    awards:[{name:'NBA MVP',year:1960},{name:'NBA Champion',year:1967}],
    collaborators:['Jerry West','Hal Greer'], contemporaries:['Bill Russell','Oscar Robertson','Jerry West'], friends:['Jerry West'], foes:['Bill Russell'], bio:"Once scored 100 points in a single NBA game; statistically singular." },

  { id:'oscar-robertson', name:'Oscar Robertson', middleName:'Palmer', homophones:['Oskar'], similarSpellings:['Oskar','Osker','Oscer','Oskaer'], gender:'male', birthYear:1938, birthMonth:11, birthDay:24, birthPlace:'Charlotte, Tennessee', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cincinnati Royals',years:[1960,1970]},{name:'Milwaukee Bucks',years:[1970,1974]}], awards:[{name:'NBA MVP',year:1964},{name:'NBA Champion',year:1971}],
    collaborators:['Kareem Abdul-Jabbar','Jerry Lucas'], contemporaries:[], friends:[], foes:[], bio:"The Big O — first player to average a triple-double for an entire season." },

  { id:'jerry-west', name:'Jerry West', middleName:'Alan', homophones:[], similarSpellings:['Gerry','Jerrie','Jeri','Jerri'], gender:'male', birthYear:1938, birthMonth:5, birthDay:28, birthPlace:'Chelyan, West Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1960,1974]}], awards:[{name:'NBA Champion',year:1972}],
    collaborators:['Elgin Baylor','Wilt Chamberlain'], contemporaries:[], friends:[], foes:[], bio:"The Logo — silhouetted on the NBA emblem and the only Finals MVP from a losing team." },

  { id:'john-havlicek', name:'John Havlicek', middleName:'Joseph', homophones:['Jon','Jhon'], similarSpellings:['Jon','Johnn','Jhon','Johan'], gender:'male', birthYear:1940, birthMonth:4, birthDay:8, birthPlace:'Martins Ferry, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1962,1978]}], awards:[{name:'NBA Champion',year:1963},{name:'NBA Finals MVP',year:1974}],
    collaborators:['Bill Russell','Dave Cowens'], contemporaries:[], friends:[], foes:[], bio:"Hondo — eight-time Celtics champion who stole the ball." },

  { id:'willis-reed', name:'Willis Reed', middleName:'Junior', homophones:['Willes'], similarSpellings:['Wilis','Willice','Willys','Wilys'], gender:'male', birthYear:1942, birthMonth:6, birthDay:25, birthPlace:'Hico, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1964,1974]}], awards:[{name:'NBA MVP',year:1970},{name:'NBA Champion',year:1970}],
    collaborators:['Walt Frazier','Bill Bradley'], contemporaries:[], friends:[], foes:[], bio:"Knicks captain who limped onto the Garden floor for Game 7 and inspired New York to its first NBA title." },

  { id:'walt-frazier', name:'Walt Frazier', middleName:'Jr.', homophones:[], similarSpellings:['Walter','Walther','Walty','Wallt'], gender:'male', birthYear:1945, birthMonth:3, birthDay:29, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1967,1977]},{name:'Cleveland Cavaliers',years:[1977,1980]}], awards:[{name:'NBA Champion',year:1970}],
    collaborators:['Willis Reed','Earl Monroe'], contemporaries:[], friends:[], foes:[], bio:"Clyde — cool, mink-coated Knicks guard and two-time NBA champion." },

  { id:'rick-barry', name:'Rick Barry', middleName:'Francis', homophones:['Rik'], similarSpellings:['Rik','Ric','Ricky','Rich'], gender:'male', birthYear:1944, birthMonth:3, birthDay:28, birthPlace:'Elizabeth, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Francisco Warriors',years:[1965,1967]},{name:'Golden State Warriors',years:[1972,1978]}], awards:[{name:'NBA Finals MVP',year:1975}],
    collaborators:['Nate Thurmond','Jamaal Wilkes'], contemporaries:[], friends:[], foes:[], bio:"The only player to lead the NCAA, ABA, and NBA in scoring; underhand free throw evangelist." },

  { id:'pete-maravich', name:'Pete Maravich', middleName:'Press', homophones:[], similarSpellings:['Peter','Petey','Pyotr','Pete'], gender:'male', birthYear:1947, birthMonth:6, birthDay:22, birthPlace:'Aliquippa, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[1970,1974]},{name:'New Orleans Jazz',years:[1974,1979]}], awards:[],
    collaborators:['Lou Hudson'], contemporaries:[], friends:[], foes:[], bio:"Pistol Pete — still owns the NCAA scoring record at 44.2 points per game, set without a three-point line." },

  { id:'kareem-abdul-jabbar', name:'Kareem Abdul-Jabbar', middleName:'', homophones:['Karim','Kerim'], similarSpellings:['Karim','Kareim','Karem','Kareem'], gender:'male', birthYear:1947, birthMonth:4, birthDay:16, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[1969,1975]},{name:'Los Angeles Lakers',years:[1975,1989]}],
    awards:[{name:'NBA MVP',year:1971},{name:'NBA Champion',year:1971},{name:'NBA Champion',year:1985}],
    collaborators:['Magic Johnson','Oscar Robertson','James Worthy'], contemporaries:['Magic Johnson','Julius Erving','Larry Bird'], friends:['Magic Johnson','James Worthy','Bruce Lee'], foes:[], bio:"Six-time MVP, six-time champion, master of the unblockable skyhook." },

  { id:'julius-erving', name:'Julius Erving', middleName:'Winfield', homophones:[], similarSpellings:['Julious','Julio','Jules'], gender:'male', birthYear:1950, birthMonth:2, birthDay:22, birthPlace:'East Meadow, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1976,1987]}], awards:[{name:'NBA MVP',year:1981},{name:'NBA Champion',year:1983}],
    collaborators:['Moses Malone','Maurice Cheeks'], contemporaries:[], friends:[], foes:[], bio:"Dr. J — the man who made dunking an art form; ABA and NBA champion and 1981 league MVP." },

  { id:'robert-parish', name:'Robert Parish', middleName:'Lee', homophones:[], similarSpellings:['Roberto','Robart','Robbert','Rupert'], gender:'male', birthYear:1953, birthMonth:8, birthDay:30, birthPlace:'Shreveport, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1980,1994]},{name:'Chicago Bulls',years:[1996,1997]}], awards:[{name:'NBA Champion',year:1981}],
    collaborators:['Larry Bird','Kevin McHale','Michael Jordan'], contemporaries:[], friends:[], foes:[], bio:"The Chief — stoic 7-foot Celtics center and four-time NBA champion across a record 21 seasons." },

  { id:'moses-malone', name:'Moses Malone', middleName:'Eugene', homophones:['Moshe','Moises'], similarSpellings:['Moshe','Moises','Mosey','Mosis'], gender:'male', birthYear:1955, birthMonth:3, birthDay:23, birthPlace:'Petersburg, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[1976,1982]},{name:'Philadelphia 76ers',years:[1982,1986]}],
    awards:[{name:'NBA MVP',year:1979},{name:'NBA Champion',year:1983}],
    collaborators:['Julius Erving','Maurice Cheeks'], contemporaries:[], friends:[], foes:[], bio:"First player to leap straight from high school to the pros; three-time NBA MVP." },

  { id:'larry-bird', name:'Larry Bird', middleName:'Joe', homophones:[], similarSpellings:['Lary','Larrie','Laurie','Larree'], gender:'male', birthYear:1956, birthMonth:12, birthDay:7, birthPlace:'West Baden Springs, Indiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1979,1992]}], awards:[{name:'NBA MVP',year:1984},{name:'NBA Champion',year:1981}],
    collaborators:['Kevin McHale','Robert Parish'], contemporaries:['Magic Johnson','Michael Jordan','Julius Erving','Isiah Thomas'], friends:['Kevin McHale','Robert Parish'], foes:['Magic Johnson','Detroit Pistons'], bio:"The Hick from French Lick — three straight MVPs and three Celtics titles in the 1980s." },

  { id:'kevin-mchale', name:'Kevin McHale', middleName:'Edward', homophones:[], similarSpellings:['Kevon','Kevyn','Kevan','Kevern'], gender:'male', birthYear:1957, birthMonth:12, birthDay:19, birthPlace:'Hibbing, Minnesota', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1980,1993]}], awards:[{name:'NBA Champion',year:1981}],
    collaborators:['Larry Bird','Robert Parish'], contemporaries:[], friends:[], foes:[], bio:"Owner of the most unstoppable low-post footwork of the 1980s; three-time NBA champion." },

  { id:'magic-johnson', name:'Magic Johnson', middleName:'Earvin', homophones:[], similarSpellings:['Madge','Majic','Magick','Maggic'], gender:'male', birthYear:1959, birthMonth:8, birthDay:14, birthPlace:'Lansing, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1979,1991]}], awards:[{name:'NBA MVP',year:1987},{name:'NBA Champion',year:1980}],
    collaborators:['Kareem Abdul-Jabbar','James Worthy','Byron Scott'], contemporaries:['Larry Bird','Michael Jordan','Isiah Thomas','Kareem Abdul-Jabbar'], friends:['Kareem Abdul-Jabbar','James Worthy','Isiah Thomas'], foes:['Larry Bird','Isiah Thomas'], bio:"Showtime's 6-foot-9 point guard — three-time MVP and five-time NBA champion." },

  { id:'dominique-wilkins', name:'Dominique Wilkins', middleName:'Jacques', homophones:['Dominic'], similarSpellings:['Dominic','Dominik','Dominica','Domenic'], gender:'male', birthYear:1960, birthMonth:1, birthDay:12, birthPlace:'Paris, France', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[1982,1994]},{name:'Boston Celtics',years:[1994,1995]}], awards:[],
    collaborators:['Spud Webb'], contemporaries:[], friends:[], foes:[], bio:"The Human Highlight Film — Hawks scoring legend and 1986 NBA scoring champion." },

  { id:'james-worthy', name:'James Worthy', middleName:'Ager', homophones:['Jaymes'], similarSpellings:['Jaymes','Jamie','Jamz','Jameson'], gender:'male', birthYear:1961, birthMonth:2, birthDay:27, birthPlace:'Gastonia, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1982,1994]}], awards:[{name:'NBA Finals MVP',year:1988},{name:'NBA Champion',year:1985}],
    collaborators:['Magic Johnson','Kareem Abdul-Jabbar'], contemporaries:[], friends:[], foes:[], bio:"Big Game James — three-time NBA champion and 1988 Finals MVP." },

  { id:'isiah-thomas', name:'Isiah Thomas', middleName:'Lord', homophones:['Isaiah'], similarSpellings:['Isaiah','Izaiah','Iziah','Isiaiah'], gender:'male', birthYear:1961, birthMonth:4, birthDay:30, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1981,1994]}], awards:[{name:'NBA Champion',year:1989},{name:'NBA Finals MVP',year:1990}],
    collaborators:['Joe Dumars','Dennis Rodman','Bill Laimbeer'], contemporaries:[], friends:[], foes:[], bio:"Bad Boy in chief — Detroit's 6-foot-1 captain and back-to-back Pistons title general." },

  { id:'patrick-ewing', name:'Patrick Ewing', middleName:'Aloysius', homophones:[], similarSpellings:['Padraic','Patrik','Patric','Patryk'], gender:'male', birthYear:1962, birthMonth:8, birthDay:5, birthPlace:'Kingston, Jamaica', country:'Jamaica', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1985,2000]},{name:'Seattle SuperSonics',years:[2000,2001]}], awards:[{name:'NBA Rookie of the Year',year:1986}],
    collaborators:['John Starks','Charles Oakley'], contemporaries:[], friends:[], foes:[], bio:"Knicks franchise center, eleven-time All-Star, and Dream Team original." },

  { id:'clyde-drexler', name:'Clyde Drexler', middleName:'Austin', homophones:[], similarSpellings:['Klyde','Cleide','Clide','Klide'], gender:'male', birthYear:1962, birthMonth:6, birthDay:22, birthPlace:'New Orleans, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Portland Trail Blazers',years:[1983,1995]},{name:'Houston Rockets',years:[1995,1998]}], awards:[{name:'NBA Champion',year:1995}],
    collaborators:['Hakeem Olajuwon','Terry Porter'], contemporaries:[], friends:[], foes:[], bio:"Clyde the Glide — Phi Slama Jama alum and 1995 NBA champion alongside Hakeem." },

  { id:'john-stockton', name:'John Stockton', middleName:'Houston', homophones:['Jon','Jhon'], similarSpellings:['Jon','Johnn','Jhon','Johan'], gender:'male', birthYear:1962, birthMonth:3, birthDay:26, birthPlace:'Spokane, Washington', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[1984,2003]}], awards:[],
    collaborators:['Karl Malone','Jeff Hornacek'], contemporaries:[], friends:[], foes:[], bio:"Holds the NBA's all-time records for assists and steals; the loyal one-team Jazz floor general." },

  { id:'hakeem-olajuwon', name:'Hakeem Olajuwon', middleName:'Abdul', homophones:['Hakim','Akeem'], similarSpellings:['Hakim','Hacim','Hakeam','Akeem'], gender:'male', birthYear:1963, birthMonth:1, birthDay:21, birthPlace:'Lagos, Nigeria', country:'Nigeria', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[1984,2001]},{name:'Toronto Raptors',years:[2001,2002]}],
    awards:[{name:'NBA MVP',year:1994},{name:'NBA Champion',year:1994}],
    collaborators:['Clyde Drexler','Robert Horry'], contemporaries:[], friends:[], foes:[], bio:"The Dream — only player to sweep MVP, Defensive Player of the Year, and Finals MVP in a single season."},

  { id:'michael-jordan', name:'Michael Jordan', middleName:'Jeffrey', homophones:['Mikael','Michel'], similarSpellings:['Mikael','Mikel','Michel','Micheal'], gender:'male', birthYear:1963, birthMonth:2, birthDay:17, birthPlace:'Brooklyn, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1984,1998]},{name:'Washington Wizards',years:[2001,2003]}],
    awards:[{name:'NBA MVP',year:1988},{name:'NBA Champion',year:1991},{name:'NBA Champion',year:1996}],
    collaborators:['Scottie Pippen','Dennis Rodman','Phil Jackson'], contemporaries:['Magic Johnson','Larry Bird','Charles Barkley','Hakeem Olajuwon','Karl Malone','Patrick Ewing'], friends:['Scottie Pippen','Charles Barkley'], foes:['Isiah Thomas','Reggie Miller','Karl Malone'], bio:"Air Jordan — six-time NBA champion, six-time Finals MVP, and the consensus GOAT." },

  { id:'charles-barkley', name:'Charles Barkley', middleName:'Wade', homophones:[], similarSpellings:['Charlz','Charless','Charl','Charlie'], gender:'male', birthYear:1963, birthMonth:2, birthDay:20, birthPlace:'Leeds, Alabama', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1984,1992]},{name:'Phoenix Suns',years:[1992,1996]},{name:'Houston Rockets',years:[1996,2000]}],
    awards:[{name:'NBA MVP',year:1993}], collaborators:['Hakeem Olajuwon','Kevin Johnson'], contemporaries:[], friends:[], foes:[], bio:"Round Mound of Rebound — 1993 MVP and the most quotable analyst on TNT." },

  { id:'joe-dumars', name:'Joe Dumars', middleName:'III', homophones:['Jo'], similarSpellings:['Jo','Joey','Joseph','Joah'], gender:'male', birthYear:1963, birthMonth:5, birthDay:24, birthPlace:'Shreveport, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1985,1999]}], awards:[{name:'NBA Finals MVP',year:1989}],
    collaborators:['Isiah Thomas','Bill Laimbeer'], contemporaries:[], friends:[], foes:[], bio:"Pistons backcourt sentinel and 1989 Finals MVP after locking down Magic in the sweep." },

  { id:'karl-malone', name:'Karl Malone', middleName:'Anthony', homophones:['Carl','Karle'], similarSpellings:['Carl','Karle','Karol','Carle'], gender:'male', birthYear:1963, birthMonth:7, birthDay:24, birthPlace:'Summerfield, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[1985,2003]},{name:'Los Angeles Lakers',years:[2003,2004]}],
    awards:[{name:'NBA MVP',year:1997}], collaborators:['John Stockton','Jeff Hornacek'], contemporaries:[], friends:[], foes:[], bio:"The Mailman — two-time NBA MVP and Stockton's pick-and-roll partner for nineteen Utah seasons." },

  { id:'scottie-pippen', name:'Scottie Pippen', middleName:'Maurice', homophones:['Scotty'], similarSpellings:['Scotty','Scotti','Scotie','Scoti'], gender:'male', birthYear:1965, birthMonth:9, birthDay:25, birthPlace:'Hamburg, Arkansas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1987,1998]},{name:'Houston Rockets',years:[1998,1999]},{name:'Portland Trail Blazers',years:[1999,2003]}],
    awards:[{name:'NBA Champion',year:1991}], collaborators:['Michael Jordan','Dennis Rodman','Phil Jackson'], contemporaries:[], friends:[], foes:[],
    bio:"Pip — six-time NBA champion and the most versatile defender of his era." },

  { id:'reggie-miller', name:'Reggie Miller', middleName:'Wayne', homophones:[], similarSpellings:['Reggi','Reggy','Reginald','Reg'], gender:'male', birthYear:1965, birthMonth:8, birthDay:24, birthPlace:'Riverside, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Indiana Pacers',years:[1987,2005]}], awards:[],
    collaborators:['Mark Jackson','Rik Smits'], contemporaries:[], friends:[], foes:[], bio:"Mr. Pacer — five-time All-Star sniper who scored eight points in nine seconds at Madison Square Garden." },

  { id:'david-robinson', name:'David Robinson', middleName:'Maurice', homophones:[], similarSpellings:['Davyd','Daved','Dawid','Davide'], gender:'male', birthYear:1965, birthMonth:8, birthDay:6, birthPlace:'Key West, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[1989,2003]}], awards:[{name:'NBA MVP',year:1995},{name:'NBA Champion',year:1999}],
    collaborators:['Tim Duncan','Sean Elliott'], contemporaries:[], friends:[], foes:[], bio:"The Admiral — Naval Academy graduate, 1995 league MVP, and back-to-back Spurs champion." },

  { id:'mitch-richmond', name:'Mitch Richmond', middleName:'James', homophones:[], similarSpellings:['Mitchell','Mitchel','Mich','Mitchum'], gender:'male', birthYear:1965, birthMonth:6, birthDay:30, birthPlace:'Fort Lauderdale, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[1991,1998]},{name:'Washington Wizards',years:[1998,2001]},{name:'Los Angeles Lakers',years:[2001,2002]}],
    awards:[{name:'NBA Champion',year:2002}], collaborators:['Kobe Bryant','Shaquille O\'Neal'], contemporaries:[], friends:[], foes:[], bio:"Rock — Run TMC Warrior, 1989 Rookie of the Year, and 2002 Lakers champion off the bench." },

  { id:'steve-kerr', name:'Steve Kerr', middleName:'Douglas', homophones:[], similarSpellings:['Steven','Stephen','Stevie','Stephan'], gender:'male', birthYear:1965, birthMonth:9, birthDay:27, birthPlace:'Beirut, Lebanon', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1993,1998]},{name:'San Antonio Spurs',years:[1998,2001]}], awards:[{name:'NBA Champion',year:1996}],
    collaborators:['Michael Jordan','Tim Duncan','Phil Jackson'], contemporaries:[], friends:[], foes:[], bio:"Five-time NBA champion as a player and four-time as Golden State's head coach." },

  { id:'gary-payton', name:'Gary Payton', middleName:'Dwayne', homophones:[], similarSpellings:['Garry','Gari','Garey','Garrie'], gender:'male', birthYear:1968, birthMonth:7, birthDay:23, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Seattle SuperSonics',years:[1990,2003]},{name:'Miami Heat',years:[2005,2007]}], awards:[{name:'NBA Champion',year:2006}],
    collaborators:['Shawn Kemp','Dwyane Wade'], contemporaries:[], friends:[], foes:[], bio:"The Glove — only point guard ever named NBA Defensive Player of the Year." },

  { id:'toni-kukoc', name:'Toni Kukoč', middleName:'', homophones:['Tony','Toney'], similarSpellings:['Tony','Toney','Tonio','Tonee'], gender:'male', birthYear:1968, birthMonth:9, birthDay:18, birthPlace:'Split, Croatia', country:'Croatia', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1993,2000]}], awards:[{name:'NBA Sixth Man of the Year',year:1996}],
    collaborators:['Michael Jordan','Scottie Pippen'], contemporaries:[], friends:[], foes:[], bio:"Three-time NBA champion and the original 6-foot-11 point forward." },

  { id:'shawn-kemp', name:'Shawn Kemp', middleName:'Travis', homophones:['Sean','Shaun','Shon'], similarSpellings:['Sean','Shaun','Shon','Shaughn'], gender:'male', birthYear:1969, birthMonth:11, birthDay:26, birthPlace:'Elkhart, Indiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Seattle SuperSonics',years:[1989,1997]},{name:'Cleveland Cavaliers',years:[1997,2000]}], awards:[],
    collaborators:['Gary Payton'], contemporaries:[], friends:[], foes:[], bio:"The Reign Man — gravity-optional Sonics forward and lob duo half with Gary Payton." },

  { id:'alonzo-mourning', name:'Alonzo Mourning', middleName:'Harding', homophones:[], similarSpellings:['Alonso','Alanzo','Alonza','Alonzio'], gender:'male', birthYear:1970, birthMonth:2, birthDay:8, birthPlace:'Chesapeake, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Charlotte Hornets',years:[1992,1995]},{name:'Miami Heat',years:[1995,2002]},{name:'Miami Heat',years:[2005,2008]}],
    awards:[{name:'NBA Champion',year:2006}], collaborators:['Dwyane Wade','Tim Hardaway'], contemporaries:[], friends:[], foes:[],
    bio:"Zo — two-time Defensive Player of the Year who returned from a kidney transplant to win a 2006 ring with Dwyane Wade's Heat." },

  { id:'penny-hardaway', name:'Penny Hardaway', middleName:'Anfernee', homophones:['Penney'], similarSpellings:['Penney','Pennie','Pennye','Penni'], gender:'male', birthYear:1971, birthMonth:7, birthDay:18, birthPlace:'Memphis, Tennessee', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[1993,1999]},{name:'Phoenix Suns',years:[1999,2004]}], awards:[],
    collaborators:['Shaquille O\'Neal','Nick Anderson'], contemporaries:[], friends:[], foes:[], bio:"Lithe 6-foot-7 point guard who paired with rookie Shaq to lead Orlando to the 1995 Finals." },

  { id:'shaquille-oneal', name:"Shaquille O'Neal", middleName:'Rashaun', homophones:[], similarSpellings:['Shaquil','Shakil','Shaqueel','Shakille'], gender:'male', birthYear:1972, birthMonth:3, birthDay:6, birthPlace:'Newark, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[1992,1996]},{name:'Los Angeles Lakers',years:[1996,2004]},{name:'Miami Heat',years:[2004,2008]}],
    awards:[{name:'NBA MVP',year:2000},{name:'NBA Champion',year:2000}], collaborators:['Kobe Bryant','Dwyane Wade','Penny Hardaway'], contemporaries:['Tim Duncan','Hakeem Olajuwon','David Robinson'], friends:['Penny Hardaway','Dwyane Wade'], foes:['Kobe Bryant','Tim Duncan'],
    bio:"Shaq Diesel — four-time NBA champion and the most physically dominant center of the modern era." },

  { id:'grant-hill', name:'Grant Hill', middleName:'Henry', homophones:[], similarSpellings:['Granty','Grantt','Graunt','Grandt'], gender:'male', birthYear:1972, birthMonth:10, birthDay:5, birthPlace:'Dallas, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1994,2000]},{name:'Orlando Magic',years:[2000,2007]},{name:'Phoenix Suns',years:[2007,2012]}],
    awards:[{name:'NBA Rookie of the Year',year:1995}], collaborators:['Steve Nash','Tracy McGrady'], contemporaries:[], friends:[], foes:[], bio:"Smooth Duke alumnus and 1995 co-Rookie of the Year whose pre-injury career was on a Hall of Fame trajectory." },

  { id:'chris-webber', name:'Chris Webber', middleName:'Mayce', homophones:['Cris','Kris'], similarSpellings:['Cris','Kris','Khris','Crisstopher'], gender:'male', birthYear:1973, birthMonth:3, birthDay:1, birthPlace:'Detroit, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[1998,2005]},{name:'Golden State Warriors',years:[1993,1994]},{name:'Washington Bullets',years:[1994,1998]}],
    awards:[{name:'NBA Rookie of the Year',year:1994}], collaborators:['Mike Bibby','Vlade Divac'], contemporaries:[], friends:[], foes:[], bio:"Leader of Michigan's Fab Five and the No. 1 overall pick in 1993." },

  { id:'jason-kidd', name:'Jason Kidd', middleName:'Frederick', homophones:['Jaysen','Jayson'], similarSpellings:['Jaysen','Jayson','Jasen','Jasun'], gender:'male', birthYear:1973, birthMonth:3, birthDay:23, birthPlace:'San Francisco, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[1994,1996]},{name:'Phoenix Suns',years:[1996,2001]},{name:'New Jersey Nets',years:[2001,2008]},{name:'Dallas Mavericks',years:[2008,2012]}],
    awards:[{name:'NBA Champion',year:2011}], collaborators:['Dirk Nowitzki','Vince Carter'], contemporaries:[], friends:[], foes:[], bio:"Triple-double engine, 2011 NBA champion, and now Mavericks head coach." },

  { id:'steve-nash', name:'Steve Nash', middleName:'John', homophones:[], similarSpellings:['Steven','Stephen','Stevie','Stephan'], gender:'male', birthYear:1974, birthMonth:2, birthDay:7, birthPlace:'Johannesburg, South Africa', country:'Canada', field:'Sports', subfield:'NBA',
    teams:[{name:'Phoenix Suns',years:[1996,1998]},{name:'Dallas Mavericks',years:[1998,2004]},{name:'Phoenix Suns',years:[2004,2012]}],
    awards:[{name:'NBA MVP',year:2005},{name:'NBA MVP',year:2006}], collaborators:['Amar\'e Stoudemire','Dirk Nowitzki','Grant Hill'], contemporaries:[], friends:[], foes:[],
    bio:"Two-time MVP and architect of Mike D'Antoni's Seven Seconds or Less Suns." },

  { id:'allen-iverson', name:'Allen Iverson', middleName:'Ezail', homophones:['Alan','Allan','Alen'], similarSpellings:['Alan','Allan','Alen','Allyn'], gender:'male', birthYear:1975, birthMonth:6, birthDay:7, birthPlace:'Hampton, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1996,2006]},{name:'Denver Nuggets',years:[2006,2008]}], awards:[{name:'NBA MVP',year:2001}],
    collaborators:['Larry Brown'], contemporaries:[], friends:[], foes:[],
    bio:"The Answer — at 6 feet tall, the shortest MVP in NBA history (2001) and a four-time scoring champion." },

  { id:'ray-allen', name:'Ray Allen', middleName:'Anthony', homophones:['Rae','Rey'], similarSpellings:['Rae','Rey','Raye','Reigh'], gender:'male', birthYear:1975, birthMonth:7, birthDay:20, birthPlace:'Merced, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[1996,2003]},{name:'Seattle SuperSonics',years:[2003,2007]},{name:'Boston Celtics',years:[2007,2012]},{name:'Miami Heat',years:[2012,2014]}],
    awards:[{name:'NBA Champion',year:2008},{name:'NBA Champion',year:2013}],
    collaborators:['Paul Pierce','Kevin Garnett','LeBron James','Dwyane Wade'], contemporaries:[], friends:[], foes:[], bio:"Jesus Shuttlesworth — held the NBA career three-point record until Curry passed him." },

  { id:'kevin-garnett', name:'Kevin Garnett', middleName:'Maurice', homophones:[], similarSpellings:['Kevon','Kevyn','Kevan','Kevern'], gender:'male', birthYear:1976, birthMonth:5, birthDay:19, birthPlace:'Mauldin, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[1995,2007]},{name:'Boston Celtics',years:[2007,2013]},{name:'Brooklyn Nets',years:[2013,2015]}],
    awards:[{name:'NBA MVP',year:2004},{name:'NBA Champion',year:2008}], collaborators:['Paul Pierce','Ray Allen'], contemporaries:[], friends:[], foes:[], bio:"KG — 2004 MVP and 2008 NBA champion who screamed 'Anything is possible!'" },

  { id:'tim-duncan', name:'Tim Duncan', middleName:'Theodore', homophones:[], similarSpellings:['Timothy','Tym','Timo','Timmy'], gender:'male', birthYear:1976, birthMonth:4, birthDay:25, birthPlace:'Christiansted, U.S. Virgin Islands', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[1997,2016]}], awards:[{name:'NBA MVP',year:2002},{name:'NBA Champion',year:1999}],
    collaborators:['David Robinson','Tony Parker','Manu Ginobili'], contemporaries:[], friends:[], foes:[], bio:"The Big Fundamental — two-time MVP, three-time Finals MVP, and five-time Spurs champion." },

  { id:'manu-ginobili', name:'Manu Ginóbili', middleName:'Emanuel', homophones:[], similarSpellings:['Manny','Manolo','Emmanuel','Manou'], gender:'male', birthYear:1977, birthMonth:7, birthDay:28, birthPlace:'Bahía Blanca, Argentina', country:'Argentina', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2002,2018]}], awards:[{name:'NBA Champion',year:2003}],
    collaborators:['Tim Duncan','Tony Parker'], contemporaries:[], friends:[], foes:[], bio:"Eurostep evangelist and four-time Spurs champion taken with the 57th pick." },

  { id:'vince-carter', name:'Vince Carter', middleName:'Lamar', homophones:[], similarSpellings:['Vincent','Vinny','Vinnie','Vins'], gender:'male', birthYear:1977, birthMonth:1, birthDay:26, birthPlace:'Daytona Beach, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[1998,2004]},{name:'New Jersey Nets',years:[2004,2009]}], awards:[{name:'NBA Slam Dunk Contest Champion',year:2000}],
    collaborators:['Tracy McGrady','Jason Kidd'], contemporaries:[], friends:[], foes:[], bio:"Vinsanity — 2000 Slam Dunk Contest legend who played in four different decades." },

  { id:'kobe-bryant', name:'Kobe Bryant', middleName:'Bean', homophones:['Coby','Koby'], similarSpellings:['Coby','Koby','Cobi','Kobie'], gender:'male', birthYear:1978, birthMonth:8, birthDay:23, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1996,2016]}], awards:[{name:'NBA MVP',year:2008},{name:'NBA Champion',year:2000},{name:'NBA Champion',year:2009}],
    collaborators:['Shaquille O\'Neal','Pau Gasol'], contemporaries:['LeBron James','Tim Duncan','Kevin Garnett','Paul Pierce'], friends:['Pau Gasol','Phil Jackson'], foes:['Shaquille O\'Neal','Boston Celtics'], bio:"Mamba Mentality personified — five-time Lakers champion and 2008 league MVP." },

  { id:'paul-pierce', name:'Paul Pierce', middleName:'Anthony', homophones:[], similarSpellings:['Pol','Paull','Pawl','Paulo'], gender:'male', birthYear:1977, birthMonth:10, birthDay:13, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1998,2013]}], awards:[{name:'NBA Finals MVP',year:2008},{name:'NBA Champion',year:2008}],
    collaborators:['Kevin Garnett','Ray Allen'], contemporaries:[], friends:[], foes:[], bio:"The Truth — Celtics wing, 2008 NBA champion, and Finals MVP." },

  { id:'dirk-nowitzki', name:'Dirk Nowitzki', middleName:'Werner', homophones:[], similarSpellings:['Derk','Dirck','Dirc','Dyrk'], gender:'male', birthYear:1978, birthMonth:6, birthDay:19, birthPlace:'Würzburg, Germany', country:'Germany', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[1998,2019]}], awards:[{name:'NBA MVP',year:2007},{name:'NBA Champion',year:2011}],
    collaborators:['Jason Kidd','Steve Nash'], contemporaries:[], friends:[], foes:[], bio:"7-foot German forward whose one-legged fadeaway forecast the modern stretch big; 2007 MVP and 2011 champion." },

  { id:'tracy-mcgrady', name:'Tracy McGrady', middleName:'Lamar', homophones:['Tracey','Tracie'], similarSpellings:['Tracey','Tracie','Tracee','Treacy'], gender:'male', birthYear:1979, birthMonth:5, birthDay:24, birthPlace:'Bartow, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[1997,2000]},{name:'Orlando Magic',years:[2000,2004]},{name:'Houston Rockets',years:[2004,2010]}], awards:[],
    collaborators:['Vince Carter','Yao Ming'], contemporaries:[], friends:[], foes:[], bio:"T-Mac — back-to-back NBA scoring champion who once dropped 13 points in 35 seconds." },

  { id:'yao-ming', name:'Yao Ming', middleName:'', homophones:[], similarSpellings:['Yau','Yow','Yaow','Yaoh'], gender:'male', birthYear:1980, birthMonth:9, birthDay:12, birthPlace:'Shanghai, China', country:'China', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[2002,2011]}], awards:[],
    collaborators:['Tracy McGrady'], contemporaries:[], friends:[], foes:[], bio:"7-foot-6 Shanghai-born center and eight-time All-Star who opened the NBA to a continent." },

  { id:'pau-gasol', name:'Pau Gasol', middleName:'', homophones:['Po','Pow'], similarSpellings:['Pol','Pao','Paul','Pau'], gender:'male', birthYear:1980, birthMonth:7, birthDay:6, birthPlace:'Barcelona, Spain', country:'Spain', field:'Sports', subfield:'NBA',
    teams:[{name:'Memphis Grizzlies',years:[2001,2008]},{name:'Los Angeles Lakers',years:[2008,2014]}],
    awards:[{name:'NBA Champion',year:2009},{name:'NBA Champion',year:2010}], collaborators:['Kobe Bryant'], contemporaries:[], friends:[], foes:[],
    bio:"Skilled Spanish big man and back-to-back NBA champion alongside Kobe in 2009 and 2010." },

  { id:'beyonce-skip', name:'__skip__', middleName:'', homophones:[], similarSpellings:[], gender:'female', birthYear:0, birthPlace:'', country:'', field:'__skip__', subfield:'', teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'' },

  { id:'tony-parker', name:'Tony Parker', middleName:'William', homophones:['Toney','Toni'], similarSpellings:['Toney','Toni','Tonio','Tonee'], gender:'male', birthYear:1982, birthMonth:5, birthDay:17, birthPlace:'Bruges, Belgium', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2001,2018]}], awards:[{name:'NBA Champion',year:2003},{name:'NBA Finals MVP',year:2007}],
    collaborators:['Tim Duncan','Manu Ginobili'], contemporaries:[], friends:[], foes:[], bio:"French floor general and 2007 Finals MVP across four Spurs titles." },

  { id:'dwyane-wade', name:'Dwyane Wade', middleName:'Tyrone', homophones:['Dwayne','Duane'], similarSpellings:['Dwayne','Duane','Dwain','Dewayne'], gender:'male', birthYear:1982, birthMonth:1, birthDay:17, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Miami Heat',years:[2003,2016]},{name:'Chicago Bulls',years:[2016,2017]}],
    awards:[{name:'NBA Finals MVP',year:2006},{name:'NBA Champion',year:2006}],
    collaborators:['Shaquille O\'Neal','LeBron James','Chris Bosh'], contemporaries:[], friends:[], foes:[], bio:"Flash — Miami's favorite son, three-time NBA champion, and 2006 Finals MVP at age 24." },

  { id:'lebron-james', name:'LeBron James', middleName:'Raymone', homophones:[], similarSpellings:['LeBryn','Labron','Lebrun','Lebronn'], gender:'male', birthYear:1984, birthMonth:12, birthDay:30, birthPlace:'Akron, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cleveland Cavaliers',years:[2003,2010]},{name:'Miami Heat',years:[2010,2014]},{name:'Cleveland Cavaliers',years:[2014,2018]},{name:'Los Angeles Lakers',years:[2018,2025]}],
    awards:[{name:'NBA MVP',year:2009},{name:'NBA Champion',year:2012},{name:'NBA Champion',year:2016}],
    collaborators:['Dwyane Wade','Anthony Davis','Kyrie Irving'], contemporaries:['Kobe Bryant','Stephen Curry','Kevin Durant','Dwyane Wade'], friends:['Dwyane Wade','Chris Paul','Carmelo Anthony'], foes:['Stephen Curry','Draymond Green'], bio:"King James — four-time NBA champion, four-time MVP, and the league's all-time leading scorer." },

  { id:'carmelo-anthony', name:'Carmelo Anthony', middleName:'Kiyan', homophones:[], similarSpellings:['Carmello','Karmelo','Carmel','Carmine'], gender:'male', birthYear:1984, birthMonth:5, birthDay:29, birthPlace:'Brooklyn, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Denver Nuggets',years:[2003,2011]},{name:'New York Knicks',years:[2011,2017]}], awards:[],
    collaborators:['Allen Iverson','Amar\'e Stoudemire'], contemporaries:[], friends:[], foes:[], bio:"Melo — 2013 NBA scoring champion and the first U.S. men's basketball player to capture three Olympic golds." },

  { id:'chris-paul', name:'Chris Paul', middleName:'Emmanuel', homophones:['Cris','Kris'], similarSpellings:['Cris','Kris','Khris','Christopher'], gender:'male', birthYear:1985, birthMonth:5, birthDay:6, birthPlace:'Winston-Salem, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Hornets',years:[2005,2011]},{name:'Los Angeles Clippers',years:[2011,2017]},{name:'Phoenix Suns',years:[2020,2023]}], awards:[],
    collaborators:['Blake Griffin','Devin Booker'], contemporaries:[], friends:[], foes:[], bio:"CP3 — twelve-time All-Star and one of the great pure point guards never to win a championship." },

  { id:'dwight-howard', name:'Dwight Howard', middleName:'David', homophones:[], similarSpellings:['Dwite','Dwyght','Dwighte','Dwite'], gender:'male', birthYear:1985, birthMonth:12, birthDay:8, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[2004,2012]},{name:'Los Angeles Lakers',years:[2012,2013]},{name:'Los Angeles Lakers',years:[2019,2020]}],
    awards:[{name:'NBA Champion',year:2020}], collaborators:['LeBron James','Anthony Davis'], contemporaries:[], friends:[], foes:[],
    bio:"Superman — three-time Defensive Player of the Year and 2020 Lakers champion." },

  { id:'derrick-rose', name:'Derrick Rose', middleName:'Martell', homophones:[], similarSpellings:['Derek','Derik','Deric','Derrik'], gender:'male', birthYear:1988, birthMonth:10, birthDay:4, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2008,2016]},{name:'New York Knicks',years:[2016,2017]}], awards:[{name:'NBA MVP',year:2011}],
    collaborators:['Joakim Noah','Luol Deng'], contemporaries:[], friends:[], foes:[], bio:"D-Rose — youngest MVP in NBA history at age 22." },

  { id:'russell-westbrook', name:'Russell Westbrook', middleName:'', homophones:[], similarSpellings:['Russel','Rusell','Russle','Russ'], gender:'male', birthYear:1988, birthMonth:11, birthDay:12, birthPlace:'Long Beach, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2008,2019]},{name:'Houston Rockets',years:[2019,2020]},{name:'Los Angeles Lakers',years:[2021,2023]}],
    awards:[{name:'NBA MVP',year:2017}], collaborators:['Kevin Durant','James Harden','Paul George'], contemporaries:[], friends:[], foes:[], bio:"Brodie — 2017 MVP and the all-time leader in triple-doubles." },

  { id:'kevin-durant', name:'Kevin Durant', middleName:'Wayne', homophones:[], similarSpellings:['Kevon','Kevyn','Kevan','Kevern'], gender:'male', birthYear:1988, birthMonth:9, birthDay:29, birthPlace:'Washington, D.C.', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2008,2016]},{name:'Golden State Warriors',years:[2016,2019]},{name:'Brooklyn Nets',years:[2019,2023]},{name:'Phoenix Suns',years:[2023,2025]}],
    awards:[{name:'NBA MVP',year:2014},{name:'NBA Champion',year:2017},{name:'NBA Champion',year:2018}],
    collaborators:['Stephen Curry','Russell Westbrook','James Harden','Klay Thompson','Draymond Green'], contemporaries:[], friends:[], foes:[],
    bio:"Slim Reaper — 2014 league MVP, four-time scoring champion, and back-to-back Finals MVP." },

  { id:'stephen-curry', name:'Stephen Curry', middleName:'Wardell', homophones:['Steven','Stefan'], similarSpellings:['Steven','Stefan','Stephan','Steffen'], gender:'male', birthYear:1988, birthMonth:3, birthDay:14, birthPlace:'Akron, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2009,2025]}], awards:[{name:'NBA MVP',year:2015},{name:'NBA Champion',year:2015}],
    collaborators:['Klay Thompson','Draymond Green','Steve Kerr','Kevin Durant'], contemporaries:['LeBron James','Kevin Durant','James Harden'], friends:['Klay Thompson','Draymond Green','Andre Iguodala'], foes:['LeBron James'], bio:"Greatest shooter in NBA history and the league's first unanimous MVP." },

  { id:'jimmy-butler', name:'Jimmy Butler', middleName:'III', homophones:['Jimmie','Jimi'], similarSpellings:['Jimmie','Jimi','Jim','Jimmye'], gender:'male', birthYear:1989, birthMonth:9, birthDay:14, birthPlace:'Houston, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2011,2017]},{name:'Philadelphia 76ers',years:[2018,2019]},{name:'Miami Heat',years:[2019,2025]}], awards:[],
    collaborators:['Bam Adebayo','Joel Embiid'], contemporaries:[], friends:[], foes:[], bio:"Jimmy Buckets — homeless as a teenager, twice carried the Heat to the Finals as Playoff Jimmy." },

  { id:'james-harden', name:'James Harden', middleName:'Edward', homophones:['Jaymes'], similarSpellings:['Jaymes','Jamie','Jamz','Jameson'], gender:'male', birthYear:1989, birthMonth:8, birthDay:26, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2009,2012]},{name:'Houston Rockets',years:[2012,2021]},{name:'Brooklyn Nets',years:[2021,2022]},{name:'Philadelphia 76ers',years:[2022,2023]}],
    awards:[{name:'NBA MVP',year:2018}], collaborators:['Kevin Durant','Russell Westbrook','Chris Paul'], contemporaries:[], friends:[], foes:[], bio:"The Beard — eurostep architect and 2018 MVP." },

  { id:'demar-derozan', name:'DeMar DeRozan', middleName:'Darnell', homophones:[], similarSpellings:['Damar','Demarr','DeMario','Demaar'], gender:'male', birthYear:1989, birthMonth:8, birthDay:7, birthPlace:'Compton, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[2009,2018]},{name:'San Antonio Spurs',years:[2018,2021]},{name:'Chicago Bulls',years:[2021,2024]}], awards:[],
    collaborators:['Kyle Lowry'], contemporaries:[], friends:[], foes:[], bio:"Mid-range purist who took Toronto from playoff afterthought to perennial contender." },

  { id:'paul-george', name:'Paul George', middleName:'Clifton', homophones:[], similarSpellings:['Pol','Paull','Pawl','Paulo'], gender:'male', birthYear:1990, birthMonth:5, birthDay:2, birthPlace:'Palmdale, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Indiana Pacers',years:[2010,2017]},{name:'Oklahoma City Thunder',years:[2017,2019]},{name:'Los Angeles Clippers',years:[2019,2024]}], awards:[],
    collaborators:['Kawhi Leonard','Russell Westbrook'], contemporaries:[], friends:[], foes:[], bio:"PG-13 — Fresno State product, six-time All-Star, and Most Improved Player." },

  { id:'klay-thompson', name:'Klay Thompson', middleName:'Alexander', homophones:['Clay'], similarSpellings:['Clay','Klaye','Cleye','Clayy'], gender:'male', birthYear:1990, birthMonth:2, birthDay:8, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2011,2024]}], awards:[{name:'NBA Champion',year:2015}],
    collaborators:['Stephen Curry','Draymond Green'], contemporaries:[], friends:[], foes:[], bio:"Half of the Splash Brothers — once dropped 37 points in a single quarter and four-time NBA champion." },

  { id:'draymond-green', name:'Draymond Green', middleName:'Jamal', homophones:[], similarSpellings:['Draymon','Draymund','Daymond','Drayman'], gender:'male', birthYear:1990, birthMonth:3, birthDay:4, birthPlace:'Saginaw, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2012,2025]}], awards:[{name:'NBA Defensive Player of the Year',year:2017}],
    collaborators:['Stephen Curry','Klay Thompson'], contemporaries:[], friends:[], foes:[], bio:"Defensive engine and emotional spark of the Warriors dynasty; 2017 Defensive Player of the Year." },

  { id:'damian-lillard', name:'Damian Lillard', middleName:'Lamonte', homophones:['Damien','Damion','Damyan'], similarSpellings:['Damien','Damion','Damyan','Daimon'], gender:'male', birthYear:1990, birthMonth:7, birthDay:15, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Portland Trail Blazers',years:[2012,2023]},{name:'Milwaukee Bucks',years:[2023,2025]}], awards:[],
    collaborators:['CJ McCollum','Giannis Antetokounmpo'], contemporaries:[], friends:[], foes:[], bio:"Dame Time — unanimous 2013 Rookie of the Year whose 37-foot dagger eliminated OKC in 2019." },

  { id:'kawhi-leonard', name:'Kawhi Leonard', middleName:'Anthony', homophones:[], similarSpellings:['Kawi','Khawi','Kwai','Kawhii'], gender:'male', birthYear:1991, birthMonth:6, birthDay:29, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2011,2018]},{name:'Toronto Raptors',years:[2018,2019]},{name:'Los Angeles Clippers',years:[2019,2025]}],
    awards:[{name:'NBA Finals MVP',year:2014},{name:'NBA Finals MVP',year:2019}],
    collaborators:['Tim Duncan','Paul George'], contemporaries:[], friends:[], foes:[], bio:"The Klaw — two-time Defensive Player of the Year and the only player to win Finals MVPs with two franchises." },

  { id:'khris-middleton', name:'Khris Middleton', middleName:'', homophones:['Chris','Cris','Kris'], similarSpellings:['Chris','Cris','Kris','Khristopher'], gender:'male', birthYear:1991, birthMonth:8, birthDay:12, birthPlace:'Charleston, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[2013,2025]}], awards:[{name:'NBA Champion',year:2021}],
    collaborators:['Giannis Antetokounmpo','Jrue Holiday'], contemporaries:[], friends:[], foes:[], bio:"Milwaukee's silky shotmaker, three-time All-Star, and 2021 NBA champion." },

  { id:'kyrie-irving', name:'Kyrie Irving', middleName:'Andrew', homophones:[], similarSpellings:['Kiri','Kyrri','Kyree','Kiree'], gender:'male', birthYear:1992, birthMonth:3, birthDay:23, birthPlace:'Melbourne, Australia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cleveland Cavaliers',years:[2011,2017]},{name:'Boston Celtics',years:[2017,2019]},{name:'Brooklyn Nets',years:[2019,2023]},{name:'Dallas Mavericks',years:[2023,2025]}],
    awards:[{name:'NBA Champion',year:2016}], collaborators:['LeBron James','Kevin Durant'], contemporaries:[], friends:[], foes:[], bio:"Uncle Drew — Game 7 dagger over Curry delivered Cleveland its first major sports title in 52 years." },

  { id:'anthony-davis', name:'Anthony Davis', middleName:'Marshon', homophones:[], similarSpellings:['Anthoney','Antony','Anthonie','Antoni'], gender:'male', birthYear:1993, birthMonth:3, birthDay:11, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Pelicans',years:[2012,2019]},{name:'Los Angeles Lakers',years:[2019,2025]}], awards:[{name:'NBA Champion',year:2020}],
    collaborators:['LeBron James'], contemporaries:[], friends:[], foes:[],
    bio:"The Brow — first overall pick in 2012 and 2020 NBA champion alongside LeBron with the Lakers." },

  { id:'bradley-beal', name:'Bradley Beal', middleName:'Emmanuel', homophones:[], similarSpellings:['Bradly','Brad','Bradlee','Bradlie'], gender:'male', birthYear:1993, birthMonth:6, birthDay:28, birthPlace:'St. Louis, Missouri', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Washington Wizards',years:[2012,2023]},{name:'Phoenix Suns',years:[2023,2025]}], awards:[],
    collaborators:['John Wall','Kevin Durant'], contemporaries:[], friends:[], foes:[],
    bio:"Smooth-shouldered scoring guard taken third overall in 2012 and longtime face of the Washington Wizards." },

  { id:'giannis-antetokounmpo', name:'Giannis Antetokounmpo', middleName:'Sina', homophones:[], similarSpellings:['Yannis','Janis','Giannes','Yiannis'], gender:'male', birthYear:1994, birthMonth:12, birthDay:6, birthPlace:'Athens, Greece', country:'Greece', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[2013,2025]}], awards:[{name:'NBA MVP',year:2019},{name:'NBA Finals MVP',year:2021},{name:'NBA Champion',year:2021}],
    collaborators:['Khris Middleton','Jrue Holiday'], contemporaries:[], friends:[], foes:[], bio:"Greek Freak — back-to-back MVP whose 50-point Game 6 closed out the 2021 Finals." },

  { id:'joel-embiid', name:'Joel Embiid', middleName:'Hans', homophones:[], similarSpellings:['Joelle','Yoel','Joeel','Joele'], gender:'male', birthYear:1994, birthMonth:3, birthDay:16, birthPlace:'Yaoundé, Cameroon', country:'Cameroon', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[2014,2025]}], awards:[{name:'NBA MVP',year:2023}],
    collaborators:['James Harden','Tyrese Maxey'], contemporaries:[], friends:[], foes:[], bio:"The Process — Cameroonian seven-footer, 2023 MVP, and back-to-back NBA scoring champion." },

  { id:'pascal-siakam', name:'Pascal Siakam', middleName:'', homophones:[], similarSpellings:['Pascale','Paschal','Pascual','Pasqual'], gender:'male', birthYear:1994, birthMonth:4, birthDay:2, birthPlace:'Douala, Cameroon', country:'Cameroon', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[2016,2024]},{name:'Indiana Pacers',years:[2024,2025]}], awards:[{name:'NBA Champion',year:2019}],
    collaborators:['Kawhi Leonard','Kyle Lowry'], contemporaries:[], friends:[], foes:[], bio:"Spicy P — 2019 NBA champion and Most Improved Player." },

  { id:'karl-anthony-towns', name:'Karl-Anthony Towns', middleName:'', homophones:['Carl','Karle'], similarSpellings:['Carl','Karle','Karol','Carle'], gender:'male', birthYear:1995, birthMonth:11, birthDay:15, birthPlace:'Edison, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[2015,2024]},{name:'New York Knicks',years:[2024,2025]}], awards:[{name:'NBA Rookie of the Year',year:2016}],
    collaborators:['Anthony Edwards'], contemporaries:[], friends:[], foes:[], bio:"KAT — unanimous 2016 Rookie of the Year and the only big man to win the NBA Three-Point Contest." },

  { id:'nikola-jokic', name:'Nikola Jokić', middleName:'', homophones:[], similarSpellings:['Nicola','Nikolai','Nikolaj','Nicolas'], gender:'male', birthYear:1995, birthMonth:2, birthDay:19, birthPlace:'Sombor, Serbia', country:'Serbia', field:'Sports', subfield:'NBA',
    teams:[{name:'Denver Nuggets',years:[2015,2025]}], awards:[{name:'NBA MVP',year:2021},{name:'NBA Champion',year:2023},{name:'NBA Finals MVP',year:2023}],
    collaborators:['Jamal Murray'], contemporaries:[], friends:[], foes:[], bio:"The Joker — three-time NBA MVP and 2023 champion and Finals MVP." },

  { id:'devin-booker', name:'Devin Booker', middleName:'Armani', homophones:['Devon','Devyn','Devan'], similarSpellings:['Devon','Devyn','Devan','Daven'], gender:'male', birthYear:1996, birthMonth:10, birthDay:30, birthPlace:'Grand Rapids, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Phoenix Suns',years:[2015,2025]}], awards:[],
    collaborators:['Chris Paul','Kevin Durant'], contemporaries:[], friends:[], foes:[], bio:"Book — youngest player ever to score 70 in an NBA game and 2021 Finals starter." },

  { id:'donovan-mitchell', name:'Donovan Mitchell', middleName:'Vincent', homophones:[], similarSpellings:['Donavan','Donovin','Donavon','Donavin'], gender:'male', birthYear:1996, birthMonth:9, birthDay:7, birthPlace:'Elmsford, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[2017,2022]},{name:'Cleveland Cavaliers',years:[2022,2025]}], awards:[],
    collaborators:['Rudy Gobert','Darius Garland'], contemporaries:[], friends:[], foes:[], bio:"Spida — five-time All-Star who once scored 71 points in a game." },

  { id:'bam-adebayo', name:'Bam Adebayo', middleName:'Edrice', homophones:[], similarSpellings:['Bamm','Baam','Bham'], gender:'male', birthYear:1997, birthMonth:7, birthDay:18, birthPlace:'Newark, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Miami Heat',years:[2017,2025]}], awards:[],
    collaborators:['Jimmy Butler'], contemporaries:[], friends:[], foes:[],
    bio:"Heat center anchor of Miami's 2020 and 2023 Finals runs, named after the Flintstones' 'Bam Bam' by his mother." },

  { id:'jayson-tatum', name:'Jayson Tatum', middleName:'Christopher', homophones:['Jason','Jaysen','Jasen'], similarSpellings:['Jason','Jaysen','Jasen','Jasun'], gender:'male', birthYear:1998, birthMonth:3, birthDay:3, birthPlace:'St. Louis, Missouri', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[2017,2025]}], awards:[{name:'NBA Champion',year:2024}],
    collaborators:['Jaylen Brown'], contemporaries:[], friends:[], foes:[], bio:"Smooth-shouldered Celtics wing and 2024 NBA champion." },

  { id:'trae-young', name:'Trae Young', middleName:'Rayshun', homophones:['Tray','Trey'], similarSpellings:['Tray','Trey','Treigh','Trei'], gender:'male', birthYear:1998, birthMonth:9, birthDay:19, birthPlace:'Lubbock, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[2018,2025]}], awards:[],
    collaborators:['Dejounte Murray'], contemporaries:[], friends:[], foes:[], bio:"Ice Trae — twice an NBA All-Star and 2022 league assists leader." },

  { id:'shai-gilgeous-alexander', name:'Shai Gilgeous-Alexander', middleName:'', homophones:['Shay','Shea'], similarSpellings:['Shay','Shea','Shae','Sheigh'], gender:'male', birthYear:1998, birthMonth:7, birthDay:12, birthPlace:'Toronto, Ontario', country:'Canada', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Clippers',years:[2018,2019]},{name:'Oklahoma City Thunder',years:[2019,2025]}], awards:[],
    collaborators:['Chet Holmgren','Jalen Williams'], contemporaries:[], friends:[], foes:[], bio:"SGA — Canadian guard, three-time All-NBA First Team, and 2024 MVP runner-up." },

  { id:'luka-doncic', name:'Luka Dončić', middleName:'', homophones:['Luca'], similarSpellings:['Luca','Lukas','Lucca','Lucah'], gender:'male', birthYear:1999, birthMonth:2, birthDay:28, birthPlace:'Ljubljana, Slovenia', country:'Slovenia', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[2018,2025]},{name:'Los Angeles Lakers',years:[2025,2025]}], awards:[{name:'NBA Rookie of the Year',year:2019}],
    collaborators:['Kyrie Irving'], contemporaries:[], friends:[], foes:[], bio:"Slovenian wunderkind, 2024 NBA scoring champion, and 2024 Finals dragger." },

  { id:'ja-morant', name:'Ja Morant', middleName:'Temetrius', homophones:[], similarSpellings:['Jah','Jay','Jaa','Jha'], gender:'male', birthYear:1999, birthMonth:8, birthDay:10, birthPlace:'Dalzell, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Memphis Grizzlies',years:[2019,2025]}], awards:[{name:'NBA Rookie of the Year',year:2020}],
    collaborators:['Jaren Jackson Jr.'], contemporaries:[], friends:[], foes:[], bio:"2022 Most Improved Player who turned the Memphis Grindhouse into the league's loudest building." },

  { id:'zion-williamson', name:'Zion Williamson', middleName:'Lateef', homophones:[], similarSpellings:['Zyon','Sion','Zhion','Zionn'], gender:'male', birthYear:2000, birthMonth:7, birthDay:6, birthPlace:'Salisbury, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Pelicans',years:[2019,2025]}], awards:[],
    collaborators:['Brandon Ingram'], contemporaries:[], friends:[], foes:[], bio:"285-pound force of nature and the No. 1 overall pick in 2019." },

  { id:'tyrese-haliburton', name:'Tyrese Haliburton', middleName:'John', homophones:['Tyreese'], similarSpellings:['Tyreese','Tyreis','Tirese','Tyrise'], gender:'male', birthYear:2000, birthMonth:2, birthDay:29, birthPlace:'Oshkosh, Wisconsin', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[2020,2022]},{name:'Indiana Pacers',years:[2022,2025]}], awards:[],
    collaborators:['Pascal Siakam'], contemporaries:[], friends:[], foes:[], bio:"Two-time All-Star, 2024 In-Season Tournament hero, and 2023-24 league assists leader." },

  { id:'lamelo-ball', name:'LaMelo Ball', middleName:'LaFrance', homophones:[], similarSpellings:['Lamello','LaMeloh','Lemelo','Lemello'], gender:'male', birthYear:2001, birthMonth:8, birthDay:22, birthPlace:'Anaheim, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Charlotte Hornets',years:[2020,2025]}], awards:[{name:'NBA Rookie of the Year',year:2021}],
    collaborators:['Brandon Miller'], contemporaries:[], friends:[], foes:[], bio:"2021 Rookie of the Year and youngest player ever to record a triple-double." },

  { id:'anthony-edwards', name:'Anthony Edwards', middleName:'DeVante', homophones:[], similarSpellings:['Anthoney','Antony','Anthonie','Antoni'], gender:'male', birthYear:2001, birthMonth:8, birthDay:5, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[2020,2025]}], awards:[],
    collaborators:['Karl-Anthony Towns','Rudy Gobert'], contemporaries:[], friends:[], foes:[],
    bio:"Ant-Man — No. 1 overall pick in 2020 who led Team USA in scoring at the 2024 Paris Olympics." },

  { id:'cade-cunningham', name:'Cade Cunningham', middleName:'Hudson', homophones:['Kade','Caid'], similarSpellings:['Kade','Caid','Cayde','Kayde'], gender:'male', birthYear:2001, birthMonth:9, birthDay:25, birthPlace:'Arlington, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[2021,2025]}], awards:[],
    collaborators:['Jaden Ivey'], contemporaries:[], friends:[], foes:[], bio:"Pistons floor general taken first overall in 2021 and 2025 NBA All-Star." },

  { id:'paolo-banchero', name:'Paolo Banchero', middleName:'Napoleon', homophones:[], similarSpellings:['Paulo','Pablo','Paolino','Paolio'], gender:'male', birthYear:2002, birthMonth:11, birthDay:12, birthPlace:'Seattle, Washington', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[2022,2025]}], awards:[{name:'NBA Rookie of the Year',year:2023}],
    collaborators:['Franz Wagner'], contemporaries:[], friends:[], foes:[], bio:"Italian-American forward and 2023 NBA Rookie of the Year." },

  { id:'victor-wembanyama', name:'Victor Wembanyama', middleName:'', homophones:['Viktor'], similarSpellings:['Viktor','Victr','Vyctor','Victorr'], gender:'male', birthYear:2004, birthMonth:1, birthDay:4, birthPlace:'Le Chesnay, France', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2023,2025]}], awards:[{name:'NBA Rookie of the Year',year:2024}],
    collaborators:['Chris Paul'], contemporaries:[], friends:[], foes:[], bio:"Wemby — 7-foot-4 Frenchman, unanimous 2024 Rookie of the Year, and Olympic silver medalist." },

  { id:'dennis-rodman', name:'Dennis Rodman', middleName:'Keith', homophones:['Denis','Denys'], similarSpellings:['Denis','Denys','Denniss','Denyss'], gender:'male', birthYear:1961, birthMonth:5, birthDay:13, birthPlace:'Trenton, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1986,1993]},{name:'Chicago Bulls',years:[1995,1998]}], awards:[{name:'NBA Champion',year:1996}],
    collaborators:['Michael Jordan','Scottie Pippen','Isiah Thomas'], contemporaries:[], friends:[], foes:[], bio:"The Worm — five-time NBA champion and seven-time rebounding leader with the wildest hair in the league." },

  { id:'jrue-holiday', name:'Jrue Holiday', middleName:'Randall', homophones:['Drew','Jrew'], similarSpellings:['Drew','Jrew','Jru','Jue'], gender:'male', birthYear:1990, birthMonth:6, birthDay:12, birthPlace:'Mission Hills, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[2009,2013]},{name:'New Orleans Pelicans',years:[2013,2020]},{name:'Milwaukee Bucks',years:[2020,2023]},{name:'Boston Celtics',years:[2023,2025]}],
    awards:[{name:'NBA Champion',year:2021},{name:'NBA Champion',year:2024}], collaborators:['Giannis Antetokounmpo','Jayson Tatum'], contemporaries:[], friends:[], foes:[],
    bio:"Two-way point guard and back-to-back NBA champion in 2021 and 2024." },

  { id:'joakim-noah', name:'Joakim Noah', middleName:'Simon', homophones:['Joaquim'], similarSpellings:['Joaquim','Joachim','Joakeem'], gender:'male', birthYear:1985, birthMonth:2, birthDay:25, birthPlace:'New York, New York', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2007,2016]},{name:'New York Knicks',years:[2016,2018]}], awards:[{name:'NBA Defensive Player of the Year',year:2014}],
    collaborators:['Derrick Rose','Luol Deng'], contemporaries:[], friends:[], foes:[], bio:"Son of tennis champion Yannick Noah; 2014 NBA Defensive Player of the Year with the Bulls." },

  { id:'blake-griffin', name:'Blake Griffin', middleName:'Austin', homophones:[], similarSpellings:['Blaike','Blayk','Blayke','Blakely'], gender:'male', birthYear:1989, birthMonth:3, birthDay:16, birthPlace:'Oklahoma City, Oklahoma', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Clippers',years:[2010,2018]},{name:'Detroit Pistons',years:[2018,2021]}], awards:[{name:'NBA Rookie of the Year',year:2011}],
    collaborators:['Chris Paul','DeAndre Jordan'], contemporaries:[], friends:[], foes:[],
    bio:"Lob City headliner — No. 1 overall pick in 2009 and 2011 Rookie of the Year who jumped over a Kia to win the Slam Dunk Contest." },

  { id:'deron-williams', name:'Deron Williams', middleName:'Michael', homophones:['Darren','Daron'], similarSpellings:['Darren','Daron','Derren','Deryn'], gender:'male', birthYear:1984, birthMonth:6, birthDay:26, birthPlace:'Parkersburg, West Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[2005,2011]},{name:'Brooklyn Nets',years:[2011,2015]}], awards:[],
    collaborators:['Carlos Boozer'], contemporaries:[], friends:[], foes:[], bio:"Illinois Final Four point guard, three-time All-Star, and back-to-back Olympic gold medalist." },

  // =====================================================================
  //  WOMEN POP STARS — 100, ordered roughly by birth year
  // =====================================================================
  { id:'billie-holiday', name:'Billie Holiday', middleName:'', homophones:['Billy','Billi','Billee'], similarSpellings:['Billy','Billi','Billee','Bilee'], gender:'female', birthYear:1915, birthMonth:4, birthDay:7, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1987}],
    collaborators:['Lester Young','Count Basie'], contemporaries:[], friends:[], foes:[],
    bio:"Lady Day — voice that turned pain into the American songbook's defining standard." },

  { id:'ella-fitzgerald', name:'Ella Fitzgerald', middleName:'Jane', homophones:[], similarSpellings:['Ela','Elle','Ellah','Ellie'], gender:'female', birthYear:1917, birthMonth:4, birthDay:25, birthPlace:'Newport News, Virginia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Vocal Performance, Female',year:1959}],
    collaborators:['Louis Armstrong','Duke Ellington'], contemporaries:[], friends:[], foes:[], bio:'First Lady of Song; 14 Grammys and the unrivaled scat singer.' },

  { id:'peggy-lee', name:'Peggy Lee', middleName:'', homophones:['Peggi','Pegi'], similarSpellings:['Peggi','Pegi','Peggie','Peggey'], gender:'female', birthYear:1920, birthMonth:5, birthDay:26, birthPlace:'Jamestown, North Dakota', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1969}],
    collaborators:['Benny Goodman'], contemporaries:[], friends:[], foes:[], bio:'Sultry-voiced singer behind "Fever" and the songs of Disney\'s Lady and the Tramp.' },

  { id:'doris-day', name:'Doris Day', middleName:'', homophones:[], similarSpellings:['Dorris','Dorice','Doras','Dorys'], gender:'female', birthYear:1922, birthMonth:4, birthDay:3, birthPlace:'Cincinnati, Ohio', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2008}],
    collaborators:['Les Brown'], contemporaries:[], friends:[], foes:[], bio:'Que sera, sera — biggest box-office star and sweetheart vocalist of the 1950s.' },

  { id:'sarah-vaughan', name:'Sarah Vaughan', middleName:'Lois', homophones:['Sara','Zara','Sera'], similarSpellings:['Sara','Sarrah','Saraya','Sarra'], gender:'female', birthYear:1924, birthMonth:3, birthDay:27, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1983}],
    collaborators:['Dizzy Gillespie','Charlie Parker'], contemporaries:[], friends:[], foes:[], bio:'The Divine One — extraordinary range across pop and jazz standards.' },

  { id:'patsy-cline', name:'Patsy Cline', middleName:'', homophones:[], similarSpellings:['Patsey','Patsi','Patzy'], gender:'female', birthYear:1932, birthMonth:9, birthDay:8, birthPlace:'Winchester, Virginia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Country Music Hall of Fame',year:1973}],
    collaborators:['Owen Bradley','Loretta Lynn'], contemporaries:[], friends:[], foes:[], bio:'Country-pop pioneer whose voice still aches on "Crazy."' },

  { id:'petula-clark', name:'Petula Clark', middleName:'Sally', homophones:[], similarSpellings:['Petulla','Petoula','Petulah'], gender:'female', birthYear:1932, birthMonth:11, birthDay:15, birthPlace:'Epsom, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rock and Roll Recording',year:1965}],
    collaborators:['Tony Hatch'], contemporaries:[], friends:[], foes:[], bio:'British belter who took "Downtown" to No. 1 in the U.S. in 1965.' },

  { id:'connie-francis', name:'Connie Francis', middleName:'', homophones:['Conny','Conni'], similarSpellings:['Conny','Conni','Konnie','Coni'], gender:'female', birthYear:1937, birthMonth:12, birthDay:12, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First woman to top the Billboard Hot 100; teen idol of "Who\'s Sorry Now."' },

  { id:'dusty-springfield', name:'Dusty Springfield', middleName:'', homophones:['Dustie'], similarSpellings:['Dustie','Dustee','Dusti'], gender:'female', birthYear:1939, birthMonth:4, birthDay:16, birthPlace:'Hampstead, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Rock and Roll Hall of Fame',year:1999}],
    collaborators:['Burt Bacharach','Pet Shop Boys'], contemporaries:[], friends:[], foes:[], bio:'Blue-eyed soul priestess — "Son of a Preacher Man" defined the genre.' },

  { id:'tina-turner', name:'Tina Turner', middleName:'', homophones:['Teena','Tena'], similarSpellings:['Teena','Tena','Tinah','Tinna'], gender:'female', birthYear:1939, birthMonth:11, birthDay:26, birthPlace:'Nutbush, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1985}],
    collaborators:['Ike Turner','David Bowie'], contemporaries:[], friends:[], foes:[], bio:'Queen of Rock \'n\' Roll; rose alone to dominate the 1980s charts.' },

  { id:'dionne-warwick', name:'Dionne Warwick', middleName:'', homophones:['Dion','Deon'], similarSpellings:['Dion','Deon','Dione','Deonne'], gender:'female', birthYear:1940, birthMonth:12, birthDay:12, birthPlace:'East Orange, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1968}],
    collaborators:['Burt Bacharach','Hal David'], contemporaries:[], friends:[], foes:[], bio:'Voice behind the Bacharach-David songbook; six-time Grammy winner.' },

  { id:'aretha-franklin', name:'Aretha Franklin', middleName:'Louise', homophones:[], similarSpellings:['Areta','Aritha','Arethea','Arethah'], gender:'female', birthYear:1942, birthMonth:3, birthDay:25, birthPlace:'Memphis, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[],
    awards:[
      {name:'Grammy Award for Best R&B Vocal Performance, Female',year:1968},
      {name:'Rock and Roll Hall of Fame (first woman inducted)',year:1987},
      {name:'Grammy Lifetime Achievement Award',year:1994},
      {name:'Kennedy Center Honors',year:1994},
      {name:'National Medal of Arts',year:1999},
      {name:'Presidential Medal of Freedom',year:2005},
      {name:'Pulitzer Prize Special Citation',year:2019},
    ],
    collaborators:['Otis Redding','Jerry Wexler','James Cleveland','Carolyn Franklin','Erma Franklin','Carole King','Curtis Mayfield','Luther Vandross','George Michael','Mahalia Jackson'], contemporaries:[], friends:[], foes:[],
    bio:"The Queen of Soul — first woman inducted into the Rock and Roll Hall of Fame (1987) and the voice that turned 'Respect' into an anthem." },

  { id:'carole-king', name:'Carole King', middleName:'', homophones:['Carol','Karol','Carroll'], similarSpellings:['Carol','Karol','Carroll','Carrol'], gender:'female', birthYear:1942, birthMonth:2, birthDay:9, birthPlace:'Manhattan, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1972}],
    collaborators:['Gerry Goffin','James Taylor'], contemporaries:[], friends:[], foes:[], bio:'Songwriter\'s songwriter; "Tapestry" defined 1970s singer-songwriter pop.' },

  { id:'carly-simon', name:'Carly Simon', middleName:'Elisabeth', homophones:['Karly','Carlie'], similarSpellings:['Karly','Carlie','Carley','Karlie'], gender:'female', birthYear:1943, birthMonth:6, birthDay:25, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Performance, Female',year:1972}],
    collaborators:['James Taylor','Mick Jagger'], contemporaries:[], friends:[], foes:[], bio:'You\'re So Vain — a generational anthem with a still-mysterious subject.' },

  { id:'joni-mitchell', name:'Joni Mitchell', middleName:'', homophones:['Joany','Joney'], similarSpellings:['Joany','Joney','Jonie','Joanie'], gender:'female', birthYear:1943, birthMonth:11, birthDay:7, birthPlace:'Fort Macleod, Alberta', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Album',year:1995}],
    collaborators:['James Taylor','Crosby, Stills, Nash & Young'], contemporaries:[], friends:[], foes:[], bio:'Canadian poet of folk-pop; reshaped what songwriting could do.' },

  { id:'diana-ross', name:'Diana Ross', middleName:'Ernestine', homophones:['Dianna','Dyana'], similarSpellings:['Dianna','Dyana','Diane','Diahann'], gender:'female', birthYear:1944, birthMonth:3, birthDay:26, birthPlace:'Detroit, Michigan', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2012}],
    collaborators:['Berry Gordy','Lionel Richie'], contemporaries:[], friends:[], foes:[], bio:'Supremes lead and Motown\'s defining pop star of the 1960s and 70s.' },

  { id:'debbie-harry', name:'Debbie Harry', middleName:'Ann', homophones:['Debby','Debi'], similarSpellings:['Debby','Debi','Debbi','Debbie'], gender:'female', birthYear:1945, birthMonth:7, birthDay:1, birthPlace:'Miami, Florida', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Rock and Roll Hall of Fame',year:2006}],
    collaborators:['Chris Stein','Giorgio Moroder'], contemporaries:[], friends:[], foes:[], bio:'Blondie front and the cool-glance face of CBGB-era pop.' },

  { id:'cher', name:'Cher', middleName:'', homophones:['Share'], similarSpellings:['Sher','Shere','Cherr'], gender:'female', birthYear:1946, birthMonth:5, birthDay:20, birthPlace:'El Centro, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2000}],
    collaborators:['Sonny Bono'], contemporaries:[], friends:[], foes:[], bio:'Goddess of Pop — six decades of reinvention from Sonny & Cher to "Believe."' },

  { id:'linda-ronstadt', name:'Linda Ronstadt', middleName:'Maria', homophones:['Lynda','Lindah'], similarSpellings:['Lynda','Lindah','Lindy','Linde'], gender:'female', birthYear:1946, birthMonth:7, birthDay:15, birthPlace:'Tucson, Arizona', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Country Vocal Performance, Female',year:1976}],
    collaborators:['Emmylou Harris','Dolly Parton'], contemporaries:[], friends:[], foes:[], bio:'Genre-jumping vocalist — country, pop, mariachi, big-band.' },

  { id:'dolly-parton', name:'Dolly Parton', middleName:'Rebecca', homophones:['Dolley','Dollie'], similarSpellings:['Dolley','Dollie','Dolli','Dolie'], gender:'female', birthYear:1946, birthMonth:1, birthDay:19, birthPlace:'Sevierville, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2011}],
    collaborators:['Porter Wagoner','Kenny Rogers','Linda Ronstadt'], contemporaries:[], friends:[], foes:[], bio:'Country-pop matriarch and the most generous philanthropist in Nashville.' },

  { id:'donna-summer', name:'Donna Summer', middleName:'Adrian', homophones:[], similarSpellings:['Dona','Donnah','Donia','Donni'], gender:'female', birthYear:1948, birthMonth:12, birthDay:31, birthPlace:'Boston, Massachusetts', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Vocal Performance, Female',year:1979}],
    collaborators:['Giorgio Moroder'], contemporaries:[], friends:[], foes:[], bio:'Queen of Disco — "I Feel Love" essentially invented modern dance pop.' },

  { id:'olivia-newton-john', name:'Olivia Newton-John', middleName:'', homophones:[], similarSpellings:['Alivia','Olyvia','Olivya','Oliviah'], gender:'female', birthYear:1948, birthMonth:9, birthDay:26, birthPlace:'Cambridge, England', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1974}],
    collaborators:['John Travolta'], contemporaries:[], friends:[], foes:[], bio:'British-born Australian who turned Sandy in Grease into a chart juggernaut.' },

  { id:'stevie-nicks', name:'Stevie Nicks', middleName:'', homophones:['Stevy','Stevi'], similarSpellings:['Stevy','Stevi','Stevee','Stevye'], gender:'female', birthYear:1948, birthMonth:5, birthDay:26, birthPlace:'Phoenix, Arizona', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1978}],
    collaborators:['Lindsey Buckingham','Tom Petty'], contemporaries:[], friends:[], foes:[], bio:'Fleetwood Mac mystic and twirling solo icon of "Rumours" America.' },

  { id:'cyndi-lauper', name:'Cyndi Lauper', middleName:'Ann', homophones:['Cindy','Sindy','Cindi'], similarSpellings:['Cindy','Sindy','Cindi','Cyndy'], gender:'female', birthYear:1953, birthMonth:6, birthDay:22, birthPlace:'Brooklyn, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1985}],
    collaborators:['Rob Hyman'], contemporaries:[], friends:[], foes:[], bio:'Girls Just Want to Have Fun — bursting Technicolor avatar of MTV pop.' },

  { id:'pat-benatar', name:'Pat Benatar', middleName:'', homophones:[], similarSpellings:['Patt','Patti','Patty','Patrice'], gender:'female', birthYear:1953, birthMonth:1, birthDay:10, birthPlace:'Brooklyn, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Rock Vocal Performance',year:1980}],
    collaborators:['Neil Giraldo'], contemporaries:[], friends:[], foes:[], bio:'Hit Me With Your Best Shot — first woman in MTV\'s heaviest rotation.' },

  { id:'annie-lennox', name:'Annie Lennox', middleName:'', homophones:['Anny','Anni'], similarSpellings:['Anny','Anni','Annee','Annye'], gender:'female', birthYear:1954, birthMonth:12, birthDay:25, birthPlace:'Aberdeen, Scotland', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:1996}],
    collaborators:['Dave Stewart'], contemporaries:[], friends:[], foes:[],
    bio:'Eurythmics androgyne and four-octave belter of "Sweet Dreams."' },

  { id:'gloria-estefan', name:'Gloria Estefan', middleName:'', homophones:[], similarSpellings:['Glorea','Gloriah','Glorie','Glorya'], gender:'female', birthYear:1957, birthMonth:9, birthDay:1, birthPlace:'Havana, Cuba', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Tropical Latin Album',year:1994}],
    collaborators:['Emilio Estefan'], contemporaries:[], friends:[], foes:[], bio:'Cuban-born conga rhythm-maker who put Miami sound on the global charts.' },

  { id:'kate-bush', name:'Kate Bush', middleName:'', homophones:['Cate','Kait'], similarSpellings:['Cate','Kait','Kayte','Kaitee'], gender:'female', birthYear:1958, birthMonth:7, birthDay:30, birthPlace:'Bexleyheath, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Ivor Novello Award',year:2002}],
    collaborators:['David Gilmour'], contemporaries:[], friends:[], foes:[], bio:'Art-pop visionary whose "Running Up That Hill" charted twice, decades apart.' },

  { id:'belinda-carlisle', name:'Belinda Carlisle', middleName:'', homophones:[], similarSpellings:['Bellinda','Belynda','Belindah'], gender:'female', birthYear:1958, birthMonth:8, birthDay:17, birthPlace:'Hollywood, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jane Wiedlin'], contemporaries:[], friends:[], foes:[],
    bio:"Go-Go's lead and 'Heaven Is a Place on Earth' solo star." },

  { id:'madonna', name:'Madonna', middleName:'', homophones:[], similarSpellings:['Madona','Madonnah','Madonia'], gender:'female', birthYear:1958, birthMonth:8, birthDay:16, birthPlace:'Bay City, Michigan', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Album',year:1999}],
    collaborators:['Stuart Price','William Orbit'], contemporaries:['Michael Jackson','Prince','Whitney Houston','Cyndi Lauper'], friends:['Sandra Bernhard','Demi Moore'], foes:['Lady Gaga'], bio:'Material Girl — the model for every modern pop reinvention since 1983.' },

  { id:'sheryl-crow', name:'Sheryl Crow', middleName:'Suzanne', homophones:['Cheryl','Sheryll'], similarSpellings:['Cheryl','Sheryll','Sheril','Sherrill'], gender:'female', birthYear:1962, birthMonth:2, birthDay:11, birthPlace:'Kennett, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1995}],
    collaborators:['Stevie Nicks'], contemporaries:[], friends:[], foes:[], bio:'Sun-roof-down Americana pop and nine Grammys deep.' },

  { id:'whitney-houston', name:'Whitney Houston', middleName:'Elizabeth', homophones:[], similarSpellings:['Whitnee','Whitnie','Whitny','Whittney'], gender:'female', birthYear:1963, birthMonth:8, birthDay:9, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1994}],
    collaborators:['Clive Davis','Mariah Carey'], contemporaries:[], friends:[], foes:[], bio:'The Voice — "I Will Always Love You" sat at No. 1 for 14 weeks.' },

  { id:'bjork', name:'Björk', middleName:'', homophones:[], similarSpellings:['Bjoerk','Byork'], gender:'female', birthYear:1965, birthMonth:11, birthDay:21, birthPlace:'Reykjavík, Iceland', country:'Iceland', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for International Female Solo Artist',year:1996}],
    collaborators:['Mark Bell'], contemporaries:[], friends:[], foes:[],
    bio:'Icelandic art-pop alien; every album its own sonic country.' },

  { id:'tori-amos', name:'Tori Amos', middleName:'Ellen', homophones:['Tory','Torie'], similarSpellings:['Tory','Torie','Toree','Toria'], gender:'female', birthYear:1963, birthMonth:8, birthDay:22, birthPlace:'Newton, North Carolina', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Confessional piano-driven pop — "Cornflake Girl" and "Silent All These Years."' },

  { id:'shania-twain', name:'Shania Twain', middleName:'', homophones:[], similarSpellings:['Shaniah','Shanyah','Shaynia'], gender:'female', birthYear:1965, birthMonth:8, birthDay:28, birthPlace:'Windsor, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Country Album',year:1999}],
    collaborators:['Robert John "Mutt" Lange'], contemporaries:[], friends:[], foes:[], bio:'Best-selling country-pop crossover act of all time.' },

  { id:'janet-jackson', name:'Janet Jackson', middleName:'Damita', homophones:[], similarSpellings:['Janett','Janette','Janeth','Jeanette'], gender:'female', birthYear:1966, birthMonth:5, birthDay:16, birthPlace:'Gary, Indiana', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Long Form Music Video',year:1990}],
    collaborators:['Jimmy Jam','Terry Lewis'], contemporaries:[], friends:[], foes:[], bio:'Control — choreography-first pop monarch of the 1980s and 90s.' },

  { id:'toni-braxton', name:'Toni Braxton', middleName:'Michele', homophones:['Tony','Toney'], similarSpellings:['Tony','Toney','Tonee','Tonia'], gender:'female', birthYear:1967, birthMonth:10, birthDay:7, birthPlace:'Severn, Maryland', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1994}],
    collaborators:['Babyface'], contemporaries:[], friends:[], foes:[], bio:'Smoke-and-velvet contralto behind "Un-Break My Heart."' },

  { id:'faith-hill', name:'Faith Hill', middleName:'', homophones:[], similarSpellings:['Fayth','Faythe','Faithe'], gender:'female', birthYear:1967, birthMonth:9, birthDay:21, birthPlace:'Ridgeland, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Country Vocal Performance',year:2001}],
    collaborators:['Tim McGraw'], contemporaries:[], friends:[], foes:[], bio:'Country-pop crossover and one half of Nashville\'s power couple.' },

  { id:'celine-dion', name:'Céline Dion', middleName:'Marie', homophones:[], similarSpellings:['Celina','Selene','Selina','Celyne'], gender:'female', birthYear:1968, birthMonth:3, birthDay:30, birthPlace:'Charlemagne, Quebec', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1999}],
    collaborators:['David Foster'], contemporaries:[], friends:[], foes:[], bio:'Quebec belter whose "My Heart Will Go On" launched a thousand karaoke nights.' },

  { id:'sarah-mclachlan', name:'Sarah McLachlan', middleName:'Ann', homophones:['Sara','Zara','Sera'], similarSpellings:['Sara','Sarrah','Saraya','Sarra'], gender:'female', birthYear:1968, birthMonth:1, birthDay:28, birthPlace:'Halifax, Nova Scotia', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:1998}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Founder of Lilith Fair and crystalline voice of late-90s adult-alternative.' },

  { id:'mary-j-blige', name:'Mary J. Blige', middleName:'Jane', homophones:['Marie','Mari'], similarSpellings:['Marie','Mari','Marey','Maree'], gender:'female', birthYear:1971, birthMonth:1, birthDay:11, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Album',year:2007}],
    collaborators:['Diddy','Jay-Z'], contemporaries:[], friends:[], foes:[], bio:'Queen of Hip-Hop Soul; voice of the New York 90s.' },

  { id:'thalia', name:'Thalía', middleName:'Ariadna', homophones:[], similarSpellings:['Thalya','Talia','Thaliah'], gender:'female', birthYear:1971, birthMonth:8, birthDay:26, birthPlace:'Mexico City, Mexico', country:'Mexico', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Billboard Latin Music Award',year:2002}],
    collaborators:['Tony Bennett'], contemporaries:[], friends:[], foes:[], bio:'Queen of Latin Pop and former Timbiriche kid star.' },

  { id:'selena-quintanilla', name:'Selena Quintanilla', middleName:'', homophones:['Salena','Selina'], similarSpellings:['Salena','Selina','Selene','Celina'], gender:'female', birthYear:1971, birthMonth:4, birthDay:16, birthPlace:'Lake Jackson, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Mexican-American Album',year:1994}],
    collaborators:['A.B. Quintanilla'], contemporaries:[], friends:[], foes:[], bio:'Queen of Tejano — Latin pop\'s eternal what-might-have-been.' },

  { id:'gwen-stefani', name:'Gwen Stefani', middleName:'Renée', homophones:[], similarSpellings:['Gwenn','Gwenne','Gweneth'], gender:'female', birthYear:1969, birthMonth:10, birthDay:3, birthPlace:'Fullerton, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Performance by a Duo or Group',year:2003}],
    collaborators:['Pharrell Williams','Eve'], contemporaries:[], friends:[], foes:[], bio:"No Doubt front and Hollaback solo princess." },

  { id:'mariah-carey', name:'Mariah Carey', middleName:'', homophones:['Maria','Maraya'], similarSpellings:['Maria','Maraya','Mariya','Maryah'], gender:'female', birthYear:1969, birthMonth:3, birthDay:27, birthPlace:'Huntington, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1991}],
    collaborators:['Boyz II Men','Jermaine Dupri'], contemporaries:[], friends:[], foes:[], bio:'Whistle-register supreme — "All I Want for Christmas Is You" reigns annually.' },

  { id:'jennifer-lopez', name:'Jennifer Lopez', middleName:'Lynn', homophones:[], similarSpellings:['Jenifer','Jeniffer','Jenniffer','Jenefer'], gender:'female', birthYear:1969, birthMonth:7, birthDay:24, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Marc Anthony','Ja Rule'], contemporaries:[], friends:[], foes:[], bio:'Bronx-born triple-threat; dancer, actor, and Latin-pop crossover star.' },

  { id:'alanis-morissette', name:'Alanis Morissette', middleName:'Nadine', homophones:[], similarSpellings:['Alaniss','Alanys','Alana'], gender:'female', birthYear:1974, birthMonth:6, birthDay:1, birthPlace:'Ottawa, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1996}],
    collaborators:['Glen Ballard'], contemporaries:[], friends:[], foes:[],
    bio:'Jagged Little Pill remains the angriest mainstream pop record of the 90s.' },

  { id:'jewel', name:'Jewel', middleName:'Kilcher', homophones:['Jewell'], similarSpellings:['Jewell','Jewl','Juel','Jewele'], gender:'female', birthYear:1974, birthMonth:5, birthDay:23, birthPlace:'Payson, Utah', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Alaskan singer-songwriter who lived in a van before "Pieces of You."' },

  { id:'sia', name:'Sia', middleName:'', homophones:['Sea','Cia'], similarSpellings:['Sea','Cia','Sya','Siah'], gender:'female', birthYear:1975, birthMonth:12, birthDay:18, birthPlace:'Adelaide, Australia', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'ARIA Award for Best Pop Release',year:2014}],
    collaborators:['David Guetta','Diplo'], contemporaries:[], friends:[], foes:[], bio:'Wig-shrouded Australian who writes hits for everyone, including herself.' },

  { id:'fergie', name:'Fergie', middleName:'', homophones:['Fergy'], similarSpellings:['Fergy','Fergee','Fergi','Fergye'], gender:'female', birthYear:1975, birthMonth:3, birthDay:27, birthPlace:'Hacienda Heights, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Performance by a Duo or Group',year:2010}],
    collaborators:['will.i.am','Black Eyed Peas'], contemporaries:[], friends:[], foes:[], bio:'Black Eyed Peas frontwoman and "Big Girls Don\'t Cry" solo star.' },

  { id:'shakira', name:'Shakira', middleName:'Isabel', homophones:[], similarSpellings:['Chakira','Shakirah','Shaqira'], gender:'female', birthYear:1977, birthMonth:2, birthDay:2, birthPlace:'Barranquilla, Colombia', country:'Colombia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Latin Pop Album',year:2006}],
    collaborators:['Wyclef Jean','Beyoncé'], contemporaries:[], friends:[], foes:[], bio:'Colombian hip-shaker who turned bilingual pop into a stadium event.' },

  { id:'fiona-apple', name:'Fiona Apple', middleName:'', homophones:[], similarSpellings:['Fionah','Fyona','Fionna','Fionne'], gender:'female', birthYear:1977, birthMonth:9, birthDay:13, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rock Performance',year:1998}],
    collaborators:['Jon Brion'], contemporaries:[], friends:[], foes:[], bio:'Confessional piano genius — "Fetch the Bolt Cutters" topped 2020 critics polls.' },

  { id:'nelly-furtado', name:'Nelly Furtado', middleName:'Kim', homophones:['Nellie','Nellee'], similarSpellings:['Nellie','Nellee','Neli','Nelie'], gender:'female', birthYear:1978, birthMonth:12, birthDay:2, birthPlace:'Victoria, British Columbia', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:2002}],
    collaborators:['Timbaland'], contemporaries:[], friends:[], foes:[], bio:'I\'m Like a Bird — Portuguese-Canadian pop reinvented herself with Timbaland.' },

  { id:'norah-jones', name:'Norah Jones', middleName:'', homophones:['Nora','Norra'], similarSpellings:['Nora','Norra','Norrah','Noora'], gender:'female', birthYear:1979, birthMonth:3, birthDay:30, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2003}],
    collaborators:['Ravi Shankar (father)'], contemporaries:[], friends:[], foes:[], bio:'Daughter of Ravi Shankar; "Come Away With Me" swept the 2003 Grammys.' },

  { id:'pink', name:'P!nk', middleName:'', homophones:[], similarSpellings:['Pinque','Pynk'], gender:'female', birthYear:1979, birthMonth:9, birthDay:8, birthPlace:'Doylestown, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:2003}],
    collaborators:['Max Martin'], contemporaries:[], friends:[], foes:[], bio:'Aerialist pop-rocker who rewrote what stadium-pop choreography could be.' },

  { id:'brandy', name:'Brandy', middleName:'Rayana', homophones:['Brandi','Brandee'], similarSpellings:['Brandi','Brandee','Brandey','Brandye'], gender:'female', birthYear:1979, birthMonth:2, birthDay:11, birthPlace:'McComb, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance by a Duo or Group',year:1999}],
    collaborators:['Monica','Rodney Jerkins'], contemporaries:[], friends:[], foes:[],
    bio:'Vocal Bible — R&B-pop technician with one of the most copied harmonies of the 90s.' },

  { id:'robyn', name:'Robyn', middleName:'', homophones:['Robin','Robbyn'], similarSpellings:['Robin','Robbyn','Robbin','Roben'], gender:'female', birthYear:1979, birthMonth:6, birthDay:12, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2010}],
    collaborators:['Röyksopp'], contemporaries:[], friends:[], foes:[], bio:'Swedish queen of crying-in-the-club electro-pop.' },

  { id:'sara-bareilles', name:'Sara Bareilles', middleName:'Beth', homophones:['Sarah','Zara','Sera'], similarSpellings:['Sarah','Sera','Sahra','Sarra'], gender:'female', birthYear:1979, birthMonth:12, birthDay:7, birthPlace:'Eureka, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Piano-pop hitmaker turned Tony-nominated Broadway composer.' },

  { id:'monica', name:'Monica', middleName:'Denise', homophones:[], similarSpellings:['Monika','Monicka','Monnica','Monyca'], gender:'female', birthYear:1980, birthMonth:10, birthDay:24, birthPlace:'College Park, Georgia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance by a Duo or Group',year:1999}],
    collaborators:['Brandy'], contemporaries:[], friends:[], foes:[], bio:'The Boy Is Mine — R&B-pop teen queen alongside Brandy.' },

  { id:'christina-aguilera', name:'Christina Aguilera', middleName:'Maria', homophones:['Cristina','Kristina'], similarSpellings:['Cristina','Kristina','Kristyna','Christine'], gender:'female', birthYear:1980, birthMonth:12, birthDay:18, birthPlace:'Staten Island, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2007}],
    collaborators:['Linda Perry'], contemporaries:[], friends:[], foes:[], bio:'Genie-out-of-the-bottle pop belter and rival-twin to Britney.' },

  { id:'jessica-simpson', name:'Jessica Simpson', middleName:'Ann', homophones:[], similarSpellings:['Jessika','Jessicka','Jessicah'], gender:'female', birthYear:1980, birthMonth:7, birthDay:10, birthPlace:'Abilene, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Y2K pop ingénue and reality-TV originator with husband Nick Lachey.' },

  { id:'ashanti', name:'Ashanti', middleName:'Shequoiya', homophones:[], similarSpellings:['Ashantee','Ashante','Ashauntae'], gender:'female', birthYear:1980, birthMonth:10, birthDay:13, birthPlace:'Glen Cove, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Contemporary R&B Album',year:2003}],
    collaborators:['Ja Rule','Murder Inc.'], contemporaries:[], friends:[], foes:[],
    bio:"2002's ubiquitous pop-R&B feature whose self-titled debut posted the biggest first-week sales for any female artist's debut at the time." },

  { id:'beyonce', name:'Beyoncé', middleName:'Giselle', homophones:[], similarSpellings:['Beyoncé','Beyonsay','Beyonsey'], gender:'female', birthYear:1981, birthMonth:9, birthDay:4, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:2023}],
    collaborators:['Jay-Z','Kelly Rowland'], contemporaries:['Rihanna','Lady Gaga','Adele','Taylor Swift'], friends:['Jay-Z','Solange Knowles','Michelle Williams','Kelly Rowland'], foes:[],
    bio:"Most-decorated artist in Grammy history; from Destiny's Child to Lemonade, Renaissance, and Cowboy Carter." },

  { id:'britney-spears', name:'Britney Spears', middleName:'Jean', homophones:['Brittany','Britny','Britnee'], similarSpellings:['Brittany','Britny','Britnee','Britani'], gender:'female', birthYear:1981, birthMonth:12, birthDay:2, birthPlace:'McComb, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2005}],
    collaborators:['Max Martin'], contemporaries:[], friends:[], foes:[], bio:'Princess of Pop and the defining teen idol of the millennium turn.' },

  { id:'alicia-keys', name:'Alicia Keys', middleName:'Augello', homophones:[], similarSpellings:['Alycia','Aleecia','Alisha','Alecia'], gender:'female', birthYear:1981, birthMonth:1, birthDay:25, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2002}],
    collaborators:['Jay-Z'], contemporaries:[], friends:[], foes:[],
    bio:"Hell's Kitchen-raised pianist and 15-time Grammy winner." },

  { id:'kelly-clarkson', name:'Kelly Clarkson', middleName:'Brianne', homophones:['Kelli','Kelley'], similarSpellings:['Kelli','Kelley','Kellie','Kely'], gender:'female', birthYear:1982, birthMonth:4, birthDay:24, birthPlace:'Fort Worth, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2006}],
    collaborators:['Max Martin'], contemporaries:[], friends:[], foes:[], bio:'First-ever American Idol winner and 2000s breakup-anthem queen.' },

  { id:'leann-rimes', name:'LeAnn Rimes', middleName:'', homophones:[], similarSpellings:['Leeanne','Leeann','Leighanne','Liane'], gender:'female', birthYear:1982, birthMonth:8, birthDay:28, birthPlace:'Jackson, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1997}],
    collaborators:['Ronan Keating'], contemporaries:[], friends:[], foes:[], bio:'Country-pop child star — youngest Best New Artist Grammy winner.' },

  { id:'amy-winehouse', name:'Amy Winehouse', middleName:'Jade', homophones:['Aimee','Amie','Ami'], similarSpellings:['Aimee','Amie','Ami','Amee'], gender:'female', birthYear:1983, birthMonth:9, birthDay:14, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:2008}],
    collaborators:['Mark Ronson','Salaam Remi'], contemporaries:[], friends:[], foes:[],
    bio:'Back to Black smoke-and-soul prodigy gone too soon at 27.' },

  { id:'carrie-underwood', name:'Carrie Underwood', middleName:'Marie', homophones:['Cary','Kari','Keri'], similarSpellings:['Cary','Kari','Keri','Carry'], gender:'female', birthYear:1983, birthMonth:3, birthDay:10, birthPlace:'Muskogee, Oklahoma', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2007}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'American Idol champion turned country-pop\'s premier vocalist.' },

  { id:'katy-perry', name:'Katy Perry', middleName:'Elizabeth', homophones:['Katie','Kati','Caty'], similarSpellings:['Katie','Kati','Caty','Katey'], gender:'female', birthYear:1984, birthMonth:10, birthDay:25, birthPlace:'Santa Barbara, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Max Martin','Dr. Luke'], contemporaries:[], friends:[], foes:[], bio:'Teenage Dream — only second album to spawn five Hot 100 No. 1s.' },

  { id:'avril-lavigne', name:'Avril Lavigne', middleName:'Ramona', homophones:[], similarSpellings:['Avrille','Avryl','Aprille'], gender:'female', birthYear:1984, birthMonth:9, birthDay:27, birthPlace:'Belleville, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Sk8er Boi pop-punk patron saint and Canadian export.' },

  { id:'rosalia', name:'Rosalía', middleName:'', homophones:[], similarSpellings:['Rosalía','Rosalea','Rozalia'], gender:'female', birthYear:1992, birthMonth:9, birthDay:25, birthPlace:'Sant Esteve Sesrovires, Spain', country:'Spain', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Latin Rock or Alternative Album',year:2019}],
    collaborators:['El Guincho'], contemporaries:[], friends:[], foes:[], bio:'Spanish flamenco-pop deconstructionist; "Motomami" defined 2022.' },

  { id:'lana-del-rey', name:'Lana Del Rey', middleName:'', homophones:['Lanna'], similarSpellings:['Lanna','Lannah','Lanae'], gender:'female', birthYear:1985, birthMonth:6, birthDay:21, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jack Antonoff'], contemporaries:[], friends:[], foes:[], bio:"Sad-girl Americana dream-pop priestess." },

  { id:'lady-gaga', name:'Lady Gaga', middleName:'', homophones:[], similarSpellings:['Ledy','Laidy','Laydee'], gender:'female', birthYear:1986, birthMonth:3, birthDay:28, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2019}],
    collaborators:['RedOne','Bradley Cooper'], contemporaries:[], friends:[], foes:[], bio:'Mother Monster — dance-pop avant-gardist who became an Oscar-winning actor.' },

  { id:'janelle-monae', name:'Janelle Monáe', middleName:'', homophones:[], similarSpellings:['Janel','Janell','Jenelle','Janella'], gender:'nonbinary', birthYear:1985, birthMonth:12, birthDay:1, birthPlace:'Kansas City, Kansas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Big Boi','Prince'], contemporaries:[], friends:[], foes:[], bio:'Sci-fi soul-pop polymath in tuxedos and pompadours; came out as non-binary in 2022.' },

  { id:'leona-lewis', name:'Leona Lewis', middleName:'Louise', homophones:[], similarSpellings:['Liona','Leonah','Leeona'], gender:'female', birthYear:1985, birthMonth:4, birthDay:3, birthPlace:'Islington, London', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Simon Cowell'], contemporaries:[], friends:[], foes:[], bio:'X Factor winner whose "Bleeding Love" topped charts in 35 countries.' },

  { id:'ellie-goulding', name:'Ellie Goulding', middleName:'Jane', homophones:['Elly','Eli','Eli'], similarSpellings:['Elly','Eli','Elie','Ellee'], gender:'female', birthYear:1986, birthMonth:12, birthDay:30, birthPlace:'Lyonshall, Herefordshire', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for Critics\' Choice',year:2010}],
    collaborators:['Calvin Harris'], contemporaries:[], friends:[], foes:[], bio:'Lights — British EDM-pop crossover and royal wedding singer for Will & Kate.' },

  { id:'florence-welch', name:'Florence Welch', middleName:'Leontine', homophones:[], similarSpellings:['Florense','Florance','Florencia','Florenz'], gender:'female', birthYear:1986, birthMonth:8, birthDay:28, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for Best British Album',year:2010}],
    collaborators:['Isabella Summers'], contemporaries:[], friends:[], foes:[], bio:'Florence + the Machine front; "Dog Days Are Over" is a generational anthem.' },

  { id:'solange', name:'Solange', middleName:'Piaget', homophones:[], similarSpellings:['Solang','Solanj','Soulange'], gender:'female', birthYear:1986, birthMonth:6, birthDay:24, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance',year:2017}],
    collaborators:['Sampha','Raphael Saadiq'], contemporaries:[], friends:[], foes:[], bio:'Beyoncé\'s younger sister and a singular art-soul auteur in her own right.' },

  { id:'hilary-duff', name:'Hilary Duff', middleName:'Erhard', homophones:['Hillary','Hilarie'], similarSpellings:['Hillary','Hilarie','Hilary','Hilery'], gender:'female', birthYear:1987, birthMonth:9, birthDay:28, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:"Lizzie McGuire-era teen-pop avatar." },

  { id:'rihanna', name:'Rihanna', middleName:'Robyn', homophones:[], similarSpellings:['Riana','Reanna','Rihannah','Rhianna'], gender:'female', birthYear:1988, birthMonth:2, birthDay:20, birthPlace:'Saint Michael, Barbados', country:'Barbados', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rap/Sung Collaboration',year:2008}],
    collaborators:['Jay-Z','Drake'], contemporaries:['Beyoncé','Lady Gaga','Katy Perry'], friends:['Drake','Cara Delevingne'], foes:[], bio:'Barbadian queen of the 2010s singles era; later beauty-empire billionaire.' },

  { id:'adele', name:'Adele', middleName:'Laurie Blue', homophones:['Adel','Adell'], similarSpellings:['Adel','Adell','Adelle','Adela'], gender:'female', birthYear:1988, birthMonth:5, birthDay:5, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2012}],
    collaborators:['Paul Epworth','Greg Kurstin'], contemporaries:[], friends:[], foes:[],
    bio:'21 sold 31 million copies; voice that breaks decades into before-and-after.' },

  { id:'taylor-swift', name:'Taylor Swift', middleName:'Alison', homophones:[], similarSpellings:['Tayler','Tailor','Tayloer','Taelor'], gender:'female', birthYear:1989, birthMonth:12, birthDay:13, birthPlace:'West Reading, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2010},{name:'Grammy Award for Album of the Year',year:2024}],
    collaborators:['Jack Antonoff','Aaron Dessner'], contemporaries:['Beyoncé','Ariana Grande','Adele','Katy Perry'], friends:['Selena Gomez','Ed Sheeran','Hailee Steinfeld'], foes:['Kanye West','Scooter Braun','Katy Perry'], bio:'Country-to-pop generational songwriter; first artist to win Album of the Year four times.' },

  { id:'sza', name:'SZA', middleName:'', homophones:[], similarSpellings:['Sazah'], gender:'female', birthYear:1989, birthMonth:11, birthDay:8, birthPlace:'St. Louis, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Duo/Group Performance',year:2018}],
    collaborators:['Top Dawg Entertainment','Kendrick Lamar'], contemporaries:[], friends:[], foes:[], bio:'TDE\'s genre-bending songwriter; "SOS" parked at No. 1 for 10 weeks.' },

  { id:'iggy-azalea', name:'Iggy Azalea', middleName:'', homophones:['Iggi'], similarSpellings:['Iggi','Iggee','Igy'], gender:'female', birthYear:1990, birthMonth:6, birthDay:7, birthPlace:'Sydney, Australia', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Charli XCX'], contemporaries:[], friends:[], foes:[], bio:'Australian rapper whose "Fancy" parked at No. 1 for seven weeks.' },

  { id:'karol-g', name:'Karol G', middleName:'', homophones:['Carol','Carroll','Carole'], similarSpellings:['Carol','Carroll','Carole','Carrol'], gender:'female', birthYear:1991, birthMonth:2, birthDay:14, birthPlace:'Medellín, Colombia', country:'Colombia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Latin Grammy Award for Album of the Year',year:2023}],
    collaborators:['Bad Bunny'], contemporaries:[], friends:[], foes:[], bio:'Reggaetón\'s reigning bichota and stadium-headline solo star.' },

  { id:'kacey-musgraves', name:'Kacey Musgraves', middleName:'Lee', homophones:['Casey','Kasey','Kacy'], similarSpellings:['Casey','Kasey','Kacy','Kasie'], gender:'female', birthYear:1988, birthMonth:8, birthDay:21, birthPlace:'Golden, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2019}],
    collaborators:['Daniel Tashian'], contemporaries:[], friends:[], foes:[], bio:'Country-pop poet whose "Golden Hour" swept the 2019 Grammys.' },

  { id:'demi-lovato', name:'Demi Lovato', middleName:'', homophones:['Demmi'], similarSpellings:['Demmi','Demie','Demee','Demy'], gender:'nonbinary', birthYear:1992, birthMonth:8, birthDay:20, birthPlace:'Albuquerque, New Mexico', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Disney teen-pop star turned belting solo artist; came out as non-binary in 2021.' },

  { id:'selena-gomez', name:'Selena Gomez', middleName:'Marie', homophones:['Salena','Selina'], similarSpellings:['Salena','Selina','Selene','Celina'], gender:'female', birthYear:1992, birthMonth:7, birthDay:22, birthPlace:'Grand Prairie, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Marshmello','Benny Blanco'], contemporaries:[], friends:[], foes:[], bio:'Wizards of Waverly Place lead turned Rare Beauty mogul and pop star.' },

  { id:'miley-cyrus', name:'Miley Cyrus', middleName:'Ray', homophones:['Mily','Milee'], similarSpellings:['Mily','Milee','Mylie','Mileigh'], gender:'female', birthYear:1992, birthMonth:11, birthDay:23, birthPlace:'Franklin, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:2024}],
    collaborators:['Mark Ronson'], contemporaries:[], friends:[], foes:[], bio:'Hannah Montana to "Flowers" — country-pop child star turned Record-of-the-Year winner.' },

  { id:'charli-xcx', name:'Charli XCX', middleName:'', homophones:['Charlie','Charley'], similarSpellings:['Charlie','Charley','Charley','Charly'], gender:'female', birthYear:1992, birthMonth:8, birthDay:2, birthPlace:'Cambridge, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['A. G. Cook','Iggy Azalea'], contemporaries:[], friends:[], foes:[], bio:'PC-Music-aligned Brit who turned 2024 lime green with "Brat."' },

  { id:'iu', name:'IU', middleName:'', homophones:[], similarSpellings:['Eeu','Iyu'], gender:'female', birthYear:1993, birthMonth:5, birthDay:16, birthPlace:'Seoul, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Melon Music Award',year:2010}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Nation\'s little sister — Korea\'s most decorated solo pop star of the 2010s.' },

  { id:'tinashe', name:'Tinashe', middleName:'Jorgensen', homophones:[], similarSpellings:['Tinasha','Tynashe'], gender:'female', birthYear:1993, birthMonth:2, birthDay:6, birthPlace:'Lexington, Kentucky', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['DJ Mustard'], contemporaries:[], friends:[], foes:[], bio:'2 On — independent R&B-pop dancer whose 2024 "Nasty" went viral.' },

  { id:'ariana-grande', name:'Ariana Grande', middleName:'', homophones:[], similarSpellings:['Arianna','Aryana','Arianah','Aryanna'], gender:'female', birthYear:1993, birthMonth:6, birthDay:26, birthPlace:'Boca Raton, Florida', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2019}],
    collaborators:['Pharrell Williams','Max Martin'], contemporaries:[], friends:[], foes:[],
    bio:"Whistle-tone pop monarch; thank u, next launched a new vocal era." },

  { id:'halsey', name:'Halsey', middleName:'', homophones:[], similarSpellings:['Halsie','Halsy','Halzey'], gender:'female', birthYear:1994, birthMonth:9, birthDay:29, birthPlace:'Edison, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['The Chainsmokers','BTS'], contemporaries:[], friends:[], foes:[], bio:'Tumblr-era confessional pop star; first six No. 1 albums solo and collaborative.' },

  { id:'doja-cat', name:'Doja Cat', middleName:'', homophones:[], similarSpellings:['Dojah','Doza','Dojja'], gender:'female', birthYear:1995, birthMonth:10, birthDay:21, birthPlace:'Los Angeles, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Duo/Group Performance',year:2022}],
    collaborators:['SZA'], contemporaries:[], friends:[], foes:[], bio:'TikTok-fluent rap-pop hybrid behind "Say So" and "Paint the Town Red."' },

  { id:'dua-lipa', name:'Dua Lipa', middleName:'', homophones:[], similarSpellings:['Doua','Duah','Duwa'], gender:'female', birthYear:1995, birthMonth:8, birthDay:22, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2019}],
    collaborators:['Stuart Price'], contemporaries:[], friends:[], foes:[], bio:"Future Nostalgia disco-pop revivalist." },

  { id:'lorde', name:'Lorde', middleName:'', homophones:['Lord','Lourd'], similarSpellings:['Lord','Lourd','Lorda'], gender:'female', birthYear:1996, birthMonth:11, birthDay:7, birthPlace:'Takapuna, Auckland', country:'New Zealand', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Song of the Year',year:2014}],
    collaborators:['Jack Antonoff','Joel Little'], contemporaries:[], friends:[], foes:[], bio:'Royals — youngest solo No. 1 act in the U.S. since 1987 at the time.' },

  { id:'jisoo', name:'Jisoo', middleName:'', homophones:[], similarSpellings:['Jissoo','Jeesoo'], gender:'female', birthYear:1995, birthMonth:1, birthDay:3, birthPlace:'Seoul, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], contemporaries:[], friends:[], foes:[], bio:'Blackpink visual and vocalist; her solo "Flower" hit No. 1 on Billboard Global.' },

  { id:'jennie', name:'Jennie', middleName:'', homophones:['Jenny','Jeni','Jenni'], similarSpellings:['Jenny','Jeni','Jenni','Jenne'], gender:'female', birthYear:1996, birthMonth:1, birthDay:16, birthPlace:'Anyang, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], contemporaries:[], friends:[], foes:[], bio:'Blackpink rapper and Chanel ambassador; debut solo "Solo" defined K-pop 2018.' },

  { id:'rose', name:'Rosé', middleName:'', homophones:['Rosé','Rosey','Rosie'], similarSpellings:['Rosé','Rosey','Rosie','Rosa'], gender:'female', birthYear:1997, birthMonth:2, birthDay:11, birthPlace:'Auckland, New Zealand', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Bruno Mars'], contemporaries:[], friends:[], foes:[], bio:'Blackpink vocalist; 2024\'s "APT." with Bruno Mars hit global No. 1.' },

  { id:'lisa', name:'Lisa', middleName:'', homophones:['Liza','Leesa','Leeza'], similarSpellings:['Liza','Leesa','Leeza','Lisah'], gender:'female', birthYear:1997, birthMonth:3, birthDay:27, birthPlace:'Buriram, Thailand', country:'Thailand', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], contemporaries:[], friends:[], foes:[], bio:'Thai-born Blackpink rapper; "Money" was the longest-charting K-solo on Hot 100.' },

  { id:'camila-cabello', name:'Camila Cabello', middleName:'', homophones:['Camilla','Kamila'], similarSpellings:['Camilla','Kamila','Camille','Kamilla'], gender:'female', birthYear:1997, birthMonth:3, birthDay:3, birthPlace:'Cojímar, Havana', country:'Cuba', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Shawn Mendes'], contemporaries:[], friends:[], foes:[], bio:'Cuban-American Fifth Harmony alum who went solo with "Havana."' },

  { id:'her', name:'H.E.R.', middleName:'', homophones:[], similarSpellings:['Herr','Heir'], gender:'female', birthYear:1997, birthMonth:6, birthDay:27, birthPlace:'Vallejo, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2021}],
    collaborators:['Daniel Caesar'], contemporaries:[], friends:[], foes:[], bio:'Anonymous-debut R&B-pop savant; Oscar winner for "Fight for You."' },

  { id:'chappell-roan', name:'Chappell Roan', middleName:'', homophones:[], similarSpellings:['Chappel','Chapell','Chappele'], gender:'female', birthYear:1998, birthMonth:2, birthDay:19, birthPlace:'Willard, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2025}],
    collaborators:['Dan Nigro'], contemporaries:[], friends:[], foes:[], bio:'Midwest Princess — drag-inflected pop sensation of 2024.' },

  { id:'sabrina-carpenter', name:'Sabrina Carpenter', middleName:'Annlynn', homophones:[], similarSpellings:['Sabryna','Sabreena','Sabrinna'], gender:'female', birthYear:1999, birthMonth:5, birthDay:11, birthPlace:'Lehigh Valley, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jack Antonoff'], contemporaries:[], friends:[], foes:[], bio:'Disney-to-pop graduate; 2024\'s "Espresso" parked the summer.' },

  { id:'olivia-rodrigo', name:'Olivia Rodrigo', middleName:'Isabel', homophones:[], similarSpellings:['Alivia','Olyvia','Olivya','Oliviah'], gender:'female', birthYear:2003, birthMonth:2, birthDay:20, birthPlace:'Murrieta, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2022}],
    collaborators:['Dan Nigro'], contemporaries:[], friends:[], foes:[], bio:'Drivers License went viral on a Sunday and never came back.' },

  { id:'billie-eilish', name:'Billie Eilish', middleName:'Eilish', homophones:['Billy','Billi','Billee'], similarSpellings:['Billy','Billi','Billee','Bilee'], gender:'female', birthYear:2001, birthMonth:12, birthDay:18, birthPlace:'Los Angeles, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2020}],
    collaborators:["Finneas O'Connell"], contemporaries:[], friends:[], foes:[],
    bio:'Whisper-pop generational voice; youngest Album-of-the-Year winner ever.' },

  { id:'tate-mcrae', name:'Tate McRae', middleName:'Rosner', homophones:[], similarSpellings:['Tait','Tayt','Taete','Tayte'], gender:'female', birthYear:2003, birthMonth:7, birthDay:1, birthPlace:'Calgary, Alberta', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Canadian dancer-turned-pop-star behind "greedy."' },

  // =====================================================================
  //  NFL (preserved from earlier dataset)
  // =====================================================================
  { id:'walter-payton', name:'Walter Payton', middleName:'Jerry', homophones:[], similarSpellings:['Walther','Walt','Waltir'], gender:'male', birthYear:1953, birthMonth:7, birthDay:25, birthPlace:'Columbia, Mississippi', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[1975,1987]}],
    awards:[{name:'NFL MVP',year:1977},{name:'Super Bowl Champion',year:1986}],
    collaborators:['Mike Ditka','Jim McMahon'], contemporaries:[], friends:[], foes:[], bio:'Hall of Fame running back known as "Sweetness."' },

  { id:'donovan-mcnabb', name:'Donovan McNabb', middleName:'Jamal', homophones:[], similarSpellings:['Donavan','Donovin','Donavon','Donavin'], gender:'male', birthYear:1976, birthMonth:11, birthDay:25, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Philadelphia Eagles',years:[1999,2009]},{name:'Washington Redskins',years:[2010,2010]}],
    awards:[{name:'Pro Bowl',year:2000}], collaborators:['Andy Reid','Brian Westbrook'], contemporaries:[], friends:[], foes:[],
    bio:"Six-time Pro Bowl quarterback, born on Chicago's South Side." },

  { id:'simeon-rice', name:'Simeon Rice', middleName:'', homophones:[], similarSpellings:['Simion','Simyon','Symeon','Simeun'], gender:'male', birthYear:1974, birthMonth:4, birthDay:26, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Arizona Cardinals',years:[1996,2000]},{name:'Tampa Bay Buccaneers',years:[2001,2006]}],
    awards:[{name:'Super Bowl Champion',year:2002}], collaborators:['Warren Sapp','Derrick Brooks'], contemporaries:[], friends:[], foes:[],
    bio:"Super Bowl XXXVII pass-rush specialist who retired with 122 NFL sacks." },

  { id:'tony-romo', name:'Tony Romo', middleName:'', homophones:['Toney','Toni'], similarSpellings:['Toney','Toni','Tonio','Tonee'], gender:'male', birthYear:1980, birthMonth:4, birthDay:21, birthPlace:'San Diego, California', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Dallas Cowboys',years:[2003,2016]}], awards:[{name:'Pro Bowl',year:2007}],
    collaborators:['Jason Witten','DeMarco Murray'], contemporaries:[], friends:[], foes:[], bio:'Cowboys quarterback turned lead NFL broadcaster.' },

  { id:'odell-beckham-jr', name:'Odell Beckham Jr.', middleName:'Cornelius', homophones:[], similarSpellings:['Odel','Odelle','Odale'], gender:'male', birthYear:1992, birthMonth:11, birthDay:5, birthPlace:'Baton Rouge, Louisiana', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'New York Giants',years:[2014,2018]},{name:'Cleveland Browns',years:[2019,2021]},{name:'Los Angeles Rams',years:[2021,2021]}],
    awards:[{name:'Super Bowl Champion',year:2022}], collaborators:['Eli Manning','Matthew Stafford'], contemporaries:[], friends:[], foes:[],
    bio:'Wide receiver famed for the one-handed catch.' },

  { id:'jameis-winston', name:'Jameis Winston', middleName:'Lanaed', homophones:['James','Jamis'], similarSpellings:['James','Jamis','Jamius','Jameus'], gender:'male', birthYear:1994, birthMonth:1, birthDay:6, birthPlace:'Bessemer, Alabama', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Tampa Bay Buccaneers',years:[2015,2019]},{name:'New Orleans Saints',years:[2020,2023]}],
    awards:[{name:'Heisman Trophy',year:2013}], collaborators:['Mike Evans','Drew Brees'], contemporaries:[], friends:[], foes:[],
    bio:"First overall pick in the 2015 NFL Draft and 2013 Heisman Trophy winner." },

  { id:'thomas-jones', name:'Thomas Jones', middleName:'Quinten', homophones:[], similarSpellings:['Tomas','Thoms','Tomass','Thomass'], gender:'male', birthYear:1978, birthMonth:8, birthDay:19, birthPlace:'Big Stone Gap, Virginia', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[2004,2006]},{name:'New York Jets',years:[2007,2009]}],
    awards:[], collaborators:['Brian Urlacher'], contemporaries:[], friends:[], foes:[], bio:"Veteran NFL running back who rushed for 10,591 career yards across twelve seasons." },

  { id:'matt-forte', name:'Matt Forté', middleName:'', homophones:[], similarSpellings:['Mat','Matty','Matthew','Mathew'], gender:'male', birthYear:1985, birthMonth:7, birthDay:11, birthPlace:'Lake Charles, Louisiana', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[2008,2015]},{name:'New York Jets',years:[2016,2017]}],
    awards:[{name:'Pro Bowl',year:2011}], collaborators:['Jay Cutler'], contemporaries:[], friends:[], foes:[], bio:"Bears' all-purpose running back of the 2010s." },

  // =====================================================================
  //  Acting / Film (preserved)
  // =====================================================================
  { id:'janet-gaynor', name:'Janet Gaynor', middleName:'', homophones:[], similarSpellings:['Janett','Janette','Janeth','Jeanette'], gender:'female', birthYear:1906, birthMonth:10, birthDay:6, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1929}],
    collaborators:['Charles Farrell','F. W. Murnau'], contemporaries:[], friends:[], foes:[], bio:'Won the very first Academy Award for Best Actress at the inaugural 1929 ceremony.' },

  { id:'mary-pickford', name:'Mary Pickford', middleName:'', homophones:['Marie','Mari','Marey'], similarSpellings:['Marie','Mari','Marey','Maree'], gender:'female', birthYear:1892, birthMonth:4, birthDay:8, birthPlace:'Toronto, Ontario', country:'Canada', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1930}],
    collaborators:['Douglas Fairbanks','D. W. Griffith'], contemporaries:[], friends:[], foes:[], bio:'Silent film superstar; co-founded United Artists.' },

  { id:'meryl-streep', name:'Meryl Streep', middleName:'Louise', homophones:[], similarSpellings:['Meril','Merryl','Merrill','Maryl'], gender:'female', birthYear:1949, birthMonth:6, birthDay:22, birthPlace:'Summit, New Jersey', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1983},{name:'Academy Award for Best Actress',year:2012}],
    collaborators:['Robert De Niro','Mike Nichols'], contemporaries:[], friends:[], foes:[], bio:'Most-nominated actor in Academy Awards history.' },

  { id:'denzel-washington', name:'Denzel Washington', middleName:'Hayes', homophones:[], similarSpellings:['Denzell','Denzil','Denzal'], gender:'male', birthYear:1954, birthMonth:12, birthDay:28, birthPlace:'Mount Vernon, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actor',year:1990},{name:'Academy Award for Best Actor',year:2002}],
    collaborators:['Spike Lee','Tony Scott'], contemporaries:[], friends:[], foes:[], bio:'Two-time Oscar winner and one of the defining actors of his generation.' },

  { id:'viola-davis', name:'Viola Davis', middleName:'', homophones:[], similarSpellings:['Violla','Violah','Violetta'], gender:'female', birthYear:1965, birthMonth:8, birthDay:11, birthPlace:'St. Matthews, South Carolina', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2017}],
    collaborators:['Denzel Washington','Steve McQueen'], contemporaries:[], friends:[], foes:[], bio:'Only Black actor to achieve the Triple Crown of Acting.' },

  // =====================================================================
  //  Music — Hip-Hop (preserved, men)
  // =====================================================================
  { id:'kanye-west', name:'Kanye West', middleName:'Omari', homophones:[], similarSpellings:['Kanyay','Kanay','Konye'], gender:'male', birthYear:1977, birthMonth:6, birthDay:8, birthPlace:'Atlanta, Georgia', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[{name:'Grammy Award',year:2005}],
    collaborators:['Jay-Z','Kid Cudi'], contemporaries:[], friends:[], foes:[], bio:"Rapper, producer, and Yeezy designer; one of the most-Grammy-decorated rappers of all time." },

  { id:'chance-the-rapper', name:'Chance the Rapper', middleName:'', homophones:[], similarSpellings:['Chanse','Chans','Chayse'], gender:'male', birthYear:1993, birthMonth:4, birthDay:16, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2017}],
    collaborators:['Kanye West','Childish Gambino'], contemporaries:[], friends:[], foes:[], bio:'Independent Chicago rapper; first streaming-only artist to win a Grammy.' },

  // ----- 5 stage names that contain a digit -----
  { id:'2pac', name:'2Pac', middleName:'Amaru', homophones:['Tupac'], similarSpellings:['Tupac','2-Pac','TuPac','Toopac'], gender:'male', birthYear:1971, birthMonth:6, birthDay:16, birthPlace:'East Harlem, New York', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[], collaborators:['Dr. Dre','Snoop Dogg'], contemporaries:[], friends:[], foes:[],
    bio:'Born Tupac Amaru Shakur to a Black Panther mother; defined the social conscience of 90s hip-hop before being murdered at 25.' },

  { id:'50-cent', name:'50 Cent', middleName:'James', homophones:['Fifty'], similarSpellings:['Fifty Cent','50¢','Fiddy Cent'], gender:'male', birthYear:1975, birthMonth:7, birthDay:6, birthPlace:'Queens, New York', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[], collaborators:['Eminem','Dr. Dre'], contemporaries:[], friends:[], foes:[],
    bio:'Curtis Jackson — survived nine gunshots and turned Get Rich or Die Tryin\' into a cultural earthquake; now a TV mogul behind the Power franchise.' },

  { id:'2-chainz', name:'2 Chainz', middleName:'Khari', homophones:['Tauheed'], similarSpellings:['2 Chains','Two Chainz','2Chainz','2-Chainz'], gender:'male', birthYear:1977, birthMonth:9, birthDay:12, birthPlace:'College Park, Georgia', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[], collaborators:['Lil Wayne','Kanye West'], contemporaries:[], friends:[], foes:[],
    bio:'Tauheed Epps — College Park rapper formerly known as Tity Boi; talk-show staple and a Grammy winner with Kanye on No More Parties in LA.' },

  { id:'deadmau5', name:'deadmau5', middleName:'Thomas', homophones:['deadmaus'], similarSpellings:['deadmaus','deadmouse','dead-mau5','dead mau5'], gender:'male', birthYear:1981, birthMonth:1, birthDay:5, birthPlace:'Niagara Falls, Canada', country:'Canada', field:'Music', subfield:'Electronic',
    teams:[], awards:[], collaborators:['Kaskade','Skrillex'], contemporaries:[], friends:[], foes:[],
    bio:'Joel Zimmerman — the mouse-helmeted Canadian producer behind Strobe and Ghosts \'n\' Stuff; pronounced "dead mouse."' },

  { id:'6lack', name:'6LACK', middleName:'Valdez', homophones:['Black','Blak'], similarSpellings:['Black','Blak','6Lack','SixLack'], gender:'male', birthYear:1992, birthMonth:6, birthDay:24, birthPlace:'Baltimore, Maryland', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:['Khalid','J. Cole'], contemporaries:[], friends:[], foes:[],
    bio:'Ricardo Valentine — Baltimore-born, Atlanta-raised R&B singer whose debut Free 6LACK quietly anchored the late-2010s alternative-R&B wave.' },

  // =====================================================================
  //  Science (preserved)
  // =====================================================================
  { id:'marie-curie', name:'Marie Curie', middleName:'Salomea', homophones:['Mari','Mary','Marey'], similarSpellings:['Mari','Mary','Marey','Maree'], gender:'female', birthYear:1867, birthMonth:11, birthDay:7, birthPlace:'Warsaw, Poland', country:'Poland', field:'Science', subfield:'Physics & Chemistry',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1903},{name:'Nobel Prize in Chemistry',year:1911}],
    collaborators:['Pierre Curie','Henri Becquerel'], contemporaries:[], friends:[], foes:[], bio:'First person to win Nobel Prizes in two different sciences.' },

  { id:'rosalind-franklin', name:'Rosalind Franklin', middleName:'Elsie', homophones:[], similarSpellings:['Rosalin','Rozalind','Rosalynd','Roslind'], gender:'female', birthYear:1920, birthMonth:7, birthDay:25, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Chemistry',
    teams:[], awards:[],
    collaborators:['Maurice Wilkins'], contemporaries:[], friends:[], foes:[], bio:'Chemist whose X-ray imaging was central to discovering the structure of DNA.' },

  { id:'katherine-johnson', name:'Katherine Johnson', middleName:'Coleman', homophones:['Catherine','Kathryn','Cathrine'], similarSpellings:['Catherine','Kathryn','Cathrine','Katharine'], gender:'female', birthYear:1918, birthMonth:8, birthDay:26, birthPlace:'White Sulphur Springs, West Virginia', country:'USA', field:'Science', subfield:'Mathematics',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2015}],
    collaborators:['Dorothy Vaughan','Mary Jackson'], contemporaries:[], friends:[], foes:[], bio:'NASA mathematician whose calculations were critical to early U.S. crewed spaceflight.' },

  { id:'ada-lovelace', name:'Ada Lovelace', middleName:'', homophones:['Aida','Ayda'], similarSpellings:['Aida','Ayda','Adah','Aada'], gender:'female', birthYear:1815, birthMonth:12, birthDay:10, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Computing',
    teams:[], awards:[], collaborators:['Charles Babbage'], contemporaries:[], friends:[], foes:[],
    bio:'Mathematician credited as the first computer programmer.' },

  { id:'grace-hopper', name:'Grace Hopper', middleName:'Brewster', homophones:[], similarSpellings:['Grayce','Grase','Graice'], gender:'female', birthYear:1906, birthMonth:12, birthDay:9, birthPlace:'New York, New York', country:'USA', field:'Science', subfield:'Computing',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Computer scientist and U.S. Navy rear admiral; pioneer of compilers.' },

  // ----- Pre-1950 physicists, women-forward -----
  { id:'hertha-ayrton', name:'Hertha Ayrton', middleName:'Phoebe Sarah', homophones:['Herta'], similarSpellings:['Hertha','Hertah','Herthah'], gender:'female', birthYear:1854, birthMonth:4, birthDay:28, birthPlace:'Portsea, England', country:'UK', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Hughes Medal',year:1906}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'English engineer and physicist; first woman to read a paper before the Royal Society and a pioneer of electric-arc theory.' },

  { id:'williamina-fleming', name:'Williamina Fleming', middleName:'Paton Stevens', homophones:['Wilhelmina'], similarSpellings:['Wilhelmina','Wiliamina','Willimena'], gender:'female', birthYear:1857, birthMonth:5, birthDay:15, birthPlace:'Dundee, Scotland', country:'UK', field:'Science', subfield:'Astronomer',
    teams:[], awards:[],
    collaborators:['Edward Charles Pickering'], contemporaries:[], friends:[], foes:[], bio:'Scottish-American Harvard "computer" who catalogued over 10,000 stars and discovered the Horsehead Nebula.' },

  { id:'henrietta-swan-leavitt', name:'Henrietta Swan Leavitt', middleName:'Swan', homophones:[], similarSpellings:['Henrieta','Henriettah','Henretta'], gender:'female', birthYear:1868, birthMonth:7, birthDay:4, birthPlace:'Lancaster, Massachusetts', country:'USA', field:'Science', subfield:'Astronomer',
    teams:[], awards:[],
    collaborators:['Edward Charles Pickering'], contemporaries:[], friends:[], foes:[], bio:'Harvard astronomer whose period–luminosity law for Cepheid variables let Hubble measure the size of the universe.' },

  { id:'mileva-maric', name:'Mileva Marić', middleName:'', homophones:['Milena'], similarSpellings:['Milena','Milevah','Mileva'], gender:'female', birthYear:1875, birthMonth:12, birthDay:19, birthPlace:'Titel, Austria-Hungary', country:'Serbia', field:'Science', subfield:'Physicist',
    teams:[], awards:[],
    collaborators:['Albert Einstein'], contemporaries:[], friends:[], foes:[], bio:'Serbian physicist and Einstein\'s first wife; the only woman in his ETH Zürich physics class and an uncredited collaborator on his early work.' },

  { id:'lise-meitner', name:'Lise Meitner', middleName:'', homophones:['Liesa','Lisa'], similarSpellings:['Liese','Liza','Liesah'], gender:'female', birthYear:1878, birthMonth:11, birthDay:7, birthPlace:'Vienna, Austria', country:'Austria', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Enrico Fermi Award',year:1966}],
    collaborators:['Otto Hahn'], contemporaries:[], friends:[], foes:[], bio:'Austrian-Swedish physicist who co-explained nuclear fission while in exile from Nazi Germany; element 109 is named meitnerium in her honor.' },

  { id:'emmy-noether', name:'Emmy Noether', middleName:'Amalie', homophones:['Emi','Emme'], similarSpellings:['Emmie','Emmi','Emy','Emey'], gender:'female', birthYear:1882, birthMonth:3, birthDay:23, birthPlace:'Erlangen, Germany', country:'Germany', field:'Science', subfield:'Mathematician',
    teams:[], awards:[],
    collaborators:['David Hilbert','Hermann Weyl','Albert Einstein'], contemporaries:[], friends:[], foes:[], bio:'German mathematician whose theorem linking symmetries to conservation laws is the bedrock of modern theoretical physics.' },

  { id:'inge-lehmann', name:'Inge Lehmann', middleName:'', homophones:['Inga'], similarSpellings:['Ingee','Ingie','Inghe'], gender:'female', birthYear:1888, birthMonth:5, birthDay:13, birthPlace:'Copenhagen, Denmark', country:'Denmark', field:'Science', subfield:'Geophysicist',
    teams:[], awards:[{name:'Bowie Medal',year:1971}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Danish seismologist who discovered that the Earth\'s inner core is solid by reading shadow zones in earthquake data.' },

  { id:'cv-raman', name:'C. V. Raman', middleName:'Venkata', homophones:[], similarSpellings:['Ramaan','Rahman','Raamen'], gender:'male', birthYear:1888, birthMonth:11, birthDay:7, birthPlace:'Tiruchirappalli, India', country:'India', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1930}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Indian Nobel laureate; the Raman effect explains how light scatters off molecules and underlies modern spectroscopy.' },

  { id:'marietta-blau', name:'Marietta Blau', middleName:'', homophones:[], similarSpellings:['Mariettah','Marrietta','Marieta'], gender:'female', birthYear:1894, birthMonth:4, birthDay:29, birthPlace:'Vienna, Austria', country:'Austria', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Schrödinger Prize',year:1962}],
    collaborators:['Hertha Wambacher'], contemporaries:[], friends:[], foes:[], bio:'Austrian physicist who invented photographic-emulsion particle detection — the technique that opened up cosmic-ray and accelerator physics.' },

  { id:'ida-noddack', name:'Ida Noddack', middleName:'Eva Tacke', homophones:['Aida','Ada'], similarSpellings:['Idah','Ydah','Ide'], gender:'female', birthYear:1896, birthMonth:2, birthDay:25, birthPlace:'Wesel, Germany', country:'Germany', field:'Science', subfield:'Physicist',
    teams:[], awards:[],
    collaborators:['Walter Noddack'], contemporaries:[], friends:[], foes:[], bio:'German chemist-physicist who co-discovered rhenium and was the first to propose nuclear fission — five years before it was demonstrated.' },

  { id:'wolfgang-pauli', name:'Wolfgang Pauli', middleName:'Ernst', homophones:[], similarSpellings:['Wolfgangg','Volfgang','Wulfgang'], gender:'male', birthYear:1900, birthMonth:4, birthDay:25, birthPlace:'Vienna, Austria', country:'Austria', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1945}],
    collaborators:['Niels Bohr','Werner Heisenberg'], contemporaries:[], friends:[], foes:[], bio:'Austrian theorist behind the exclusion principle that holds matter together; Nobel laureate at 45.' },

  { id:'cecilia-payne-gaposchkin', name:'Cecilia Payne-Gaposchkin', middleName:'Helena', homophones:['Cecelia'], similarSpellings:['Cecelia','Sicilia','Cecylia','Cicilia'], gender:'female', birthYear:1900, birthMonth:5, birthDay:10, birthPlace:'Wendover, England', country:'USA', field:'Science', subfield:'Astronomer',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'British-American Harvard astronomer whose 1925 PhD thesis proved that stars are mostly hydrogen and helium.' },

  { id:'enrico-fermi', name:'Enrico Fermi', middleName:'', homophones:[], similarSpellings:['Enriko','Enriqo','Henrico'], gender:'male', birthYear:1901, birthMonth:9, birthDay:29, birthPlace:'Rome, Italy', country:'Italy', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1938}],
    collaborators:['Leo Szilard','J. Robert Oppenheimer'], contemporaries:[], friends:[], foes:[], bio:'Italian-American who built the first nuclear reactor under a University of Chicago squash court.' },

  { id:'paul-dirac', name:'Paul Dirac', middleName:'Adrien Maurice', homophones:[], similarSpellings:['Pauul','Paule','Paull'], gender:'male', birthYear:1902, birthMonth:8, birthDay:8, birthPlace:'Bristol, England', country:'UK', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1933}],
    collaborators:['Werner Heisenberg','Erwin Schrödinger'], contemporaries:[], friends:[], foes:[], bio:'English founder of quantum electrodynamics; his equation predicted antimatter four years before the positron was found.' },

  { id:'maria-goeppert-mayer', name:'Maria Goeppert Mayer', middleName:'Gertrude', homophones:['Mariah','Marya'], similarSpellings:['Mariah','Maryah','Marija','Marie'], gender:'female', birthYear:1906, birthMonth:6, birthDay:28, birthPlace:'Katowice, Germany', country:'USA', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1963}],
    collaborators:['J. Hans D. Jensen'], contemporaries:[], friends:[], foes:[], bio:'Second woman ever to win the Nobel in Physics; built the shell model that explains why some atomic nuclei are magically stable.' },

  { id:'hideki-yukawa', name:'Hideki Yukawa', middleName:'', homophones:[], similarSpellings:['Hidaki','Hidekii','Hidekyi'], gender:'male', birthYear:1907, birthMonth:1, birthDay:23, birthPlace:'Tokyo, Japan', country:'Japan', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1949}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First Japanese Nobel laureate; predicted the pion meson and the short-range nuclear force that binds the atomic nucleus.' },

  { id:'marguerite-perey', name:'Marguerite Perey', middleName:'Catherine', homophones:['Margaret'], similarSpellings:['Margarete','Margerite','Margherita','Margaurite'], gender:'female', birthYear:1909, birthMonth:10, birthDay:19, birthPlace:'Villemomble, France', country:'France', field:'Science', subfield:'Physicist',
    teams:[], awards:[],
    collaborators:['Marie Curie'], contemporaries:[], friends:[], foes:[], bio:'French nuclear chemist; discovered francium in 1939 and became the first woman elected to the French Academy of Sciences.' },

  { id:'chandrasekhar', name:'Subrahmanyan Chandrasekhar', middleName:'', homophones:[], similarSpellings:['Subramanyan','Subrahmanian','Chandrashekar'], gender:'male', birthYear:1910, birthMonth:10, birthDay:19, birthPlace:'Lahore, British India', country:'USA', field:'Science', subfield:'Astrophysicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1983}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Indian-American astrophysicist whose mass limit for white dwarfs reshaped stellar evolution; NASA\'s X-ray observatory is named after him.' },

  { id:'chien-shiung-wu', name:'Chien-Shiung Wu', middleName:'', homophones:[], similarSpellings:['Chien Shiung','Chien-Shung','Chien Shung'], gender:'female', birthYear:1912, birthMonth:5, birthDay:31, birthPlace:'Liuhe, China', country:'USA', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Wolf Prize in Physics',year:1978}],
    collaborators:['Tsung-Dao Lee','Chen-Ning Yang'], contemporaries:[], friends:[], foes:[], bio:'First Lady of Physics; her cobalt-60 experiment proved that nature distinguishes left from right, demolishing parity conservation.' },

  { id:'sameera-moussa', name:'Sameera Moussa', middleName:'', homophones:['Samira'], similarSpellings:['Samira','Samirah','Sameerah','Samera'], gender:'female', birthYear:1917, birthMonth:3, birthDay:3, birthPlace:'Senbo, Egypt', country:'Egypt', field:'Science', subfield:'Physicist',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Mother of Atomic Energy in the Arab world; the first Egyptian woman to earn a PhD in atomic radiation, killed at 35 in a still-unsolved car crash.' },

  { id:'feynman', name:'Richard Feynman', middleName:'Phillips', homophones:['Rickard'], similarSpellings:['Richardd','Rikard','Rishard','Rychard'], gender:'male', birthYear:1918, birthMonth:5, birthDay:11, birthPlace:'New York, New York', country:'USA', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1965}],
    collaborators:['Julian Schwinger','Sin-Itiro Tomonaga'], contemporaries:[], friends:[], foes:[], bio:'Queens-born showman of physics; Feynman diagrams reorganized quantum field theory and his Caltech lectures became the gold standard textbook.' },

  { id:'margaret-burbidge', name:'Margaret Burbidge', middleName:'Eleanor Peachey', homophones:['Margret'], similarSpellings:['Margret','Margarit','Margaritte','Margaretta'], gender:'female', birthYear:1919, birthMonth:8, birthDay:12, birthPlace:'Davenport, England', country:'UK', field:'Science', subfield:'Astrophysicist',
    teams:[], awards:[],
    collaborators:['Geoffrey Burbidge','Fred Hoyle','William Fowler'], contemporaries:[], friends:[], foes:[], bio:'British-American astrophysicist; the B²FH paper she co-wrote in 1957 explained how every element heavier than helium is forged inside stars.' },

  { id:'vera-rubin', name:'Vera Rubin', middleName:'Cooper', homophones:['Verah'], similarSpellings:['Verah','Veera','Wera','Vehra'], gender:'female', birthYear:1928, birthMonth:7, birthDay:23, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Science', subfield:'Astronomer',
    teams:[], awards:[{name:'National Medal of Science',year:1993}],
    collaborators:['Kent Ford'], contemporaries:[], friends:[], foes:[], bio:'American astronomer whose galaxy rotation curves are the strongest direct evidence for dark matter.' },

  { id:'jocelyn-bell-burnell', name:'Jocelyn Bell Burnell', middleName:'Susan', homophones:['Joselin','Joscelyn'], similarSpellings:['Joselin','Joscelyn','Jocelin','Jocelyne'], gender:'female', birthYear:1943, birthMonth:7, birthDay:15, birthPlace:'Lurgan, Northern Ireland', country:'UK', field:'Science', subfield:'Astrophysicist',
    teams:[], awards:[{name:'Special Breakthrough Prize',year:2018}],
    collaborators:['Antony Hewish'], contemporaries:[], friends:[], foes:[], bio:'Northern Irish astrophysicist who discovered pulsars at 24; her supervisor took the Nobel, she donated her Breakthrough Prize to fund underrepresented physicists.' },

  // =====================================================================
  //  Literature (preserved)
  // =====================================================================
  { id:'toni-morrison', name:'Toni Morrison', middleName:'', homophones:['Tony','Toney','Tonie'], similarSpellings:['Tony','Toney','Tonie','Tonee'], gender:'female', birthYear:1931, birthMonth:2, birthDay:18, birthPlace:'Lorain, Ohio', country:'USA', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Pulitzer Prize for Fiction',year:1988},{name:'Nobel Prize in Literature',year:1993}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First Black woman to win the Nobel Prize in Literature.' },

  { id:'james-baldwin', name:'James Baldwin', middleName:'Arthur', homophones:['Jaymes'], similarSpellings:['Jaymes','Jamie','Jamz','Jameson'], gender:'male', birthYear:1924, birthMonth:8, birthDay:2, birthPlace:'Harlem, New York', country:'USA', field:'Literature', subfield:'Essayist',
    teams:[], awards:[],
    collaborators:['Nina Simone','Lorraine Hansberry'], contemporaries:[], friends:[], foes:[], bio:"Essayist, novelist, and civil rights orator behind The Fire Next Time and Giovanni's Room." },

  // =====================================================================
  //  Politics / Activism (preserved)
  // =====================================================================
  { id:'barack-obama', name:'Barack Obama', middleName:'Hussein', homophones:[], similarSpellings:['Barak','Barrack','Baraq','Barack'], gender:'male', birthYear:1961, birthMonth:8, birthDay:4, birthPlace:'Honolulu, Hawaii', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2009}],
    collaborators:['Joe Biden','Michelle Obama'], contemporaries:['Hillary Clinton','John McCain','Mitt Romney'], friends:['Joe Biden','Michelle Obama','George W. Bush'], foes:['Mitch McConnell','Donald Trump'],
    bio:"44th President of the United States and the first Black person to hold the office; awarded the Nobel Peace Prize in 2009." },

  { id:'michelle-obama', name:'Michelle Obama', middleName:'LaVaughn', homophones:['Michele','Mishelle'], similarSpellings:['Michele','Mishelle','Mychelle','Michell'], gender:'female', birthYear:1964, birthMonth:1, birthDay:17, birthPlace:'Chicago, Illinois', country:'USA', field:'Politics', subfield:'First Lady',
    teams:[], awards:[{name:'Grammy Award for Best Spoken Word Album',year:2020}],
    collaborators:['Barack Obama'], contemporaries:[], friends:[], foes:[], bio:"Lawyer, author, and former First Lady; raised on Chicago's South Side." },

  { id:'ruth-bader-ginsburg', name:'Ruth Bader Ginsburg', middleName:'Joan', homophones:[], similarSpellings:['Ruthe','Rute','Ruthie'], gender:'female', birthYear:1933, birthMonth:3, birthDay:15, birthPlace:'Brooklyn, New York', country:'USA', field:'Politics', subfield:'Supreme Court Justice',
    teams:[], awards:[],
    collaborators:["Sandra Day O'Connor"], contemporaries:[], friends:[], foes:[], bio:'Associate Justice and architect of modern gender-equality jurisprudence.' },

  // =====================================================================
  //  Soccer (preserved)
  // =====================================================================
  { id:'mia-hamm', name:'Mia Hamm', middleName:'Margaret', homophones:['Mya','Miah'], similarSpellings:['Mya','Miah','Mea','Miya'], gender:'female', birthYear:1972, birthMonth:3, birthDay:17, birthPlace:'Selma, Alabama', country:'USA', field:'Sports', subfield:'Soccer',
    teams:[{name:"United States Women's National Team",years:[1987,2004]}],
    awards:[{name:'FIFA World Cup Champion',year:1999}],
    collaborators:['Brandi Chastain','Julie Foudy'], contemporaries:[], friends:[], foes:[], bio:"Two-time World Cup champion and pioneer of U.S. women's soccer." },

  { id:'megan-rapinoe', name:'Megan Rapinoe', middleName:'Anna', homophones:['Meghan','Maegan','Meagan'], similarSpellings:['Meghan','Maegan','Meagan','Megen'], gender:'female', birthYear:1985, birthMonth:7, birthDay:5, birthPlace:'Redding, California', country:'USA', field:'Sports', subfield:'Soccer',
    teams:[{name:"United States Women's National Team",years:[2006,2023]}],
    awards:[{name:'FIFA World Cup Champion',year:2019}],
    collaborators:['Alex Morgan','Carli Lloyd'], contemporaries:[], friends:[], foes:[], bio:"Two-time World Cup winner, Olympic gold medalist, and equal-pay activist." },

  // =====================================================================
  //  VISUAL ARTS — global, era-diverse
  // =====================================================================
  { id:'leonardo-da-vinci', name:'Leonardo da Vinci', middleName:'', homophones:[], similarSpellings:['Leonardoh','Lionardo','Leonard'], gender:'male', birthYear:1452, birthMonth:4, birthDay:15, birthPlace:'Vinci, Italy', country:'Italy', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Andrea del Verrocchio'], contemporaries:['Michelangelo','Raphael','Sandro Botticelli'], friends:['Lorenzo de\' Medici'], foes:['Michelangelo'], bio:'Painter, anatomist, engineer — the archetypal Renaissance polymath.' },
  { id:'michelangelo', name:'Michelangelo', middleName:'', homophones:[], similarSpellings:['Michaelangelo','Michelangello','Michellangelo'], gender:'male', birthYear:1475, birthMonth:3, birthDay:6, birthPlace:'Caprese, Italy', country:'Italy', field:'Visual Arts', subfield:'Sculptor',
    teams:[], awards:[], collaborators:['Pope Julius II'], contemporaries:['Leonardo da Vinci','Raphael','Donato Bramante'], friends:['Vittoria Colonna'], foes:['Leonardo da Vinci','Raphael'], bio:'Sculptor of David, painter of the Sistine ceiling.' },
  { id:'rembrandt', name:'Rembrandt van Rijn', middleName:'Harmenszoon', homophones:[], similarSpellings:['Rembrant','Rembrandtt','Rembrandte'], gender:'male', birthYear:1606, birthMonth:7, birthDay:15, birthPlace:'Leiden, Netherlands', country:'Netherlands', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Dutch master of light, shadow, and the unflinching self-portrait.' },
  { id:'hokusai', name:'Katsushika Hokusai', middleName:'', homophones:[], similarSpellings:['Hokusay','Hocusai'], gender:'male', birthYear:1760, birthMonth:10, birthDay:31, birthPlace:'Edo, Japan', country:'Japan', field:'Visual Arts', subfield:'Printmaker',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Ukiyo-e printmaker behind The Great Wave off Kanagawa.' },
  { id:'van-gogh', name:'Vincent van Gogh', middleName:'Willem', homophones:[], similarSpellings:['Vinsent','Vincente','Vinncent','Vincenzo'], gender:'male', birthYear:1853, birthMonth:3, birthDay:30, birthPlace:'Zundert, Netherlands', country:'Netherlands', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Paul Gauguin'], contemporaries:[], friends:[], foes:[], bio:'Sold one painting in his lifetime; reshaped modern painting after his death.' },
  { id:'frida-kahlo', name:'Frida Kahlo', middleName:'', homophones:[], similarSpellings:['Freda','Frieda','Fryda','Fridah'], gender:'female', birthYear:1907, birthMonth:7, birthDay:6, birthPlace:'Coyoacán, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Diego Rivera'], contemporaries:['Diego Rivera','David Alfaro Siqueiros','José Clemente Orozco'], friends:['Diego Rivera','André Breton'], foes:[], bio:'Mexican painter of pain, identity, and unflinching self-portraiture.' },
  { id:'picasso', name:'Pablo Picasso', middleName:'Ruiz', homophones:[], similarSpellings:['Pablo','Pablito','Paolo'], gender:'male', birthYear:1881, birthMonth:10, birthDay:25, birthPlace:'Málaga, Spain', country:'Spain', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Georges Braque'], contemporaries:[], friends:[], foes:[], bio:'Co-founder of Cubism; reshaped twentieth-century art.' },
  { id:'okeeffe', name:"Georgia O'Keeffe", middleName:'Totto', homophones:[], similarSpellings:['Georgea','Jorja','Georgina','Georgiana'], gender:'female', birthYear:1887, birthPlace:'Sun Prairie, Wisconsin', country:'USA', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1977}], collaborators:['Alfred Stieglitz'], contemporaries:[], friends:[], foes:[], bio:'Mother of American modernism; flowers, bones, and the desert at scale.' },
  { id:'kusama', name:'Yayoi Kusama', middleName:'', homophones:[], similarSpellings:['Yayoy','Yaiyoi','Yayoie'], gender:'female', birthYear:1929, birthMonth:3, birthDay:22, birthPlace:'Matsumoto, Japan', country:'Japan', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[{name:'Praemium Imperiale',year:2006}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Polka dots and infinity rooms — the most-attended contemporary artist on earth.' },
  { id:'basquiat', name:'Jean-Michel Basquiat', middleName:'', homophones:[], similarSpellings:['Jean Michel','Jean','Jhon','Jon'], gender:'male', birthYear:1960, birthMonth:12, birthDay:22, birthPlace:'Brooklyn, New York', country:'USA', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Andy Warhol'], contemporaries:[], friends:[], foes:[], bio:'Brooklyn-born neo-expressionist who broke the gallery world by 22.' },
  { id:'ai-weiwei', name:'Ai Weiwei', middleName:'', homophones:[], similarSpellings:['Aii','Ay','Ae'], gender:'male', birthYear:1957, birthMonth:8, birthDay:28, birthPlace:'Beijing, China', country:'China', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Conceptual artist and dissident; sunflower seeds, smashed urns, and a state on edge.' },
  { id:'abramovic', name:'Marina Abramović', middleName:'', homophones:[], similarSpellings:['Marinah','Maryna','Maryna'], gender:'female', birthYear:1946, birthMonth:11, birthDay:30, birthPlace:'Belgrade, Serbia', country:'Serbia', field:'Visual Arts', subfield:'Performance Artist',
    teams:[], awards:[], collaborators:['Ulay'], contemporaries:[], friends:[], foes:[], bio:'Pioneer of performance art; sat silent across from strangers for 736 hours.' },

  // ----- 10 artists from Latin America -----
  { id:'orozco-jose', name:'José Clemente Orozco', middleName:'Clemente', homophones:['Jose'], similarSpellings:['Jose','Josè','Jozé','Joze'], gender:'male', birthYear:1883, birthMonth:11, birthDay:23, birthPlace:'Ciudad Guzmán, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Muralist',
    teams:[], awards:[], collaborators:['Diego Rivera','David Alfaro Siqueiros'], contemporaries:[], friends:[], foes:[],
    bio:'One of Los Tres Grandes of Mexican muralism; political frescoes from Guadalajara to Dartmouth.' },

  { id:'tarsila-do-amaral', name:'Tarsila do Amaral', middleName:'de Aguiar', homophones:[], similarSpellings:['Tarcila','Tarsilla','Tarcilla'], gender:'female', birthYear:1886, birthMonth:9, birthDay:1, birthPlace:'Capivari, Brazil', country:'Brazil', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Oswald de Andrade'], contemporaries:[], friends:[], foes:[],
    bio:'Matriarch of Brazilian modernism; her 1928 canvas Abaporu set off the Antropofagia movement.' },

  { id:'siqueiros', name:'David Alfaro Siqueiros', middleName:'Alfaro', homophones:[], similarSpellings:['Davyd','Davide','Dawid','Daved'], gender:'male', birthYear:1896, birthMonth:12, birthDay:29, birthPlace:'Camargo, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Muralist',
    teams:[], awards:[], collaborators:['Diego Rivera','José Clemente Orozco'], contemporaries:[], friends:[], foes:[],
    bio:'Third of Los Tres Grandes; revolutionary muralist who briefly held the young Jackson Pollock as a studio assistant.' },

  { id:'wifredo-lam', name:'Wifredo Lam', middleName:'', homophones:['Wilfredo','Wilfred'], similarSpellings:['Wilfredo','Wilfred','Wifred','Wifreddo'], gender:'male', birthYear:1902, birthMonth:12, birthDay:8, birthPlace:'Sagua La Grande, Cuba', country:'Cuba', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Pablo Picasso','André Breton'], contemporaries:[], friends:[], foes:[],
    bio:'Afro-Chinese-Cuban surrealist who fused Caribbean Santería iconography with European modernism.' },

  { id:'roberto-matta', name:'Roberto Matta', middleName:'Sebastián', homophones:[], similarSpellings:['Roberto','Robertto','Roberte','Ruberto'], gender:'male', birthYear:1911, birthMonth:11, birthDay:11, birthPlace:'Santiago, Chile', country:'Chile', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['André Breton','Marcel Duchamp'], contemporaries:[], friends:[], foes:[],
    bio:'Chilean surrealist whose cosmic "inscapes" bridged European Surrealism and American Abstract Expressionism.' },

  { id:'lygia-clark', name:'Lygia Clark', middleName:'Pimentel Lins', homophones:['Ligia'], similarSpellings:['Ligia','Lygiah','Lijia','Liigia'], gender:'female', birthYear:1920, birthMonth:10, birthDay:23, birthPlace:'Belo Horizonte, Brazil', country:'Brazil', field:'Visual Arts', subfield:'Sculptor',
    teams:[], awards:[], collaborators:['Hélio Oiticica'], contemporaries:[], friends:[], foes:[],
    bio:'Founder of the Brazilian Neo-Concrete movement; her hinged metal Bichos were sculptures meant to be handled.' },

  { id:'fernando-botero', name:'Fernando Botero', middleName:'Angulo', homophones:[], similarSpellings:['Fernanddo','Ferdinand','Fernandoh'], gender:'male', birthYear:1932, birthMonth:4, birthDay:19, birthPlace:'Medellín, Colombia', country:'Colombia', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Colombian master of voluminous figures — the Boterismo style — equally at home in paint and bronze.' },

  { id:'helio-oiticica', name:'Hélio Oiticica', middleName:'', homophones:['Helio'], similarSpellings:['Helio','Heelio','Hèlio','Heliyo'], gender:'male', birthYear:1937, birthMonth:7, birthDay:26, birthPlace:'Rio de Janeiro, Brazil', country:'Brazil', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[], collaborators:['Lygia Clark','Caetano Veloso'], contemporaries:[], friends:[], foes:[],
    bio:'Carioca pioneer of immersive installation; his Parangolés were wearable paintings danced through favela samba schools.' },

  { id:'doris-salcedo', name:'Doris Salcedo', middleName:'', homophones:[], similarSpellings:['Dorris','Doryss','Doriss','Dorisse'], gender:'female', birthYear:1958, birthPlace:'Bogotá, Colombia', country:'Colombia', field:'Visual Arts', subfield:'Sculptor',
    teams:[], awards:[{name:'Hiroshima Art Prize',year:2014}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Colombian sculptor of political grief; opened a 548-foot crack across Tate Modern\'s floor in 2007\'s Shibboleth.' },

  { id:'gabriel-orozco', name:'Gabriel Orozco', middleName:'', homophones:[], similarSpellings:['Gabriell','Gabriele','Gavriel','Gabryel'], gender:'male', birthYear:1962, birthMonth:4, birthDay:27, birthPlace:'Jalapa, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Mexican conceptualist; turned a Citroën DS into the sliced sculpture La DS by removing its middle third.' },

  // =====================================================================
  //  TECH / INVENTORS — global
  // =====================================================================
  { id:'turing', name:'Alan Turing', middleName:'Mathison', homophones:['Allan','Allen','Alen'], similarSpellings:['Allan','Allen','Alen','Alun'], gender:'male', birthYear:1912, birthMonth:6, birthDay:23, birthPlace:'London, England', country:'UK', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[], collaborators:[], contemporaries:['John von Neumann','Claude Shannon','Alonzo Church'], friends:['Alonzo Church','Christopher Morcom'], foes:[],
    bio:'Father of computer science; broke Enigma; defined the limits of computation.' },
  { id:'hedy-lamarr', name:'Hedy Lamarr', middleName:'', homophones:['Heddy','Heidi'], similarSpellings:['Heddy','Heidi','Hedi','Hedie'], gender:'female', birthYear:1914, birthMonth:11, birthDay:9, birthPlace:'Vienna, Austria', country:'Austria', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['George Antheil'], contemporaries:[], friends:[], foes:[], bio:'Hollywood star and co-inventor of the frequency-hopping radio signal that underlies Wi-Fi.' },
  { id:'tbl', name:'Tim Berners-Lee', middleName:'John', homophones:[], similarSpellings:['Timothy','Tym','Timo','Timmy'], gender:'male', birthYear:1955, birthMonth:6, birthDay:8, birthPlace:'London, England', country:'UK', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[{name:'Turing Award',year:2016}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:"Invented the World Wide Web at CERN in 1989." },
  { id:'torvalds', name:'Linus Torvalds', middleName:'Benedict', homophones:[], similarSpellings:['Lynus','Linnus','Linis'], gender:'male', birthYear:1969, birthMonth:12, birthDay:28, birthPlace:'Helsinki, Finland', country:'Finland', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[{name:'Millennium Technology Prize',year:2012}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Created Linux and Git — the kernel and the version control behind much of the internet.' },
  { id:'margaret-hamilton', name:'Margaret Hamilton', middleName:'Heafield', homophones:[], similarSpellings:['Margret','Margarit','Margerite','Margaretta'], gender:'female', birthYear:1936, birthMonth:8, birthDay:17, birthPlace:'Paoli, Indiana', country:'USA', field:'Tech', subfield:'Software Engineering',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Led the Apollo on-board flight software team; coined the term "software engineering."' },
  { id:'tesla', name:'Nikola Tesla', middleName:'', homophones:[], similarSpellings:['Nikolai','Nicola','Nikolas','Nicolas'], gender:'male', birthYear:1856, birthMonth:7, birthDay:10, birthPlace:'Smiljan, Croatia', country:'Croatia', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['George Westinghouse'], contemporaries:[], friends:[], foes:[], bio:'Pioneer of alternating current and modern electrical engineering.' },
  { id:'agbell', name:'Alexander Graham Bell', middleName:'Graham', homophones:['Alexandr','Alexsander'], similarSpellings:['Alexandr','Alexsander','Alexandar','Alixander'], gender:'male', birthYear:1847, birthMonth:3, birthDay:3, birthPlace:'Edinburgh, Scotland', country:'UK', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['Thomas Watson'], contemporaries:[], friends:[], foes:[],
    bio:'Patented the telephone in 1876; founded what became AT&T.' },
  { id:'reshma-saujani', name:'Reshma Saujani', middleName:'', homophones:[], similarSpellings:['Reshmah','Reshama','Reshmaa'], gender:'female', birthYear:1975, birthMonth:11, birthDay:18, birthPlace:'Schaumburg, Illinois', country:'USA', field:'Tech', subfield:'Activist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Founded Girls Who Code; advocate for women in technology.' },
  { id:'sundar', name:'Sundar Pichai', middleName:'', homophones:[], similarSpellings:['Sunder','Sundara','Sundarah'], gender:'male', birthYear:1972, birthMonth:7, birthDay:10, birthPlace:'Madurai, India', country:'India', field:'Tech', subfield:'Executive',
    teams:[], awards:[], collaborators:['Larry Page','Sergey Brin'], contemporaries:[], friends:[], foes:[], bio:'CEO of Google and Alphabet; led the rise of Chrome and Android.' },

  // =====================================================================
  //  ACTIVISTS — global
  // =====================================================================
  { id:'gandhi', name:'Mahatma Gandhi', middleName:'Karamchand', homophones:[], similarSpellings:['Mohandas','Mahatmah','Mahatma'], gender:'male', birthYear:1869, birthMonth:10, birthDay:2, birthPlace:'Porbandar, India', country:'India', field:'Activism', subfield:'Civil Rights',
    teams:[], awards:[], collaborators:['Jawaharlal Nehru'], contemporaries:[], friends:[], foes:[], bio:'Leader of Indian independence; doctrine of nonviolent civil disobedience.' },
  { id:'mandela', name:'Nelson Mandela', middleName:'Rolihlahla', homophones:[], similarSpellings:['Nelsen','Nelsun','Nelsan','Nilson'], gender:'male', birthYear:1918, birthMonth:7, birthDay:18, birthPlace:'Mvezo, South Africa', country:'South Africa', field:'Activism', subfield:'Anti-Apartheid',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1993}], collaborators:['Desmond Tutu'], contemporaries:[], friends:[], foes:[], bio:'Spent 27 years imprisoned; emerged to dismantle apartheid as president.' },
  { id:'wangari', name:'Wangari Maathai', middleName:'Muta', homophones:[], similarSpellings:['Wangaari','Wanjeri'], gender:'female', birthYear:1940, birthMonth:4, birthDay:1, birthPlace:'Ihithe, Kenya', country:'Kenya', field:'Activism', subfield:'Environmental',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2004}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Founded the Green Belt Movement; first African woman to win the Nobel Peace Prize.' },
  { id:'greta', name:'Greta Thunberg', middleName:'Tintin', homophones:[], similarSpellings:['Gretta','Gretah','Greata'], gender:'female', birthYear:2003, birthMonth:1, birthDay:3, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Activism', subfield:'Environmental',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Sat outside parliament with a sign at fifteen; sparked a global climate strike movement.' },
  { id:'malala', name:'Malala Yousafzai', middleName:'', homophones:[], similarSpellings:['Malalla','Mallalah','Malayla'], gender:'female', birthYear:1997, birthMonth:7, birthDay:12, birthPlace:'Mingora, Pakistan', country:'Pakistan', field:'Activism', subfield:'Education',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2014}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Survived a Taliban assassination attempt; youngest-ever Nobel laureate.' },
  { id:'tubman', name:'Harriet Tubman', middleName:'', homophones:[], similarSpellings:['Harriette','Harriet','Hariet','Harriott'], gender:'female', birthYear:1822, birthPlace:'Dorchester County, Maryland', country:'USA', field:'Activism', subfield:'Abolition',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Escaped slavery, returned thirteen times to lead some seventy others north on the Underground Railroad.' },
  { id:'cesar-chavez', name:'Cesar Chavez', middleName:'Estrada', homophones:['Caesar','Sezar'], similarSpellings:['Caesar','Sezar','Cesare','Cesaro'], gender:'male', birthYear:1927, birthMonth:3, birthDay:31, birthPlace:'Yuma, Arizona', country:'USA', field:'Activism', subfield:'Labor',
    teams:[], awards:[], collaborators:['Dolores Huerta'], contemporaries:[], friends:[], foes:[], bio:'Co-founded the United Farm Workers; led the grape boycott.' },
  { id:'dolores-huerta', name:'Dolores Huerta', middleName:'Clara', homophones:[], similarSpellings:['Doloras','Delores','Dolorez','Doloris'], gender:'female', birthYear:1930, birthMonth:4, birthDay:10, birthPlace:'Dawson, New Mexico', country:'USA', field:'Activism', subfield:'Labor',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2012}], collaborators:['Cesar Chavez'], contemporaries:[], friends:[], foes:[], bio:'Co-founded the United Farm Workers; coined "Sí, se puede."' },
  { id:'berta', name:'Berta Cáceres', middleName:'Isabel', homophones:[], similarSpellings:['Bertah','Berthah','Bertta'], gender:'female', birthYear:1971, birthPlace:'La Esperanza, Honduras', country:'Honduras', field:'Activism', subfield:'Indigenous Rights',
    teams:[], awards:[{name:'Goldman Environmental Prize',year:2015}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Lenca leader who organized against the Agua Zarca dam; assassinated in 2016.' },
  { id:'aung-san', name:'Aung San Suu Kyi', middleName:'', homophones:[], similarSpellings:['Ong','Aong'], gender:'female', birthYear:1945, birthMonth:6, birthDay:19, birthPlace:'Yangon, Myanmar', country:'Myanmar', field:'Activism', subfield:'Pro-Democracy',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1991}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Spent roughly fifteen years under house arrest leading Myanmar's democracy movement; later detained again after a 2021 military coup." },

  // =====================================================================
  //  ARCHITECTURE — global
  // =====================================================================
  { id:'gaudi', name:'Antoni Gaudí', middleName:'', homophones:[], similarSpellings:['Antony','Antoni','Antonio','Anton'], gender:'male', birthYear:1852, birthMonth:6, birthDay:25, birthPlace:'Reus, Spain', country:'Spain', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Catalan modernist behind Sagrada Família and Park Güell.' },
  { id:'frank-lloyd-wright', name:'Frank Lloyd Wright', middleName:'Lloyd', homophones:[], similarSpellings:['Franc','Franck','Frankk','Franky'], gender:'male', birthYear:1867, birthMonth:6, birthDay:8, birthPlace:'Richland Center, Wisconsin', country:'USA', field:'Architecture', subfield:'Organic',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Father of organic architecture; Fallingwater, the Guggenheim, the prairie style.' },
  { id:'le-corbusier', name:'Le Corbusier', middleName:'', homophones:[], similarSpellings:['Lecorbusier'], gender:'male', birthYear:1887, birthMonth:10, birthDay:6, birthPlace:'La Chaux-de-Fonds, Switzerland', country:'Switzerland', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Swiss-French modernist; "a house is a machine for living in."' },
  { id:'im-pei', name:'I. M. Pei', middleName:'Ming', homophones:[], similarSpellings:['Eye Em','I.M.'], gender:'male', birthYear:1917, birthMonth:4, birthDay:26, birthPlace:'Guangzhou, China', country:'China', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[{name:'Pritzker Prize',year:1983}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Designed the Louvre Pyramid and the Bank of China Tower.' },
  { id:'zaha-hadid', name:'Zaha Hadid', middleName:'Mohammad', homophones:[], similarSpellings:['Zahah','Zaaha'], gender:'female', birthYear:1950, birthMonth:10, birthDay:31, birthPlace:'Baghdad, Iraq', country:'Iraq', field:'Architecture', subfield:'Deconstructivist',
    teams:[], awards:[{name:'Pritzker Prize',year:2004}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First woman to win the Pritzker Prize; sweeping, futurist forms.' },
  { id:'tadao-ando', name:'Tadao Ando', middleName:'', homophones:[], similarSpellings:['Tadou','Tadaoh'], gender:'male', birthYear:1941, birthMonth:9, birthDay:13, birthPlace:'Osaka, Japan', country:'Japan', field:'Architecture', subfield:'Minimalist',
    teams:[], awards:[{name:'Pritzker Prize',year:1995}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Self-taught architect of austere, light-cut concrete.' },
  { id:'maya-lin', name:'Maya Lin', middleName:'Ying', homophones:['Maia','Mya'], similarSpellings:['Maia','Mya','Mayah','Maja'], gender:'female', birthYear:1959, birthMonth:10, birthDay:5, birthPlace:'Athens, Ohio', country:'USA', field:'Architecture', subfield:'Memorial',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Designed the Vietnam Veterans Memorial as an undergraduate at Yale.' },

  // =====================================================================
  //  CHEFS — global
  // =====================================================================
  { id:'julia-child', name:'Julia Child', middleName:'Carolyn', homophones:['Julya','Yulia'], similarSpellings:['Julya','Yulia','Julianna','Juliah'], gender:'female', birthYear:1912, birthMonth:8, birthDay:15, birthPlace:'Pasadena, California', country:'USA', field:'Culinary', subfield:'Television Chef',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Brought French cooking to American kitchens with Mastering the Art of French Cooking.' },
  { id:'bourdain', name:'Anthony Bourdain', middleName:'Michael', homophones:[], similarSpellings:['Antony','Antoni','Anton','Antonio'], gender:'male', birthYear:1956, birthMonth:6, birthDay:25, birthPlace:'New York, New York', country:'USA', field:'Culinary', subfield:'Television Chef',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Chef, writer, and storyteller who taught a generation to travel through dinner.' },
  { id:'ottolenghi', name:'Yotam Ottolenghi', middleName:'Assaf', homophones:[], similarSpellings:['Yoatam','Yotham'], gender:'male', birthYear:1968, birthMonth:12, birthDay:14, birthPlace:'Jerusalem, Israel', country:'Israel', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:['Sami Tamimi'], contemporaries:[], friends:[], foes:[], bio:'London-based chef whose books reshaped how the West cooks vegetables.' },
  { id:'massimo-bottura', name:'Massimo Bottura', middleName:'', homophones:[], similarSpellings:['Massymo','Massimmo','Massim'], gender:'male', birthYear:1962, birthMonth:9, birthDay:30, birthPlace:'Modena, Italy', country:'Italy', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Three-Michelin-star Italian; founder of Food for Soul.' },
  { id:'asma-khan', name:'Asma Khan', middleName:'', homophones:[], similarSpellings:['Asmah','Azma','Asama'], gender:'female', birthYear:1969, birthPlace:'Calcutta, India', country:'India', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Founder of London's Darjeeling Express; the first Briton on Chef's Table." },
  { id:'escoffier', name:'Auguste Escoffier', middleName:'Georges Auguste', homophones:[], similarSpellings:['Augustus','August','Augustin','Augusto'], gender:'male', birthYear:1846, birthMonth:10, birthDay:28, birthPlace:'Villeneuve-Loubet, France', country:'France', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Codified the brigade kitchen and modern French haute cuisine.' },

  // =====================================================================
  //  FASHION — global
  // =====================================================================
  { id:'coco-chanel', name:'Coco Chanel', middleName:'', homophones:['Koko'], similarSpellings:['Koko','Cocoa','Cocco'], gender:'female', birthYear:1883, birthMonth:8, birthDay:19, birthPlace:'Saumur, France', country:'France', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Liberated women from corsets; gave the world the little black dress and Chanel No. 5.' },
  { id:'ysl', name:'Yves Saint Laurent', middleName:'Henri Donat Mathieu', homophones:[], similarSpellings:['Yvves','Yveh','Yveas'], gender:'male', birthYear:1936, birthMonth:8, birthDay:1, birthPlace:'Oran, Algeria', country:'Algeria', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Pierre Bergé'], contemporaries:[], friends:[], foes:[], bio:'Algerian-born couturier; tuxedos for women, the Mondrian dress, ready-to-wear.' },
  { id:'westwood', name:'Vivienne Westwood', middleName:'Isabel', homophones:[], similarSpellings:['Vivian','Viviane','Viviana','Vyvyan'], gender:'female', birthYear:1941, birthMonth:4, birthDay:8, birthPlace:'Tintwistle, England', country:'UK', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Malcolm McLaren'], contemporaries:[], friends:[], foes:[], bio:'Punk\'s designer of record; tartan, corsets, and political fury.' },
  { id:'rei-kawakubo', name:'Rei Kawakubo', middleName:'', homophones:['Ray','Rae','Rey'], similarSpellings:['Ray','Rae','Rey','Reigh'], gender:'female', birthYear:1942, birthMonth:10, birthDay:11, birthPlace:'Tokyo, Japan', country:'Japan', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Founder of Comme des Garçons; deconstruction as wardrobe.' },
  { id:'iris-apfel', name:'Iris Apfel', middleName:'Barrel', homophones:[], similarSpellings:['Irys','Eiris','Iriss','Irice'], gender:'female', birthYear:1921, birthMonth:8, birthDay:29, birthPlace:'Astoria, New York', country:'USA', field:'Fashion', subfield:'Stylist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Style icon who became a model in her late eighties.' },
  { id:'mcqueen', name:'Alexander McQueen', middleName:'Lee', homophones:[], similarSpellings:['Alexandr','Alexandar','Alexsander','Alixander'], gender:'male', birthYear:1969, birthMonth:3, birthDay:17, birthPlace:'London, England', country:'UK', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Isabella Blow'], contemporaries:[], friends:[], foes:[],
    bio:'British couturier of dark theatricality; bumster trousers and the bird-feather show.' },

  // =====================================================================
  //  RELIGION — global
  // =====================================================================
  { id:'dalai-lama', name:'Tenzin Gyatso', middleName:'', homophones:[], similarSpellings:['Tensin','Tenzyn','Tenzen'], gender:'male', birthYear:1935, birthMonth:7, birthDay:6, birthPlace:'Taktser, Tibet', country:'Tibet', field:'Religion', subfield:'Buddhist',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1989}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'14th Dalai Lama; Tibetan spiritual leader in exile since 1959.' },
  { id:'desmond-tutu', name:'Desmond Tutu', middleName:'Mpilo', homophones:[], similarSpellings:['Desmund','Dezmond','Desmon','Dezmund'], gender:'male', birthYear:1931, birthMonth:10, birthDay:7, birthPlace:'Klerksdorp, South Africa', country:'South Africa', field:'Religion', subfield:'Anglican',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1984}], collaborators:['Nelson Mandela'], contemporaries:[], friends:[], foes:[], bio:'Anglican archbishop; chaired South Africa\'s Truth and Reconciliation Commission.' },
  { id:'mother-teresa', name:'Mother Teresa', middleName:'', homophones:[], similarSpellings:['Theresa','Tereza','Therese','Teresia'], gender:'female', birthYear:1910, birthMonth:8, birthDay:26, birthPlace:'Skopje, North Macedonia', country:'North Macedonia', field:'Religion', subfield:'Catholic',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1979}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Founded the Missionaries of Charity in Calcutta; canonized in 2016.' },
  { id:'pope-francis', name:'Pope Francis', middleName:'', homophones:[], similarSpellings:['Frances','Fransis','Franciss'], gender:'male', birthYear:1936, birthMonth:12, birthDay:17, birthPlace:'Buenos Aires, Argentina', country:'Argentina', field:'Religion', subfield:'Catholic',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First Latin American pope; took the name of Francis of Assisi.' },
  { id:'hildegard', name:'Hildegard von Bingen', middleName:'', homophones:[], similarSpellings:['Hildegarde','Hildagard','Hildegaard'], gender:'female', birthYear:1098, birthPlace:'Bermersheim, Germany', country:'Germany', field:'Religion', subfield:'Catholic',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Medieval mystic, composer, and physician; Doctor of the Church.' },

  // =====================================================================
  //  PHILOSOPHY — global
  // =====================================================================
  { id:'simone-de-beauvoir', name:'Simone de Beauvoir', middleName:'Lucie-Ernestine-Marie-Bertrand', homophones:['Simon'], similarSpellings:['Simon','Symone','Simohne','Simonn'], gender:'female', birthYear:1908, birthMonth:1, birthDay:9, birthPlace:'Paris, France', country:'France', field:'Philosophy', subfield:'Existentialism',
    teams:[], awards:[], collaborators:['Jean-Paul Sartre'], contemporaries:[], friends:[], foes:[], bio:'The Second Sex laid the philosophical foundation of modern feminism.' },
  { id:'arendt', name:'Hannah Arendt', middleName:'', homophones:[], similarSpellings:['Hannnah','Hanah','Hannaa','Hannia'], gender:'female', birthYear:1906, birthMonth:10, birthDay:14, birthPlace:'Linden, Germany', country:'Germany', field:'Philosophy', subfield:'Political Theory',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Political theorist; coined "the banality of evil" in Eichmann in Jerusalem.' },
  { id:'kierkegaard', name:'Søren Kierkegaard', middleName:'Aabye', homophones:[], similarSpellings:['Soeren','Soren','Sjoeren'], gender:'male', birthYear:1813, birthMonth:5, birthDay:5, birthPlace:'Copenhagen, Denmark', country:'Denmark', field:'Philosophy', subfield:'Existentialism',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Danish progenitor of existentialism; the leap of faith.' },
  { id:'fanon', name:'Frantz Fanon', middleName:'Omar', homophones:[], similarSpellings:['Frants','Frantsz','Frantz','Franz'], gender:'male', birthYear:1925, birthMonth:7, birthDay:20, birthPlace:'Fort-de-France, Martinique', country:'Martinique', field:'Philosophy', subfield:'Postcolonial',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Psychiatrist whose Black Skin, White Masks reframed colonialism and race.' },
  { id:'marx', name:'Karl Marx', middleName:'Heinrich', homophones:['Carl','Karle'], similarSpellings:['Carl','Karle','Karol','Carle'], gender:'male', birthYear:1818, birthMonth:5, birthDay:5, birthPlace:'Trier, Germany', country:'Germany', field:'Philosophy', subfield:'Political Economy',
    teams:[], awards:[], collaborators:['Friedrich Engels'], contemporaries:[], friends:[], foes:[], bio:'Author of Das Kapital and The Communist Manifesto.' },

  // =====================================================================
  //  ROCK MUSIC — global
  // =====================================================================
  { id:'freddie-mercury', name:'Freddie Mercury', middleName:'Bulsara', homophones:['Freddy','Freddi'], similarSpellings:['Freddy','Freddi','Fredi','Fredie'], gender:'male', birthYear:1946, birthMonth:9, birthDay:5, birthPlace:'Stone Town, Zanzibar', country:'Zanzibar', field:'Music', subfield:'Rock',
    teams:[{name:'Queen',years:[1970,1991]}], awards:[], collaborators:['Brian May','Roger Taylor'], contemporaries:[], friends:[], foes:[], bio:'Queen\'s frontman; four-octave voice; born Farrokh Bulsara on Zanzibar.' },
  { id:'bowie', name:'David Bowie', middleName:'Robert', homophones:[], similarSpellings:['Davyd','Daved','Dawid','Davide'], gender:'male', birthYear:1947, birthMonth:1, birthDay:8, birthPlace:'Brixton, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2006}], collaborators:['Brian Eno','Iggy Pop'], contemporaries:[], friends:[], foes:[], bio:'Ziggy, the Thin White Duke, the Blackstar — pop music\'s shape-shifter.' },
  { id:'mick-jagger', name:'Mick Jagger', middleName:'Philip', homophones:['Mik','Myk'], similarSpellings:['Mik','Myk','Micky','Mickey'], gender:'male', birthYear:1943, birthMonth:7, birthDay:26, birthPlace:'Dartford, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[{name:'The Rolling Stones',years:[1962,2025]}], awards:[], collaborators:['Keith Richards'], contemporaries:['Paul McCartney','John Lennon','David Bowie','Eric Clapton'], friends:['Keith Richards','David Bowie'], foes:['The Beatles'], bio:'Stones frontman, still strutting six decades on.' },
  { id:'joan-jett', name:'Joan Jett', middleName:'', homophones:['Jone','Joane'], similarSpellings:['Jone','Joane','Joann','Joanne'], gender:'female', birthYear:1958, birthMonth:9, birthDay:22, birthPlace:'Wynnewood, Pennsylvania', country:'USA', field:'Music', subfield:'Rock',
    teams:[{name:'The Runaways',years:[1975,1979]},{name:'The Blackhearts',years:[1979,2025]}], awards:[], collaborators:['Lita Ford'], contemporaries:[], friends:[], foes:[], bio:'Riot-grrrl godmother; "I Love Rock \'n\' Roll" still rattles every dive bar.' },
  { id:'patti-smith', name:'Patti Smith', middleName:'Lee', homophones:['Patty','Pati','Patte'], similarSpellings:['Patty','Pati','Patte','Patti'], gender:'female', birthYear:1946, birthMonth:12, birthDay:30, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Rock',
    teams:[], awards:[{name:'National Book Award for Nonfiction',year:2010}], collaborators:['Robert Mapplethorpe'], contemporaries:[], friends:[], foes:[], bio:'Punk poet laureate; Horses opens with one of rock\'s great first lines.' },
  { id:'robert-plant', name:'Robert Plant', middleName:'Anthony', homophones:[], similarSpellings:['Roberto','Robart','Robbert','Rupert'], gender:'male', birthYear:1948, birthMonth:8, birthDay:20, birthPlace:'West Bromwich, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[{name:'Led Zeppelin',years:[1968,1980]}], awards:[], collaborators:['Jimmy Page'], contemporaries:[], friends:[], foes:[], bio:'Led Zeppelin\'s wail; folk explorer in his solo decades.' },
  // (Björk, Joni Mitchell already exist above under Music/Pop — skipped.)

  // =====================================================================
  //  COUNTRY
  // =====================================================================
  // (Dolly Parton already exists above; her subfield update from Pop → Country
  //  is handled by editing the original entry directly when ready.)
  { id:'johnny-cash', name:'Johnny Cash', middleName:'R.', homophones:['Johny','Jonny','Joni'], similarSpellings:['Johny','Jonny','Joni','Johnnie'], gender:'male', birthYear:1932, birthMonth:2, birthDay:26, birthPlace:'Kingsland, Arkansas', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:['June Carter Cash'], contemporaries:[], friends:[], foes:[], bio:'The Man in Black; recorded At Folsom Prison live to inmates in 1968.' },
  { id:'willie-nelson', name:'Willie Nelson', middleName:'Hugh', homophones:['Willy','Willi'], similarSpellings:['Willy','Willi','Willey','Willee'], gender:'male', birthYear:1933, birthMonth:4, birthDay:29, birthPlace:'Abbott, Texas', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:['Waylon Jennings'], contemporaries:[], friends:[], foes:[], bio:"Outlaw country pioneer; Red Headed Stranger and Farm Aid co-founder." },
  { id:'loretta-lynn', name:'Loretta Lynn', middleName:'Webb', homophones:[], similarSpellings:['Lorretta','Loreta','Lorettah','Loritta'], gender:'female', birthYear:1932, birthMonth:4, birthDay:14, birthPlace:'Butcher Hollow, Kentucky', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Coal Miner\'s Daughter; first woman to be Country Music Association Entertainer of the Year.' },
  { id:'hank-williams', name:'Hank Williams', middleName:'', homophones:[], similarSpellings:['Hanc','Hanck','Hanky','Henk'], gender:'male', birthYear:1923, birthMonth:9, birthDay:17, birthPlace:'Mount Olive, Alabama', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Honky-tonk patriarch; dead at 29 with the genre rewritten.' },

  // =====================================================================
  //  CLASSICAL
  // =====================================================================
  { id:'bach', name:'Johann Sebastian Bach', middleName:'Sebastian', homophones:[], similarSpellings:['Johan','Yohan','Jon','Jhon'], gender:'male', birthYear:1685, birthMonth:3, birthDay:31, birthPlace:'Eisenach, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Baroque composer of the Brandenburg Concertos and the Goldberg Variations.' },
  { id:'mozart', name:'Wolfgang Amadeus Mozart', middleName:'Amadeus', homophones:[], similarSpellings:['Wolfgan','Wolfgnag','Wolfgangg'], gender:'male', birthYear:1756, birthMonth:1, birthDay:27, birthPlace:'Salzburg, Austria', country:'Austria', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Composed his first symphony at eight; six hundred works by thirty-five.' },
  { id:'beethoven', name:'Ludwig van Beethoven', middleName:'', homophones:[], similarSpellings:['Ludwic','Ludvig','Ludvik','Ludwik'], gender:'male', birthYear:1770, birthMonth:12, birthDay:17, birthPlace:'Bonn, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Wrote the Ninth Symphony after he had gone deaf.' },
  { id:'yo-yo-ma', name:'Yo-Yo Ma', middleName:'', homophones:[], similarSpellings:['Yoyo','Yo Yo','Yoh-Yoh'], gender:'male', birthYear:1955, birthMonth:10, birthDay:7, birthPlace:'Paris, France', country:'France', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2011}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Cellist; eighteen Grammys; Bach Suites by candlelight.' },
  { id:'hilary-hahn', name:'Hilary Hahn', middleName:'', homophones:['Hillary','Hilarie'], similarSpellings:['Hillary','Hilarie','Hilery','Hilari'], gender:'female', birthYear:1979, birthMonth:11, birthDay:27, birthPlace:'Lexington, Virginia', country:'USA', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Grammy Award',year:2003}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Three-time Grammy-winning violinist with a fastidious tone.' },
  { id:'clara-schumann', name:'Clara Schumann', middleName:'Josephine', homophones:[], similarSpellings:['Clarah','Clarra','Klara','Clarissa'], gender:'female', birthYear:1819, birthMonth:9, birthDay:13, birthPlace:'Leipzig, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:['Robert Schumann','Johannes Brahms'], contemporaries:[], friends:[], foes:[], bio:'Foremost pianist of the Romantic era and composer in her own right.' },

  // =====================================================================
  //  JAZZ
  // =====================================================================
  { id:'miles-davis', name:'Miles Davis', middleName:'Dewey', homophones:[], similarSpellings:['Myles','Mylles','Milles'], gender:'male', birthYear:1926, birthMonth:5, birthDay:26, birthPlace:'Alton, Illinois', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['John Coltrane','Herbie Hancock'], contemporaries:[], friends:[], foes:[], bio:'Reinvented jazz five times — bebop, cool, modal, fusion, electric.' },
  { id:'coltrane', name:'John Coltrane', middleName:'William', homophones:['Jon','Jhon'], similarSpellings:['Jon','Johnn','Jhon','Johan'], gender:'male', birthYear:1926, birthMonth:9, birthDay:23, birthPlace:'Hamlet, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Miles Davis','McCoy Tyner'], contemporaries:[], friends:[], foes:[], bio:'A Love Supreme remains jazz\'s most spiritual statement.' },
  { id:'charlie-parker', name:'Charlie Parker', middleName:'', homophones:['Charley','Charly'], similarSpellings:['Charley','Charly','Charli','Charlee'], gender:'male', birthYear:1920, birthMonth:8, birthDay:29, birthPlace:'Kansas City, Kansas', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Dizzy Gillespie'], contemporaries:[], friends:[], foes:[], bio:'Bird — alto saxophonist who invented bebop with Dizzy Gillespie.' },
  { id:'louis-armstrong', name:'Louis Armstrong', middleName:'Daniel', homophones:['Lewis','Luis'], similarSpellings:['Lewis','Luis','Louie','Luigi'], gender:'male', birthYear:1901, birthMonth:8, birthDay:4, birthPlace:'New Orleans, Louisiana', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Ella Fitzgerald'], contemporaries:[], friends:[], foes:[], bio:'Satchmo — the trumpet, the gravel voice, the smile that defined jazz.' },
  { id:'nina-simone', name:'Nina Simone', middleName:'', homophones:['Neena','Nena'], similarSpellings:['Neena','Nena','Ninna','Ninah'], gender:'female', birthYear:1933, birthMonth:2, birthDay:21, birthPlace:'Tryon, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'High Priestess of Soul; classically trained, civil-rights-charged.' },
  { id:'duke-ellington', name:'Duke Ellington', middleName:'Kennedy', homophones:[], similarSpellings:['Duk','Dook','Duek'], gender:'male', birthYear:1899, birthMonth:4, birthDay:29, birthPlace:'Washington, D.C.', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1969}], collaborators:['Billy Strayhorn'], contemporaries:[], friends:[], foes:[], bio:'Bandleader, composer, and jazz\'s most prolific pen.' },

  // =====================================================================
  //  R&B / SOUL
  // =====================================================================
  { id:'marvin-gaye', name:'Marvin Gaye', middleName:'Pentz', homophones:[], similarSpellings:['Marvyn','Marven','Marvon','Marvine'], gender:'male', birthYear:1939, birthMonth:4, birthDay:2, birthPlace:'Washington, D.C.', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:['Tammi Terrell'], contemporaries:[], friends:[], foes:[], bio:'Prince of Motown; What\'s Going On rewrote the political album.' },
  { id:'stevie-wonder', name:'Stevie Wonder', middleName:'', homophones:['Stevy','Stevi'], similarSpellings:['Stevy','Stevi','Stevee','Stevye'], gender:'male', birthYear:1950, birthMonth:5, birthDay:13, birthPlace:'Saginaw, Michigan', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2014}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Twenty-five Grammys; Songs in the Key of Life.' },
  { id:'sade', name:'Sade Adu', middleName:'Folasade', homophones:['Shaday','Shadae'], similarSpellings:['Shaday','Shadae','Sadae','Saday'], gender:'female', birthYear:1959, birthMonth:1, birthDay:16, birthPlace:'Ibadan, Nigeria', country:'Nigeria', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Smooth-operator voice and decade-spaced records you can set a mood by.' },
  { id:'sam-cooke', name:'Sam Cooke', middleName:'', homophones:[], similarSpellings:['Samm','Samuel','Sammy','Samme'], gender:'male', birthYear:1931, birthMonth:1, birthDay:22, birthPlace:'Clarksdale, Mississippi', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Father of soul; "A Change Is Gonna Come" arrived weeks before he was killed.' },
  { id:'anita-baker', name:'Anita Baker', middleName:'', homophones:[], similarSpellings:['Aneeta','Anitta','Anyta','Anitah'], gender:'female', birthYear:1958, birthMonth:1, birthDay:26, birthPlace:'Toledo, Ohio', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[{name:'Grammy Award',year:1987}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Eight Grammys; the velvet alto behind Rapture.' },

  // =====================================================================
  //  WORLD MUSIC
  // =====================================================================
  { id:'bob-marley', name:'Bob Marley', middleName:'Nesta', homophones:[], similarSpellings:['Rob','Robert','Bobby','Bobbie'], gender:'male', birthYear:1945, birthMonth:2, birthDay:6, birthPlace:'Nine Mile, Jamaica', country:'Jamaica', field:'Music', subfield:'Reggae',
    teams:[{name:'The Wailers',years:[1963,1981]}], awards:[],
    collaborators:['Peter Tosh','Bunny Wailer'], contemporaries:['Peter Tosh','Bunny Wailer','Jimmy Cliff'], friends:['Peter Tosh','Bunny Wailer'], foes:[],
    bio:'Carried reggae and Rastafari to the world; co-founded the Wailers and survived a 1976 assassination attempt at his Kingston home.' },
  { id:'fela-kuti', name:'Fela Kuti', middleName:'Anikulapo', homophones:[], similarSpellings:['Felah','Phela','Fella'], gender:'male', birthYear:1938, birthMonth:10, birthDay:15, birthPlace:'Abeokuta, Nigeria', country:'Nigeria', field:'Music', subfield:'Afrobeat',
    teams:[], awards:[], collaborators:['Tony Allen'], contemporaries:[], friends:[], foes:[], bio:'Invented Afrobeat; turned his Lagos compound into a republic.' },
  { id:'ravi-shankar', name:'Ravi Shankar', middleName:'', homophones:[], similarSpellings:['Ravee','Ravy','Raavi'], gender:'male', birthYear:1920, birthMonth:4, birthDay:7, birthPlace:'Varanasi, India', country:'India', field:'Music', subfield:'Indian Classical',
    teams:[], awards:[], collaborators:['George Harrison'], contemporaries:[], friends:[], foes:[], bio:'Brought the sitar and Hindustani classical music to the global pop conversation.' },
  { id:'edith-piaf', name:'Édith Piaf', middleName:'Giovanna', homophones:[], similarSpellings:['Edyth','Edythe','Edithe','Edyth'], gender:'female', birthYear:1915, birthMonth:12, birthDay:19, birthPlace:'Paris, France', country:'France', field:'Music', subfield:'Chanson',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Little Sparrow of Paris; "Non, je ne regrette rien."' },
  { id:'caetano-veloso', name:'Caetano Veloso', middleName:'', homophones:[], similarSpellings:['Cayetano','Caitano','Kaetano'], gender:'male', birthYear:1942, birthMonth:8, birthDay:7, birthPlace:'Santo Amaro, Brazil', country:'Brazil', field:'Music', subfield:'Tropicália',
    teams:[], awards:[], collaborators:['Gilberto Gil'], contemporaries:[], friends:[], foes:[], bio:'Tropicália founder who fused bossa, rock, and Brazilian poetry.' },

  // =====================================================================
  //  FILM DIRECTORS — global
  // =====================================================================
  { id:'kurosawa', name:'Akira Kurosawa', middleName:'', homophones:[], similarSpellings:['Akirah','Akirra','Akeera'], gender:'male', birthYear:1910, birthMonth:3, birthDay:23, birthPlace:'Tokyo, Japan', country:'Japan', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1990}], collaborators:['Toshiro Mifune'], contemporaries:['Kenji Mizoguchi','Yasujirō Ozu','Mikio Naruse','Masaki Kobayashi'], friends:['Francis Ford Coppola','George Lucas'], foes:[],
    bio:'Seven Samurai, Rashomon, Ran — the towering Japanese director.' },
  { id:'fellini', name:'Federico Fellini', middleName:'', homophones:[], similarSpellings:['Federic','Federiko','Fredrico','Frederico'], gender:'male', birthYear:1920, birthMonth:1, birthDay:20, birthPlace:'Rimini, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1993}], collaborators:['Marcello Mastroianni'], contemporaries:[], friends:[], foes:[], bio:'La Dolce Vita and 8½; defined Italian cinema after the war.' },
  { id:'bergman', name:'Ingmar Bergman', middleName:'', homophones:['Inger'], similarSpellings:['Inger','Ingmaar','Ingmare'], gender:'male', birthYear:1918, birthMonth:7, birthDay:14, birthPlace:'Uppsala, Sweden', country:'Sweden', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Liv Ullmann'], contemporaries:[], friends:[], foes:[], bio:'Swedish director of Persona, The Seventh Seal, Wild Strawberries.' },
  { id:'miyazaki', name:'Hayao Miyazaki', middleName:'', homophones:[], similarSpellings:['Hayou','Hyao','Hyo'], gender:'male', birthYear:1941, birthMonth:1, birthDay:5, birthPlace:'Tokyo, Japan', country:'Japan', field:'Film', subfield:'Director',
    teams:[{name:'Studio Ghibli',years:[1985,2025]}], awards:[{name:'Academy Award for Best Animated Feature',year:2003}], collaborators:['Joe Hisaishi'], contemporaries:[], friends:[], foes:[], bio:'Co-founded Studio Ghibli; Spirited Away, Totoro, Princess Mononoke.' },
  { id:'almodovar', name:'Pedro Almodóvar', middleName:'', homophones:[], similarSpellings:['Pedroh','Petro','Pedrro'], gender:'male', birthYear:1949, birthMonth:9, birthDay:25, birthPlace:'Calzada de Calatrava, Spain', country:'Spain', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:2003}], collaborators:['Penélope Cruz'], contemporaries:[], friends:[], foes:[], bio:'Spanish auteur of bold color and stranger family ties.' },
  { id:'agnes-varda', name:'Agnès Varda', middleName:'', homophones:['Agness','Agnese'], similarSpellings:['Agness','Agnese','Agneta','Agnetha'], gender:'female', birthYear:1928, birthMonth:5, birthDay:30, birthPlace:'Ixelles, Belgium', country:'Belgium', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:2017}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Grandmother of the French New Wave; Cléo from 5 to 7.' },
  { id:'bong', name:'Bong Joon-ho', middleName:'', homophones:[], similarSpellings:['Bohng','Bonng'], gender:'male', birthYear:1969, birthMonth:9, birthDay:14, birthPlace:'Daegu, South Korea', country:'South Korea', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:2020}], collaborators:['Song Kang-ho'], contemporaries:[], friends:[], foes:[],
    bio:'Parasite swept the Oscars; first non-English-language Best Picture winner.' },
  { id:'chloe-zhao', name:'Chloé Zhao', middleName:'', homophones:['Khloe','Cloe','Chloey'], similarSpellings:['Khloe','Cloe','Chloey','Cloey'], gender:'female', birthYear:1982, birthMonth:3, birthDay:31, birthPlace:'Beijing, China', country:'China', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:2021}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Nomadland — first woman of color to win Best Director.' },
  { id:'wertmuller', name:'Lina Wertmüller', middleName:'', homophones:['Lena'], similarSpellings:['Lena','Lyna','Linah','Leenah'], gender:'female', birthYear:1928, birthMonth:8, birthDay:14, birthPlace:'Rome, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:2019}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First woman ever nominated for the Best Director Oscar (1977).' },
  { id:'gerwig', name:'Greta Gerwig', middleName:'Celeste', homophones:['Gretta'], similarSpellings:['Gretta','Gretah','Greata','Grete'], gender:'female', birthYear:1983, birthMonth:8, birthDay:4, birthPlace:'Sacramento, California', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Noah Baumbach'], contemporaries:[], friends:[], foes:[], bio:'Lady Bird, Little Women, Barbie — the most commercially powerful woman director in history.' },
  { id:'spike-lee', name:'Spike Lee', middleName:'', homophones:[], similarSpellings:['Spyke','Spik','Spykee'], gender:'male', birthYear:1957, birthMonth:3, birthDay:20, birthPlace:'Atlanta, Georgia', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Adapted Screenplay',year:2019}], collaborators:['Denzel Washington'], contemporaries:[], friends:[], foes:[], bio:'Do the Right Thing, Malcolm X, BlacKkKlansman.' },
  { id:'sofia-coppola', name:'Sofia Coppola', middleName:'Carmina', homophones:['Sophia','Sofiya','Sophya'], similarSpellings:['Sophia','Sofiya','Sophya','Sofie'], gender:'female', birthYear:1971, birthMonth:5, birthDay:14, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:2004}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Lost in Translation, The Virgin Suicides; languid, observational moods.' },

  // =====================================================================
  //  CLASSIC HOLLYWOOD
  // =====================================================================
  { id:'audrey-hepburn', name:'Audrey Hepburn', middleName:'Kathleen', homophones:['Audrie','Audrey','Audra'], similarSpellings:['Audrie','Audra','Audrye','Audree'], gender:'female', birthYear:1929, birthMonth:5, birthDay:4, birthPlace:'Ixelles, Belgium', country:'Belgium', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1954}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Roman Holiday, Breakfast at Tiffany's; later UNICEF ambassador." },
  { id:'cary-grant', name:'Cary Grant', middleName:'', homophones:['Carey','Kary','Kerry'], similarSpellings:['Carey','Kary','Kerry','Cari'], gender:'male', birthYear:1904, birthMonth:1, birthDay:18, birthPlace:'Bristol, England', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Honorary Award',year:1970}], collaborators:['Alfred Hitchcock'], contemporaries:[], friends:[], foes:[], bio:'Born Archibald Leach; perfected the screwball leading man.' },
  { id:'marlene-dietrich', name:'Marlene Dietrich', middleName:'', homophones:['Marlena','Marlina'], similarSpellings:['Marlena','Marlina','Marleen','Marleene'], gender:'female', birthYear:1901, birthMonth:12, birthDay:27, birthPlace:'Schöneberg, Germany', country:'Germany', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:['Josef von Sternberg'], contemporaries:[], friends:[], foes:[], bio:'Smoky-voiced cabaret icon; sang for Allied troops in WWII.' },
  { id:'greta-garbo', name:'Greta Garbo', middleName:'Lovisa', homophones:['Gretta'], similarSpellings:['Gretta','Gretah','Greata','Grete'], gender:'female', birthYear:1905, birthMonth:9, birthDay:18, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Honorary Award',year:1955}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'"I want to be alone." Retired at thirty-six and never returned.' },
  { id:'ingrid-bergman', name:'Ingrid Bergman', middleName:'', homophones:[], similarSpellings:['Ingrida','Ingred','Ingryd','Inghrid'], gender:'female', birthYear:1915, birthMonth:8, birthDay:29, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1945}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Casablanca, Notorious — Swedish star of Hollywood\'s Golden Age.' },
  { id:'sidney-poitier', name:'Sidney Poitier', middleName:'', homophones:['Sydney','Sidnee','Cidney'], similarSpellings:['Sydney','Sidnee','Cidney','Sidnie'], gender:'male', birthYear:1927, birthMonth:2, birthDay:20, birthPlace:'Miami, Florida', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:1964}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:"First Black man to win the Best Actor Oscar." },
  { id:'bette-davis', name:'Bette Davis', middleName:'', homophones:['Bett','Betty','Bettie'], similarSpellings:['Bett','Betty','Bettie','Bete'], gender:'female', birthYear:1908, birthMonth:4, birthDay:5, birthPlace:'Lowell, Massachusetts', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1936}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Two Oscars and a third-act renaissance with What Ever Happened to Baby Jane?' },
  { id:'kate-hepburn', name:'Katharine Hepburn', middleName:'Houghton', homophones:['Cate','Kait'], similarSpellings:['Cate','Kait','Kayte','Kaitee'], gender:'female', birthYear:1907, birthMonth:5, birthDay:12, birthPlace:'Hartford, Connecticut', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1934}], collaborators:['Spencer Tracy'], contemporaries:[], friends:[], foes:[], bio:'Four Best Actress Oscars — still the all-time record.' },

  // =====================================================================
  //  INTERNATIONAL ACTORS
  // =====================================================================
  { id:'marion-cotillard', name:'Marion Cotillard', middleName:'', homophones:[], similarSpellings:['Marian','Maryon','Marione','Marrion'], gender:'female', birthYear:1975, birthMonth:9, birthDay:30, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:2008}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'La Vie en Rose; first French actress to win Best Actress for a French-language role.' },
  { id:'penelope-cruz', name:'Penélope Cruz', middleName:'', homophones:[], similarSpellings:['Penelopee','Penelopy','Pinelopi'], gender:'female', birthYear:1974, birthMonth:4, birthDay:28, birthPlace:'Alcobendas, Spain', country:'Spain', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2009}], collaborators:['Pedro Almodóvar'], contemporaries:[], friends:[], foes:[], bio:'Almodóvar\'s muse; first Spanish actress to win an Oscar.' },
  { id:'mifune', name:'Toshiro Mifune', middleName:'', homophones:[], similarSpellings:['Toshyro','Tochiro','Toshero'], gender:'male', birthYear:1920, birthMonth:4, birthDay:1, birthPlace:'Qingdao, China', country:'Japan', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:['Akira Kurosawa'], contemporaries:[], friends:[], foes:[], bio:'Kurosawa\'s lead in sixteen films; the samurai you picture when you picture a samurai.' },
  { id:'cate-blanchett', name:'Cate Blanchett', middleName:'Elise', homophones:['Kate','Kait','Cait'], similarSpellings:['Kate','Kait','Cait','Kayt'], gender:'female', birthYear:1969, birthMonth:5, birthDay:14, birthPlace:'Melbourne, Australia', country:'Australia', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:2014}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Two Oscars; ranges from Galadriel to Bob Dylan to Lydia Tár.' },
  { id:'tilda-swinton', name:'Tilda Swinton', middleName:'Matilda', homophones:[], similarSpellings:['Tylda','Tildah','Tildaa'], gender:'female', birthYear:1960, birthMonth:11, birthDay:5, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2008}], collaborators:['Wes Anderson'], contemporaries:[], friends:[], foes:[], bio:'Otherworldly screen presence; muse to Jarman, Anderson, Bong.' },
  { id:'anya-taylor-joy', name:'Anya Taylor-Joy', middleName:'Josephine', homophones:['Aniya','Aanya'], similarSpellings:['Aniya','Aanya','Anyah','Annya'], gender:'female', birthYear:1996, birthMonth:4, birthDay:16, birthPlace:'Miami, Florida', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"The Queen's Gambit, Furiosa; raised in Argentina and the UK." },
  { id:'lea-seydoux', name:'Léa Seydoux', middleName:'Hélène', homophones:['Leah','Lia','Leigh'], similarSpellings:['Leah','Lia','Leigh','Leya'], gender:'female', birthYear:1985, birthMonth:7, birthDay:1, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Blue Is the Warmest Color; the new Bond girl who outacts the franchise.' },
  { id:'daniel-day-lewis', name:'Daniel Day-Lewis', middleName:'Michael Blake', homophones:[], similarSpellings:['Danyel','Danial','Daniyel','Daniele'], gender:'male', birthYear:1957, birthMonth:4, birthDay:29, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:2013}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Three Best Actor Oscars — the only man to do so.' },

  // =====================================================================
  //  COMEDIANS
  // =====================================================================
  { id:'chaplin', name:'Charlie Chaplin', middleName:'Spencer', homophones:['Charley','Charly'], similarSpellings:['Charley','Charly','Charli','Charlee'], gender:'male', birthYear:1889, birthMonth:4, birthDay:16, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Honorary Award',year:1972}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:"The Tramp; silent film's first global star and United Artists co-founder." },
  { id:'buster-keaton', name:'Buster Keaton', middleName:'', homophones:[], similarSpellings:['Bustar','Bustur','Busta'], gender:'male', birthYear:1895, birthMonth:10, birthDay:4, birthPlace:'Piqua, Kansas', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Honorary Award',year:1960}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'The Great Stone Face; The General is still the gold standard for physical comedy.' },
  { id:'lucille-ball', name:'Lucille Ball', middleName:'Désirée', homophones:[], similarSpellings:['Lucile','Lucil','Lucilla','Lucillah'], gender:'female', birthYear:1911, birthMonth:8, birthDay:6, birthPlace:'Jamestown, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Desi Arnaz'], contemporaries:[], friends:[], foes:[], bio:'I Love Lucy; co-founded Desilu, the studio that produced Star Trek.' },
  { id:'robin-williams', name:'Robin Williams', middleName:'McLaurin', homophones:['Robyn','Robbin'], similarSpellings:['Robyn','Robbin','Robben','Robynn'], gender:'male', birthYear:1951, birthMonth:7, birthDay:21, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actor',year:1998}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Improvisational genius — Mork, Mrs. Doubtfire, Sean Maguire.' },
  { id:'tina-fey', name:'Tina Fey', middleName:'', homophones:['Teena','Tena'], similarSpellings:['Teena','Tena','Tinah','Tinna'], gender:'female', birthYear:1970, birthMonth:5, birthDay:18, birthPlace:'Upper Darby, Pennsylvania', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Amy Poehler'], contemporaries:[], friends:[], foes:[], bio:'First female head writer of SNL; created 30 Rock.' },
  { id:'gervais', name:'Ricky Gervais', middleName:'Dene', homophones:[], similarSpellings:['Rickie','Riki','Ricki','Rikky'], gender:'male', birthYear:1961, birthMonth:6, birthDay:25, birthPlace:'Reading, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Stephen Merchant'], contemporaries:[], friends:[], foes:[], bio:'Co-created The Office (UK) — the format the world has now remade fifteen ways.' },
  { id:'phoebe-waller-bridge', name:'Phoebe Waller-Bridge', middleName:'', homophones:[], similarSpellings:['Phebe','Pheobe','Phoebee','Phoeby'], gender:'female', birthYear:1985, birthMonth:7, birthDay:14, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Created Fleabag and Killing Eve; reshaped what a half-hour comedy looks like.' },

  // =====================================================================
  //  TRANSGENDER
  // =====================================================================
  { id:'marsha-p-johnson', name:'Marsha P. Johnson', middleName:'', homophones:[], similarSpellings:['Marshah','Marscha','Marshaa'], gender:'female', birthYear:1945, birthMonth:8, birthDay:24, birthPlace:'Elizabeth, New Jersey', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:['Sylvia Rivera'], contemporaries:[], friends:[], foes:[], bio:'Trans activist at the front of the 1969 Stonewall uprising; co-founded STAR.' },
  { id:'sylvia-rivera', name:'Sylvia Rivera', middleName:'Lee', homophones:['Silvia','Sylvie'], similarSpellings:['Silvia','Sylvie','Sylvya','Silviah'], gender:'female', birthYear:1951, birthMonth:7, birthDay:2, birthPlace:'New York, New York', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:['Marsha P. Johnson'], contemporaries:[], friends:[], foes:[], bio:'Trans Latina activist; STAR co-founder; Stonewall veteran.' },
  { id:'laverne-cox', name:'Laverne Cox', middleName:'', homophones:[], similarSpellings:['Lavern','Lavurn','Lavearne'], gender:'female', birthYear:1972, birthMonth:5, birthDay:29, birthPlace:'Mobile, Alabama', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Orange Is the New Black; first trans woman of color to lead a primetime series.' },
  { id:'janet-mock', name:'Janet Mock', middleName:'', homophones:[], similarSpellings:['Janett','Janette','Janeth','Jeanette'], gender:'female', birthYear:1983, birthMonth:3, birthDay:10, birthPlace:'Honolulu, Hawaii', country:'USA', field:'Literature', subfield:'Memoirist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Author of Redefining Realness; first trans woman of color to write/direct for primetime TV.' },
  { id:'elliot-page', name:'Elliot Page', middleName:'', homophones:['Elliott','Eliot','Eliott'], similarSpellings:['Elliott','Eliot','Eliott','Eliyot'], gender:'male', birthYear:1987, birthMonth:2, birthDay:21, birthPlace:'Halifax, Canada', country:'Canada', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Juno, The Umbrella Academy; came out as trans in 2020.' },
  { id:'lana-wachowski', name:'Lana Wachowski', middleName:'', homophones:['Lanna','Lannah'], similarSpellings:['Lanna','Lannah','Lanae','Lannae'], gender:'female', birthYear:1965, birthMonth:6, birthDay:21, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Lilly Wachowski'], contemporaries:[], friends:[], foes:[], bio:'Co-directed The Matrix; first openly trans director of a major Hollywood film.' },
  { id:'lilly-wachowski', name:'Lilly Wachowski', middleName:'', homophones:['Lily','Lili','Lilli'], similarSpellings:['Lily','Lili','Lilli','Lilie'], gender:'female', birthYear:1967, birthMonth:12, birthDay:29, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Lana Wachowski'], contemporaries:[], friends:[], foes:[], bio:'The Matrix, Sense8; co-creator of one of cinema\'s most influential franchises.' },
  { id:'hunter-schafer', name:'Hunter Schafer', middleName:'', homophones:[], similarSpellings:['Huntar','Huntyr','Huntir'], gender:'female', birthYear:1998, birthMonth:12, birthDay:31, birthPlace:'Trenton, New Jersey', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Euphoria\'s Jules; modeled for Dior; co-wrote her own special episode.' },
  { id:'wendy-carlos', name:'Wendy Carlos', middleName:'', homophones:['Wendi','Wendie'], similarSpellings:['Wendi','Wendie','Wendee','Wendye'], gender:'female', birthYear:1939, birthMonth:11, birthDay:14, birthPlace:'Pawtucket, Rhode Island', country:'USA', field:'Music', subfield:'Electronic',
    teams:[], awards:[{name:'Grammy Award',year:1969}], collaborators:['Stanley Kubrick'], contemporaries:[], friends:[], foes:[], bio:'Switched-On Bach; scored A Clockwork Orange and TRON; trans pioneer in music.' },
  { id:'renee-richards', name:'Renée Richards', middleName:'', homophones:['Renae','Renay','Rennae'], similarSpellings:['Renae','Renay','Rennae','Renée'], gender:'female', birthYear:1934, birthMonth:8, birthDay:19, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:['Martina Navratilova'], contemporaries:[], friends:[], foes:[], bio:'Won a 1977 court case to play pro tennis as a woman.' },
  { id:'christine-jorgensen', name:'Christine Jorgensen', middleName:'', homophones:['Cristine','Kristine','Christeen'], similarSpellings:['Cristine','Kristine','Christeen','Christen'], gender:'female', birthYear:1926, birthMonth:5, birthDay:30, birthPlace:'New York, New York', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First widely known American to undergo gender-affirming surgery (1952).' },
  { id:'vladimir-luxuria', name:'Vladimir Luxuria', middleName:'', homophones:[], similarSpellings:['Wladimir','Vladymyr','Vlademir'], gender:'female', birthYear:1965, birthPlace:'Foggia, Italy', country:'Italy', field:'Politics', subfield:'Member of Parliament',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First openly trans member of any European parliament (Italy, 2006).' },

  // =====================================================================
  //  NON-BINARY
  // =====================================================================
  { id:'indya-moore', name:'Indya Moore', middleName:'', homophones:['India','Indea'], similarSpellings:['India','Indea','Indiah','Indyah'], gender:'nonbinary', birthYear:1995, birthMonth:1, birthDay:17, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Pose; one of the first openly non-binary cover stars on a major fashion magazine.' },
  { id:'sam-smith', name:'Sam Smith', middleName:'Frederick', homophones:[], similarSpellings:['Samm','Samuel','Sammy','Samme'], gender:'nonbinary', birthYear:1992, birthMonth:5, birthDay:19, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2016}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'British singer; came out as non-binary in 2019.' },
  // (Demi Lovato and Janelle Monáe exist earlier under Music/Pop — gender
  //  field on those originals is updated in place to 'nonbinary'.)
  { id:'asia-kate-dillon', name:'Asia Kate Dillon', middleName:'', homophones:['Aisha','Aja'], similarSpellings:['Aisha','Aja','Asya','Asiah'], gender:'nonbinary', birthYear:1984, birthPlace:'Ithaca, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Billions; first openly non-binary actor on a major TV series.' },
  { id:'alok', name:'Alok Vaid-Menon', middleName:'', homophones:[], similarSpellings:['Allok','Aloke','Alocke'], gender:'nonbinary', birthYear:1991, birthPlace:'College Station, Texas', country:'USA', field:'Literature', subfield:'Poet',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Poet, performer, and gender non-conformity advocate.' },
  { id:'travis-alabanza', name:'Travis Alabanza', middleName:'', homophones:[], similarSpellings:['Travus','Travys','Travas'], gender:'nonbinary', birthYear:1995, birthPlace:'Bristol, England', country:'UK', field:'Literature', subfield:'Performer',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'British playwright and performance artist; author of None of the Above.' },
  { id:'rebecca-sugar', name:'Rebecca Sugar', middleName:'', homophones:[], similarSpellings:['Rebekah','Rebeca','Rebbecca','Rebbeca'], gender:'nonbinary', birthYear:1987, birthMonth:7, birthDay:9, birthPlace:'Silver Spring, Maryland', country:'USA', field:'Film', subfield:'Animator',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Created Steven Universe; first solo woman/non-binary creator of a Cartoon Network series.' },

  // =====================================================================
  //  GLOBAL SPORTS — non-US, additional disciplines
  // =====================================================================
  { id:'pele', name:'Pelé', middleName:'', homophones:[], similarSpellings:['Pelé','Pellé','Pelay'], gender:'male', birthYear:1940, birthMonth:10, birthDay:23, birthPlace:'Três Corações, Brazil', country:'Brazil', field:'Sports', subfield:'Soccer',
    teams:[{name:'Santos FC',years:[1956,1974]},{name:'Brazil',years:[1957,1971]}], awards:[{name:'FIFA World Cup Champion',year:1970}], collaborators:[], contemporaries:['Diego Maradona','Johan Cruyff','Eusébio','George Best'], friends:['Garrincha'], foes:['Diego Maradona'], bio:'Three-time World Cup champion; the most globally famous athlete of the 20th century.' },
  { id:'maradona', name:'Diego Maradona', middleName:'Armando', homophones:[], similarSpellings:['Diago','Diegoo','Dieggo','Diiego'], gender:'male', birthYear:1960, birthMonth:10, birthDay:30, birthPlace:'Lanús, Argentina', country:'Argentina', field:'Sports', subfield:'Soccer',
    teams:[{name:'Argentina',years:[1977,1994]},{name:'Napoli',years:[1984,1991]}], awards:[{name:'FIFA World Cup Champion',year:1986}], collaborators:[], contemporaries:['Pelé','Michel Platini','Zico'], friends:['Fidel Castro'], foes:['Pelé'], bio:'The Hand of God; carried Argentina to a 1986 World Cup almost single-handedly.' },
  { id:'serena-williams', name:'Serena Williams', middleName:'Jameka', homophones:['Serenah','Sirena'], similarSpellings:['Serenah','Sirena','Serina','Serene'], gender:'female', birthYear:1981, birthMonth:9, birthDay:26, birthPlace:'Saginaw, Michigan', country:'USA', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:['Venus Williams'], contemporaries:['Venus Williams','Maria Sharapova','Roger Federer'], friends:['Venus Williams','Caroline Wozniacki'], foes:['Maria Sharapova','Justine Henin'], bio:'23 Grand Slam singles titles; the gold standard of women\'s tennis.' },
  { id:'roger-federer', name:'Roger Federer', middleName:'', homophones:[], similarSpellings:['Rodger','Rojer','Rogir'], gender:'male', birthYear:1981, birthMonth:8, birthDay:8, birthPlace:'Basel, Switzerland', country:'Switzerland', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:[], contemporaries:['Rafael Nadal','Novak Djokovic','Andy Murray'], friends:['Stan Wawrinka','Andy Murray'], foes:['Rafael Nadal','Novak Djokovic'], bio:'20 Grand Slam singles titles; tennis\' most graceful technician.' },
  { id:'ali', name:'Muhammad Ali', middleName:'', homophones:[], similarSpellings:['Aly','Allee','Allie','Alli'], gender:'male', birthYear:1942, birthMonth:1, birthDay:17, birthPlace:'Louisville, Kentucky', country:'USA', field:'Sports', subfield:'Boxing',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2005}], collaborators:[], contemporaries:['Joe Frazier','George Foreman','Sonny Liston'], friends:['Howard Cosell','Malcolm X'], foes:['Joe Frazier','George Foreman','Sonny Liston'], bio:'The Greatest; refused Vietnam draft, lost his title, won it back twice.' },
  { id:'simone-biles', name:'Simone Biles', middleName:'Arianne', homophones:[], similarSpellings:['Symone','Simohne','Simonn','Simoni'], gender:'female', birthYear:1997, birthMonth:3, birthDay:14, birthPlace:'Columbus, Ohio', country:'USA', field:'Sports', subfield:'Gymnastics',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Most-decorated gymnast in history; multiple skills named after her.' },
  { id:'usain-bolt', name:'Usain Bolt', middleName:'St. Leo', homophones:[], similarSpellings:['Usein','Yusan','Usane'], gender:'male', birthYear:1986, birthMonth:8, birthDay:21, birthPlace:'Sherwood Content, Jamaica', country:'Jamaica', field:'Sports', subfield:'Track & Field',
    teams:[], awards:[], collaborators:[], contemporaries:['Yohan Blake','Tyson Gay','Justin Gatlin','Asafa Powell'], friends:['Yohan Blake'], foes:['Justin Gatlin'], bio:'8 Olympic gold medals; world records in the 100m and 200m.' },
  { id:'nadia-comaneci', name:'Nadia Comăneci', middleName:'Elena', homophones:[], similarSpellings:['Nadya','Nadiya','Nadiah','Nadja'], gender:'female', birthYear:1961, birthMonth:11, birthDay:12, birthPlace:'Onești, Romania', country:'Romania', field:'Sports', subfield:'Gymnastics',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First gymnast ever scored a perfect 10 — at the 1976 Montreal Olympics, age 14.' },
  { id:'jackie-robinson', name:'Jackie Robinson', middleName:'Roosevelt', homophones:['Jacky','Jacki'], similarSpellings:['Jacky','Jacki','Jackee','Jaqui'], gender:'male', birthYear:1919, birthMonth:1, birthDay:31, birthPlace:'Cairo, Georgia', country:'USA', field:'Sports', subfield:'MLB',
    teams:[{name:'Brooklyn Dodgers',years:[1947,1956]}], awards:[{name:'MLB MVP',year:1949}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'First Black player in the modern Major Leagues; jersey #42 retired league-wide.' },
  { id:'wayne-gretzky', name:'Wayne Gretzky', middleName:'Douglas', homophones:[], similarSpellings:['Waine','Wain','Wayn','Wayne'], gender:'male', birthYear:1961, birthMonth:1, birthDay:26, birthPlace:'Brantford, Canada', country:'Canada', field:'Sports', subfield:'NHL',
    teams:[{name:'Edmonton Oilers',years:[1979,1988]},{name:'Los Angeles Kings',years:[1988,1996]}], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'The Great One; NHL all-time leading scorer by a margin no one will ever close.' },

  // =====================================================================
  //  TRACK & FIELD — 15 non-US, era-diverse
  // =====================================================================
  { id:'paavo-nurmi', name:'Paavo Nurmi', middleName:'Johannes', homophones:[], similarSpellings:['Pavo','Paavoh','Paavu'], gender:'male', birthYear:1897, birthMonth:6, birthDay:13, birthPlace:'Turku, Finland', country:'Finland', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Finland',years:[1920,1932]}], awards:[{name:'Olympic Gold',year:1924}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'The Flying Finn — nine Olympic gold medals across three Games, mostly in middle and long distance.' },

  { id:'emil-zatopek', name:'Emil Zátopek', middleName:'', homophones:[], similarSpellings:['Emill','Emyl','Emille','Emilio'], gender:'male', birthYear:1922, birthMonth:9, birthDay:19, birthPlace:'Kopřivnice, Czechoslovakia', country:'Czechoslovakia', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Czechoslovakia',years:[1948,1956]}], awards:[{name:'Olympic Gold',year:1952}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Only athlete to win the 5000m, 10000m, and marathon at a single Olympics — Helsinki 1952.' },

  { id:'haile-gebrselassie', name:'Haile Gebrselassie', middleName:'', homophones:[], similarSpellings:['Haley','Hailey','Hayle','Hailie'], gender:'male', birthYear:1973, birthMonth:4, birthDay:18, birthPlace:'Asella, Ethiopia', country:'Ethiopia', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Ethiopia',years:[1992,2015]}], awards:[{name:'Olympic Gold',year:1996},{name:'Olympic Gold',year:2000}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Two-time Olympic 10,000m champion who broke 27 world records across the track and the marathon.' },

  { id:'hicham-el-guerrouj', name:'Hicham El Guerrouj', middleName:'', homophones:['Hisham'], similarSpellings:['Hisham','Hichem','Hichaam'], gender:'male', birthYear:1974, birthMonth:9, birthDay:14, birthPlace:'Berkane, Morocco', country:'Morocco', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Morocco',years:[1995,2006]}], awards:[{name:'Olympic Gold',year:2004},{name:'Olympic Gold',year:2004}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'King of the Mile — 1500m and mile world record holder, double Olympic gold in Athens 2004.' },

  { id:'sergey-bubka', name:'Sergey Bubka', middleName:'Nazarovich', homophones:['Sergei','Serguei'], similarSpellings:['Sergei','Serguei','Sergeyy','Serjey'], gender:'male', birthYear:1963, birthMonth:12, birthDay:4, birthPlace:'Voroshilovgrad, Ukrainian SSR', country:'Ukraine', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Soviet Union',years:[1983,1991]},{name:'Ukraine',years:[1992,2001]}], awards:[{name:'Olympic Gold',year:1988}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'First man to clear six metres in the pole vault; set 35 world records during his career.' },

  { id:'jan-zelezny', name:'Jan Železný', middleName:'', homophones:[], similarSpellings:['Yan','Jann','Yann','Janne'], gender:'male', birthYear:1966, birthMonth:6, birthDay:16, birthPlace:'Mladá Boleslav, Czechoslovakia', country:'Czechia', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Czechoslovakia',years:[1988,1992]},{name:'Czechia',years:[1993,2006]}], awards:[{name:'Olympic Gold',year:1992},{name:'Olympic Gold',year:1996},{name:'Olympic Gold',year:2000}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Three-time Olympic javelin champion and holder of the 98.48m world record from 1996.' },

  { id:'jonathan-edwards', name:'Jonathan Edwards', middleName:'David', homophones:['Jonathon','Johnathan'], similarSpellings:['Jonathon','Johnathan','Jhonathan','Jonatan'], gender:'male', birthYear:1966, birthMonth:5, birthDay:10, birthPlace:'London, England', country:'UK', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Great Britain',years:[1988,2003]}], awards:[{name:'Olympic Gold',year:2000}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Triple jump world record holder since 1995 — 18.29m, a mark untouched for three decades.' },

  { id:'yelena-isinbayeva', name:'Yelena Isinbayeva', middleName:'Gadzhievna', homophones:['Elena','Helena'], similarSpellings:['Elena','Helena','Yalena','Yelenah'], gender:'female', birthYear:1982, birthMonth:6, birthDay:3, birthPlace:'Volgograd, Russia', country:'Russia', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Russia',years:[2003,2016]}], awards:[{name:'Olympic Gold',year:2004},{name:'Olympic Gold',year:2008}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Two-time Olympic pole vault champion; broke the women\'s world record 28 times.' },

  { id:'kenenisa-bekele', name:'Kenenisa Bekele', middleName:'', homophones:[], similarSpellings:['Kenenissa','Keninisa','Kennenisa'], gender:'male', birthYear:1982, birthMonth:6, birthDay:13, birthPlace:'Bekoji, Ethiopia', country:'Ethiopia', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Ethiopia',years:[2003,2024]}], awards:[{name:'Olympic Gold',year:2004},{name:'Olympic Gold',year:2008},{name:'Olympic Gold',year:2008}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Three-time Olympic gold medalist on the track; world record holder in the 5000m and 10000m.' },

  { id:'mo-farah', name:'Mo Farah', middleName:'Muktar', homophones:[], similarSpellings:['Moh','Moe','Moh’','Mou'], gender:'male', birthYear:1983, birthMonth:3, birthDay:23, birthPlace:'Mogadishu, Somalia', country:'UK', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Great Britain',years:[2005,2019]}], awards:[{name:'Olympic Gold',year:2012},{name:'Olympic Gold',year:2012},{name:'Olympic Gold',year:2016},{name:'Olympic Gold',year:2016}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Mogadishu-born British distance runner; double 5000m and 10000m Olympic champion in London and Rio.' },

  { id:'eliud-kipchoge', name:'Eliud Kipchoge', middleName:'', homophones:[], similarSpellings:['Elliud','Elioud','Eliyud'], gender:'male', birthYear:1984, birthMonth:11, birthDay:5, birthPlace:'Kapsisiywa, Kenya', country:'Kenya', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Kenya',years:[2003,2024]}], awards:[{name:'Olympic Gold',year:2016},{name:'Olympic Gold',year:2020}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Two-time Olympic marathon champion and first human to cover 26.2 miles in under two hours.' },

  { id:'shelly-ann-fraser-pryce', name:'Shelly-Ann Fraser-Pryce', middleName:'', homophones:['Shelley','Shelli'], similarSpellings:['Shelley','Shelli','Shellie','Shellee'], gender:'female', birthYear:1986, birthMonth:12, birthDay:27, birthPlace:'Kingston, Jamaica', country:'Jamaica', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Jamaica',years:[2007,2024]}], awards:[{name:'Olympic Gold',year:2008},{name:'Olympic Gold',year:2012}], collaborators:['Usain Bolt'], contemporaries:[], friends:[], foes:[],
    bio:'Pocket Rocket — two-time Olympic 100m champion and the most decorated female sprinter in world championship history.' },

  { id:'sifan-hassan', name:'Sifan Hassan', middleName:'', homophones:['Seefan'], similarSpellings:['Sifaan','Siphan','Syfan'], gender:'female', birthYear:1993, birthMonth:1, birthDay:1, birthPlace:'Adama, Ethiopia', country:'Netherlands', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Netherlands',years:[2014,2024]}], awards:[{name:'Olympic Gold',year:2020},{name:'Olympic Gold',year:2020},{name:'Olympic Gold',year:2024}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Ethiopian-born Dutch distance runner; won 1500m, 5000m, and 10000m medals at Tokyo, then marathon gold in Paris.' },

  { id:'andre-de-grasse', name:'Andre De Grasse', middleName:'Robert', homophones:['Andrae'], similarSpellings:['Andrae','Andrey','Andrès','Andray'], gender:'male', birthYear:1994, birthMonth:11, birthDay:10, birthPlace:'Scarborough, Canada', country:'Canada', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Canada',years:[2015,2024]}], awards:[{name:'Olympic Gold',year:2020}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Canada\'s fastest man; 200m Olympic gold in Tokyo and the bronze that ended Usain Bolt\'s 100m streak.' },

  { id:'faith-kipyegon', name:'Faith Kipyegon', middleName:'Chepngetich', homophones:[], similarSpellings:['Fayth','Faythe','Faithe'], gender:'female', birthYear:1994, birthMonth:1, birthDay:10, birthPlace:'Bomet, Kenya', country:'Kenya', field:'Sports', subfield:'Track & Field',
    teams:[{name:'Kenya',years:[2012,2024]}], awards:[{name:'Olympic Gold',year:2016},{name:'Olympic Gold',year:2020},{name:'Olympic Gold',year:2024}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'Three-peat Olympic 1500m champion (Rio, Tokyo, Paris) and the women\'s world record holder in the event.' },

  // =====================================================================
  //  GLOBAL LITERATURE — non-US, era-diverse
  // =====================================================================
  { id:'gabriel-garcia-marquez', name:'Gabriel García Márquez', middleName:'José', homophones:[], similarSpellings:['Gabriell','Gabriele','Gavriel','Gabryel'], gender:'male', birthYear:1927, birthMonth:3, birthDay:6, birthPlace:'Aracataca, Colombia', country:'Colombia', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Nobel Prize in Literature',year:1982}], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'One Hundred Years of Solitude; godfather of magical realism.' },
  { id:'chimamanda', name:'Chimamanda Ngozi Adichie', middleName:'Ngozi', homophones:[], similarSpellings:['Chimamandah','Chimimanda'], gender:'female', birthYear:1977, birthMonth:9, birthDay:15, birthPlace:'Enugu, Nigeria', country:'Nigeria', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:"Author of Americanah and the TEDx talk 'We Should All Be Feminists.'" },
  { id:'haruki-murakami', name:'Haruki Murakami', middleName:'', homophones:[], similarSpellings:['Haruky','Harukii','Haruke'], gender:'male', birthYear:1949, birthMonth:1, birthDay:12, birthPlace:'Kyoto, Japan', country:'Japan', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Norwegian Wood, Kafka on the Shore; cats, jazz, parallel worlds.' },
  { id:'arundhati-roy', name:'Arundhati Roy', middleName:'', homophones:[], similarSpellings:['Arundathi','Arundhuti','Arundhuthi'], gender:'female', birthYear:1961, birthMonth:11, birthDay:24, birthPlace:'Shillong, India', country:'India', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Booker Prize',year:1997}], collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:'The God of Small Things; Indian novelist and essayist.' },
  { id:'james-joyce', name:'James Joyce', middleName:'Augustine Aloysius', homophones:['Jaymes'], similarSpellings:['Jaymes','Jamie','Jamz','Jameson'], gender:'male', birthYear:1882, birthMonth:2, birthDay:2, birthPlace:'Dublin, Ireland', country:'Ireland', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Ulysses, Finnegans Wake; reshaped what a novel could be.' },
  { id:'virginia-woolf', name:'Virginia Woolf', middleName:'', homophones:[], similarSpellings:['Verginia','Virgenia','Virginyah','Virginnia'], gender:'female', birthYear:1882, birthMonth:1, birthDay:25, birthPlace:'London, England', country:'UK', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'To the Lighthouse, A Room of One\'s Own; modernism\'s most piercing voice.' },
  { id:'chinua-achebe', name:'Chinua Achebe', middleName:'', homophones:[], similarSpellings:['Chinwa','Chenua','Chinuah'], gender:'male', birthYear:1930, birthMonth:11, birthDay:16, birthPlace:'Ogidi, Nigeria', country:'Nigeria', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Things Fall Apart; father of modern African literature.' },
  { id:'borges', name:'Jorge Luis Borges', middleName:'Luis', homophones:[], similarSpellings:['George','Jorje','Jorgy','Yorge'], gender:'male', birthYear:1899, birthMonth:8, birthDay:24, birthPlace:'Buenos Aires, Argentina', country:'Argentina', field:'Literature', subfield:'Short Story',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Argentine fabulist of labyrinths, libraries, and infinite mirrors.' },

  // =====================================================================
  //  ANNIVERSARIES — added 2026-05-01 (rotation: "Anniversaries today")
  //  10 figures whose calendar birthday is May 1.
  // =====================================================================
  { id:'joseph-heller', name:'Joseph Heller', middleName:'', homophones:['Josef','Yosef'], similarSpellings:['Josef','Yosef','Josephe','Yusuf'], gender:'male', birthYear:1923, birthMonth:5, birthDay:1, birthPlace:'Brooklyn, New York', country:'USA', field:'Literature', subfield:'Novelist',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'B-25 bombardier whose 60 missions over Italy became Catch-22 — the novel that gave English its term for circular logic.' },

  { id:'wes-anderson', name:'Wes Anderson', middleName:'Wesley', homophones:[], similarSpellings:['Wess','Wez','Wesse'], gender:'male', birthYear:1969, birthMonth:5, birthDay:1, birthPlace:'Houston, Texas', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Live Action Short Film',year:2024}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Symmetry-obsessed dollhouse-maker behind Rushmore, The Royal Tenenbaums, and The Grand Budapest Hotel.' },

  { id:'tim-mcgraw', name:'Tim McGraw', middleName:'Samuel', homophones:[], similarSpellings:['Timothy','Tym','Timo','Timmy'], gender:'male', birthYear:1967, birthMonth:5, birthDay:1, birthPlace:'Delhi, Louisiana', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[],
    collaborators:['Faith Hill'], contemporaries:[], friends:[], foes:[], bio:'Country radio\'s most enduring chart presence; son of MLB pitcher Tug McGraw, married to Faith Hill since 1996.' },

  { id:'joanna-lumley', name:'Joanna Lumley', middleName:'', homophones:['Johanna','Joana','Yohanna'], similarSpellings:['Johanna','Joana','Yohanna','Joanne'], gender:'female', birthYear:1946, birthMonth:5, birthDay:1, birthPlace:'Srinagar, India', country:'UK', field:'Film', subfield:'Actress',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Patsy Stone in Absolutely Fabulous and Purdey in The New Avengers; activist who won Gurkhas the right to settle in Britain.' },

  { id:'glenn-ford', name:'Glenn Ford', middleName:'', homophones:['Glen','Glynn'], similarSpellings:['Glen','Glynn','Glenne','Glin'], gender:'male', birthYear:1916, birthMonth:5, birthDay:1, birthPlace:'Sainte-Christine, Quebec', country:'Canada', field:'Film', subfield:'Actor',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Quebec-born everyman of the noir era — Gilda, The Big Heat, Blackboard Jungle, then Pa Kent in Superman.' },

  { id:'judy-collins', name:'Judy Collins', middleName:'Marjorie', homophones:['Judi','Judie'], similarSpellings:['Judi','Judie','Judee','Judye'], gender:'female', birthYear:1939, birthMonth:5, birthDay:1, birthPlace:'Seattle, Washington', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Joni Mitchell'], contemporaries:[], friends:[], foes:[], bio:'Crystal soprano whose 1967 cover of Both Sides Now beat Joni Mitchell to the airwaves and made the song a standard.' },

  { id:'teilhard-de-chardin', name:'Pierre Teilhard de Chardin', middleName:'', homophones:[], similarSpellings:['Pyotr','Pieter','Petr','Pietro'], gender:'male', birthYear:1881, birthPlace:'Orcines, France', country:'France', field:'Religion', subfield:'Jesuit',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Jesuit paleontologist who tried to fuse evolution and Catholic theology — silenced by Rome, posthumously canonical anyway.' },

  { id:'jamie-dornan', name:'Jamie Dornan', middleName:'', homophones:['Jaime','Jami','Jamey'], similarSpellings:['Jaime','Jami','Jamey','Jamy'], gender:'male', birthYear:1982, birthMonth:5, birthDay:1, birthPlace:'Holywood, Northern Ireland', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Calvin Klein model turned pulp leading man (Fifty Shades) who finally got serious in Branagh\'s Belfast.' },

  { id:'rita-coolidge', name:'Rita Coolidge', middleName:'', homophones:[], similarSpellings:['Reeta','Ritah','Riita','Ryta'], gender:'female', birthYear:1945, birthMonth:5, birthDay:1, birthPlace:'Lafayette, Tennessee', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Cherokee-Scottish session-singer-turned-star whose smoky take on Higher and Higher was 1977\'s unlikeliest crossover hit.' },

  { id:'curtis-martin', name:'Curtis Martin', middleName:'Jr.', homophones:[], similarSpellings:['Curtice','Kurtis','Curtys','Kurtice'], gender:'male', birthYear:1973, birthMonth:5, birthDay:1, birthPlace:'Pittsburgh, Pennsylvania', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'New England Patriots',years:[1995,1997]},{name:'New York Jets',years:[1998,2005]}],
    awards:[{name:'AP Offensive Rookie of the Year',year:1995}],
    collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Pittsburgh third-rounder who ran for 14,101 yards in eleven seasons and walked into the Hall of Fame on the first ballot.' },

  // =====================================================================
  //  STRENGTHEN-THE-GRAPH — added 2026-05-03 (rotation: "Strengthen the graph")
  //  10 connector figures whose collaborators reach back into the dataset.
  // =====================================================================
  { id:'pierre-curie', name:'Pierre Curie', middleName:'', homophones:[], similarSpellings:['Piere','Pieree','Pyer','Pier'], gender:'male', birthYear:1859, birthMonth:5, birthDay:15, birthPlace:'Paris, France', country:'France', field:'Science', subfield:'Physics',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1903}],
    collaborators:['Marie Curie','Henri Becquerel'], contemporaries:[], friends:[], foes:[], bio:'Discovered piezoelectricity in his twenties; shared a Nobel for radioactivity with Marie; killed at 46 by a Paris carriage.' },

  { id:'charles-babbage', name:'Charles Babbage', middleName:'', homophones:[], similarSpellings:['Charlz','Charless','Charl'], gender:'male', birthYear:1791, birthMonth:12, birthDay:26, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Computing',
    teams:[], awards:[{name:'Royal Astronomical Society Gold Medal',year:1824}],
    collaborators:['Ada Lovelace'], contemporaries:[], friends:[], foes:[], bio:'Victorian polymath whose unbuilt Analytical Engine described every component of the modern computer a century early.' },

  { id:'friedrich-engels', name:'Friedrich Engels', middleName:'', homophones:[], similarSpellings:['Fredrich','Friedric','Friederich','Fredrik'], gender:'male', birthYear:1820, birthMonth:11, birthDay:28, birthPlace:'Barmen, Prussia', country:'Germany', field:'Philosophy', subfield:'Political Economy',
    teams:[], awards:[],
    collaborators:['Karl Marx'], contemporaries:[], friends:[], foes:[], bio:'Manchester mill manager who bankrolled Marx\'s decades of poverty and co-wrote the Communist Manifesto on his lunch breaks.' },

  { id:'alfred-hitchcock', name:'Alfred Hitchcock', middleName:'Joseph', homophones:[], similarSpellings:['Alfread','Alfreth','Alfredo','Alfeed'], gender:'male', birthYear:1899, birthMonth:8, birthDay:13, birthPlace:'Leytonstone, England', country:'UK', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'AFI Life Achievement Award',year:1979}],
    collaborators:['Cary Grant','Ingrid Bergman','Grace Kelly'], contemporaries:['John Ford','Howard Hawks','Frank Capra','Orson Welles'], friends:['François Truffaut','Cary Grant'], foes:[],
    bio:'London cockney who turned suspense into its own grammar — Rear Window, Vertigo, Psycho — and never won Best Director.' },

  { id:'diego-rivera', name:'Diego Rivera', middleName:'María', homophones:[], similarSpellings:['Diago','Diegoo','Dieggo','Diiego'], gender:'male', birthYear:1886, birthMonth:12, birthDay:8, birthPlace:'Guanajuato, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Muralist',
    teams:[], awards:[],
    collaborators:['Frida Kahlo'], contemporaries:['Frida Kahlo','José Clemente Orozco','David Alfaro Siqueiros'], friends:['Frida Kahlo','Leon Trotsky'], foes:['David Alfaro Siqueiros'], bio:'Mexican muralist who married Frida Kahlo twice; in 1934 Rockefeller had his Lenin fresco chiseled off the wall.' },

  { id:'andy-warhol', name:'Andy Warhol', middleName:'', homophones:['Andi','Andie'], similarSpellings:['Andi','Andie','Andee','Andey'], gender:'male', birthYear:1928, birthMonth:8, birthDay:6, birthPlace:'Pittsburgh, Pennsylvania', country:'USA', field:'Visual Arts', subfield:'Pop Artist',
    teams:[], awards:[],
    collaborators:['Jean-Michel Basquiat','Lou Reed','Edie Sedgwick'], contemporaries:['Jean-Michel Basquiat','Roy Lichtenstein','Keith Haring'], friends:['Jean-Michel Basquiat','Lou Reed','Edie Sedgwick'], foes:[],
    bio:'Soup cans, silkscreen Marilyns, and an eight-hour film of the Empire State Building; survived a 1968 shooting at The Factory.' },

  { id:'quincy-jones', name:'Quincy Jones', middleName:'Delight', homophones:[], similarSpellings:['Quincey','Quinsy','Quincie','Quinci'], gender:'male', birthYear:1933, birthMonth:3, birthDay:14, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Producer',
    teams:[], awards:[{name:'Jean Hersholt Humanitarian Award',year:1995}],
    collaborators:['Michael Jackson','Frank Sinatra','Ella Fitzgerald','Miles Davis'], contemporaries:[], friends:[], foes:[], bio:'Arranged for Sinatra and Basie, scored In the Heat of the Night at thirty-four, produced Thriller at forty-nine.' },

  { id:'yoko-ono', name:'Yoko Ono', middleName:'', homophones:[], similarSpellings:['Yokoh','Yoco','Joko'], gender:'female', birthYear:1933, birthMonth:2, birthDay:18, birthPlace:'Tokyo, Japan', country:'Japan', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[],
    collaborators:['John Lennon','John Cage'], contemporaries:[], friends:[], foes:[], bio:'Tokyo-born Fluxus artist whose Cut Piece predated her Beatle marriage by five years; co-credited on Imagine since 2017.' },

  { id:'liv-ullmann', name:'Liv Ullmann', middleName:'Johanne', homophones:[], similarSpellings:['Livv','Lyv','Liva'], gender:'female', birthYear:1938, birthMonth:12, birthDay:16, birthPlace:'Tokyo, Japan', country:'Norway', field:'Film', subfield:'Actress',
    teams:[], awards:[],
    collaborators:['Ingmar Bergman'], contemporaries:[], friends:[], foes:[], bio:'Norwegian face of Bergman\'s late period — Persona, Cries and Whispers, Scenes from a Marriage, Autumn Sonata.' },

  { id:'maya-angelou', name:'Maya Angelou', middleName:'', homophones:['Maia','Mya'], similarSpellings:['Maia','Mya','Mayah','Maja'], gender:'female', birthYear:1928, birthMonth:4, birthDay:4, birthPlace:'St. Louis, Missouri', country:'USA', field:'Literature', subfield:'Memoirist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2011}],
    collaborators:['James Baldwin'], contemporaries:[], friends:[], foes:[], bio:'Caged-bird memoirist who fry-cooked, danced calypso, and read at Clinton\'s inauguration before turning sixty-five.' },

  // =====================================================================
  //  EXPANSION BATCH — added 2026-05-11 (40 US + 60 international)
  // =====================================================================

  { id:'marlon-brando', name:'Marlon Brando', middleName:'', homophones:[], similarSpellings:['Marlin','Marlen','Marlyn','Marland'], gender:'male', birthYear:1924, birthMonth:4, birthDay:3, birthPlace:'Omaha, Nebraska', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:1955},{name:'Academy Award for Best Actor',year:1973}],
    collaborators:['Elia Kazan','Francis Ford Coppola'], contemporaries:[], friends:[], foes:[],
    bio:"Method-acting colossus who growled his way through Stanley Kowalski, Vito Corleone, and a refused Oscar." },

  { id:'james-dean', name:'James Dean', middleName:'Byron', homophones:['Deen'], similarSpellings:['Deane','Deen','Deyn','Dien'], gender:'male', birthYear:1931, birthMonth:2, birthDay:8, birthPlace:'Marion, Indiana', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award nomination',year:1956}],
    collaborators:['Nicholas Ray','Elia Kazan'], contemporaries:[], friends:[], foes:[],
    bio:"Rebel without a cause who made three movies, died at twenty-four, and became immortal anyway." },

  { id:'paul-newman', name:'Paul Newman', middleName:'Leonard', homophones:[], similarSpellings:['Pawl','Pol','Paule','Paull'], gender:'male', birthYear:1925, birthMonth:1, birthDay:26, birthPlace:'Shaker Heights, Ohio', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:1987}],
    collaborators:['Robert Redford','George Roy Hill'], contemporaries:[], friends:[], foes:[],
    bio:"Blue-eyed leading man who pocketed an Oscar, won at Le Mans, and bottled salad dressing for charity." },

  { id:'katharine-hepburn', name:'Katharine Hepburn', middleName:'Houghton', homophones:['Catherine','Kathryn','Katharyn'], similarSpellings:['Kathrine','Kathryne','Katherin','Katheryne'], gender:'female', birthYear:1907, birthMonth:5, birthDay:12, birthPlace:'Hartford, Connecticut', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1934},{name:'Academy Award for Best Actress',year:1968}],
    collaborators:['Spencer Tracy','George Cukor'], contemporaries:[], friends:[], foes:[],
    bio:"Four-time Best Actress winner who wore trousers and her own terms for sixty unflappable years." },

  { id:'humphrey-bogart', name:'Humphrey Bogart', middleName:'DeForest', homophones:[], similarSpellings:['Humphery','Humfrey','Humphry','Humfree'], gender:'male', birthYear:1899, birthMonth:12, birthDay:25, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:1952}],
    collaborators:['John Huston','Lauren Bacall'], contemporaries:[], friends:[], foes:[],
    bio:"Trench-coated cynic of Casablanca and The Maltese Falcon; AFI's greatest male screen legend." },

  { id:'orson-welles', name:'Orson Welles', middleName:'George',  homophones:[], similarSpellings:['Orsen','Orsan','Orsone','Orsin'], gender:'male', birthYear:1915, birthMonth:5, birthDay:6, birthPlace:'Kenosha, Wisconsin', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:1942},{name:'Academy Honorary Award',year:1971}],
    collaborators:['Joseph Cotten','Gregg Toland'], contemporaries:['John Ford','Alfred Hitchcock','Howard Hawks','Frank Capra'], friends:['Peter Bogdanovich','John Huston'], foes:['William Randolph Hearst','Pauline Kael'],
    bio:"Twenty-five-year-old wunderkind who panicked America with a Martian broadcast then made Citizen Kane." },

  { id:'stanley-kubrick', name:'Stanley Kubrick', middleName:'', homophones:[], similarSpellings:['Stanly','Stanlee','Stanli','Stanlea'], gender:'male', birthYear:1928, birthMonth:7, birthDay:26, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Visual Effects',year:1969}],
    collaborators:['Arthur C. Clarke','Jack Nicholson'], contemporaries:['Sidney Lumet','Sam Peckinpah','Federico Fellini','Orson Welles'], friends:['Steven Spielberg','Terry Southern'], foes:[],
    bio:"Perfectionist auteur of 2001, A Clockwork Orange, and The Shining whose every frame begs decoding." },

  { id:'martin-scorsese', name:'Martin Scorsese', middleName:'Charles', homophones:[], similarSpellings:['Martyn','Marten','Martan','Marttin'], gender:'male', birthYear:1942, birthMonth:11, birthDay:17, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:2007}],
    collaborators:['Robert De Niro','Leonardo DiCaprio','Thelma Schoonmaker'], contemporaries:['Brian De Palma','Steven Spielberg','George Lucas','Francis Ford Coppola'], friends:['Brian De Palma','Steven Spielberg','Francis Ford Coppola'], foes:[],
    bio:"Bard of Little Italy whose mean streets, raging bulls, and goodfellas redefined American cinema." },

  { id:'francis-ford-coppola', name:'Francis Ford Coppola', middleName:'Ford', homophones:[], similarSpellings:['Frances','Franciss','Fransis','Franses'], gender:'male', birthYear:1939, birthMonth:4, birthDay:7, birthPlace:'Detroit, Michigan', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:1975}],
    collaborators:['Marlon Brando','Al Pacino','Gordon Willis'], contemporaries:['George Lucas','Martin Scorsese','Steven Spielberg','Brian De Palma'], friends:['George Lucas','Martin Scorsese','Akira Kurosawa'], foes:[],
    bio:"Godfather of New Hollywood who turned a pulp novel into America's greatest crime trilogy." },

  { id:'steven-spielberg', name:'Steven Spielberg', middleName:'Allan', homophones:['Stephen','Stefan'], similarSpellings:['Stephen','Stefen','Stevan','Steaven'], gender:'male', birthYear:1946, birthMonth:12, birthDay:18, birthPlace:'Cincinnati, Ohio', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:1994},{name:'Academy Award for Best Director',year:1999}],
    collaborators:['George Lucas','John Williams','Tom Hanks'], contemporaries:['Martin Scorsese','Brian De Palma','Francis Ford Coppola','George Lucas'], friends:['George Lucas','Martin Scorsese','Brian De Palma','J.J. Abrams'], foes:[],
    bio:"Shark-haunted summer-blockbuster inventor who also got Oscar serious with Schindler's List." },

  { id:'george-lucas', name:'George Lucas', middleName:'Walton', homophones:['Georg','Jorje'], similarSpellings:['Georje','Jorge','Georeg','Geirge'], gender:'male', birthYear:1944, birthMonth:5, birthDay:14, birthPlace:'Modesto, California', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award nomination',year:1978}],
    collaborators:['Steven Spielberg','John Williams','Harrison Ford'], contemporaries:['Steven Spielberg','Francis Ford Coppola','Martin Scorsese','Brian De Palma'], friends:['Steven Spielberg','Francis Ford Coppola','Akira Kurosawa'], foes:[],
    bio:"Star Wars architect who launched a galaxy far, far away from a Modesto childhood with hot rods." },

  { id:'woody-allen', name:'Woody Allen', middleName:'', homophones:['Woodie'], similarSpellings:['Woodie','Woudy','Whoody','Woody'], gender:'male', birthYear:1935, birthMonth:12, birthDay:1, birthPlace:'Brooklyn, New York', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:1978}],
    collaborators:['Diane Keaton','Mia Farrow'], contemporaries:[], friends:[], foes:[],
    bio:"Neurotic Manhattan auteur of Annie Hall who wrote, directed, and clarinet-played his way through fifty films." },

  { id:'john-coltrane', name:'John Coltrane', middleName:'William', homophones:['Jon','Jonn'], similarSpellings:['Jon','Johnn','Joohn','Johne'], gender:'male', birthYear:1926, birthMonth:9, birthDay:23, birthPlace:'Hamlet, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1992}],
    collaborators:['Miles Davis','McCoy Tyner','Elvin Jones'], contemporaries:[], friends:[], foes:[],
    bio:"Tenor-sax mystic whose A Love Supreme turned spiritual searching into a sheet of sound." },

  { id:'thelonious-monk', name:'Thelonious Monk', middleName:'Sphere', homophones:[], similarSpellings:['Thelonius','Theolonius','Thelounius','Thelonios'], gender:'male', birthYear:1917, birthMonth:10, birthDay:10, birthPlace:'Rocky Mount, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1993}],
    collaborators:['John Coltrane','Charlie Rouse'], contemporaries:[], friends:[], foes:[],
    bio:"Bebop's angular high priest whose dissonant piano cracked open jazz harmony for everyone after." },

  { id:'dizzy-gillespie', name:'Dizzy Gillespie', middleName:'John Birks', homophones:[], similarSpellings:['Dizzee','Dizy','Dizzie','Dizzey'], gender:'male', birthYear:1917, birthMonth:10, birthDay:21, birthPlace:'Cheraw, South Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1989}],
    collaborators:['Charlie Parker','Mario Bauzá'], contemporaries:[], friends:[], foes:[],
    bio:"Bent-bell trumpet co-founder of bebop whose puffed cheeks launched Afro-Cuban jazz worldwide." },

  { id:'count-basie', name:'Count Basie', middleName:'William', homophones:[], similarSpellings:['Count','Kount','Conte','Counte'], gender:'male', birthYear:1904, birthMonth:8, birthDay:21, birthPlace:'Red Bank, New Jersey', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2002}],
    collaborators:['Lester Young','Frank Sinatra'], contemporaries:[], friends:[], foes:[],
    bio:"Kansas City bandleader whose minimalist piano and roaring orchestra made swing feel inevitable." },

  { id:'leonard-bernstein', name:'Leonard Bernstein', middleName:'', homophones:['Lenard'], similarSpellings:['Leonerd','Lennard','Lenord','Leonarde'], gender:'male', birthYear:1918, birthMonth:8, birthDay:25, birthPlace:'Lawrence, Massachusetts', country:'USA', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1985}],
    collaborators:['Stephen Sondheim','Aaron Copland'], contemporaries:[], friends:[], foes:[],
    bio:"Bernstein conducted, Bernstein composed, Bernstein televised — West Side Story and the Young People's Concerts." },

  { id:'aaron-copland', name:'Aaron Copland', middleName:'', homophones:['Aron','Erin'], similarSpellings:['Aaaron','Aharon','Erin','Aron'], gender:'male', birthYear:1900, birthMonth:11, birthDay:14, birthPlace:'Brooklyn, New York', country:'USA', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Pulitzer Prize for Music',year:1945}],
    collaborators:['Leonard Bernstein','Martha Graham'], contemporaries:[], friends:[], foes:[],
    bio:"Brooklyn-born composer who painted Appalachian Spring and the wide-open chord of American classical music." },

  { id:'philip-glass', name:'Philip Glass', middleName:'', homophones:['Phillip','Filip','Filipp'], similarSpellings:['Phillip','Phelip','Phyllip','Phillyp'], gender:'male', birthYear:1937, birthMonth:1, birthDay:31, birthPlace:'Baltimore, Maryland', country:'USA', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Golden Globe Award',year:1998}],
    collaborators:['Robert Wilson','Ravi Shankar'], contemporaries:[], friends:[], foes:[],
    bio:"Minimalist composer of Einstein on the Beach who turned arpeggios into a musical philosophy." },

  { id:'martha-graham', name:'Martha Graham', middleName:'', homophones:[], similarSpellings:['Marta','Marthe','Marther','Mortha'], gender:'female', birthYear:1894, birthMonth:5, birthDay:11, birthPlace:'Allegheny, Pennsylvania', country:'USA', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1976}],
    collaborators:['Aaron Copland','Isamu Noguchi'], contemporaries:[], friends:[], foes:[],
    bio:"Mother of modern dance whose contractions and releases re-mapped how the human body could speak." },

  { id:'merce-cunningham', name:'Merce Cunningham', middleName:'', homophones:[], similarSpellings:['Mercy','Merse','Merci','Merze'], gender:'male', birthYear:1919, birthMonth:4, birthDay:16, birthPlace:'Centralia, Washington', country:'USA', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Kennedy Center Honors',year:1985}],
    collaborators:['John Cage','Robert Rauschenberg'], contemporaries:[], friends:[], foes:[],
    bio:"Avant-garde choreographer who split movement from music and danced into his ninth decade." },

  { id:'alvin-ailey', name:'Alvin Ailey', middleName:'', homophones:[], similarSpellings:['Alvyn','Alven','Alvinn','Alvine'], gender:'male', birthYear:1931, birthMonth:1, birthDay:5, birthPlace:'Rogers, Texas', country:'USA', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Kennedy Center Honors',year:1988}],
    collaborators:['Judith Jamison','Carmen de Lavallade'], contemporaries:[], friends:[], foes:[],
    bio:"Texas-born choreographer whose Revelations turned spirituals into a permanent monument of American dance." },

  { id:'twyla-tharp', name:'Twyla Tharp', middleName:'', homophones:[], similarSpellings:['Twila','Twyla','Twylah','Twilah'], gender:'female', birthYear:1941, birthMonth:7, birthDay:1, birthPlace:'Portland, Indiana', country:'USA', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Tony Award',year:2003}],
    collaborators:['Mikhail Baryshnikov','Billy Joel'], contemporaries:[], friends:[], foes:[],
    bio:"Genre-mashing choreographer who set ballet to Sinatra and rock musicals to Joel." },

  { id:'george-balanchine', name:'George Balanchine', middleName:'', homophones:['Georg','Jorje'], similarSpellings:['Georje','Jorge','Georeg','Geirge'], gender:'male', birthYear:1904, birthMonth:1, birthDay:22, birthPlace:'Saint Petersburg, Russia', country:'Russia', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Kennedy Center Honors',year:1978}],
    collaborators:['Igor Stravinsky','Lincoln Kirstein'], contemporaries:[], friends:[], foes:[],
    bio:"Russian-born co-founder of New York City Ballet who made neoclassical dance America's classical." },

  { id:'rudolf-nureyev', name:'Rudolf Nureyev', middleName:'Khametovich', homophones:['Rudolph'], similarSpellings:['Rudolph','Rudulf','Rodolf','Roodolf'], gender:'male', birthYear:1938, birthMonth:3, birthDay:17, birthPlace:'Irkutsk Oblast, Russia', country:'Russia', field:'Visual Arts', subfield:'Choreographer',
    teams:[], awards:[{name:'Dance Magazine Award',year:1973}],
    collaborators:['Margot Fonteyn','Frederick Ashton'], contemporaries:[], friends:[], foes:[],
    bio:"Tatar dancer who leapt the Iron Curtain at Le Bourget and redefined the male ballet star." },

  { id:'richard-pryor', name:'Richard Pryor', middleName:'Franklin Lennox Thomas', homophones:['Rich'], similarSpellings:['Rikard','Rickard','Richarde','Ricard'], gender:'male', birthYear:1940, birthMonth:12, birthDay:1, birthPlace:'Peoria, Illinois', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Mark Twain Prize',year:1998}],
    collaborators:['Mel Brooks','Gene Wilder'], contemporaries:[], friends:[], foes:[],
    bio:"Searing autobiographer of pain and race whose stand-up rewired American comedy from the gut up." },

  { id:'george-carlin', name:'George Carlin', middleName:'Denis', homophones:['Georg','Jorje'], similarSpellings:['Georje','Jorge','Georeg','Geirge'], gender:'male', birthYear:1937, birthMonth:5, birthDay:12, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Mark Twain Prize',year:2008}],
    collaborators:['Jerry Hamza'], contemporaries:[], friends:[], foes:[],
    bio:"Seven dirty words and seventy more grievances — the philosopher king of stand-up." },

  { id:'gilda-radner', name:'Gilda Radner', middleName:'Susan', homophones:[], similarSpellings:['Gilde','Gildah','Gylda','Gilda'], gender:'female', birthYear:1946, birthMonth:6, birthDay:28, birthPlace:'Detroit, Michigan', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Emmy Award',year:1978}],
    collaborators:['Lorne Michaels','Gene Wilder'], contemporaries:[], friends:[], foes:[],
    bio:"Original SNL cast member of Roseanne Roseannadanna and Emily Litella; lost to ovarian cancer at forty-two." },

  { id:'carol-burnett', name:'Carol Burnett', middleName:'Creighton', homophones:[], similarSpellings:['Carrol','Carrolle','Karol','Caryl'], gender:'female', birthYear:1933, birthMonth:4, birthDay:26, birthPlace:'San Antonio, Texas', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Mark Twain Prize',year:2013}],
    collaborators:['Tim Conway','Harvey Korman'], contemporaries:[], friends:[], foes:[],
    bio:"Variety-show ringmaster who tugged her ear at her grandmother for eleven seasons of sketch genius." },

  { id:'mel-brooks', name:'Mel Brooks', middleName:'', homophones:[], similarSpellings:['Mell','Melle','Mehl'], gender:'male', birthYear:1926, birthMonth:6, birthDay:28, birthPlace:'Brooklyn, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:1969}],
    collaborators:['Gene Wilder','Anne Bancroft'], contemporaries:[], friends:[], foes:[],
    bio:"EGOT-clinching gag king of Blazing Saddles, The Producers, and a 2000-year-old man routine." },

  { id:'jerry-seinfeld', name:'Jerry Seinfeld', middleName:'Allen', homophones:[], similarSpellings:['Jerrey','Jeri','Gerry','Jeree'], gender:'male', birthYear:1954, birthMonth:4, birthDay:29, birthPlace:'Brooklyn, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Mark Twain Prize',year:2024}],
    collaborators:['Larry David','Jason Alexander'], contemporaries:[], friends:[], foes:[],
    bio:"Observational stand-up who turned nothing into a nine-season sitcom and a coffee-and-cars internet show." },

  { id:'eddie-murphy', name:'Eddie Murphy', middleName:'Regan', homophones:['Eddy'], similarSpellings:['Edie','Eddi','Eddee','Edddie'], gender:'male', birthYear:1961, birthMonth:4, birthDay:3, birthPlace:'Brooklyn, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Mark Twain Prize',year:2015}],
    collaborators:['Dan Aykroyd','Rick Rubin'], contemporaries:[], friends:[], foes:[],
    bio:"SNL teen prodigy turned Beverly Hills Cop superstar with a laugh you can identify in two syllables." },

  { id:'walter-cronkite', name:'Walter Cronkite', middleName:'Leland', homophones:[], similarSpellings:['Walther','Walder','Walt','Waltir'], gender:'male', birthYear:1916, birthMonth:11, birthDay:4, birthPlace:'Saint Joseph, Missouri', country:'USA', field:'Politics', subfield:'Journalist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1981}],
    collaborators:['Edward R. Murrow'], contemporaries:[], friends:[], foes:[],
    bio:"The most trusted man in America who said 'and that's the way it is' every night for nineteen years." },

  { id:'edward-r-murrow', name:'Edward R. Murrow', middleName:'Roscoe', homophones:['Edmund'], similarSpellings:['Edwerd','Edvard','Edard','Edwarde'], gender:'male', birthYear:1908, birthMonth:4, birthDay:25, birthPlace:'Polecat Creek, North Carolina', country:'USA', field:'Politics', subfield:'Journalist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1964}],
    collaborators:['William Paley','Fred Friendly'], contemporaries:[], friends:[], foes:[],
    bio:"Broadcast pioneer who reported the London Blitz from rooftops then took down Joe McCarthy on TV." },

  { id:'ida-b-wells', name:'Ida B. Wells', middleName:'Bell', homophones:[], similarSpellings:['Ada','Eda','Aida','Idah'], gender:'female', birthYear:1862, birthMonth:7, birthDay:16, birthPlace:'Holly Springs, Mississippi', country:'USA', field:'Activism', subfield:'Journalist',
    teams:[], awards:[{name:'Pulitzer Prize Special Citation',year:2020}],
    collaborators:['Frederick Douglass','W.E.B. Du Bois'], contemporaries:[], friends:[], foes:[],
    bio:"Investigative journalist born into slavery who chronicled the horror of lynching and co-founded the NAACP." },

  { id:'frederick-douglass', name:'Frederick Douglass', middleName:'Augustus Washington Bailey', homophones:['Frederic'], similarSpellings:['Fredrick','Fredderick','Fredric','Fredrik'], gender:'male', birthYear:1818, birthMonth:2, birthDay:14, birthPlace:'Talbot County, Maryland', country:'USA', field:'Activism', subfield:'Abolitionist',
    teams:[], awards:[],
    collaborators:['Abraham Lincoln','William Lloyd Garrison'], contemporaries:[], friends:[], foes:[],
    bio:"Escaped slave, orator, and statesman whose autobiographies armed abolition with its sharpest evidence." },

  { id:'abraham-lincoln', name:'Abraham Lincoln', middleName:'', homophones:[], similarSpellings:['Abrahem','Ibrahim','Avraham','Abrahm'], gender:'male', birthYear:1809, birthMonth:2, birthDay:12, birthPlace:'Hodgenville, Kentucky', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:['William Seward','Ulysses S. Grant'], contemporaries:[], friends:[], foes:[],
    bio:"Rail-splitting sixteenth president who preserved the Union, freed the enslaved, and never made it home from Ford's Theatre." },

  { id:'theodore-roosevelt', name:'Theodore Roosevelt', middleName:'', homophones:[], similarSpellings:['Theadore','Theodor','Teodor','Theodoor'], gender:'male', birthYear:1858, birthMonth:10, birthDay:27, birthPlace:'New York, New York', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1906}],
    collaborators:['John Muir','William Howard Taft'], contemporaries:[], friends:[], foes:[],
    bio:"Rough Rider, trust-buster, and national-park president who carried a big stick and won the Peace Prize." },

  { id:'franklin-d-roosevelt', name:'Franklin D. Roosevelt', middleName:'Delano', homophones:[], similarSpellings:['Franklyn','Franklen','Frankland','Frankling'], gender:'male', birthYear:1882, birthMonth:1, birthDay:30, birthPlace:'Hyde Park, New York', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:['Winston Churchill','Eleanor Roosevelt'], contemporaries:[], friends:[], foes:[],
    bio:"Four-term New Deal president who steered America through Depression and most of World War II from a wheelchair." },

  { id:'eleanor-roosevelt', name:'Eleanor Roosevelt', middleName:'Anna', homophones:[], similarSpellings:['Elenore','Eleanore','Elinor','Elenor'], gender:'female', birthYear:1884, birthMonth:10, birthDay:11, birthPlace:'New York, New York', country:'USA', field:'Politics', subfield:'Diplomat',
    teams:[], awards:[],
    collaborators:['Franklin D. Roosevelt','Mary McLeod Bethune'], contemporaries:[], friends:[], foes:[],
    bio:"Globe-trotting first lady who rewrote the role and chaired the Universal Declaration of Human Rights." },

  { id:'shirley-chisholm', name:'Shirley Chisholm', middleName:'Anita', homophones:[], similarSpellings:['Shirly','Shirlee','Shurley','Sherley'], gender:'female', birthYear:1924, birthMonth:11, birthDay:30, birthPlace:'Brooklyn, New York', country:'USA', field:'Politics', subfield:'Congresswoman',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2015}],
    collaborators:['Bella Abzug'], contemporaries:[], friends:[], foes:[],
    bio:"First Black woman in Congress and first to seek a major-party presidential nomination; unbought and unbossed." },

  { id:'sandra-day-oconnor', name:'Sandra Day O\'Connor', middleName:'Day', homophones:[], similarSpellings:['Sondra','Saundra','Zandra','Sondrah'], gender:'female', birthYear:1930, birthMonth:3, birthDay:26, birthPlace:'El Paso, Texas', country:'USA', field:'Politics', subfield:'Supreme Court Justice',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2009}],
    collaborators:['William Rehnquist'], contemporaries:[], friends:[], foes:[],
    bio:"First woman on the Supreme Court whose swing vote shaped a quarter century of American law." },

  { id:'thurgood-marshall', name:'Thurgood Marshall', middleName:'', homophones:[], similarSpellings:['Thergood','Thurgud','Thurghood','Thurgoode'], gender:'male', birthYear:1908, birthMonth:7, birthDay:2, birthPlace:'Baltimore, Maryland', country:'USA', field:'Politics', subfield:'Supreme Court Justice',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1993}],
    collaborators:['Earl Warren'], contemporaries:[], friends:[], foes:[],
    bio:"Brown v. Board litigator who became the first Black Supreme Court justice and never stopped dissenting." },

  { id:'martin-luther-king-jr', name:'Martin Luther King Jr.', middleName:'Luther', homophones:[], similarSpellings:['Martyn','Marten','Martan','Marttin'], gender:'male', birthYear:1929, birthMonth:1, birthDay:15, birthPlace:'Atlanta, Georgia', country:'USA', field:'Activism', subfield:'Civil Rights',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1964}],
    collaborators:['Ralph Abernathy','John Lewis','Bayard Rustin'], contemporaries:[], friends:[], foes:[],
    bio:"Dreamed in Washington, marched in Selma, jailed in Birmingham, and shot in Memphis at thirty-nine." },

  { id:'malcolm-x', name:'Malcolm X', middleName:'', homophones:[], similarSpellings:['Malcom','Malkolm','Malcolme','Maucolm'], gender:'male', birthYear:1925, birthMonth:5, birthDay:19, birthPlace:'Omaha, Nebraska', country:'USA', field:'Activism', subfield:'Civil Rights',
    teams:[], awards:[],
    collaborators:['Elijah Muhammad','Alex Haley'], contemporaries:[], friends:[], foes:[],
    bio:"Detroit Red turned Nation of Islam minister turned El-Hajj Malik El-Shabazz; killed at thirty-nine in Harlem." },

  { id:'thomas-edison', name:'Thomas Edison', middleName:'Alva', homophones:[], similarSpellings:['Tomas','Thommas','Tomaso','Thomus'], gender:'male', birthYear:1847, birthMonth:2, birthDay:11, birthPlace:'Milan, Ohio', country:'USA', field:'Science', subfield:'Inventor',
    teams:[], awards:[{name:'Congressional Gold Medal',year:1928}],
    collaborators:['Henry Ford','Nikola Tesla'], contemporaries:[], friends:[], foes:[],
    bio:"Wizard of Menlo Park with 1,093 U.S. patents — phonograph, motion-picture camera, and a usable lightbulb." },

  { id:'henry-ford', name:'Henry Ford', middleName:'', homophones:['Henri'], similarSpellings:['Henrey','Henrie','Henery','Henrri'], gender:'male', birthYear:1863, birthMonth:7, birthDay:30, birthPlace:'Greenfield Township, Michigan', country:'USA', field:'Tech', subfield:'Industrialist',
    teams:[], awards:[],
    collaborators:['Thomas Edison'], contemporaries:[], friends:[], foes:[],
    bio:"Assembly-line industrialist who put America on wheels with the Model T and a five-dollar workday." },

  { id:'walt-disney', name:'Walt Disney', middleName:'Elias', homophones:[], similarSpellings:['Walter','Wahlt','Vault','Wallt'], gender:'male', birthYear:1901, birthMonth:12, birthDay:5, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1964}],
    collaborators:['Ub Iwerks','Roy O. Disney'], contemporaries:[], friends:[], foes:[],
    bio:"Mouse-house founder who animated Mickey, opened Disneyland, and won twenty-two Oscars before sixty-five." },

  { id:'steve-jobs', name:'Steve Jobs', middleName:'Paul', homophones:[], similarSpellings:['Stephen','Stevin','Stevan','Steev'], gender:'male', birthYear:1955, birthMonth:2, birthDay:24, birthPlace:'San Francisco, California', country:'USA', field:'Tech', subfield:'Entrepreneur',
    teams:[], awards:[{name:'National Medal of Technology',year:1985}],
    collaborators:['Steve Wozniak','Jony Ive'], contemporaries:[], friends:[], foes:[],
    bio:"Black-turtlenecked Apple co-founder who shipped the Mac, iPod, iPhone, and iPad before fifty-six." },

  { id:'andrei-tarkovsky', name:'Andrei Tarkovsky', middleName:'Arsenyevich', homophones:[], similarSpellings:['Andre','Andrey','Andru','Andray'], gender:'male', birthYear:1932, birthMonth:4, birthDay:4, birthPlace:'Zavrazhye, Soviet Union', country:'Russia', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes FIPRESCI Prize',year:1969}],
    collaborators:['Anatoly Solonitsyn'], contemporaries:[], friends:[], foes:[],
    bio:"Russian mystic of slow cinema whose Stalker and Mirror are time-warps of memory and prayer." },

  { id:'sergei-eisenstein', name:'Sergei Eisenstein', middleName:'Mikhailovich', homophones:[], similarSpellings:['Sergey','Sergie','Sergei','Sergy'], gender:'male', birthYear:1898, birthMonth:1, birthDay:22, birthPlace:'Riga, Latvia', country:'Russia', field:'Film', subfield:'Director',
    teams:[], awards:[],
    collaborators:['Eduard Tisse'], contemporaries:[], friends:[], foes:[],
    bio:"Battleship Potemkin theorist whose montage shocked cinema into a new visual grammar." },

  { id:'jean-luc-godard', name:'Jean-Luc Godard', middleName:'Luc', homophones:[], similarSpellings:['Jon','Geon','Jeen','Jeane'], gender:'male', birthYear:1930, birthMonth:12, birthDay:3, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:2011}],
    collaborators:['Anna Karina','Raoul Coutard'], contemporaries:['François Truffaut','Claude Chabrol','Éric Rohmer','Jacques Rivette'], friends:['Jean-Pierre Gorin'], foes:['François Truffaut'],
    bio:"French New Wave provocateur who jump-cut Breathless and never stopped picking fights with cinema." },

  { id:'francois-truffaut', name:'François Truffaut', middleName:'Roland', homophones:[], similarSpellings:['Francois','Fransois','Frnacois','Francoise'], gender:'male', birthYear:1932, birthMonth:2, birthDay:6, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Foreign Language Film',year:1974}],
    collaborators:['Jean-Pierre Léaud','Suzanne Schiffman'], contemporaries:['Jean-Luc Godard','Claude Chabrol','Éric Rohmer','Jacques Rivette'], friends:['Alfred Hitchcock','Claude Chabrol','Éric Rohmer'], foes:['Jean-Luc Godard'],
    bio:"Cahiers critic turned New Wave father who shot The 400 Blows and Day for Night with autobiographical heart." },

  { id:'wong-kar-wai', name:'Wong Kar-wai', middleName:'', homophones:[], similarSpellings:['Wong','Whong','Vong'], gender:'male', birthYear:1958, birthMonth:7, birthDay:17, birthPlace:'Shanghai, China', country:'Hong Kong', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes Best Director',year:1997}],
    collaborators:['Christopher Doyle','Tony Leung','Maggie Cheung'], contemporaries:[], friends:[], foes:[],
    bio:"Sunglasses-clad poet of lost romance whose In the Mood for Love is a chiffon mood ring of longing." },

  { id:'zhang-yimou', name:'Zhang Yimou', middleName:'', homophones:[], similarSpellings:['Zang','Jang','Tsang','Zhung'], gender:'male', birthYear:1950, birthMonth:11, birthDay:14, birthPlace:'Xi\'an, China', country:'China', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Golden Lion',year:1992}],
    collaborators:['Gong Li','Zhang Ziyi'], contemporaries:[], friends:[], foes:[],
    bio:"Fifth-generation Chinese director of Raise the Red Lantern and the 2008 Beijing Olympics opening." },

  { id:'park-chan-wook', name:'Park Chan-wook', middleName:'', homophones:[], similarSpellings:['Pak','Bak','Parck'], gender:'male', birthYear:1963, birthMonth:8, birthDay:23, birthPlace:'Seoul, South Korea', country:'South Korea', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes Grand Prix',year:2004}],
    collaborators:['Choi Min-sik','Song Kang-ho'], contemporaries:[], friends:[], foes:[],
    bio:"Korean vengeance auteur of Oldboy whose elegant violence won Cannes more than once." },

  { id:'satyajit-ray', name:'Satyajit Ray', middleName:'', homophones:[], similarSpellings:['Satyajeet','Satjit','Sathjit','Satyajith'], gender:'male', birthYear:1921, birthMonth:5, birthDay:2, birthPlace:'Calcutta, India', country:'India', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1992}],
    collaborators:['Subrata Mitra','Ravi Shankar'], contemporaries:[], friends:[], foes:[],
    bio:"Bengali humanist whose Apu Trilogy turned a small village's growing-up into world cinema." },

  { id:'pedro-almodovar', name:'Pedro Almodóvar', middleName:'', homophones:[], similarSpellings:['Pedrro','Petro','Pyedro','Padero'], gender:'male', birthYear:1949, birthMonth:9, birthDay:25, birthPlace:'Calzada de Calatrava, Spain', country:'Spain', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Foreign Language Film',year:2000}],
    collaborators:['Penélope Cruz','Antonio Banderas'], contemporaries:[], friends:[], foes:[],
    bio:"Movida Madrileña melodramatist who paints women in candy colors and seismic feeling." },

  { id:'luis-bunuel', name:'Luis Buñuel', middleName:'', homophones:[], similarSpellings:['Lewis','Louis','Luiz','Luys'], gender:'male', birthYear:1900, birthMonth:2, birthDay:22, birthPlace:'Calanda, Spain', country:'Spain', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Foreign Language Film',year:1973}],
    collaborators:['Salvador Dalí','Jean-Claude Carrière'], contemporaries:[], friends:[], foes:[],
    bio:"Surrealist who sliced an eyeball in Un Chien Andalou and never apologized for his bourgeoisie." },

  { id:'roberto-rossellini', name:'Roberto Rossellini', middleName:'', homophones:[], similarSpellings:['Robarto','Robberto','Robeerto','Roburto'], gender:'male', birthYear:1906, birthMonth:5, birthDay:8, birthPlace:'Rome, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes Grand Prix',year:1946}],
    collaborators:['Ingrid Bergman','Anna Magnani'], contemporaries:[], friends:[], foes:[],
    bio:"Italian neorealist whose Rome, Open City filmed liberation almost as it happened." },

  { id:'vittorio-de-sica', name:'Vittorio De Sica', middleName:'', homophones:[], similarSpellings:['Victorio','Vitorio','Vittorio','Vyttorio'], gender:'male', birthYear:1901, birthMonth:7, birthDay:7, birthPlace:'Sora, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1947}],
    collaborators:['Cesare Zavattini'], contemporaries:[], friends:[], foes:[],
    bio:"Bicycle Thieves auteur of post-war Italian neorealism who four times took home foreign-language Oscars." },

  { id:'werner-herzog', name:'Werner Herzog', middleName:'', homophones:[], similarSpellings:['Verner','Wermer','Wenner','Vurner'], gender:'male', birthYear:1942, birthMonth:9, birthDay:5, birthPlace:'Munich, Germany', country:'Germany', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes Best Director',year:1982}],
    collaborators:['Klaus Kinski'], contemporaries:[], friends:[], foes:[],
    bio:"German mad-genius who dragged a steamship over an Andean mountain to film Fitzcarraldo." },

  { id:'wim-wenders', name:'Wim Wenders', middleName:'Ernst Wilhelm', homophones:[], similarSpellings:['Wym','Whim','Vim','Wimm'], gender:'male', birthYear:1945, birthMonth:8, birthDay:14, birthPlace:'Düsseldorf, Germany', country:'Germany', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Cannes Palme d\'Or',year:1984}],
    collaborators:['Peter Handke','Robby Müller'], contemporaries:[], friends:[], foes:[],
    bio:"Wings of Desire road-movie poet who films angels over Berlin and Buena Vista Social Club." },

  { id:'maria-callas', name:'Maria Callas', middleName:'Anna Cecilia Sofia', homophones:[], similarSpellings:['Mariah','Marya','Marie','Mariya'], gender:'female', birthYear:1923, birthMonth:12, birthDay:2, birthPlace:'New York, New York', country:'Greece', field:'Music', subfield:'Classical',
    teams:[], awards:[],
    collaborators:['Tullio Serafin','Luchino Visconti'], contemporaries:[], friends:[], foes:[],
    bio:"La Divina — Greek-American soprano whose volcanic stage presence rewired what opera could feel like." },

  { id:'luciano-pavarotti', name:'Luciano Pavarotti', middleName:'', homophones:[], similarSpellings:['Lusiano','Luchano','Lukiano','Loociano'], gender:'male', birthYear:1935, birthMonth:10, birthDay:12, birthPlace:'Modena, Italy', country:'Italy', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1998}],
    collaborators:['Plácido Domingo','José Carreras'], contemporaries:[], friends:[], foes:[],
    bio:"Modena-born tenor who handkerchief-waved his way through Nessun Dorma into the global pop charts." },

  { id:'enrico-caruso', name:'Enrico Caruso', middleName:'', homophones:[], similarSpellings:['Enriko','Enricco','Enrique','Henrico'], gender:'male', birthYear:1873, birthMonth:2, birthDay:25, birthPlace:'Naples, Italy', country:'Italy', field:'Music', subfield:'Classical',
    teams:[], awards:[],
    collaborators:['Geraldine Farrar'], contemporaries:[], friends:[], foes:[],
    bio:"Neapolitan tenor whose phonograph records turned opera into mass entertainment." },

  { id:'igor-stravinsky', name:'Igor Stravinsky', middleName:'Fyodorovich', homophones:[], similarSpellings:['Igore','Egor','Ygor','Iggor'], gender:'male', birthYear:1882, birthMonth:6, birthDay:17, birthPlace:'Oranienbaum, Russia', country:'Russia', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Grammy Award for Best Classical Composition',year:1961}],
    collaborators:['Sergei Diaghilev','George Balanchine'], contemporaries:[], friends:[], foes:[],
    bio:"Rite of Spring composer whose 1913 ballet caused a Paris riot and reset modern music." },

  { id:'dmitri-shostakovich', name:'Dmitri Shostakovich', middleName:'Dmitriyevich', homophones:[], similarSpellings:['Dimitri','Dmitry','Dmitrii','Dimitree'], gender:'male', birthYear:1906, birthMonth:9, birthDay:25, birthPlace:'Saint Petersburg, Russia', country:'Russia', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Stalin Prize',year:1941}],
    collaborators:['Mstislav Rostropovich'], contemporaries:[], friends:[], foes:[],
    bio:"Soviet symphonist who composed under Stalin's gaze and smuggled dissent into fifteen masterpieces." },

  { id:'pyotr-tchaikovsky', name:'Pyotr Tchaikovsky', middleName:'Ilyich', homophones:[], similarSpellings:['Piotr','Peter','Pjotr','Pyotor'], gender:'male', birthYear:1840, birthMonth:5, birthDay:7, birthPlace:'Votkinsk, Russia', country:'Russia', field:'Music', subfield:'Classical',
    teams:[], awards:[],
    collaborators:['Marius Petipa'], contemporaries:[], friends:[], foes:[],
    bio:"Russian romantic whose Nutcracker, Swan Lake, and 1812 Overture pack every December and July." },

  { id:'gustav-mahler', name:'Gustav Mahler', middleName:'', homophones:[], similarSpellings:['Gustaf','Gustave','Gusstav','Gustavo'], gender:'male', birthYear:1860, birthMonth:7, birthDay:7, birthPlace:'Kalischt, Austrian Empire', country:'Austria', field:'Music', subfield:'Classical',
    teams:[], awards:[],
    collaborators:['Alma Mahler','Bruno Walter'], contemporaries:[], friends:[], foes:[],
    bio:"Late-Romantic symphonist whose hour-long meditations on death and resurrection still haul concert halls." },

  { id:'maria-montessori', name:'Maria Montessori', middleName:'', homophones:[], similarSpellings:['Mariah','Marya','Marie','Mariya'], gender:'female', birthYear:1870, birthMonth:8, birthDay:31, birthPlace:'Chiaravalle, Italy', country:'Italy', field:'Science', subfield:'Educator',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Italy's first female doctor who turned a Roman slum classroom into a global educational method." },

  { id:'sigmund-freud', name:'Sigmund Freud', middleName:'', homophones:[], similarSpellings:['Sigmend','Zigmund','Sygmund','Siegmund'], gender:'male', birthYear:1856, birthMonth:5, birthDay:6, birthPlace:'Příbor, Moravia', country:'Austria', field:'Science', subfield:'Psychologist',
    teams:[], awards:[],
    collaborators:['Carl Jung','Anna Freud'], contemporaries:[], friends:[], foes:[],
    bio:"Viennese inventor of psychoanalysis whose couch and cigar gave us the unconscious." },

  { id:'carl-jung', name:'Carl Jung', middleName:'Gustav', homophones:[], similarSpellings:['Karl','Carle','Cyrl','Karll'], gender:'male', birthYear:1875, birthMonth:7, birthDay:26, birthPlace:'Kesswil, Switzerland', country:'Switzerland', field:'Science', subfield:'Psychologist',
    teams:[], awards:[],
    collaborators:['Sigmund Freud'], contemporaries:[], friends:[], foes:[],
    bio:"Swiss psychiatrist who mapped archetypes, the collective unconscious, and broke with his mentor Freud." },

  { id:'albert-einstein', name:'Albert Einstein', middleName:'', homophones:[], similarSpellings:['Alburt','Albrt','Albirt','Alberte'], gender:'male', birthYear:1879, birthMonth:3, birthDay:14, birthPlace:'Ulm, Germany', country:'Germany', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1921}],
    collaborators:['Niels Bohr','Max Planck'], contemporaries:[], friends:[], foes:[],
    bio:"E=mc² patent clerk who rewrote space-time and lent his hair to every science classroom on earth." },

  { id:'niels-bohr', name:'Niels Bohr', middleName:'Henrik David', homophones:[], similarSpellings:['Neils','Nils','Niels','Nyels'], gender:'male', birthYear:1885, birthMonth:10, birthDay:7, birthPlace:'Copenhagen, Denmark', country:'Denmark', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1922}],
    collaborators:['Werner Heisenberg','Albert Einstein'], contemporaries:[], friends:[], foes:[],
    bio:"Father of quantum theory whose Copenhagen interpretation insisted reality only resolves when watched." },

  { id:'werner-heisenberg', name:'Werner Heisenberg', middleName:'Karl', homophones:[], similarSpellings:['Verner','Wermer','Wenner','Vurner'], gender:'male', birthYear:1901, birthMonth:12, birthDay:5, birthPlace:'Würzburg, Germany', country:'Germany', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1932}],
    collaborators:['Niels Bohr'], contemporaries:[], friends:[], foes:[],
    bio:"Uncertainty principle author whose wartime A-bomb work remains controversial — we cannot precisely say." },

  { id:'stephen-hawking', name:'Stephen Hawking', middleName:'William', homophones:['Steven','Stefan'], similarSpellings:['Stefen','Stephan','Stevan','Steven'], gender:'male', birthYear:1942, birthMonth:1, birthDay:8, birthPlace:'Oxford, England', country:'UK', field:'Science', subfield:'Physicist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2009}],
    collaborators:['Roger Penrose','Kip Thorne'], contemporaries:[], friends:[], foes:[],
    bio:"Black-hole theorist who outlived an ALS prognosis by 55 years and joked his way around the cosmos." },

  { id:'jane-goodall', name:'Jane Goodall', middleName:'Morris', homophones:[], similarSpellings:['Jayne','Jain','Jaine','Janne'], gender:'female', birthYear:1934, birthMonth:4, birthDay:3, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Biologist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2025}],
    collaborators:['Louis Leakey'], contemporaries:[], friends:[], foes:[],
    bio:"Primatologist who lived among Gombe chimpanzees and showed that tool use is not just for humans." },

  { id:'david-attenborough', name:'David Attenborough', middleName:'Frederick', homophones:[], similarSpellings:['Davyd','Daved','Davide','Davidd'], gender:'male', birthYear:1926, birthMonth:5, birthDay:8, birthPlace:'Isleworth, England', country:'UK', field:'Science', subfield:'Naturalist',
    teams:[], awards:[{name:'BAFTA Fellowship',year:1980}],
    collaborators:['BBC Natural History Unit'], contemporaries:[], friends:[], foes:[],
    bio:"Hush-voiced BBC naturalist who has narrated planet earth across nine decades and every biome." },

  { id:'maurice-strong', name:'Maurice Strong', middleName:'Frederick', homophones:[], similarSpellings:['Morris','Moris','Maurise','Mauriece'], gender:'male', birthYear:1929, birthPlace:'Oak Lake, Manitoba', country:'Canada', field:'Politics', subfield:'Diplomat',
    teams:[], awards:[],
    collaborators:['Kofi Annan'], contemporaries:[], friends:[], foes:[],
    bio:"Canadian environmentalist who organized the first Earth Summit and shaped global climate policy." },

  { id:'kofi-annan', name:'Kofi Annan', middleName:'Atta', homophones:[], similarSpellings:['Coffi','Kofy','Koffi','Cofi'], gender:'male', birthYear:1938, birthMonth:4, birthDay:8, birthPlace:'Kumasi, Ghana', country:'Ghana', field:'Politics', subfield:'Diplomat',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2001}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Ghanaian UN secretary-general who shared a Nobel and pushed humanitarian intervention from inside the Glass Tower." },

  { id:'haile-selassie', name:'Hailé Selassie', middleName:'', homophones:[], similarSpellings:['Hayle','Haila','Hayele','Halie'], gender:'male', birthYear:1892, birthMonth:7, birthDay:23, birthPlace:'Ejersa Goro, Ethiopia', country:'Ethiopia', field:'Politics', subfield:'Emperor',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Ethiopian emperor and Rastafarian messiah whose 1936 League of Nations speech foretold World War II." },

  { id:'julius-nyerere', name:'Julius Nyerere', middleName:'Kambarage', homophones:[], similarSpellings:['Julious','Juluis','Julyus','Yulius'], gender:'male', birthYear:1922, birthMonth:4, birthDay:13, birthPlace:'Butiama, Tanganyika', country:'Tanzania', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:['Kwame Nkrumah'], contemporaries:[], friends:[], foes:[],
    bio:"Mwalimu — Tanzania's founding president who united tribes through Swahili and African socialism." },

  { id:'kwame-nkrumah', name:'Kwame Nkrumah', middleName:'', homophones:[], similarSpellings:['Quame','Kwami','Quami','Kwaime'], gender:'male', birthYear:1909, birthMonth:9, birthDay:21, birthPlace:'Nkroful, Gold Coast', country:'Ghana', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:['Julius Nyerere'], contemporaries:[], friends:[], foes:[],
    bio:"Ghanaian Pan-African founding father who led the first sub-Saharan nation to independence in 1957." },

  { id:'patrice-lumumba', name:'Patrice Lumumba', middleName:'Émery', homophones:['Patrick'], similarSpellings:['Patrise','Patriss','Patreece','Patris'], gender:'male', birthYear:1925, birthMonth:7, birthDay:2, birthPlace:'Onalua, Belgian Congo', country:'DR Congo', field:'Politics', subfield:'Prime Minister',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Congo's first prime minister whose seven-month tenure ended with a Belgian-backed firing squad at thirty-five." },

  { id:'thomas-sankara', name:'Thomas Sankara', middleName:'Isidore Noël', homophones:[], similarSpellings:['Tomas','Thommas','Tomaso','Thomus'], gender:'male', birthYear:1949, birthMonth:12, birthDay:21, birthPlace:'Yako, Upper Volta', country:'Burkina Faso', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Africa's Che — Burkinabé revolutionary who renamed his country, rejected aid, and was killed at thirty-seven." },

  { id:'lula-da-silva', name:'Luiz Inácio Lula da Silva', middleName:'Inácio', homophones:[], similarSpellings:['Lola','Lulla','Loula'], gender:'male', birthYear:1945, birthMonth:10, birthDay:27, birthPlace:'Caetés, Brazil', country:'Brazil', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Metalworker turned three-term Brazilian president whose Bolsa Família lifted millions from hunger." },

  { id:'salvador-allende', name:'Salvador Allende', middleName:'Guillermo', homophones:[], similarSpellings:['Salvadore','Salbador','Selvador','Sallvador'], gender:'male', birthYear:1908, birthMonth:6, birthDay:26, birthPlace:'Valparaíso, Chile', country:'Chile', field:'Politics', subfield:'President',
    teams:[], awards:[],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Marxist Chilean president who died inside La Moneda Palace during Pinochet's 1973 coup." },

  { id:'lionel-messi', name:'Lionel Messi', middleName:'Andrés', homophones:[], similarSpellings:['Lyonel','Leonel','Lionell','Liyonel'], gender:'male', birthYear:1987, birthMonth:6, birthDay:24, birthPlace:'Rosario, Argentina', country:'Argentina', field:'Sports', subfield:'Soccer',
    teams:[{name:'FC Barcelona',years:[2004,2021]},{name:'Inter Miami',years:[2023,9999]}], awards:[{name:'Ballon d\'Or',year:2009},{name:'FIFA World Cup',year:2022}],
    collaborators:['Andrés Iniesta','Xavi Hernández'], contemporaries:[], friends:[], foes:[],
    bio:"Rosario-born No. 10 who hoisted the 2022 World Cup after winning every club trophy and eight Ballons d'Or." },

  { id:'cristiano-ronaldo', name:'Cristiano Ronaldo', middleName:'dos Santos Aveiro', homophones:[], similarSpellings:['Christiano','Christian','Cristian','Kristiano'], gender:'male', birthYear:1985, birthMonth:2, birthDay:5, birthPlace:'Funchal, Madeira', country:'Portugal', field:'Sports', subfield:'Soccer',
    teams:[{name:'Manchester United',years:[2003,2009]},{name:'Real Madrid',years:[2009,2018]}], awards:[{name:'Ballon d\'Or',year:2008}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Madeira-born Portuguese striker whose chiseled abs and 900+ goals made him soccer's first billionaire athlete." },

  { id:'johan-cruyff', name:'Johan Cruyff', middleName:'Hendrik Johannes', homophones:['Yohan','Yohann'], similarSpellings:['Yohann','Johann','Joan','Joahn'], gender:'male', birthYear:1947, birthMonth:4, birthDay:25, birthPlace:'Amsterdam, Netherlands', country:'Netherlands', field:'Sports', subfield:'Soccer',
    teams:[{name:'Ajax',years:[1964,1973]},{name:'FC Barcelona',years:[1973,1978]}], awards:[{name:'Ballon d\'Or',year:1971}],
    collaborators:['Rinus Michels'], contemporaries:[], friends:[], foes:[],
    bio:"Total football's living definition; the Cruyff turn and the philosophical foundation of modern Barcelona." },

  { id:'zinedine-zidane', name:'Zinédine Zidane', middleName:'Yazid', homophones:[], similarSpellings:['Zinedine','Zenedine','Zidan','Zedane'], gender:'male', birthYear:1972, birthMonth:6, birthDay:23, birthPlace:'Marseille, France', country:'France', field:'Sports', subfield:'Soccer',
    teams:[{name:'Real Madrid',years:[2001,2006]}], awards:[{name:'FIFA World Cup',year:1998},{name:'Ballon d\'Or',year:1998}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Algerian-French maestro whose Marseille turn, 2002 Champions League volley, and 2006 head-butt all live on YouTube forever." },

  { id:'eric-cantona', name:'Éric Cantona', middleName:'Daniel Pierre', homophones:['Erik'], similarSpellings:['Erick','Erec','Eryk','Erich'], gender:'male', birthYear:1966, birthMonth:5, birthDay:24, birthPlace:'Marseille, France', country:'France', field:'Sports', subfield:'Soccer',
    teams:[{name:'Manchester United',years:[1992,1997]}], awards:[{name:'PFA Players\' Player of the Year',year:1994}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Collar-up French philosopher-striker who kung-fu-kicked a heckler and won four Premier Leagues with United." },

  { id:'marta-vieira', name:'Marta Vieira da Silva', middleName:'Vieira', homophones:[], similarSpellings:['Martha','Mahrta','Marrta','Martah'], gender:'female', birthYear:1986, birthMonth:2, birthDay:19, birthPlace:'Dois Riachos, Brazil', country:'Brazil', field:'Sports', subfield:'Soccer',
    teams:[{name:'Brazil',years:[2002,9999]}], awards:[{name:'FIFA World Player of the Year',year:2006}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Six-time FIFA Women's World Player who scored at five different World Cups for Brazil." },

  { id:'simone-veil', name:'Simone Veil', middleName:'', homophones:[], similarSpellings:['Vail','Veile','Vaile','Veyl'], gender:'female', birthYear:1927, birthMonth:7, birthDay:13, birthPlace:'Nice, France', country:'France', field:'Politics', subfield:'Minister',
    teams:[], awards:[{name:'Charlemagne Prize',year:1981}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Auschwitz survivor who legalized abortion in France in 1975 and led the first elected European Parliament." },

  { id:'olga-korbut', name:'Olga Korbut', middleName:'Valentinovna', homophones:[], similarSpellings:['Olgha','Olja','Olka','Olgua'], gender:'female', birthYear:1955, birthMonth:5, birthDay:16, birthPlace:'Grodno, Belarus', country:'Belarus', field:'Sports', subfield:'Gymnastics',
    teams:[{name:'Soviet Union',years:[1972,1976]}], awards:[{name:'Olympic Gold Medal',year:1972}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Sparrow of Minsk whose smile and Korbut Flip melted Cold War television in 1972 Munich." },

  { id:'larisa-latynina', name:'Larisa Latynina', middleName:'Semyonovna', homophones:[], similarSpellings:['Larissa','Larysa','Larisah','Lareesa'], gender:'female', birthYear:1934, birthMonth:12, birthDay:27, birthPlace:'Kherson, Soviet Union', country:'Ukraine', field:'Sports', subfield:'Gymnastics',
    teams:[{name:'Soviet Union',years:[1956,1964]}], awards:[{name:'Olympic Gold Medal',year:1956}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Soviet gymnast whose eighteen Olympic medals stood as the all-time record until Michael Phelps." },

  { id:'vera-caslavska', name:'Věra Čáslavská', middleName:'', homophones:[], similarSpellings:['Vera','Veera','Wera','Vyra'], gender:'female', birthYear:1942, birthMonth:5, birthDay:3, birthPlace:'Prague, Czechoslovakia', country:'Czech Republic', field:'Sports', subfield:'Gymnastics',
    teams:[{name:'Czechoslovakia',years:[1960,1968]}], awards:[{name:'Olympic Gold Medal',year:1964}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Czech gymnast who turned her head during the Soviet anthem in 1968 Mexico — and won gold anyway." },

  { id:'sawao-kato', name:'Sawao Katō', middleName:'', homophones:[], similarSpellings:['Sawow','Sawow','Savao','Sahwao'], gender:'male', birthYear:1946, birthMonth:10, birthDay:11, birthPlace:'Gosen, Japan', country:'Japan', field:'Sports', subfield:'Gymnastics',
    teams:[{name:'Japan',years:[1968,1976]}], awards:[{name:'Olympic Gold Medal',year:1968}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"Japanese gymnast with eight Olympic golds and the discipline of a sliding shoji screen." },

  { id:'kohei-uchimura', name:'Kōhei Uchimura', middleName:'', homophones:[], similarSpellings:['Kohey','Cohei','Koheei','Kouhei'], gender:'male', birthYear:1989, birthMonth:1, birthDay:3, birthPlace:'Nagasaki, Japan', country:'Japan', field:'Sports', subfield:'Gymnastics',
    teams:[{name:'Japan',years:[2008,2020]}], awards:[{name:'Olympic Gold Medal',year:2012}],
    collaborators:[], contemporaries:[], friends:[], foes:[],
    bio:"King Kohei — Japanese gymnast who won six straight all-around world titles before back-to-back Olympic golds." },

  // =====================================================================
  //  PRE-1900 WOMEN AUTHORS — added 2026-05-13 (rotation: themed batch)
  //  Five canonical 19th-century women novelists and poets writing in English.
  // =====================================================================
  { id:'jane-austen', name:'Jane Austen', middleName:'', homophones:[], similarSpellings:['Austin','Awsten','Osten','Jaine','Jayne'], gender:'female', birthYear:1775, birthMonth:12, birthDay:16, birthPlace:'Steventon, England', country:'UK', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Pride and Prejudice, Emma; English novelist whose wit dissected Regency manners with surgical precision.' },

  { id:'emily-dickinson', name:'Emily Dickinson', middleName:'Elizabeth', homophones:[], similarSpellings:['Dickenson','Dikinson','Dickinsen','Emilie','Emely'], gender:'female', birthYear:1830, birthMonth:12, birthDay:10, birthPlace:'Amherst, Massachusetts', country:'USA', field:'Literature', subfield:'Poet',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Amherst recluse whose nearly 1,800 dash-laced poems — mostly unpublished in her lifetime — reinvented American verse.' },

  { id:'charlotte-bronte', name:'Charlotte Brontë', middleName:'', homophones:[], similarSpellings:['Bronte','Brontey','Charlot','Sharlott','Charlott'], gender:'female', birthYear:1816, birthMonth:4, birthDay:21, birthPlace:'Thornton, England', country:'UK', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Jane Eyre under the pen name Currer Bell; eldest surviving Brontë and Yorkshire parsonage prodigy.' },

  { id:'george-eliot', name:'George Eliot', middleName:'', homophones:['Elliot','Elliott'], similarSpellings:['Elliot','Elliott','Eliyot','Mary Ann Evans','Marian Evans'], gender:'female', birthYear:1819, birthMonth:11, birthDay:22, birthPlace:'Nuneaton, England', country:'UK', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Middlemarch; Mary Ann Evans took a man\'s name to be taken seriously and wrote one of English literature\'s greatest novels.' },

  { id:'louisa-may-alcott', name:'Louisa May Alcott', middleName:'May', homophones:[], similarSpellings:['Alcot','Allcott','Luisa','Lousia','Louiza'], gender:'female', birthYear:1832, birthMonth:11, birthDay:29, birthPlace:'Germantown, Pennsylvania', country:'USA', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], contemporaries:[], friends:[], foes:[], bio:'Little Women; American novelist who turned her Concord sisters and Transcendentalist childhood into the template for American girlhood.' },

].filter(p => p.field !== '__skip__');  // drop placeholder rows used during editing

// Convenience: distinct values for filter chips.
export const FIELDS = [...new Set(PEOPLE.map(p => p.field))].sort();
export const GENDERS = [...new Set(PEOPLE.map(p => p.gender))].sort();
export const ERAS = [
  { label: 'Pre-1900', min: 0, max: 1899 },
  { label: '1900–1949', min: 1900, max: 1949 },
  { label: '1950–1979', min: 1950, max: 1979 },
  { label: '1980–1999', min: 1980, max: 1999 },
  { label: '2000+', min: 2000, max: 9999 },
];
