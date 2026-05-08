// Mock dataset of famous people, structured to support faceted search.
// Schema per entry:
//   id, name, gender, birthYear, birthPlace, country, field, subfield,
//   teams: [{ name, years: [start, end] }],
//   awards: [{ name, year }],
//   collaborators: [string],
//   bio: short editorial line.

export const PEOPLE = [

  // =====================================================================
  //  NBA — 100 players, ordered by birth year
  // =====================================================================
  { id:'george-mikan', name:'George Mikan', gender:'male', birthYear:1924, birthPlace:'Joliet, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minneapolis Lakers',years:[1948,1956]}], awards:[{name:'NBA Champion',year:1949},{name:'NBA Champion',year:1950}],
    collaborators:['Vern Mikkelsen','Jim Pollard'], bio:'The original NBA superstar; five-time pro champion with the Minneapolis Lakers.' },

  { id:'bob-cousy', name:'Bob Cousy', gender:'male', birthYear:1928, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1950,1963]}], awards:[{name:'NBA MVP',year:1957},{name:'NBA Champion',year:1957}],
    collaborators:['Bill Russell','Red Auerbach'], bio:'Six-time NBA champion playmaker and the league\'s first great point guard.' },

  { id:'bob-pettit', name:'Bob Pettit', gender:'male', birthYear:1932, birthPlace:'Baton Rouge, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'St. Louis Hawks',years:[1954,1965]}], awards:[{name:'NBA MVP',year:1956},{name:'NBA Champion',year:1958}],
    collaborators:['Cliff Hagan','Slater Martin'], bio:'First player to score 20,000 NBA points; led the Hawks to their lone title.' },

  { id:'bill-russell', name:'Bill Russell', gender:'male', birthYear:1934, birthPlace:'West Monroe, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1956,1969]}], awards:[{name:'NBA MVP',year:1958},{name:'NBA Champion',year:1957}],
    collaborators:['Bob Cousy','John Havlicek','K. C. Jones'], bio:'Eleven-time NBA champion and the defensive heartbeat of the Celtics dynasty.' },

  { id:'elgin-baylor', name:'Elgin Baylor', gender:'male', birthYear:1934, birthPlace:'Washington, D.C.', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minneapolis Lakers',years:[1958,1960]},{name:'Los Angeles Lakers',years:[1960,1971]}], awards:[{name:'NBA Rookie of the Year',year:1959}],
    collaborators:['Jerry West','Wilt Chamberlain'], bio:'High-flying forward who transformed scoring before the league knew what to call it.' },

  { id:'wilt-chamberlain', name:'Wilt Chamberlain', gender:'male', birthYear:1936, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia Warriors',years:[1959,1962]},{name:'Philadelphia 76ers',years:[1965,1968]},{name:'Los Angeles Lakers',years:[1968,1973]}],
    awards:[{name:'NBA MVP',year:1960},{name:'NBA Champion',year:1967}],
    collaborators:['Jerry West','Hal Greer'], bio:'Once scored 100 points in a single NBA game; statistically singular.' },

  { id:'oscar-robertson', name:'Oscar Robertson', gender:'male', birthYear:1938, birthPlace:'Charlotte, Tennessee', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cincinnati Royals',years:[1960,1970]},{name:'Milwaukee Bucks',years:[1970,1974]}], awards:[{name:'NBA MVP',year:1964},{name:'NBA Champion',year:1971}],
    collaborators:['Kareem Abdul-Jabbar','Jerry Lucas'], bio:'The Big O — first player to average a triple-double over a full season.' },

  { id:'jerry-west', name:'Jerry West', gender:'male', birthYear:1938, birthPlace:'Chelyan, West Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1960,1974]}], awards:[{name:'NBA Champion',year:1972}],
    collaborators:['Elgin Baylor','Wilt Chamberlain'], bio:'The Logo — silhouetted on the NBA emblem; later a legendary executive.' },

  { id:'john-havlicek', name:'John Havlicek', gender:'male', birthYear:1940, birthPlace:'Martins Ferry, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1962,1978]}], awards:[{name:'NBA Champion',year:1963},{name:'NBA Finals MVP',year:1974}],
    collaborators:['Bill Russell','Dave Cowens'], bio:'Eight-time champion forward — "Havlicek stole the ball!"' },

  { id:'willis-reed', name:'Willis Reed', gender:'male', birthYear:1942, birthPlace:'Hico, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1964,1974]}], awards:[{name:'NBA MVP',year:1970},{name:'NBA Champion',year:1970}],
    collaborators:['Walt Frazier','Bill Bradley'], bio:'Knicks captain who limped onto the floor for Game 7 in 1970 and inspired a city.' },

  { id:'walt-frazier', name:'Walt Frazier', gender:'male', birthYear:1945, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1967,1977]},{name:'Cleveland Cavaliers',years:[1977,1980]}], awards:[{name:'NBA Champion',year:1970}],
    collaborators:['Willis Reed','Earl Monroe'], bio:'Cool-as-Clyde Knicks guard with the silkiest jumper of his era.' },

  { id:'rick-barry', name:'Rick Barry', gender:'male', birthYear:1944, birthPlace:'Elizabeth, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Francisco Warriors',years:[1965,1967]},{name:'Golden State Warriors',years:[1972,1978]}], awards:[{name:'NBA Finals MVP',year:1975}],
    collaborators:['Nate Thurmond','Jamaal Wilkes'], bio:'Underhand free-throw shooter and a 1975 Finals MVP.' },

  { id:'pete-maravich', name:'Pete Maravich', gender:'male', birthYear:1947, birthPlace:'Aliquippa, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[1970,1974]},{name:'New Orleans Jazz',years:[1974,1979]}], awards:[],
    collaborators:['Lou Hudson'], bio:'Pistol Pete — a one-man circus of dribbling and showmanship.' },

  { id:'kareem-abdul-jabbar', name:'Kareem Abdul-Jabbar', gender:'male', birthYear:1947, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[1969,1975]},{name:'Los Angeles Lakers',years:[1975,1989]}],
    awards:[{name:'NBA MVP',year:1971},{name:'NBA Champion',year:1971},{name:'NBA Champion',year:1985}],
    collaborators:['Magic Johnson','Oscar Robertson','James Worthy'], bio:'Six-time MVP and master of the unblockable skyhook.' },

  { id:'julius-erving', name:'Julius Erving', gender:'male', birthYear:1950, birthPlace:'East Meadow, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1976,1987]}], awards:[{name:'NBA MVP',year:1981},{name:'NBA Champion',year:1983}],
    collaborators:['Moses Malone','Maurice Cheeks'], bio:'Dr. J — the man who made dunking an art form.' },

  { id:'robert-parish', name:'Robert Parish', gender:'male', birthYear:1953, birthPlace:'Shreveport, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1980,1994]},{name:'Chicago Bulls',years:[1996,1997]}], awards:[{name:'NBA Champion',year:1981}],
    collaborators:['Larry Bird','Kevin McHale','Michael Jordan'], bio:'The Chief — anchored Boston\'s 1980s frontcourt and won a fourth ring with Chicago.' },

  { id:'moses-malone', name:'Moses Malone', gender:'male', birthYear:1955, birthPlace:'Petersburg, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[1976,1982]},{name:'Philadelphia 76ers',years:[1982,1986]}],
    awards:[{name:'NBA MVP',year:1979},{name:'NBA Champion',year:1983}],
    collaborators:['Julius Erving','Maurice Cheeks'], bio:'Three-time MVP and the original prep-to-pro big man.' },

  { id:'larry-bird', name:'Larry Bird', gender:'male', birthYear:1956, birthPlace:'West Baden Springs, Indiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1979,1992]}], awards:[{name:'NBA MVP',year:1984},{name:'NBA Champion',year:1981}],
    collaborators:['Kevin McHale','Robert Parish'], bio:'The Hick from French Lick — three-time MVP and Magic\'s eternal foil.' },

  { id:'kevin-mchale', name:'Kevin McHale', gender:'male', birthYear:1957, birthPlace:'Hibbing, Minnesota', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1980,1993]}], awards:[{name:'NBA Champion',year:1981}],
    collaborators:['Larry Bird','Robert Parish'], bio:'Owner of the most unstoppable low-post footwork of the 1980s.' },

  { id:'magic-johnson', name:'Magic Johnson', gender:'male', birthYear:1959, birthPlace:'Lansing, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1979,1991]}], awards:[{name:'NBA MVP',year:1987},{name:'NBA Champion',year:1980}],
    collaborators:['Kareem Abdul-Jabbar','James Worthy','Byron Scott'], bio:'Showtime point guard who made the no-look pass mainstream.' },

  { id:'dominique-wilkins', name:'Dominique Wilkins', gender:'male', birthYear:1960, birthPlace:'Paris, France', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[1982,1994]},{name:'Boston Celtics',years:[1994,1995]}], awards:[],
    collaborators:['Spud Webb'], bio:'The Human Highlight Film — Hawks legend born in Paris while his father served overseas.' },

  { id:'james-worthy', name:'James Worthy', gender:'male', birthYear:1961, birthPlace:'Gastonia, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1982,1994]}], awards:[{name:'NBA Finals MVP',year:1988},{name:'NBA Champion',year:1985}],
    collaborators:['Magic Johnson','Kareem Abdul-Jabbar'], bio:'Big Game James — Showtime\'s third star and a 1988 Finals MVP.' },

  { id:'isiah-thomas', name:'Isiah Thomas', gender:'male', birthYear:1961, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1981,1994]}], awards:[{name:'NBA Champion',year:1989},{name:'NBA Finals MVP',year:1990}],
    collaborators:['Joe Dumars','Dennis Rodman','Bill Laimbeer'], bio:'Pistons captain born on Chicago\'s West Side; Bad Boy in chief.' },

  { id:'patrick-ewing', name:'Patrick Ewing', gender:'male', birthYear:1962, birthPlace:'Kingston, Jamaica', country:'Jamaica', field:'Sports', subfield:'NBA',
    teams:[{name:'New York Knicks',years:[1985,2000]},{name:'Seattle SuperSonics',years:[2000,2001]}], awards:[{name:'NBA Rookie of the Year',year:1986}],
    collaborators:['John Starks','Charles Oakley'], bio:'Knicks franchise center; immigrated from Jamaica as a child.' },

  { id:'clyde-drexler', name:'Clyde Drexler', gender:'male', birthYear:1962, birthPlace:'New Orleans, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Portland Trail Blazers',years:[1983,1995]},{name:'Houston Rockets',years:[1995,1998]}], awards:[{name:'NBA Champion',year:1995}],
    collaborators:['Hakeem Olajuwon','Terry Porter'], bio:'Clyde the Glide — won a ring back home in Houston with Olajuwon.' },

  { id:'john-stockton', name:'John Stockton', gender:'male', birthYear:1962, birthPlace:'Spokane, Washington', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[1984,2003]}], awards:[],
    collaborators:['Karl Malone','Jeff Hornacek'], bio:'NBA all-time leader in assists and steals; never moved cities.' },

  { id:'hakeem-olajuwon', name:'Hakeem Olajuwon', gender:'male', birthYear:1963, birthPlace:'Lagos, Nigeria', country:'Nigeria', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[1984,2001]},{name:'Toronto Raptors',years:[2001,2002]}],
    awards:[{name:'NBA MVP',year:1994},{name:'NBA Champion',year:1994}],
    collaborators:['Clyde Drexler','Robert Horry'], bio:'The Dream — back-to-back champion and footwork tutor to a generation.' },

  { id:'michael-jordan', name:'Michael Jordan', gender:'male', birthYear:1963, birthPlace:'Brooklyn, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1984,1998]},{name:'Washington Wizards',years:[2001,2003]}],
    awards:[{name:'NBA MVP',year:1988},{name:'NBA Champion',year:1991},{name:'NBA Champion',year:1996}],
    collaborators:['Scottie Pippen','Dennis Rodman','Phil Jackson'], bio:'Six-time NBA champion, widely regarded as the greatest of all time.' },

  { id:'charles-barkley', name:'Charles Barkley', gender:'male', birthYear:1963, birthPlace:'Leeds, Alabama', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1984,1992]},{name:'Phoenix Suns',years:[1992,1996]},{name:'Houston Rockets',years:[1996,2000]}],
    awards:[{name:'NBA MVP',year:1993}], collaborators:['Hakeem Olajuwon','Kevin Johnson'], bio:'Round Mound of Rebound; later, the most quotable analyst on television.' },

  { id:'joe-dumars', name:'Joe Dumars', gender:'male', birthYear:1963, birthPlace:'Shreveport, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1985,1999]}], awards:[{name:'NBA Finals MVP',year:1989}],
    collaborators:['Isiah Thomas','Bill Laimbeer'], bio:'Pistons backcourt sentinel and 1989 Finals MVP.' },

  { id:'karl-malone', name:'Karl Malone', gender:'male', birthYear:1963, birthPlace:'Summerfield, Louisiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[1985,2003]},{name:'Los Angeles Lakers',years:[2003,2004]}],
    awards:[{name:'NBA MVP',year:1997}], collaborators:['John Stockton','Jeff Hornacek'], bio:'The Mailman — second-leading scorer in NBA history at his retirement.' },

  { id:'scottie-pippen', name:'Scottie Pippen', gender:'male', birthYear:1965, birthPlace:'Hamburg, Arkansas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1987,1998]},{name:'Houston Rockets',years:[1998,1999]},{name:'Portland Trail Blazers',years:[1999,2003]}],
    awards:[{name:'NBA Champion',year:1991}], collaborators:['Michael Jordan','Dennis Rodman','Phil Jackson'],
    bio:'Six-time NBA champion and defensive cornerstone of the Bulls dynasty.' },

  { id:'reggie-miller', name:'Reggie Miller', gender:'male', birthYear:1965, birthPlace:'Riverside, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Indiana Pacers',years:[1987,2005]}], awards:[],
    collaborators:['Mark Jackson','Rik Smits'], bio:'Heartbreaker from deep — eight points in nine seconds against the Knicks.' },

  { id:'david-robinson', name:'David Robinson', gender:'male', birthYear:1965, birthPlace:'Key West, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[1989,2003]}], awards:[{name:'NBA MVP',year:1995},{name:'NBA Champion',year:1999}],
    collaborators:['Tim Duncan','Sean Elliott'], bio:'The Admiral — Naval Academy graduate turned Spurs cornerstone.' },

  { id:'mitch-richmond', name:'Mitch Richmond', gender:'male', birthYear:1965, birthPlace:'Fort Lauderdale, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[1991,1998]},{name:'Washington Wizards',years:[1998,2001]},{name:'Los Angeles Lakers',years:[2001,2002]}],
    awards:[{name:'NBA Champion',year:2002}], collaborators:['Kobe Bryant','Shaquille O\'Neal'], bio:'Six-time All-Star; finally a champion in his Lakers swan song.' },

  { id:'steve-kerr', name:'Steve Kerr', gender:'male', birthYear:1965, birthPlace:'Beirut, Lebanon', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1993,1998]},{name:'San Antonio Spurs',years:[1998,2001]}], awards:[{name:'NBA Champion',year:1996}],
    collaborators:['Michael Jordan','Tim Duncan','Phil Jackson'], bio:'Five-time NBA champion as a player; later head coach of the Warriors dynasty.' },

  { id:'gary-payton', name:'Gary Payton', gender:'male', birthYear:1968, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Seattle SuperSonics',years:[1990,2003]},{name:'Miami Heat',years:[2005,2007]}], awards:[{name:'NBA Champion',year:2006}],
    collaborators:['Shawn Kemp','Dwyane Wade'], bio:'The Glove — trash-talking lockdown guard and 2006 Heat champion.' },

  { id:'toni-kukoc', name:'Toni Kukoč', gender:'male', birthYear:1968, birthPlace:'Split, Croatia', country:'Croatia', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[1993,2000]}], awards:[{name:'NBA Sixth Man of the Year',year:1996}],
    collaborators:['Michael Jordan','Scottie Pippen'], bio:'Croatian forward and three-time NBA champion with the Bulls.' },

  { id:'shawn-kemp', name:'Shawn Kemp', gender:'male', birthYear:1969, birthPlace:'Elkhart, Indiana', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Seattle SuperSonics',years:[1989,1997]},{name:'Cleveland Cavaliers',years:[1997,2000]}], awards:[],
    collaborators:['Gary Payton'], bio:'The Reign Man — gravity-optional dunker of the Sonics era.' },

  { id:'alonzo-mourning', name:'Alonzo Mourning', gender:'male', birthYear:1970, birthPlace:'Chesapeake, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Charlotte Hornets',years:[1992,1995]},{name:'Miami Heat',years:[1995,2002]},{name:'Miami Heat',years:[2005,2008]}],
    awards:[{name:'NBA Champion',year:2006}], collaborators:['Dwyane Wade','Tim Hardaway'], bio:'Heat franchise pillar who won a title after a kidney transplant.' },

  { id:'penny-hardaway', name:'Penny Hardaway', gender:'male', birthYear:1971, birthPlace:'Memphis, Tennessee', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[1993,1999]},{name:'Phoenix Suns',years:[1999,2004]}], awards:[],
    collaborators:['Shaquille O\'Neal','Nick Anderson'], bio:'Lithe Magic point guard and 90s sneaker icon.' },

  { id:'shaquille-oneal', name:"Shaquille O'Neal", gender:'male', birthYear:1972, birthPlace:'Newark, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[1992,1996]},{name:'Los Angeles Lakers',years:[1996,2004]},{name:'Miami Heat',years:[2004,2008]}],
    awards:[{name:'NBA MVP',year:2000},{name:'NBA Champion',year:2000}], collaborators:['Kobe Bryant','Dwyane Wade','Penny Hardaway'],
    bio:'Four-time NBA champion and the most physically dominant center of the modern era.' },

  { id:'grant-hill', name:'Grant Hill', gender:'male', birthYear:1972, birthPlace:'Dallas, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1994,2000]},{name:'Orlando Magic',years:[2000,2007]},{name:'Phoenix Suns',years:[2007,2012]}],
    awards:[{name:'NBA Rookie of the Year',year:1995}], collaborators:['Steve Nash','Tracy McGrady'], bio:'Smooth point-forward whose career was derailed and reborn by injury.' },

  { id:'chris-webber', name:'Chris Webber', gender:'male', birthYear:1973, birthPlace:'Detroit, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[1998,2005]},{name:'Golden State Warriors',years:[1993,1994]},{name:'Washington Bullets',years:[1994,1998]}],
    awards:[{name:'NBA Rookie of the Year',year:1994}], collaborators:['Mike Bibby','Vlade Divac'], bio:'Fab Five forward and face of the early-2000s Kings.' },

  { id:'jason-kidd', name:'Jason Kidd', gender:'male', birthYear:1973, birthPlace:'San Francisco, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[1994,1996]},{name:'Phoenix Suns',years:[1996,2001]},{name:'New Jersey Nets',years:[2001,2008]},{name:'Dallas Mavericks',years:[2008,2012]}],
    awards:[{name:'NBA Champion',year:2011}], collaborators:['Dirk Nowitzki','Vince Carter'], bio:'Triple-double engine and 2011 champion alongside Dirk in Dallas.' },

  { id:'steve-nash', name:'Steve Nash', gender:'male', birthYear:1974, birthPlace:'Johannesburg, South Africa', country:'Canada', field:'Sports', subfield:'NBA',
    teams:[{name:'Phoenix Suns',years:[1996,1998]},{name:'Dallas Mavericks',years:[1998,2004]},{name:'Phoenix Suns',years:[2004,2012]}],
    awards:[{name:'NBA MVP',year:2005},{name:'NBA MVP',year:2006}], collaborators:['Amar\'e Stoudemire','Dirk Nowitzki','Grant Hill'],
    bio:'Two-time MVP born in Johannesburg, raised in Canada.' },

  { id:'allen-iverson', name:'Allen Iverson', gender:'male', birthYear:1975, birthPlace:'Hampton, Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[1996,2006]},{name:'Denver Nuggets',years:[2006,2008]}], awards:[{name:'NBA MVP',year:2001}],
    collaborators:['Larry Brown'], bio:'The Answer — 6-foot warrior who carried the 76ers to the 2001 Finals.' },

  { id:'ray-allen', name:'Ray Allen', gender:'male', birthYear:1975, birthPlace:'Merced, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[1996,2003]},{name:'Seattle SuperSonics',years:[2003,2007]},{name:'Boston Celtics',years:[2007,2012]},{name:'Miami Heat',years:[2012,2014]}],
    awards:[{name:'NBA Champion',year:2008},{name:'NBA Champion',year:2013}],
    collaborators:['Paul Pierce','Kevin Garnett','LeBron James','Dwyane Wade'], bio:'Author of the most clutch corner three in NBA history.' },

  { id:'kevin-garnett', name:'Kevin Garnett', gender:'male', birthYear:1976, birthPlace:'Mauldin, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[1995,2007]},{name:'Boston Celtics',years:[2007,2013]},{name:'Brooklyn Nets',years:[2013,2015]}],
    awards:[{name:'NBA MVP',year:2004},{name:'NBA Champion',year:2008}], collaborators:['Paul Pierce','Ray Allen'], bio:'Anything is possible — first prep-to-pro star of the modern era.' },

  { id:'tim-duncan', name:'Tim Duncan', gender:'male', birthYear:1976, birthPlace:'Christiansted, U.S. Virgin Islands', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[1997,2016]}], awards:[{name:'NBA MVP',year:2002},{name:'NBA Champion',year:1999}],
    collaborators:['David Robinson','Tony Parker','Manu Ginobili'], bio:'The Big Fundamental — five-time champion who did everything correctly.' },

  { id:'manu-ginobili', name:'Manu Ginóbili', gender:'male', birthYear:1977, birthPlace:'Bahía Blanca, Argentina', country:'Argentina', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2002,2018]}], awards:[{name:'NBA Champion',year:2003}],
    collaborators:['Tim Duncan','Tony Parker'], bio:'Argentine sixth-man savant and four-time Spurs champion.' },

  { id:'vince-carter', name:'Vince Carter', gender:'male', birthYear:1977, birthPlace:'Daytona Beach, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[1998,2004]},{name:'New Jersey Nets',years:[2004,2009]}], awards:[{name:'NBA Slam Dunk Contest Champion',year:2000}],
    collaborators:['Tracy McGrady','Jason Kidd'], bio:'Half Man Half Amazing — only player to suit up across four decades.' },

  { id:'kobe-bryant', name:'Kobe Bryant', gender:'male', birthYear:1978, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Lakers',years:[1996,2016]}], awards:[{name:'NBA MVP',year:2008},{name:'NBA Champion',year:2000},{name:'NBA Champion',year:2009}],
    collaborators:['Shaquille O\'Neal','Pau Gasol'], bio:'Mamba Mentality embodied — five-time champion and 81-point night.' },

  { id:'paul-pierce', name:'Paul Pierce', gender:'male', birthYear:1977, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[1998,2013]}], awards:[{name:'NBA Finals MVP',year:2008},{name:'NBA Champion',year:2008}],
    collaborators:['Kevin Garnett','Ray Allen'], bio:'The Truth — 2008 Finals MVP and Boston\'s 21st-century icon.' },

  { id:'dirk-nowitzki', name:'Dirk Nowitzki', gender:'male', birthYear:1978, birthPlace:'Würzburg, Germany', country:'Germany', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[1998,2019]}], awards:[{name:'NBA MVP',year:2007},{name:'NBA Champion',year:2011}],
    collaborators:['Jason Kidd','Steve Nash'], bio:'German seven-footer who bent the league\'s shape with his fadeaway.' },

  { id:'tracy-mcgrady', name:'Tracy McGrady', gender:'male', birthYear:1979, birthPlace:'Bartow, Florida', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[1997,2000]},{name:'Orlando Magic',years:[2000,2004]},{name:'Houston Rockets',years:[2004,2010]}], awards:[],
    collaborators:['Vince Carter','Yao Ming'], bio:'13-points-in-35-seconds T-Mac; cousin and rival of Vince Carter.' },

  { id:'yao-ming', name:'Yao Ming', gender:'male', birthYear:1980, birthPlace:'Shanghai, China', country:'China', field:'Sports', subfield:'NBA',
    teams:[{name:'Houston Rockets',years:[2002,2011]}], awards:[],
    collaborators:['Tracy McGrady'], bio:'7-foot-6 Chinese star who opened the NBA to a continent.' },

  { id:'pau-gasol', name:'Pau Gasol', gender:'male', birthYear:1980, birthPlace:'Barcelona, Spain', country:'Spain', field:'Sports', subfield:'NBA',
    teams:[{name:'Memphis Grizzlies',years:[2001,2008]},{name:'Los Angeles Lakers',years:[2008,2014]}],
    awards:[{name:'NBA Champion',year:2009},{name:'NBA Champion',year:2010}], collaborators:['Kobe Bryant'],
    bio:'Skilled Spanish big man who won back-to-back rings beside Kobe.' },

  { id:'beyonce-skip', name:'__skip__', gender:'female', birthYear:0, birthPlace:'', country:'', field:'__skip__', subfield:'', teams:[], awards:[], collaborators:[], bio:'' },

  { id:'tony-parker', name:'Tony Parker', gender:'male', birthYear:1982, birthPlace:'Bruges, Belgium', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2001,2018]}], awards:[{name:'NBA Champion',year:2003},{name:'NBA Finals MVP',year:2007}],
    collaborators:['Tim Duncan','Manu Ginobili'], bio:'French floor general and 2007 Finals MVP.' },

  { id:'dwyane-wade', name:'Dwyane Wade', gender:'male', birthYear:1982, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Miami Heat',years:[2003,2016]},{name:'Chicago Bulls',years:[2016,2017]}],
    awards:[{name:'NBA Finals MVP',year:2006},{name:'NBA Champion',year:2006}],
    collaborators:['Shaquille O\'Neal','LeBron James','Chris Bosh'], bio:'Flash — Miami\'s favorite son, born on the South Side of Chicago.' },

  { id:'lebron-james', name:'LeBron James', gender:'male', birthYear:1984, birthPlace:'Akron, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cleveland Cavaliers',years:[2003,2010]},{name:'Miami Heat',years:[2010,2014]},{name:'Cleveland Cavaliers',years:[2014,2018]},{name:'Los Angeles Lakers',years:[2018,2025]}],
    awards:[{name:'NBA MVP',year:2009},{name:'NBA Champion',year:2012},{name:'NBA Champion',year:2016}],
    collaborators:['Dwyane Wade','Anthony Davis','Kyrie Irving'], bio:'Four-time NBA champion and the all-time leading scorer.' },

  { id:'carmelo-anthony', name:'Carmelo Anthony', gender:'male', birthYear:1984, birthPlace:'Brooklyn, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Denver Nuggets',years:[2003,2011]},{name:'New York Knicks',years:[2011,2017]}], awards:[],
    collaborators:['Allen Iverson','Amar\'e Stoudemire'], bio:'Smooth-shouldered Olympic three-peat scorer.' },

  { id:'chris-paul', name:'Chris Paul', gender:'male', birthYear:1985, birthPlace:'Winston-Salem, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Hornets',years:[2005,2011]},{name:'Los Angeles Clippers',years:[2011,2017]},{name:'Phoenix Suns',years:[2020,2023]}], awards:[],
    collaborators:['Blake Griffin','Devin Booker'], bio:'CP3 — preternatural floor general and 12-time All-Star.' },

  { id:'dwight-howard', name:'Dwight Howard', gender:'male', birthYear:1985, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[2004,2012]},{name:'Los Angeles Lakers',years:[2012,2013]},{name:'Los Angeles Lakers',years:[2019,2020]}],
    awards:[{name:'NBA Champion',year:2020}], collaborators:['LeBron James','Anthony Davis'],
    bio:'Superman of the late 2000s; champion in the bubble.' },

  { id:'derrick-rose', name:'Derrick Rose', gender:'male', birthYear:1988, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2008,2016]},{name:'New York Knicks',years:[2016,2017]}], awards:[{name:'NBA MVP',year:2011}],
    collaborators:['Joakim Noah','Luol Deng'], bio:'Youngest MVP in NBA history; born and raised in Chicago.' },

  { id:'russell-westbrook', name:'Russell Westbrook', gender:'male', birthYear:1988, birthPlace:'Long Beach, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2008,2019]},{name:'Houston Rockets',years:[2019,2020]},{name:'Los Angeles Lakers',years:[2021,2023]}],
    awards:[{name:'NBA MVP',year:2017}], collaborators:['Kevin Durant','James Harden','Paul George'], bio:'Triple-double machine; averaged one for an entire 2017 season.' },

  { id:'kevin-durant', name:'Kevin Durant', gender:'male', birthYear:1988, birthPlace:'Washington, D.C.', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2008,2016]},{name:'Golden State Warriors',years:[2016,2019]},{name:'Brooklyn Nets',years:[2019,2023]},{name:'Phoenix Suns',years:[2023,2025]}],
    awards:[{name:'NBA MVP',year:2014},{name:'NBA Champion',year:2017},{name:'NBA Champion',year:2018}],
    collaborators:['Stephen Curry','Russell Westbrook','James Harden','Klay Thompson','Draymond Green'],
    bio:'Slim Reaper — 7-foot scorer who joined the Warriors and won twice.' },

  { id:'stephen-curry', name:'Stephen Curry', gender:'male', birthYear:1988, birthPlace:'Akron, Ohio', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2009,2025]}], awards:[{name:'NBA MVP',year:2015},{name:'NBA Champion',year:2015}],
    collaborators:['Klay Thompson','Draymond Green','Steve Kerr','Kevin Durant'], bio:'Greatest shooter in NBA history.' },

  { id:'jimmy-butler', name:'Jimmy Butler', gender:'male', birthYear:1989, birthPlace:'Houston, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2011,2017]},{name:'Philadelphia 76ers',years:[2018,2019]},{name:'Miami Heat',years:[2019,2025]}], awards:[],
    collaborators:['Bam Adebayo','Joel Embiid'], bio:'Late-blooming star who twice carried the Heat to the Finals.' },

  { id:'james-harden', name:'James Harden', gender:'male', birthYear:1989, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2009,2012]},{name:'Houston Rockets',years:[2012,2021]},{name:'Brooklyn Nets',years:[2021,2022]},{name:'Philadelphia 76ers',years:[2022,2023]}],
    awards:[{name:'NBA MVP',year:2018}], collaborators:['Kevin Durant','Russell Westbrook','Chris Paul'], bio:'The Beard — eurostep architect and 2018 MVP.' },

  { id:'demar-derozan', name:'DeMar DeRozan', gender:'male', birthYear:1989, birthPlace:'Compton, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[2009,2018]},{name:'San Antonio Spurs',years:[2018,2021]},{name:'Chicago Bulls',years:[2021,2024]}], awards:[],
    collaborators:['Kyle Lowry'], bio:'Mid-range purist who took Toronto from afterthought to powerhouse.' },

  { id:'paul-george', name:'Paul George', gender:'male', birthYear:1990, birthPlace:'Palmdale, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Indiana Pacers',years:[2010,2017]},{name:'Oklahoma City Thunder',years:[2017,2019]},{name:'Los Angeles Clippers',years:[2019,2024]}], awards:[],
    collaborators:['Kawhi Leonard','Russell Westbrook'], bio:'PG-13 — two-way wing who returned from a horrific 2014 leg break.' },

  { id:'klay-thompson', name:'Klay Thompson', gender:'male', birthYear:1990, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2011,2024]}], awards:[{name:'NBA Champion',year:2015}],
    collaborators:['Stephen Curry','Draymond Green'], bio:'Half of the Splash Brothers; once dropped 37 in a single quarter.' },

  { id:'draymond-green', name:'Draymond Green', gender:'male', birthYear:1990, birthPlace:'Saginaw, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Golden State Warriors',years:[2012,2025]}], awards:[{name:'NBA Defensive Player of the Year',year:2017}],
    collaborators:['Stephen Curry','Klay Thompson'], bio:'Defensive engine and emotional spark of the Warriors dynasty.' },

  { id:'damian-lillard', name:'Damian Lillard', gender:'male', birthYear:1990, birthPlace:'Oakland, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Portland Trail Blazers',years:[2012,2023]},{name:'Milwaukee Bucks',years:[2023,2025]}], awards:[],
    collaborators:['CJ McCollum','Giannis Antetokounmpo'], bio:'Logo-three legend; the only player whose buzzer-beater wave is its own emoji.' },

  { id:'kawhi-leonard', name:'Kawhi Leonard', gender:'male', birthYear:1991, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2011,2018]},{name:'Toronto Raptors',years:[2018,2019]},{name:'Los Angeles Clippers',years:[2019,2025]}],
    awards:[{name:'NBA Finals MVP',year:2014},{name:'NBA Finals MVP',year:2019}],
    collaborators:['Tim Duncan','Paul George'], bio:'The Klaw — two Finals MVPs with two different franchises.' },

  { id:'khris-middleton', name:'Khris Middleton', gender:'male', birthYear:1991, birthPlace:'Charleston, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[2013,2025]}], awards:[{name:'NBA Champion',year:2021}],
    collaborators:['Giannis Antetokounmpo','Jrue Holiday'], bio:'Bucks\' silky shotmaker and 2021 champion.' },

  { id:'kyrie-irving', name:'Kyrie Irving', gender:'male', birthYear:1992, birthPlace:'Melbourne, Australia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Cleveland Cavaliers',years:[2011,2017]},{name:'Boston Celtics',years:[2017,2019]},{name:'Brooklyn Nets',years:[2019,2023]},{name:'Dallas Mavericks',years:[2023,2025]}],
    awards:[{name:'NBA Champion',year:2016}], collaborators:['LeBron James','Kevin Durant'], bio:'Author of the most famous shot in Cleveland sports history.' },

  { id:'anthony-davis', name:'Anthony Davis', gender:'male', birthYear:1993, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Pelicans',years:[2012,2019]},{name:'Los Angeles Lakers',years:[2019,2025]}], awards:[{name:'NBA Champion',year:2020}],
    collaborators:['LeBron James'], bio:'Unibrow — Chicago-born two-way unicorn and 2020 champion.' },

  { id:'bradley-beal', name:'Bradley Beal', gender:'male', birthYear:1993, birthPlace:'St. Louis, Missouri', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Washington Wizards',years:[2012,2023]},{name:'Phoenix Suns',years:[2023,2025]}], awards:[],
    collaborators:['John Wall','Kevin Durant'], bio:'Smooth-shouldered scoring guard and longtime Wizards franchise face.' },

  { id:'giannis-antetokounmpo', name:'Giannis Antetokounmpo', gender:'male', birthYear:1994, birthPlace:'Athens, Greece', country:'Greece', field:'Sports', subfield:'NBA',
    teams:[{name:'Milwaukee Bucks',years:[2013,2025]}], awards:[{name:'NBA MVP',year:2019},{name:'NBA Finals MVP',year:2021},{name:'NBA Champion',year:2021}],
    collaborators:['Khris Middleton','Jrue Holiday'], bio:'Greek Freak — child of Nigerian immigrants who became Milwaukee\'s king.' },

  { id:'joel-embiid', name:'Joel Embiid', gender:'male', birthYear:1994, birthPlace:'Yaoundé, Cameroon', country:'Cameroon', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[2014,2025]}], awards:[{name:'NBA MVP',year:2023}],
    collaborators:['James Harden','Tyrese Maxey'], bio:'The Process — Cameroonian seven-footer turned Sixers franchise pillar.' },

  { id:'pascal-siakam', name:'Pascal Siakam', gender:'male', birthYear:1994, birthPlace:'Douala, Cameroon', country:'Cameroon', field:'Sports', subfield:'NBA',
    teams:[{name:'Toronto Raptors',years:[2016,2024]},{name:'Indiana Pacers',years:[2024,2025]}], awards:[{name:'NBA Champion',year:2019}],
    collaborators:['Kawhi Leonard','Kyle Lowry'], bio:'Cameroonian forward and 2019 Raptors champion.' },

  { id:'karl-anthony-towns', name:'Karl-Anthony Towns', gender:'male', birthYear:1995, birthPlace:'Edison, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[2015,2024]},{name:'New York Knicks',years:[2024,2025]}], awards:[{name:'NBA Rookie of the Year',year:2016}],
    collaborators:['Anthony Edwards'], bio:'Stretch big with one of the prettiest shooting touches at his size.' },

  { id:'nikola-jokic', name:'Nikola Jokić', gender:'male', birthYear:1995, birthPlace:'Sombor, Serbia', country:'Serbia', field:'Sports', subfield:'NBA',
    teams:[{name:'Denver Nuggets',years:[2015,2025]}], awards:[{name:'NBA MVP',year:2021},{name:'NBA Champion',year:2023},{name:'NBA Finals MVP',year:2023}],
    collaborators:['Jamal Murray'], bio:'Serbian center who reinvented what passing big men can do.' },

  { id:'devin-booker', name:'Devin Booker', gender:'male', birthYear:1996, birthPlace:'Grand Rapids, Michigan', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Phoenix Suns',years:[2015,2025]}], awards:[],
    collaborators:['Chris Paul','Kevin Durant'], bio:'Suns scorer who dropped 70 points before he was old enough to drink.' },

  { id:'donovan-mitchell', name:'Donovan Mitchell', gender:'male', birthYear:1996, birthPlace:'Elmsford, New York', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[2017,2022]},{name:'Cleveland Cavaliers',years:[2022,2025]}], awards:[],
    collaborators:['Rudy Gobert','Darius Garland'], bio:'Spida — combo guard with eye-popping playoff scoring runs.' },

  { id:'bam-adebayo', name:'Bam Adebayo', gender:'male', birthYear:1997, birthPlace:'Newark, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Miami Heat',years:[2017,2025]}], awards:[],
    collaborators:['Jimmy Butler'], bio:'Switchable Heat anchor and engine of two Finals runs.' },

  { id:'jayson-tatum', name:'Jayson Tatum', gender:'male', birthYear:1998, birthPlace:'St. Louis, Missouri', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Boston Celtics',years:[2017,2025]}], awards:[{name:'NBA Champion',year:2024}],
    collaborators:['Jaylen Brown'], bio:'Smooth-shouldered Celtics wing and 2024 NBA champion.' },

  { id:'trae-young', name:'Trae Young', gender:'male', birthYear:1998, birthPlace:'Lubbock, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Atlanta Hawks',years:[2018,2025]}], awards:[],
    collaborators:['Dejounte Murray'], bio:'Diminutive Hawks point guard and proud Madison Square Garden villain.' },

  { id:'shai-gilgeous-alexander', name:'Shai Gilgeous-Alexander', gender:'male', birthYear:1998, birthPlace:'Toronto, Ontario', country:'Canada', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Clippers',years:[2018,2019]},{name:'Oklahoma City Thunder',years:[2019,2025]}], awards:[],
    collaborators:['Chet Holmgren','Jalen Williams'], bio:'Canadian guard rebuilding the Thunder one stylish three at a time.' },

  { id:'luka-doncic', name:'Luka Dončić', gender:'male', birthYear:1999, birthPlace:'Ljubljana, Slovenia', country:'Slovenia', field:'Sports', subfield:'NBA',
    teams:[{name:'Dallas Mavericks',years:[2018,2025]},{name:'Los Angeles Lakers',years:[2025,2025]}], awards:[{name:'NBA Rookie of the Year',year:2019}],
    collaborators:['Kyrie Irving'], bio:'Slovenian wunderkind with a basketball IQ off the charts.' },

  { id:'ja-morant', name:'Ja Morant', gender:'male', birthYear:1999, birthPlace:'Dalzell, South Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Memphis Grizzlies',years:[2019,2025]}], awards:[{name:'NBA Rookie of the Year',year:2020}],
    collaborators:['Jaren Jackson Jr.'], bio:'Memphis blur capable of dunking on anyone in the building.' },

  { id:'zion-williamson', name:'Zion Williamson', gender:'male', birthYear:2000, birthPlace:'Salisbury, North Carolina', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'New Orleans Pelicans',years:[2019,2025]}], awards:[],
    collaborators:['Brandon Ingram'], bio:'285-pound force of nature; the most viral college player ever.' },

  { id:'tyrese-haliburton', name:'Tyrese Haliburton', gender:'male', birthYear:2000, birthPlace:'Oshkosh, Wisconsin', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Sacramento Kings',years:[2020,2022]},{name:'Indiana Pacers',years:[2022,2025]}], awards:[],
    collaborators:['Pascal Siakam'], bio:'Pace-pushing Pacers point guard and assist king of his draft class.' },

  { id:'lamelo-ball', name:'LaMelo Ball', gender:'male', birthYear:2001, birthPlace:'Anaheim, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Charlotte Hornets',years:[2020,2025]}], awards:[{name:'NBA Rookie of the Year',year:2021}],
    collaborators:['Brandon Miller'], bio:'Youngest of the Ball brothers and Hornets cornerstone.' },

  { id:'anthony-edwards', name:'Anthony Edwards', gender:'male', birthYear:2001, birthPlace:'Atlanta, Georgia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Minnesota Timberwolves',years:[2020,2025]}], awards:[],
    collaborators:['Karl-Anthony Towns','Rudy Gobert'], bio:'Atlanta-born Wolves star with a smile that lights up arenas.' },

  { id:'cade-cunningham', name:'Cade Cunningham', gender:'male', birthYear:2001, birthPlace:'Arlington, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[2021,2025]}], awards:[],
    collaborators:['Jaden Ivey'], bio:'Pistons floor general rebuilding the Bad Boys franchise from scratch.' },

  { id:'paolo-banchero', name:'Paolo Banchero', gender:'male', birthYear:2002, birthPlace:'Seattle, Washington', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Orlando Magic',years:[2022,2025]}], awards:[{name:'NBA Rookie of the Year',year:2023}],
    collaborators:['Franz Wagner'], bio:'Italian-American forward and Magic franchise centerpiece.' },

  { id:'victor-wembanyama', name:'Victor Wembanyama', gender:'male', birthYear:2004, birthPlace:'Le Chesnay, France', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'San Antonio Spurs',years:[2023,2025]}], awards:[{name:'NBA Rookie of the Year',year:2024}],
    collaborators:['Chris Paul'], bio:'7-foot-4 Frenchman bending defenses to physics-defying shapes.' },

  { id:'dennis-rodman', name:'Dennis Rodman', gender:'male', birthYear:1961, birthPlace:'Trenton, New Jersey', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Detroit Pistons',years:[1986,1993]},{name:'Chicago Bulls',years:[1995,1998]}], awards:[{name:'NBA Champion',year:1996}],
    collaborators:['Michael Jordan','Scottie Pippen','Isiah Thomas'], bio:'Five-time NBA champion and rebounding savant.' },

  { id:'jrue-holiday', name:'Jrue Holiday', gender:'male', birthYear:1990, birthPlace:'Mission Hills, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Philadelphia 76ers',years:[2009,2013]},{name:'New Orleans Pelicans',years:[2013,2020]},{name:'Milwaukee Bucks',years:[2020,2023]},{name:'Boston Celtics',years:[2023,2025]}],
    awards:[{name:'NBA Champion',year:2021},{name:'NBA Champion',year:2024}], collaborators:['Giannis Antetokounmpo','Jayson Tatum'],
    bio:'Two-way veteran point guard and back-to-back champion with two franchises.' },

  { id:'joakim-noah', name:'Joakim Noah', gender:'male', birthYear:1985, birthPlace:'New York, New York', country:'France', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2007,2016]},{name:'New York Knicks',years:[2016,2018]}], awards:[{name:'NBA Defensive Player of the Year',year:2014}],
    collaborators:['Derrick Rose','Luol Deng'], bio:'Son of tennis great Yannick Noah; defensive engine of the early-2010s Bulls.' },

  { id:'blake-griffin', name:'Blake Griffin', gender:'male', birthYear:1989, birthPlace:'Oklahoma City, Oklahoma', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Los Angeles Clippers',years:[2010,2018]},{name:'Detroit Pistons',years:[2018,2021]}], awards:[{name:'NBA Rookie of the Year',year:2011}],
    collaborators:['Chris Paul','DeAndre Jordan'], bio:'Lob-City headliner who once pogoed clean over a sedan.' },

  { id:'deron-williams', name:'Deron Williams', gender:'male', birthYear:1984, birthPlace:'Parkersburg, West Virginia', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Utah Jazz',years:[2005,2011]},{name:'Brooklyn Nets',years:[2011,2015]}], awards:[],
    collaborators:['Carlos Boozer'], bio:'Mid-2000s point guard often rated alongside Chris Paul in the early debate.' },

  // =====================================================================
  //  WOMEN POP STARS — 100, ordered roughly by birth year
  // =====================================================================
  { id:'billie-holiday', name:'Billie Holiday', gender:'female', birthYear:1915, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1987}],
    collaborators:['Lester Young','Count Basie'], bio:'Lady Day — voice that turned pain into the American songbook\'s defining standard.' },

  { id:'ella-fitzgerald', name:'Ella Fitzgerald', gender:'female', birthYear:1917, birthPlace:'Newport News, Virginia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Vocal Performance, Female',year:1959}],
    collaborators:['Louis Armstrong','Duke Ellington'], bio:'First Lady of Song; 14 Grammys and the unrivaled scat singer.' },

  { id:'peggy-lee', name:'Peggy Lee', gender:'female', birthYear:1920, birthPlace:'Jamestown, North Dakota', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1969}],
    collaborators:['Benny Goodman'], bio:'Sultry-voiced singer behind "Fever" and the songs of Disney\'s Lady and the Tramp.' },

  { id:'doris-day', name:'Doris Day', gender:'female', birthYear:1922, birthPlace:'Cincinnati, Ohio', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2008}],
    collaborators:['Les Brown'], bio:'Que sera, sera — biggest box-office star and sweetheart vocalist of the 1950s.' },

  { id:'sarah-vaughan', name:'Sarah Vaughan', gender:'female', birthYear:1924, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1983}],
    collaborators:['Dizzy Gillespie','Charlie Parker'], bio:'The Divine One — extraordinary range across pop and jazz standards.' },

  { id:'patsy-cline', name:'Patsy Cline', gender:'female', birthYear:1932, birthPlace:'Winchester, Virginia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Country Music Hall of Fame',year:1973}],
    collaborators:['Owen Bradley','Loretta Lynn'], bio:'Country-pop pioneer whose voice still aches on "Crazy."' },

  { id:'petula-clark', name:'Petula Clark', gender:'female', birthYear:1932, birthPlace:'Epsom, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rock and Roll Recording',year:1965}],
    collaborators:['Tony Hatch'], bio:'British belter who took "Downtown" to No. 1 in the U.S. in 1965.' },

  { id:'connie-francis', name:'Connie Francis', gender:'female', birthYear:1937, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'First woman to top the Billboard Hot 100; teen idol of "Who\'s Sorry Now."' },

  { id:'dusty-springfield', name:'Dusty Springfield', gender:'female', birthYear:1939, birthPlace:'Hampstead, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Rock and Roll Hall of Fame',year:1999}],
    collaborators:['Burt Bacharach','Pet Shop Boys'], bio:'Blue-eyed soul priestess — "Son of a Preacher Man" defined the genre.' },

  { id:'tina-turner', name:'Tina Turner', gender:'female', birthYear:1939, birthPlace:'Nutbush, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1985}],
    collaborators:['Ike Turner','David Bowie'], bio:'Queen of Rock \'n\' Roll; rose alone to dominate the 1980s charts.' },

  { id:'dionne-warwick', name:'Dionne Warwick', gender:'female', birthYear:1940, birthPlace:'East Orange, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:1968}],
    collaborators:['Burt Bacharach','Hal David'], bio:'Voice behind the Bacharach-David songbook; six-time Grammy winner.' },

  { id:'aretha-franklin', name:'Aretha Franklin', gender:'female', birthYear:1942, birthPlace:'Memphis, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:1994}],
    collaborators:['Curtis Mayfield','Luther Vandross'], bio:'The Queen of Soul; first woman inducted into the Rock and Roll Hall of Fame.' },

  { id:'carole-king', name:'Carole King', gender:'female', birthYear:1942, birthPlace:'Manhattan, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1972}],
    collaborators:['Gerry Goffin','James Taylor'], bio:'Songwriter\'s songwriter; "Tapestry" defined 1970s singer-songwriter pop.' },

  { id:'carly-simon', name:'Carly Simon', gender:'female', birthYear:1943, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Performance, Female',year:1972}],
    collaborators:['James Taylor','Mick Jagger'], bio:'You\'re So Vain — a generational anthem with a still-mysterious subject.' },

  { id:'joni-mitchell', name:'Joni Mitchell', gender:'female', birthYear:1943, birthPlace:'Fort Macleod, Alberta', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Album',year:1995}],
    collaborators:['James Taylor','Crosby, Stills, Nash & Young'], bio:'Canadian poet of folk-pop; reshaped what songwriting could do.' },

  { id:'diana-ross', name:'Diana Ross', gender:'female', birthYear:1944, birthPlace:'Detroit, Michigan', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2012}],
    collaborators:['Berry Gordy','Lionel Richie'], bio:'Supremes lead and Motown\'s defining pop star of the 1960s and 70s.' },

  { id:'debbie-harry', name:'Debbie Harry', gender:'female', birthYear:1945, birthPlace:'Miami, Florida', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Rock and Roll Hall of Fame',year:2006}],
    collaborators:['Chris Stein','Giorgio Moroder'], bio:'Blondie front and the cool-glance face of CBGB-era pop.' },

  { id:'cher', name:'Cher', gender:'female', birthYear:1946, birthPlace:'El Centro, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2000}],
    collaborators:['Sonny Bono'], bio:'Goddess of Pop — six decades of reinvention from Sonny & Cher to "Believe."' },

  { id:'linda-ronstadt', name:'Linda Ronstadt', gender:'female', birthYear:1946, birthPlace:'Tucson, Arizona', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Country Vocal Performance, Female',year:1976}],
    collaborators:['Emmylou Harris','Dolly Parton'], bio:'Genre-jumping vocalist — country, pop, mariachi, big-band.' },

  { id:'dolly-parton', name:'Dolly Parton', gender:'female', birthYear:1946, birthPlace:'Sevierville, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2011}],
    collaborators:['Porter Wagoner','Kenny Rogers','Linda Ronstadt'], bio:'Country-pop matriarch and the most generous philanthropist in Nashville.' },

  { id:'donna-summer', name:'Donna Summer', gender:'female', birthYear:1948, birthPlace:'Boston, Massachusetts', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Vocal Performance, Female',year:1979}],
    collaborators:['Giorgio Moroder'], bio:'Queen of Disco — "I Feel Love" essentially invented modern dance pop.' },

  { id:'olivia-newton-john', name:'Olivia Newton-John', gender:'female', birthYear:1948, birthPlace:'Cambridge, England', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1974}],
    collaborators:['John Travolta'], bio:'British-born Australian who turned Sandy in Grease into a chart juggernaut.' },

  { id:'stevie-nicks', name:'Stevie Nicks', gender:'female', birthYear:1948, birthPlace:'Phoenix, Arizona', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1978}],
    collaborators:['Lindsey Buckingham','Tom Petty'], bio:'Fleetwood Mac mystic and twirling solo icon of "Rumours" America.' },

  { id:'cyndi-lauper', name:'Cyndi Lauper', gender:'female', birthYear:1953, birthPlace:'Brooklyn, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1985}],
    collaborators:['Rob Hyman'], bio:'Girls Just Want to Have Fun — bursting Technicolor avatar of MTV pop.' },

  { id:'pat-benatar', name:'Pat Benatar', gender:'female', birthYear:1953, birthPlace:'Brooklyn, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Rock Vocal Performance',year:1980}],
    collaborators:['Neil Giraldo'], bio:'Hit Me With Your Best Shot — first woman in MTV\'s heaviest rotation.' },

  { id:'annie-lennox', name:'Annie Lennox', gender:'female', birthYear:1954, birthPlace:'Aberdeen, Scotland', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:1996}],
    collaborators:['Dave Stewart'], bio:'Eurythmics androgyne and four-octave belter of "Sweet Dreams."' },

  { id:'gloria-estefan', name:'Gloria Estefan', gender:'female', birthYear:1957, birthPlace:'Havana, Cuba', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Tropical Latin Album',year:1994}],
    collaborators:['Emilio Estefan'], bio:'Cuban-born conga rhythm-maker who put Miami sound on the global charts.' },

  { id:'kate-bush', name:'Kate Bush', gender:'female', birthYear:1958, birthPlace:'Bexleyheath, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Ivor Novello Award',year:2002}],
    collaborators:['David Gilmour'], bio:'Art-pop visionary whose "Running Up That Hill" charted twice, decades apart.' },

  { id:'belinda-carlisle', name:'Belinda Carlisle', gender:'female', birthYear:1958, birthPlace:'Hollywood, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jane Wiedlin'], bio:'Go-Go\'s lead and "Heaven Is a Place on Earth" solo star.' },

  { id:'madonna', name:'Madonna', gender:'female', birthYear:1958, birthPlace:'Bay City, Michigan', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Album',year:1999}],
    collaborators:['Stuart Price','William Orbit'], bio:'Material Girl — the model for every modern pop reinvention since 1983.' },

  { id:'sheryl-crow', name:'Sheryl Crow', gender:'female', birthYear:1962, birthPlace:'Kennett, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1995}],
    collaborators:['Stevie Nicks'], bio:'Sun-roof-down Americana pop and nine Grammys deep.' },

  { id:'whitney-houston', name:'Whitney Houston', gender:'female', birthYear:1963, birthPlace:'Newark, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1994}],
    collaborators:['Clive Davis','Mariah Carey'], bio:'The Voice — "I Will Always Love You" sat at No. 1 for 14 weeks.' },

  { id:'bjork', name:'Björk', gender:'female', birthYear:1965, birthPlace:'Reykjavík, Iceland', country:'Iceland', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for International Female Solo Artist',year:1996}],
    collaborators:['Mark Bell'], bio:'Icelandic art-pop alien; every album its own sonic country.' },

  { id:'tori-amos', name:'Tori Amos', gender:'female', birthYear:1963, birthPlace:'Newton, North Carolina', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Confessional piano-driven pop — "Cornflake Girl" and "Silent All These Years."' },

  { id:'shania-twain', name:'Shania Twain', gender:'female', birthYear:1965, birthPlace:'Windsor, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Country Album',year:1999}],
    collaborators:['Robert John "Mutt" Lange'], bio:'Best-selling country-pop crossover act of all time.' },

  { id:'janet-jackson', name:'Janet Jackson', gender:'female', birthYear:1966, birthPlace:'Gary, Indiana', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Long Form Music Video',year:1990}],
    collaborators:['Jimmy Jam','Terry Lewis'], bio:'Control — choreography-first pop monarch of the 1980s and 90s.' },

  { id:'toni-braxton', name:'Toni Braxton', gender:'female', birthYear:1967, birthPlace:'Severn, Maryland', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1994}],
    collaborators:['Babyface'], bio:'Smoke-and-velvet contralto behind "Un-Break My Heart."' },

  { id:'faith-hill', name:'Faith Hill', gender:'female', birthYear:1967, birthPlace:'Ridgeland, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Country Vocal Performance',year:2001}],
    collaborators:['Tim McGraw'], bio:'Country-pop crossover and one half of Nashville\'s power couple.' },

  { id:'celine-dion', name:'Céline Dion', gender:'female', birthYear:1968, birthPlace:'Charlemagne, Quebec', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:1999}],
    collaborators:['David Foster'], bio:'Quebec belter whose "My Heart Will Go On" launched a thousand karaoke nights.' },

  { id:'sarah-mclachlan', name:'Sarah McLachlan', gender:'female', birthYear:1968, birthPlace:'Halifax, Nova Scotia', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:1998}],
    collaborators:[], bio:'Founder of Lilith Fair and crystalline voice of late-90s adult-alternative.' },

  { id:'mary-j-blige', name:'Mary J. Blige', gender:'female', birthYear:1971, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Album',year:2007}],
    collaborators:['Diddy','Jay-Z'], bio:'Queen of Hip-Hop Soul; voice of the New York 90s.' },

  { id:'thalia', name:'Thalía', gender:'female', birthYear:1971, birthPlace:'Mexico City, Mexico', country:'Mexico', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Billboard Latin Music Award',year:2002}],
    collaborators:['Tony Bennett'], bio:'Queen of Latin Pop and former Timbiriche kid star.' },

  { id:'selena-quintanilla', name:'Selena Quintanilla', gender:'female', birthYear:1971, birthPlace:'Lake Jackson, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Mexican-American Album',year:1994}],
    collaborators:['A.B. Quintanilla'], bio:'Queen of Tejano — Latin pop\'s eternal what-might-have-been.' },

  { id:'gwen-stefani', name:'Gwen Stefani', gender:'female', birthYear:1969, birthPlace:'Fullerton, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Performance by a Duo or Group',year:2003}],
    collaborators:['Pharrell Williams','Eve'], bio:'No Doubt front and Hollaback solo princess.' },

  { id:'mariah-carey', name:'Mariah Carey', gender:'female', birthYear:1969, birthPlace:'Huntington, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1991}],
    collaborators:['Boyz II Men','Jermaine Dupri'], bio:'Whistle-register supreme — "All I Want for Christmas Is You" reigns annually.' },

  { id:'jennifer-lopez', name:'Jennifer Lopez', gender:'female', birthYear:1969, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Marc Anthony','Ja Rule'], bio:'Bronx-born triple-threat; dancer, actor, and Latin-pop crossover star.' },

  { id:'alanis-morissette', name:'Alanis Morissette', gender:'female', birthYear:1974, birthPlace:'Ottawa, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:1996}],
    collaborators:['Glen Ballard'], bio:'Jagged Little Pill remains the angriest mainstream pop record of the 90s.' },

  { id:'jewel', name:'Jewel', gender:'female', birthYear:1974, birthPlace:'Payson, Utah', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Alaskan singer-songwriter who lived in a van before "Pieces of You."' },

  { id:'sia', name:'Sia', gender:'female', birthYear:1975, birthPlace:'Adelaide, Australia', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'ARIA Award for Best Pop Release',year:2014}],
    collaborators:['David Guetta','Diplo'], bio:'Wig-shrouded Australian who writes hits for everyone, including herself.' },

  { id:'fergie', name:'Fergie', gender:'female', birthYear:1975, birthPlace:'Hacienda Heights, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Performance by a Duo or Group',year:2010}],
    collaborators:['will.i.am','Black Eyed Peas'], bio:'Black Eyed Peas frontwoman and "Big Girls Don\'t Cry" solo star.' },

  { id:'shakira', name:'Shakira', gender:'female', birthYear:1977, birthPlace:'Barranquilla, Colombia', country:'Colombia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Latin Pop Album',year:2006}],
    collaborators:['Wyclef Jean','Beyoncé'], bio:'Colombian hip-shaker who turned bilingual pop into a stadium event.' },

  { id:'fiona-apple', name:'Fiona Apple', gender:'female', birthYear:1977, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rock Performance',year:1998}],
    collaborators:['Jon Brion'], bio:'Confessional piano genius — "Fetch the Bolt Cutters" topped 2020 critics polls.' },

  { id:'nelly-furtado', name:'Nelly Furtado', gender:'female', birthYear:1978, birthPlace:'Victoria, British Columbia', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:2002}],
    collaborators:['Timbaland'], bio:'I\'m Like a Bird — Portuguese-Canadian pop reinvented herself with Timbaland.' },

  { id:'norah-jones', name:'Norah Jones', gender:'female', birthYear:1979, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2003}],
    collaborators:['Ravi Shankar (father)'], bio:'Daughter of Ravi Shankar; "Come Away With Me" swept the 2003 Grammys.' },

  { id:'pink', name:'P!nk', gender:'female', birthYear:1979, birthPlace:'Doylestown, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Female Pop Vocal Performance',year:2003}],
    collaborators:['Max Martin'], bio:'Aerialist pop-rocker who rewrote what stadium-pop choreography could be.' },

  { id:'brandy', name:'Brandy', gender:'female', birthYear:1979, birthPlace:'McComb, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance by a Duo or Group',year:1999}],
    collaborators:['Monica','Rodney Jerkins'], bio:'Vocal Bible — R&B-pop technician with one of the most copied harmonies of the 90s.' },

  { id:'robyn', name:'Robyn', gender:'female', birthYear:1979, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2010}],
    collaborators:['Röyksopp'], bio:'Swedish queen of crying-in-the-club electro-pop.' },

  { id:'sara-bareilles', name:'Sara Bareilles', gender:'female', birthYear:1979, birthPlace:'Eureka, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Piano-pop hitmaker turned Tony-nominated Broadway composer.' },

  { id:'monica', name:'Monica', gender:'female', birthYear:1980, birthPlace:'College Park, Georgia', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance by a Duo or Group',year:1999}],
    collaborators:['Brandy'], bio:'The Boy Is Mine — R&B-pop teen queen alongside Brandy.' },

  { id:'christina-aguilera', name:'Christina Aguilera', gender:'female', birthYear:1980, birthPlace:'Staten Island, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2007}],
    collaborators:['Linda Perry'], bio:'Genie-out-of-the-bottle pop belter and rival-twin to Britney.' },

  { id:'jessica-simpson', name:'Jessica Simpson', gender:'female', birthYear:1980, birthPlace:'Abilene, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Y2K pop ingénue and reality-TV originator with husband Nick Lachey.' },

  { id:'ashanti', name:'Ashanti', gender:'female', birthYear:1980, birthPlace:'Glen Cove, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Contemporary R&B Album',year:2003}],
    collaborators:['Ja Rule','Murder Inc.'], bio:'2002\'s ubiquitous pop-R&B feature; "Foolish" still hits.' },

  { id:'beyonce', name:'Beyoncé', gender:'female', birthYear:1981, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award',year:2023}],
    collaborators:['Jay-Z','Kelly Rowland'], bio:'Most-decorated artist in Grammy history.' },

  { id:'britney-spears', name:'Britney Spears', gender:'female', birthYear:1981, birthPlace:'McComb, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Dance Recording',year:2005}],
    collaborators:['Max Martin'], bio:'Princess of Pop and the defining teen idol of the millennium turn.' },

  { id:'alicia-keys', name:'Alicia Keys', gender:'female', birthYear:1981, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2002}],
    collaborators:['Jay-Z'], bio:'Hell\'s Kitchen-raised pianist and 15-time Grammy winner.' },

  { id:'kelly-clarkson', name:'Kelly Clarkson', gender:'female', birthYear:1982, birthPlace:'Fort Worth, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2006}],
    collaborators:['Max Martin'], bio:'First-ever American Idol winner and 2000s breakup-anthem queen.' },

  { id:'leann-rimes', name:'LeAnn Rimes', gender:'female', birthYear:1982, birthPlace:'Jackson, Mississippi', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:1997}],
    collaborators:['Ronan Keating'], bio:'Country-pop child star — youngest Best New Artist Grammy winner.' },

  { id:'amy-winehouse', name:'Amy Winehouse', gender:'female', birthYear:1983, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:2008}],
    collaborators:['Mark Ronson','Salaam Remi'], bio:'Back to Black smoke-and-soul prodigy gone too soon at 27.' },

  { id:'carrie-underwood', name:'Carrie Underwood', gender:'female', birthYear:1983, birthPlace:'Muskogee, Oklahoma', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2007}],
    collaborators:[], bio:'American Idol champion turned country-pop\'s premier vocalist.' },

  { id:'katy-perry', name:'Katy Perry', gender:'female', birthYear:1984, birthPlace:'Santa Barbara, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Max Martin','Dr. Luke'], bio:'Teenage Dream — only second album to spawn five Hot 100 No. 1s.' },

  { id:'avril-lavigne', name:'Avril Lavigne', gender:'female', birthYear:1984, birthPlace:'Belleville, Ontario', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Sk8er Boi pop-punk patron saint and Canadian export.' },

  { id:'rosalia', name:'Rosalía', gender:'female', birthYear:1992, birthPlace:'Sant Esteve Sesrovires, Spain', country:'Spain', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Latin Rock or Alternative Album',year:2019}],
    collaborators:['El Guincho'], bio:'Spanish flamenco-pop deconstructionist; "Motomami" defined 2022.' },

  { id:'lana-del-rey', name:'Lana Del Rey', gender:'female', birthYear:1985, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jack Antonoff'], bio:'Sad-girl Americana dream-pop priestess.' },

  { id:'lady-gaga', name:'Lady Gaga', gender:'female', birthYear:1986, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2019}],
    collaborators:['RedOne','Bradley Cooper'], bio:'Mother Monster — dance-pop avant-gardist who became an Oscar-winning actor.' },

  { id:'janelle-monae', name:'Janelle Monáe', gender:'female', birthYear:1985, birthPlace:'Kansas City, Kansas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Big Boi','Prince'], bio:'Sci-fi soul-pop polymath in tuxedos and pompadours.' },

  { id:'leona-lewis', name:'Leona Lewis', gender:'female', birthYear:1985, birthPlace:'Islington, London', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Simon Cowell'], bio:'X Factor winner whose "Bleeding Love" topped charts in 35 countries.' },

  { id:'ellie-goulding', name:'Ellie Goulding', gender:'female', birthYear:1986, birthPlace:'Lyonshall, Herefordshire', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for Critics\' Choice',year:2010}],
    collaborators:['Calvin Harris'], bio:'Lights — British EDM-pop crossover and royal wedding singer for Will & Kate.' },

  { id:'florence-welch', name:'Florence Welch', gender:'female', birthYear:1986, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'BRIT Award for Best British Album',year:2010}],
    collaborators:['Isabella Summers'], bio:'Florence + the Machine front; "Dog Days Are Over" is a generational anthem.' },

  { id:'solange', name:'Solange', gender:'female', birthYear:1986, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best R&B Performance',year:2017}],
    collaborators:['Sampha','Raphael Saadiq'], bio:'Beyoncé\'s younger sister and a singular art-soul auteur in her own right.' },

  { id:'hilary-duff', name:'Hilary Duff', gender:'female', birthYear:1987, birthPlace:'Houston, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Lizzie McGuire-era teen-pop avatar.' },

  { id:'rihanna', name:'Rihanna', gender:'female', birthYear:1988, birthPlace:'Saint Michael, Barbados', country:'Barbados', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Rap/Sung Collaboration',year:2008}],
    collaborators:['Jay-Z','Drake'], bio:'Barbadian queen of the 2010s singles era; later beauty-empire billionaire.' },

  { id:'adele', name:'Adele', gender:'female', birthYear:1988, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2012}],
    collaborators:['Paul Epworth','Greg Kurstin'], bio:'21 sold 31 million copies; voice that breaks decades into before-and-after.' },

  { id:'taylor-swift', name:'Taylor Swift', gender:'female', birthYear:1989, birthPlace:'West Reading, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2010},{name:'Grammy Award for Album of the Year',year:2024}],
    collaborators:['Jack Antonoff','Aaron Dessner'], bio:'Country-to-pop generational songwriter; first artist to win Album of the Year four times.' },

  { id:'sza', name:'SZA', gender:'female', birthYear:1989, birthPlace:'St. Louis, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Duo/Group Performance',year:2018}],
    collaborators:['Top Dawg Entertainment','Kendrick Lamar'], bio:'TDE\'s genre-bending songwriter; "SOS" parked at No. 1 for 10 weeks.' },

  { id:'iggy-azalea', name:'Iggy Azalea', gender:'female', birthYear:1990, birthPlace:'Sydney, Australia', country:'Australia', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Charli XCX'], bio:'Australian rapper whose "Fancy" parked at No. 1 for seven weeks.' },

  { id:'karol-g', name:'Karol G', gender:'female', birthYear:1991, birthPlace:'Medellín, Colombia', country:'Colombia', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Latin Grammy Award for Album of the Year',year:2023}],
    collaborators:['Bad Bunny'], bio:'Reggaetón\'s reigning bichota and stadium-headline solo star.' },

  { id:'kacey-musgraves', name:'Kacey Musgraves', gender:'female', birthYear:1988, birthPlace:'Golden, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2019}],
    collaborators:['Daniel Tashian'], bio:'Country-pop poet whose "Golden Hour" swept the 2019 Grammys.' },

  { id:'demi-lovato', name:'Demi Lovato', gender:'female', birthYear:1992, birthPlace:'Albuquerque, New Mexico', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Disney teen-pop star turned belting solo artist.' },

  { id:'selena-gomez', name:'Selena Gomez', gender:'female', birthYear:1992, birthPlace:'Grand Prairie, Texas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Marshmello','Benny Blanco'], bio:'Wizards of Waverly Place lead turned Rare Beauty mogul and pop star.' },

  { id:'miley-cyrus', name:'Miley Cyrus', gender:'female', birthYear:1992, birthPlace:'Franklin, Tennessee', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Record of the Year',year:2024}],
    collaborators:['Mark Ronson'], bio:'Hannah Montana to "Flowers" — country-pop child star turned Record-of-the-Year winner.' },

  { id:'charli-xcx', name:'Charli XCX', gender:'female', birthYear:1992, birthPlace:'Cambridge, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['A. G. Cook','Iggy Azalea'], bio:'PC-Music-aligned Brit who turned 2024 lime green with "Brat."' },

  { id:'iu', name:'IU', gender:'female', birthYear:1993, birthPlace:'Seoul, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Melon Music Award',year:2010}],
    collaborators:[], bio:'Nation\'s little sister — Korea\'s most decorated solo pop star of the 2010s.' },

  { id:'tinashe', name:'Tinashe', gender:'female', birthYear:1993, birthPlace:'Lexington, Kentucky', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['DJ Mustard'], bio:'2 On — independent R&B-pop dancer whose 2024 "Nasty" went viral.' },

  { id:'ariana-grande', name:'Ariana Grande', gender:'female', birthYear:1993, birthPlace:'Boca Raton, Florida', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Vocal Album',year:2019}],
    collaborators:['Pharrell Williams','Max Martin'], bio:'Whistle-tone pop monarch; thank u, next launched a new vocal era.' },

  { id:'halsey', name:'Halsey', gender:'female', birthYear:1994, birthPlace:'Edison, New Jersey', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['The Chainsmokers','BTS'], bio:'Tumblr-era confessional pop star; first six No. 1 albums solo and collaborative.' },

  { id:'doja-cat', name:'Doja Cat', gender:'female', birthYear:1995, birthPlace:'Los Angeles, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best Pop Duo/Group Performance',year:2022}],
    collaborators:['SZA'], bio:'TikTok-fluent rap-pop hybrid behind "Say So" and "Paint the Town Red."' },

  { id:'dua-lipa', name:'Dua Lipa', gender:'female', birthYear:1995, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2019}],
    collaborators:['Stuart Price'], bio:'Future Nostalgia disco-pop revivalist.' },

  { id:'lorde', name:'Lorde', gender:'female', birthYear:1996, birthPlace:'Takapuna, Auckland', country:'New Zealand', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Song of the Year',year:2014}],
    collaborators:['Jack Antonoff','Joel Little'], bio:'Royals — youngest solo No. 1 act in the U.S. since 1987 at the time.' },

  { id:'jisoo', name:'Jisoo', gender:'female', birthYear:1995, birthPlace:'Seoul, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], bio:'Blackpink visual and vocalist; her solo "Flower" hit No. 1 on Billboard Global.' },

  { id:'jennie', name:'Jennie', gender:'female', birthYear:1996, birthPlace:'Anyang, South Korea', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], bio:'Blackpink rapper and Chanel ambassador; debut solo "Solo" defined K-pop 2018.' },

  { id:'rose', name:'Rosé', gender:'female', birthYear:1997, birthPlace:'Auckland, New Zealand', country:'South Korea', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Bruno Mars'], bio:'Blackpink vocalist; 2024\'s "APT." with Bruno Mars hit global No. 1.' },

  { id:'lisa', name:'Lisa', gender:'female', birthYear:1997, birthPlace:'Buriram, Thailand', country:'Thailand', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Blackpink'], bio:'Thai-born Blackpink rapper; "Money" was the longest-charting K-solo on Hot 100.' },

  { id:'camila-cabello', name:'Camila Cabello', gender:'female', birthYear:1997, birthPlace:'Cojímar, Havana', country:'Cuba', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Shawn Mendes'], bio:'Cuban-American Fifth Harmony alum who went solo with "Havana."' },

  { id:'her', name:'H.E.R.', gender:'female', birthYear:1997, birthPlace:'Vallejo, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2021}],
    collaborators:['Daniel Caesar'], bio:'Anonymous-debut R&B-pop savant; Oscar winner for "Fight for You."' },

  { id:'chappell-roan', name:'Chappell Roan', gender:'female', birthYear:1998, birthPlace:'Willard, Missouri', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2025}],
    collaborators:['Dan Nigro'], bio:'Midwest Princess — drag-inflected pop sensation of 2024.' },

  { id:'sabrina-carpenter', name:'Sabrina Carpenter', gender:'female', birthYear:1999, birthPlace:'Lehigh Valley, Pennsylvania', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Jack Antonoff'], bio:'Disney-to-pop graduate; 2024\'s "Espresso" parked the summer.' },

  { id:'olivia-rodrigo', name:'Olivia Rodrigo', gender:'female', birthYear:2003, birthPlace:'Murrieta, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2022}],
    collaborators:['Dan Nigro'], bio:'Drivers License went viral on a Sunday and never came back.' },

  { id:'billie-eilish', name:'Billie Eilish', gender:'female', birthYear:2001, birthPlace:'Los Angeles, California', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Grammy Award for Album of the Year',year:2020}],
    collaborators:['Finneas O\'Connell'], bio:'Whisper-pop generational voice; youngest Album-of-the-Year winner ever.' },

  { id:'tate-mcrae', name:'Tate McRae', gender:'female', birthYear:2003, birthPlace:'Calgary, Alberta', country:'Canada', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Canadian dancer-turned-pop-star behind "greedy."' },

  // =====================================================================
  //  NFL (preserved from earlier dataset)
  // =====================================================================
  { id:'walter-payton', name:'Walter Payton', gender:'male', birthYear:1953, birthPlace:'Columbia, Mississippi', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[1975,1987]}],
    awards:[{name:'NFL MVP',year:1977},{name:'Super Bowl Champion',year:1986}],
    collaborators:['Mike Ditka','Jim McMahon'], bio:'Hall of Fame running back known as "Sweetness."' },

  { id:'donovan-mcnabb', name:'Donovan McNabb', gender:'male', birthYear:1976, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Philadelphia Eagles',years:[1999,2009]},{name:'Washington Redskins',years:[2010,2010]}],
    awards:[{name:'Pro Bowl',year:2000}], collaborators:['Andy Reid','Brian Westbrook'],
    bio:"Six-time Pro Bowl quarterback, born on Chicago's South Side." },

  { id:'simeon-rice', name:'Simeon Rice', gender:'male', birthYear:1974, birthPlace:'Chicago, Illinois', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Arizona Cardinals',years:[1996,2000]},{name:'Tampa Bay Buccaneers',years:[2001,2006]}],
    awards:[{name:'Super Bowl Champion',year:2002}], collaborators:['Warren Sapp','Derrick Brooks'],
    bio:'Defensive end and pass-rush specialist.' },

  { id:'tony-romo', name:'Tony Romo', gender:'male', birthYear:1980, birthPlace:'San Diego, California', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Dallas Cowboys',years:[2003,2016]}], awards:[{name:'Pro Bowl',year:2007}],
    collaborators:['Jason Witten','DeMarco Murray'], bio:'Cowboys quarterback turned lead NFL broadcaster.' },

  { id:'odell-beckham-jr', name:'Odell Beckham Jr.', gender:'male', birthYear:1992, birthPlace:'Baton Rouge, Louisiana', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'New York Giants',years:[2014,2018]},{name:'Cleveland Browns',years:[2019,2021]},{name:'Los Angeles Rams',years:[2021,2021]}],
    awards:[{name:'Super Bowl Champion',year:2022}], collaborators:['Eli Manning','Matthew Stafford'],
    bio:'Wide receiver famed for the one-handed catch.' },

  { id:'jameis-winston', name:'Jameis Winston', gender:'male', birthYear:1994, birthPlace:'Bessemer, Alabama', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Tampa Bay Buccaneers',years:[2015,2019]},{name:'New Orleans Saints',years:[2020,2023]}],
    awards:[{name:'Heisman Trophy',year:2013}], collaborators:['Mike Evans','Drew Brees'],
    bio:'First overall pick in the 2015 NFL Draft.' },

  { id:'thomas-jones', name:'Thomas Jones', gender:'male', birthYear:1978, birthPlace:'Big Stone Gap, Virginia', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[2004,2006]},{name:'New York Jets',years:[2007,2009]}],
    awards:[], collaborators:['Brian Urlacher'], bio:'Veteran running back across four NFL teams.' },

  { id:'matt-forte', name:'Matt Forté', gender:'male', birthYear:1985, birthPlace:'Lake Charles, Louisiana', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[2008,2015]},{name:'New York Jets',years:[2016,2017]}],
    awards:[{name:'Pro Bowl',year:2011}], collaborators:['Jay Cutler'], bio:"Bears' all-purpose running back of the 2010s." },

  // =====================================================================
  //  Acting / Film (preserved)
  // =====================================================================
  { id:'janet-gaynor', name:'Janet Gaynor', gender:'female', birthYear:1906, birthPlace:'Philadelphia, Pennsylvania', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1929}],
    collaborators:['Charles Farrell','F. W. Murnau'], bio:'Won the very first Academy Award for Best Actress at the inaugural 1929 ceremony.' },

  { id:'mary-pickford', name:'Mary Pickford', gender:'female', birthYear:1892, birthPlace:'Toronto, Ontario', country:'Canada', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1930}],
    collaborators:['Douglas Fairbanks','D. W. Griffith'], bio:'Silent film superstar; co-founded United Artists.' },

  { id:'meryl-streep', name:'Meryl Streep', gender:'female', birthYear:1949, birthPlace:'Summit, New Jersey', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1983},{name:'Academy Award for Best Actress',year:2012}],
    collaborators:['Robert De Niro','Mike Nichols'], bio:'Most-nominated actor in Academy Awards history.' },

  { id:'denzel-washington', name:'Denzel Washington', gender:'male', birthYear:1954, birthPlace:'Mount Vernon, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actor',year:1990},{name:'Academy Award for Best Actor',year:2002}],
    collaborators:['Spike Lee','Tony Scott'], bio:'Two-time Oscar winner and one of the defining actors of his generation.' },

  { id:'viola-davis', name:'Viola Davis', gender:'female', birthYear:1965, birthPlace:'St. Matthews, South Carolina', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2017}],
    collaborators:['Denzel Washington','Steve McQueen'], bio:'Only Black actor to achieve the Triple Crown of Acting.' },

  // =====================================================================
  //  Music — Hip-Hop (preserved, men)
  // =====================================================================
  { id:'kanye-west', name:'Kanye West', gender:'male', birthYear:1977, birthPlace:'Atlanta, Georgia', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[{name:'Grammy Award',year:2005}],
    collaborators:['Jay-Z','Kid Cudi'], bio:'Rapper and producer raised in Chicago.' },

  { id:'chance-the-rapper', name:'Chance the Rapper', gender:'male', birthYear:1993, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Hip-Hop',
    teams:[], awards:[{name:'Grammy Award for Best New Artist',year:2017}],
    collaborators:['Kanye West','Childish Gambino'], bio:'Independent Chicago rapper; first streaming-only artist to win a Grammy.' },

  // =====================================================================
  //  Science (preserved)
  // =====================================================================
  { id:'marie-curie', name:'Marie Curie', gender:'female', birthYear:1867, birthPlace:'Warsaw, Poland', country:'Poland', field:'Science', subfield:'Physics & Chemistry',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1903},{name:'Nobel Prize in Chemistry',year:1911}],
    collaborators:['Pierre Curie','Henri Becquerel'], bio:'First person to win Nobel Prizes in two different sciences.' },

  { id:'rosalind-franklin', name:'Rosalind Franklin', gender:'female', birthYear:1920, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Chemistry',
    teams:[], awards:[],
    collaborators:['Maurice Wilkins'], bio:'Chemist whose X-ray imaging was central to discovering the structure of DNA.' },

  { id:'katherine-johnson', name:'Katherine Johnson', gender:'female', birthYear:1918, birthPlace:'White Sulphur Springs, West Virginia', country:'USA', field:'Science', subfield:'Mathematics',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2015}],
    collaborators:['Dorothy Vaughan','Mary Jackson'], bio:'NASA mathematician whose calculations were critical to early U.S. crewed spaceflight.' },

  { id:'ada-lovelace', name:'Ada Lovelace', gender:'female', birthYear:1815, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Computing',
    teams:[], awards:[], collaborators:['Charles Babbage'],
    bio:'Mathematician credited as the first computer programmer.' },

  { id:'grace-hopper', name:'Grace Hopper', gender:'female', birthYear:1906, birthPlace:'New York, New York', country:'USA', field:'Science', subfield:'Computing',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}],
    collaborators:[], bio:'Computer scientist and U.S. Navy rear admiral; pioneer of compilers.' },

  // =====================================================================
  //  Literature (preserved)
  // =====================================================================
  { id:'toni-morrison', name:'Toni Morrison', gender:'female', birthYear:1931, birthPlace:'Lorain, Ohio', country:'USA', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Pulitzer Prize for Fiction',year:1988},{name:'Nobel Prize in Literature',year:1993}],
    collaborators:[], bio:'First Black woman to win the Nobel Prize in Literature.' },

  { id:'james-baldwin', name:'James Baldwin', gender:'male', birthYear:1924, birthPlace:'Harlem, New York', country:'USA', field:'Literature', subfield:'Essayist',
    teams:[], awards:[],
    collaborators:['Nina Simone','Lorraine Hansberry'], bio:'Essayist, novelist, and civil rights orator.' },

  // =====================================================================
  //  Politics / Activism (preserved)
  // =====================================================================
  { id:'barack-obama', name:'Barack Obama', gender:'male', birthYear:1961, birthPlace:'Honolulu, Hawaii', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2009}],
    collaborators:['Joe Biden','Michelle Obama'], bio:'44th President of the United States.' },

  { id:'michelle-obama', name:'Michelle Obama', gender:'female', birthYear:1964, birthPlace:'Chicago, Illinois', country:'USA', field:'Politics', subfield:'First Lady',
    teams:[], awards:[{name:'Grammy Award for Best Spoken Word Album',year:2020}],
    collaborators:['Barack Obama'], bio:"Lawyer, author, and former First Lady; raised on Chicago's South Side." },

  { id:'ruth-bader-ginsburg', name:'Ruth Bader Ginsburg', gender:'female', birthYear:1933, birthPlace:'Brooklyn, New York', country:'USA', field:'Politics', subfield:'Supreme Court Justice',
    teams:[], awards:[],
    collaborators:["Sandra Day O'Connor"], bio:'Associate Justice and architect of modern gender-equality jurisprudence.' },

  // =====================================================================
  //  Soccer (preserved)
  // =====================================================================
  { id:'mia-hamm', name:'Mia Hamm', gender:'female', birthYear:1972, birthPlace:'Selma, Alabama', country:'USA', field:'Sports', subfield:'Soccer',
    teams:[{name:"United States Women's National Team",years:[1987,2004]}],
    awards:[{name:'FIFA World Cup Champion',year:1999}],
    collaborators:['Brandi Chastain','Julie Foudy'], bio:"Two-time World Cup champion and pioneer of U.S. women's soccer." },

  { id:'megan-rapinoe', name:'Megan Rapinoe', gender:'female', birthYear:1985, birthPlace:'Redding, California', country:'USA', field:'Sports', subfield:'Soccer',
    teams:[{name:"United States Women's National Team",years:[2006,2023]}],
    awards:[{name:'FIFA World Cup Champion',year:2019}],
    collaborators:['Alex Morgan','Carli Lloyd'], bio:'World Cup winner and outspoken activist.' },

  {'id': 'william-shakespeare', 'name': 'William Shakespeare', 'gender': 'male', 'birthYear': 1564, 'birthPlace': 'Stratford-upon-Avon', 'country': 'England', 'field': 'Literature', 'subfield': 'Playwright', 'teams': [], 'awards': [], 'collaborators': ['John Fletcher'], 'bio': 'The Bard of Avon; widely regarded as the greatest dramatist in history.'},
  {'id': 'greta-gerwig', 'name': 'Greta Gerwig', 'gender': 'female', 'birthYear': 1983, 'birthPlace': 'Sacramento, California', 'country': 'USA', 'field': 'Literature', 'subfield': 'Screenwriter', 'teams': [], 'awards': [{'name': 'Academy Award Nomination', 'year': 2018}], 'collaborators': ['Noah Baumbach'], 'bio': 'Writer/Director known for her distinctive voice in 'Lady Bird' and 'Barbie'.'},
  {'id': 'gabriel-garcia-marquez', 'name': 'Gabriel García Márquez', 'gender': 'male', 'birthYear': 1927, 'birthPlace': 'Aracataca', 'country': 'Colombia', 'field': 'Literature', 'subfield': 'Novelist', 'teams': [], 'awards': [{'name': 'Nobel Prize in Literature', 'year': 1982}], 'collaborators': [], 'bio': 'Master of magical realism and author of 'One Hundred Years of Solitude'.'},

  // --- NEW MERGED DATA ---
  {'id': 'william-shakespeare', 'name': 'William Shakespeare', 'gender': 'male', 'birthYear': 1564, 'birthPlace': 'Stratford-upon-Avon', 'country': 'England', 'field': 'Literature', 'subfield': 'Playwright', 'teams': [], 'awards': [], 'collaborators': ['John Fletcher'], 'bio': 'The Bard of Avon; widely regarded as the greatest dramatist in history.'},
  {'id': 'greta-gerwig', 'name': 'Greta Gerwig', 'gender': 'female', 'birthYear': 1983, 'birthPlace': 'Sacramento, California', 'country': 'USA', 'field': 'Literature', 'subfield': 'Screenwriter', 'teams': [], 'awards': [{'name': 'Academy Award Nomination', 'year': 2018}], 'collaborators': ['Noah Baumbach'], 'bio': 'Writer/Director known for her distinctive voice in 'Lady Bird' and 'Barbie'.'},
  {'id': 'gabriel-garcia-marquez', 'name': 'Gabriel García Márquez', 'gender': 'male', 'birthYear': 1927, 'birthPlace': 'Aracataca', 'country': 'Colombia', 'field': 'Literature', 'subfield': 'Novelist', 'teams': [], 'awards': [{'name': 'Nobel Prize in Literature', 'year': 1982}], 'collaborators': [], 'bio': 'Master of magical realism and author of 'One Hundred Years of Solitude'.'},

  // --- MERGED DATA START ---
  {'id': 'william-shakespeare', 'name': 'William Shakespeare', 'gender': 'male', 'birthYear': 1564, 'birthPlace': 'Stratford-upon-Avon', 'country': 'England', 'field': 'Literature', 'subfield': 'Playwright', 'teams': [], 'awards': [], 'collaborators': ['John Fletcher'], 'bio': 'The Bard of Avon; widely regarded as the greatest dramatist in history.'},
  {'id': 'greta-gerwig', 'name': 'Greta Gerwig', 'gender': 'female', 'birthYear': 1983, 'birthPlace': 'Sacramento, California', 'country': 'USA', 'field': 'Literature', 'subfield': 'Screenwriter', 'teams': [], 'awards': [{'name': 'Academy Award Nomination', 'year': 2018}], 'collaborators': ['Noah Baumbach'], 'bio': 'Writer/Director known for her distinctive voice in 'Lady Bird' and 'Barbie'.'},
  {'id': 'gabriel-garcia-marquez', 'name': 'Gabriel García Márquez', 'gender': 'male', 'birthYear': 1927, 'birthPlace': 'Aracataca', 'country': 'Colombia', 'field': 'Literature', 'subfield': 'Novelist', 'teams': [], 'awards': [{'name': 'Nobel Prize in Literature', 'year': 1982}], 'collaborators': [], 'bio': 'Master of magical realism and author of 'One Hundred Years of Solitude'.'},
  // --- MERGED DATA END ---
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
