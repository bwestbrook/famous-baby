// famous Baby — Vue 3 application
// Frontend-only for now: filtering runs entirely against the mock dataset.
// We keep the natural-language layer naive (token matching) so it's easy to
// swap in a real backend / LLM-backed query parser later.

console.log('[famous Baby] app.js loaded, importing modules…');

import { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'https://unpkg.com/vue@3.4.27/dist/vue.esm-browser.js';
import { MAJOR_CITIES, CITY_COORDS, REGION_COORDS, US_STATE_CITIES, US_LABEL_ALTITUDE } from './geo.js';
import { ADMIN1_LINES } from './admin1.js';
import { HAS_PHOTO } from './photos.js';

// State / province borders, flattened for globe.gl's path layer.
const ADMIN1_PATHS = Object.entries(ADMIN1_LINES).flatMap(([country, lines]) =>
  lines.map(coords => ({ country, coords }))
);

// Country centroids (decimal degrees: lat, lng). Covers every `country` value
// currently in data.js. Add more as the dataset grows.
const COUNTRY_COORDS = {
  'USA':            [39.8, -98.6],
  'UK':             [54.0,  -2.0],
  'Canada':         [56.1, -106.3],
  'Mexico':         [23.6, -102.5],
  'Brazil':         [-14.2, -51.9],
  'Argentina':      [-38.4, -63.6],
  'France':         [46.6,   1.9],
  'Germany':        [51.2,  10.5],
  'Italy':          [41.9,  12.6],
  'Spain':          [40.5,  -3.7],
  'Portugal':       [39.4,  -8.2],
  'Netherlands':    [52.1,   5.3],
  'Belgium':        [50.5,   4.5],
  'Sweden':         [60.1,  18.6],
  'Norway':         [60.5,   8.5],
  'Denmark':        [56.3,   9.5],
  'Finland':        [61.9,  25.7],
  'Iceland':        [64.9, -19.0],
  'Ireland':        [53.4,  -8.2],
  'Poland':         [51.9,  19.1],
  'Russia':         [61.5, 105.3],
  'Belarus':        [53.7,  27.9],
  'Ukraine':        [48.4,  31.2],
  'Czechia':        [49.8,  15.5],
  'Czech Republic': [49.8,  15.5],
  'Czechoslovakia': [49.8,  15.5],
  'Slovenia':       [46.2,  14.8],
  'Croatia':        [45.1,  15.2],
  'Serbia':         [44.0,  21.0],
  'North Macedonia':[41.6,  21.7],
  'Romania':        [45.9,  24.9],
  'Greece':         [39.1,  21.8],
  'Austria':        [47.5,  14.6],
  'Switzerland':    [46.8,   8.2],
  'Hungary':        [47.2,  19.5],
  'Turkey':         [38.9,  35.2],
  'Israel':         [31.0,  34.9],
  'Iraq':           [33.2,  43.7],
  'Iran':           [32.4,  53.7],
  'Pakistan':       [30.4,  69.3],
  'India':          [20.6,  78.9],
  'Bangladesh':     [23.7,  90.4],
  'China':          [35.9, 104.2],
  'Tibet':          [29.6,  91.1],
  'Hong Kong':      [22.3, 114.2],
  'Japan':          [36.2, 138.3],
  'South Korea':    [35.9, 127.8],
  'Thailand':       [15.9, 100.0],
  'Myanmar':        [21.9,  95.9],
  'Egypt':          [26.8,  30.8],
  'Algeria':        [28.0,   1.7],
  'Morocco':        [31.8,  -7.1],
  'Nigeria':        [ 9.1,   8.7],
  'Ghana':          [ 7.9,  -1.0],
  'Burkina Faso':   [12.2,  -1.6],
  'Cameroon':       [ 7.4,  12.4],
  'DR Congo':       [-4.0,  21.8],
  'Kenya':          [-0.0,  37.9],
  'Tanzania':       [-6.4,  34.9],
  'Zanzibar':       [-6.2,  39.3],
  'Ethiopia':       [ 9.1,  40.5],
  'South Africa':   [-30.6, 22.9],
  'Mozambique':     [-18.7, 35.5],
  'Australia':      [-25.3, 133.8],
  'New Zealand':    [-40.9, 174.9],
  'Chile':          [-35.7, -71.5],
  'Colombia':       [ 4.6,  -74.3],
  'Cuba':           [21.5,  -77.8],
  'Jamaica':        [18.1,  -77.3],
  'Puerto Rico':    [18.2,  -66.5],

  // ---- Breadth pass: every other country the globe draws ----
  // Area centroids of each country's largest landmass, taken from the same
  // outlines the globe itself uses. Only a fallback — the camera measures the
  // real outline when it frames a country — but the random-place roll needs a
  // point to aim at, and it only draws from countries that have one.
  'Afghanistan':                 [  33.9,    66.1],
  'Benin':                       [   9.6,     2.3],
  'Djibouti':                    [  11.7,    42.6],
  'Kosovo':                      [  42.6,    20.9],
  'Vanuatu':                     [ -15.4,   166.9],
  'Albania':                     [  41.1,      20],
  'Armenia':                     [  40.2,      45],
  'Azerbaijan':                  [  40.3,    47.7],
  'Bahamas':                     [  24.5,   -77.9],
  'Belize':                      [  17.2,   -88.7],
  'Bhutan':                      [  27.4,    90.5],
  'Bolivia':                     [ -16.7,   -64.6],
  'Bosnia':                      [  44.2,    17.8],
  'Botswana':                    [ -22.1,    23.8],
  'Brunei':                      [   4.7,   114.9],
  'Bulgaria':                    [  42.8,    25.2],
  'Burundi':                     [  -3.4,    29.9],
  'Cambodia':                    [  12.7,   104.9],
  'Central African Republic':    [   6.5,    20.4],
  'Chad':                        [  15.3,    18.6],
  'Congo':                       [  -0.8,    15.1],
  'Costa Rica':                  [    10,   -84.2],
  "Côte d'Ivoire":               [   7.6,    -5.6],
  'Cyprus':                      [  34.9,      33],
  'Dominican Republic':          [  18.9,   -70.5],
  'East Timor':                  [  -8.8,     126],
  'Ecuador':                     [  -1.5,   -78.4],
  'El Salvador':                 [  13.7,   -88.9],
  'Equatorial Guinea':           [   1.6,    10.4],
  'Eritrea':                     [  15.4,    38.7],
  'Estonia':                     [  58.6,    25.8],
  'Eswatini':                    [ -26.5,    31.4],
  'Falkland Islands':            [ -51.7,   -59.4],
  'Fiji':                        [ -16.4,    11.6],
  'Gabon':                       [  -0.6,    11.7],
  'Gambia':                      [  13.5,   -15.4],
  'Georgia':                     [  42.2,    43.5],
  'Greenland':                   [  74.8,   -41.5],
  'Guatemala':                   [  15.7,   -90.4],
  'Guinea':                      [  10.4,   -11.1],
  'Guinea-Bissau':               [    12,   -15.1],
  'Guyana':                      [   4.8,     -59],
  'Haiti':                       [  18.9,   -72.7],
  'Indonesia':                   [  -2.1,   121.2],
  'Jordan':                      [  31.2,    36.8],
  'Kazakhstan':                  [  48.2,    67.3],
  'Kuwait':                      [  29.3,    47.6],
  'Kyrgyzstan':                  [  41.5,    74.6],
  'Laos':                        [  18.4,   103.7],
  'Latvia':                      [  56.8,    24.8],
  'Lebanon':                     [  33.9,    35.9],
  'Lesotho':                     [ -29.6,    28.2],
  'Liberia':                     [   6.4,    -9.4],
  'Libya':                       [    27,      18],
  'Lithuania':                   [  55.3,    23.9],
  'Luxembourg':                  [  49.8,       6],
  'Madagascar':                  [ -19.4,    46.7],
  'Malawi':                      [ -13.2,    34.2],
  'Malaysia':                    [   3.5,   114.7],
  'Mauritania':                  [  20.2,   -10.3],
  'Moldova':                     [  47.2,    28.4],
  'Mongolia':                    [  46.8,   102.9],
  'Montenegro':                  [  42.8,    19.3],
  'Namibia':                     [ -22.1,    17.2],
  'Nepal':                       [  28.2,      84],
  'Nicaragua':                   [  12.8,     -85],
  'Niger':                       [  17.3,     9.3],
  'North Korea':                 [  40.1,   127.2],
  'Oman':                        [  20.6,    56.1],
  'Palestine':                   [  31.9,    35.3],
  'Panama':                      [   8.5,   -80.1],
  'Papua New Guinea':            [  -6.6,   144.3],
  'Paraguay':                    [ -23.2,   -58.4],
  'Peru':                        [  -9.2,   -74.4],
  'Philippines':                 [  15.8,   121.5],
  'Qatar':                       [  25.3,    51.2],
  'Rwanda':                      [    -2,    29.9],
  'Saudi Arabia':                [  24.1,    44.5],
  'Senegal':                     [  14.4,   -14.5],
  'Sierra Leone':                [   8.5,   -11.8],
  'Slovakia':                    [  48.7,    19.5],
  'Solomon Islands':             [  -7.9,   159.1],
  'Somalia':                     [   4.8,    45.7],
  'South Sudan':                 [   7.3,    30.2],
  'Sri Lanka':                   [   7.7,    80.7],
  'Sudan':                       [    16,    29.9],
  'Suriname':                    [   4.1,   -55.9],
  'Syria':                       [    35,    38.5],
  'Taiwan':                      [  23.7,     121],
  'Tajikistan':                  [  38.6,      71],
  'Togo':                        [   8.4,       1],
  'Trinidad and Tobago':         [  10.4,   -61.3],
  'Tunisia':                     [  34.2,     9.5],
  'Turkmenistan':                [  39.1,    59.3],
  'Uganda':                      [   1.3,    32.4],
  'United Arab Emirates':        [  23.9,    54.2],
  'Uruguay':                     [ -32.8,     -56],
  'Uzbekistan':                  [  41.7,    63.2],
  'Venezuela':                   [   7.2,   -66.2],
  'Vietnam':                     [  16.7,   106.3],
  'Western Sahara':              [  24.3,   -12.1],
  'Yemen':                       [  15.9,    47.5],
  'Zambia':                      [ -13.4,    27.7],
  'Zimbabwe':                    [ -18.9,    29.8],
  'Honduras':       [15.2,  -86.2],
  'Barbados':       [13.2,  -59.5],
  'Martinique':     [14.6,  -61.0],
  'Mali':           [17.6,   -4.0],
  'Angola':         [-11.2,  17.9],
};

// ---- Where the visitor is ----
// The globe opens on the visitor's own corner of the map, worked out without
// asking them for anything: an IANA time zone names a city, and we already
// carry coordinates for most of the ones it can name. No permission prompt, no
// network call, and it resolves before the globe has finished loading.
// Zones whose city we don't carry — or that name a region rather than a city —
// get their own coordinates here.
const TZ_COORDS = {
  'America/Denver':      [ 39.74, -104.99], 'America/Phoenix':     [ 33.45, -112.07],
  'America/Anchorage':   [ 61.22, -149.90], 'America/Winnipeg':    [ 49.90,  -97.14],
  'America/Edmonton':    [ 53.55, -113.49], 'America/Halifax':     [ 44.65,  -63.58],
  'America/Jamaica':     [ 18.01,  -76.79], 'America/Puerto_Rico': [ 18.47,  -66.11],
  'America/Panama':      [  8.98,  -79.52], 'America/Costa_Rica':  [  9.93,  -84.08],
  'America/Guatemala':   [ 14.63,  -90.51], 'America/Caracas':     [ 10.49,  -66.88],
  'America/Montevideo':  [-34.90,  -56.16], 'America/Lima':        [-12.05,  -77.04],
  'Europe/Bucharest':    [ 44.43,   26.10], 'Europe/Budapest':     [ 47.50,   19.04],
  'Europe/Sofia':        [ 42.70,   23.32], 'Europe/Belgrade':     [ 44.79,   20.45],
  'Europe/Zagreb':       [ 45.81,   15.98], 'Europe/Bratislava':   [ 48.15,   17.11],
  'Asia/Kuala_Lumpur':   [  3.14,  101.69], 'Asia/Manila':         [ 14.60,  120.98],
  'Asia/Taipei':         [ 25.03,  121.57], 'Asia/Riyadh':         [ 24.71,   46.68],
  'Asia/Baghdad':        [ 33.31,   44.37], 'Asia/Kathmandu':      [ 27.72,   85.32],
  'Asia/Dhaka':          [ 23.81,   90.41], 'Asia/Colombo':        [  6.93,   79.86],
  'Asia/Ho_Chi_Minh':    [ 10.82,  106.63], 'Asia/Saigon':         [ 10.82,  106.63],
  'Australia/Brisbane':  [-27.47,  153.03], 'Australia/Perth':     [-31.95,  115.86],
  'Australia/Adelaide':  [-34.93,  138.60], 'Pacific/Fiji':        [-18.14,  178.44],
  'Africa/Algiers':      [ 36.75,    3.06], 'Africa/Tunis':        [ 36.81,   10.18],
  'Africa/Kinshasa':     [ -4.44,   15.27], 'Africa/Dakar':        [ 14.72,  -17.47],
  'Africa/Khartoum':     [ 15.50,   32.56], 'Atlantic/Reykjavik':  [ 64.15,  -21.94],
  'Asia/Ulaanbaatar':    [ 47.89,  106.91], 'Asia/Almaty':         [ 43.24,   76.89],
  'Asia/Tashkent':       [ 41.30,   69.24], 'Asia/Yangon':         [ 16.87,   96.20],
  'Asia/Yekaterinburg':  [ 56.84,   60.65], 'Europe/Vilnius':      [ 54.69,   25.28],
  'Europe/Riga':         [ 56.95,   24.11], 'Europe/Tallinn':      [ 59.44,   24.75],
};
// Zones that name a city under an older or alternate spelling than ours.
const TZ_ALIASES = { 'Calcutta': 'Kolkata', 'Kiev': 'Kyiv', 'Bombay': 'Mumbai' };
const plainName = (s) => String(s || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/_/g, ' ').trim().toLowerCase();

function homeFromTimeZone() {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return null; }
  if (!tz) return null;
  if (TZ_COORDS[tz]) return { lat: TZ_COORDS[tz][0], lng: TZ_COORDS[tz][1], from: tz };
  const tail = tz.split('/').pop();
  const want = plainName(TZ_ALIASES[tail] || tail);
  // Accents are stripped on both sides: the zone says Bogota, our table says
  // Bogotá, and they're the same place.
  const city = MAJOR_CITIES.find(c => plainName(c.name) === want);
  if (city) return { lat: city.lat, lng: city.lng, from: tz };
  return null;
}

// Country outlines for the globe. world-atlas ships TopoJSON (small); the
// topojson-client UMD loaded in index.html converts it to the GeoJSON
// features three-globe draws.
const WORLD_TOPO_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

// Natural Earth country names → the `country` strings used in data.js.
// Anything not listed matches by its own name.
const GEO_NAME_ALIASES = {
  'United States of America': 'USA',
  'United States':           'USA',
  'United Kingdom':          'UK',
  'Dem. Rep. Congo':         'DR Congo',
  'Democratic Republic of the Congo': 'DR Congo',
  'Czech Rep.':              'Czechia',
  'Czech Republic':          'Czechia',
  'Republic of Korea':       'South Korea',
  'Korea':                   'South Korea',
  'Macedonia':               'North Macedonia',
  'Russian Federation':      'Russia',
  'Bosnia and Herz.':        'Bosnia',
  // Natural Earth abbreviates on the map; the roster spells them out, and the
  // country name under a face should read like a country.
  'Central African Rep.':    'Central African Republic',
  'Dominican Rep.':          'Dominican Republic',
  'Eq. Guinea':              'Equatorial Guinea',
  'Falkland Is.':            'Falkland Islands',
  'Solomon Is.':             'Solomon Islands',
  'S. Sudan':                'South Sudan',
  'W. Sahara':               'Western Sahara',
  'eSwatini':                'Eswatini',
  'Timor-Leste':             'East Timor',
};
function geoCountryName(feat) {
  const raw = (feat && feat.properties && (feat.properties.name || feat.properties.NAME)) || '';
  return GEO_NAME_ALIASES[raw] || raw;
}

// data.js gets a cache-buster so dev refreshes always pick up changes.
const __DATA_URL = './data.js?v=' + Date.now();
const { PEOPLE, FIELDS, GENDERS } = await import(__DATA_URL);

console.log('[famous Baby] modules imported. PEOPLE:', PEOPLE.length, 'FIELDS:', FIELDS, 'GENDERS:', GENDERS);

// Map of field -> sorted list of subfields available within it.
// Built once from the dataset so it stays in sync as data grows.
const SUBFIELDS_BY_FIELD = (() => {
  const map = new Map();
  for (const p of PEOPLE) {
    if (!p.field || !p.subfield) continue;
    if (!map.has(p.field)) map.set(p.field, new Set());
    map.get(p.field).add(p.subfield);
  }
  const out = {};
  for (const [field, set] of map) out[field] = [...set].sort();
  return out;
})();

// Counts per field → subfield. Static, so it's built once from the dataset.
// Keyed by field rather than by subfield alone: "Activist" turns up under more
// than one field, and each row should count only its own.
const SUBFIELD_COUNTS = (() => {
  const map = new Map();
  for (const p of PEOPLE) {
    if (!p.field || !p.subfield) continue;
    if (!map.has(p.field)) map.set(p.field, new Map());
    const inner = map.get(p.field);
    inner.set(p.subfield, (inner.get(p.subfield) || 0) + 1);
  }
  return map;
})();
const subCount = (field, sf) => (SUBFIELD_COUNTS.get(field) || new Map()).get(sf) || 0;

