// One-shot helper: inject middleName, homophones, similarSpellings into every
// entry in data.js. Run once, then this file can be deleted.
//
//   cd .../famous-baby && node inject_name_fields.mjs
//
// It rewrites data.js in place. The user already has data_bk.js as a backup.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, 'data.js');

// Lookup keyed by id. Each value: [middleName, homophones[], similarSpellings[]].
// middleName left as '' unless I know it with reasonable confidence.
const LOOKUP = {
  // ===== NBA =====
  'george-mikan': ['Lawrence', ['Georg'], ['Georje','Jorge']],
  'bob-cousy': ['Joseph', ['Bobb'], ['Rob','Robert','Bobby']],
  'bob-pettit': ['Lee', ['Bobb'], ['Rob','Robert','Bobby']],
  'bill-russell': ['Felton', [], ['Will','Bil','William','Billy']],
  'elgin-baylor': ['Gay', [], ['Elgan','Elgen']],
  'wilt-chamberlain': ['Norman', [], ['Wilton','Wilt']],
  'oscar-robertson': ['Palmer', ['Oskar'], ['Oskar','Osker','Oscer']],
  'jerry-west': ['Alan', [], ['Gerry','Jerrie','Jeri','Jerri']],
  'john-havlicek': ['Joseph', ['Jon','Jhon'], ['Jon','Johnn','Jhon','Johan']],
  'willis-reed': ['', ['Willes'], ['Wilis','Willice','Willys']],
  'walt-frazier': ['', [], ['Walter','Walther','Walty']],
  'rick-barry': ['Francis', ['Rik'], ['Rik','Ric','Ricky','Rich']],
  'pete-maravich': ['', [], ['Peter','Petey','Pyotr']],
  'kareem-abdul-jabbar': ['', ['Karim','Kareem'], ['Karim','Kareim','Karem']],
  'julius-erving': ['Winfield', [], ['Julious','Julio','Jules']],
  'robert-parish': ['Lee', [], ['Roberto','Robart','Robbert','Rupert']],
  'moses-malone': ['Eugene', ['Moshe','Moises'], ['Moshe','Moises','Mosey']],
  'larry-bird': ['Joe', [], ['Lary','Larrie','Laurie']],
  'kevin-mchale': ['Edward', [], ['Kevon','Kevyn','Kevan','Kevern']],
  'magic-johnson': ['Earvin', [], ['Madge','Majic']],
  'dominique-wilkins': ['', ['Dominic'], ['Dominic','Dominik','Dominica','Domenic']],
  'james-worthy': ['Ager', ['Jaymes'], ['Jaymes','Jamie','Jamz','Jameson']],
  'isiah-thomas': ['', ['Isaiah'], ['Isaiah','Izaiah','Iziah','Isiaiah']],
  'patrick-ewing': ['Aloysius', [], ['Padraic','Patrik','Patric','Patryk']],
  'clyde-drexler': ['Austin', [], ['Klyde','Cleide']],
  'john-stockton': ['Houston', ['Jon','Jhon'], ['Jon','Johnn','Jhon','Johan']],
  'hakeem-olajuwon': ['Abdul', ['Hakim'], ['Hakim','Hacim','Hakeam']],
  'michael-jordan': ['Jeffrey', ['Mikael','Michel'], ['Mikael','Mikel','Michel','Micheal']],
  'charles-barkley': ['Wade', [], ['Charlz','Charless','Charl']],
  'joe-dumars': ['', ['Jo'], ['Jo','Joey','Joseph','Joah']],
  'karl-malone': ['', ['Carl','Karle'], ['Carl','Karle','Karol','Carle']],
  'scottie-pippen': ['Maurice', ['Scotty'], ['Scotty','Scotti','Scotie','Scoti']],
  'reggie-miller': ['Wayne', [], ['Reggi','Reggy','Reginald','Reg']],
  'david-robinson': ['Maurice', [], ['Davyd','Daved','Dawid','Davide']],
  'mitch-richmond': ['James', [], ['Mitchell','Mitchel','Mich','Mitchum']],
  'steve-kerr': ['Douglas', [], ['Steven','Stephen','Stevie','Stephan']],
  'gary-payton': ['Dwayne', [], ['Garry','Gari','Garey','Garrie']],
  'toni-kukoc': ['', ['Tony','Toney'], ['Tony','Toney','Tonio','Tonee']],
  'shawn-kemp': ['', ['Sean','Shaun','Shon'], ['Sean','Shaun','Shon','Shaughn']],
  'alonzo-mourning': ['Harding', [], ['Alonso','Alanzo','Alonza','Alonzio']],
  'penny-hardaway': ['Anfernee', ['Penney'], ['Penney','Pennie','Pennye']],
  'shaquille-oneal': ['Rashaun', [], ['Shaquil','Shakil','Shaqueel','Shakille']],
  'grant-hill': ['Henry', [], ['Granty','Grantt','Graunt']],
  'chris-webber': ['', ['Cris','Kris'], ['Cris','Kris','Khris','Crisstopher']],
  'jason-kidd': ['Frederick', ['Jaysen','Jayson'], ['Jaysen','Jayson','Jasen','Jasun']],
  'steve-nash': ['John', [], ['Steven','Stephen','Stevie','Stephan']],
  'allen-iverson': ['Ezail', ['Alan','Allan','Alen'], ['Alan','Allan','Alen','Allyn']],
  'ray-allen': ['', ['Rae','Rey'], ['Rae','Rey','Raye','Reigh']],
  'kevin-garnett': ['Maurice', [], ['Kevon','Kevyn','Kevan','Kevern']],
  'tim-duncan': ['Theodore', [], ['Timothy','Tym','Timo','Timmy']],
  'manu-ginobili': ['Emanuel', [], ['Manny','Manolo','Emmanuel','Manu']],
  'vince-carter': ['Lamar', [], ['Vincent','Vinny','Vinnie','Vins']],
  'kobe-bryant': ['Bean', ['Coby','Koby'], ['Coby','Koby','Cobi','Kobie']],
  'paul-pierce': ['Anthony', [], ['Pol','Paull','Pawl','Paulo']],
  'dirk-nowitzki': ['Werner', [], ['Derk','Dirck','Dirc','Dyrk']],
  'tracy-mcgrady': ['', ['Tracey','Tracie'], ['Tracey','Tracie','Tracee','Treacy']],
  'yao-ming': ['', [], ['Yau','Yow']],
  'pau-gasol': ['', ['Po','Pow'], ['Pol','Pao','Paul']],
  'beyonce-skip': ['', [], []],
  'tony-parker': ['', ['Toney','Toni'], ['Toney','Toni','Tonio','Tonee']],
  'dwyane-wade': ['Tyrone', ['Dwayne','Duane'], ['Dwayne','Duane','Dwain','Dewayne']],
  'lebron-james': ['Raymone', [], ['LeBryn','Labron','Lebrun']],
  'carmelo-anthony': ['Kiyan', [], ['Carmello','Karmelo','Carmel','Carmine']],
  'chris-paul': ['', ['Cris','Kris'], ['Cris','Kris','Khris','Christopher']],
  'dwight-howard': ['David', [], ['Dwite','Dwyght','Dwighte']],
  'derrick-rose': ['Martell', [], ['Derek','Derik','Deric','Derrik']],
  'russell-westbrook': ['', [], ['Russel','Rusell','Russle','Russ']],
  'kevin-durant': ['Wayne', [], ['Kevon','Kevyn','Kevan','Kevern']],
  'stephen-curry': ['', ['Steven','Stefan'], ['Steven','Stefan','Stephan','Steffen']],
  'jimmy-butler': ['', ['Jimmie','Jimi'], ['Jimmie','Jimi','Jim','Jimmye']],
  'james-harden': ['Edward', ['Jaymes'], ['Jaymes','Jamie','Jamz','Jameson']],
  'demar-derozan': ['', [], ['Damar','Demarr','DeMario']],
  'paul-george': ['Clifton', [], ['Pol','Paull','Pawl','Paulo']],
  'klay-thompson': ['Alexander', ['Clay'], ['Clay','Klaye','Cleye']],
  'draymond-green': ['Jamal', [], ['Draymon','Draymund','Daymond','Drayman']],
  'damian-lillard': ['', ['Damien','Damion','Damyan'], ['Damien','Damion','Damyan','Daimon']],
  'kawhi-leonard': ['Anthony', [], ['Kawi','Khawi','Kwai']],
  'khris-middleton': ['', ['Chris','Cris','Kris'], ['Chris','Cris','Kris','Khristopher']],
  'kyrie-irving': ['Andrew', [], ['Kiri','Kyrri','Kyree','Kiree']],
  'anthony-davis': ['Marshon', [], ['Anthoney','Antony','Anthonie','Antoni']],
  'bradley-beal': ['', [], ['Bradly','Brad','Bradlee','Bradlie']],
  'giannis-antetokounmpo': ['Sina', [], ['Yannis','Janis','Giannes']],
  'joel-embiid': ['Hans', [], ['Joelle','Yoel','Joeel']],
  'pascal-siakam': ['', [], ['Pascale','Paschal','Pascual']],
  'karl-anthony-towns': ['', ['Carl','Karle'], ['Carl','Karle','Karol','Carle']],
  'nikola-jokic': ['', [], ['Nicola','Nikolai','Nikolaj','Nicolas']],
  'devin-booker': ['Armani', ['Devon','Devyn','Devan'], ['Devon','Devyn','Devan','Daven']],
  'donovan-mitchell': ['', [], ['Donavan','Donovin','Donavon','Donavin']],
  'bam-adebayo': ['Edrice', [], ['Bamm']],
  'jayson-tatum': ['Christopher', ['Jason','Jaysen','Jasen'], ['Jason','Jaysen','Jasen','Jasun']],
  'trae-young': ['Rayshun', ['Tray','Trey'], ['Tray','Trey','Treigh']],
  'shai-gilgeous-alexander': ['', ['Shay','Shea'], ['Shay','Shea','Shae','Sheigh']],
  'luka-doncic': ['', ['Luca'], ['Luca','Lukas','Lucca','Lucah']],
  'ja-morant': ['', [], ['Jah','Jay']],
  'zion-williamson': ['Lateef', [], ['Zyon','Sion','Zhion','Zionn']],
  'tyrese-haliburton': ['', ['Tyreese'], ['Tyreese','Tyreis','Tirese','Tyrise']],
  'lamelo-ball': ['', [], ['Lamello','LaMeloh','Lemelo']],
  'anthony-edwards': ['DeVante', [], ['Anthoney','Antony','Anthonie','Antoni']],
  'cade-cunningham': ['', ['Kade','Caid'], ['Kade','Caid','Cayde','Kayde']],
  'paolo-banchero': ['Napoleon', [], ['Paulo','Pablo','Paolino']],
  'victor-wembanyama': ['', ['Viktor'], ['Viktor','Victr','Vyctor','Victorr']],
  'dennis-rodman': ['Keith', ['Denis','Denys'], ['Denis','Denys','Denniss','Denyss']],
  'jrue-holiday': ['Randall', ['Drew','Jrew'], ['Drew','Jrew','Jru']],
  'joakim-noah': ['Simon', ['Joaquim'], ['Joaquim','Joachim','Joakeem']],
  'blake-griffin': ['Austin', [], ['Blaike','Blayk','Blayke','Blakely']],
  'deron-williams': ['Michael', ['Darren','Daron'], ['Darren','Daron','Derren','Deryn']],

  // ===== Music — Female =====
  'billie-holiday': ['', ['Billy','Billi','Billee'], ['Billy','Billi','Billee','Bilee']],
  'ella-fitzgerald': ['Jane', [], ['Ela','Elle','Ellah','Ellie']],
  'peggy-lee': ['', ['Peggi','Pegi'], ['Peggi','Pegi','Peggie','Peggey']],
  'doris-day': ['', [], ['Dorris','Dorice','Doras','Dorys']],
  'sarah-vaughan': ['Lois', ['Sara','Zara','Sera'], ['Sara','Sarrah','Saraya','Sarra']],
  'patsy-cline': ['', [], ['Patsey','Patsi','Patzy']],
  'petula-clark': ['Sally', [], ['Petulla','Petoula','Petulah']],
  'connie-francis': ['', ['Conny','Conni'], ['Conny','Conni','Konnie','Coni']],
  'dusty-springfield': ['', ['Dustie'], ['Dustie','Dustee','Dusti']],
  'tina-turner': ['', ['Teena','Tena'], ['Teena','Tena','Tinah','Tinna']],
  'dionne-warwick': ['', ['Dion','Deon'], ['Dion','Deon','Dione','Deonne']],
  'aretha-franklin': ['Louise', [], ['Areta','Aritha','Arethea','Arethah']],
  'carole-king': ['', ['Carol','Karol','Carroll'], ['Carol','Karol','Carroll','Carrol']],
  'carly-simon': ['Elisabeth', ['Karly','Carlie'], ['Karly','Carlie','Carley','Karlie']],
  'joni-mitchell': ['', ['Joany','Joney'], ['Joany','Joney','Jonie','Joanie']],
  'diana-ross': ['Ernestine', ['Dianna','Dyana'], ['Dianna','Dyana','Diane','Diahann']],
  'debbie-harry': ['Ann', ['Debby','Debi'], ['Debby','Debi','Debbi','Debbie']],
  'cher': ['', ['Share'], ['Sher','Shere','Cherr']],
  'linda-ronstadt': ['Maria', ['Lynda','Lindah'], ['Lynda','Lindah','Lindy','Linde']],
  'dolly-parton': ['Rebecca', ['Dolley','Dollie'], ['Dolley','Dollie','Dolli','Dolie']],
  'donna-summer': ['Adrian', [], ['Dona','Donnah','Donia','Donni']],
  'olivia-newton-john': ['', [], ['Alivia','Olyvia','Olivya','Oliviah']],
  'stevie-nicks': ['', ['Stevy','Stevi'], ['Stevy','Stevi','Stevee','Stevye']],
  'cyndi-lauper': ['Ann', ['Cindy','Sindy','Cindi'], ['Cindy','Sindy','Cindi','Cyndy']],
  'pat-benatar': ['', [], ['Patt','Patti','Patty','Patrice']],
  'annie-lennox': ['', ['Anny','Anni'], ['Anny','Anni','Annee','Annye']],
  'gloria-estefan': ['', [], ['Glorea','Gloriah','Glorie','Glorya']],
  'kate-bush': ['', ['Cate','Kait'], ['Cate','Kait','Kayte','Kaitee']],
  'belinda-carlisle': ['', [], ['Bellinda','Belynda','Belindah']],
  'madonna': ['', [], ['Madona','Madonnah','Madonia']],
  'sheryl-crow': ['Suzanne', ['Cheryl','Sheryll'], ['Cheryl','Sheryll','Sheril','Sherrill']],
  'whitney-houston': ['Elizabeth', [], ['Whitnee','Whitnie','Whitny','Whittney']],
  'bjork': ['', [], ['Bjoerk','Byork']],
  'tori-amos': ['Ellen', ['Tory','Torie'], ['Tory','Torie','Toree','Toria']],
  'shania-twain': ['', [], ['Shaniah','Shanyah','Shaynia']],
  'janet-jackson': ['Damita', [], ['Janett','Janette','Janeth','Jeanette']],
  'toni-braxton': ['Michele', ['Tony','Toney'], ['Tony','Toney','Tonee','Tonia']],
  'faith-hill': ['', [], ['Fayth','Faythe','Faithe']],
  'celine-dion': ['Marie', [], ['Celina','Selene','Selina','Celyne']],
  'sarah-mclachlan': ['Ann', ['Sara','Zara','Sera'], ['Sara','Sarrah','Saraya','Sarra']],
  'mary-j-blige': ['Jane', ['Marie','Mari'], ['Marie','Mari','Marey','Maree']],
  'thalia': ['Ariadna', [], ['Thalya','Talia','Thaliah']],
  'selena-quintanilla': ['', ['Salena','Selina'], ['Salena','Selina','Selene','Celina']],
  'gwen-stefani': ['Renée', [], ['Gwenn','Gwenne','Gweneth']],
  'mariah-carey': ['', ['Maria','Maraya'], ['Maria','Maraya','Mariya','Maryah']],
  'jennifer-lopez': ['Lynn', [], ['Jenifer','Jeniffer','Jenniffer','Jenefer']],
  'alanis-morissette': ['Nadine', [], ['Alaniss','Alanys','Alana']],
  'jewel': ['Kilcher', ['Jewell'], ['Jewell','Jewl','Juel','Jewele']],
  'sia': ['', ['Sea','Cia'], ['Sea','Cia','Sya','Siah']],
  'fergie': ['', ['Fergy'], ['Fergy','Fergee','Fergi','Fergye']],
  'shakira': ['Isabel', [], ['Chakira','Shakirah','Shaqira']],
  'fiona-apple': ['', [], ['Fionah','Fyona','Fionna','Fionne']],
  'nelly-furtado': ['Kim', ['Nellie','Nellee'], ['Nellie','Nellee','Neli','Nelie']],
  'norah-jones': ['', ['Nora','Norra'], ['Nora','Norra','Norrah','Noora']],
  'pink': ['', [], ['Pinque','Pynk']],
  'brandy': ['Rayana', ['Brandi','Brandee'], ['Brandi','Brandee','Brandey','Brandye']],
  'robyn': ['', ['Robin','Robbyn'], ['Robin','Robbyn','Robbin','Roben']],
  'sara-bareilles': ['Beth', ['Sarah','Zara','Sera'], ['Sarah','Sera','Sahra','Sarra']],
  'monica': ['Denise', [], ['Monika','Monicka','Monnica','Monyca']],
  'christina-aguilera': ['Maria', ['Cristina','Kristina'], ['Cristina','Kristina','Kristyna','Christine']],
  'jessica-simpson': ['Ann', [], ['Jessika','Jessicka','Jessicah']],
  'ashanti': ['Shequoiya', [], ['Ashantee','Ashante','Ashauntae']],
  'beyonce': ['Giselle', [], ['Beyoncé','Beyonsay','Beyonsey']],
  'britney-spears': ['Jean', ['Brittany','Britny','Britnee'], ['Brittany','Britny','Britnee','Britani']],
  'alicia-keys': ['Augello', [], ['Alycia','Aleecia','Alisha','Alecia']],
  'kelly-clarkson': ['Brianne', ['Kelli','Kelley'], ['Kelli','Kelley','Kellie','Kely']],
  'leann-rimes': ['', [], ['Leeanne','Leeann','Leighanne','Liane']],
  'amy-winehouse': ['Jade', ['Aimee','Amie','Ami'], ['Aimee','Amie','Ami','Amee']],
  'carrie-underwood': ['Marie', ['Cary','Kari','Keri'], ['Cary','Kari','Keri','Carry']],
  'katy-perry': ['Elizabeth', ['Katie','Kati','Caty'], ['Katie','Kati','Caty','Katey']],
  'avril-lavigne': ['Ramona', [], ['Avrille','Avryl','Aprille']],
  'rosalia': ['', [], ['Rosalía','Rosalea','Rozalia']],
  'lana-del-rey': ['', ['Lanna'], ['Lanna','Lannah','Lanae']],
  'lady-gaga': ['', [], ['Ledy','Laidy','Laydee']],
  'janelle-monae': ['', [], ['Janel','Janell','Jenelle','Janella']],
  'leona-lewis': ['Louise', [], ['Liona','Leonah','Leeona']],
  'ellie-goulding': ['Jane', ['Elly','Eli','Eli'], ['Elly','Eli','Elie','Ellee']],
  'florence-welch': ['Leontine', [], ['Florense','Florance','Florencia','Florenz']],
  'solange': ['Piaget', [], ['Solang','Solanj','Soulange']],
  'hilary-duff': ['Erhard', ['Hillary','Hilarie'], ['Hillary','Hilarie','Hilary','Hilery']],
  'rihanna': ['Robyn', [], ['Riana','Reanna','Rihannah','Rhianna']],
  'adele': ['Laurie', ['Adel','Adell'], ['Adel','Adell','Adelle','Adela']],
  'taylor-swift': ['Alison', [], ['Tayler','Tailor','Tayloer','Taelor']],
  'sza': ['', [], ['Sazah']],
  'iggy-azalea': ['', ['Iggi'], ['Iggi','Iggee','Igy']],
  'karol-g': ['', ['Carol','Carroll','Carole'], ['Carol','Carroll','Carole','Carrol']],
  'kacey-musgraves': ['Lee', ['Casey','Kasey','Kacy'], ['Casey','Kasey','Kacy','Kasie']],
  'demi-lovato': ['', ['Demmi'], ['Demmi','Demie','Demee','Demy']],
  'selena-gomez': ['Marie', ['Salena','Selina'], ['Salena','Selina','Selene','Celina']],
  'miley-cyrus': ['Ray', ['Mily','Milee'], ['Mily','Milee','Mylie','Mileigh']],
  'charli-xcx': ['', ['Charlie','Charley'], ['Charlie','Charley','Charley','Charly']],
  'iu': ['', [], ['Eeu','Iyu']],
  'tinashe': ['Jorgensen', [], ['Tinasha','Tynashe']],
  'ariana-grande': ['', [], ['Arianna','Aryana','Arianah','Aryanna']],
  'halsey': ['', [], ['Halsie','Halsy','Halzey']],
  'doja-cat': ['', [], ['Dojah','Doza','Dojja']],
  'dua-lipa': ['', [], ['Doua','Duah','Duwa']],
  'lorde': ['', ['Lord','Lourd'], ['Lord','Lourd','Lorda']],
  'jisoo': ['', [], ['Jissoo','Jeesoo']],
  'jennie': ['', ['Jenny','Jeni','Jenni'], ['Jenny','Jeni','Jenni','Jenne']],
  'rose': ['', ['Rosé','Rosey','Rosie'], ['Rosé','Rosey','Rosie','Rosa']],
  'lisa': ['', ['Liza','Leesa','Leeza'], ['Liza','Leesa','Leeza','Lisah']],
  'camila-cabello': ['', ['Camilla','Kamila'], ['Camilla','Kamila','Camille','Kamilla']],
  'her': ['', [], ['Herr','Heir']],
  'chappell-roan': ['', [], ['Chappel','Chapell','Chappele']],
  'sabrina-carpenter': ['Annlynn', [], ['Sabryna','Sabreena','Sabrinna']],
  'olivia-rodrigo': ['Isabel', [], ['Alivia','Olyvia','Olivya','Oliviah']],
  'billie-eilish': ['Eilish', ['Billy','Billi','Billee'], ['Billy','Billi','Billee','Bilee']],
  'tate-mcrae': ['Rosner', [], ['Tait','Tayt','Taete','Tayte']],

  // ===== NFL =====
  'walter-payton': ['Jerry', [], ['Walther','Walt','Waltir']],
  'donovan-mcnabb': ['Jamal', [], ['Donavan','Donovin','Donavon','Donavin']],
  'simeon-rice': ['', [], ['Simion','Simyon','Symeon','Simeun']],
  'tony-romo': ['', ['Toney','Toni'], ['Toney','Toni','Tonio','Tonee']],
  'odell-beckham-jr': ['Cornelius', [], ['Odel','Odelle','Odale']],
  'jameis-winston': ['Lanaed', ['James','Jamis'], ['James','Jamis','Jamius','Jameus']],
  'thomas-jones': ['Quinten', [], ['Tomas','Thoms','Tomass','Thomass']],
  'matt-forte': ['', [], ['Mat','Matty','Matthew','Mathew']],

  // ===== Film — Older =====
  'janet-gaynor': ['', [], ['Janett','Janette','Janeth','Jeanette']],
  'mary-pickford': ['', ['Marie','Mari','Marey'], ['Marie','Mari','Marey','Maree']],
  'meryl-streep': ['Louise', [], ['Meril','Merryl','Merrill','Maryl']],
  'denzel-washington': ['Hayes', [], ['Denzell','Denzil','Denzal']],
  'viola-davis': ['', [], ['Violla','Violah','Violetta']],

  // ===== Music continued =====
  'kanye-west': ['Omari', [], ['Kanyay','Kanay','Konye']],
  'chance-the-rapper': ['', [], ['Chanse','Chans','Chayse']],

  // ===== Science =====
  'marie-curie': ['Salomea', ['Mari','Mary','Marey'], ['Mari','Mary','Marey','Maree']],
  'rosalind-franklin': ['Elsie', [], ['Rosalin','Rozalind','Rosalynd','Roslind']],
  'katherine-johnson': ['Coleman', ['Catherine','Kathryn','Cathrine'], ['Catherine','Kathryn','Cathrine','Katharine']],
  'ada-lovelace': ['', ['Aida','Ayda'], ['Aida','Ayda','Adah','Aada']],
  'grace-hopper': ['Brewster', [], ['Grayce','Grase','Graice']],

  // ===== Literature =====
  'toni-morrison': ['', ['Tony','Toney','Tonie'], ['Tony','Toney','Tonie','Tonee']],
  'james-baldwin': ['Arthur', ['Jaymes'], ['Jaymes','Jamie','Jamz','Jameson']],

  // ===== Politics =====
  'barack-obama': ['Hussein', [], ['Barak','Barrack','Baraq','Barack']],
  'michelle-obama': ['LaVaughn', ['Michele','Mishelle'], ['Michele','Mishelle','Mychelle','Michell']],
  'ruth-bader-ginsburg': ['Joan', [], ['Ruthe','Rute','Ruthie']],

  // ===== Soccer =====
  'mia-hamm': ['Margaret', ['Mya','Miah'], ['Mya','Miah','Mea','Miya']],
  'megan-rapinoe': ['Anna', ['Meghan','Maegan','Meagan'], ['Meghan','Maegan','Meagan','Megen']],

  // ===== Visual Arts =====
  'leonardo-da-vinci': ['', [], ['Leonardoh','Lionardo','Leonard']],
  'michelangelo': ['', [], ['Michaelangelo','Michelangello','Michellangelo']],
  'rembrandt': ['Harmenszoon', [], ['Rembrant','Rembrandtt','Rembrandte']],
  'hokusai': ['', [], ['Hokusay','Hocusai']],
  'van-gogh': ['Willem', [], ['Vinsent','Vincente','Vinncent','Vincenzo']],
  'frida-kahlo': ['', [], ['Freda','Frieda','Fryda','Fridah']],
  'picasso': ['Ruiz', [], ['Pablo','Pablito','Paolo']],
  'okeeffe': ['Totto', [], ['Georgea','Jorja','Georgina','Georgiana']],
  'kusama': ['', [], ['Yayoy','Yaiyoi','Yayoie']],
  'basquiat': ['', [], ['Jean Michel','Jean','Jhon','Jon']],
  'ai-weiwei': ['', [], ['Aii','Ay','Ae']],
  'abramovic': ['', [], ['Marinah','Maryna','Maryna']],

  // ===== Tech =====
  'turing': ['Mathison', ['Allan','Allen','Alen'], ['Allan','Allen','Alen','Alun']],
  'hedy-lamarr': ['', ['Heddy','Heidi'], ['Heddy','Heidi','Hedi','Hedie']],
  'tbl': ['John', [], ['Timothy','Tym','Timo','Timmy']],
  'torvalds': ['Benedict', [], ['Lynus','Linnus','Linis']],
  'margaret-hamilton': ['Heafield', [], ['Margret','Margarit','Margerite','Margaretta']],
  'tesla': ['', [], ['Nikolai','Nicola','Nikolas','Nicolas']],
  'agbell': ['Graham', ['Alexandr','Alexsander'], ['Alexandr','Alexsander','Alexandar','Alixander']],
  'reshma-saujani': ['', [], ['Reshmah','Reshama','Reshmaa']],
  'sundar': ['', [], ['Sunder','Sundara','Sundarah']],

  // ===== Activism =====
  'gandhi': ['Karamchand', [], ['Mohandas','Mahatmah','Mahatma']],
  'mandela': ['Rolihlahla', [], ['Nelsen','Nelsun','Nelsan','Nilson']],
  'wangari': ['Muta', [], ['Wangaari','Wanjeri']],
  'greta': ['Tintin', [], ['Gretta','Gretah','Greata']],
  'malala': ['', [], ['Malalla','Mallalah','Malayla']],
  'tubman': ['', [], ['Harriette','Harriet','Hariet','Harriott']],
  'cesar-chavez': ['Estrada', ['Caesar','Sezar'], ['Caesar','Sezar','Cesare','Cesaro']],
  'dolores-huerta': ['Clara', [], ['Doloras','Delores','Dolorez','Doloris']],
  'berta': ['Isabel', [], ['Bertah','Berthah','Bertta']],
  'aung-san': ['', [], ['Ong','Aong']],

  // ===== Architecture =====
  'gaudi': ['', [], ['Antony','Antoni','Antonio','Anton']],
  'frank-lloyd-wright': ['Lloyd', [], ['Franc','Franck','Frankk','Franky']],
  'le-corbusier': ['', [], ['Lecorbusier']],
  'im-pei': ['Ming', [], ['Eye Em','I.M.']],
  'zaha-hadid': ['Mohammad', [], ['Zahah','Zaaha']],
  'tadao-ando': ['', [], ['Tadou','Tadaoh']],
  'maya-lin': ['Ying', ['Maia','Mya'], ['Maia','Mya','Mayah','Maja']],

  // ===== Food =====
  'julia-child': ['Carolyn', ['Julya','Yulia'], ['Julya','Yulia','Julianna','Juliah']],
  'bourdain': ['Michael', [], ['Antony','Antoni','Anton','Antonio']],
  'ottolenghi': ['Assaf', [], ['Yoatam','Yotham']],
  'massimo-bottura': ['', [], ['Massymo','Massimmo','Massim']],
  'asma-khan': ['', [], ['Asmah','Azma','Asama']],
  'escoffier': ['Georges Auguste', [], ['Augustus','August','Augustin','Augusto']],

  // ===== Fashion =====
  'coco-chanel': ['', ['Koko'], ['Koko','Cocoa','Cocco']],
  'ysl': ['Henri Donat Mathieu', [], ['Yvves','Yveh','Yveas']],
  'westwood': ['Isabel', [], ['Vivian','Viviane','Viviana','Vyvyan']],
  'rei-kawakubo': ['', ['Ray','Rae','Rey'], ['Ray','Rae','Rey','Reigh']],
  'iris-apfel': ['Barrel', [], ['Irys','Eiris','Iriss','Irice']],
  'mcqueen': ['Lee', [], ['Alexandr','Alexandar','Alexsander','Alixander']],

  // ===== Religion / Philosophy =====
  'dalai-lama': ['', [], ['Tensin','Tenzyn','Tenzen']],
  'desmond-tutu': ['Mpilo', [], ['Desmund','Dezmond','Desmon','Dezmund']],
  'mother-teresa': ['', [], ['Theresa','Tereza','Therese','Teresia']],
  'pope-francis': ['', [], ['Frances','Fransis','Franciss']],
  'hildegard': ['', [], ['Hildegarde','Hildagard','Hildegaard']],
  'simone-de-beauvoir': ['Lucie-Ernestine-Marie-Bertrand', ['Simon'], ['Simon','Symone','Simohne','Simonn']],
  'arendt': ['', [], ['Hannnah','Hanah','Hannaa','Hannia']],
  'kierkegaard': ['Aabye', [], ['Soeren','Soren','Sjoeren']],
  'fanon': ['Omar', [], ['Frants','Frantsz','Frantz','Franz']],
  'marx': ['Heinrich', ['Carl','Karle'], ['Carl','Karle','Karol','Carle']],

  // ===== Music — Rock/Country =====
  'freddie-mercury': ['Bulsara', ['Freddy','Freddi'], ['Freddy','Freddi','Fredi','Fredie']],
  'bowie': ['Robert', [], ['Davyd','Daved','Dawid','Davide']],
  'mick-jagger': ['Philip', ['Mik','Myk'], ['Mik','Myk','Micky','Mickey']],
  'joan-jett': ['', ['Jone','Joane'], ['Jone','Joane','Joann','Joanne']],
  'patti-smith': ['Lee', ['Patty','Pati','Patte'], ['Patty','Pati','Patte','Patti']],
  'robert-plant': ['Anthony', [], ['Roberto','Robart','Robbert','Rupert']],
  'johnny-cash': ['R.', ['Johny','Jonny','Joni'], ['Johny','Jonny','Joni','Johnnie']],
  'willie-nelson': ['Hugh', ['Willy','Willi'], ['Willy','Willi','Willey','Willee']],
  'loretta-lynn': ['Webb', [], ['Lorretta','Loreta','Lorettah','Loritta']],
  'hank-williams': ['', [], ['Hanc','Hanck','Hanky','Henk']],

  // ===== Classical =====
  'bach': ['Sebastian', [], ['Johan','Yohan','Jon','Jhon']],
  'mozart': ['Amadeus', [], ['Wolfgan','Wolfgnag','Wolfgangg']],
  'beethoven': ['', [], ['Ludwic','Ludvig','Ludvik','Ludwik']],
  'yo-yo-ma': ['', [], ['Yoyo','Yo Yo','Yoh-Yoh']],
  'hilary-hahn': ['', ['Hillary','Hilarie'], ['Hillary','Hilarie','Hilery','Hilari']],
  'clara-schumann': ['Josephine', [], ['Clarah','Clarra','Klara','Clarissa']],

  // ===== Jazz / Soul =====
  'miles-davis': ['Dewey', [], ['Myles','Mylles','Milles']],
  'coltrane': ['William', ['Jon','Jhon'], ['Jon','Johnn','Jhon','Johan']],
  'charlie-parker': ['', ['Charley','Charly'], ['Charley','Charly','Charli','Charlee']],
  'louis-armstrong': ['Daniel', ['Lewis','Luis'], ['Lewis','Luis','Louie','Luigi']],
  'nina-simone': ['', ['Neena','Nena'], ['Neena','Nena','Ninna','Ninah']],
  'duke-ellington': ['Kennedy', [], ['Duk','Dook','Duek']],
  'marvin-gaye': ['Pentz', [], ['Marvyn','Marven','Marvon','Marvine']],
  'stevie-wonder': ['', ['Stevy','Stevi'], ['Stevy','Stevi','Stevee','Stevye']],
  'sade': ['Folasade', ['Shaday','Shadae'], ['Shaday','Shadae','Sadae','Saday']],
  'sam-cooke': ['', [], ['Samm','Samuel','Sammy','Samme']],
  'anita-baker': ['', [], ['Aneeta','Anitta','Anyta','Anitah']],
  'bob-marley': ['Nesta', [], ['Rob','Robert','Bobby','Bobbie']],
  'fela-kuti': ['Anikulapo', [], ['Felah','Phela','Fella']],
  'ravi-shankar': ['', [], ['Ravee','Ravy','Raavi']],
  'edith-piaf': ['Giovanna', [], ['Edyth','Edythe','Edithe','Edyth']],
  'caetano-veloso': ['', [], ['Cayetano','Caitano','Kaetano']],

  // ===== Film — Auteurs =====
  'kurosawa': ['', [], ['Akirah','Akirra','Akeera']],
  'fellini': ['', [], ['Federic','Federiko','Fredrico','Frederico']],
  'bergman': ['', ['Inger'], ['Inger','Ingmaar','Ingmare']],
  'miyazaki': ['', [], ['Hayou','Hyao','Hyo']],
  'almodovar': ['', [], ['Pedroh','Petro','Pedrro']],
  'agnes-varda': ['', ['Agness','Agnese'], ['Agness','Agnese','Agneta','Agnetha']],
  'bong': ['', [], ['Bohng','Bonng']],
  'chloe-zhao': ['', ['Khloe','Cloe','Chloey'], ['Khloe','Cloe','Chloey','Cloey']],
  'wertmuller': ['', ['Lena'], ['Lena','Lyna','Linah','Leenah']],
  'gerwig': ['Celeste', ['Gretta'], ['Gretta','Gretah','Greata','Grete']],
  'spike-lee': ['', [], ['Spyke','Spik','Spykee']],
  'sofia-coppola': ['Carmina', ['Sophia','Sofiya','Sophya'], ['Sophia','Sofiya','Sophya','Sofie']],

  // ===== Film — Classic actors =====
  'audrey-hepburn': ['Kathleen', ['Audrie','Audrey','Audra'], ['Audrie','Audra','Audrye','Audree']],
  'cary-grant': ['', ['Carey','Kary','Kerry'], ['Carey','Kary','Kerry','Cari']],
  'marlene-dietrich': ['', ['Marlena','Marlina'], ['Marlena','Marlina','Marleen','Marleene']],
  'greta-garbo': ['Lovisa', ['Gretta'], ['Gretta','Gretah','Greata','Grete']],
  'ingrid-bergman': ['', [], ['Ingrida','Ingred','Ingryd','Inghrid']],
  'sidney-poitier': ['', ['Sydney','Sidnee','Cidney'], ['Sydney','Sidnee','Cidney','Sidnie']],
  'bette-davis': ['', ['Bett','Betty','Bettie'], ['Bett','Betty','Bettie','Bete']],
  'kate-hepburn': ['Houghton', ['Cate','Kait'], ['Cate','Kait','Kayte','Kaitee']],
  'marion-cotillard': ['', [], ['Marian','Maryon','Marione','Marrion']],
  'penelope-cruz': ['', [], ['Penelopee','Penelopy','Pinelopi']],
  'mifune': ['', [], ['Toshyro','Tochiro','Toshero']],
  'cate-blanchett': ['Elise', ['Kate','Kait','Cait'], ['Kate','Kait','Cait','Kayt']],
  'tilda-swinton': ['Matilda', [], ['Tylda','Tildah','Tildaa']],
  'anya-taylor-joy': ['Josephine', ['Aniya','Aanya'], ['Aniya','Aanya','Anyah','Annya']],
  'lea-seydoux': ['Hélène', ['Leah','Lia','Leigh'], ['Leah','Lia','Leigh','Leya']],
  'daniel-day-lewis': ['Michael Blake', [], ['Danyel','Danial','Daniyel','Daniele']],

  // ===== Comedy / Silent =====
  'chaplin': ['Spencer', ['Charley','Charly'], ['Charley','Charly','Charli','Charlee']],
  'buster-keaton': ['', [], ['Bustar','Bustur','Busta']],
  'lucille-ball': ['Désirée', [], ['Lucile','Lucil','Lucilla','Lucillah']],
  'robin-williams': ['McLaurin', ['Robyn','Robbin'], ['Robyn','Robbin','Robben','Robynn']],
  'tina-fey': ['', ['Teena','Tena'], ['Teena','Tena','Tinah','Tinna']],
  'gervais': ['Dene', [], ['Rickie','Riki','Ricki','Rikky']],
  'phoebe-waller-bridge': ['', [], ['Phebe','Pheobe','Phoebee','Phoeby']],

  // ===== Trans / LGBTQ+ =====
  'marsha-p-johnson': ['', [], ['Marshah','Marscha','Marshaa']],
  'sylvia-rivera': ['Lee', ['Silvia','Sylvie'], ['Silvia','Sylvie','Sylvya','Silviah']],
  'laverne-cox': ['', [], ['Lavern','Lavurn','Lavearne']],
  'janet-mock': ['', [], ['Janett','Janette','Janeth','Jeanette']],
  'elliot-page': ['', ['Elliott','Eliot','Eliott'], ['Elliott','Eliot','Eliott','Eliyot']],
  'lana-wachowski': ['', ['Lanna','Lannah'], ['Lanna','Lannah','Lanae','Lannae']],
  'lilly-wachowski': ['', ['Lily','Lili','Lilli'], ['Lily','Lili','Lilli','Lilie']],
  'hunter-schafer': ['', [], ['Huntar','Huntyr','Huntir']],
  'wendy-carlos': ['', ['Wendi','Wendie'], ['Wendi','Wendie','Wendee','Wendye']],
  'renee-richards': ['', ['Renae','Renay','Rennae'], ['Renae','Renay','Rennae','Renée']],
  'christine-jorgensen': ['', ['Cristine','Kristine','Christeen'], ['Cristine','Kristine','Christeen','Christen']],
  'vladimir-luxuria': ['', [], ['Wladimir','Vladymyr','Vlademir']],
  'indya-moore': ['', ['India','Indea'], ['India','Indea','Indiah','Indyah']],
  'sam-smith': ['Frederick', [], ['Samm','Samuel','Sammy','Samme']],
  'asia-kate-dillon': ['', ['Aisha','Aja'], ['Aisha','Aja','Asya','Asiah']],
  'alok': ['', [], ['Allok','Aloke','Alocke']],
  'travis-alabanza': ['', [], ['Travus','Travys','Travas']],
  'rebecca-sugar': ['', [], ['Rebekah','Rebeca','Rebbecca','Rebbeca']],

  // ===== Soccer / Sports =====
  'pele': ['', [], ['Pelé','Pellé','Pelay']],
  'maradona': ['Armando', [], ['Diago','Diegoo','Dieggo','Diiego']],
  'serena-williams': ['Jameka', ['Serenah','Sirena'], ['Serenah','Sirena','Serina','Serene']],
  'roger-federer': ['', [], ['Rodger','Rojer','Rogir']],
  'ali': ['', [], ['Aly','Allee','Allie','Alli']],
  'simone-biles': ['Arianne', [], ['Symone','Simohne','Simonn','Simoni']],
  'usain-bolt': ['St. Leo', [], ['Usein','Yusan','Usane']],
  'nadia-comaneci': ['Elena', [], ['Nadya','Nadiya','Nadiah','Nadja']],
  'jackie-robinson': ['Roosevelt', ['Jacky','Jacki'], ['Jacky','Jacki','Jackee','Jaqui']],
  'wayne-gretzky': ['Douglas', [], ['Waine','Wain','Wayn','Wayne']],

  // ===== Literature continued =====
  'gabriel-garcia-marquez': ['José', [], ['Gabriell','Gabriele','Gavriel','Gabryel']],
  'chimamanda': ['Ngozi', [], ['Chimamandah','Chimimanda']],
  'haruki-murakami': ['', [], ['Haruky','Harukii','Haruke']],
  'arundhati-roy': ['', [], ['Arundathi','Arundhuti','Arundhuthi']],
  'james-joyce': ['Augustine Aloysius', ['Jaymes'], ['Jaymes','Jamie','Jamz','Jameson']],
  'virginia-woolf': ['', [], ['Verginia','Virgenia','Virginyah','Virginnia']],
  'chinua-achebe': ['', [], ['Chinwa','Chenua','Chinuah']],
  'borges': ['Luis', [], ['George','Jorje','Jorgy','Yorge']],
  'joseph-heller': ['', ['Josef','Yosef'], ['Josef','Yosef','Josephe','Yusuf']],

  // ===== Film — Wes etc =====
  'wes-anderson': ['Wesley', [], ['Wess','Wez','Wesse']],

  // ===== Country =====
  'tim-mcgraw': ['Samuel', [], ['Timothy','Tym','Timo','Timmy']],

  // ===== Acting / Misc =====
  'joanna-lumley': ['', ['Johanna','Joana','Yohanna'], ['Johanna','Joana','Yohanna','Joanne']],
  'glenn-ford': ['', ['Glen','Glynn'], ['Glen','Glynn','Glenne','Glin']],
  'judy-collins': ['Marjorie', ['Judi','Judie'], ['Judi','Judie','Judee','Judye']],
  'teilhard-de-chardin': ['', [], ['Pyotr','Pieter','Petr','Pietro']],
  'jamie-dornan': ['', ['Jaime','Jami','Jamey'], ['Jaime','Jami','Jamey','Jamy']],
  'rita-coolidge': ['', [], ['Reeta','Ritah','Riita','Ryta']],
  'curtis-martin': ['Jr.', [], ['Curtice','Kurtis','Curtys','Kurtice']],
  'pierre-curie': ['', [], ['Piere','Pieree','Pyer','Pier']],
  'charles-babbage': ['', [], ['Charlz','Charless','Charl']],
  'friedrich-engels': ['', [], ['Fredrich','Friedric','Friederich','Fredrik']],
  'alfred-hitchcock': ['Joseph', [], ['Alfread','Alfreth','Alfredo','Alfeed']],
  'diego-rivera': ['María', [], ['Diago','Diegoo','Dieggo','Diiego']],
  'andy-warhol': ['', ['Andi','Andie'], ['Andi','Andie','Andee','Andey']],
  'quincy-jones': ['Delight', [], ['Quincey','Quinsy','Quincie','Quinci']],
  'yoko-ono': ['', [], ['Yokoh','Yoco','Joko']],
  'liv-ullmann': ['Johanne', [], ['Livv','Lyv','Liva']],
  'maya-angelou': ['', ['Maia','Mya'], ['Maia','Mya','Mayah','Maja']],
};

