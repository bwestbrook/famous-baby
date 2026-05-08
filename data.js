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
    collaborators:['Moses Malone','Maurice Cheeks'], bio:"Dr. J — the man who made dunking an art form. Born on Long Island and a star at the University of Massachusetts, he turned pro in the upstart ABA, where he won two championships and three MVP awards with the Virginia Squires and New York Nets. After the 1976 ABA-NBA merger he joined the Philadelphia 76ers, captured the 1981 NBA MVP, and led Philadelphia to the 1983 league title alongside Moses Malone. His swooping baseline scoop in the 1980 Finals against the Lakers is still studied as a feat of body control. He was inducted into the Naismith Memorial Basketball Hall of Fame in 1993 and named to the NBA's 75th Anniversary Team in 2021." },

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
    collaborators:['Tim Duncan','Manu Ginobili'], bio:"French floor general and 2007 Finals MVP. Born in Bruges, Belgium, to an American basketball-player father and a Dutch model mother, he grew up in France and began his pro career as a teenager with Paris Basket Racing. The San Antonio Spurs selected him 28th overall in the 2001 NBA Draft, and over seventeen seasons he won four championships with them in 2003, 2005, 2007, and 2014. His 2007 Finals MVP made him the first European-born player to win the award. After retiring in 2019 he took ownership of the French club ASVEL and led it to multiple LNB Pro A titles." },

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
    collaborators:['Allen Iverson','Amar\'e Stoudemire'], bio:"Smooth-shouldered Olympic three-peat scorer. Raised between Brooklyn and West Baltimore, he led Syracuse to the 2003 NCAA championship as a freshman and then went third overall to the Denver Nuggets in that summer's loaded NBA Draft. Across nineteen seasons he made ten All-Star teams, won the 2013 NBA scoring title, and finished his career ninth on the league's all-time scoring list. With Team USA he became the first U.S. men's basketball player to win three Olympic gold medals, taking gold in Beijing, London, and Rio. He retired in 2023 after farewell stops with the Trail Blazers and the Lakers." },

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
    collaborators:['Klay Thompson','Draymond Green','Steve Kerr','Kevin Durant'], bio:"Greatest shooter in NBA history. Born in Akron during his father Dell Curry's Cleveland Cavaliers stint and raised in Charlotte, he played college ball at Davidson before Golden State drafted him seventh overall in 2009. He was the league's first unanimous MVP in 2016 and won four NBA championships with the Warriors in 2015, 2017, 2018, and 2022, finally claiming Finals MVP honors in the last of them. In December 2021 he passed Ray Allen for the most career three-pointers in NBA history, a record he has continued to extend by hundreds. He capped the 2024 Paris Olympics with a 24-point fourth quarter against France to deliver Team USA the gold." },

  { id:'jimmy-butler', name:'Jimmy Butler', gender:'male', birthYear:1989, birthPlace:'Houston, Texas', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Chicago Bulls',years:[2011,2017]},{name:'Philadelphia 76ers',years:[2018,2019]},{name:'Miami Heat',years:[2019,2025]}], awards:[],
    collaborators:['Bam Adebayo','Joel Embiid'], bio:'Late-blooming star who twice carried the Heat to the Finals.' },

  { id:'james-harden', name:'James Harden', gender:'male', birthYear:1989, birthPlace:'Los Angeles, California', country:'USA', field:'Sports', subfield:'NBA',
    teams:[{name:'Oklahoma City Thunder',years:[2009,2012]},{name:'Houston Rockets',years:[2012,2021]},{name:'Brooklyn Nets',years:[2021,2022]},{name:'Philadelphia 76ers',years:[2022,2023]}],
    awards:[{name:'NBA MVP',year:2018}], collaborators:['Kevin Durant','Russell Westbrook','Chris Paul'], bio:"The Beard — eurostep architect and 2018 MVP. Born in Los Angeles and raised in Compton, he played college basketball at Arizona State before Oklahoma City selected him third overall in the 2009 NBA Draft alongside Kevin Durant and Russell Westbrook. He won Sixth Man of the Year in 2012, then was traded to Houston that fall and built one of the heaviest scoring resumes in league history. He led the NBA in scoring in three consecutive seasons (2018–2020), peaking at 36.1 points per game in 2018-19. Off the floor he won Olympic gold with Team USA at the 2012 London Games." },

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
    collaborators:['Giannis Antetokounmpo','Jrue Holiday'], bio:"Bucks' silky shotmaker and 2021 champion. A Charleston, South Carolina native, he played college basketball at Texas A&M before the Detroit Pistons drafted him 39th overall in 2012; Milwaukee acquired him a year later in the Brandon Jennings trade. He developed into one of the league's most reliable mid-range scorers and a three-time NBA All-Star (2019, 2020, 2022). Alongside Giannis Antetokounmpo and Jrue Holiday he helped the Bucks beat the Phoenix Suns in six games for the 2021 NBA title, the franchise's first championship in fifty years. That summer he also won Olympic gold with Team USA at the Tokyo Games." },

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
    collaborators:['Otis Redding','Jerry Wexler','James Cleveland','Carolyn Franklin','Erma Franklin','Carole King','Curtis Mayfield','Luther Vandross','George Michael','Mahalia Jackson'],
    bio:"The Queen of Soul. Born in Memphis on March 25, 1942 and raised in Detroit by her preacher father, Rev. C. L. Franklin, after her mother Barbara — herself a gospel singer — left when Aretha was six and died four years later. Family friends Sam Cooke, Mahalia Jackson, and Dinah Washington passed through the house; she taught herself piano by ear and recorded her first gospel album at fourteen. After six commercially flat years on Columbia, she signed to Atlantic Records in 1966, and producer Jerry Wexler sent her to FAME Studios in Muscle Shoals, Alabama, where her very first session produced the breakthrough \"I Never Loved a Man (The Way I Love You).\" Months later she rearranged Otis Redding's 1965 song \"Respect\" — adding the spelled-out chorus, the \"sock it to me\" backing vocals sung by her sisters Erma and Carolyn, and a new bridge — and turned a man's plea for his paycheck into a #1 hit, a feminist anthem, and a civil rights anthem; Otis reportedly shrugged at the Monterey Pop Festival, \"that little girl done took my song.\" She followed it with \"(You Make Me Feel Like) A Natural Woman,\" written for her by Carole King and Gerry Goffin, and the 1968 self-co-written \"Think.\" Her 1972 double LP Amazing Grace, recorded live at New Temple Missionary Baptist Church in Los Angeles with James Cleveland and the Southern California Community Choir, remains the best-selling Black gospel album of all time; Sydney Pollack filmed the sessions, but the documentary was shelved for nearly five decades over a sync problem and only released in 2018. She sang at Martin Luther King Jr.'s funeral in 1968 and at the inaugurations of presidents Carter, Clinton, and Obama — at Obama's swearing-in, her ribboned gray hat briefly out-trended the new president online. In 1987 she became the first woman ever inducted into the Rock and Roll Hall of Fame. At the 1998 Grammys, with only hours of notice, she stepped in for an ailing Luciano Pavarotti to perform \"Nessun Dorma\" in his original key in front of a worldwide audience. She won eighteen competitive Grammys, the Grammy Lifetime Achievement Award (1994), the Kennedy Center Honors (1994), the National Medal of Arts (1999), and the Presidential Medal of Freedom (2005). She died of pancreatic cancer at home in Detroit on August 16, 2018; the following year the Pulitzer Prize Board awarded her a Special Citation, making her the first individual woman ever to receive one." },

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
    collaborators:['Pharrell Williams','Eve'], bio:"No Doubt front and Hollaback solo princess. She co-founded the Anaheim ska-rock band No Doubt with her older brother Eric in 1986, and the group's third album Tragic Kingdom (1995) sold more than 16 million copies on the strength of \"Just a Girl\" and \"Don't Speak.\" Her 2004 solo debut Love. Angel. Music. Baby. produced \"Hollaback Girl,\" the first single to top the Billboard Hot 100 chart on the back of digital downloads. She launched the L.A.M.B. fashion line in 2003 and the lower-priced Harajuku Lovers offshoot soon after. Since 2014 she has appeared as a coach across multiple seasons of NBC's The Voice." },

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
    collaborators:['Jay-Z','Kelly Rowland'], bio:"Most-decorated artist in Grammy history. Born and raised in Houston, she rose to fame in the late 1990s as the lead singer of Destiny's Child before her 2003 solo debut Dangerously in Love won five Grammys in one night. The visual album Lemonade (2016) and the dance opus Renaissance (2022) reframed pop in successive decades, and Cowboy Carter (2024) made her the first Black woman to top the Billboard country chart. She headlined the Super Bowl XLVII halftime show in 2013 and reunited Destiny's Child to join her at Coachella in 2018, the festival's first Black female headliner. At the 2025 ceremony, Cowboy Carter won Album of the Year and Best Country Album, making her the first Black woman to win the country category and pushing her career Grammy total past anyone else's." },

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
    collaborators:['Jack Antonoff'], bio:"Sad-girl Americana dream-pop priestess. Born Elizabeth Woolridge Grant in New York City and raised in Lake Placid, she released early independent music as Lizzy Grant before reinventing herself with the viral 2011 single \"Video Games.\" Her major-label debut Born to Die (2012) sold millions worldwide on the strength of \"Summertime Sadness\" despite mixed early reviews. Norman Fucking Rockwell! (2019), a five-time Grammy nominee including Album of the Year, marked a critical reappraisal that has continued through Chemtrails over the Country Club (2021) and Did You Know That There's a Tunnel Under Ocean Blvd (2023)." },

  { id:'lady-gaga', name:'Lady Gaga', gender:'female', birthYear:1986, birthPlace:'New York, New York', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2019}],
    collaborators:['RedOne','Bradley Cooper'], bio:'Mother Monster — dance-pop avant-gardist who became an Oscar-winning actor.' },

  { id:'janelle-monae', name:'Janelle Monáe', gender:'nonbinary', birthYear:1985, birthPlace:'Kansas City, Kansas', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Big Boi','Prince'], bio:'Sci-fi soul-pop polymath in tuxedos and pompadours; came out as non-binary in 2022.' },

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
    collaborators:[], bio:"Lizzie McGuire-era teen-pop avatar. Born in Houston and homeschooled to support her acting career, she starred in Disney Channel's Lizzie McGuire from 2001 to 2004 and reprised the role in the 2003 feature film. Her 2003 debut album Metamorphosis went triple platinum in the U.S., and the 2004 self-titled follow-up produced \"Come Clean.\" She returned to series television as Kelsey Peters across seven seasons of TV Land's Younger (2015–2021) and headlined Hulu's How I Met Your Father from 2022 to 2023." },

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

  { id:'demi-lovato', name:'Demi Lovato', gender:'nonbinary', birthYear:1992, birthPlace:'Albuquerque, New Mexico', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:[], bio:'Disney teen-pop star turned belting solo artist; came out as non-binary in 2021.' },

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
    collaborators:['Stuart Price'], bio:"Future Nostalgia disco-pop revivalist. Born in London to Kosovo-Albanian parents, she moved with her family back to Pristina at age 11 before returning alone to London as a teenager to pursue music. Her self-titled 2017 debut produced the global hit \"New Rules,\" and the pandemic-era Future Nostalgia (2020) cemented her style with \"Don't Start Now\" and \"Levitating.\" She launched the literary recommendation newsletter and podcast Service95 in 2022, and in 2024 released her third album Radical Optimism and headlined the Friday-night Pyramid Stage at Glastonbury." },

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
    bio:"Defensive end and pass-rush specialist. A Chicago native, he played college football at Illinois, where he set Big Ten career sack records before the Arizona Cardinals selected him third overall in the 1996 NFL Draft. He won Super Bowl XXXVII with the Tampa Bay Buccaneers in January 2003, anchoring a defense that smothered the Oakland Raiders alongside Warren Sapp and Derrick Brooks. He retired with 122 career sacks across twelve NFL seasons and earned three Pro Bowl selections. After football he turned to filmmaking, writing and directing the 2014 thriller Unsullied." },

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
    bio:"First overall pick in the 2015 NFL Draft. A Bessemer, Alabama native, he won the 2013 Heisman Trophy as a redshirt freshman quarterback at Florida State and led the Seminoles to the BCS National Championship that same season. Tampa Bay selected him first overall the next year, and as a rookie he became the youngest passer in NFL history to throw for 4,000 yards in a season. In 2019 he led the league with 5,109 passing yards while also throwing 30 interceptions, becoming the first quarterback to do both in the same season. He spent four seasons backing up and then succeeding Drew Brees in New Orleans before signing with the Cleveland Browns ahead of the 2024 season." },

  { id:'thomas-jones', name:'Thomas Jones', gender:'male', birthYear:1978, birthPlace:'Big Stone Gap, Virginia', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'Chicago Bears',years:[2004,2006]},{name:'New York Jets',years:[2007,2009]}],
    awards:[], collaborators:['Brian Urlacher'], bio:"Veteran running back across four NFL teams. Born in Big Stone Gap, Virginia, the eldest of seven children in an Appalachian coal-mining family, he played college football at Virginia, where he became the program's career rushing leader. The Arizona Cardinals selected him seventh overall in the 2000 NFL Draft, and he went on to suit up for the Cardinals, Buccaneers, Bears, Jets, and Chiefs across twelve seasons. He rushed for 10,591 yards and posted three consecutive 1,000-yard seasons from 2007 to 2009 with the Jets. After football he turned to acting, with credits including BET's Being Mary Jane and the 2015 film Straight Outta Compton." },

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
    collaborators:['Jay-Z','Kid Cudi'], bio:"Rapper and producer raised in Chicago. The son of Donda West, an English professor at Chicago State University, he built his early reputation producing soul-sampling beats for Roc-A-Fella artists including Jay-Z's The Blueprint. His debut The College Dropout (2004) launched a run that included Late Registration, Graduation, 808s & Heartbreak, and the widely acclaimed My Beautiful Dark Twisted Fantasy in 2010. He launched the Yeezy line with adidas in 2015 before the partnership ended in 2022, and is among the most-Grammy-decorated rappers in the show's history." },

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
    collaborators:['Nina Simone','Lorraine Hansberry'], bio:"Essayist, novelist, and civil rights orator. Born in Harlem in 1924 as the eldest of nine children, he served briefly as a teenage Pentecostal preacher before turning to literature and moving to Paris in 1948 to escape American racism and the constraints of being a gay Black man. His semi-autobiographical Go Tell It on the Mountain (1953), the essays of Notes of a Native Son (1955), the queer love story Giovanni's Room (1956), and the fiery The Fire Next Time (1963) made him one of his century's most cited American writers. In a televised 1965 Cambridge Union debate against William F. Buckley, he won the audience by 540 votes to 160 with his argument that the American Dream had come at the expense of Black Americans. He spent his final years in Saint-Paul-de-Vence in the south of France, where he died of stomach cancer in 1987." },

  // =====================================================================
  //  Politics / Activism (preserved)
  // =====================================================================
  { id:'barack-obama', name:'Barack Obama', gender:'male', birthYear:1961, birthPlace:'Honolulu, Hawaii', country:'USA', field:'Politics', subfield:'President',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2009}],
    collaborators:['Joe Biden','Michelle Obama'], bio:"44th President of the United States. Born in Honolulu to a Kenyan father and a Kansan mother, he became the first Black president of the Harvard Law Review before working as a community organizer and constitutional law lecturer in Chicago. He served in the Illinois State Senate and then as U.S. Senator from Illinois from 2005 to 2008 before defeating John McCain in the 2008 presidential election. His administration signed the Affordable Care Act in 2010, reached the Iran nuclear deal and the Paris Climate Agreement, and ordered the May 2011 raid in Abbottabad that killed Osama bin Laden. Since leaving office in 2017 he and Michelle have produced films and series through Higher Ground for Netflix." },

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
    collaborators:['Alex Morgan','Carli Lloyd'], bio:"World Cup winner and outspoken activist. Born in Redding, California, and raised alongside her twin sister Rachael, she played her college soccer at the University of Portland, where she won an NCAA championship in 2005. With the U.S. Women's National Team she won FIFA Women's World Cups in 2015 and 2019 and Olympic gold at London 2012, and her 2019 tournament also brought her the Golden Boot, the Golden Ball, the Ballon d'Or Féminin, and FIFA's Best Women's Player honor. She helped lead the equal-pay lawsuit against U.S. Soccer that yielded a 2022 settlement and was awarded the Presidential Medal of Freedom that same year. She retired from professional play in 2023 with NJ/NY Gotham FC, going out as an NWSL champion." },

  // =====================================================================
  //  VISUAL ARTS — global, era-diverse
  // =====================================================================
  { id:'leonardo-da-vinci', name:'Leonardo da Vinci', gender:'male', birthYear:1452, birthPlace:'Vinci, Italy', country:'Italy', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Andrea del Verrocchio'], bio:'Painter, anatomist, engineer — the archetypal Renaissance polymath.' },
  { id:'michelangelo', name:'Michelangelo', gender:'male', birthYear:1475, birthPlace:'Caprese, Italy', country:'Italy', field:'Visual Arts', subfield:'Sculptor',
    teams:[], awards:[], collaborators:['Pope Julius II'], bio:'Sculptor of David, painter of the Sistine ceiling.' },
  { id:'rembrandt', name:'Rembrandt van Rijn', gender:'male', birthYear:1606, birthPlace:'Leiden, Netherlands', country:'Netherlands', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:[], bio:'Dutch master of light, shadow, and the unflinching self-portrait.' },
  { id:'hokusai', name:'Katsushika Hokusai', gender:'male', birthYear:1760, birthPlace:'Edo, Japan', country:'Japan', field:'Visual Arts', subfield:'Printmaker',
    teams:[], awards:[], collaborators:[], bio:'Ukiyo-e printmaker behind The Great Wave off Kanagawa.' },
  { id:'van-gogh', name:'Vincent van Gogh', gender:'male', birthYear:1853, birthPlace:'Zundert, Netherlands', country:'Netherlands', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Paul Gauguin'], bio:'Sold one painting in his lifetime; reshaped modern painting after his death.' },
  { id:'frida-kahlo', name:'Frida Kahlo', gender:'female', birthYear:1907, birthPlace:'Coyoacán, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Diego Rivera'], bio:'Mexican painter of pain, identity, and unflinching self-portraiture.' },
  { id:'picasso', name:'Pablo Picasso', gender:'male', birthYear:1881, birthPlace:'Málaga, Spain', country:'Spain', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Georges Braque'], bio:'Co-founder of Cubism; reshaped twentieth-century art.' },
  { id:'okeeffe', name:"Georgia O'Keeffe", gender:'female', birthYear:1887, birthPlace:'Sun Prairie, Wisconsin', country:'USA', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1977}], collaborators:['Alfred Stieglitz'], bio:'Mother of American modernism; flowers, bones, and the desert at scale.' },
  { id:'kusama', name:'Yayoi Kusama', gender:'female', birthYear:1929, birthPlace:'Matsumoto, Japan', country:'Japan', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[{name:'Praemium Imperiale',year:2006}], collaborators:[], bio:'Polka dots and infinity rooms — the most-attended contemporary artist on earth.' },
  { id:'basquiat', name:'Jean-Michel Basquiat', gender:'male', birthYear:1960, birthPlace:'Brooklyn, New York', country:'USA', field:'Visual Arts', subfield:'Painter',
    teams:[], awards:[], collaborators:['Andy Warhol'], bio:'Brooklyn-born neo-expressionist who broke the gallery world by 22.' },
  { id:'ai-weiwei', name:'Ai Weiwei', gender:'male', birthYear:1957, birthPlace:'Beijing, China', country:'China', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[], collaborators:[], bio:'Conceptual artist and dissident; sunflower seeds, smashed urns, and a state on edge.' },
  { id:'abramovic', name:'Marina Abramović', gender:'female', birthYear:1946, birthPlace:'Belgrade, Serbia', country:'Serbia', field:'Visual Arts', subfield:'Performance Artist',
    teams:[], awards:[], collaborators:['Ulay'], bio:'Pioneer of performance art; sat silent across from strangers for 736 hours.' },

  // =====================================================================
  //  TECH / INVENTORS — global
  // =====================================================================
  { id:'turing', name:'Alan Turing', gender:'male', birthYear:1912, birthPlace:'London, England', country:'UK', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[], collaborators:[], bio:'Father of computer science; broke Enigma; defined the limits of computation.' },
  { id:'hedy-lamarr', name:'Hedy Lamarr', gender:'female', birthYear:1914, birthPlace:'Vienna, Austria', country:'Austria', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['George Antheil'], bio:'Hollywood star and co-inventor of the frequency-hopping radio signal that underlies Wi-Fi.' },
  { id:'tbl', name:'Tim Berners-Lee', gender:'male', birthYear:1955, birthPlace:'London, England', country:'UK', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[{name:'Turing Award',year:2016}], collaborators:[], bio:"Invented the World Wide Web at CERN in 1989. The son of two mathematicians who had worked on the early Ferranti Mark I computer, he wrote the first web browser, the first web server, and the HTTP protocol, and published the world's first website in December 1990. He founded the World Wide Web Consortium at MIT in 1994 to set open standards for the web. Knighted in 2004 and awarded the ACM Turing Award in 2016, he has been a longtime advocate for net neutrality and open access. In 2009 he launched the World Wide Web Foundation to push for universal connectivity." },
  { id:'torvalds', name:'Linus Torvalds', gender:'male', birthYear:1969, birthPlace:'Helsinki, Finland', country:'Finland', field:'Tech', subfield:'Computer Science',
    teams:[], awards:[{name:'Millennium Technology Prize',year:2012}], collaborators:[], bio:'Created Linux and Git — the kernel and the version control behind much of the internet.' },
  { id:'margaret-hamilton', name:'Margaret Hamilton', gender:'female', birthYear:1936, birthPlace:'Paoli, Indiana', country:'USA', field:'Tech', subfield:'Software Engineering',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}], collaborators:[], bio:'Led the Apollo on-board flight software team; coined the term "software engineering."' },
  { id:'tesla', name:'Nikola Tesla', gender:'male', birthYear:1856, birthPlace:'Smiljan, Croatia', country:'Croatia', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['George Westinghouse'], bio:'Pioneer of alternating current and modern electrical engineering.' },
  { id:'agbell', name:'Alexander Graham Bell', gender:'male', birthYear:1847, birthPlace:'Edinburgh, Scotland', country:'UK', field:'Tech', subfield:'Inventor',
    teams:[], awards:[], collaborators:['Thomas Watson'], bio:'Patented the telephone in 1876; founded what became AT&T.' },
  { id:'reshma-saujani', name:'Reshma Saujani', gender:'female', birthYear:1975, birthPlace:'Schaumburg, Illinois', country:'USA', field:'Tech', subfield:'Activist',
    teams:[], awards:[], collaborators:[], bio:'Founded Girls Who Code; advocate for women in technology.' },
  { id:'sundar', name:'Sundar Pichai', gender:'male', birthYear:1972, birthPlace:'Madurai, India', country:'India', field:'Tech', subfield:'Executive',
    teams:[], awards:[], collaborators:['Larry Page','Sergey Brin'], bio:'CEO of Google and Alphabet; led the rise of Chrome and Android.' },

  // =====================================================================
  //  ACTIVISTS — global
  // =====================================================================
  { id:'gandhi', name:'Mahatma Gandhi', gender:'male', birthYear:1869, birthPlace:'Porbandar, India', country:'India', field:'Activism', subfield:'Civil Rights',
    teams:[], awards:[], collaborators:['Jawaharlal Nehru'], bio:'Leader of Indian independence; doctrine of nonviolent civil disobedience.' },
  { id:'mandela', name:'Nelson Mandela', gender:'male', birthYear:1918, birthPlace:'Mvezo, South Africa', country:'South Africa', field:'Activism', subfield:'Anti-Apartheid',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1993}], collaborators:['Desmond Tutu'], bio:'Spent 27 years imprisoned; emerged to dismantle apartheid as president.' },
  { id:'wangari', name:'Wangari Maathai', gender:'female', birthYear:1940, birthPlace:'Ihithe, Kenya', country:'Kenya', field:'Activism', subfield:'Environmental',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2004}], collaborators:[], bio:'Founded the Green Belt Movement; first African woman to win the Nobel Peace Prize.' },
  { id:'greta', name:'Greta Thunberg', gender:'female', birthYear:2003, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Activism', subfield:'Environmental',
    teams:[], awards:[], collaborators:[], bio:'Sat outside parliament with a sign at fifteen; sparked a global climate strike movement.' },
  { id:'malala', name:'Malala Yousafzai', gender:'female', birthYear:1997, birthPlace:'Mingora, Pakistan', country:'Pakistan', field:'Activism', subfield:'Education',
    teams:[], awards:[{name:'Nobel Peace Prize',year:2014}], collaborators:[], bio:'Survived a Taliban assassination attempt; youngest-ever Nobel laureate.' },
  { id:'tubman', name:'Harriet Tubman', gender:'female', birthYear:1822, birthPlace:'Dorchester County, Maryland', country:'USA', field:'Activism', subfield:'Abolition',
    teams:[], awards:[], collaborators:[], bio:'Escaped slavery, returned thirteen times to lead some seventy others north on the Underground Railroad.' },
  { id:'cesar-chavez', name:'Cesar Chavez', gender:'male', birthYear:1927, birthPlace:'Yuma, Arizona', country:'USA', field:'Activism', subfield:'Labor',
    teams:[], awards:[], collaborators:['Dolores Huerta'], bio:'Co-founded the United Farm Workers; led the grape boycott.' },
  { id:'dolores-huerta', name:'Dolores Huerta', gender:'female', birthYear:1930, birthPlace:'Dawson, New Mexico', country:'USA', field:'Activism', subfield:'Labor',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2012}], collaborators:['Cesar Chavez'], bio:'Co-founded the United Farm Workers; coined "Sí, se puede."' },
  { id:'berta', name:'Berta Cáceres', gender:'female', birthYear:1971, birthPlace:'La Esperanza, Honduras', country:'Honduras', field:'Activism', subfield:'Indigenous Rights',
    teams:[], awards:[{name:'Goldman Environmental Prize',year:2015}], collaborators:[], bio:'Lenca leader who organized against the Agua Zarca dam; assassinated in 2016.' },
  { id:'aung-san', name:'Aung San Suu Kyi', gender:'female', birthYear:1945, birthPlace:'Yangon, Myanmar', country:'Myanmar', field:'Activism', subfield:'Pro-Democracy',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1991}], collaborators:[], bio:'Spent fifteen years under house arrest leading Myanmar\'s democracy movement.' },

  // =====================================================================
  //  ARCHITECTURE — global
  // =====================================================================
  { id:'gaudi', name:'Antoni Gaudí', gender:'male', birthYear:1852, birthPlace:'Reus, Spain', country:'Spain', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[], collaborators:[], bio:'Catalan modernist behind Sagrada Família and Park Güell.' },
  { id:'frank-lloyd-wright', name:'Frank Lloyd Wright', gender:'male', birthYear:1867, birthPlace:'Richland Center, Wisconsin', country:'USA', field:'Architecture', subfield:'Organic',
    teams:[], awards:[], collaborators:[], bio:'Father of organic architecture; Fallingwater, the Guggenheim, the prairie style.' },
  { id:'le-corbusier', name:'Le Corbusier', gender:'male', birthYear:1887, birthPlace:'La Chaux-de-Fonds, Switzerland', country:'Switzerland', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[], collaborators:[], bio:'Swiss-French modernist; "a house is a machine for living in."' },
  { id:'im-pei', name:'I. M. Pei', gender:'male', birthYear:1917, birthPlace:'Guangzhou, China', country:'China', field:'Architecture', subfield:'Modernist',
    teams:[], awards:[{name:'Pritzker Prize',year:1983}], collaborators:[], bio:'Designed the Louvre Pyramid and the Bank of China Tower.' },
  { id:'zaha-hadid', name:'Zaha Hadid', gender:'female', birthYear:1950, birthPlace:'Baghdad, Iraq', country:'Iraq', field:'Architecture', subfield:'Deconstructivist',
    teams:[], awards:[{name:'Pritzker Prize',year:2004}], collaborators:[], bio:'First woman to win the Pritzker Prize; sweeping, futurist forms.' },
  { id:'tadao-ando', name:'Tadao Ando', gender:'male', birthYear:1941, birthPlace:'Osaka, Japan', country:'Japan', field:'Architecture', subfield:'Minimalist',
    teams:[], awards:[{name:'Pritzker Prize',year:1995}], collaborators:[], bio:'Self-taught architect of austere, light-cut concrete.' },
  { id:'maya-lin', name:'Maya Lin', gender:'female', birthYear:1959, birthPlace:'Athens, Ohio', country:'USA', field:'Architecture', subfield:'Memorial',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2016}], collaborators:[], bio:'Designed the Vietnam Veterans Memorial as an undergraduate at Yale.' },

  // =====================================================================
  //  CHEFS — global
  // =====================================================================
  { id:'julia-child', name:'Julia Child', gender:'female', birthYear:1912, birthPlace:'Pasadena, California', country:'USA', field:'Culinary', subfield:'Television Chef',
    teams:[], awards:[], collaborators:[], bio:'Brought French cooking to American kitchens with Mastering the Art of French Cooking.' },
  { id:'bourdain', name:'Anthony Bourdain', gender:'male', birthYear:1956, birthPlace:'New York, New York', country:'USA', field:'Culinary', subfield:'Television Chef',
    teams:[], awards:[], collaborators:[], bio:'Chef, writer, and storyteller who taught a generation to travel through dinner.' },
  { id:'ottolenghi', name:'Yotam Ottolenghi', gender:'male', birthYear:1968, birthPlace:'Jerusalem, Israel', country:'Israel', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:['Sami Tamimi'], bio:'London-based chef whose books reshaped how the West cooks vegetables.' },
  { id:'massimo-bottura', name:'Massimo Bottura', gender:'male', birthYear:1962, birthPlace:'Modena, Italy', country:'Italy', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], bio:'Three-Michelin-star Italian; founder of Food for Soul.' },
  { id:'asma-khan', name:'Asma Khan', gender:'female', birthYear:1969, birthPlace:'Calcutta, India', country:'India', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], bio:'Founder of London\'s Darjeeling Express; the first Briton on Chef\'s Table.' },
  { id:'escoffier', name:'Auguste Escoffier', gender:'male', birthYear:1846, birthPlace:'Villeneuve-Loubet, France', country:'France', field:'Culinary', subfield:'Restaurateur',
    teams:[], awards:[], collaborators:[], bio:'Codified the brigade kitchen and modern French haute cuisine.' },

  // =====================================================================
  //  FASHION — global
  // =====================================================================
  { id:'coco-chanel', name:'Coco Chanel', gender:'female', birthYear:1883, birthPlace:'Saumur, France', country:'France', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:[], bio:'Liberated women from corsets; gave the world the little black dress and Chanel No. 5.' },
  { id:'ysl', name:'Yves Saint Laurent', gender:'male', birthYear:1936, birthPlace:'Oran, Algeria', country:'Algeria', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Pierre Bergé'], bio:'Algerian-born couturier; tuxedos for women, the Mondrian dress, ready-to-wear.' },
  { id:'westwood', name:'Vivienne Westwood', gender:'female', birthYear:1941, birthPlace:'Tintwistle, England', country:'UK', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Malcolm McLaren'], bio:'Punk\'s designer of record; tartan, corsets, and political fury.' },
  { id:'rei-kawakubo', name:'Rei Kawakubo', gender:'female', birthYear:1942, birthPlace:'Tokyo, Japan', country:'Japan', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:[], bio:'Founder of Comme des Garçons; deconstruction as wardrobe.' },
  { id:'iris-apfel', name:'Iris Apfel', gender:'female', birthYear:1921, birthPlace:'Astoria, New York', country:'USA', field:'Fashion', subfield:'Stylist',
    teams:[], awards:[], collaborators:[], bio:'Style icon who became a model in her late eighties.' },
  { id:'mcqueen', name:'Alexander McQueen', gender:'male', birthYear:1969, birthPlace:'London, England', country:'UK', field:'Fashion', subfield:'Designer',
    teams:[], awards:[], collaborators:['Isabella Blow'], bio:'British couturier of dark theatricality; bumster trousers and the bird-feather show.' },

  // =====================================================================
  //  RELIGION — global
  // =====================================================================
  { id:'dalai-lama', name:'Tenzin Gyatso', gender:'male', birthYear:1935, birthPlace:'Taktser, Tibet', country:'Tibet', field:'Religion', subfield:'Buddhist',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1989}], collaborators:[], bio:'14th Dalai Lama; Tibetan spiritual leader in exile since 1959.' },
  { id:'desmond-tutu', name:'Desmond Tutu', gender:'male', birthYear:1931, birthPlace:'Klerksdorp, South Africa', country:'South Africa', field:'Religion', subfield:'Anglican',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1984}], collaborators:['Nelson Mandela'], bio:'Anglican archbishop; chaired South Africa\'s Truth and Reconciliation Commission.' },
  { id:'mother-teresa', name:'Mother Teresa', gender:'female', birthYear:1910, birthPlace:'Skopje, North Macedonia', country:'North Macedonia', field:'Religion', subfield:'Catholic',
    teams:[], awards:[{name:'Nobel Peace Prize',year:1979}], collaborators:[], bio:'Founded the Missionaries of Charity in Calcutta; canonized in 2016.' },
  { id:'pope-francis', name:'Pope Francis', gender:'male', birthYear:1936, birthPlace:'Buenos Aires, Argentina', country:'Argentina', field:'Religion', subfield:'Catholic',
    teams:[], awards:[], collaborators:[], bio:'First Latin American pope; took the name of Francis of Assisi.' },
  { id:'hildegard', name:'Hildegard von Bingen', gender:'female', birthYear:1098, birthPlace:'Bermersheim, Germany', country:'Germany', field:'Religion', subfield:'Catholic',
    teams:[], awards:[], collaborators:[], bio:'Medieval mystic, composer, and physician; Doctor of the Church.' },

  // =====================================================================
  //  PHILOSOPHY — global
  // =====================================================================
  { id:'simone-de-beauvoir', name:'Simone de Beauvoir', gender:'female', birthYear:1908, birthPlace:'Paris, France', country:'France', field:'Philosophy', subfield:'Existentialism',
    teams:[], awards:[], collaborators:['Jean-Paul Sartre'], bio:'The Second Sex laid the philosophical foundation of modern feminism.' },
  { id:'arendt', name:'Hannah Arendt', gender:'female', birthYear:1906, birthPlace:'Linden, Germany', country:'Germany', field:'Philosophy', subfield:'Political Theory',
    teams:[], awards:[], collaborators:[], bio:'Political theorist; coined "the banality of evil" in Eichmann in Jerusalem.' },
  { id:'kierkegaard', name:'Søren Kierkegaard', gender:'male', birthYear:1813, birthPlace:'Copenhagen, Denmark', country:'Denmark', field:'Philosophy', subfield:'Existentialism',
    teams:[], awards:[], collaborators:[], bio:'Danish progenitor of existentialism; the leap of faith.' },
  { id:'fanon', name:'Frantz Fanon', gender:'male', birthYear:1925, birthPlace:'Fort-de-France, Martinique', country:'Martinique', field:'Philosophy', subfield:'Postcolonial',
    teams:[], awards:[], collaborators:[], bio:'Psychiatrist whose Black Skin, White Masks reframed colonialism and race.' },
  { id:'marx', name:'Karl Marx', gender:'male', birthYear:1818, birthPlace:'Trier, Germany', country:'Germany', field:'Philosophy', subfield:'Political Economy',
    teams:[], awards:[], collaborators:['Friedrich Engels'], bio:'Author of Das Kapital and The Communist Manifesto.' },

  // =====================================================================
  //  ROCK MUSIC — global
  // =====================================================================
  { id:'freddie-mercury', name:'Freddie Mercury', gender:'male', birthYear:1946, birthPlace:'Stone Town, Zanzibar', country:'Zanzibar', field:'Music', subfield:'Rock',
    teams:[{name:'Queen',years:[1970,1991]}], awards:[], collaborators:['Brian May','Roger Taylor'], bio:'Queen\'s frontman; four-octave voice; born Farrokh Bulsara on Zanzibar.' },
  { id:'bowie', name:'David Bowie', gender:'male', birthYear:1947, birthPlace:'Brixton, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[], awards:[{name:'Grammy Lifetime Achievement Award',year:2006}], collaborators:['Brian Eno','Iggy Pop'], bio:'Ziggy, the Thin White Duke, the Blackstar — pop music\'s shape-shifter.' },
  { id:'mick-jagger', name:'Mick Jagger', gender:'male', birthYear:1943, birthPlace:'Dartford, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[{name:'The Rolling Stones',years:[1962,2025]}], awards:[], collaborators:['Keith Richards'], bio:'Stones frontman, still strutting six decades on.' },
  { id:'joan-jett', name:'Joan Jett', gender:'female', birthYear:1958, birthPlace:'Wynnewood, Pennsylvania', country:'USA', field:'Music', subfield:'Rock',
    teams:[{name:'The Runaways',years:[1975,1979]},{name:'The Blackhearts',years:[1979,2025]}], awards:[], collaborators:['Lita Ford'], bio:'Riot-grrrl godmother; "I Love Rock \'n\' Roll" still rattles every dive bar.' },
  { id:'patti-smith', name:'Patti Smith', gender:'female', birthYear:1946, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Rock',
    teams:[], awards:[{name:'National Book Award for Nonfiction',year:2010}], collaborators:['Robert Mapplethorpe'], bio:'Punk poet laureate; Horses opens with one of rock\'s great first lines.' },
  { id:'robert-plant', name:'Robert Plant', gender:'male', birthYear:1948, birthPlace:'West Bromwich, England', country:'UK', field:'Music', subfield:'Rock',
    teams:[{name:'Led Zeppelin',years:[1968,1980]}], awards:[], collaborators:['Jimmy Page'], bio:'Led Zeppelin\'s wail; folk explorer in his solo decades.' },
  // (Björk, Joni Mitchell already exist above under Music/Pop — skipped.)

  // =====================================================================
  //  COUNTRY
  // =====================================================================
  // (Dolly Parton already exists above; her subfield update from Pop → Country
  //  is handled by editing the original entry directly when ready.)
  { id:'johnny-cash', name:'Johnny Cash', gender:'male', birthYear:1932, birthPlace:'Kingsland, Arkansas', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:['June Carter Cash'], bio:'The Man in Black; recorded At Folsom Prison live to inmates in 1968.' },
  { id:'willie-nelson', name:'Willie Nelson', gender:'male', birthYear:1933, birthPlace:'Abbott, Texas', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:['Waylon Jennings'], bio:"Outlaw country pioneer; Red Headed Stranger. Raised in the small Texas farming town of Abbott during the Depression by his grandparents, he wrote \"Crazy\" for Patsy Cline and \"Hello Walls\" for Faron Young before chasing his own career in earnest. His 1975 concept album Red Headed Stranger turned country radio on its head and went multi-platinum, and \"On the Road Again\" (1980) became his signature anthem. In 1985 he co-founded the annual Farm Aid benefit with Neil Young and John Mellencamp to support America's family farmers. A Country Music Hall of Famer with multiple Grammys, he has continued to record and tour into his nineties." },
  { id:'loretta-lynn', name:'Loretta Lynn', gender:'female', birthYear:1932, birthPlace:'Butcher Hollow, Kentucky', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:[], bio:'Coal Miner\'s Daughter; first woman to be Country Music Association Entertainer of the Year.' },
  { id:'hank-williams', name:'Hank Williams', gender:'male', birthYear:1923, birthPlace:'Mount Olive, Alabama', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[], collaborators:[], bio:'Honky-tonk patriarch; dead at 29 with the genre rewritten.' },

  // =====================================================================
  //  CLASSICAL
  // =====================================================================
  { id:'bach', name:'Johann Sebastian Bach', gender:'male', birthYear:1685, birthPlace:'Eisenach, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], bio:'Baroque composer of the Brandenburg Concertos and the Goldberg Variations.' },
  { id:'mozart', name:'Wolfgang Amadeus Mozart', gender:'male', birthYear:1756, birthPlace:'Salzburg, Austria', country:'Austria', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], bio:'Composed his first symphony at eight; six hundred works by thirty-five.' },
  { id:'beethoven', name:'Ludwig van Beethoven', gender:'male', birthYear:1770, birthPlace:'Bonn, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:[], bio:'Wrote the Ninth Symphony after he had gone deaf.' },
  { id:'yo-yo-ma', name:'Yo-Yo Ma', gender:'male', birthYear:1955, birthPlace:'Paris, France', country:'France', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2011}], collaborators:[], bio:'Cellist; eighteen Grammys; Bach Suites by candlelight.' },
  { id:'hilary-hahn', name:'Hilary Hahn', gender:'female', birthYear:1979, birthPlace:'Lexington, Virginia', country:'USA', field:'Music', subfield:'Classical',
    teams:[], awards:[{name:'Grammy Award',year:2003}], collaborators:[], bio:'Three-time Grammy-winning violinist with a fastidious tone.' },
  { id:'clara-schumann', name:'Clara Schumann', gender:'female', birthYear:1819, birthPlace:'Leipzig, Germany', country:'Germany', field:'Music', subfield:'Classical',
    teams:[], awards:[], collaborators:['Robert Schumann','Johannes Brahms'], bio:'Foremost pianist of the Romantic era and composer in her own right.' },

  // =====================================================================
  //  JAZZ
  // =====================================================================
  { id:'miles-davis', name:'Miles Davis', gender:'male', birthYear:1926, birthPlace:'Alton, Illinois', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['John Coltrane','Herbie Hancock'], bio:'Reinvented jazz five times — bebop, cool, modal, fusion, electric.' },
  { id:'coltrane', name:'John Coltrane', gender:'male', birthYear:1926, birthPlace:'Hamlet, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Miles Davis','McCoy Tyner'], bio:'A Love Supreme remains jazz\'s most spiritual statement.' },
  { id:'charlie-parker', name:'Charlie Parker', gender:'male', birthYear:1920, birthPlace:'Kansas City, Kansas', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Dizzy Gillespie'], bio:'Bird — alto saxophonist who invented bebop with Dizzy Gillespie.' },
  { id:'louis-armstrong', name:'Louis Armstrong', gender:'male', birthYear:1901, birthPlace:'New Orleans, Louisiana', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:['Ella Fitzgerald'], bio:'Satchmo — the trumpet, the gravel voice, the smile that defined jazz.' },
  { id:'nina-simone', name:'Nina Simone', gender:'female', birthYear:1933, birthPlace:'Tryon, North Carolina', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[], collaborators:[], bio:'High Priestess of Soul; classically trained, civil-rights-charged.' },
  { id:'duke-ellington', name:'Duke Ellington', gender:'male', birthYear:1899, birthPlace:'Washington, D.C.', country:'USA', field:'Music', subfield:'Jazz',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:1969}], collaborators:['Billy Strayhorn'], bio:'Bandleader, composer, and jazz\'s most prolific pen.' },

  // =====================================================================
  //  R&B / SOUL
  // =====================================================================
  { id:'marvin-gaye', name:'Marvin Gaye', gender:'male', birthYear:1939, birthPlace:'Washington, D.C.', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:['Tammi Terrell'], bio:'Prince of Motown; What\'s Going On rewrote the political album.' },
  { id:'stevie-wonder', name:'Stevie Wonder', gender:'male', birthYear:1950, birthPlace:'Saginaw, Michigan', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2014}], collaborators:[], bio:'Twenty-five Grammys; Songs in the Key of Life.' },
  { id:'sade', name:'Sade Adu', gender:'female', birthYear:1959, birthPlace:'Ibadan, Nigeria', country:'Nigeria', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:[], bio:'Smooth-operator voice and decade-spaced records you can set a mood by.' },
  { id:'sam-cooke', name:'Sam Cooke', gender:'male', birthYear:1931, birthPlace:'Clarksdale, Mississippi', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[], collaborators:[], bio:'Father of soul; "A Change Is Gonna Come" arrived weeks before he was killed.' },
  { id:'anita-baker', name:'Anita Baker', gender:'female', birthYear:1958, birthPlace:'Toledo, Ohio', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[{name:'Grammy Award',year:1987}], collaborators:[], bio:'Eight Grammys; the velvet alto behind Rapture.' },

  // =====================================================================
  //  WORLD MUSIC
  // =====================================================================
  { id:'bob-marley', name:'Bob Marley', gender:'male', birthYear:1945, birthPlace:'Nine Mile, Jamaica', country:'Jamaica', field:'Music', subfield:'Reggae',
    teams:[{name:'The Wailers',years:[1963,1981]}], awards:[], collaborators:['Peter Tosh','Bunny Wailer'], bio:"Carried reggae and Rastafari to the world. Born in the rural village of Nine Mile, Saint Ann, to a teenage Jamaican mother and a much older British-Jamaican father he barely knew, he co-founded The Wailers in 1963 with Peter Tosh and Bunny Wailer. After signing with Island Records in 1972, he and the band released the genre-defining albums Catch a Fire (1973), Natty Dread (1974), and Exodus (1977). He survived an assassination attempt at his Hope Road home in December 1976 and performed at the Smile Jamaica concert two days later with a wounded arm. Diagnosed with melanoma, he died in 1981 at age 36 and was given a Jamaican state funeral." },
  { id:'fela-kuti', name:'Fela Kuti', gender:'male', birthYear:1938, birthPlace:'Abeokuta, Nigeria', country:'Nigeria', field:'Music', subfield:'Afrobeat',
    teams:[], awards:[], collaborators:['Tony Allen'], bio:'Invented Afrobeat; turned his Lagos compound into a republic.' },
  { id:'ravi-shankar', name:'Ravi Shankar', gender:'male', birthYear:1920, birthPlace:'Varanasi, India', country:'India', field:'Music', subfield:'Indian Classical',
    teams:[], awards:[], collaborators:['George Harrison'], bio:'Brought the sitar and Hindustani classical music to the global pop conversation.' },
  { id:'edith-piaf', name:'Édith Piaf', gender:'female', birthYear:1915, birthPlace:'Paris, France', country:'France', field:'Music', subfield:'Chanson',
    teams:[], awards:[], collaborators:[], bio:'Little Sparrow of Paris; "Non, je ne regrette rien."' },
  { id:'caetano-veloso', name:'Caetano Veloso', gender:'male', birthYear:1942, birthPlace:'Santo Amaro, Brazil', country:'Brazil', field:'Music', subfield:'Tropicália',
    teams:[], awards:[], collaborators:['Gilberto Gil'], bio:'Tropicália founder who fused bossa, rock, and Brazilian poetry.' },

  // =====================================================================
  //  FILM DIRECTORS — global
  // =====================================================================
  { id:'kurosawa', name:'Akira Kurosawa', gender:'male', birthYear:1910, birthPlace:'Tokyo, Japan', country:'Japan', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1990}], collaborators:['Toshiro Mifune'], bio:'Seven Samurai, Rashomon, Ran — the towering Japanese director.' },
  { id:'fellini', name:'Federico Fellini', gender:'male', birthYear:1920, birthPlace:'Rimini, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:1993}], collaborators:['Marcello Mastroianni'], bio:'La Dolce Vita and 8½; defined Italian cinema after the war.' },
  { id:'bergman', name:'Ingmar Bergman', gender:'male', birthYear:1918, birthPlace:'Uppsala, Sweden', country:'Sweden', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Liv Ullmann'], bio:'Swedish director of Persona, The Seventh Seal, Wild Strawberries.' },
  { id:'miyazaki', name:'Hayao Miyazaki', gender:'male', birthYear:1941, birthPlace:'Tokyo, Japan', country:'Japan', field:'Film', subfield:'Director',
    teams:[{name:'Studio Ghibli',years:[1985,2025]}], awards:[{name:'Academy Award for Best Animated Feature',year:2003}], collaborators:['Joe Hisaishi'], bio:'Co-founded Studio Ghibli; Spirited Away, Totoro, Princess Mononoke.' },
  { id:'almodovar', name:'Pedro Almodóvar', gender:'male', birthYear:1949, birthPlace:'Calzada de Calatrava, Spain', country:'Spain', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:2003}], collaborators:['Penélope Cruz'], bio:'Spanish auteur of bold color and stranger family ties.' },
  { id:'agnes-varda', name:'Agnès Varda', gender:'female', birthYear:1928, birthPlace:'Ixelles, Belgium', country:'Belgium', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:2017}], collaborators:[], bio:'Grandmother of the French New Wave; Cléo from 5 to 7.' },
  { id:'bong', name:'Bong Joon-ho', gender:'male', birthYear:1969, birthPlace:'Daegu, South Korea', country:'South Korea', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:2020}], collaborators:['Song Kang-ho'], bio:'Parasite swept the Oscars; first non-English-language Best Picture winner.' },
  { id:'chloe-zhao', name:'Chloé Zhao', gender:'female', birthYear:1982, birthPlace:'Beijing, China', country:'China', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Director',year:2021}], collaborators:[], bio:'Nomadland — first woman of color to win Best Director.' },
  { id:'wertmuller', name:'Lina Wertmüller', gender:'female', birthYear:1928, birthPlace:'Rome, Italy', country:'Italy', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Honorary Award',year:2019}], collaborators:[], bio:'First woman ever nominated for the Best Director Oscar (1977).' },
  { id:'gerwig', name:'Greta Gerwig', gender:'female', birthYear:1983, birthPlace:'Sacramento, California', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Noah Baumbach'], bio:'Lady Bird, Little Women, Barbie — the most commercially powerful woman director in history.' },
  { id:'spike-lee', name:'Spike Lee', gender:'male', birthYear:1957, birthPlace:'Atlanta, Georgia', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Adapted Screenplay',year:2019}], collaborators:['Denzel Washington'], bio:'Do the Right Thing, Malcolm X, BlacKkKlansman.' },
  { id:'sofia-coppola', name:'Sofia Coppola', gender:'female', birthYear:1971, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Original Screenplay',year:2004}], collaborators:[], bio:'Lost in Translation, The Virgin Suicides; languid, observational moods.' },

  // =====================================================================
  //  CLASSIC HOLLYWOOD
  // =====================================================================
  { id:'audrey-hepburn', name:'Audrey Hepburn', gender:'female', birthYear:1929, birthPlace:'Ixelles, Belgium', country:'Belgium', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1954}], collaborators:[], bio:'Roman Holiday, Breakfast at Tiffany\'s; later UNICEF ambassador.' },
  { id:'cary-grant', name:'Cary Grant', gender:'male', birthYear:1904, birthPlace:'Bristol, England', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Honorary Award',year:1970}], collaborators:['Alfred Hitchcock'], bio:'Born Archibald Leach; perfected the screwball leading man.' },
  { id:'marlene-dietrich', name:'Marlene Dietrich', gender:'female', birthYear:1901, birthPlace:'Schöneberg, Germany', country:'Germany', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:['Josef von Sternberg'], bio:'Smoky-voiced cabaret icon; sang for Allied troops in WWII.' },
  { id:'greta-garbo', name:'Greta Garbo', gender:'female', birthYear:1905, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Honorary Award',year:1955}], collaborators:[], bio:'"I want to be alone." Retired at thirty-six and never returned.' },
  { id:'ingrid-bergman', name:'Ingrid Bergman', gender:'female', birthYear:1915, birthPlace:'Stockholm, Sweden', country:'Sweden', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1945}], collaborators:[], bio:'Casablanca, Notorious — Swedish star of Hollywood\'s Golden Age.' },
  { id:'sidney-poitier', name:'Sidney Poitier', gender:'male', birthYear:1927, birthPlace:'Miami, Florida', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:1964}], collaborators:[], bio:"First Black man to win the Best Actor Oscar. Born prematurely in Miami while his Bahamian parents were visiting from Cat Island, he grew up in the Bahamas and only returned to the United States as a teenager. He took home the Best Actor statuette in 1964 for Lilies of the Field, and in 1967 anchored a remarkable trio of films — In the Heat of the Night, Guess Who's Coming to Dinner, and To Sir, with Love. He later turned to directing comedies including Buck and the Preacher and the Richard Pryor–Gene Wilder hit Stir Crazy. Knighted by Queen Elizabeth II in 1974, he served as the Bahamian ambassador to Japan from 1997 to 2007." },
  { id:'bette-davis', name:'Bette Davis', gender:'female', birthYear:1908, birthPlace:'Lowell, Massachusetts', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1936}], collaborators:[], bio:'Two Oscars and a third-act renaissance with What Ever Happened to Baby Jane?' },
  { id:'kate-hepburn', name:'Katharine Hepburn', gender:'female', birthYear:1907, birthPlace:'Hartford, Connecticut', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:1934}], collaborators:['Spencer Tracy'], bio:'Four Best Actress Oscars — still the all-time record.' },

  // =====================================================================
  //  INTERNATIONAL ACTORS
  // =====================================================================
  { id:'marion-cotillard', name:'Marion Cotillard', gender:'female', birthYear:1975, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:2008}], collaborators:[], bio:'La Vie en Rose; first French actress to win Best Actress for a French-language role.' },
  { id:'penelope-cruz', name:'Penélope Cruz', gender:'female', birthYear:1974, birthPlace:'Alcobendas, Spain', country:'Spain', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2009}], collaborators:['Pedro Almodóvar'], bio:'Almodóvar\'s muse; first Spanish actress to win an Oscar.' },
  { id:'mifune', name:'Toshiro Mifune', gender:'male', birthYear:1920, birthPlace:'Qingdao, China', country:'Japan', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:['Akira Kurosawa'], bio:'Kurosawa\'s lead in sixteen films; the samurai you picture when you picture a samurai.' },
  { id:'cate-blanchett', name:'Cate Blanchett', gender:'female', birthYear:1969, birthPlace:'Melbourne, Australia', country:'Australia', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Actress',year:2014}], collaborators:[], bio:'Two Oscars; ranges from Galadriel to Bob Dylan to Lydia Tár.' },
  { id:'tilda-swinton', name:'Tilda Swinton', gender:'female', birthYear:1960, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Actress',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actress',year:2008}], collaborators:['Wes Anderson'], bio:'Otherworldly screen presence; muse to Jarman, Anderson, Bong.' },
  { id:'anya-taylor-joy', name:'Anya Taylor-Joy', gender:'female', birthYear:1996, birthPlace:'Miami, Florida', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], bio:'The Queen\'s Gambit, Furiosa; raised in Argentina and the UK.' },
  { id:'lea-seydoux', name:'Léa Seydoux', gender:'female', birthYear:1985, birthPlace:'Paris, France', country:'France', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], bio:'Blue Is the Warmest Color; the new Bond girl who outacts the franchise.' },
  { id:'daniel-day-lewis', name:'Daniel Day-Lewis', gender:'male', birthYear:1957, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[{name:'Academy Award for Best Actor',year:2013}], collaborators:[], bio:'Three Best Actor Oscars — the only man to do so.' },

  // =====================================================================
  //  COMEDIANS
  // =====================================================================
  { id:'chaplin', name:'Charlie Chaplin', gender:'male', birthYear:1889, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Honorary Award',year:1972}], collaborators:[], bio:"The Tramp; silent film's first global star. Born to music-hall parents in the Walworth district of London, he spent stretches of his childhood in workhouses after his father's death and his mother's institutionalization. He joined Mack Sennett's Keystone Studios in 1914 and within months had developed the Little Tramp, the bowler-hatted character that made him cinema's most recognizable figure. In 1919 he co-founded United Artists with Mary Pickford, Douglas Fairbanks, and D. W. Griffith, gaining unprecedented control over his work. Across that career he wrote, directed, and starred in The Kid (1921), City Lights (1931), Modern Times (1936), and the anti-Nazi The Great Dictator (1940), and was knighted by Queen Elizabeth II in 1975." },
  { id:'buster-keaton', name:'Buster Keaton', gender:'male', birthYear:1895, birthPlace:'Piqua, Kansas', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Honorary Award',year:1960}], collaborators:[], bio:'The Great Stone Face; The General is still the gold standard for physical comedy.' },
  { id:'lucille-ball', name:'Lucille Ball', gender:'female', birthYear:1911, birthPlace:'Jamestown, New York', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Desi Arnaz'], bio:'I Love Lucy; co-founded Desilu, the studio that produced Star Trek.' },
  { id:'robin-williams', name:'Robin Williams', gender:'male', birthYear:1951, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[{name:'Academy Award for Best Supporting Actor',year:1998}], collaborators:[], bio:'Improvisational genius — Mork, Mrs. Doubtfire, Sean Maguire.' },
  { id:'tina-fey', name:'Tina Fey', gender:'female', birthYear:1970, birthPlace:'Upper Darby, Pennsylvania', country:'USA', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Amy Poehler'], bio:'First female head writer of SNL; created 30 Rock.' },
  { id:'gervais', name:'Ricky Gervais', gender:'male', birthYear:1961, birthPlace:'Reading, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:['Stephen Merchant'], bio:'Co-created The Office (UK) — the format the world has now remade fifteen ways.' },
  { id:'phoebe-waller-bridge', name:'Phoebe Waller-Bridge', gender:'female', birthYear:1985, birthPlace:'London, England', country:'UK', field:'Film', subfield:'Comedian',
    teams:[], awards:[], collaborators:[], bio:'Created Fleabag and Killing Eve; reshaped what a half-hour comedy looks like.' },

  // =====================================================================
  //  TRANSGENDER
  // =====================================================================
  { id:'marsha-p-johnson', name:'Marsha P. Johnson', gender:'female', birthYear:1945, birthPlace:'Elizabeth, New Jersey', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:['Sylvia Rivera'], bio:'Trans activist at the front of the 1969 Stonewall uprising; co-founded STAR.' },
  { id:'sylvia-rivera', name:'Sylvia Rivera', gender:'female', birthYear:1951, birthPlace:'New York, New York', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:['Marsha P. Johnson'], bio:'Trans Latina activist; STAR co-founder; Stonewall veteran.' },
  { id:'laverne-cox', name:'Laverne Cox', gender:'female', birthYear:1972, birthPlace:'Mobile, Alabama', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], bio:'Orange Is the New Black; first trans woman of color to lead a primetime series.' },
  { id:'janet-mock', name:'Janet Mock', gender:'female', birthYear:1983, birthPlace:'Honolulu, Hawaii', country:'USA', field:'Literature', subfield:'Memoirist',
    teams:[], awards:[], collaborators:[], bio:'Author of Redefining Realness; first trans woman of color to write/direct for primetime TV.' },
  { id:'elliot-page', name:'Elliot Page', gender:'male', birthYear:1987, birthPlace:'Halifax, Canada', country:'Canada', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], bio:'Juno, The Umbrella Academy; came out as trans in 2020.' },
  { id:'lana-wachowski', name:'Lana Wachowski', gender:'female', birthYear:1965, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Lilly Wachowski'], bio:'Co-directed The Matrix; first openly trans director of a major Hollywood film.' },
  { id:'lilly-wachowski', name:'Lilly Wachowski', gender:'female', birthYear:1967, birthPlace:'Chicago, Illinois', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[], collaborators:['Lana Wachowski'], bio:'The Matrix, Sense8; co-creator of one of cinema\'s most influential franchises.' },
  { id:'hunter-schafer', name:'Hunter Schafer', gender:'female', birthYear:1998, birthPlace:'Trenton, New Jersey', country:'USA', field:'Film', subfield:'Actress',
    teams:[], awards:[], collaborators:[], bio:'Euphoria\'s Jules; modeled for Dior; co-wrote her own special episode.' },
  { id:'wendy-carlos', name:'Wendy Carlos', gender:'female', birthYear:1939, birthPlace:'Pawtucket, Rhode Island', country:'USA', field:'Music', subfield:'Electronic',
    teams:[], awards:[{name:'Grammy Award',year:1969}], collaborators:['Stanley Kubrick'], bio:'Switched-On Bach; scored A Clockwork Orange and TRON; trans pioneer in music.' },
  { id:'renee-richards', name:'Renée Richards', gender:'female', birthYear:1934, birthPlace:'New York, New York', country:'USA', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:['Martina Navratilova'], bio:'Won a 1977 court case to play pro tennis as a woman.' },
  { id:'christine-jorgensen', name:'Christine Jorgensen', gender:'female', birthYear:1926, birthPlace:'New York, New York', country:'USA', field:'Activism', subfield:'LGBTQ+',
    teams:[], awards:[], collaborators:[], bio:'First widely known American to undergo gender-affirming surgery (1952).' },
  { id:'vladimir-luxuria', name:'Vladimir Luxuria', gender:'female', birthYear:1965, birthPlace:'Foggia, Italy', country:'Italy', field:'Politics', subfield:'Member of Parliament',
    teams:[], awards:[], collaborators:[], bio:'First openly trans member of any European parliament (Italy, 2006).' },

  // =====================================================================
  //  NON-BINARY
  // =====================================================================
  { id:'indya-moore', name:'Indya Moore', gender:'nonbinary', birthYear:1995, birthPlace:'New York, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], bio:'Pose; one of the first openly non-binary cover stars on a major fashion magazine.' },
  { id:'sam-smith', name:'Sam Smith', gender:'nonbinary', birthYear:1992, birthPlace:'London, England', country:'UK', field:'Music', subfield:'Pop',
    teams:[], awards:[{name:'Academy Award for Best Original Song',year:2016}], collaborators:[], bio:'British singer; came out as non-binary in 2019.' },
  // (Demi Lovato and Janelle Monáe exist earlier under Music/Pop — gender
  //  field on those originals is updated in place to 'nonbinary'.)
  { id:'asia-kate-dillon', name:'Asia Kate Dillon', gender:'nonbinary', birthYear:1984, birthPlace:'Ithaca, New York', country:'USA', field:'Film', subfield:'Actor',
    teams:[], awards:[], collaborators:[], bio:'Billions; first openly non-binary actor on a major TV series.' },
  { id:'alok', name:'Alok Vaid-Menon', gender:'nonbinary', birthYear:1991, birthPlace:'College Station, Texas', country:'USA', field:'Literature', subfield:'Poet',
    teams:[], awards:[], collaborators:[], bio:'Poet, performer, and gender non-conformity advocate.' },
  { id:'travis-alabanza', name:'Travis Alabanza', gender:'nonbinary', birthYear:1995, birthPlace:'Bristol, England', country:'UK', field:'Literature', subfield:'Performer',
    teams:[], awards:[], collaborators:[], bio:'British playwright and performance artist; author of None of the Above.' },
  { id:'rebecca-sugar', name:'Rebecca Sugar', gender:'nonbinary', birthYear:1987, birthPlace:'Silver Spring, Maryland', country:'USA', field:'Film', subfield:'Animator',
    teams:[], awards:[], collaborators:[], bio:'Created Steven Universe; first solo woman/non-binary creator of a Cartoon Network series.' },

  // =====================================================================
  //  GLOBAL SPORTS — non-US, additional disciplines
  // =====================================================================
  { id:'pele', name:'Pelé', gender:'male', birthYear:1940, birthPlace:'Três Corações, Brazil', country:'Brazil', field:'Sports', subfield:'Soccer',
    teams:[{name:'Santos FC',years:[1956,1974]},{name:'Brazil',years:[1957,1971]}], awards:[{name:'FIFA World Cup Champion',year:1970}], collaborators:[], bio:'Three-time World Cup champion; the most globally famous athlete of the 20th century.' },
  { id:'maradona', name:'Diego Maradona', gender:'male', birthYear:1960, birthPlace:'Lanús, Argentina', country:'Argentina', field:'Sports', subfield:'Soccer',
    teams:[{name:'Argentina',years:[1977,1994]},{name:'Napoli',years:[1984,1991]}], awards:[{name:'FIFA World Cup Champion',year:1986}], collaborators:[], bio:'The Hand of God; carried Argentina to a 1986 World Cup almost single-handedly.' },
  { id:'serena-williams', name:'Serena Williams', gender:'female', birthYear:1981, birthPlace:'Saginaw, Michigan', country:'USA', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:['Venus Williams'], bio:'23 Grand Slam singles titles; the gold standard of women\'s tennis.' },
  { id:'roger-federer', name:'Roger Federer', gender:'male', birthYear:1981, birthPlace:'Basel, Switzerland', country:'Switzerland', field:'Sports', subfield:'Tennis',
    teams:[], awards:[], collaborators:[], bio:'20 Grand Slam singles titles; tennis\' most graceful technician.' },
  { id:'ali', name:'Muhammad Ali', gender:'male', birthYear:1942, birthPlace:'Louisville, Kentucky', country:'USA', field:'Sports', subfield:'Boxing',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2005}], collaborators:[], bio:'The Greatest; refused Vietnam draft, lost his title, won it back twice.' },
  { id:'simone-biles', name:'Simone Biles', gender:'female', birthYear:1997, birthPlace:'Columbus, Ohio', country:'USA', field:'Sports', subfield:'Gymnastics',
    teams:[], awards:[], collaborators:[], bio:'Most-decorated gymnast in history; multiple skills named after her.' },
  { id:'usain-bolt', name:'Usain Bolt', gender:'male', birthYear:1986, birthPlace:'Sherwood Content, Jamaica', country:'Jamaica', field:'Sports', subfield:'Track',
    teams:[], awards:[], collaborators:[], bio:'8 Olympic gold medals; world records in the 100m and 200m.' },
  { id:'nadia-comaneci', name:'Nadia Comăneci', gender:'female', birthYear:1961, birthPlace:'Onești, Romania', country:'Romania', field:'Sports', subfield:'Gymnastics',
    teams:[], awards:[], collaborators:[], bio:'First gymnast ever scored a perfect 10 — at the 1976 Montreal Olympics, age 14.' },
  { id:'jackie-robinson', name:'Jackie Robinson', gender:'male', birthYear:1919, birthPlace:'Cairo, Georgia', country:'USA', field:'Sports', subfield:'MLB',
    teams:[{name:'Brooklyn Dodgers',years:[1947,1956]}], awards:[{name:'MLB MVP',year:1949}], collaborators:[], bio:'First Black player in the modern Major Leagues; jersey #42 retired league-wide.' },
  { id:'wayne-gretzky', name:'Wayne Gretzky', gender:'male', birthYear:1961, birthPlace:'Brantford, Canada', country:'Canada', field:'Sports', subfield:'NHL',
    teams:[{name:'Edmonton Oilers',years:[1979,1988]},{name:'Los Angeles Kings',years:[1988,1996]}], awards:[], collaborators:[], bio:'The Great One; NHL all-time leading scorer by a margin no one will ever close.' },

  // =====================================================================
  //  GLOBAL LITERATURE — non-US, era-diverse
  // =====================================================================
  { id:'gabriel-garcia-marquez', name:'Gabriel García Márquez', gender:'male', birthYear:1927, birthPlace:'Aracataca, Colombia', country:'Colombia', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Nobel Prize in Literature',year:1982}], collaborators:[], bio:'One Hundred Years of Solitude; godfather of magical realism.' },
  { id:'chimamanda', name:'Chimamanda Ngozi Adichie', gender:'female', birthYear:1977, birthPlace:'Enugu, Nigeria', country:'Nigeria', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], bio:"Americanah; \"We should all be feminists.\" Born in Enugu, Nigeria, the fifth of six children of a statistics professor and a university registrar, she studied medicine briefly in Nigeria before moving to the United States to read communications and political science. Her second novel Half of a Yellow Sun (2006), set during the Biafran War, won the Orange Prize for Fiction and was adapted to film in 2013 starring Chiwetel Ejiofor and Thandiwe Newton. Americanah (2013) won the U.S. National Book Critics Circle Award for fiction. Her 2012 TEDx talk \"We Should All Be Feminists,\" later expanded as a 2014 essay, was famously sampled by Beyoncé on \"Flawless.\"" },
  { id:'haruki-murakami', name:'Haruki Murakami', gender:'male', birthYear:1949, birthPlace:'Kyoto, Japan', country:'Japan', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], bio:'Norwegian Wood, Kafka on the Shore; cats, jazz, parallel worlds.' },
  { id:'arundhati-roy', name:'Arundhati Roy', gender:'female', birthYear:1961, birthPlace:'Shillong, India', country:'India', field:'Literature', subfield:'Novelist',
    teams:[], awards:[{name:'Booker Prize',year:1997}], collaborators:[], bio:'The God of Small Things; Indian novelist and essayist.' },
  { id:'james-joyce', name:'James Joyce', gender:'male', birthYear:1882, birthPlace:'Dublin, Ireland', country:'Ireland', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], bio:'Ulysses, Finnegans Wake; reshaped what a novel could be.' },
  { id:'virginia-woolf', name:'Virginia Woolf', gender:'female', birthYear:1882, birthPlace:'London, England', country:'UK', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], bio:'To the Lighthouse, A Room of One\'s Own; modernism\'s most piercing voice.' },
  { id:'chinua-achebe', name:'Chinua Achebe', gender:'male', birthYear:1930, birthPlace:'Ogidi, Nigeria', country:'Nigeria', field:'Literature', subfield:'Novelist',
    teams:[], awards:[], collaborators:[], bio:'Things Fall Apart; father of modern African literature.' },
  { id:'borges', name:'Jorge Luis Borges', gender:'male', birthYear:1899, birthPlace:'Buenos Aires, Argentina', country:'Argentina', field:'Literature', subfield:'Short Story',
    teams:[], awards:[], collaborators:[], bio:'Argentine fabulist of labyrinths, libraries, and infinite mirrors.' },

  // =====================================================================
  //  ANNIVERSARIES — added 2026-05-01 (rotation: "Anniversaries today")
  //  10 figures whose calendar birthday is May 1.
  // =====================================================================
  { id:'joseph-heller', name:'Joseph Heller', gender:'male', birthYear:1923, birthPlace:'Brooklyn, New York', country:'USA', field:'Literature', subfield:'Novelist',
    teams:[], awards:[],
    collaborators:[], bio:'B-25 bombardier whose 60 missions over Italy became Catch-22 — the novel that gave English its term for circular logic.' },

  { id:'wes-anderson', name:'Wes Anderson', gender:'male', birthYear:1969, birthPlace:'Houston, Texas', country:'USA', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'Academy Award for Best Live Action Short Film',year:2024}],
    collaborators:[], bio:'Symmetry-obsessed dollhouse-maker behind Rushmore, The Royal Tenenbaums, and The Grand Budapest Hotel.' },

  { id:'tim-mcgraw', name:'Tim McGraw', gender:'male', birthYear:1967, birthPlace:'Delhi, Louisiana', country:'USA', field:'Music', subfield:'Country',
    teams:[], awards:[],
    collaborators:['Faith Hill'], bio:'Country radio\'s most enduring chart presence; son of MLB pitcher Tug McGraw, married to Faith Hill since 1996.' },

  { id:'joanna-lumley', name:'Joanna Lumley', gender:'female', birthYear:1946, birthPlace:'Srinagar, India', country:'UK', field:'Film', subfield:'Actress',
    teams:[], awards:[],
    collaborators:[], bio:'Patsy Stone in Absolutely Fabulous and Purdey in The New Avengers; activist who won Gurkhas the right to settle in Britain.' },

  { id:'glenn-ford', name:'Glenn Ford', gender:'male', birthYear:1916, birthPlace:'Sainte-Christine, Quebec', country:'Canada', field:'Film', subfield:'Actor',
    teams:[], awards:[],
    collaborators:[], bio:'Quebec-born everyman of the noir era — Gilda, The Big Heat, Blackboard Jungle, then Pa Kent in Superman.' },

  { id:'judy-collins', name:'Judy Collins', gender:'female', birthYear:1939, birthPlace:'Seattle, Washington', country:'USA', field:'Music', subfield:'Pop',
    teams:[], awards:[],
    collaborators:['Joni Mitchell'], bio:'Crystal soprano whose 1967 cover of Both Sides Now beat Joni Mitchell to the airwaves and made the song a standard.' },

  { id:'teilhard-de-chardin', name:'Pierre Teilhard de Chardin', gender:'male', birthYear:1881, birthPlace:'Orcines, France', country:'France', field:'Religion', subfield:'Jesuit',
    teams:[], awards:[],
    collaborators:[], bio:'Jesuit paleontologist who tried to fuse evolution and Catholic theology — silenced by Rome, posthumously canonical anyway.' },

  { id:'jamie-dornan', name:'Jamie Dornan', gender:'male', birthYear:1982, birthPlace:'Holywood, Northern Ireland', country:'UK', field:'Film', subfield:'Actor',
    teams:[], awards:[],
    collaborators:[], bio:'Calvin Klein model turned pulp leading man (Fifty Shades) who finally got serious in Branagh\'s Belfast.' },

  { id:'rita-coolidge', name:'Rita Coolidge', gender:'female', birthYear:1945, birthPlace:'Lafayette, Tennessee', country:'USA', field:'Music', subfield:'R&B',
    teams:[], awards:[],
    collaborators:[], bio:'Cherokee-Scottish session-singer-turned-star whose smoky take on Higher and Higher was 1977\'s unlikeliest crossover hit.' },

  { id:'curtis-martin', name:'Curtis Martin', gender:'male', birthYear:1973, birthPlace:'Pittsburgh, Pennsylvania', country:'USA', field:'Sports', subfield:'NFL',
    teams:[{name:'New England Patriots',years:[1995,1997]},{name:'New York Jets',years:[1998,2005]}],
    awards:[{name:'AP Offensive Rookie of the Year',year:1995}],
    collaborators:[], bio:'Pittsburgh third-rounder who ran for 14,101 yards in eleven seasons and walked into the Hall of Fame on the first ballot.' },

  // =====================================================================
  //  STRENGTHEN-THE-GRAPH — added 2026-05-03 (rotation: "Strengthen the graph")
  //  10 connector figures whose collaborators reach back into the dataset.
  // =====================================================================
  { id:'pierre-curie', name:'Pierre Curie', gender:'male', birthYear:1859, birthPlace:'Paris, France', country:'France', field:'Science', subfield:'Physics',
    teams:[], awards:[{name:'Nobel Prize in Physics',year:1903}],
    collaborators:['Marie Curie','Henri Becquerel'], bio:'Discovered piezoelectricity in his twenties; shared a Nobel for radioactivity with Marie; killed at 46 by a Paris carriage.' },

  { id:'charles-babbage', name:'Charles Babbage', gender:'male', birthYear:1791, birthPlace:'London, England', country:'UK', field:'Science', subfield:'Computing',
    teams:[], awards:[{name:'Royal Astronomical Society Gold Medal',year:1824}],
    collaborators:['Ada Lovelace'], bio:'Victorian polymath whose unbuilt Analytical Engine described every component of the modern computer a century early.' },

  { id:'friedrich-engels', name:'Friedrich Engels', gender:'male', birthYear:1820, birthPlace:'Barmen, Prussia', country:'Germany', field:'Philosophy', subfield:'Political Economy',
    teams:[], awards:[],
    collaborators:['Karl Marx'], bio:'Manchester mill manager who bankrolled Marx\'s decades of poverty and co-wrote the Communist Manifesto on his lunch breaks.' },

  { id:'alfred-hitchcock', name:'Alfred Hitchcock', gender:'male', birthYear:1899, birthPlace:'Leytonstone, England', country:'UK', field:'Film', subfield:'Director',
    teams:[], awards:[{name:'AFI Life Achievement Award',year:1979}],
    collaborators:['Cary Grant','Ingrid Bergman','Grace Kelly'], bio:'London cockney who turned suspense into its own grammar — Rear Window, Vertigo, Psycho — and never won Best Director.' },

  { id:'diego-rivera', name:'Diego Rivera', gender:'male', birthYear:1886, birthPlace:'Guanajuato, Mexico', country:'Mexico', field:'Visual Arts', subfield:'Muralist',
    teams:[], awards:[],
    collaborators:['Frida Kahlo'], bio:'Mexican muralist who married Frida Kahlo twice; in 1934 Rockefeller had his Lenin fresco chiseled off the wall.' },

  { id:'andy-warhol', name:'Andy Warhol', gender:'male', birthYear:1928, birthPlace:'Pittsburgh, Pennsylvania', country:'USA', field:'Visual Arts', subfield:'Pop Artist',
    teams:[], awards:[],
    collaborators:['Jean-Michel Basquiat','Lou Reed','Edie Sedgwick'], bio:'Soup cans, silkscreen Marilyns, and an eight-hour film of the Empire State Building; survived a 1968 shooting at The Factory.' },

  { id:'quincy-jones', name:'Quincy Jones', gender:'male', birthYear:1933, birthPlace:'Chicago, Illinois', country:'USA', field:'Music', subfield:'Producer',
    teams:[], awards:[{name:'Jean Hersholt Humanitarian Award',year:1995}],
    collaborators:['Michael Jackson','Frank Sinatra','Ella Fitzgerald','Miles Davis'], bio:'Arranged for Sinatra and Basie, scored In the Heat of the Night at thirty-four, produced Thriller at forty-nine.' },

  { id:'yoko-ono', name:'Yoko Ono', gender:'female', birthYear:1933, birthPlace:'Tokyo, Japan', country:'Japan', field:'Visual Arts', subfield:'Conceptual Artist',
    teams:[], awards:[],
    collaborators:['John Lennon','John Cage'], bio:'Tokyo-born Fluxus artist whose Cut Piece predated her Beatle marriage by five years; co-credited on Imagine since 2017.' },

  { id:'liv-ullmann', name:'Liv Ullmann', gender:'female', birthYear:1938, birthPlace:'Tokyo, Japan', country:'Norway', field:'Film', subfield:'Actress',
    teams:[], awards:[],
    collaborators:['Ingmar Bergman'], bio:'Norwegian face of Bergman\'s late period — Persona, Cries and Whispers, Scenes from a Marriage, Autumn Sonata.' },

  { id:'maya-angelou', name:'Maya Angelou', gender:'female', birthYear:1928, birthPlace:'St. Louis, Missouri', country:'USA', field:'Literature', subfield:'Memoirist',
    teams:[], awards:[{name:'Presidential Medal of Freedom',year:2011}],
    collaborators:['James Baldwin'], bio:'Caged-bird memoirist who fry-cooked, danced calypso, and read at Clinton\'s inauguration before turning sixty-five.' },

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