const MONTH_NAMES = [
  '', 'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
function zodiacFor(month, day) {
  if (!month || !day) return null;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1  && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2  && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3  && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4  && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5  && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6  && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7  && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8  && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9  && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  return null;
}
// Each sign draws its own glyph from the sprite (#z-aries … #z-pisces).
function zodiacIcon(sign) {
  return sign ? '#z-' + sign.toLowerCase() : '#i-star';
}
// Wikipedia keeps every sign at "<Sign>_(astrology)" — the bare title is the
// constellation, which isn't what a birth chip means.
function zodiacWiki(sign) {
  return sign ? 'https://en.wikipedia.org/wiki/' + sign + '_(astrology)' : '';
}

/* =========================================================================
   CHINESE ZODIAC
   The animal turns over at lunar new year, not on 1 January, so anyone born
   in January or the first half of February belongs to the year before —
   roughly one name in seven. That date is the second new moon after the
   December solstice (the third when a leap month falls in between), which is
   worth computing properly rather than guessing: Meeus, Astronomical
   Algorithms, chapters 25, 27 and 49.
   Two known limits. Dates before 1582 assume the roster's birthdays are
   proleptic Gregorian, and the Chinese calendar itself ran on mean rather
   than true new moons until 1645 — so a birthday within a day of an ancient
   new year can land on the wrong side of it. Everything from 1645 on is
   solid, and the modern era matches the published dates exactly.
   ========================================================================= */
const ZODIAC_RAD = Math.PI / 180;
const zsin = (deg) => Math.sin(deg * ZODIAC_RAD);

// New moon k lunations from 2000 Jan 6, as a Julian Ephemeris Day (Meeus 49).
function newMoonJDE(k) {
  const T = k / 1236.85;
  const T2 = T * T, T3 = T2 * T, T4 = T3 * T;
  let jde = 2451550.09766 + 29.530588861 * k
    + 0.00015437 * T2 - 0.000000150 * T3 + 0.00000000073 * T4;
  const E  = 1 - 0.002516 * T - 0.0000074 * T2;
  const M  = 2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3;
  const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4;
  const F  = 160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4;
  const O  = 124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3;
  jde += -0.40720 * zsin(Mp)
    + 0.17241 * E * zsin(M)
    + 0.01608 * zsin(2 * Mp)
    + 0.01039 * zsin(2 * F)
    + 0.00739 * E * zsin(Mp - M)
    - 0.00514 * E * zsin(Mp + M)
    + 0.00208 * E * E * zsin(2 * M)
    - 0.00111 * zsin(Mp - 2 * F)
    - 0.00057 * zsin(Mp + 2 * F)
    + 0.00056 * E * zsin(2 * Mp + M)
    - 0.00042 * zsin(3 * Mp)
    + 0.00042 * E * zsin(M + 2 * F)
    + 0.00038 * E * zsin(M - 2 * F)
    - 0.00024 * E * zsin(2 * Mp - M)
    - 0.00017 * zsin(O)
    - 0.00007 * zsin(Mp + 2 * M)
    + 0.00004 * zsin(2 * Mp - 2 * F)
    + 0.00004 * zsin(3 * M)
    + 0.00003 * zsin(Mp + M - 2 * F)
    + 0.00003 * zsin(2 * Mp + 2 * F)
    - 0.00003 * zsin(Mp + M + 2 * F)
    + 0.00003 * zsin(Mp - M + 2 * F)
    - 0.00002 * zsin(Mp - M - 2 * F)
    - 0.00002 * zsin(3 * Mp + M)
    + 0.00002 * zsin(4 * Mp);
  return jde;
}
// December solstice (Meeus 27, mean) — within half an hour, and nothing here
// turns on less than a day.
function decemberSolsticeJDE(year) {
  const Y = (year - 2000) / 1000;
  return 2451900.05952 + 365242.74049 * Y - 0.06223 * Y * Y
    - 0.00823 * Y ** 3 + 0.00032 * Y ** 4;
}
// Apparent solar longitude (Meeus 25, low precision — 0.01° is ample for
// asking which 30° sector the sun is in).
function sunLongitude(jde) {
  const T = (jde - 2451545) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M  = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C  = (1.914602 - 0.004817 * T - 0.000014 * T * T) * zsin(M)
    + (0.019993 - 0.000101 * T) * zsin(2 * M)
    + 0.000289 * zsin(3 * M);
  const O = 125.04 - 1934.136 * T;
  const lon = (L0 + C - 0.00569 - 0.00478 * zsin(O)) % 360;
  return lon < 0 ? lon + 360 : lon;
}
// TT − UT, in days (Espenak/Meeus polynomials).
function deltaTDays(year) {
  let u, s;
  if (year < 1600)      { u = (year - 1000) / 100; s = 1574.2 - 556.01*u + 71.23472*u*u + 0.319781*u**3 - 0.8503463*u**4 - 0.005050998*u**5 + 0.0083572073*u**6; }
  else if (year < 1700) { u = year - 1600; s = 120 - 0.9808*u - 0.01532*u*u + u**3/7129; }
  else if (year < 1800) { u = year - 1700; s = 8.83 + 0.1603*u - 0.0059285*u*u + 0.00013336*u**3 - u**4/1174000; }
  else if (year < 1860) { u = year - 1800; s = 13.72 - 0.332447*u + 0.0068612*u*u + 0.0041116*u**3 - 0.00037436*u**4 + 0.0000121272*u**5 - 0.0000001699*u**6 + 0.000000000875*u**7; }
  else if (year < 1900) { u = year - 1860; s = 7.62 + 0.5737*u - 0.251754*u*u + 0.01680668*u**3 - 0.0004473624*u**4 + u**5/233174; }
  else if (year < 1920) { u = year - 1900; s = -2.79 + 1.494119*u - 0.0598939*u*u + 0.0061966*u**3 - 0.000197*u**4; }
  else if (year < 1941) { u = year - 1920; s = 21.20 + 0.84493*u - 0.076100*u*u + 0.0020936*u**3; }
  else if (year < 1961) { u = year - 1950; s = 29.07 + 0.407*u - u*u/233 + u**3/2547; }
  else if (year < 1986) { u = year - 1975; s = 45.45 + 1.067*u - u*u/260 - u**3/718; }
  else if (year < 2005) { u = year - 2000; s = 63.86 + 0.3345*u - 0.060374*u*u + 0.0017275*u**3 + 0.000651814*u**4 + 0.00002373599*u**5; }
  else                  { u = year - 2005; s = 64.69 + 0.2930*u; }
  return s / 86400;
}
// The calendar is reckoned by the date in Beijing, never by the instant: a new
// moon at 19:47 and a solstice at 06:23 on the same day belong to that day,
// and the month beginning then is the one holding the solstice. Getting this
// wrong is what puts 1985 a whole animal out.
function chinaDay(jdeTT) {
  const year = 2000 + (jdeTT - 2451545) / 365.25;
  return Math.floor(jdeTT - deltaTDays(year) + 8 / 24 + 0.5);
}
const newMoonDay = (k) => chinaDay(newMoonJDE(k));
function lastNewMoonK(day) {
  let k = Math.floor((day - 2451550) / 29.530588861);
  while (newMoonDay(k) > day) k--;
  while (newMoonDay(k + 1) <= day) k++;
  return k;
}
// Month 11 is the one holding the December solstice. Thirteen lunations to the
// next month 11 means a leap month somewhere in between; it's the first month
// with no major solar term, and when it falls before month 1 it pushes the new
// year a moon later. Returns { month, day } in the Gregorian year given.
const CNY_CACHE = new Map();
function chineseNewYear(year) {
  if (CNY_CACHE.has(year)) return CNY_CACHE.get(year);
  const k11 = lastNewMoonK(chinaDay(decemberSolsticeJDE(year - 1)));
  const k11next = lastNewMoonK(chinaDay(decemberSolsticeJDE(year)));
  let offset = 2;
  if (k11next - k11 === 13) {
    for (let i = 1; i <= 12; i++) {
      const a = sunLongitude(newMoonJDE(k11 + i));
      const b = sunLongitude(newMoonJDE(k11 + i + 1));
      if (Math.floor(a / 30) === Math.floor(b / 30)) {   // no term crossed
        if (i <= 2) offset = 3;
        break;
      }
    }
  }
  // Julian Day → Gregorian calendar date.
  const jd = newMoonDay(k11 + offset) - 0.5;
  const z = Math.floor(jd + 0.5);
  const alpha = Math.floor((z - 1867216.25) / 36524.25);
  const A = z + 1 + alpha - Math.floor(alpha / 4);
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const out = { month, day };
  CNY_CACHE.set(year, out);
  return out;
}

// The twelve, in cycle order from the Rat. The character is the sign's own
// symbol — a written glyph, not a picture of the animal, which is what the
// zodiac has always been and what sits properly beside the Greek ones.
const CHINESE_ZODIAC = [
  { animal: 'Rat',     glyph: '鼠' },
  { animal: 'Ox',      glyph: '牛' },
  { animal: 'Tiger',   glyph: '虎' },
  { animal: 'Rabbit',  glyph: '兔' },
  { animal: 'Dragon',  glyph: '龍' },
  { animal: 'Snake',   glyph: '蛇' },
  { animal: 'Horse',   glyph: '馬' },
  { animal: 'Goat',    glyph: '羊' },
  { animal: 'Monkey',  glyph: '猴' },
  { animal: 'Rooster', glyph: '雞' },
  { animal: 'Dog',     glyph: '狗' },
  { animal: 'Pig',     glyph: '豬' },
];
// A January or February birthday needs the day of the month to be placed at
// all — without it there's no telling which side of the new year it fell, and
// a coin-flip animal is worse than none. Every other month rides on the year,
// as does a birth with no month recorded at all: the year is what's known, and
// the year is what the animal is named for.
function chineseZodiacFor(year, month, day) {
  if (!year) return null;
  let y = year;
  if (month === 1 || month === 2) {
    if (!day) return null;
    const ny = chineseNewYear(year);
    if (month < ny.month || (month === ny.month && day < ny.day)) y -= 1;
  }
  return CHINESE_ZODIAC[((y - 4) % 12 + 12) % 12];
}

// How many days are in a given month (defaults to 31 for "any" pickers).
// Doesn't need leap-year awareness — for a birthday picker, Feb 29 is valid.
function daysInMonth(month) {
  if (!month) return 31;
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
  if (month === 2) return 29;
  return 30;
}

function formatBirthDate(person) {
  if (!person) return '';
  const m = person.birthMonth, d = person.birthDay, y = person.birthYear;
  if (m && d && y) return `${MONTH_NAMES[m]} ${d}, ${y}`;
  if (m && y) return `${MONTH_NAMES[m]} ${y}`;
  if (y) return `b. ${y}`;
  return '';
}

// Characters the keyboard picker supports — letters, common name punctuation,
// Editorial accent palette — one hue per top-level field. Used on chips,
// entry markers, and small color cues throughout the page.
// Jersey-issued palette. Saturated, broadcast-friendly, all play well on
// either the navy bar or the white card backgrounds in the new aesthetic.
const FIELD_COLORS = {
  'Sports':       '#E25C2B', // hunter orange
  'Music':        '#178A89', // teal
  'Film':         '#C8102E', // jersey red
  'Literature':   '#1F7A48', // deep green
  'Politics':     '#0E3068', // navy
  'Science':      '#6E3FB0', // violet
  'Activism':     '#E0A024', // gold
  'Architecture': '#4F6685', // steel
  'Arts':         '#D67A2A', // saffron
  'Fashion':      '#E03B7C', // hot pink
  'Tech':         '#1F8DEB', // electric blue
  'Religion':     '#C18A3B', // mustard
  'Philosophy':   '#6B7C42', // olive
  'Culinary':     '#B26A2E', // copper
};
const DEFAULT_FIELD_COLOR = '#0B1F3A';
const colorForField = (f) => FIELD_COLORS[f] || DEFAULT_FIELD_COLOR;

// Sprite id per field — drives the quick-category strip at the top of the map.
const FIELD_ICONS = {
  'Sports':       'i-trophy',
  'Music':        'i-note',
  'Film':         'i-film',
  'Literature':   'i-book',
  'Politics':     'i-gov',
  'Science':      'i-flask',
  'Activism':     'i-mega',
  'Architecture': 'i-building',
  'Arts':         'i-palette',
  'Fashion':      'i-hanger',
  'Tech':         'i-chip',
  'Religion':     'i-spark',
  'Philosophy':   'i-bulb',
  'Culinary':     'i-food',
};
const iconForField = (f) => FIELD_ICONS[f] || 'i-star';

// Pull the leading given-name token (handles diacritics).
function firstName(fullName) {
  const stripped = fullName.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return (stripped.trim().split(/\s+/)[0] || '').toLowerCase();
}

// Classic American Soundex — used to find phonetically similar names.
// Returns a 4-character code (letter + 3 digits).
function soundex(str) {
  const s = str.toUpperCase().replace(/[^A-Z]/g, '');
  if (!s) return '';
  const codes = {
    B:'1',F:'1',P:'1',V:'1',
    C:'2',G:'2',J:'2',K:'2',Q:'2',S:'2',X:'2',Z:'2',
    D:'3',T:'3',
    L:'4',
    M:'5',N:'5',
    R:'6',
  };
  let out = s[0];
  let prev = codes[s[0]] || '';
  for (let i = 1; i < s.length; i++) {
    const ch = s[i];
    const c = codes[ch] || '';
    if (c && c !== prev) out += c;
    if (ch !== 'H' && ch !== 'W') prev = c;
  }
  return (out + '000').slice(0, 4);
}

// Stop words we strip from the natural-language query.
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'with',
  'by', 'for', 'from', 'who', 'that', 'between', 'born', 'played',
  'win', 'won', 'first', 'best', 'is', 'are', 'was', 'were',
]);

// Build the searchable haystack for one person — flattened text used for
// token matching. We also return the field-by-field text so the UI can
// highlight which attribute matched.
function buildHaystack(person) {
  const teamText = person.teams.map(t => t.name).join(' ');
  const awardText = person.awards.map(a => a.name).join(' ');
  const collabText = person.collaborators.join(' ');
  return {
    full: [
      person.name, person.middleName || '', person.stageName || '',
      person.birthPlace, person.country,
      person.field, person.subfield,
      teamText, awardText, collabText, person.bio,
      String(person.birthYear),
    ].join(' ').toLowerCase(),
    parts: {
      // Middle names sit in the name bucket, so searching one scores the same
      // as a first or last name rather than falling through to the bio.
      name: (person.name + ' ' + (person.middleName || '') + ' ' + (person.stageName || '')).toLowerCase(),
      place: (person.birthPlace + ' ' + person.country).toLowerCase(),
      field: (person.field + ' ' + person.subfield).toLowerCase(),
      teams: teamText.toLowerCase(),
      awards: awardText.toLowerCase(),
      collaborators: collabText.toLowerCase(),
      bio: person.bio.toLowerCase(),
    },
  };
}

// How many people can be named as doing the searching. High enough that no
// real family hits it, low enough that a stuck key can't fill the sheet.
// Module scope because the app and the form component both hold the line.
const SEARCHER_LIMIT = 8;

const HAYSTACKS = new Map(PEOPLE.map(p => [p.id, buildHaystack(p)]));

// Name → person, so a credit on one card can open another. Stage names are
// indexed too: a collaborator listed as "Fergie" still resolves.
const PERSON_BY_NAME = (() => {
  const m = new Map();
  for (const p of PEOPLE) {
    m.set(p.name.toLowerCase(), p);
    if (p.stageName) m.set(p.stageName.toLowerCase(), p);
  }
  return m;
})();
const personByName = (n) => PERSON_BY_NAME.get(String(n || '').trim().toLowerCase()) || null;

// Tokenize a query: lowercase, strip punctuation, drop stop words.
function tokenize(q) {
  if (!q) return [];
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, ' ')
    .split(/\s+/)
    .filter(t => t && !STOP_WORDS.has(t) && t.length > 1);
}

// Pull bare years out of the query — used as an implicit year filter.
function extractYears(q) {
  if (!q) return [];
  return Array.from(q.matchAll(/\b(1[5-9]\d{2}|20\d{2})\b/g)).map(m => +m[1]);
}

// Score a person against a tokenized query. Returns { score, matchedParts }.
function scorePerson(person, tokens) {
  if (tokens.length === 0) return { score: 0, matchedParts: new Set() };
  const haystack = HAYSTACKS.get(person.id);
  let score = 0;
  const matchedParts = new Set();
  for (const tok of tokens) {
    if (!haystack.full.includes(tok)) continue;
    // Weight by where it matched.
    if (haystack.parts.name.includes(tok))          { score += 5; matchedParts.add('name'); }
    if (haystack.parts.teams.includes(tok))         { score += 4; matchedParts.add('teams'); }
    if (haystack.parts.collaborators.includes(tok)) { score += 4; matchedParts.add('collaborators'); }
    if (haystack.parts.awards.includes(tok))        { score += 3; matchedParts.add('awards'); }
    if (haystack.parts.place.includes(tok))         { score += 3; matchedParts.add('place'); }
    if (haystack.parts.field.includes(tok))         { score += 2; matchedParts.add('field'); }
    if (haystack.parts.bio.includes(tok))           { score += 1; matchedParts.add('bio'); }
  }
  return { score, matchedParts };
}