// Read data.js
const text = fs.readFileSync(DATA_PATH, 'utf8');

// Pattern to match each entry's start: `  { id:'X', name:'Y',` or `  { id:'X', name:"Y",`
// We insert the three new fields immediately after the name field.
const pattern = /(\{ id:'([^']+)', name:('[^']*'|"[^"]*"),)( gender:)/g;

const fmtArr = (arr) => arr.length === 0 ? '[]' : '[' + arr.map(s => "'" + s.replace(/'/g, "\\'") + "'").join(',') + ']';

let touched = 0;
let nonEmptyMiddle = 0;
const seenIds = new Set();
const missingIds = new Set(Object.keys(LOOKUP));

const newText = text.replace(pattern, (match, prefix, id, nameToken, genderPart) => {
  touched++;
  seenIds.add(id);
  missingIds.delete(id);

  const entry = LOOKUP[id];
  if (!entry) {
    console.error('MISSING LOOKUP for id:', id);
    return match; // leave untouched
  }
  const [middleName, homophones, similarSpellings] = entry;
  if (middleName) nonEmptyMiddle++;
  const insert = ` middleName:'${middleName.replace(/'/g, "\\'")}', homophones:${fmtArr(homophones)}, similarSpellings:${fmtArr(similarSpellings)},`;
  return prefix + insert + genderPart;
});

console.log('Entries matched/replaced:', touched);
console.log('Entries with non-empty middleName:', nonEmptyMiddle);
if (missingIds.size > 0) {
  console.log('Lookup keys NOT used (extra/typo):', [...missingIds]);
}

fs.writeFileSync(DATA_PATH, newText, 'utf8');
console.log('Wrote', DATA_PATH);