const app = createApp({
  setup() {
    // ---- State ----
    // We use plain arrays for multi-select state because Vue 3's reactivity
    // tracks array reassignment cleanly and templates can call helpers
    // without surprising auto-unwrap behavior on collection types.
    // Empty by default: the panel lists the whole roster on load, so the
    // first screen is content rather than a prompt.
    const query             = ref('');
    const selectedFields    = ref([]);
    const selectedSubfields = ref([]);          // genres/leagues/etc. inside a field
    const selectedGenders   = ref([]);
    // Year range is now a slider — initialize to the full range (treated as "any").
    const YEAR_FLOOR = 1000;
    const YEAR_CEIL = 2030;
    const yearMin           = ref(YEAR_FLOOR);
    const yearMax           = ref(YEAR_CEIL);
    // Keep the two handles from crossing.
    function setYearMin(v) {
      const n = Number(v);
      yearMin.value = Math.min(n, yearMax.value);
    }
    function setYearMax(v) {
      const n = Number(v);
      yearMax.value = Math.max(n, yearMin.value);
    }
    const yearMinPct = computed(() =>
      ((yearMin.value - YEAR_FLOOR) / (YEAR_CEIL - YEAR_FLOOR)) * 100
    );
    const yearMaxPct = computed(() =>
      ((yearMax.value - YEAR_FLOOR) / (YEAR_CEIL - YEAR_FLOOR)) * 100
    );
    const sort              = ref('relevance'); // 'relevance' | 'alpha' | 'oldest' | 'newest'

    // ---- Favorites — heart-bookmark a person; persisted to localStorage ----
    const STORAGE_FAVS = 'fb-favorites-v1';
    // Temporary: a first-time visitor gets three random names already saved,
    // so the heart isn't an empty room. Persisted, so it stays put on reload.
    // Drop this seed once the shortlist has real use.
    function seedFavs() {
      const picks = new Set();
      const pool = PEOPLE.filter(p => p.id && p.id !== '__skip__');
      while (picks.size < 3 && picks.size < pool.length) {
        picks.add(pool[Math.floor(Math.random() * pool.length)].id);
      }
      try { localStorage.setItem(STORAGE_FAVS, JSON.stringify([...picks])); } catch {}
      return picks;
    }
    function loadFavs() {
      try {
        const raw = localStorage.getItem(STORAGE_FAVS);
        if (raw === null) return seedFavs();
        return new Set(JSON.parse(raw));
      } catch { return new Set(); }
    }
    const favorites = ref(loadFavs());
    const onlyFavorites = ref(false);
    function isFavorite(p) { return favorites.value.has(p.id); }
    function toggleFavorite(p) {
      const next = new Set(favorites.value);
      if (next.has(p.id)) next.delete(p.id); else next.add(p.id);
      favorites.value = next;
      try { localStorage.setItem(STORAGE_FAVS, JSON.stringify([...next])); } catch {}
    }
    function toggleOnlyFavorites() { onlyFavorites.value = !onlyFavorites.value; }

    // ---- "Born today" — quick filter showing people born this month/day ----
    const bornTodayActive = ref(false);
    const now = new Date();
    const todayMonth = now.getMonth();   // 0-indexed
    const todayDay = now.getDate();
    function toggleBornToday() { bornTodayActive.value = !bornTodayActive.value; }
    function isBornToday(p) {
      if (typeof p.birthMonth === 'number' && typeof p.birthDay === 'number') {
        return p.birthMonth === todayMonth + 1 && p.birthDay === todayDay;
      }
      return false;
    }

    // ---- Born-on-day / born-in-month filters ----
    // Everything in Advanced search is multi-select: pick as many months,
    // days or signs as you like, and an empty list means "any".
    const selectedBornMonths = ref([]);
    const selectedBornDays = ref([]);
    const selectedZodiacs = ref([]);
    const ZODIACS = [
      'Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini',
      'Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius',
    ];
    const toggleBornMonth = (m) => toggleArrayItem(selectedBornMonths, m);
    const toggleBornDay   = (d) => toggleArrayItem(selectedBornDays, d);
    const toggleZodiac    = (z) => toggleArrayItem(selectedZodiacs, z);
    const isBornMonthSelected = (m) => selectedBornMonths.value.includes(m);
    const isBornDaySelected   = (d) => selectedBornDays.value.includes(d);
    const isZodiacSelected    = (z) => selectedZodiacs.value.includes(z);

    function clearBornFilters() {
      selectedBornMonths.value = [];
      selectedBornDays.value = [];
      selectedZodiacs.value = [];
      bornTodayActive.value = false;
    }
    function passBornFilters(person) {
      const months = selectedBornMonths.value;
      const days = selectedBornDays.value;
      const signs = selectedZodiacs.value;
      if (months.length && !months.includes(person.birthMonth)) return false;
      if (days.length && !days.includes(person.birthDay)) return false;
      if (signs.length && !signs.includes(zodiacFor(person.birthMonth, person.birthDay))) return false;
      return true;
    }

    // ---- 3D globe (country outlines are the click target) ----
    // Several countries at once, in the order they were picked. The first is
    // the anchor: whatever else gets added, the camera keeps that one in shot.
    const selectedCountries = ref([]);
    const selectedCountry = computed(() => selectedCountries.value[0] || '');
    const isCountryOn = (c) => selectedCountries.value.includes(c);
    const hoveredPoly = ref(null);
    let globeInstance = null;

    // How many people the dataset holds per country, plus a few sample names
    // for the hover label. Independent of COUNTRY_COORDS so a country still
    // counts even if we have no centroid to fly to.
    const countryCounts = computed(() => {
      const m = new Map();
      for (const p of PEOPLE) {
        if (!p.country) continue;
        if (!m.has(p.country)) m.set(p.country, { country: p.country, count: 0, sample: [] });
        const e = m.get(p.country);
        e.count += 1;
        if (e.sample.length < 5) e.sample.push(p.name);
      }
      return m;
    });
    const globeData = computed(() => [...countryCounts.value.values()]);

    // One country at a time. Picking used to add to a set, back when countries
    // were a list of filter chips and holding several made sense — but a pick
    // now means "fill the screen with this one", and two countries can't both
    // do that. Clicking somewhere else moves there; clicking the country
    // that's up puts it back down.
    function selectGlobeCountry(c) {
      selectedCountries.value = isCountryOn(c) ? [] : [c];
    }
    function clearCountry() { selectedCountries.value = []; }

    // Countries ranked by how many people the dataset has from each. No longer
    // a panel — places are picked off the globe now — but the random-place
    // roll still draws from it.
    const countryList = computed(() =>
      [...globeData.value].sort((a, b) => b.count - a.count || a.country.localeCompare(b.country))
    );

    // ---- City labels ----
    // Labels are 3-D objects measured in globe radii, so a fixed size reads as
    // a speck from orbit and swallows the map up close. Scaling with the
    // camera's altitude keeps a label about the same size on screen at any
    // zoom — it just gains legibility as you come down.
    const LABEL_K = 0.26;              // ≈0.88 at the default altitude of 2.4
    let labelSizeApplied = 0;
    function labelSizeFor(altitude) {
      const size = LABEL_K * ((Number(altitude) || 0) + 1);
      return Math.max(0.14, Math.min(1.5, size));
    }
    // Re-sizing rebuilds every label mesh, so ignore the noise: pans and the
    // auto-rotate fire the same event without changing altitude.
    // The fourth-largest city in each state only earns a label once the camera
    // is close enough to be looking at states rather than continents. Swapped
    // on the way past the threshold rather than every frame — re-seeding the
    // label layer rebuilds every sprite in it.
    let labelTier = 'world';
    function syncLabelTier(altitude) {
      if (!globeInstance || !(altitude > 0)) return;
      const want = altitude <= US_LABEL_ALTITUDE ? 'states' : 'world';
      if (want === labelTier) return;
      labelTier = want;
      try {
        globeInstance.labelsData(want === 'states' ? [...MAJOR_CITIES, ...US_STATE_CITIES] : MAJOR_CITIES);
      } catch {}
    }
    function syncLabelScale(altitude) {
      if (!globeInstance) return;
      syncLabelTier(altitude);
      const size = labelSizeFor(altitude);
      if (Math.abs(size - labelSizeApplied) < 0.02) return;
      labelSizeApplied = size;
      try { globeInstance.labelSize(size).labelDotRadius(size * 0.32); } catch {}
    }
    // pointOfView() tweens the camera without emitting zoom events, so callers
    // that fly somewhere hand us the altitude they're heading to.
    function syncLabelScaleTo(altitude) {
      setTimeout(() => syncLabelScale(altitude), 60);
    }

    // How long the camera takes to arrive. The slideshow waits it out, so it
    // lives here rather than being written into each pointOfView call.
    const CAMERA_TWEEN_MS = 900;

    // Fly the camera to a country the way Earth does: stop the spin, ease in.
    // `tightness` scales the padding around it — under 1 crops in closer.
    function flyToCountry(country, tightness = 1) {
      if (!globeInstance) return;
      const ext = countryExtent(country);
      const coords = COUNTRY_COORDS[country];
      if (!ext && !coords) return;
      const frame = ext ? countryFrame(country) : null;
      const [lat, lng] = vecToLatLng(frame ? frame.centre : (ext ? ext.centre : toVec(coords)));
      const altitude = frame
        ? altitudeToFitBox(frame.hw * tightness, frame.hh * tightness)
        : altitudeToFit(5 * RAD * FRAME_PAD * tightness);
      applyFramedAltitude(altitude);
      try {
        globeInstance.pointOfView({ lat, lng, altitude }, CAMERA_TWEEN_MS);
        syncLabelScaleTo(altitude);
      } catch {}
    }

    // ---- Framing a set of countries ----
    // Points on a sphere, so "fit them all in" has a hard limit: past a certain
    // spread the far side is behind the horizon and no camera distance helps.
    // Countries join the shot in the order they were picked and one is dropped
    // the moment it would push the group past that limit — which keeps the
    // first-picked country on screen, whatever else is selected.
    const RAD = Math.PI / 180;
    const toVec = ([lat, lng]) => {
      const a = lat * RAD, b = lng * RAD;
      return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
    };
    const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    const angleTo = (u, v) => Math.acos(Math.max(-1, Math.min(1, dot(u, v))));
    const meanDir = (vs) => {
      const sum = vs.reduce((a, v) => [a[0] + v[0], a[1] + v[1], a[2] + v[2]], [0, 0, 0]);
      const len = Math.hypot(sum[0], sum[1], sum[2]);
      return len < 1e-9 ? vs[0] : [sum[0] / len, sum[1] / len, sum[2] / len];
    };
    // Past ~68° from the centre of the shot a country sits too near the rim to
    // read, so that's the widest group we'll try to hold.
    const MAX_SPREAD = 68 * RAD;
    const vecToLatLng = (v) => [
      Math.asin(Math.max(-1, Math.min(1, v[2]))) / RAD,
      Math.atan2(v[1], v[0]) / RAD,
    ];

    // ---- How big a country actually is ----
    // COUNTRY_COORDS gives a point to fly to but says nothing about extent, so
    // one fixed altitude framed Luxembourg and Russia identically — which is
    // why small countries stayed specks. Measure the real outline instead:
    // the largest landmass's vertices, reduced to a centre and the angular
    // radius that covers them. Largest landmass, so Alaska doesn't drag the
    // USA's centre into the Pacific and pull the camera back to fit it.
    const countryExtentCache = new Map();
    function countryExtent(country) {
      if (countryExtentCache.has(country)) return countryExtentCache.get(country);
      let out = null;
      const f = worldFeatures.value.find(ft => geoCountryName(ft) === country);
      if (f) {
        let main = null;
        for (const poly of polysOf(f)) {
          if (!main || poly[0].length > main.length) main = poly[0];
        }
        if (main && main.length) {
          const vs = main.map(([lng, lat]) => toVec([lat, lng]));
          // meanDir is good enough for the horizon cull, which runs every
          // frame; framing wants a better centre and gets one lazily below.
          const centre = meanDir(vs);
          out = { centre, radius: Math.max(...vs.map(v => angleTo(centre, v))), verts: vs };
        }
      }
      // No outline (or none loaded yet): fall back to the centroid and a guess
      // at a mid-size country, and don't cache it — the real one may arrive.
      if (!out) {
        const c = COUNTRY_COORDS[country];
        if (!c) return null;
        if (!worldFeatures.value.length) return { centre: toVec(c), radius: 5 * RAD };
        out = { centre: toVec(c), radius: 5 * RAD };
      }
      countryExtentCache.set(country, out);
      return out;
    }

    // Both half-FOVs. Fitting a country to the narrower of the two throws away
    // the wider one: the USA is 42° across and 32° tall, and squeezing that
    // into the vertical field alone parks the camera 18% further out than it
    // needs to be, with empty screen down both sides.
    function fovHalves() {
      let fov = 50;                                   // globe.gl's default
      try { fov = globeInstance.camera().fov || fov; } catch {}
      const v = (fov / 2) * RAD;
      const el = globeInstance && globeInstance._el;
      if (!el || !el.clientHeight || !el.clientWidth) return { v, h: v };
      return { v, h: Math.atan(Math.tan(v) * (el.clientWidth / el.clientHeight)) };
    }
    function halfFov() {
      const f = fovHalves();
      return Math.min(f.v, f.h);
    }

    // The centre that minimises the distance to the furthest vertex. meanDir
    // leans towards wherever the coastline has the most detail, which on the
    // USA reads 18% wider than the country actually is. Badoiu-Clarkson: walk
    // the centre at the furthest point by a shrinking step.
    function tightCentre(vs, iters = 48) {
      let c = meanDir(vs);
      for (let i = 1; i <= iters; i++) {
        let far = vs[0], fd = -1;
        for (const v of vs) {
          const d = angleTo(c, v);
          if (d > fd) { fd = d; far = v; }
        }
        const s = 1 / (i + 1);
        const n = [c[0] + (far[0] - c[0]) * s, c[1] + (far[1] - c[1]) * s, c[2] + (far[2] - c[2]) * s];
        const len = Math.hypot(n[0], n[1], n[2]) || 1;
        c = [n[0] / len, n[1] / len, n[2] / len];
      }
      return c;
    }

    // How far the shape reaches east-west and north-south of its centre, in
    // the tangent plane — the camera holds north up, so those are the screen's
    // own axes.
    const cross = (u, v) => [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];
    function halfExtents(vs, centre) {
      let e = cross([0, 0, 1], centre);
      if (Math.hypot(e[0], e[1], e[2]) < 1e-6) e = [1, 0, 0];   // directly over a pole
      const len = Math.hypot(e[0], e[1], e[2]) || 1;
      e = [e[0] / len, e[1] / len, e[2] / len];
      const n = cross(centre, e);
      let hw = 0, hh = 0;
      for (const v of vs) {
        hw = Math.max(hw, Math.abs(Math.asin(Math.max(-1, Math.min(1, dot(v, e))))));
        hh = Math.max(hh, Math.abs(Math.asin(Math.max(-1, Math.min(1, dot(v, n))))));
      }
      return [hw, hh];
    }

    // The tight centre and half-extents, worked out once per country the first
    // time it's framed — the every-frame horizon cull doesn't need them, so
    // they don't belong in countryExtent's load-time path.
    const countryFrameCache = new Map();
    function countryFrame(country) {
      if (countryFrameCache.has(country)) return countryFrameCache.get(country);
      const ext = countryExtent(country);
      let out = null;
      if (ext && ext.verts && ext.verts.length) {
        const centre = tightCentre(ext.verts);
        const [hw, hh] = halfExtents(ext.verts, centre);
        out = { centre, hw, hh };
      } else if (ext) {
        out = { centre: ext.centre, hw: ext.radius, hh: ext.radius };
      }
      countryFrameCache.set(country, out);
      return out;
    }

    // Stand back just far enough that the shape's box fills the frame — each
    // axis against its own field of view, and whichever needs more room wins.
    function altitudeToFitBox(hw, hh) {
      const f = fovHalves();
      const need = (t, half) => {
        const th = Math.max(0.0008, Math.min(MAX_SPREAD, t));
        return Math.cos(th) + Math.sin(th) / Math.tan(half);
      };
      // Whichever axis needs more room wins, so the whole outline is held —
      // the photograph fills the country, the country doesn't fill the screen.
      const d = Math.max(need(hw * FRAME_PAD, f.h), need(hh * FRAME_PAD, f.v));
      return Math.max(MIN_FIT_ALT, Math.min(4, d - 1));
    }

    // Camera distance at which a cap of angular radius θ exactly fills the
    // frame. With the camera d radii out along +z, a surface point θ off the
    // sub-camera point subtends atan(sinθ / (d − cosθ)); set that equal to the
    // half-FOV and solve for d. Small θ drives d towards 1 — right on the
    // surface — which is exactly what a tiny country needs and why
    // controls.minDistance had to come down to let us get there.
    // Low enough that a country the size of Luxembourg can still fill the
    // frame; controls.minDistance below has to allow for it.
    const MIN_FIT_ALT = 0.004;
    function altitudeToFit(theta) {
      const t = Math.max(0.0008, Math.min(MAX_SPREAD, theta));
      const d = Math.cos(t) + Math.sin(t) / Math.tan(halfFov());
      return Math.max(MIN_FIT_ALT, Math.min(4, d - 1));
    }

    // A hair over 1: the whole country stays in frame, with just enough air
    // that the outline isn't touching the edges. Filling the screen by
    // overflowing it was worse — close enough to read the grain of a
    // photograph, and the country stopped being a shape you could recognise.
    const FRAME_PAD = 1.06;

    function frameCountries(countries) {
      if (!globeInstance) return;
      const pts = countries.map(c => ({ c, ext: countryExtent(c) })).filter(p => p.ext);
      if (!pts.length) return;

      // Countries join in pick order; one is dropped the moment it would push
      // the group past what a hemisphere can hold. Each country's own radius
      // counts towards the spread now, not just its centre — otherwise Russia
      // joins the shot and then hangs off both sides of it.
      const kept = [pts[0]];
      let centre = pts[0].ext.centre;
      for (let i = 1; i < pts.length; i++) {
        const trial = [...kept, pts[i]];
        const c = meanDir(trial.map(p => p.ext.centre));
        if (Math.max(...trial.map(p => angleTo(c, p.ext.centre) + p.ext.radius)) <= MAX_SPREAD) {
          kept.push(pts[i]);
          centre = c;
        }
      }
      // Frame on the outlines themselves, not on a circle around them.
      const verts = kept.flatMap(p => (p.ext.verts && p.ext.verts.length) ? p.ext.verts : [p.ext.centre]);
      const tight = kept.length === 1 ? countryFrame(kept[0].c) : null;
      const fitCentre = tight ? tight.centre : tightCentre(verts);
      const [hw, hh] = tight ? [tight.hw, tight.hh] : halfExtents(verts, fitCentre);
      const [lat, lng] = vecToLatLng(fitCentre);
      const altitude = altitudeToFitBox(hw, hh);
      applyFramedAltitude(altitude);
      try {
        globeInstance.pointOfView({ lat, lng, altitude }, CAMERA_TWEEN_MS);
        syncLabelScaleTo(altitude);
      } catch {}
    }

    // How tall a picked country stands. Fixed heights don't work once the
    // camera can sit two units off the surface: 0.11 radii is a slab from
    // orbit and an eleven-unit wall from up close. Pin it to a fraction of the
    // camera's own height instead, so the plinth reads the same at any zoom.
    const popAlt = ref(0.11);
    function applyFramedAltitude(altitude) {
      // Floor well under MIN_FIT_ALT: at that range a fixed 0.004 plinth
      // would stand as tall as the camera is high, and you'd be looking at
      // the country edge-on.
      popAlt.value = Math.max(0.0008, Math.min(0.16, altitude * 0.15));
      // The atmosphere is a shell drawn from the inside out; fly through it
      // and the haze fills the screen. Drop it once we're under it.
      try { globeInstance.showAtmosphere(altitude > 0.22); } catch {}
    }

    // Picking a place — from the list, the globe, or a card — adds it to the
    // selection rather than replacing it, and re-frames the camera around
    // everything picked. Tapping a lit country lets go of that one alone.
    function pickCountry(country) {
      if (!country) return;
      selectGlobeCountry(country);
      const now = selectedCountries.value;
      // Nothing to open: the country raising off the map, with its faces on
      // it, is the whole of the feedback. There is no panel to keep in step.
      if (now.length) frameCountries(now);
      else resetGlobeView();
    }

    // Where the globe opens, picked once per load. Drawing from MAJOR_CITIES
    // rather than random coordinates means it always faces somewhere inhabited
    // — most of a random lat/lng is ocean.
    const HOME_VIEW = (() => {
      const c = MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
      // altitude is replaced by fillAltitude() as soon as the canvas exists
      return c ? { lat: c.lat, lng: c.lng, altitude: 2.4 } : { lat: 20, lng: 0, altitude: 2.4 };
    })();

    // Only countries the roster actually has are in the draw, and the one
    // you're already looking at is excluded.
    function drawRandomCountry() {
      const pool = countryList.value.filter(
        c => COUNTRY_COORDS[c.country] && !isCountryOn(c.country)
      );
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    }
    // Re-aims the opening view, so whatever the camera comes "back" to
    // afterwards is the new place too.
    function aimHomeAt(country) {
      const coords = COUNTRY_COORDS[country];
      if (!coords) return;
      HOME_VIEW.lat = coords[0];
      HOME_VIEW.lng = coords[1];
    }

    // The button: spin somewhere else and filter to it, so the throw lands on
    // names rather than an empty country.
    function randomGlobeView() {
      const pick = drawRandomCountry();
      if (!pick) return;
      aimHomeAt(pick.country);
      selectedCountries.value = [pick.country];
      flyToCountry(pick.country);
    }

    // Same, for a place we only have coordinates for.
    function aimHomeAtCoords(lat, lng) {
      HOME_VIEW.lat = lat;
      HOME_VIEW.lng = lng;
    }

    // TEMPORARY OVERRIDE — everyone opens over London.
    // Normally this is the visitor's own part of the world, worked out from
    // their time zone (see homeFromTimeZone) and refined by the device if
    // they've already granted location. That makes every session start
    // somewhere different, which is exactly wrong while the globe is being
    // worked on: you can't tell a change from a coincidence. Delete the two
    // lines below to hand the opening view back to the visitor.
    const OPENING_OVERRIDE = { lat: 51.51, lng: -0.13 };   // London

    function openingGlobeView() {
      if (OPENING_OVERRIDE) {
        aimHomeAtCoords(OPENING_OVERRIDE.lat, OPENING_OVERRIDE.lng);
        return;
      }
      const home = homeFromTimeZone();
      if (home) {
        aimHomeAtCoords(home.lat, home.lng);
        return;
      }
      const pick = drawRandomCountry();
      if (pick) aimHomeAt(pick.country);
    }

    // If the visitor has already granted this site location at some point, use
    // the real thing instead of the time zone's guess. Deliberately never asks:
    // a permission dialog thrown up before anyone has seen the page is the
    // fastest way to get told no, and the time zone is close enough on its own.
    function refineHomeFromDevice() {
      if (!navigator.geolocation || !navigator.permissions) return;
      navigator.permissions.query({ name: 'geolocation' }).then((status) => {
        if (status.state !== 'granted') return;
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            aimHomeAtCoords(latitude, longitude);
            try { globeInstance && globeInstance.pointOfView({ lat: latitude, lng: longitude, altitude: HOME_VIEW.altitude }, 900); } catch {}
          },
          () => {},
          { timeout: 5000, maximumAge: 600000 }
        );
      }).catch(() => {});
    }

    // Pull the camera back out to the view this session started on.
    // The altitude at which the globe's silhouette just covers the canvas —
    // corners included, so no background shows anywhere. Worked out from the
    // camera rather than hard-coded, since the canvas is a different shape on
    // a phone, on a desktop and mid-resize.
    //   sin(θ) = R / d  for the sphere's angular radius, and the corner ray
    //   sits at atan(tan(fov/2) · √(1 + aspect²)).
    function fillAltitude() {
      const el = globeInstance && globeInstance._el;
      if (!el || !el.clientHeight) return 2.4;
      let fov = 50;                                  // globe.gl's default
      try { fov = globeInstance.camera().fov || fov; } catch {}
      const aspect = el.clientWidth / el.clientHeight;
      const tanCorner = Math.tan((fov / 2) * Math.PI / 180) * Math.sqrt(1 + aspect * aspect);
      const distance = 1 / Math.sin(Math.atan(tanCorner));
      // A hair closer than exact, so a rounding error can't leave a sliver of
      // sky along an edge.
      return Math.max(0.05, (distance - 1) * 0.97);
    }

    // The globe opens a quarter closer than the distance at which it merely
    // fills the canvas — near enough that a continent reads as a place rather
    // than as a curve. The sphere overflows the edges at this range, which is
    // the point: there was never meant to be sky in the corners.
    const OPENING_ZOOM = 0.75;
    function openingAltitude() { return Math.max(0.05, fillAltitude() * OPENING_ZOOM); }

    function resetGlobeView() {
      if (!globeInstance) return;
      try {
        HOME_VIEW.altitude = openingAltitude();
        // Back out to the whole globe, so the polygon heights (and the
        // atmosphere) come back with it rather than staying at whatever a
        // close-up country left them.
        applyFramedAltitude(HOME_VIEW.altitude);
        globeInstance.pointOfView({ ...HOME_VIEW }, 700);
        syncLabelScaleTo(HOME_VIEW.altitude);
      } catch {}
    }

    // Step zoom for the +/− buttons. dir = -1 zooms in (camera moves closer),
    // dir = +1 zooms out. Clamped by the OrbitControls min/maxDistance set in
    // initGlobe(). Wheel zoom keeps working independently.
    function zoomGlobe(dir) {
      if (!globeInstance) return;
      try {
        const pov = globeInstance.pointOfView();
        const altitude = Math.max(0.05, Math.min(4.0, pov.altitude * (dir > 0 ? 1.35 : 0.74)));
        globeInstance.pointOfView({ lat: pov.lat, lng: pov.lng, altitude }, 350);
        syncLabelScaleTo(altitude);
      } catch {}
    }

    // ---- Country polygon painting ----
    // Countries we have names for get a lit border and a translucent fill;
    // the rest stay as faint hairlines so the globe still reads as a map.
    function polyEntry(d) { return countryCounts.value.get(geoCountryName(d)); }

    function polyCapColor(d) {
      const entry = polyEntry(d);
      if (!entry) return 'rgba(255,255,255,0.012)';
      if (isCountryOn(entry.country)) return 'rgba(253,214,99,0.45)';
      if (d === hoveredPoly.value) return 'rgba(138,180,248,0.40)';
      return 'rgba(138,180,248,0.13)';
    }
    // Border colours have to survive the whole blue-marble texture: near-black
    // jungle at one end, blown-out Sahara/Arabian sand at the other. Pale
    // strokes only read against the dark half, so these sit at mid luminance
    // with enough chroma to separate by hue as well — darker than sand,
    // brighter than forest, never the same colour as either.
    function polyStrokeColor(d) {
      const entry = polyEntry(d);
      if (entry && isCountryOn(entry.country)) return '#FF9B21';
      if (!entry) return 'rgba(146,170,196,0.55)';
      return d === hoveredPoly.value ? '#12C8DC' : '#4F94E8';
    }
    // A picked country lifts clear of the sphere — far enough that the sides
    // read as a wall and the shape sits *on* the map rather than in it. All
    // three heights hang off popAlt, which tracks the camera (see
    // applyFramedAltitude), so zooming in on a small country can't leave a
    // merely-hovered neighbour standing taller than the one that's picked.
    // How high a country stands. The collage is clipped to the outline
    // projected at this exact height, so the two must be worked out in one
    // place — when they disagreed, hovering a country slid its photo off its
    // own border until the cursor moved away.
    function countryAltitude(country, hovered) {
      const pop = popAlt.value;
      if (isCountryOn(country)) return pop;
      if (hovered) return Math.min(0.015, pop * 0.55);
      return Math.min(0.007, pop * 0.30);
    }
    function polyAltitude(d) {
      const entry = polyEntry(d);
      const pop = popAlt.value;
      if (!entry) return Math.min(0.004, pop * 0.15);
      return countryAltitude(entry.country, d === hoveredPoly.value);
    }
    // Must match polygonsTransitionDuration below: globe.gl eases the
    // extrusion over this long, and the clip has to travel with it rather than
    // jumping to the final height and waiting for the country to catch up.
    const POLY_TWEEN_MS = 420;
    const easeCubicInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    // Once a country is up on its plinth the extruded sides are most of what
    // you see of it from an angle, so they take the selection colour too.
    function polySideColor(d) {
      const entry = polyEntry(d);
      if (entry && isCountryOn(entry.country)) return 'rgba(253,214,99,0.30)';
      return 'rgba(138,180,248,0.12)';
    }
    function repaintPolygons() {
      if (!globeInstance) return;
      globeInstance
        .polygonCapColor(polyCapColor)
        .polygonStrokeColor(polyStrokeColor)
        .polygonSideColor(polySideColor)
        .polygonAltitude(polyAltitude);
    }

    // Clicking a country selects it. Countries with nobody in the dataset are
    // inert — they're drawn for context, not as targets.
    function handlePolygonClick(d) {
      // The same gesture already opened a face. Clicking a portrait means
      // "show me this person", not "put the country back down".
      if (faceClickHandled) { faceClickHandled = false; return; }
      const entry = polyEntry(d);
      // A country nobody in the roster comes from is drawn for context only.
      // Clicking one is a click on nothing in particular, which is as good a
      // way as any of saying "put the one that's up back down".
      if (!entry) { dropCountry(); return; }
      pickCountry(entry.country);
    }

    // The way back out. The photograph fills the whole country now, so there
    // is no part of a raised country left to click that doesn't mean "open
    // this person" — the sea has to be the door.
    function dropCountry() {
      if (!selectedCountries.value.length) return;
      clearCountry();
      resetGlobeView();
    }
    function handleGlobeClick() {
      if (faceClickHandled) { faceClickHandled = false; return; }
      dropCountry();
    }

    // ---- The collage: a country filled with its own faces ----
    // A picked country doesn't get a portrait pinned above it — it *becomes*
    // the portrait. One photo at a time is scaled to cover the country's
    // silhouette and clipped to it, cross-fading to the next person from that
    // country, captioned with their date of birth and calling. Only ~20
    // entries are photographed so far; countries with nobody photographed
    // simply pop without a collage.
    //
    // The clip has to be built in screen space, not on the globe: the shape is
    // a 3-D outline seen at whatever angle the camera happens to hold, so
    // every frame re-projects the country's vertices through globe.gl's
    // getScreenCoords and rewrites the path. The heaviest outline in the
    // dataset (Canada) is 791 points, which is nothing per frame — but the
    // camera coasts under inertia with no event to hang off, hence the rAF
    // loop, and the projection is skipped whenever the camera hasn't moved.
    const FACE_DWELL = 3400;        // ms a face holds before the next one
    const GLOBE_R = 100;            // globe.gl's sphere radius

    const photoPeopleByCountry = computed(() => {
      const m = new Map();
      for (const p of PEOPLE) {
        if (!p.country || !HAS_PHOTO.has(p.id)) continue;
        if (!m.has(p.country)) m.set(p.country, []);
        m.get(p.country).push(p);
      }
      return m;
    });

    // The name reference — the given name on its own. There is no firstName
    // field on an entry, only the whole `name`, so take the first token.
    function givenName(name) {
      return String(name || '').trim().split(/\s+/)[0] || '';
    }

    // Date of birth, as full as the entry allows — 632 of 680 carry a month
    // and day, the rest only a year.
    function birthLine(p) {
      if (!p.birthYear) return '';
      if (p.birthMonth && p.birthDay) {
        return 'b. ' + p.birthDay + ' ' + MONTH_NAMES[p.birthMonth] + ' ' + p.birthYear;
      }
      return 'b. ' + p.birthYear;
    }

    // The rings we clip to, as [lat, lng] pairs ready to project. Cached per
    // country: the outline never changes, only the camera does.
    //
    // Two versions, because every country runs its slideshow at once now. The
    // full outline is 10,575 vertices across the world and each one costs a
    // matrix multiply per frame — fine for the one country you picked, far too
    // much for all of them. So an ambient country is drawn from its largest
    // landmass alone, thinned to AMBIENT_POINTS, which is more than enough
    // shape at the size it occupies when you aren't looking straight at it.
    const AMBIENT_POINTS = 48;
    function thin(ring, cap) {
      if (ring.length <= cap) return ring;
      const out = [];
      const step = ring.length / cap;
      for (let i = 0; i < cap; i++) out.push(ring[Math.floor(i * step)]);
      return out;
    }
    const collageRingsCache = new Map();
    function collageRings(country) {
      if (collageRingsCache.has(country)) return collageRingsCache.get(country);
      const f = worldFeatures.value.find(ft => geoCountryName(ft) === country);
      if (!f) return null;
      const rings = [];
      for (const poly of polysOf(f)) {
        // Outer ring only. Holes would need a fill-rule dance for a handful of
        // enclaves nobody will notice at this scale.
        if (poly[0] && poly[0].length > 2) rings.push(poly[0].map(([lng, lat]) => [lat, lng]));
      }
      if (!rings.length) return null;
      let main = null;
      for (const r of rings) if (!main || r.length > main.length) main = r;
      // Keep the unit vector beside each point: long edges get subdivided
      // along the great circle at draw time, and slerp needs vectors.
      const withVecs = (ring) => ({ ll: ring, v: ring.map(p => toVec(p)) });
      const out = {
        full: rings.map(withVecs),
        lite: [withVecs(thin(main, AMBIENT_POINTS))],
      };
      collageRingsCache.set(country, out);
      return out;
    }

    // ---- Overlay ----
    // One SVG across the whole canvas, one <g> per country inside it. Built
    // once, next to the globe, and left alone unless the selection changes.
    let collageRoot = null;
    let collageSvg = null;
    let collageDefs = null;
    let collageTimerBar = null;
    const collages = new Map();     // country -> live state
    let collageSeq = 0;             // unique ids for the clip paths

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const svgEl = (name, attrs) => {
      const el = document.createElementNS(SVG_NS, name);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    };

    function ensureCollageRoot() {
      if (collageRoot) return collageRoot;
      const host = globeInstance && globeInstance._el;
      if (!host) return null;
      collageRoot = document.createElement('div');
      collageRoot.className = 'ccol';
      collageSvg = svgEl('svg', { class: 'ccol__svg' });
      collageDefs = svgEl('defs', {});
      collageSvg.appendChild(collageDefs);
      collageRoot.appendChild(collageSvg);
      host.appendChild(collageRoot);
      return collageRoot;
    }

    function buildCollage(country, people, rings) {
      const id = 'ccol-clip-' + (++collageSeq);
      const clip = svgEl('clipPath', { id, clipPathUnits: 'userSpaceOnUse' });
      const clipPath = svgEl('path', { d: '' });
      clip.appendChild(clipPath);
      collageDefs.appendChild(clip);

      const g = svgEl('g', { class: 'ccol__g' });
      const inner = svgEl('g', { 'clip-path': 'url(#' + id + ')' });
      // Something behind the photo, so the shape still reads as filled during
      // the very first decode.
      const back = svgEl('rect', { class: 'ccol__back', x: 0, y: 0, width: 0, height: 0 });
      inner.appendChild(back);

      // Two layers per slide, because filling the silhouette and showing the
      // whole face are opposite demands. `slice` covers the country but crops
      // hard — on a wide country it scales a portrait until only a cheek is
      // left. So the fill is a blurred, dimmed copy (slice), and the face sits
      // on top of it whole (`meet` never crops), as large as the shape allows.
      const mkSlide = () => {
        const slide = svgEl('g', { class: 'ccol__slide' });
        // `slice` is SVG's object-fit: cover, and the box is the whole outline
        // — so the photograph fills the country edge to edge. It crops what
        // won't fit, which is the trade taken on purpose: a portrait sitting
        // whole inside the border left most of the country empty.
        const fg = svgEl('image', { class: 'ccol__fg', preserveAspectRatio: 'xMidYMid slice' });
        slide.appendChild(fg);
        inner.appendChild(slide);
        return { slide, fg };
      };
      const slideA = mkSlide(), slideB = mkSlide();

      const edge = svgEl('path', { class: 'ccol__edge', d: '' });
      g.appendChild(inner);
      g.appendChild(edge);
      collageSvg.appendChild(g);

      const cap = document.createElement('div');
      cap.className = 'ccol__cap';
      cap.style.setProperty('--face-dwell', FACE_DWELL + 'ms');
      // The given name leads: this is a naming almanac, and the first name is
      // the part a parent actually takes away. The full name sits under it,
      // since the roster stores birth names (Bowie is filed as David Jones)
      // and the two are often not the same person to a reader.
      cap.innerHTML = '<span class="ccol__given"></span>';
      collageRoot.appendChild(cap);

      const state = {
        country, people, rings, id, g, inner, clipPath, edge, back, cap,
        // Left undefined on purpose — see projectCollage, which works the pole
        // out the first time a country is actually worth drawing. Doing all 73
        // here would block the load for the best part of a second.
        pole: undefined,
        slideA, slideB, front: slideB,
        given: cap.querySelector('.ccol__given'),
        idx: 0,
        box: null,
      };
      // The caption is the way in, not the shape: a click target the size of
      // the screen would swallow the drag that spins the globe and the second
      // click that puts the country back down.
      cap.addEventListener('click', (ev) => {
        ev.stopPropagation();
        // Only a raised country has a caption to click, but hold the same rule
        // here as on the faces: cards come from the blown-up slideshow.
        if (!state.selected) return;
        const p = state.people[state.idx];
        if (p) openPerson(p);
      });
      collages.set(country, state);
      return state;
    }

    // Cross-fade: two stacked <image>, the incoming one only promoted once it
    // has actually decoded, so a slow photo never blinks the shape empty.
    function showCollageFace(state, idx) {
      const p = state.people[idx];
      if (!p) return;
      state.idx = idx;
      const next = state.front === state.slideA ? state.slideB : state.slideA;
      // The map wants the face; the person's card wants the whole picture.
      // photos/faces holds a tight crop of each portrait (see facecrop.swift),
      // and the uncropped original stays where it was for everything else.
      // Fall back to it if a crop was never made for this one.
      const faceSrc = './photos/faces/' + p.id + '.jpg';
      const fullSrc = './photos/' + p.id + '.jpg';
      let src = faceSrc;
      // <image> fires load like <img>, but decode through an Image first so
      // the swap happens on a frame where the bytes are ready.
      const probe = new Image();
      probe.onload = () => {
        // Kept for the click target: `meet` letterboxes the portrait inside
        // its box, and only the drawn rect is clickable.
        state.natural = { w: probe.naturalWidth, h: probe.naturalHeight };
        next.fg.setAttribute('href', src);
        next.slide.classList.add('is-front');
        state.front.slide.classList.remove('is-front');
        state.front = next;
        // The name and nothing else. Everything a card would tell you is one
        // click away, and on the globe the rest of it competed with the face.
        state.given.textContent = givenName(p.name);
        state.g.classList.add('is-loaded');
        state.cap.classList.add('is-loaded');
        if (state.selected) runTimerBar(0);
      };
      // No crop for this one: use the original. If that's missing too, the
      // current face stays up rather than the shape blanking.
      probe.onerror = () => {
        if (src === faceSrc) { src = fullSrc; probe.src = fullSrc; return; }
        probe.onerror = null;
      };
      probe.src = src;
    }

    // Only the country you picked runs a slideshow. Everywhere else holds the
    // one face it was dealt — seventy-three countries all turning over at once
    // is a fidget, not a map, and it says nothing about where you're looking.
    const COLLAGE_TICK = 250;
    function advanceCollages() {
      const now = performance.now();
      for (const state of collages.values()) {
        if (!state.selected || state.people.length < 2 || !state.loaded) continue;
        // Don't cycle what nobody can see.
        if (state.g.classList.contains('is-behind')) continue;
        if (state.nextAt == null) { state.nextAt = now + FACE_DWELL; continue; }
        if (now < state.nextAt) continue;
        state.nextAt = now + FACE_DWELL;
        showCollageFace(state, (state.idx + 1) % state.people.length);
      }
    }

    let collageTimer = null;
    function syncCollageTimer() {
      const wanted = [...collages.values()].some(s => s.selected && s.people.length > 1);
      if (wanted && !collageTimer) collageTimer = setInterval(advanceCollages, COLLAGE_TICK);
      if (!wanted && collageTimer) { clearInterval(collageTimer); collageTimer = null; }
    }

    // ---- Per-frame projection ----
    // A surface point is over the horizon when it falls outside
    // acos(R / cameraDistance) of the camera direction. The margin has to be a
    // *fraction* of that cap, not a fixed slice of cosine: up close the cap is
    // only a few degrees wide, and a flat margin pushes the cutoff past 1 and
    // hides everything.
    const COLLAGE_HORIZON_MARGIN = 0.06;
    // Under this many pixels across, a country is a speck and the face in it
    // is noise — so it isn't drawn, and its photo is never even fetched.
    const MIN_FACE_PX = 26;
    // How far a photograph may be enlarged past its own pixels to fill a
    // country before it stops being worth it.
    const MAX_UPSCALE = 1.15;
    // Switch to the true outline once a country is this big on screen, and
    // back below the lower figure — two values so it can't flicker.
    const DETAIL_ON_PX = 150;
    const DETAIL_OFF_PX = 120;
    // Longest border edge we'll draw as a straight screen-space line before
    // walking the great circle instead.
    const MAX_EDGE_PX = 18;
    // Great-circle interpolation between two unit vectors.
    function slerp(a, b, t) {
      const om = angleTo(a, b);
      if (om < 1e-7) return a;
      const s = Math.sin(om);
      const k0 = Math.sin((1 - t) * om) / s;
      const k1 = Math.sin(t * om) / s;
      return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
    }

    // Camera position → the lat/lng it is over, inverting three-globe's own
    // placement formula (x = s·sin(90−lat)·cos(90−lng), y = s·cos(90−lat),
    // z = s·sin(90−lat)·sin(90−lng)) rather than trusting a guess at its API.
    function camLatLng(pos) {
      const s = Math.hypot(pos.x, pos.y, pos.z) || 1;
      return [
        Math.asin(Math.max(-1, Math.min(1, pos.y / s))) / RAD,
        90 - Math.atan2(pos.z, pos.x) / RAD,
      ];
    }

    // ---- Where the face goes ----
    // The point furthest from any coastline — a country's pole of
    // inaccessibility — is where a portrait has the most room to be seen. The
    // area centroid isn't good enough: on a hook like Norway or Vietnam it
    // falls in the sea, and the clip eats the face. Measured once per country
    // in lat/lng and cached, then projected each frame like any other point,
    // so the cost lands on the first pick and never again.
    function pointInRing(x, y, pts) {
      let inside = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
      }
      return inside;
    }
    function distToRing(x, y, pts) {
      let best = Infinity;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const ax = pts[j][0], ay = pts[j][1], bx = pts[i][0], by = pts[i][1];
        const dx = bx - ax, dy = by - ay;
        const len2 = dx * dx + dy * dy;
        let t = len2 ? ((x - ax) * dx + (y - ay) * dy) / len2 : 0;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const ex = x - (ax + t * dx), ey = y - (ay + t * dy);
        const d2 = ex * ex + ey * ey;
        if (d2 < best) best = d2;
      }
      return Math.sqrt(best);
    }
    // Coarse sweep, then three shrinking passes around the winner. Plenty for
    // a 110m outline, and far simpler than a full quadtree search.
    function poleOfInaccessibility(ring) {
      const pts = ring.map(([lat, lng]) => [lng, lat]);   // work in x=lng, y=lat
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const [x, y] of pts) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
      const w = maxX - minX, h = maxY - minY;
      if (!(w > 0) || !(h > 0)) return null;
      const score = (x, y) => pointInRing(x, y, pts) ? distToRing(x, y, pts) : -1;

      let best = null, bestScore = -Infinity;
      let step = Math.max(w, h) / 32;
      for (let x = minX; x <= maxX; x += step) {
        for (let y = minY; y <= maxY; y += step) {
          const s = score(x, y);
          if (s > bestScore) { bestScore = s; best = [x, y]; }
        }
      }
      if (!best) return null;
      for (let k = 0; k < 3; k++) {
        step /= 4;
        const bx = best[0], by = best[1];
        for (let x = bx - step * 4; x <= bx + step * 4; x += step) {
          for (let y = by - step * 4; y <= by + step * 4; y += step) {
            const s = score(x, y);
            if (s > bestScore) { bestScore = s; best = [x, y]; }
          }
        }
      }
      // [lat, lng, clearance] — the clearance is how far the coast is from
      // that point, in degrees, and it is what tells the face and the name
      // how much room they have inside the border.
      return bestScore > 0 ? [best[1], best[0], bestScore] : null;
    }

    const collagePoleCache = new Map();
    // `rings` are { ll, v } — the lat/lng pairs plus their unit vectors, since
    // drawing needs the vectors to walk a long edge along its great circle.
    // The pole is worked out from the lat/lng side alone.
    function collagePole(country, rings) {
      if (collagePoleCache.has(country)) return collagePoleCache.get(country);
      let main = null;
      for (const ring of rings) {
        if (!main || ring.ll.length > main.length) main = ring.ll;
      }
      const pole = main ? poleOfInaccessibility(main) : null;
      collagePoleCache.set(country, pole);
      return pole;
    }


    // Is the whole country on the near face of the globe? One dot product
    // against the cached extent answers it, instead of a projection per
    // vertex — which is what makes 73 simultaneous slideshows affordable.
    //
    // Retiring the moment any part of the outline crosses the rim is also the
    // correct behaviour, not just the cheap one: Vector3.project inverts
    // behind the camera plane, so a half-crossed country folds in on itself.
    function countryFullyVisible(state, camDir, horizonAngle) {
      const ext = state.ext;
      if (!ext) return true;
      return angleTo(ext.centre, camDir) + ext.radius <= horizonAngle * (1 - COLLAGE_HORIZON_MARGIN);
    }

    // The height the clip should be cut at this instant, following the same
    // eased path globe.gl walks the extrusion along. Returns the target
    // directly once the tween is spent.
    function collageTweening(state, now) {
      return state.altAt != null && (now - state.altAt) < POLY_TWEEN_MS;
    }
    function clipAltitude(state, now) {
      const hovered = !!hoveredPoly.value && geoCountryName(hoveredPoly.value) === state.country;
      const target = countryAltitude(state.country, hovered);
      if (state.altTo === undefined) {
        state.altFrom = target;
        state.altTo = target;
        state.altAt = null;
        return target;
      }
      if (target !== state.altTo) {
        // Start from wherever the previous tween had got to, so a change of
        // mind part-way through doesn't snap.
        const t = state.altAt == null ? 1 : Math.min(1, (now - state.altAt) / POLY_TWEEN_MS);
        state.altFrom = state.altFrom + (state.altTo - state.altFrom) * easeCubicInOut(t);
        state.altTo = target;
        state.altAt = now;
      }
      if (state.altAt == null) return state.altTo;
      const t = Math.min(1, (now - state.altAt) / POLY_TWEEN_MS);
      return state.altFrom + (state.altTo - state.altFrom) * easeCubicInOut(t);
    }

    function projectCollage(state, pos, dist) {
      // Cut the clip at the height this country is drawn at *right now*,
      // mid-rise included — anything else and the photo floats off its border.
      const alt = clipAltitude(state, performance.now());
      // Detail follows how big the country is on screen, not whether it's
      // picked. A 48-point outline is indistinguishable from the real one at
      // thumbnail size and visibly cuts the corners once you're close, which
      // is what pulled the yellow edge off the border at some zooms. Two
      // thresholds so a country hovering at the boundary doesn't flicker.
      const onScreen = state.box ? Math.max(state.box.w, state.box.h) : 0;
      const detailed = state.selected || onScreen > (state.detailed ? DETAIL_OFF_PX : DETAIL_ON_PX);
      state.detailed = detailed;
      const rings = detailed ? state.rings.full : state.rings.lite;

      let d = '';
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      let seen = 0;
      const project = (lat, lng) => {
        let s;
        try { s = globeInstance.getScreenCoords(lat, lng, alt); } catch { return null; }
        return (s && isFinite(s.x) && isFinite(s.y)) ? s : null;
      };
      for (const ring of rings) {
        const ll = ring.ll, vecs = ring.v, n = ll.length;
        let started = false;
        let prev = null, prevIdx = -1;
        const add = (s) => {
          d += (started ? 'L' : 'M') + s.x.toFixed(1) + ' ' + s.y.toFixed(1);
          started = true;
          if (s.x < minX) minX = s.x;
          if (s.x > maxX) maxX = s.x;
          if (s.y < minY) minY = s.y;
          if (s.y > maxY) maxY = s.y;
        };
        // <= n so the closing edge is walked too, not left as a straight chord.
        for (let k = 0; k <= n; k++) {
          const i = k % n;
          const s = project(ll[i][0], ll[i][1]);
          if (!s) continue;
          seen++;
          // globe.gl draws each border edge as a great-circle arc on the
          // sphere; a straight line between two projected endpoints is not
          // that arc, and the gap grows with the edge. Walk the arc instead.
          if (prev && prevIdx >= 0) {
            const span = Math.hypot(s.x - prev.x, s.y - prev.y);
            if (span > MAX_EDGE_PX) {
              const steps = Math.min(32, Math.ceil(span / MAX_EDGE_PX));
              for (let j = 1; j < steps; j++) {
                const m = slerp(vecs[prevIdx], vecs[i], j / steps);
                const ml = vecToLatLng(m);
                const sm = project(ml[0], ml[1]);
                if (sm) add(sm);
              }
            }
          }
          if (k < n) add(s);
          prev = s;
          prevIdx = i;
        }
        if (started) d += 'Z';
      }
      if (!seen || !isFinite(minX)) return false;
      // Too small to read a face in. Below this the shape is a speck and the
      // photo inside it is noise, so leave it to the map underneath.
      if (!state.selected && Math.max(maxX - minX, maxY - minY) < MIN_FACE_PX) return false;

      state.clipPath.setAttribute('d', d);
      state.edge.setAttribute('d', d);
      const w = Math.max(1, maxX - minX), h = Math.max(1, maxY - minY);

      const setBox = (el, x, y, bw, bh) => {
        el.setAttribute('x', x.toFixed(1));
        el.setAttribute('y', y.toFixed(1));
        el.setAttribute('width', bw.toFixed(1));
        el.setAttribute('height', bh.toFixed(1));
      };
      // A hair of bleed so no sub-pixel gap shows along the clip edge.
      const B = 1;
      setBox(state.back, minX, minY, w, h);

      // Filling the outline is right up to the point where the photograph
      // runs out of pixels. A 512px face crop stretched across a country
      // eight hundred pixels wide is both blown up and cropped hard — you end
      // up looking at the grain of somebody's cheek. So cover the shape only
      // while that costs no more than MAX_UPSCALE; past it, draw the picture
      // whole at that limit and let the country hold it, with space around.
      const nat = state.natural;
      let fit = null;
      if (nat && nat.w && nat.h) {
        const coverScale = Math.max((w + B * 2) / nat.w, (h + B * 2) / nat.h);
        if (coverScale > MAX_UPSCALE) {
          // The pole of inaccessibility is the roomiest point in the country,
          // which is where a picture that doesn't fill it should sit.
          if (state.pole === undefined) state.pole = collagePole(state.country, state.rings.full);
          let cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
          if (state.pole) {
            const ps = project(state.pole[0], state.pole[1]);
            if (ps) { cx = ps.x; cy = ps.y; }
          }
          const dw = nat.w * MAX_UPSCALE, dh = nat.h * MAX_UPSCALE;
          fit = { x: cx - dw / 2, y: cy - dh / 2, w: dw, h: dh };
        }
      }
      for (const sl of [state.slideA, state.slideB]) {
        if (fit) {
          // Box matches the picture's own aspect, so `meet` neither crops it
          // nor stretches it.
          sl.fg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          setBox(sl.fg, fit.x, fit.y, fit.w, fit.h);
        } else {
          sl.fg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          setBox(sl.fg, minX - B, minY - B, w + B * 2, h + B * 2);
        }
      }

      state.box = { minX, minY, maxX, maxY, w, h };
      return true;
    }

    // The photograph is the country now, so a click lands on a face wherever
    // it lands inside the outline. The bounding box is only a cheap first
    // pass; the shape itself decides.
    function faceAt(x, y) {
      for (const state of collages.values()) {
        if (state.g.classList.contains('is-behind')) continue;
        const b = state.box;
        if (!b || x < b.minX || x > b.maxX || y < b.minY || y > b.maxY) continue;
        try {
          if (state.clipPath.isPointInFill && !state.clipPath.isPointInFill(new DOMPoint(x, y))) continue;
        } catch { /* no isPointInFill: the box alone will do */ }
        return { state, person: state.people[state.idx] };
      }
      return null;
    }

    // globe.gl watches pointerup on the same container and defers its own
    // click to a requestAnimationFrame, so a listener added here runs first
    // whatever the registration order — no stopPropagation needed. Blocking
    // the event instead would stand a chance of stranding OrbitControls
    // mid-drag, since it captures the pointer on the canvas underneath.
    let faceClickHandled = false;
    let pointerDownAt = null;
    const DRAG_SLOP = 6;            // px of travel that still counts as a click

    function onGlobePointerDown(ev) {
      faceClickHandled = false;
      pointerDownAt = { x: ev.clientX, y: ev.clientY };
    }
    function onGlobePointerUp(ev) {
      if (ev.button !== 0 || !collages.size) return;
      const host = globeInstance && globeInstance._el;
      if (!host) return;
      // A drag that ends over a face is still a drag.
      if (pointerDownAt && Math.hypot(ev.clientX - pointerDownAt.x, ev.clientY - pointerDownAt.y) > DRAG_SLOP) return;
      const rect = host.getBoundingClientRect();
      const hit = faceAt(ev.clientX - rect.left, ev.clientY - rect.top);
      if (!hit) return;
      // Either way this gesture is spoken for, so the polygon handler under it
      // stands down rather than toggling the country a second time.
      faceClickHandled = true;
      if (!hit.state.selected) {
        // A face on the map is a door into the country, not into the person.
        // Clicking the one over England blows England up to fill the screen
        // and sets its slideshow going — it doesn't open whoever happened to
        // be showing at the time.
        pickCountry(hit.state.country);
        return;
      }
      // Only once a country is up and cycling does a face stand for the person
      // in it, and clicking one opens their card.
      if (hit.person) openPerson(hit.person);
    }

    // ---- Slideshow timer ----
    // One bar across the top, under the masthead, rather than a sliver on each
    // country: only a picked country is running, and the top edge is where a
    // thing that applies to the whole screen belongs.
    function ensureCollageTimer() {
      if (collageTimerBar || !collageRoot) return collageTimerBar;
      collageTimerBar = document.createElement('div');
      collageTimerBar.className = 'ccol__timer';
      collageTimerBar.style.setProperty('--face-dwell', FACE_DWELL + 'ms');
      collageRoot.appendChild(collageTimerBar);
      return collageTimerBar;
    }
    // Removing the class and forcing a reflow before re-adding it is what makes
    // the animation replay; without the reflow the browser coalesces the two
    // changes and nothing moves.
    function runTimerBar(delayMs) {
      const bar = ensureCollageTimer();
      if (!bar) return;
      bar.classList.remove('is-running');
      bar.style.animationDelay = '';
      void bar.offsetWidth;
      if (delayMs) bar.style.animationDelay = delayMs + 'ms';
      bar.classList.add('is-running');
    }
    function stopTimerBar() {
      if (collageTimerBar) collageTimerBar.classList.remove('is-running');
    }

    let collageRaf = null;
    let lastCamKey = '';
    function runCollageLoop() {
      if (!collages.size) { collageRaf = null; lastCamKey = ''; return; }
      collageRaf = requestAnimationFrame(runCollageLoop);
      const host = globeInstance && globeInstance._el;
      if (!host) return;
      let cam;
      try { cam = globeInstance.camera(); } catch { return; }
      const pos = cam && cam.position;
      if (!pos) return;
      const dist = Math.hypot(pos.x, pos.y, pos.z);
      if (!(dist > GLOBE_R)) return;
      // Nothing has moved and nothing is mid-transition — skip the projection.
      const hostW = host.clientWidth, hostH = host.clientHeight;
      const key = [pos.x, pos.y, pos.z, popAlt.value, hostW, hostH]
        .map(n => n.toFixed(3)).join(',');
      // A country mid-rise changes shape without the camera moving, so the
      // still-camera shortcut has to stand down until it has settled — and
      // hovering changes a height too.
      const now = performance.now();
      let settling = !!hoveredPoly.value;
      if (!settling) {
        for (const state of collages.values()) {
          if (collageTweening(state, now)) { settling = true; break; }
        }
      }
      if (key === lastCamKey && !settling) return;
      lastCamKey = key;
      if (collageSvg) {
        collageSvg.setAttribute('width', hostW);
        collageSvg.setAttribute('height', hostH);
        collageSvg.setAttribute('viewBox', '0 0 ' + hostW + ' ' + hostH);
      }
      // One dot product per country decides whether it is worth projecting at
      // all. With every country running a slideshow, this cull is the
      // difference between ~1,800 projections a frame and ~16,000.
      const camDir = toVec(camLatLng(pos));
      const horizonAngle = Math.acos(Math.max(-1, Math.min(1, GLOBE_R / dist)));
      for (const state of collages.values()) {
        const ok = countryFullyVisible(state, camDir, horizonAngle)
          && projectCollage(state, pos, dist);
        state.g.classList.toggle('is-behind', !ok);
        // Only a picked country is captioned. Seventy-three name cards at once
        // would bury the globe they are meant to be describing.
        state.cap.classList.toggle('is-behind', !ok || !state.selected);
        if (ok) {
          // First time this one has been worth looking at: fetch its face now
          // rather than pulling all 73 down on load.
          if (!state.loaded) { state.loaded = true; showCollageFace(state, state.idx); }
        }
      }
    }
    function startCollageLoop() {
      if (collageRaf == null && collages.size) collageRaf = requestAnimationFrame(runCollageLoop);
    }

    function clearCollages() {
      for (const state of collages.values()) {
        state.g.remove();
        state.cap.remove();
        const clip = collageDefs && collageDefs.querySelector('#' + state.id);
        if (clip) clip.remove();
      }
      collages.clear();
    }

    // Every country with a face runs its slideshow, all the time — the globe
    // is meant to look inhabited before you touch it. Picking one doesn't turn
    // its collage on; it raises the country, frames the camera on it and gives
    // it the caption.
    function syncCollageLayer() {
      if (!globeInstance) return;
      clearCollages();
      if (!ensureCollageRoot()) { syncCollageTimer(); return; }
      for (const [country, people] of photoPeopleByCountry.value) {
        if (!people.length) continue;
        const rings = collageRings(country);
        if (!rings) continue;
        const state = buildCollage(country, people, rings);
        state.selected = isCountryOn(country);
        state.ext = countryExtent(country);
        // One face per country, drawn at random and then left alone, so the
        // map is different each visit but still at rest. Picking the country
        // is what sets it moving. Nothing is fetched here — the loop loads a
        // photo the first frame its country is in front of the camera and big
        // enough to read.
        state.idx = Math.floor(Math.random() * people.length);
      }
      syncCollageTimer();
      lastCamKey = '';        // force a projection on the next frame
      startCollageLoop();
    }

    // Picking a country changes which collage is raised and captioned, not
    // which ones exist — so flip the flags rather than tearing down and
    // rebuilding seventy-odd SVG groups on every click.
    function syncCollageSelection() {
      const now = performance.now();
      for (const [country, state] of collages) {
        const on = isCountryOn(country);
        const was = state.selected;
        state.selected = on;
        if (on && !was) {
          // Picked: the country zooms to fill the screen first, and only then
          // does the slideshow start. Counting the dwell from the click would
          // spend most of it on a moving camera, and the first face would turn
          // over just as you arrived.
          state.nextAt = now + CAMERA_TWEEN_MS + FACE_DWELL;
          if (state.people.length > 1) runTimerBar(CAMERA_TWEEN_MS);
        } else if (!on && was) {
          // Put back down: it keeps whichever face it was showing.
          state.nextAt = null;
          if (![...collages.values()].some(x => x.selected)) stopTimerBar();
        }
      }
      syncCollageTimer();
      lastCamKey = '';
    }

    // ---- Where a birthplace actually is ----
    // Exact city string, else the trailing region token (US state, home
    // nation, province), else the country centroid. `exact` tells the card
    // whether the dot is a real city or an approximation.
    function birthLocation(person) {
      if (!person) return null;
      const place = person.birthPlace || '';
      const city = CITY_COORDS[place];
      if (city) return { lat: city[0], lng: city[1], exact: true };
      const tail = place.split(',').map(s => s.trim()).pop();
      const region = REGION_COORDS[tail];
      if (region) return { lat: region[0], lng: region[1], exact: false };
      const country = COUNTRY_COORDS[person.country];
      if (country) return { lat: country[0], lng: country[1], exact: false };
      return null;
    }

    // ---- Mini-map (person card) ----
    // Same outlines the globe uses, projected to SVG and framed on the one
    // country — no world map, just where this person is from.
    const worldFeatures = ref([]);
    // Equirectangular degrees→SVG units. 1 unit = 1 degree, so the viewBox can
    // be expressed directly in lng/lat and simply cropped to the country.
    const projX = (lng) => lng + 180;
    const projY = (lat) => 90 - lat;

    function ringPath(ring) {
      let d = '';
      for (let i = 0; i < ring.length; i++) {
        d += (i ? 'L' : 'M') + projX(ring[i][0]).toFixed(2) + ' ' + projY(ring[i][1]).toFixed(2);
      }
      return d + 'Z';
    }
    function polysOf(f) {
      const g = f && f.geometry;
      if (!g) return [];
      return g.type === 'Polygon' ? [g.coordinates]
           : g.type === 'MultiPolygon' ? g.coordinates
           : [];
    }
    function featurePath(f) {
      return polysOf(f).map(poly => poly.map(ringPath).join('')).join('');
    }

    // The feature for the open person's country, if we have an outline for it.
    const miniFeature = computed(() => {
      const p = selectedPerson.value;
      if (!p) return null;
      return worldFeatures.value.find(ft => geoCountryName(ft) === p.country) || null;
    });
    const miniOutline = computed(() => {
      const f = miniFeature.value;
      return f ? featurePath(f) : '';
    });

    // Internal state / province borders for the framed country, when we have
    // them (USA, Canada, Brazil, Russia, India, China, Australia, Indonesia,
    // South Africa).
    const miniAdmin = computed(() => {
      const p = selectedPerson.value;
      if (!p) return '';
      const lines = ADMIN1_LINES[p.country];
      if (!lines) return '';
      return lines.map(line =>
        line.map(([lng, lat], i) =>
          (i ? 'L' : 'M') + projX(lng).toFixed(2) + ' ' + projY(lat).toFixed(2)
        ).join('')
      ).join('');
    });

    // Frame on the country's largest landmass, so Alaska (or an overseas
    // territory) doesn't zoom the view back out to the whole hemisphere.
    const miniView = computed(() => {
      const f = miniFeature.value;
      if (!f) return null;
      const polys = polysOf(f);
      if (!polys.length) return null;
      let main = polys[0][0];
      for (const poly of polys) if (poly[0].length > main.length) main = poly[0];
      let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
      for (const [lng, lat] of main) {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
      // Keep the birth marker inside the frame even if it sits on a smaller
      // island or just outside the main polygon.
      const loc = birthLocation(selectedPerson.value);
      if (loc) {
        minLng = Math.min(minLng, loc.lng); maxLng = Math.max(maxLng, loc.lng);
        minLat = Math.min(minLat, loc.lat); maxLat = Math.max(maxLat, loc.lat);
      }
      // Everything below is built around the centre, so a country that hits
      // the size floor stays in the middle of the frame instead of sliding
      // into a corner.
      const cx = projX((minLng + maxLng) / 2);
      const cy = projY((minLat + maxLat) / 2);
      // Pad, and hold a floor so tiny countries don't magnify to mush.
      let w = Math.max(maxLng - minLng, 3) * 1.28;
      let h = Math.max(maxLat - minLat, 3) * 1.28;
      // The tile is portrait, so give the viewBox the same shape — otherwise
      // `meet` letterboxes the outline down to a thin band.
      const TILE_ASPECT = 3 / 4;
      if (w / h > TILE_ASPECT) h = w / TILE_ASPECT;
      else w = h * TILE_ASPECT;
      return { x: cx - w / 2, y: cy - h / 2, w, h };
    });

    // ---- Card map zoom ----
    // 1 = the whole country fits the tile. For a country the size of the USA
    // or Russia that leaves the birthplace an unreadable speck, so the card
    // opens part-way zoomed: enough to frame a region around the city while
    // still reading as somewhere inside the country. Small countries open at 1.
    const MINI_TARGET_SPAN = 26;   // degrees across — comfortable for a city
    const miniAutoZoom = computed(() => {
      const v = miniView.value;
      if (!v) return 1;
      const span = Math.max(v.w, v.h);
      return Math.min(4, Math.max(1, span / MINI_TARGET_SPAN));
    });
    // The frame actually rendered: the fitted box, scaled to that zoom and
    // centred on the birthplace.
    const miniFrame = computed(() => {
      const v = miniView.value;
      if (!v) return null;
      const z = miniAutoZoom.value;
      const w = v.w / z, h = v.h / z;
      const loc = birthLocation(selectedPerson.value);
      const fx = loc ? projX(loc.lng) : v.x + v.w / 2;
      const fy = loc ? projY(loc.lat) : v.y + v.h / 2;
      let x = fx - w / 2, y = fy - h / 2;
      // Zoomed in, hold the frame inside the country's own box; at 1 there's
      // nothing to clamp against, so just stay centred.
      x = w < v.w ? Math.min(Math.max(x, v.x), v.x + v.w - w) : v.x + v.w / 2 - w / 2;
      y = h < v.h ? Math.min(Math.max(y, v.y), v.y + v.h - h) : v.y + v.h / 2 - h / 2;
      return {
        x, y, w, h,
        box: `${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}`,
        // Strokes, dots and type are in user units, so they scale with zoom.
        unit: Math.max(w, h) / 100,
      };
    });

    // City labels for whatever the frame currently covers — the person's own
    // city first, then major cities that fall inside the view.
    const miniCities = computed(() => {
      const f = miniFrame.value;
      if (!f) return [];
      const inFrame = (x, y, mx = 0, my = 0) =>
        x >= f.x + mx && x <= f.x + f.w - mx && y >= f.y + my && y <= f.y + f.h - my;
      const out = [];
      const seen = new Set();
      const person = selectedPerson.value;
      const own = birthLocation(person);
      // Name the birthplace even when we only know it roughly — the dot is
      // already drawn there, and an unlabelled dot says less than an
      // approximate name does. The caption carries the "approx." caveat.
      const ownName = ((person && person.birthPlace) || '').split(',')[0].trim();
      if (own && ownName) {
        out.push({ name: ownName, x: projX(own.lng), y: projY(own.lat), own: true });
        seen.add(ownName);
      }
      // Keep neighbours a margin in from the edge so their type isn't sliced
      // in half by the frame.
      const mx = f.w * 0.1, my = f.h * 0.08;
      for (const c of MAJOR_CITIES) {
        if (seen.has(c.name)) continue;
        const x = projX(c.lng), y = projY(c.lat);
        if (!inFrame(x, y, mx, my)) continue;
        out.push({ name: c.name, x, y, own: false });
        if (out.length >= 12) break;
      }
      return out;
    });

    const miniMarker = computed(() => {
      const loc = birthLocation(selectedPerson.value);
      if (!loc) return null;
      return { x: projX(loc.lng), y: projY(loc.lat), exact: loc.exact };
    });

    // Fetch + attach the outlines. Failure is non-fatal: the globe still
    // renders, just without borders.
    async function loadCountryPolygons() {
      try {
        const res = await fetch(WORLD_TOPO_URL);
        const topo = await res.json();
        if (!window.topojson) throw new Error('topojson-client did not load');
        const features = window.topojson.feature(topo, topo.objects.countries).features;
        worldFeatures.value = features;   // also feeds the card's mini-map
        if (!globeInstance) return;
        globeInstance
          .polygonsData(features)
          .polygonGeoJsonGeometry('geometry')
          .polygonSideColor(polySideColor)
          .polygonStrokeColor(polyStrokeColor)
          .polygonCapColor(polyCapColor)
          .polygonAltitude(polyAltitude)
          // Long enough that a country visibly rises rather than teleporting,
          // short enough that hover still feels immediate.
          .polygonsTransitionDuration(POLY_TWEEN_MS)
          // No hover tooltip: the country lights up under the cursor, which is
          // all the feedback the globe needs.
          .polygonLabel(() => '')
          .onPolygonClick(handlePolygonClick)
          .onGlobeClick(handleGlobeClick)
          .onPolygonHover(d => {
            hoveredPoly.value = d || null;
            const el = globeInstance && globeInstance._el;
            if (el) el.style.cursor = (d && polyEntry(d)) ? 'pointer' : 'grab';
            repaintPolygons();
          });
        console.log('[famous Baby] country outlines loaded:', features.length);
        // Outlines are what the collages are cut from, so this is the earliest
        // the globe can be populated — every country with a face starts its
        // slideshow here, before anyone touches anything.
        syncCollageLayer();
      } catch (err) {
        console.error('[famous Baby] country outlines failed:', err);
      }
    }

    async function initGlobe() {
      await nextTick();
      const el = document.getElementById('globe-canvas');
      if (!window.Globe || !el || globeInstance) return;
      // Wait until the container has real dimensions before initializing,
      // otherwise globe.gl creates a 0x0 canvas that never paints.
      const w0 = el.clientWidth, h0 = el.clientHeight;
      if (w0 < 20 || h0 < 20) {
        const deadline = Date.now() + 5000;
        await new Promise(resolve => {
          const tick = () => {
            if (el.clientWidth >= 20 && el.clientHeight >= 20) return resolve();
            if (Date.now() > deadline) return resolve(); // give up, try anyway
            requestAnimationFrame(tick);
          };
          tick();
        });
      }
      // The globe now fills the viewport, so the canvas simply tracks the
      // container — no clamping.
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      console.log('[famous Baby] initGlobe canvas:', w, 'x', h);
      // Preload the earth texture so we can surface a clear error if the CDN
      // is blocked / slow. Use a pinned version (skip the unpkg redirect) and
      // fall back to a colored globe if the image can't load.
      const EARTH_URL = 'https://unpkg.com/three-globe@2.45.2/example/img/earth-blue-marble.jpg';
      const BUMP_URL  = 'https://unpkg.com/three-globe@2.45.2/example/img/earth-topology.png';
      const testImg = new Image();
      testImg.crossOrigin = 'anonymous';
      testImg.onload  = () => console.log('[famous Baby] earth texture loaded:', EARTH_URL);
      testImg.onerror = (e) => console.error('[famous Baby] earth texture FAILED:', EARTH_URL, e);
      testImg.src = EARTH_URL;
      el.innerHTML = '';
      globeInstance = window.Globe()(el)
        .width(w)
        .height(h)
        .backgroundColor('#05070c')
        .globeImageUrl(EARTH_URL)
        .bumpImageUrl(BUMP_URL)
        .showAtmosphere(true)
        .atmosphereColor('#7FB2F0')
        .atmosphereAltitude(0.18)
        // Major cities, the way Earth labels the ground beneath you.
        .labelsData(MAJOR_CITIES)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('name')
        // Both are re-set by syncLabelScale() as the camera moves.
        .labelSize(labelSizeFor(2.4))
        .labelDotRadius(labelSizeFor(2.4) * 0.32)
        .labelColor(() => 'rgba(255,255,255,0.82)')
        .labelAltitude(0.012)
        .labelResolution(2)
        // State / province lines for the countries Natural Earth carries them
        // for — drawn fainter than national borders so the hierarchy reads.
        .pathsData(ADMIN1_PATHS)
        .pathPoints('coords')
        .pathPointLat(p => p[1])
        .pathPointLng(p => p[0])
        .pathPointAlt(0.006)
        .pathColor(() => 'rgba(132,158,186,0.5)')
        .pathStroke(0.5)
        .pathTransitionDuration(0)
        // Wheel/pinch zoom: keep the city labels legible on the way down.
        .onZoom(pov => syncLabelScale(pov && pov.altitude));
      labelSizeApplied = labelSizeFor(2.4);
      try {
        const c = globeInstance.controls();
        // Never animates on its own: the globe only moves when you move it.
        if ('autoRotate' in c) c.autoRotate = false;
        c.enableZoom = true;
        c.zoomSpeed = 1.2;
        // Close enough to sit almost on the surface, which is what a small
        // country needs to fill the frame — a floor of 110 kept Luxembourg a
        // speck no matter how the camera was aimed. See altitudeToFit().
        c.minDistance = 100.4;   // sphere radius is 100
        c.maxDistance = 700;
        // Weight and friction, like a globe on a stand: a flick keeps turning
        // and coasts to a stop. The two control types spell it differently, so
        // set whichever this build is using — a lower factor coasts longer.
        if ('staticMoving' in c) {        // TrackballControls
          c.staticMoving = false;
          c.dynamicDampingFactor = 0.07;
          c.rotateSpeed = 1.1;
        }
        if ('enableDamping' in c) {       // OrbitControls
          c.enableDamping = true;
          c.dampingFactor = 0.07;
          c.rotateSpeed = 0.9;
        }
      } catch {}
      el.style.cursor = 'grab';
      el.addEventListener('pointerdown', onGlobePointerDown);
      el.addEventListener('pointerup', onGlobePointerUp);
      const ro = new ResizeObserver(() => {
        if (!globeInstance || !el.isConnected) return;
        globeInstance.width(el.clientWidth).height(el.clientHeight);
      });
      ro.observe(el);
      globeInstance._ro = ro;
      globeInstance._el = el;
      resetGlobeView();
      loadCountryPolygons();
    }

    function disposeGlobe() {
      if (!globeInstance) return;
      globeInstance._ro && globeInstance._ro.disconnect();
      if (collageTimer) { clearInterval(collageTimer); collageTimer = null; }
      if (collageRaf != null) { cancelAnimationFrame(collageRaf); collageRaf = null; }
      clearCollages();
      if (collageRoot) { collageRoot.remove(); collageRoot = null; collageSvg = null; collageDefs = null; collageTimerBar = null; }
      const el = globeInstance._el;
      if (el) {
        el.removeEventListener('pointerdown', onGlobePointerDown);
        el.removeEventListener('pointerup', onGlobePointerUp);
        el.innerHTML = '';
      }
      globeInstance = null;
    }

    // ---- Bottom dock ----
    // The search line owns the bottom edge; hits stack directly above it. The
    // box is three rows tall and everything past that scrolls inside it, so a
    // long list never pushes the search line off the screen.
    const HITS_LIMIT = 3;      // rows visible at once — the box's height
    const HITS_MAX = 400;      // rows actually rendered; the rest need a filter
    const hitsExpanded = ref(false);

    // ---- How much room the names get ----
    // Three states rather than a toggle: out of the way but still there, the
    // three-name default, and as many as the screen will hold. Maxing out is a
    // decision to read names, so the callings fold down to a bar to make room —
    // and unfolding them puts the list back to three, since there's no point
    // opening a panel you can't see.
    const drawersFolded = ref(false);
    const hitsSize = ref('three');                 // bar | three | max
    function setHitsSize(v) {
      hitsSize.value = v;
      drawersFolded.value = v === 'max';
    }
    function unfoldDrawers() {
      drawersFolded.value = false;
      if (hitsSize.value === 'max') hitsSize.value = 'three';
    }

    // ---- Name order ----
    // Sorting and the A–Z jump read the same key, so the letter someone files
    // under is always the letter they're found at.
    const NAME_SUFFIXES = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'junior', 'senior']);
    const isNameSuffix = (tok) => NAME_SUFFIXES.has(String(tok || '').trim().toLowerCase());
    function surnameOf(person) {
      const parts = String((person && person.name) || '').trim().split(/\s+/);
      while (parts.length > 1 && NAME_SUFFIXES.has(parts[parts.length - 1].toLowerCase())) parts.pop();
      return parts[parts.length - 1] || '';
    }
    // First name, and only first name for now: the F/M/L control is off the
    // panel, so a stored 'last' from an earlier visit would strand someone in
    // an order with nothing on screen to change it. Kept as a ref, and
    // setNameMode still works, for when the control comes back.
    const nameMode = ref('first');           // 'first' | 'middle' | 'last
    function middleNameOf(person) {
      return String((person && person.middleName) || '').trim();
    }
    function nameKey(person) {
      const full = String((person && person.name) || '');
      if (nameMode.value === 'last') return (surnameOf(person) + ' ' + full).toLowerCase();
      if (nameMode.value === 'middle') {
        // \uffff sorts after every letter, so the many people we have no
        // middle name for collect at the end instead of salting the A\u2013Z run.
        return ((middleNameOf(person) || '\uffff') + ' ' + full).toLowerCase();
      }
      return full.toLowerCase();
    }
    // Strip accents before bucketing, so Ángel files under A and not somewhere
    // past Z. Anything that still isn't a letter goes to '#'.
    const deburr = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    function letterOf(person) {
      const c = deburr(nameKey(person)).charAt(0).toUpperCase();
      return c >= 'A' && c <= 'Z' ? c : '#';
    }
    const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const visibleHits = computed(() => {
      let prev = null;
      return filtered.value.slice(0, HITS_MAX).map(r => {
        const letter = letterOf(r.person);
        const head = letter !== prev;      // first row of its letter — the jump target
        prev = letter;
        // Split here rather than in the template: the rows re-render on every
        // keystroke, and this only changes when the filter does.
        const parts = fullNameParts(r.person);
        return {
          person: r.person, letter, head,
          first: parts ? parts.first : '',
          mid:   parts ? parts.middle : '',
          last:  parts ? parts.last : '',
          sfx:   parts ? parts.suffix : '',
        };
      });
    });
    // Which letters the current filter actually has anyone under.
    const hitLetters = computed(() => {
      const set = new Set();
      for (const r of filtered.value) set.add(letterOf(r.person));
      return set;
    });

    // ---- Letter dial ----
    // A combination-lock dial rather than 26 tap targets: it rides down the
    // right edge of the list like a scrollbar, and whichever letter lands in
    // the notch is the one the list jumps to. Letters nobody files under still ride past, greyed, so
    // the alphabet never changes length under your thumb.
    const dialTrack = ref(null);
    const dialLetter = ref('A');

    function dialCell() {
      const el = dialTrack.value;
      if (!el) return 0;
      const first = el.querySelector('.dial__l');
      return first ? first.getBoundingClientRect().height : 0;
    }
    // The pads above and below are half a viewport minus half a cell, so
    // the centred index falls out as scrollTop / cellHeight.
    function onDialScroll() {
      const el = dialTrack.value;
      const cell = dialCell();
      if (!el || !cell) return;
      const i = Math.max(0, Math.min(AZ.length - 1, Math.round(el.scrollTop / cell)));
      if (AZ[i] === dialLetter.value) return;
      dialLetter.value = AZ[i];
      // Track the dial as it turns rather than waiting for it to settle —
      // instant, because a smooth scroll can't keep up with a drag.
      if (!dialQuiet && hitLetters.value.has(AZ[i])) jumpToLetter(AZ[i], 'auto');
    }
    function centerLetter(L, behavior = 'smooth') {
      const el = dialTrack.value;
      const cell = dialCell();
      if (!el || !cell) return;
      el.scrollTo({ top: AZ.indexOf(L) * cell, behavior });
    }

    // A new filter is a new alphabet: park the dial on the first letter the
    // result set actually has. Quiet, because repositioning shouldn't force
    // the list into alphabetical order the way a real swipe does.
    let dialQuiet = false;
    function resetDial() {
      const first = AZ.find(L => hitLetters.value.has(L)) || 'A';
      dialLetter.value = first;
      dialQuiet = true;
      centerLetter(first, 'auto');
      setTimeout(() => { dialQuiet = false; }, 220);
    }
    function pickLetter(L) {
      dialLetter.value = L;
      centerLetter(L);
      if (hitLetters.value.has(L)) jumpToLetter(L);
    }
    // One notch at a time, for anyone who'd rather tap than drag. It steps to
    // the next letter the results actually have — stopping on a greyed letter
    // would move the dial without moving the list, which reads as a dead press.
    function dialStep(dir) {
      const from = AZ.indexOf(dialLetter.value);
      for (let i = from + dir; i >= 0 && i < AZ.length; i += dir) {
        if (hitLetters.value.has(AZ[i])) { pickLetter(AZ[i]); return; }
      }
    }
    const hasLetterBeyond = (dir) => {
      const from = AZ.indexOf(dialLetter.value);
      for (let i = from + dir; i >= 0 && i < AZ.length; i += dir) {
        if (hitLetters.value.has(AZ[i])) return true;
      }
      return false;
    };
    const canDialUp = computed(() => hasLetterBeyond(-1));
    const canDialDown = computed(() => hasLetterBeyond(1));

    // The dial's own dice roll: spin to a letter this result set actually has,
    // never the one already under the notch — a roll that lands where it
    // started reads as a broken button.
    function randomLetter() {
      const pool = AZ.filter(L => hitLetters.value.has(L) && L !== dialLetter.value);
      if (!pool.length) return;
      pickLetter(pool[Math.floor(Math.random() * pool.length)]);
    }

    // A mouse has no swipe, so it drags the dial instead.
    let dialDrag = false, dialDownY = 0, dialDownScroll = 0, dialMoved = false;
    let suppressDialClick = false;
    function dialPointerDown(e) {
      if (e.pointerType === 'touch' || !dialTrack.value) return;
      dialDrag = true; dialMoved = false;
      dialDownY = e.clientY;
      dialDownScroll = dialTrack.value.scrollTop;
    }
    function dialPointerMove(e) {
      if (!dialDrag || !dialTrack.value) return;
      const dy = e.clientY - dialDownY;
      if (Math.abs(dy) > 4) dialMoved = true;
      dialTrack.value.scrollTop = dialDownScroll - dy;
    }
    function dialPointerUp() {
      if (!dialDrag) return;
      dialDrag = false;
      suppressDialClick = dialMoved;
      setTimeout(() => { suppressDialClick = false; }, 0);
    }
    function onDialClick(L) {
      if (suppressDialClick) return;
      pickLetter(L);
    }

    const hitsList = ref(null);
    // The list is already filtering with every keystroke, so the magnifier
    // isn't what runs the search — it's what says you're done typing. On a
    // phone that means the keyboard comes down and the results get the screen;
    // empty, it puts the cursor back where the search starts. Enter is the
    // same gesture from the keyboard.
    const searchInput = ref(null);
    function runSearch() {
      const el = searchInput.value;
      if (!query.value.trim()) { if (el) el.focus(); return; }
      if (el) el.blur();
      if (hitsList.value) hitsList.value.scrollTop = 0;
    }
    // Jumping is only meaningful in alphabetical order, so a jump switches the
    // list into it rather than scrolling to an arbitrary spot.
    function jumpToLetter(letter, behavior = 'smooth') {
      if (!hitLetters.value.has(letter)) return;
      if (sort.value !== 'alpha') sort.value = 'alpha';
      nextTick(() => {
        const box = hitsList.value;
        if (!box) return;
        const el = box.querySelector('[data-letter="' + letter + '"]');
        if (el) box.scrollTo({ top: el.offsetTop, behavior });
      });
    }
    function setNameMode(mode) {
      nameMode.value = mode;
      sort.value = 'alpha';                // ordering has to follow the key
      if (hitsList.value) hitsList.value.scrollTop = 0;
    }

    // Refine lives in an overlay sheet behind the tune icon on the search line.
    // Account / settings sheet behind the three-bar button in the title row.
    const menuOpen = ref(false);
    // ---- Session ----
    // Being logged in survives closing the tab, the way a mail tab does: the
    // browser holds it until you log out, and only logging out ends it. The
    // stored shape is { user } — an absent key means a browser that has never
    // been here, while { user: null } means one that has, and left.
    const STORAGE_SESSION = 'fb-session-v1';
    const SEED_USER = { name: 'Benjamin Westbrook', email: 'jamin.westbrook@gmail.com' };
    // A browser arriving for the first time arrives as the person who built
    // this, already inside. Logging out writes { user: null } over the seed,
    // so it never comes back uninvited.
    let seededThisLoad = false;
    function loadSession() {
      try {
        const raw = localStorage.getItem(STORAGE_SESSION);
        if (raw == null) {
          seededThisLoad = true;
          localStorage.setItem(STORAGE_SESSION, JSON.stringify({ user: SEED_USER }));
          return { ...SEED_USER };
        }
        const saved = JSON.parse(raw);
        return saved && saved.user ? saved.user : null;
      } catch { return null; }
    }
    const sessionUser = ref(loadSession());
    const isLoggedIn = computed(() => !!sessionUser.value);
    function persistSession() {
      try {
        localStorage.setItem(STORAGE_SESSION, JSON.stringify({ user: sessionUser.value }));
      } catch {}
    }
    // What the app is, for anyone who lands on a globe with no explanation.
    // Two faces: the writing, and the profile form behind its button. A visit
    // always starts on the writing, whichever face it was left on.
    // It leads the load for anyone logged out — a stranger gets the writing
    // and the door, not a bare globe — and stays out of the way for anyone
    // the browser already knows.
    const aboutOpen = ref(!sessionUser.value);
    // The info sheet is information and nothing else now — no step behind it,
    // no profile to fill in on the way through.
    function closeAbout() { aboutOpen.value = false; }
    function openAbout() { aboutOpen.value = true; }
    // The door. No server behind it yet, so logging in is a name this browser
    // agrees to hold — see the sheet, which says as much.
    const loginOpen = ref(false);
    const loginEmail = ref('');
    const loginName = ref('');
    const loginError = ref('');
    function openLogin() {
      const u = sessionUser.value;
      loginEmail.value = u ? u.email : '';
      loginName.value = u ? u.name : '';
      loginError.value = '';
      loginOpen.value = true;
    }
    function submitLogin() {
      const email = loginEmail.value.trim();
      // Not validation for a server's sake — nothing is sent anywhere. It's
      // only enough to be sure the address is the one you meant to be known by.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        loginError.value = 'That address is missing something.';
        return;
      }
      sessionUser.value = { email, name: loginName.value.trim() || email.split('@')[0] };
      persistSession();
      loginError.value = '';
      loginOpen.value = false;
      aboutOpen.value = false;
      // A name at the door is a name for the profile, unless one's already there.
      const first = profile.value.searchers[0];
      if (first && !first.name && sessionUser.value.name) first.name = sessionUser.value.name;
    }
    // Logging out ends the session and nothing else: the shortlist, the saved
    // searches and the profile stay put, waiting for the way back in. Clearing
    // them is its own deliberate button in settings.
    function logOut() {
      sessionUser.value = null;
      persistSession();
      confirmSignOut.value = false;
      menuOpen.value = false;
      loginOpen.value = false;
      aboutOpen.value = true;
    }
    // The account sheet's preferences explain themselves behind an (i) rather
    // than in a paragraph under the form.
    const prefsInfoOpen = ref(false);

    // Which face of the account sheet is showing.
    const menuView = ref('root');            // root | favorites | searches | settings
    // `andConfirmSignOut` is the log-out button's path: same sheet, already
    // asking whether you meant it.
    function openMenu(view, andConfirmSignOut = false) {
      menuView.value = view;
      confirmSignOut.value = andConfirmSignOut;
      menuOpen.value = true;
    }
    watch(menuOpen, (open) => { if (!open) menuView.value = 'root'; });

    // ---- Profile ----
    // Who's doing the naming, and who they're naming. Asked once on the way
    // in, editable forever after in account settings, and kept in this
    // browser like the favorites and the searches are.
    // A profile is a list, not a couple: one searcher to start, and as many
    // more as the family has. Nobody is asked to be somebody's partner to use
    // the app, and nobody is capped at two.
    const STORAGE_PROFILE = 'fb-profile-v2';
    const blankSearcher = () => ({ name: '', dob: '', gender: '' });
    const blankProfile = () => ({
      searchers: [blankSearcher()],
      looking: '',                           // girl | boy | unknown | nonbinary
      likes: [],                             // field names, the callings you'd like
    });
    function loadProfile() {
      const base = blankProfile();
      // First load in this browser: the seeded session comes with a profile
      // already started in its name, so nobody lands on an empty form.
      if (seededThisLoad) base.searchers[0].name = SEED_USER.name;
      try {
        const raw = localStorage.getItem(STORAGE_PROFILE);
        if (!raw) return base;
        const saved = JSON.parse(raw) || {};
        // Field-by-field, so a stored shape from an older build can never
        // leave a searcher object missing and blow up the form's v-model.
        const list = Array.isArray(saved.searchers) ? saved.searchers : [];
        const clean = list.slice(0, SEARCHER_LIMIT).map((s) => {
          const one = blankSearcher();
          if (s && typeof s === 'object') {
            for (const k of ['name', 'dob', 'gender']) {
              if (typeof s[k] === 'string') one[k] = s[k];
            }
          }
          return one;
        });
        // The form always has a first row to type in, even from an empty save.
        if (clean.length) base.searchers = clean;
        base.looking = typeof saved.looking === 'string' ? saved.looking : '';
        // Only fields the roster still has — a calling renamed since the save
        // shouldn't come back as a filter nothing can match.
        base.likes = Array.isArray(saved.likes)
          ? saved.likes.filter(f => FIELDS.includes(f))
          : [];
        return base;
      } catch { return base; }
    }
    const profile = ref(loadProfile());
    function persistProfile() {
      try { localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile.value)); } catch {}
    }
    // Typing is saved as it happens, so stepping back to the writing — or
    // closing the sheet on a half-filled form — never loses an answer.
    watch(profile, persistProfile, { deep: true });
    const hasProfile = computed(() => {
      const p = profile.value;
      return !!(p.looking || p.likes.length ||
                p.searchers.some(s => s.name || s.dob || s.gender));
    });
    const LOOKING_LABELS = {
      girl: 'a girl', boy: 'a boy',
      unknown: 'a baby, name first', nonbinary: 'a non-binary baby',
    };
    // Two names fit on the account row; a bigger family gets the first one and
    // a count, rather than a list that runs off the edge.
    const profileSummary = computed(() => {
      const p = profile.value;
      const names = p.searchers.map(s => s.name).filter(Boolean);
      if (!names.length) return LOOKING_LABELS[p.looking] || '';
      if (names.length <= 2) return names.join(' & ');
      return names[0] + ' +' + (names.length - 1);
    });
    function clearProfile() {
      profile.value = blankProfile();
      persistProfile();
    }
    // Finishing the questions is also the first search: who you're naming
    // decides which half of the roster the app opens on. "Don't know yet"
    // asks for everyone, which is what it should mean.
    function startFromProfile() {
      persistProfile();
      const asFilter = { girl: 'female', boy: 'male', nonbinary: 'nonbinary' }[profile.value.looking];
      if (asFilter) selectedGenders.value = [asFilter];
      else if (profile.value.looking === 'unknown') selectedGenders.value = [];
      // The callings you said you liked are the callings you open on.
      if (profile.value.likes.length) selectedFields.value = [...profile.value.likes];
      aboutOpen.value = false;
    }

    // ---- Saved searches ----
    // A search is the whole filter state, stored under the label the dock
    // chips already spell out. Restoring one puts every control back.
    const STORAGE_SEARCHES = 'fb-searches-v1';
    function loadSearches() {
      try {
        const raw = localStorage.getItem(STORAGE_SEARCHES);
        return raw ? JSON.parse(raw) : [];
      } catch { return []; }
    }
    const savedSearches = ref(loadSearches());
    function persistSearches() {
      try { localStorage.setItem(STORAGE_SEARCHES, JSON.stringify(savedSearches.value)); } catch {}
    }
    function snapshotFilters() {
      return {
        query: query.value,
        fields: [...selectedFields.value],
        subfields: [...selectedSubfields.value],
        genders: [...selectedGenders.value],
        yearMin: yearMin.value,
        yearMax: yearMax.value,
        countries: [...selectedCountries.value],
        months: [...selectedBornMonths.value],
        days: [...selectedBornDays.value],
        zodiacs: [...selectedZodiacs.value],
        onlyFavorites: onlyFavorites.value,
        bornToday: bornTodayActive.value,
      };
    }
    const searchLabel = computed(() =>
      activeFilters.value.map(f => f.label).join(' · ') || 'Everything'
    );
    function saveCurrentSearch() {
      if (!hasActiveFilters.value) return;
      const label = searchLabel.value;
      const entry = { id: 's' + Date.now(), label, count: filtered.value.length, state: snapshotFilters() };
      savedSearches.value = [entry, ...savedSearches.value.filter(x => x.label !== label)].slice(0, 24);
      persistSearches();
    }
    function applySavedSearch(entry) {
      const st = (entry && entry.state) || {};
      query.value = st.query || '';
      selectedFields.value = [...(st.fields || [])];
      selectedSubfields.value = [...(st.subfields || [])];
      selectedGenders.value = [...(st.genders || [])];
      yearMin.value = typeof st.yearMin === 'number' ? st.yearMin : YEAR_FLOOR;
      yearMax.value = typeof st.yearMax === 'number' ? st.yearMax : YEAR_CEIL;
      // Older saved searches carry a single country; newer ones a list.
      selectedCountries.value = Array.isArray(st.countries) ? st.countries : (st.country ? [st.country] : []);
      selectedBornMonths.value = [...(st.months || [])];
      selectedBornDays.value = [...(st.days || [])];
      selectedZodiacs.value = [...(st.zodiacs || [])];
      onlyFavorites.value = !!st.onlyFavorites;
      bornTodayActive.value = !!st.bornToday;
      if (st.country) flyToCountry(st.country);
      menuOpen.value = false;
    }
    function deleteSavedSearch(id) {
      savedSearches.value = savedSearches.value.filter(x => x.id !== id);
      persistSearches();
    }
    const isSearchSaved = computed(() =>
      savedSearches.value.some(x => x.label === searchLabel.value)
    );

    // ---- Settings / sign-off ----
    // There is no account to sign out of yet, so signing off means clearing
    // what this device is holding: the shortlist, the saved searches, the
    // remembered name order, and whatever is currently filtered.
    function clearSavedData() {
      favorites.value = new Set();
      savedSearches.value = [];
      // Write an empty list rather than removing the key, or the next load
      // reads "never visited" and seeds three names again.
      try { localStorage.setItem(STORAGE_FAVS, '[]'); } catch {}
      persistSearches();
    }
    const confirmSignOut = ref(false);
    // Wiping the browser clean: everything this device holds, session included.
    // Distinct from logging out, which only closes the session behind you.
    function forgetThisDevice() {
      clearSavedData();
      clearProfile();
      clearAll();
      nameMode.value = 'first';
      logOut();
    }

    // ---- Quick-category strip (top of the map) ----
    // All fields live in one horizontally scrolling track — five fit at a
    // time. Touch/trackpad swipes it natively; the arrows page it; a mouse
    // can drag it since there's no swipe gesture on a desktop pointer.
    // Strip order follows depth of coverage — the fields with the most names
    // lead, so the first screen is the richest.
    const fieldCounts = (() => {
      const m = new Map(FIELDS.map(f => [f, 0]));
      for (const p of PEOPLE) if (m.has(p.field)) m.set(p.field, m.get(p.field) + 1);
      return m;
    })();
    const countForField = (f) => fieldCounts.get(f) || 0;
    const orderedFields = [...FIELDS].sort(
      (a, b) => countForField(b) - countForField(a) || a.localeCompare(b)
    );
    // The profile form takes its callings ready-made — name and glyph — so it
    // doesn't need the app's icon table handed to it as well.
    const likeOptions = orderedFields.map(f => ({ name: f, icon: iconForField(f) }));

    const catTrack = ref(null);
    const canCatPrev = ref(false);
    const canCatNext = ref(true);
    function syncCatArrows() {
      const el = catTrack.value;
      if (!el) return;
      canCatPrev.value = el.scrollLeft > 4;
      canCatNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    }
    function catPage(dir) {
      const el = catTrack.value;
      if (!el) return;
      el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
    }

    // Same arrows for the sub-category strip below it. Kept separate rather
    // than generalised — two tracks isn't enough repetition to be worth the
    // indirection, and they may drift apart.
    // Each sub-row scrolls on its own, so the arrow state is per field rather
    // than one pair of refs. The elements sit in a plain Map — they aren't
    // reactive data; only the can-scroll flags need to reach the template.
    const subTrackEls = new Map();
    const subArrowState = ref({});
    function setSubTrack(field, el) {
      if (el) subTrackEls.set(field, el);
      else subTrackEls.delete(field);
    }
    function syncSubRow(field) {
      const el = subTrackEls.get(field);
      const next = { ...subArrowState.value };
      if (!el) delete next[field];
      else next[field] = [
        el.scrollLeft > 4,
        el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      ];
      subArrowState.value = next;
    }
    function syncSubArrows() { for (const field of subTrackEls.keys()) syncSubRow(field); }
    const canSubPrev = (field) => !!(subArrowState.value[field] || [])[0];
    const canSubNext = (field) => !!(subArrowState.value[field] || [])[1];
    function subPage(field, dir) {
      const el = subTrackEls.get(field);
      if (!el) return;
      el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
    }
    // (The re-measure watcher lives with subRows, below — watch()
    //  reads its source immediately, so it can't run before that const exists.)

    // Mouse drag-to-scroll. Touch is left to the browser so momentum and
    // scroll-snap behave natively.
    let catDragging = false, catDownX = 0, catDownScroll = 0, catMoved = false;
    let suppressCatClick = false;
    function catPointerDown(e) {
      if (e.pointerType === 'touch' || !catTrack.value) return;
      catDragging = true;
      catMoved = false;
      catDownX = e.clientX;
      catDownScroll = catTrack.value.scrollLeft;
    }
    function catPointerMove(e) {
      if (!catDragging || !catTrack.value) return;
      const dx = e.clientX - catDownX;
      if (Math.abs(dx) > 4) catMoved = true;
      catTrack.value.scrollLeft = catDownScroll - dx;
    }
    function catPointerUp() {
      if (!catDragging) return;
      catDragging = false;
      // A drag shouldn't also select whatever chip was under the cursor.
      suppressCatClick = catMoved;
      setTimeout(() => { suppressCatClick = false; }, 0);
    }
    // Tapping a category filters by that field; the hits appear above the
    // search line on their own.
    function quickPick(f) {
      if (suppressCatClick) return;
      toggleField(f);
      hitsExpanded.value = false;
    }

    // The globe is always mounted now, so it can initialize on load. The
    // globe.gl UMD bundle may still be in flight — poll briefly for it.
    function ensureGlobe() {
      if (globeInstance) return;
      if (window.Globe) { initGlobe(); return; }
      const start = Date.now();
      const tick = () => {
        if (window.Globe) initGlobe();
        else if (Date.now() - start < 8000) setTimeout(tick, 100);
      };
      tick();
    }
    onMounted(() => nextTick(() => {
      // Open on the visitor's own part of the world rather than a blank screen.
      // This runs before the globe exists, which is deliberate: it parks
      // HOME_VIEW there, so initGlobe's opening move lands on it unaided.
      openingGlobeView();
      ensureGlobe();
      // Skipped while the opening view is pinned: the device's own location
      // would otherwise pull the camera off London a moment after it arrives.
      if (!OPENING_OVERRIDE) refineHomeFromDevice();
      syncCatArrows();
      syncSubArrows();
    }));
    function syncStripArrows() { syncCatArrows(); syncSubArrows(); }

    // ---- Drawers ----
    // The spines down the left edge are the whole filter menu: the timeline,
    // gender, and then every calling in its own right. A calling's spine
    // doesn't open a list of callings — it opens what's inside that one, its
    // genres and leagues and roles. Time and gender stack with a calling; two
    // callings don't, since the second one's genres would have nothing to do
    // with the first one's.
    const FIELD_TAB = 'f:';
    // A little search inside a panel, once it holds more chips than the eye can
    // scan. Kept per panel: typing in Music shouldn't narrow the eras.
    const drawerQuery = ref({});
    const queryFor = (id) => drawerQuery.value[id] || '';
    function setDrawerQuery(id, v) {
      drawerQuery.value = { ...drawerQuery.value, [id]: v };
    }
    const SEARCH_FROM = 7;                 // fewer than this and a box is noise
    const narrow = (id, list, key) => {
      const q = queryFor(id).trim().toLowerCase();
      if (!q) return list;
      return list.filter(x => String(key ? x[key] : x).toLowerCase().includes(q));
    };

    // No Country tab: places are chosen on the globe, by raising the country
    // itself. A list of buttons alongside it would be a second, quieter way to
    // do the same thing, and the map is the better one.
    const railTabs = computed(() => [
      { id: 'time',   label: 'Era', icon: 'i-cal' },
      { id: 'gender', label: 'Gender',   icon: 'i-avatar' },
      ...orderedFields.map(f => ({
        id: FIELD_TAB + f, label: f, icon: iconForField(f), field: f,
      })),
    ]);
    const openDrawers = ref([]);
    const isDrawerOpen = (id) => openDrawers.value.includes(id);
    // Every calling that's open, in the order it was opened — each one shows
    // its own genres, and several can be open at once.
    const openFields = computed(() =>
      openDrawers.value.filter(x => x.startsWith(FIELD_TAB)).map(x => x.slice(FIELD_TAB.length))
    );
    const subfieldsFor = (field) => (SUBFIELDS_BY_FIELD[field] || [])
      .slice()
      .sort((a, b) => subCount(field, b) - subCount(field, a) || a.localeCompare(b));
    function toggleDrawer(id) {
      const wasOpen = isDrawerOpen(id);
      openDrawers.value = wasOpen
        ? openDrawers.value.filter(x => x !== id)
        : [...openDrawers.value, id];
      // A calling's spine both filters to it and opens its genres, and several
      // callings can be open together. Closing one takes its own genres with
      // it and leaves the other callings' picks alone.
      if (id.startsWith(FIELD_TAB)) {
        const field = id.slice(FIELD_TAB.length);
        selectedFields.value = wasOpen
          ? selectedFields.value.filter(f => f !== field)
          : [...selectedFields.value, field];
        if (wasOpen) {
          const mine = new Set(SUBFIELDS_BY_FIELD[field] || []);
          selectedSubfields.value = selectedSubfields.value.filter(sf => !mine.has(sf));
        }
        hitsExpanded.value = false;
      }
    }
    // Random is the one spine that never scrolls away: it's pinned above the
    // column, and what it opens covers the whole screen rather than lying
    // along the bottom — not choosing deserves the same room as choosing.
    const randomOpen = ref(false);

    // ---- The rail's own scroll ----
    // A dozen spines don't fit any screen, so the column scrolls — and says so
    // with a step arrow at each end rather than a scrollbar down the edge of
    // the globe. Each press moves most of a screenful, the way the letter dial
    // steps.
    const railTrack = ref(null);
    const canRailUp = ref(false);
    const canRailDown = ref(false);
    function syncRailArrows() {
      const el = railTrack.value;
      if (!el) { canRailUp.value = false; canRailDown.value = false; return; }
      canRailUp.value = el.scrollTop > 2;
      canRailDown.value = el.scrollTop + el.clientHeight < el.scrollHeight - 2;
    }
    function railStep(dir) {
      const el = railTrack.value;
      if (!el) return;
      el.scrollBy({ top: dir * Math.max(120, el.clientHeight * 0.62), behavior: 'smooth' });
    }
    // The rail unmounts whenever a card is open, so the arrows are re-measured
    // off the element itself coming and going rather than off what opened it.
    watch(railTrack, () => nextTick(syncRailArrows));
    window.addEventListener('resize', syncRailArrows);
    onUnmounted(() => window.removeEventListener('resize', syncRailArrows));

    const closeDrawer = (id) => {
      openDrawers.value = openDrawers.value.filter(x => x !== id);
      if (id.startsWith(FIELD_TAB)) {
        selectedFields.value = [];
        selectedSubfields.value = [];
      }
    };
    window.addEventListener('resize', syncStripArrows);
    onUnmounted(() => window.removeEventListener('resize', syncStripArrows));

    // Just the category strip's selections — genders and everything else stay.
    function clearCategories() {
      selectedFields.value = [];
      selectedSubfields.value = [];
    }
    function clearType() {
      selectedFields.value = [];
      selectedSubfields.value = [];
      selectedGenders.value = [];
    }
    function clearTime() {
      yearMin.value = YEAR_FLOOR;
      yearMax.value = YEAR_CEIL;
      clearBornFilters();
    }
    const typeFilterCount = computed(() =>
      selectedFields.value.length + selectedSubfields.value.length + selectedGenders.value.length
    );
    const timeFilterCount = computed(() =>
      (yearMin.value !== YEAR_FLOOR || yearMax.value !== YEAR_CEIL ? 1 : 0)
      + selectedEras.value.length
      + selectedBornMonths.value.length
      + selectedBornDays.value.length
      + selectedZodiacs.value.length
      + (bornTodayActive.value ? 1 : 0)
    );
    onUnmounted(disposeGlobe);

    // Repaint the outlines whenever selection changes.
    watch(selectedCountries, () => { repaintPolygons(); syncCollageSelection(); }, { deep: true });
    // Every polygon height is a fraction of popAlt, and so is where the
    // slideshow stands — so a re-framing has to redraw both, including the
    // paths that move the camera without changing the selection (opening a
    // person's card, say).
    watch(popAlt, () => {
      repaintPolygons();
      // The collage is clipped to the outline projected at plinth height, so a
      // new height means the shape has to be re-cut on the next frame.
      lastCamKey = '';
    });

    // ---- Surprise Me — random person matching current filters ----
    function surpriseMe() {
      const pool = filtered.value;
      if (!pool || pool.length === 0) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      openPerson(pick.person);
    }

    // ---- The random drawer ----
    // Every roll narrows one thing and leaves the rest alone, so they stack:
    // a century, then a calling, then a corner of the map. Each replaces its
    // own last roll rather than piling filters on top of each other.
    const draw = (list) => list[Math.floor(Math.random() * list.length)];
    // A window rather than a point — a single year would usually match nobody.
    // Rolled off the years the roster actually has, so the timeline never
    // lands on an empty stretch of the Middle Ages.
    // Rolls a named era, not a raw window of years: the timeline is picked from
    // eras now, so a bare year range would filter the list while lighting
    // nothing — a roll you can't see is a roll that looks broken.
    // A roll is the whole visit: it lands, the panel gets out of the way, and
    // what it did is on screen behind it. Nothing to report inside a sheet
    // that's already closing.
    // Everything runs the four in turn, so the individual rolls hold their fire
    // and it closes once at the end.
    let rolling = false;
    function afterRoll() {
      if (rolling) return;
      if (hitsSize.value === 'bar') hitsSize.value = 'three';
      randomOpen.value = false;
      // And open someone from what the roll left standing. Deferred, because
      // the filter has to settle first — and because the filter watcher closes
      // any open card, so this has to land after it, not before.
      nextTick(surpriseMe);
    }
    function randomEra() {
      const pool = ERAS.filter(e => countForEra(e) && !isEraOn(e));
      if (!pool.length) return;
      const e = draw(pool);
      selectedEras.value = [e.name];
      if (!isDrawerOpen('time')) toggleDrawer('time');
      afterRoll();
    }
    function randomPlace() {
      const pick = drawRandomCountry();
      if (!pick) return;
      aimHomeAt(pick.country);
      selectedCountries.value = [pick.country];
      flyToCountry(pick.country);
      afterRoll();
    }
    function randomGender() {
      const pool = GENDERS.filter(g => g !== selectedGenders.value[0]);
      const g = pool.length ? draw(pool) : '';
      selectedGenders.value = g ? [g] : [];
      // Open the drawer it lands in, or the pick happens somewhere you can't see.
      if (!isDrawerOpen('gender')) toggleDrawer('gender');
      afterRoll();
    }
    function randomCategory() {
      const pool = orderedFields.filter(f => !selectedFields.value.includes(f));
      if (!pool.length) return;
      const field = draw(pool);
      // Through the spine's own toggle, so the calling lights, its panel opens
      // and the state stays the single thing both of them read.
      openDrawers.value = openDrawers.value.filter(x => !x.startsWith(FIELD_TAB));
      selectedFields.value = [];
      selectedSubfields.value = [];          // the old genre belongs to the old calling
      toggleDrawer(FIELD_TAB + field);
      afterRoll();
    }
    // The whole handful at once, and then whoever it leaves standing.
    // Four rolls stacked almost never leave anybody — a Victorian activist from
    // Burkina Faso is nobody at all. So each one is tried and kept only if
    // somebody is still standing after it; otherwise it's put back and the next
    // is tried. What you end up with is as narrow as the roster allows and
    // never empty.
    function tryRoll(roll) {
      const before = {
        fields:    [...selectedFields.value],
        subs:      [...selectedSubfields.value],
        eras:      [...selectedEras.value],
        genders:   [...selectedGenders.value],
        countries: [...selectedCountries.value],
        drawers:   [...openDrawers.value],
      };
      roll();
      if (filtered.value.length) return;
      selectedFields.value    = before.fields;
      selectedSubfields.value = before.subs;
      selectedEras.value      = before.eras;
      selectedGenders.value   = before.genders;
      selectedCountries.value = before.countries;
      openDrawers.value       = before.drawers;
    }
    function randomEverything() {
      rolling = true;
      tryRoll(randomCategory);
      tryRoll(randomEra);
      tryRoll(randomGender);
      tryRoll(randomPlace);
      rolling = false;
      afterRoll();
    }

    // ---- Person info modal ----
    const selectedPerson = ref(null);
    // Each card opens at the country-fits-the-tile zoom.
    function openPerson(p) {
      selectedPerson.value = p;
      // The camera drops in on their birth country and the spin stops, so the
      // globe holds still while the card is up.
      // Their country, framed the same way a picked one is — but not picked:
      // the full-screen zoom and the slideshow belong to clicking a country,
      // and opening a card is a different errand.
      if (p && p.country) flyToCountry(p.country, 1);
      // Reset the per-person Q&A state whenever a different person opens.
      askInput.value = '';
      askAnswer.value = '';
      askError.value = '';
      askLoading.value = false;
    }
    // A credit that names someone in the roster opens their card; anyone else
    // becomes a search, so the tag always leads somewhere.
    const hasPerson = (n) => !!personByName(n);
    function openOrSearch(n) {
      const p = personByName(n);
      if (p) { openPerson(p); return; }
      query.value = n;
    }
    // Teams, awards and the like search on their own text.
    function searchFor(term) { query.value = term; }
    // A birth date filters to everyone who shares it — the month and day, not
    // the year, since a shared birthday is the interesting coincidence.
    function filterBirthday(person) {
      if (!person || !person.birthMonth) return;
      selectedBornMonths.value = [person.birthMonth];
      selectedBornDays.value = person.birthDay ? [person.birthDay] : [];
    }
    // The sign filters in place rather than leaving for Wikipedia.
    function filterZodiac(sign) {
      if (sign) selectedZodiacs.value = [sign];
    }
    // The gender pill on the card: says what they were born as, and filters to
    // everyone else who shares it. Set rather than toggled, like the others —
    // the pill states a fact, so pressing it can only mean "show me these".
    const GENDER_LABELS = { male: 'Male', female: 'Female', nonbinary: 'Non-binary' };
    const genderLabel = (g) => GENDER_LABELS[g] || g;
    function filterGender(person) {
      if (!person || !person.gender) return;
      selectedGenders.value = [person.gender];
    }

    // Same move for the category pill on the card. The pill names the major
    // field, so the tap filters to exactly that and no narrower — a button
    // that quietly does more than it says is a button you stop trusting.
    // Set rather than toggled: the pill states what they are, so pressing it
    // can only mean "show me these", never "clear it".
    function filterField(person) {
      if (!person || !person.field) return;
      selectedFields.value = [person.field];
      selectedSubfields.value = [];
    }

    // Closing undoes the whole arrival: pull back out to the full globe, start
    // it spinning again, and let the timeline off the birth year.
    function closePerson() {
      selectedPerson.value = null;
      clearYears();
      resetGlobeView();
    }

    // Touching any filter — typing, a category, the timeline, a country, the
    // heart — puts the three-name list back in front of the user. If a card
    // was open it steps aside so the new result set is visible.
    watch(
      [query, selectedFields, selectedSubfields, selectedGenders,
       yearMin, yearMax, selectedCountries, selectedBornMonths, selectedBornDays,
       selectedZodiacs, onlyFavorites, bornTodayActive],
      () => {
        if (selectedPerson.value) selectedPerson.value = null;
        hitsExpanded.value = false;
        nextTick(resetDial);
      }
    );

    // ---- "Ask a question" affordance ----
    // Lightweight UI scaffold. Submit posts to whatever endpoint is configured
    // at window.FAMOUS_BABY_QA_ENDPOINT (e.g. an internal Lambda that forwards
    // to Anthropic / OpenAI). If no endpoint is set, we keep the UI alive but
    // explain that an LLM hookup is required so the prototype can demo locally.
    const askInput = ref('');
    const askAnswer = ref('');
    const askError = ref('');
    const askLoading = ref(false);


    async function submitAsk() {
      const q = askInput.value.trim();
      if (!q || askLoading.value || !selectedPerson.value) return;
      askError.value = '';
      askAnswer.value = '';
      askLoading.value = true;

      const endpoint = window.FAMOUS_BABY_QA_ENDPOINT;
      if (!endpoint) {
        // No backend wired up yet — explain politely and stay non-broken.
        askLoading.value = false;
        askError.value = 'No question endpoint is configured. Set window.FAMOUS_BABY_QA_ENDPOINT to a URL that accepts {person, question} and returns {answer}.';
        return;
      }

      try {
        const p = selectedPerson.value;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            person: {
              id: p.id,
              name: p.name,
              field: p.field,
              subfield: p.subfield,
              birthYear: p.birthYear,
              birthPlace: p.birthPlace,
              bio: p.bio,
            },
            question: q,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || ('HTTP ' + res.status));
        }
        askAnswer.value = data.answer || '(no answer returned)';
      } catch (err) {
        askError.value = err.message || 'Could not reach the question endpoint.';
      } finally {
        askLoading.value = false;
      }
    }

    // ---- Aesthetic / theme ----
    // Theme picker was removed — the site is locked to 'mag'. The ref +
    // data-theme attribute stay so existing [data-theme="mag"] CSS rules
    // continue to match. toggleTheme is a no-op for backwards compat.
    const theme = ref('mag');
    document.documentElement.setAttribute('data-theme', 'mag');
    function toggleTheme() { /* no-op — theme is locked */ }

    // ---- Esc key closes the modal ----
    function onKeydown(e) {
      if (e.key !== 'Escape') return;
      // Innermost first: the login sheet sits on top of the info page.
      if (loginOpen.value) loginOpen.value = false;
      else if (randomOpen.value) randomOpen.value = false;
      else if (aboutOpen.value) aboutOpen.value = false;
      else if (menuOpen.value) menuOpen.value = false;
      else if (selectedPerson.value) closePerson();
      else if (hitsExpanded.value) hitsExpanded.value = false;
    }
    onMounted(() => document.addEventListener('keydown', onKeydown));
    onUnmounted(() => document.removeEventListener('keydown', onKeydown));

    // ---- Pre-compute soundex / given-name index for similar-name lookup ----
    // Every given name someone answers to: the leading token plus any middle
    // names, since a middle name counts the same as a first name here. Suffixes
    // ('Jr.', 'III') live in the same data slot but aren't names, so they're out.
    function givenNamesOf(person) {
      const out = [firstName((person && person.name) || '')];
      for (const tok of String((person && person.middleName) || '').trim().split(/\s+/)) {
        if (!tok || isNameSuffix(tok)) continue;
        const n = firstName(tok);
        if (n && !out.includes(n)) out.push(n);
      }
      return out.filter(Boolean);
    }
    const NAME_INDEX = PEOPLE.map(p => {
      const names = givenNamesOf(p);
      return { person: p, names, sx: names.map(soundex) };
    });
    function similarNamesFor(person) {
      if (!person) return { exact: [], similar: [] };
      const mine = givenNamesOf(person);
      const mineSx = mine.map(soundex);
      const exact = [];
      const similar = [];
      for (const n of NAME_INDEX) {
        if (n.person.id === person.id) continue;
        // First-name-to-first-name is the strongest kind of match, so it sorts
        // ahead of the ones a middle name brought in when the list is capped.
        if (n.names.some(x => mine.includes(x))) {
          exact.push({ person: n.person, rank: n.names[0] === mine[0] ? 0 : 1 });
        }
        // Phonetic near-miss on any pairing of their names and ours, with the
        // same initial so soundex collisions don't drag in unrelated names.
        else if (n.sx.some((s, i) => mineSx.some((t, j) => s === t && n.names[i][0] === mine[j][0]))) similar.push(n.person);
      }
      // Cap each list so the modal doesn't get unwieldy.
      return {
        exact: exact.sort((a, b) => a.rank - b.rank).slice(0, 12).map(e => e.person),
        similar: similar.slice(0, 12),
      };
    }
    const similarForSelected = computed(() => similarNamesFor(selectedPerson.value));

    // ---- Name rows that would run away with the card ----
    // A well-connected person can put two dozen names under one label, and
    // wrapped they push everything below them off the screen. Past two rows the
    // list stops wrapping and becomes a two-row rail you scroll sideways —
    // measured, not counted, because name lengths vary far too much for that.
    const popCard = ref(null);
    const ROW_GAP = 4;
    function capRows(el) {
      if (!el) return;
      el.classList.remove('is-railed');
      const kid = el.firstElementChild;
      if (!kid) return;
      // The natural wrapped height, now that the rail class is off.
      const twoRows = kid.offsetHeight * 2 + ROW_GAP;
      if (el.scrollHeight > twoRows + 1) el.classList.add('is-railed');
      markRailEnd(el);
    }
    // Fades the trailing edge while there's more to scroll to, so a rail doesn't
    // look like a list that simply stops.
    function markRailEnd(el) {
      const more = el.scrollWidth - el.clientWidth - el.scrollLeft > 2;
      el.classList.toggle('has-more', more);
    }
    function capNameRows() {
      const root = popCard.value;
      if (!root) return;
      for (const dd of root.querySelectorAll('.kdl dd')) {
        capRows(dd);
        if (!dd.dataset.railBound) {
          dd.dataset.railBound = '1';
          dd.addEventListener('scroll', () => markRailEnd(dd), { passive: true });
        }
      }
    }
    // Every card is a different set of lists, so re-measure on each one.
    watch(selectedPerson, () => nextTick(capNameRows));

    // ---- Career neighbours ----
    // Who else lived this working life? Names play no part here — the score is
    // built from the shape of the career: the room they worked in, the people
    // they worked with, the silverware, and when. Each clause also names
    // itself, so the strip can say why this person turned up.
    const nameSet = (list) => new Set((list || []).map(x => String(x).toLowerCase()));
    function careerMatch(me, them) {
      let score = 0;
      let why = '';
      const claim = (points, reason) => { score += points; if (!why) why = reason; };

      // Worked together — the strongest signal there is, and it reads both ways.
      const myCollabs = nameSet(me.collaborators);
      const theirCollabs = nameSet(them.collaborators);
      if (myCollabs.has(them.name.toLowerCase()) || theirCollabs.has(me.name.toLowerCase())) {
        claim(9, 'worked together');
      } else {
        const shared = [...myCollabs].filter(c => theirCollabs.has(c));
        if (shared.length) claim(5, 'both worked with ' + shared[0].replace(/\b\w/g, c => c.toUpperCase()));
      }

      // Same room: a shared team beats a shared league beats a shared field.
      const myTeams = nameSet((me.teams || []).map(t => t.name));
      const sharedTeam = (them.teams || []).map(t => t.name).find(n => myTeams.has(n.toLowerCase()));
      if (sharedTeam) claim(7, sharedTeam);
      if (me.subfield && me.subfield === them.subfield) claim(5, them.subfield);
      else if (me.field && me.field === them.field) claim(3, them.field);

      // Same trophy on the shelf.
      const myAwards = nameSet((me.awards || []).map(a => a.name));
      const sharedAward = (them.awards || []).map(a => a.name).find(n => myAwards.has(n.toLowerCase()));
      if (sharedAward) claim(4, sharedAward);

      // Contemporaries: a career only overlaps another if the years do.
      const gap = Math.abs((me.birthYear || 0) - (them.birthYear || 0));
      if (gap <= 5) claim(3, 'same generation');
      else if (gap <= 15) claim(2, 'overlapping years');
      else if (gap <= 30) claim(1, 'adjacent eras');

      if (me.country && me.country === them.country) claim(1, them.country);
      return { score, why };
    }
    // Ranked, and capped — past a couple of dozen the tail stops being "like them".
    const MATCH_MAX = 24;
    const careerMatches = computed(() => {
      const me = selectedPerson.value;
      if (!me) return [];
      const out = [];
      for (const p of PEOPLE) {
        if (p.id === me.id) continue;
        const { score, why } = careerMatch(me, p);
        // A shared era alone isn't a career in common.
        if (score < 3) continue;
        out.push({ person: p, score, why });
      }
      // Ties break on era, never on name — alphabetical order here would let
      // the one thing this list ignores back in through the side door.
      const era = (r) => Math.abs((me.birthYear || 0) - (r.person.birthYear || 0));
      out.sort((a, b) => b.score - a.score || era(a) - era(b));
      return out.slice(0, MATCH_MAX);
    });
    // Where the strip is parked. A new card is a new list, so it starts over.
    const matchIndex = ref(0);
    watch(selectedPerson, () => { matchIndex.value = 0; });
    // Clamped: the watcher above resets the index before the card re-renders,
    // but the list has already changed by then — never index off the end of it.
    const currentMatch = computed(() => {
      const list = careerMatches.value;
      if (!list.length) return null;
      return list[Math.min(matchIndex.value, list.length - 1)] || null;
    });
    // Wraps rather than clamping: a short list shouldn't dead-end at both edges.
    function matchStep(dir) {
      const n = careerMatches.value.length;
      if (!n) return;
      matchIndex.value = (matchIndex.value + dir + n) % n;
    }
    // The dice only reaches into the close half of the list — a random pick from
    // the tail wouldn't be someone much like them. Unlike the arrows, which
    // scrub the strip, this one opens the card: it's a jump, not a step.
    function randomMatch() {
      const n = careerMatches.value.length;
      if (!n) return;
      const pool = Math.max(1, Math.min(n, Math.ceil(n / 2)));
      let i = Math.floor(Math.random() * pool);
      if (n > 1 && i === matchIndex.value) i = (i + 1) % pool;
      // Read the person out before opening — that reassignment rebuilds the list.
      const pick = careerMatches.value[i];
      matchIndex.value = i;
      if (pick) openPerson(pick.person);
    }
    function openMatch() {
      if (currentMatch.value) openPerson(currentMatch.value.person);
    }

    // Selection-membership helpers (used in templates).
    const isFieldSelected    = (f)  => selectedFields.value.includes(f);
    const isSubfieldSelected = (sf) => selectedSubfields.value.includes(sf);
    const isGenderSelected   = (g)  => selectedGenders.value.includes(g);
    // Which subfield chips to show: union of subfields belonging to the
    // selected fields. If no fields are selected, no subfield row appears.
    const availableSubfields = computed(() => {
      if (selectedFields.value.length === 0) return [];
      const seen = new Set();
      for (const f of selectedFields.value) {
        for (const sf of (SUBFIELDS_BY_FIELD[f] || [])) seen.add(sf);
      }
      return [...seen].sort();
    });

    // One row per selected category, so picking Film and Sports gives two
    // strips rather than one blended alphabet. Counts still set the order —
    // the thin tail shouldn't lead — they're just not printed on the chips.
    const subRows = computed(() =>
      selectedFields.value
        .map(field => ({
          field,
          subs: [...(SUBFIELDS_BY_FIELD[field] || [])].sort(
            (a, b) => subCount(field, b) - subCount(field, a) || a.localeCompare(b)
          ),
        }))
        .filter(row => row.subs.length)
    );
    const countForSubfield = (field, sf) => subCount(field, sf);
    // Rows come and go with the categories, so re-measure once the new chips
    // have actually been laid out.
    watch(subRows, () => {
      for (const el of subTrackEls.values()) el.scrollLeft = 0;
      nextTick(syncSubArrows);
    });

    // (Subfield reset is handled in toggleField below — switching contexts
    //  should always start with a clean subfield state.)

    function clearAll() {
      query.value = '';
      selectedFields.value = [];
      selectedSubfields.value = [];
      selectedGenders.value = [];
      yearMin.value = YEAR_FLOOR;
      yearMax.value = YEAR_CEIL;
      clearEras();
      clearBornFilters();
      clearCountry();
      // The panels go with the filters they hold. A lit spine over an open
      // drawer of genres, none of which is filtering anything, is the screen
      // telling you something that isn't true.
      openDrawers.value = [];
      drawerQuery.value = {};
    }

    // ---- Toggle helpers ----
    // Reassign the ref to a new array so reactivity tracks the change reliably.
    function toggleArrayItem(refArr, value) {
      const arr = refArr.value;
      refArr.value = arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value];
    }
    // Toggling a parent Field always clears subfield selections so the user
    // gets a clean drilldown for the new context.
    // Every filter now parks the dial on the first letter its results have.
    // Picking a genre used to throw it at a random letter, on the theory that a
    // category is for browsing — but picking a second genre then moved the list
    // somewhere unrelated to the thing just pressed, which reads as the list
    // wandering off on its own.
    function toggleField(f) {
      toggleArrayItem(selectedFields, f);
      selectedSubfields.value = [];
    }
    const toggleSubfield = (sf) => {
      toggleArrayItem(selectedSubfields, sf);
    };
    const toggleGender   = (g)  => toggleArrayItem(selectedGenders, g);

    // ---- Filtering pipeline ----
    function passAllFilters(person) {
      const tokens = tokenize(query.value);
      const queryYears = extractYears(query.value);
      const fields    = selectedFields.value;
      const subfields = selectedSubfields.value;
      const genders   = selectedGenders.value;
      const minY      = yearMin.value;
      const maxY      = yearMax.value;

      // Eras are bands, not a range: a person passes if they were born inside
      // any one of the picked stretches.
      const eras = selectedEras.value;
      if (eras.length > 0) {
        const inAny = eras.some((name) => {
          const e = eraFor(name);
          return e && person.birthYear >= e.from && person.birthYear <= e.to;
        });
        if (!inAny) return null;
      }
      if (fields.length    > 0 && !fields.includes(person.field))       return null;
      if (subfields.length > 0 && !subfields.includes(person.subfield)) return null;
      if (genders.length   > 0 && !genders.includes(person.gender))     return null;
      if (minY !== null && minY !== '' && person.birthYear < +minY) return null;
      if (maxY !== null && maxY !== '' && person.birthYear > +maxY) return null;
      const countries = selectedCountries.value;
      if (countries.length && !countries.includes(person.country)) return null;
      if (queryYears.length === 2) {
        const [a, b] = [Math.min(...queryYears), Math.max(...queryYears)];
        if (person.birthYear < a || person.birthYear > b) return null;
      }
      const { score, matchedParts } = scorePerson(person, tokens);
      if (tokens.length > 0 && score === 0) return null;
      return { person, score, matchedParts };
    }

    const filtered = computed(() => {
      const out = [];
      for (const person of PEOPLE) {
        const r = passAllFilters(person);
        if (!r) continue;
        if (onlyFavorites.value && !favorites.value.has(person.id)) continue;
        if (bornTodayActive.value && !isBornToday(person)) continue;
        if (!passBornFilters(person)) continue;
        out.push(r);
      }

      // Sort
      switch (sort.value) {
        case 'alpha':
          out.sort((a, b) => nameKey(a.person).localeCompare(nameKey(b.person)));
          break;
        case 'oldest':
          out.sort((a, b) => a.person.birthYear - b.person.birthYear);
          break;
        case 'newest':
          out.sort((a, b) => b.person.birthYear - a.person.birthYear);
          break;
        case 'relevance':
        default:
          out.sort((a, b) => b.score - a.score || a.person.name.localeCompare(b.person.name));
      }
      return out;
    });

    // ---- Active filter pills (shown above results) ----
    const activeFilters = computed(() => {
      const out = [];
      if (query.value) {
        out.push({ key: 'q',  group: 'Search', label: `"${query.value}"`, clear: () => { query.value = ''; } });
      }
      for (const f of selectedFields.value) {
        out.push({ key: 'f:' + f, group: 'Field', label: f, clear: () => toggleField(f) });
      }
      for (const sf of selectedSubfields.value) {
        out.push({ key: 'sf:' + sf, group: 'Within', label: sf, clear: () => toggleSubfield(sf) });
      }
      for (const g of selectedGenders.value) {
        const label = g === 'male' ? 'Men' : g === 'female' ? 'Women' : g === 'nonbinary' ? 'Non-binary' : g;
        out.push({ key: 'g:' + g, group: 'Gender', label, clear: () => toggleGender(g) });
      }
      if (yearMin.value !== YEAR_FLOOR || yearMax.value !== YEAR_CEIL) {
        out.push({
          key: 'yr',
          group: 'Years',
          label: `${yearMin.value}–${yearMax.value}`,
          clear: () => { yearMin.value = YEAR_FLOOR; yearMax.value = YEAR_CEIL; },
        });
      }
      // One chip per era rather than one for the lot: each is picked on its
      // own, so each has to be droppable on its own.
      for (const name of selectedEras.value) {
        const e = eraFor(name);
        out.push({
          key: 'era:' + name,
          group: 'Era',
          label: name,
          clear: () => { if (e) pickEra(e); },
        });
      }
      for (const m of selectedBornMonths.value) {
        out.push({ key: 'bm:' + m, group: 'Born', label: MONTH_NAMES[m], clear: () => toggleBornMonth(m) });
      }
      for (const d of selectedBornDays.value) {
        out.push({ key: 'bd:' + d, group: 'Day', label: String(d), clear: () => toggleBornDay(d) });
      }
      for (const z of selectedZodiacs.value) {
        out.push({ key: 'z:' + z, group: 'Sign', label: z, clear: () => toggleZodiac(z) });
      }
      if (bornTodayActive.value) {
        out.push({ key: 'bt', group: 'Born', label: 'Today', clear: () => { bornTodayActive.value = false; } });
      }
      for (const c of selectedCountries.value) {
        out.push({ key: 'c:' + c, group: 'Place', label: c, clear: () => selectGlobeCountry(c) });
      }
      if (onlyFavorites.value) {
        out.push({ key: 'fv', group: 'View', label: 'Favorites only', clear: () => { onlyFavorites.value = false; } });
      }
      return out;
    });
    const hasActiveFilters = computed(() => activeFilters.value.length > 0);

    // The roster is never shown cold: the list appears only once the user has
    // actually asked something — typed text, picked a place, or moved time.
    // (Field/gender/saved count too; they're filters like any other.)
    const showResults = computed(() => hasActiveFilters.value);

    // ---- Timeline (bottom scrubber) ----
    // Year range is "engaged" whenever either handle has left its end stop.
    const yearsActive = computed(() =>
      yearMin.value !== YEAR_FLOOR || yearMax.value !== YEAR_CEIL || selectedEras.value.length > 0
    );
    function clearYears() {
      yearMin.value = YEAR_FLOOR;
      yearMax.value = YEAR_CEIL;
    }
    // While a person is open the scrubber stops reporting the filter range and
    // snaps to their date of birth instead — both handles collapse onto the
    // year and the readout shows the full date. It's a display state: the
    // underlying year filter is untouched until the user drags a handle.
    const pctForYear = (y) => ((y - YEAR_FLOOR) / (YEAR_CEIL - YEAR_FLOOR)) * 100;
    const tlMin = computed(() => selectedPerson.value ? selectedPerson.value.birthYear : yearMin.value);
    const tlMax = computed(() => selectedPerson.value ? selectedPerson.value.birthYear : yearMax.value);
    const tlMinPct = computed(() => pctForYear(tlMin.value));
    const tlMaxPct = computed(() => pctForYear(tlMax.value));
    const tlBirthPct = computed(() =>
      selectedPerson.value ? pctForYear(selectedPerson.value.birthYear) : 0
    );
    const tlLabel = computed(() =>
      selectedPerson.value
        ? (formatBirthDate(selectedPerson.value) || 'b. ' + selectedPerson.value.birthYear)
        : `${yearMin.value} – ${yearMax.value}`
    );

    // Century ticks across the rail; every other one carries a label so the
    // scale reads without crowding.
    // ---- A birthday, rolled or picked ----
    // The rail runs on years, but a date is what people actually go looking
    // for, so the two ends of it carry the day.
    function setBornDate(value) {          // yyyy-mm-dd, straight off the picker
      if (!value) { selectedBornMonths.value = []; selectedBornDays.value = []; return; }
      const [, m, d] = value.split('-').map(Number);
      if (!m || !d) return;
      selectedBornMonths.value = [m];
      selectedBornDays.value = [d];
    }
    // Rolled from a real birthday rather than from the calendar, so the throw
    // always lands on someone — most of the 366 days have nobody behind them.
    function randomBornDate() {
      const dated = PEOPLE.filter(p => p.birthMonth && p.birthDay);
      if (!dated.length) return;
      const p = dated[Math.floor(Math.random() * dated.length)];
      selectedBornMonths.value = [p.birthMonth];
      selectedBornDays.value = [p.birthDay];
    }
    // Chrome only opens the native calendar from the picker indicator, which is
    // a few pixels at the end of the field — a click anywhere else in a date
    // input does nothing at all. showPicker() opens it from the whole button.
    function openBornPicker(e) {
      const input = e.currentTarget.querySelector('input[type="date"]');
      if (!input) return;
      try { input.showPicker(); }
      catch { input.focus(); }        // older browsers: the indicator still works
    }
    // What the picker shows — only when the filter is exactly one day. 2000 is
    // a leap year, so Feb 29 survives the round trip.
    const bornDateValue = computed(() => {
      const m = selectedBornMonths.value, d = selectedBornDays.value;
      if (m.length !== 1 || d.length !== 1) return '';
      return '2000-' + String(m[0]).padStart(2, '0') + '-' + String(d[0]).padStart(2, '0');
    });
    const bornDateLabel = computed(() => {
      const m = selectedBornMonths.value, d = selectedBornDays.value;
      if (m.length !== 1 || d.length !== 1) return '';
      return MONTH_NAMES[m[0]] + ' ' + d[0];
    });

    // ---- Eras ----
    // Time as categories rather than as a slider. Nobody thinks in years — they
    // think "Victorian", "the Jazz Age", "whenever Genghis Khan was" — so the
    // timeline is picked from named stretches and the rail underneath only
    // shows where the pick landed, the way the map shows a chosen country.
    // The spans are birth years and they overlap on purpose: a life doesn't
    // start when an era is declared.
    const ERAS = [
      { name: 'Age of Khans',   from: 1000, to: 1300 },
      { name: 'Renaissance',    from: 1300, to: 1600 },
      { name: 'Enlightenment',  from: 1600, to: 1780 },
      { name: 'Revolutionary',  from: 1750, to: 1820 },
      { name: 'Victorian',      from: 1820, to: 1900 },
      { name: 'Jazz Age',       from: 1890, to: 1925 },
      { name: 'Wartime',        from: 1910, to: 1945 },
      { name: 'Post-war',       from: 1940, to: 1960 },
      { name: 'Space Age',      from: 1955, to: 1975 },
      { name: 'Post-modern',    from: 1970, to: 1995 },
      { name: 'Digital native', from: 1990, to: 2030 },
    ];
    // How many of the roster each era holds, so an empty stretch says so
    // rather than returning nothing when tapped.
    const eraCounts = computed(() => {
      const m = new Map();
      for (const e of ERAS) m.set(e.name, 0);
      for (const p of PEOPLE) {
        const y = p.birthYear;
        if (!y) continue;
        for (const e of ERAS) if (y >= e.from && y <= e.to) m.set(e.name, m.get(e.name) + 1);
      }
      return m;
    });
    const countForEra = (e) => eraCounts.value.get(e.name) || 0;
    // Several at once: the Renaissance and the Jazz Age are a perfectly
    // reasonable pair to want, and they're nowhere near each other — which is
    // why this can't be a min and a max. It's a set of bands.
    const selectedEras = ref([]);
    const isEraOn = (e) => selectedEras.value.includes(e.name);
    function pickEra(e) {
      selectedEras.value = isEraOn(e)
        ? selectedEras.value.filter(n => n !== e.name)
        : [...selectedEras.value, e.name];
    }
    const clearEras = () => { selectedEras.value = []; };
    const eraFor = (name) => ERAS.find(e => e.name === name);
    // Each band gets its own colour, taken by the era's place in the list so a
    // given stretch of history is always the same colour. Chip and band share
    // it, which is what ties the one to the other.
    const ERA_COLORS = [
      '#F28B82', '#FBBC04', '#FDD663', '#CCFF90', '#5BB974',
      '#4ECDC4', '#78D9EC', '#8AB4F8', '#AECBFA', '#C58AF9', '#FF8BCB',
    ];
    const eraColor = (e) => ERA_COLORS[ERAS.indexOf(e) % ERA_COLORS.length];
    // Where each selected era falls along the rail, as percentages.
    const eraBands = computed(() => selectedEras.value.map((name) => {
      const e = eraFor(name);
      if (!e) return null;
      const span = YEAR_CEIL - YEAR_FLOOR;
      return {
        name,
        left: ((e.from - YEAR_FLOOR) / span) * 100,
        width: ((e.to - e.from) / span) * 100,
        color: eraColor(e),
      };
    }).filter(Boolean));

    const YEAR_TICKS = (() => {
      const out = [];
      for (let y = 1100; y <= 2000; y += 100) {
        out.push({
          y,
          pct: ((y - YEAR_FLOOR) / (YEAR_CEIL - YEAR_FLOOR)) * 100,
          label: y % 200 === 0,
        });
      }
      return out;
    })();

    // ---- Display helpers ----
    // Split a person's display name into first/last around their middle name.
    // Returns null when there's no middleName (so the template can v-if it out)
    // or when name doesn't have at least two whitespace-separated tokens.
    // A handful of records carry a suffix in the middleName slot ('Jr.',
    // 'III', 'Junior'); those trail the family name instead of splitting it,
    // so we never render "Walt Jr. Frazier".
    function fullNameParts(person) {
      if (!person || !person.middleName) return null;
      const parts = person.name.trim().split(/\s+/);
      if (parts.length < 2) return null;
      const mid = String(person.middleName).trim();
      const isSuffix = isNameSuffix(mid);
      return {
        first: parts[0],
        middle: isSuffix ? '' : mid,
        last: parts.slice(1).join(' '),
        suffix: isSuffix ? mid : '',
      };
    }

    // Everyone the user has hearted, in dataset order.
    const favoritePeople = computed(() => PEOPLE.filter(p => favorites.value.has(p.id)));

    // Collaborators and contemporaries were two rows saying the same thing —
    // people whose lives ran alongside this one, some by working together and
    // some by sharing the years. The distinction was never visible in the data:
    // the same names turn up in both. One list, deduped, in the order given.
    function alongside(person) {
      if (!person) return [];
      const seen = new Set();
      const out = [];
      for (const n of [...(person.collaborators || []), ...(person.contemporaries || [])]) {
        const key = String(n).trim().toLowerCase();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(n);
      }
      return out;
    }

    // One-line secondary text under a name in the result rows.
    function rowMeta(person) {
      return [
        person.subfield || person.field,
        person.birthPlace,
        'b. ' + person.birthYear,
      ].filter(Boolean).join(' · ');
    }

    // The card titles with the whole name — given, middle and family — so it
    // appears once, in the one place it matters, rather than twice.
    function fullNameOf(person) {
      const parts = fullNameParts(person);
      if (!parts) return (person && person.name) || '';
      return [parts.first, parts.middle, parts.last, parts.suffix].filter(Boolean).join(' ');
    }
    // The open card titles with the middle name in place, so it reads the way
    // a birth certificate does rather than as a trailing footnote.
    const selectedNameParts = computed(() => fullNameParts(selectedPerson.value));
    // The animal the open card was born under. Computed once rather than
    // called three times from the template — it runs an ephemeris.
    const selectedChinese = computed(() => {
      const p = selectedPerson.value;
      return p ? chineseZodiacFor(p.birthYear, p.birthMonth, p.birthDay) : null;
    });

    function metaPills(person) {
      const pills = [];
      pills.push(`b. ${person.birthYear}`);
      if (person.birthPlace) pills.push(person.birthPlace);
      if (person.subfield) pills.push(person.subfield);
      else if (person.field) pills.push(person.field);
      return pills;
    }

    function tagsFor(person, matched) {
      const tags = [];
      // Show top team(s)
      person.teams.slice(0, 2).forEach(t => tags.push({ label: t.name, kind: 'team', match: matched.has('teams') }));
      // Show top award
      person.awards.slice(0, 1).forEach(a => tags.push({ label: a.name, kind: 'award', match: matched.has('awards') }));
      // Show one collaborator if matched
      if (matched.has('collaborators') && person.collaborators[0]) {
        tags.push({ label: `with ${person.collaborators[0]}`, kind: 'collab', match: true });
      }
      return tags;
    }

    // Today's date for the masthead
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });

    return {
      // state
      query,
      selectedFields, selectedSubfields, selectedGenders,
      yearMin, yearMax, YEAR_FLOOR, YEAR_CEIL, yearMinPct, yearMaxPct, setYearMin, setYearMax,
      sort,
      selectedPerson, theme,
      // data / constants
      FIELDS, GENDERS, FIELD_COLORS, today, PEOPLE_COUNT: PEOPLE.length, HITS_LIMIT,
      colorForField, iconForField,
      // quick categories
      railTabs, openDrawers, isDrawerOpen, toggleDrawer, closeDrawer,
      queryFor, setDrawerQuery, narrow, SEARCH_FROM,
      openFields, subfieldsFor,
      railTrack, railStep, canRailUp, canRailDown, syncRailArrows,
      randomOpen,
      catTrack, canCatPrev, canCatNext, catPage, quickPick, syncCatArrows,
      setSubTrack, canSubPrev, canSubNext, subPage, syncSubRow, syncSubArrows,
      orderedFields, countForField, likeOptions,
      catPointerDown, catPointerMove, catPointerUp,
      // computed
      filtered, availableSubfields, subRows, countForSubfield, similarForSelected,
      popCard,                                  // measured to cap the name rows
      // career neighbours strip at the foot of the card
      careerMatches, currentMatch, matchIndex, matchStep, randomMatch, openMatch,
      favoritePeople,
      showResults, yearsActive, clearYears, YEAR_TICKS,
      ERAS, countForEra, isEraOn, pickEra, selectedEras, eraBands, eraColor,
      tlMin, tlMax, tlMinPct, tlMaxPct, tlBirthPct, tlLabel,
      setBornDate, randomBornDate, openBornPicker, bornDateValue, bornDateLabel,
      activeFilters, hasActiveFilters,
      // selection helpers (templates)
      isFieldSelected, isSubfieldSelected, isGenderSelected,
      // actions
      clearAll,
      // new features
      favorites, onlyFavorites, isFavorite, toggleFavorite, toggleOnlyFavorites,
      bornTodayActive, toggleBornToday,
      selectedCountry, selectedCountries, isCountryOn, clearCountry, globeData, zoomGlobe,
      pickCountry, flyToCountry, resetGlobeView, randomGlobeView,
      miniOutline, miniAdmin, miniView, miniFrame, miniMarker,
      miniCities,
      selectedBornMonths, selectedBornDays, selectedZodiacs, ZODIACS,
      toggleBornMonth, toggleBornDay, toggleZodiac,
      isBornMonthSelected, isBornDaySelected, isZodiacSelected,
      clearBornFilters,
      MONTH_NAMES, zodiacFor, zodiacIcon, zodiacWiki, formatBirthDate, daysInMonth,
      selectedChinese,
      surpriseMe,
      // the random drawer
      randomEra, randomPlace, randomGender, randomCategory, randomEverything,
      // dock
      hitsExpanded, visibleHits, menuOpen, aboutOpen,
      hitsSize, setHitsSize, drawersFolded, unfoldDrawers,
      searchInput, runSearch,
      closeAbout, openAbout,
      // session
      sessionUser, isLoggedIn, loginOpen, openLogin, submitLogin, logOut,
      loginEmail, loginName, loginError,
      profile, hasProfile, profileSummary, startFromProfile, clearProfile,
      menuView, openMenu, prefsInfoOpen,
      savedSearches, saveCurrentSearch, applySavedSearch, deleteSavedSearch,
      searchLabel, isSearchSaved,
      clearSavedData, forgetThisDevice, confirmSignOut, nameMode,
      dialTrack, dialLetter, onDialScroll, onDialClick, randomLetter,
      dialStep, canDialUp, canDialDown,
      dialPointerDown, dialPointerMove, dialPointerUp,
      // hits list: A–Z jump and first/last name order
      AZ, hitLetters, hitsList, jumpToLetter, nameMode, setNameMode,
      clearType, clearTime, clearCategories, typeFilterCount, timeFilterCount,
      toggleField, toggleSubfield, toggleGender,
      openPerson, closePerson, toggleTheme,
      hasPerson, personByName, openOrSearch, searchFor, filterZodiac, filterBirthday, filterField, filterGender, genderLabel,
      // ask-a-question
      askInput, askAnswer, askError, askLoading, submitAsk,
      // display helpers
      metaPills, tagsFor, alongside, fullNameParts, fullNameOf, middleNameOf, selectedNameParts, rowMeta,
    };
  },
});

// The same short form is asked twice — once as the opening questions on the
// info sheet, once inside account settings — so it lives in one template and
// edits whichever profile object it's handed. Markup stays in index.html with
// everything else; this only supplies the answers it offers.
app.component('profile-form', {
  props: {
    model: { type: Object, required: true },
    fields: { type: Array, default: () => [] },
  },
  template: '#tpl-profile-form',
  setup(props) {
    // One row to begin with — a single parent is a whole family, not half of
    // one — and a button for however many more do the naming here.
    function addSearcher() {
      if (props.model.searchers.length >= SEARCHER_LIMIT) return;
      props.model.searchers.push({ name: '', dob: '', gender: '' });
    }
    function removeSearcher(i) {
      if (props.model.searchers.length <= 1) return;
      props.model.searchers.splice(i, 1);
    }
    const SEARCHER_GENDERS = [
      { v: 'female', label: 'Woman' },
      { v: 'male', label: 'Man' },
      { v: 'nonbinary', label: 'Non-binary' },
    ];
    const LOOKING = [
      { v: 'girl', label: 'Girl' },
      { v: 'boy', label: 'Boy' },
      { v: 'unknown', label: "Don't know yet" },
      { v: 'nonbinary', label: 'Non-binary' },
    ];
    // "I like" is a list, not a choice: tap as many callings as you please,
    // and tapping one again takes it off again.
    function toggleLike(name) {
      const likes = props.model.likes;
      const at = likes.indexOf(name);
      if (at === -1) likes.push(name);
      else likes.splice(at, 1);
    }
    const likesAll = (name) => props.model.likes.includes(name);
    // A stored birthday is machine-shaped (1988-03-12); this is how it reads.
    const MONTHS = ['January','February','March','April','May','June','July',
      'August','September','October','November','December'];
    function prettyDob(dob) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob || '');
      if (!m) return '';
      return Number(m[3]) + ' ' + MONTHS[Number(m[2]) - 1] + ' ' + m[1];
    }
    // Every answer here is optional, so tapping the one that's already on
    // takes it back off rather than leaving you stuck with a first guess.
    const pick = (obj, key, v) => { obj[key] = obj[key] === v ? '' : v; };
    // Chrome only opens a date picker from the little calendar glyph, so a
    // tap anywhere on the field asks for it directly. Guarded: Safari has no
    // showPicker, and it throws unless the call rides a real gesture.
    const openPicker = (e) => {
      const el = e.currentTarget;
      if (!el || typeof el.showPicker !== 'function') return;
      try { el.showPicker(); } catch {}
    };
    // A birthday is picked, never typed — the calendar is the only way in. The
    // field stays writable in the DOM (readonly would make showPicker throw),
    // so the keys are swallowed here instead, minus the ones that navigate.
    const onDateKey = (e) => {
      if (e.key === 'Tab' || e.key === 'Escape') return;
      e.preventDefault();
      if (e.key === 'Enter' || e.key === ' ') openPicker(e);
    };
    return {
      SEARCHER_GENDERS, LOOKING, SEARCHER_LIMIT,
      addSearcher, removeSearcher, pick, openPicker, onDateKey,
      toggleLike, likesAll, prettyDob,
    };
  },
});

// Surface any setup/render error visibly instead of leaving v-cloak hiding the page.
app.config.errorHandler = (err, _instance, info) => {
  console.error('[famous Baby] Vue error:', info, err);
  const root = document.getElementById('app');
  if (root) {
    root.removeAttribute('v-cloak');
    root.innerHTML = '<pre style="padding:24px;font:14px monospace;color:#8A2B2B;white-space:pre-wrap">' +
      'Render error (' + info + ')\n\n' + (err && err.stack ? err.stack : String(err)) + '</pre>';
  }
};

try {
  app.mount('#app');
} catch (err) {
  console.error('[famous Baby] mount failed:', err);
  const root = document.getElementById('app');
  if (root) {
    root.removeAttribute('v-cloak');
    root.innerHTML = '<pre style="padding:24px;font:14px monospace;color:#8A2B2B;white-space:pre-wrap">' +
      'Mount failed:\n\n' + (err && err.stack ? err.stack : String(err)) + '</pre>';
  }
}
