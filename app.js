// famous Baby — Vue 3 application
// Frontend-only for now: filtering runs entirely against the mock dataset.
// We keep the natural-language layer naive (token matching) so it's easy to
// swap in a real backend / LLM-backed query parser later.

console.log('[famous Baby] app.js loaded, importing modules…');

import { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'https://unpkg.com/vue@3.4.27/dist/vue.esm-browser.js';
import { MAJOR_CITIES, CITY_COORDS, REGION_COORDS, US_STATE_CITIES, US_LABEL_ALTITUDE } from './geo.js';
import { ADMIN1_LINES } from './admin1.js';
import { HAS_PHOTO } from './photos.js';
import { ATLAS, ATLAS_SLOT } from './atlas.js';
import { BABY_NAMES, PET_NAMES, NAME_SOURCES } from './names.js';
import { NAME_ORIGINS } from './name_origins.js';
import { WIKI } from './sources.js';

// ---------------------------------------------------------------------------
// GOOGLE SIGN-IN — one line of setup, and it's this one.
//
// Paste a Google Cloud OAuth 2.0 "Web application" client ID between the
// quotes and "Continue with Google" appears at the door. Leave it empty and
// the button stays hidden and the email box carries the page on its own —
// nothing else about the site changes either way.
//
// The client's *Authorised JavaScript origins* have to name every origin this
// site is served from, exactly, scheme and port included:
//     http://localhost:8777          ← local work (run.sh defaults to 8080)
//     https://<you>.github.io        ← the live Pages origin
// No redirect URI is needed: this flow never leaves the page.
// ---------------------------------------------------------------------------
const GOOGLE_CLIENT_ID = '384912608477-aa4re8hjbp6nniqa9ds6oft2n777n82b.apps.googleusercontent.com';

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

// ---- Where the visitor is ----
// The globe opens on the visitor's own country. The time zone above answers
// instantly, with no network and nothing told to anybody, and it is usually
// right — but it is a guess at a *city*, and it has nothing to say when the
// zone is one of the vague ones. So the IP is looked up as well and the camera
// re-aimed if the two disagree.
//
// That lookup is a request to a third party carrying the visitor's IP address.
// There is no way to ask "where is this person" without it, so it is done once
// and the answer kept for half a day: a reload re-opens on the right country
// without going near the network again.
const IP_HOME_KEY = 'fb.ipHome';
const IP_HOME_TTL = 12 * 3600 * 1000;
// Two services, because one is a single point of failure and endpoints like
// these are routinely blocked by ad blockers — which is a perfectly reasonable
// thing for a visitor to be doing, and is why every path through here ends in
// "carry on with the time zone's answer" rather than in an error.
const IP_HOME_URLS = [
  'https://get.geojs.io/v1/ip/geo.json',
  'https://ipwho.is/',
];

function readIpHome() {
  try {
    const raw = JSON.parse(localStorage.getItem(IP_HOME_KEY) || 'null');
    if (raw && Date.now() - raw.at < IP_HOME_TTL && isFinite(raw.lat) && isFinite(raw.lng)) return raw;
  } catch {}
  return null;
}

async function fetchIpHome() {
  const cached = readIpHome();
  if (cached) return cached;
  for (const url of IP_HOME_URLS) {
    try {
      // A hung endpoint must not leave the camera lurching somewhere else
      // several seconds after the visitor has started reading the page.
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 2500);
      const res = await fetch(url, { signal: ctl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const j = await res.json();
      // geojs sends the coordinates as strings and no status field; ipwho.is
      // sends numbers and reports failure in the body with a 200.
      if (!j || j.success === false) continue;
      const lat = parseFloat(j.latitude), lng = parseFloat(j.longitude);
      if (!isFinite(lat) || !isFinite(lng)) continue;
      const out = { lat, lng, country: j.country || '', at: Date.now() };
      try { localStorage.setItem(IP_HOME_KEY, JSON.stringify(out)); } catch {}
      return out;
    } catch { /* blocked, offline, or too slow: try the next, then give up */ }
  }
  return null;
}

// Started here rather than on mount, so the round trip overlaps the dataset
// import and the Vue mount instead of queueing behind them. On a reload with
// the answer already cached this settles before the globe exists at all.
const IP_HOME = fetchIpHome();

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

    // Fly the camera to a country the way Earth does: ease in, don't cut.
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
    // How much room to leave around whatever is being framed. At 1.06 a country
    // arrived filling the frame edge to edge, with nothing of its neighbours
    // and no sense of where on the world it was — clicking a name landed you
    // inside the place instead of taking you to it.
    const FRAME_PAD = 1.35;

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

    // Normally null: the opening view belongs to the visitor, worked out from
    // their time zone, corrected by their IP, and refined by the device itself
    // if they have already granted location.
    //
    // Set it to a { lat, lng } to pin the globe somewhere fixed while this
    // layer is being worked on — a session that starts somewhere different
    // every time is exactly wrong then, because you can't tell a change from a
    // coincidence. It used to hold { lat: 2.0, lng: 19.0 } for central Africa.
    const OPENING_OVERRIDE = null;

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

    // Until the visitor takes hold of the globe themselves, where it points is
    // still ours to decide.
    let globeUntouched = true;

    // The IP answer usually lands after the globe has already opened on the
    // time zone's guess, so this is a correction rather than the first move —
    // and on a reload, with the answer cached, it lands before the globe
    // exists at all and simply becomes the opening view.
    function refineHomeFromIp() {
      IP_HOME.then((home) => {
        if (!home || !globeUntouched || selectedCountries.value.length) return;
        aimHomeAtCoords(home.lat, home.lng);
        // openingAltitude() rather than HOME_VIEW.altitude: this can land in
        // the window between the globe being created and resetGlobeView()
        // filling that in, and the placeholder there would fly the camera out
        // to arm's length before pulling it straight back.
        try {
          globeInstance && globeInstance.pointOfView(
            { lat: home.lat, lng: home.lng, altitude: openingAltitude() }, 900);
        } catch {}
      }).catch(() => {});
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
            if (!globeUntouched || selectedCountries.value.length) return;
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
    // 1.0 is the distance at which the silhouette just covers the canvas,
    // corners included. It used to open a quarter nearer than that, which put
    // you close enough that the globe read as terrain rather than as a globe —
    // and since resetGlobeView comes back to this altitude too, every way out
    // of a country landed just as close.
    const OPENING_ZOOM = 1.0;
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

    // The caps are a wash over the land, and the land is now the thing being
    // looked at — so they're thin. A country you haven't touched is barely
    // tinted at all: enough to say the roster reaches it, not enough to turn
    // the Sahara blue. Hover and selection still come up hard, because they
    // have to answer a pointer.
    function polyCapColor(d) {
      const entry = polyEntry(d);
      if (!entry) return 'rgba(255,255,255,0.010)';
      if (isCountryOn(entry.country)) return 'rgba(253,214,99,0.24)';
      if (d === hoveredPoly.value) return 'rgba(138,180,248,0.30)';
      return 'rgba(138,180,248,0.05)';
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

      // Nothing. The plinth existed to make a photograph sit *on* its country;
      // a bubble is anchored at a point and doesn't need one, and a world of
      // low walls read as noise behind the faces.
      return 0;
    }

    function polyAltitude(d) {
      const entry = polyEntry(d);
      if (!entry) return 0;
      return countryAltitude(entry.country, d === hoveredPoly.value);
    }
    // Must match polygonsTransitionDuration below: globe.gl eases the
    // extrusion over this long, and the clip has to travel with it rather than
    // jumping to the final height and waiting for the country to catch up.
    const POLY_TWEEN_MS = 420;
    // Once a country is up on its plinth the extruded sides are most of what
    // you see of it from an angle, so they take the selection colour too.
    function polySideColor(d) {
      const entry = polyEntry(d);
      if (entry && isCountryOn(entry.country)) return 'rgba(253,214,99,0.22)';
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

    // ---- The mosaic ----
    // The land is a photomosaic. A near-uniform lattice is laid over the whole
    // sphere; every point of it that falls on a country the roster reaches
    // becomes a tessera holding a face from that country. Grey and half-lit at
    // rest, so the land still reads as land — and every second or so one tile
    // somewhere blooms into colour and gives its name.
    //
    // A tessera is the same angular size the world over, and that is the whole
    // point of the arrangement. The frame used to be the country's own
    // outline, and country areas span four orders of magnitude, so a face was
    // a postage stamp in Belgium and a mural in Canada and neither size meant
    // anything. Now every face is the same size and a large country simply
    // holds more of them, which is a fact about the country worth showing.

    const FACE_DWELL = 3400;        // ms before a picked country re-deals
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

    // ---- The lattice ----
    // A hexagonal lattice walked in lat/lng, not a Fibonacci scatter. The
    // scatter was even over the *sphere*, which is not the same as covering
    // every *country*: at this spacing it reached 88 of the 179 countries on
    // the roster and left 122 of them showing a single face. A country is the
    // unit that matters here, so the lattice has to be one you can subdivide
    // inside one, and a scatter is the one arrangement you cannot.
    //
    // Rows sit a row-height apart in latitude, columns a step apart once
    // longitude is un-squeezed by cos(lat), and alternate rows are offset half
    // a column — so the points pack in triangles and their tiles cover the
    // ground between them. Tiles stay meridian-aligned either way, so the
    // weave reads exactly as it did.
    //
    // MOSAIC_N is still the dial for how fine the mosaic is — how many points
    // would go round the whole sphere at this spacing. Tiles are sized to
    // match, so raising it makes them smaller as well as more numerous, and
    // costs three screen projections a frame for every one it adds.
    const MOSAIC_N = 2600;
    // Tiles are drawn a little *smaller* than their share of the sphere, so the
    // lattice never closes into a continuous surface. What is left between
    // them is the map, and it is the grout: a mosaic reads as a mosaic because
    // you can see what it has been laid on. At 1.35 the tesserae met edge to
    // edge and the globe stopped being a globe — the land had been wallpapered
    // over with photographs rather than rendered in them.
    // Over one on purpose now. A tessera used to be drawn smaller than its
    // share of the sphere so the lattice never closed and the map showed
    // through the gaps — the grout was the space a tile declined to take. The
    // tiles cut their own edges against each other now, so the gap is the
    // crack between two stones that do meet, and the nominal size has to reach
    // far enough for the cutting to bite: 2/√3 is the corner-to-centre
    // distance of a hexagon whose flat-to-centre distance is half the spacing,
    // which is exactly the cell the carving leaves behind.
    const TILE_BLEED = 1.155;
    // Under this many pixels a tessera is a speck, and several hundred specks
    // are a smudge over the map rather than a mosaic on it.
    const MIN_TILE_PX = 5;
    // A surface point is over the horizon when it falls outside
    // acos(R / cameraDistance) of the camera direction. The margin has to be a
    // *fraction* of that cap, not a fixed slice of cosine: up close the cap is
    // only a few degrees wide, and a flat margin pushes the cutoff past 1 and
    // hides everything.
    const MOSAIC_HORIZON_MARGIN = 0.03;
    // How much of a face shows when it is only part of the terrain, and how
    // much when it is the thing you are being shown. The resting figure is
    // deliberately low: a tessera at rest is a texture on the land, and the
    // greens and browns underneath are what it is meant to be tinted by. The
    // whole of the contrast this layer trades on is between that and the one
    // tile currently blooming, which comes up to full.
    const MIX_REST = 0.30;
    const MIX_LIT = 1;
    // ---- Covering a country ----
    // Every country on the roster is laid until its own area is covered, not
    // until the global lattice happens to have crossed it. A country the
    // lattice under-serves is re-laid whole at a finer step — whole, rather
    // than having small tiles wedged in beside big ones, which is what makes
    // the country read as one surface instead of a patch.
    // Below COUNTRY_MIN_TILES a country is re-laid finer. It is the dial that
    // sets the weight of the whole layer: at 4 the mosaic is ~1,430 tesserae,
    // at 3 it is ~1,190. Every tessera costs three screen projections a frame,
    // so drop it if the globe ever feels heavy.
    const COUNTRY_MIN_TILES = 4;
    // A ceiling on the re-laying only — the global lattice gives Russia its
    // hundred and is not capped. This stops an archipelago spending the whole
    // budget on empty islets.
    const COUNTRY_MAX_TILES = 24;
    // Each pass tightens the step by this much — about twice the tesserae.
    // Halving was too coarse a jump: Ireland went from 3 faces to 18 in one
    // step, which is a different country rather than a better-covered one.
    const REFINE_RATIO = 1.45;
    const REFINE_PASSES = 9;
    // Tesserae are cut by hand, so no two are quite the same size. A fraction
    // either way of the nominal size, fixed per position rather than per
    // person — a face is re-dealt every few seconds, and a size that followed
    // the face would make the whole mosaic breathe.
    const SIZE_JITTER = 0.20;
    // ---- Cracked clay ----
    // A tessera is no longer a square. Each one is cut back against every
    // neighbour it has — the cut runs along the line between the two, so the
    // edge one stone gives up is the edge the next one gains and the pair
    // meet along it exactly. Do that everywhere and the mosaic stops being
    // tiles laid on a surface and becomes the surface, split: flagstones,
    // or a dry lake bed.
    //
    // Straight cuts, because that is what clay and stone actually do. The
    // irregularity is in where the cut falls rather than in the line being
    // wobbly: the dividing line between two stones sits anywhere from a third
    // to two thirds of the way across rather than always at the midpoint, so
    // no two cells come out the same size or shape.
    const CRACK_BIAS = 0.14;        // how far off centre a dividing line may sit
    // Then both stones step back from every line they share, and the gap they
    // leave between them is the crack. This is the old grout, moved from the
    // lattice into the stone.
    const CRACK_WIDTH = 0.08;       // as a fraction of the tessera's own size
    // A cell starts as this many sides before the neighbours cut into it. It
    // only survives where a tessera has no neighbour on some side — an island,
    // a coast — and there it reads as a stone worn round by water.
    const CELL_SIDES = 12;
    // Under this many pixels the difference between a carved cell and a square
    // is not visible, and the path is not worth building. Small tesserae blit
    // as they always did.
    const CARVE_MIN_PX = 7;
    // Not every tile at once. One face blooms somewhere on the globe, holds,
    // and fades; a moment later another does, five tiles further round. A
    // world where everything moves at once reads as noise — a world where one
    // thing catches your eye reads as a place with people in it.
    const FLASH_EVERY_MS = 900;      // how often a face blooms
    const FLASH_HOLD_MS = 4200;      // how long it holds before it has gone
    const FLASH_FADE_MS = 900;       // and how long it takes to go
    const FLASH_STRIDE = 5;          // every fifth tile in view

    const unitVec = (v) => {
      const L = Math.hypot(v[0], v[1], v[2]) || 1;
      return [v[0] / L, v[1] / L, v[2] / L];
    };
    // `v` turned `a` radians toward the unit tangent `t`, staying on the sphere.
    const rotToward = (v, t, a) => {
      const c = Math.cos(a), s = Math.sin(a);
      return [v[0] * c + t[0] * s, v[1] * c + t[1] * s, v[2] * c + t[2] * s];
    };

    // The lattice itself. Rows are indexed off the south pole and columns off
    // the antimeridian rather than off the box being filled, so a fill run
    // inside one country lands on the same points the global run would have —
    // the coarse and fine lattices nest, and two countries meeting at a border
    // do not meet at a seam between two differently-phased grids.
    function* hexPoints(step, minLat, maxLat, minLng, maxLng) {
      const stepDeg = step / RAD;
      const rowDeg = stepDeg * 0.866;                 // √3/2: triangular packing
      for (let row = Math.floor((minLat + 90) / rowDeg); ; row++) {
        const lat = row * rowDeg - 90;
        if (lat > maxLat) break;
        // Nothing is laid within a degree of a pole: columns there are closer
        // together than the tiles are wide, whatever cos(lat) is clamped to.
        if (lat < minLat || lat > 89 || lat < -89) continue;
        const colDeg = stepDeg / Math.max(0.08, Math.cos(lat * RAD));
        const off = (row % 2) * colDeg * 0.5;
        for (let col = Math.floor((minLng - off + 180) / colDeg); ; col++) {
          const lng = col * colDeg - 180 + off;
          if (lng > maxLng) break;
          if (lng < minLng) continue;
          yield [lat, lng];
        }
      }
    }
    // How much bigger or smaller than nominal this particular tessera is cut.
    // Hashed from its own position, so it is the same on every load and its
    // neighbours are all different — a mosaic, not a grid of stamps.
    function jitterAt(lat, lng) {
      let h = Math.imul(Math.round((lat + 90) * 1024) | 0, 0x27d4eb2d)
            ^ Math.imul(Math.round((lng + 180) * 1024) | 0, 0x165667b1);
      h ^= h >>> 15; h = Math.imul(h, 0x2545f491); h ^= h >>> 13;
      return 1 + (((h >>> 0) / 4294967296) * 2 - 1) * SIZE_JITTER;
    }

    // Which country a point falls in. Every outer ring in the world with its
    // bounding box in front of it — the box rejects all but a handful of
    // candidates, which is what makes a couple of thousand lookups affordable.
    // Outer rings only: holes would need a fill-rule dance for a handful of
    // enclaves nobody will notice at this scale.
    // Ray-casting point-in-polygon, in x=lng / y=lat. Antimeridian-crossing
    // rings are split by the source data, so there is no seam to special-case.
    function pointInRing(x, y, pts) {
      let inside = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = pts[i][0], yi = pts[i][1], xj = pts[j][0], yj = pts[j][1];
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
      }
      return inside;
    }
    let landIndex = null;
    let ringsByCountry = null;
    function buildLandIndex() {
      const out = [];
      for (const f of worldFeatures.value) {
        const country = geoCountryName(f);
        for (const poly of polysOf(f)) {
          const ring = poly[0];
          if (!ring || ring.length < 3) continue;
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const [x, y] of ring) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
          out.push({ country, ring, minX, minY, maxX, maxY });
        }
      }
      return out;
    }
    // Every ring a country owns, so the fill can walk one country's outlines
    // without scanning all 285 of them per point.
    function groupRings(index) {
      const m = new Map();
      for (const p of index) {
        if (!m.has(p.country)) m.set(p.country, []);
        m.get(p.country).push(p);
      }
      return m;
    }
    function countryAt(lng, lat) {
      if (!landIndex) return null;
      for (const p of landIndex) {
        if (lng < p.minX || lng > p.maxX || lat < p.minY || lat > p.maxY) continue;
        if (pointInRing(lng, lat, p.ring)) return p.country;
      }
      return null;
    }

    // ---- The shoreline ----
    // A tessera sits at a lattice point inside a country, but it has a size of
    // its own and the point can be a stone's throw from the coast — so left
    // alone the mosaic runs off the land into the sea and the globe stops
    // reading as a globe. A tile is therefore cut down to whatever room it
    // actually has: the distance from its point to its own country's outline.
    // Coastlines and land borders come out as a fringe of smaller tesserae,
    // which is what a mosaic laid by hand does at an edge — and which draws
    // the map rather than covering it.
    //
    // Worked out once, at build. The alternative is a clip path, which means
    // re-projecting every visible coastline every frame; the outlines are
    // 10,575 vertices over 285 rings and most of that is small islands, so
    // there is no thinning that makes it cheap. Measured: ~5,000 projections a
    // frame for the clip against ~90ms once for this.
    //
    // Distances are in degrees on a locally equal-scale frame — longitude
    // squeezed by cos(latitude) — which is close enough over the couple of
    // degrees that matter and far cheaper than doing it properly on a sphere.
    // The smallest tessera worth laying. It is a floor on *laying* one, never
    // on its size: a tile is always cut to the room it has, so this is the
    // point below which there is no room worth using. It has to be this small
    // or a country narrower than a face — Jamaica, Lebanon, Luxembourg —
    // qualifies nowhere in its own territory and drops out of the mosaic.
    //
    // What used to be here was `max(TILE_MIN_HALF, min(tileHalf, clear))`,
    // and the max undid the min: any point with between 0.35° and 0.6° of
    // room got a tessera larger than its own clearance. Measured, 69 tiles
    // were reaching past their country into the sea. Clamping is one-way now.
    const TILE_MIN_HALF = 0.08 * RAD;
    function coastClearance(lat, lng, country) {
      const k = Math.max(0.05, Math.cos(lat * RAD));
      const px = lng * k, py = lat;
      let best = Infinity;
      // The country's own rings only. This runs once per candidate point and
      // the fill asks for a great many more of them than the old scatter did,
      // so it can no longer afford to walk all 285 rings in the world to throw
      // 284 of them away.
      for (const p of (ringsByCountry && ringsByCountry.get(country)) || []) {
        if (lng < p.minX - 6 || lng > p.maxX + 6 || lat < p.minY - 6 || lat > p.maxY + 6) continue;
        const r = p.ring;
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          const ax = r[j][0] * k, ay = r[j][1], bx = r[i][0] * k, by = r[i][1];
          const dx = bx - ax, dy = by - ay;
          const l2 = dx * dx + dy * dy;
          let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const ex = px - (ax + t * dx), ey = py - (ay + t * dy);
          const d2 = ex * ex + ey * ey;
          if (d2 < best) best = d2;
        }
      }
      return best === Infinity ? Infinity : Math.sqrt(best) * RAD;
    }

    // The same walk, but keeping the nearest few edges rather than only the
    // closest distance — each one becomes a straight cut across the stone.
    //
    // A stone used to be *shrunk* until it fitted inside its country, which is
    // why so few of them touched: pulled in from the coast, they were pulled
    // away from each other too, and a mosaic of stones that meet nothing has
    // no cracks in it. So the coast cuts them now, the way the neighbours do.
    // Several edges rather than one, because one straight cut only fits a
    // convex shore and would let a stone reach across a bay.
    // Ten is where the last cell corner stops crossing an outline, measured
    // over all 1,347 stones and every corner of each. Twelve for margin; the
    // walk is the same either way, since finding the nearest edges costs what
    // it costs and only the shortlist changes.
    const COAST_CUTS = 12;
    function coastPlanes(lat, lng, country, half) {
      const k = Math.max(0.05, Math.cos(lat * RAD));
      const px = lng * k, py = lat;
      const found = [];
      for (const p of (ringsByCountry && ringsByCountry.get(country)) || []) {
        if (lng < p.minX - 6 || lng > p.maxX + 6 || lat < p.minY - 6 || lat > p.maxY + 6) continue;
        const r = p.ring;
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          const ax = r[j][0] * k, ay = r[j][1], bx = r[i][0] * k, by = r[i][1];
          const dx = bx - ax, dy = by - ay;
          const l2 = dx * dx + dy * dy;
          let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          const ex = (ax + t * dx) - px, ey = (ay + t * dy) - py;
          const d = Math.hypot(ex, ey);
          if (d < 1e-9) continue;
          found.push({ d, nx: ex / d, ny: ey / d });
        }
      }
      found.sort((a, b) => a.d - b.d);
      // In the stone's own frame: east is +u, north is −v, and distances are
      // in units of its radius.
      const out = [];
      for (let i = 0; i < found.length && out.length < COAST_CUTS; i++) {
        const f = found[i];
        out.push([f.nx, -f.ny, (f.d * RAD) / half]);
      }
      return out;
    }

    // ---- The sprite sheet ----
    // Several hundred faces are on screen at once, every frame. As separate
    // elements that is several hundred decodes — an image costs its pixel area
    // times four bytes once decoded, whatever the file weighs, which is how
    // this page used to run a phone out of memory and get its tab killed and
    // reloaded. As one sheet it is a single decode and a face is a
    // sub-rectangle blit, which is the fastest thing a canvas does.
    let atlasImg = null;
    let atlasGrey = null;           // the same sheet, desaturated once
    let atlasReady = false;
    function loadAtlas() {
      if (atlasImg) return;
      atlasImg = new Image();
      atlasImg.onload = () => {
        atlasReady = true;
        // Made once, rather than setting ctx.filter every frame: a canvas
        // filter forces a fresh compositing layer per draw call, and there are
        // several hundred draw calls in a frame.
        try {
          const c = document.createElement('canvas');
          c.width = atlasImg.naturalWidth;
          c.height = atlasImg.naturalHeight;
          const g = c.getContext('2d');
          g.filter = 'grayscale(1) contrast(1.1) brightness(1.05)';
          g.drawImage(atlasImg, 0, 0);
          atlasGrey = c;
        } catch { atlasGrey = null; }
        mosaicDirty = true;
      };
      atlasImg.onerror = () => console.error('[famous Baby] atlas failed to load:', ATLAS.src);
      atlasImg.src = ATLAS.src;
    }

    // ---- The tesserae ----
    const tiles = [];
    let tileHalf = 0;
    let mosaicDirty = true;

    function dealFace(t, offset) {
      const p = t.people[(t.k + offset) % t.people.length];
      const slot = ATLAS_SLOT.get(p.id);
      if (slot === undefined) return false;
      t.person = p;
      t.sx = (slot % ATLAS.cols) * ATLAS.cell;
      t.sy = Math.floor(slot / ATLAS.cols) * ATLAS.cell;
      return true;
    }

    function makeTile(v, country, people, k, half) {
      const [lat, lng] = vecToLatLng(v);
      // The frame the tessera is drawn on, built off the sphere's own axis, so
      // tiles line up with the meridians and the mosaic reads as a weave
      // rather than a scatter.
      const axis = Math.abs(v[2]) < 0.999 ? [0, 0, 1] : [1, 0, 0];
      const east = unitVec(cross(axis, v));
      const north = cross(v, east);                   // unit already: v ⟂ east
      return {
        v, lat, lng, country, people, k,
        person: null, sx: 0, sy: 0,
        // Two points a half-tile away, east and north. Projecting them each
        // frame gives the tile's size, its rotation and its foreshortening
        // near the rim, all three at once and without a matrix of our own.
        e: vecToLatLng(rotToward(v, east, half)),
        n: vecToLatLng(rotToward(v, north, half)),
        flashAt: -1e9, selected: false,
        on: false, cx: 0, cy: 0, r: 0,
        // The tessera's own angular size, kept because carveTiles works in
        // these units, and the cell it carves.
        half, poly: null,
      };
    }

    function buildTiles() {
      tiles.length = 0;
      const byCountry = photoPeopleByCountry.value;
      if (!byCountry.size || !worldFeatures.value.length) return;
      landIndex = buildLandIndex();
      ringsByCountry = groupRings(landIndex);
      // The largest a tessera may be, in radians. sqrt(π/N) is the radius of a
      // circle holding one point's share of the sphere's area; the bleed below
      // one pulls it in from there so the tiles never quite meet. Anything
      // near a coast is cut down further still, by coastClearance.
      tileHalf = Math.sqrt(Math.PI / MOSAIC_N) * TILE_BLEED;
      const step0 = 2 * tileHalf / TILE_BLEED;     // the spacing that goes with it

      // A point becomes a tessera cut to whatever room it actually has. The
      // clamp runs one way only: `desired` is a ceiling, `clear` is a ceiling,
      // and nothing raises either. That is what keeps every tile inside its
      // own country's outline.
      // A stone is laid at the size the lattice gives it, jittered, and keeps
      // it. What the coast does is cut the cell, not shrink the stone — see
      // coastPlanes. All that is asked here is that there be enough room to be
      // worth laying one at all: below COAST_ROOM of its own radius a stone
      // would be a shard, and the shoreline is better left as map.
      //
      // Down from 0.4. This is only a threshold on *laying* a stone — the
      // coast cuts whatever is laid — so at 0.4 the shoreline was being kept
      // clear of stones that would have been perfectly legible once trimmed,
      // and every coast read as a bald strip a stone's width inland. Lower is
      // simply more mosaic reaching the water's edge, not more of it in the
      // water.
      const COAST_ROOM = 0.2;
      const cut = (lat, lng, country, desired) => {
        const half = desired * jitterAt(lat, lng);
        if (half < TILE_MIN_HALF) return 0;
        const clear = coastClearance(lat, lng, country);
        return clear >= half * COAST_ROOM ? half : 0;
      };

      // ---- The global lattice ----
      // One pass over the whole sphere, which covers every country big enough
      // to hold a face at the nominal size.
      const laid = new Map();
      for (const [lat, lng] of hexPoints(step0, -90, 90, -180, 180)) {
        const country = countryAt(lng, lat);
        if (!country) continue;
        const people = byCountry.get(country);
        if (!people || !people.length) continue;
        const half = cut(lat, lng, country, tileHalf);
        if (!half) continue;
        if (!laid.has(country)) laid.set(country, []);
        laid.get(country).push({ lat, lng, half });
      }

      // ---- Countries the lattice under-serves ----
      // Anything the coarse pass left with fewer than COUNTRY_MIN_TILES is
      // re-laid from scratch at a tighter step, and again tighter, until it is
      // covered or its tesserae would be too small to be worth laying. The
      // country keeps whichever pass gave it the most, so a step that goes one
      // notch too fine can never leave it with less than it started with.
      for (const [country, people] of byCountry) {
        const rings = ringsByCountry.get(country);
        if (!rings || !rings.length || !people.length) continue;
        let best = laid.get(country) || [];
        if (best.length >= COUNTRY_MIN_TILES) continue;
        let step = step0;
        for (let pass = 0; pass < REFINE_PASSES; pass++) {
          step /= REFINE_RATIO;
          const desired = Math.min(tileHalf, step / 2 * TILE_BLEED);
          if (desired < TILE_MIN_HALF) break;
          let got = [];
          for (const p of rings) {
            for (const [lat, lng] of hexPoints(step, p.minY, p.maxY, p.minX, p.maxX)) {
              if (got.length >= COUNTRY_MAX_TILES * 4) break;
              if (!pointInRing(lng, lat, p.ring)) continue;
              const half = cut(lat, lng, country, desired);
              if (half) got.push({ lat, lng, half });
            }
          }
          // Over the cap the tesserae with the most room win, which is the
          // mainland rather than a scatter of islets: Fiji is 300 islands and
          // would otherwise spend the whole budget on the empty ones.
          if (got.length > COUNTRY_MAX_TILES) {
            got.sort((a, b) => b.half - a.half);
            got = got.slice(0, COUNTRY_MAX_TILES);
          }
          if (got.length > best.length) best = got;
          if (best.length >= COUNTRY_MIN_TILES) break;
        }
        if (best.length) laid.set(country, best);
      }

      // ---- Countries with no outline at all ----
      // Seven of the roster's countries are not in the 110m world data in any
      // form — Hong Kong and Barbados are below its resolution, Tibet and
      // Zanzibar are not countries to it, Czechoslovakia has not been one
      // since 1993. They get their COUNTRY_COORDS point and nothing else,
      // which is the whole of what the mosaic can honestly say about them.
      for (const [country, people] of byCountry) {
        if (laid.has(country) || !people.length) continue;
        if (ringsByCountry.has(country)) continue;
        const c = COUNTRY_COORDS[country];
        if (!c) continue;
        laid.set(country, [{ lat: c[0], lng: c[1], half: tileHalf * jitterAt(c[0], c[1]) }]);
      }

      // ---- Dealing the faces ----
      // Per country and in index order, so neighbouring tesserae hold
      // different people however many the country has.
      // Two stones on one spot would draw two faces through each other. The
      // lattice does not produce them, but a country re-laid at a finer step
      // can land one on a point the global pass already used.
      const spotsTaken = new Set();
      for (const [country, spots] of laid) {
        const people = byCountry.get(country);
        if (!people || !people.length) continue;
        let k = 0;
        for (const s of spots) {
          const spotKey = Math.round(s.lat * 100) + ':' + Math.round(s.lng * 100);
          // Unless it is the country's only one. A shared spot draws two faces
          // through each other, which is ugly; dropping a country out of the
          // mosaic to avoid it is worse, and would undo the whole point of
          // laying every country in the first place.
          if (spotsTaken.has(spotKey) && k > 0) continue;
          spotsTaken.add(spotKey);
          const t = makeTile(toVec([s.lat, s.lng]), country, people, k++, s.half);
          if (t && dealFace(t, 0)) tiles.push(t);
        }
      }
      // Every stone is laid before any of them is cut: a cell is defined by
      // its neighbours, so there is nothing to cut against until they all exist.
      carveTiles();
      // And where they ended up is what tells the globe when to hurry.
      buildFaceGrid();
    }

    // ---- Carving the cells ----
    // Sutherland–Hodgman: a convex polygon clipped by a half-plane stays
    // convex, so a cell cut by each neighbour in turn needs no more machinery
    // than this. Coordinates are the tile's own frame — the one blit() already
    // maps to the screen — so a cell carved once at build time follows its
    // stone round the globe for free, turning and foreshortening with it.
    function clipHalfPlane(poly, nu, nv, limit) {
      const out = [];
      const n = poly.length / 2;
      for (let i = 0; i < n; i++) {
        const ax = poly[i * 2], ay = poly[i * 2 + 1];
        const j = (i + 1) % n;
        const bx = poly[j * 2], by = poly[j * 2 + 1];
        const da = ax * nu + ay * nv - limit;
        const db = bx * nu + by * nv - limit;
        if (da <= 0) { out.push(ax, ay); }
        if ((da <= 0) !== (db <= 0)) {
          const t = da / (da - db);
          out.push(ax + (bx - ax) * t, ay + (by - ay) * t);
        }
      }
      return out;
    }

    // Where the dividing line between two stones falls, as a fraction of the
    // way from this one to that one. Hashed off the midpoint, which both of
    // them compute identically, and flipped by whichever sorts first — so the
    // two agree on one line rather than each cutting to its own taste and
    // leaving a sliver or an overlap between them.
    function shareLine(aLat, aLng, bLat, bLng) {
      const h = jitterAt((aLat + bLat) / 2, (aLng + bLng) / 2);
      const off = ((h - 1) / SIZE_JITTER) * CRACK_BIAS;      // −BIAS … +BIAS
      const first = aLat !== bLat ? aLat < bLat : aLng < bLng;
      return 0.5 + (first ? off : -off);
    }

    function carveTiles() {
      // Buckets five degrees on a side: every neighbour close enough to cut
      // into a tessera is within one of the nine around it.
      const bucket = new Map();
      const key = (la, lo) => (Math.floor(la / 5) + 40) * 200 + (Math.floor(lo / 5) + 40);
      for (const t of tiles) {
        const k = key(t.lat, t.lng);
        if (!bucket.has(k)) bucket.set(k, []);
        bucket.get(k).push(t);
      }
      for (const t of tiles) {
        // The cell before anything cuts it: a ring at the tessera's full size.
        let poly = [];
        for (let i = 0; i < CELL_SIDES; i++) {
          const a = (i + 0.5) * 2 * Math.PI / CELL_SIDES;
          poly.push(Math.cos(a), Math.sin(a));
        }
        const kLat = Math.max(0.08, Math.cos(t.lat * RAD));
        for (let dla = -5; dla <= 5; dla += 5) {
          for (let dlo = -5; dlo <= 5; dlo += 5) {
            const near = bucket.get(key(t.lat + dla, t.lng + dlo));
            if (!near) continue;
            for (const o of near) {
              if (o === t) continue;
              let dLng = o.lng - t.lng;
              if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
              // The neighbour's offset in this tile's own units: east and
              // south, divided by the tile's own half-size.
              const nu = (dLng * kLat * RAD) / t.half;
              const nv = -((o.lat - t.lat) * RAD) / t.half;
              const d2 = nu * nu + nv * nv;
              // Too far to reach this cell even at full stretch, or sitting on
              // top of it, which the lattice should never produce.
              if (d2 > 16 || d2 < 1e-9) continue;
              const share = shareLine(t.lat, t.lng, o.lat, o.lng);
              poly = clipHalfPlane(poly, nu, nv, d2 * share);
              if (poly.length < 6) break;
            }
          }
        }
        // And the shore, which cuts a stone exactly as a neighbour does.
        for (const [nu, nv, limit] of coastPlanes(t.lat, t.lng, t.country, t.half)) {
          if (limit >= 1) continue;                   // the coast is out of reach
          poly = clipHalfPlane(poly, nu, nv, limit);
          if (poly.length < 6) break;
        }
        if (poly.length < 6) { t.poly = null; continue; }
        // Step back from every edge by half a crack, so the gap between two
        // stones is one crack wide rather than two.
        let cx = 0, cy = 0;
        const n = poly.length / 2;
        for (let i = 0; i < n; i++) { cx += poly[i * 2]; cy += poly[i * 2 + 1]; }
        cx /= n; cy /= n;
        const k = 1 - CRACK_WIDTH;
        const out = new Float32Array(poly.length);
        for (let i = 0; i < n; i++) {
          out[i * 2] = cx + (poly[i * 2] - cx) * k;
          out[i * 2 + 1] = cy + (poly[i * 2 + 1] - cy) * k;
        }
        t.poly = out;
      }
    }

    // ---- The canvas ----
    // A canvas rather than the SVG this layer used to be: several hundred
    // tesserae, each re-placed every frame, is several hundred DOM writes and
    // a style recalculation per frame. Blitting them is one draw call each.
    let mosRoot = null;
    let mosCanvas = null;
    let mosCtx = null;
    function ensureMosaicRoot() {
      if (mosCanvas) return mosCanvas;
      const host = globeInstance && globeInstance._el;
      if (!host) return null;
      mosRoot = document.createElement('div');
      mosRoot.className = 'mos';
      mosCanvas = document.createElement('canvas');
      mosCanvas.className = 'mos__canvas';
      mosCtx = mosCanvas.getContext('2d');
      mosRoot.appendChild(mosCanvas);
      host.appendChild(mosRoot);
      return mosCanvas;
    }

    // The unit square [-1,1]² mapped onto the tile's own screen frame. This is
    // what makes a tessera lie *on* the sphere — turning with it, foreshortening
    // toward the rim — instead of sitting on the glass in front of it.
    function blit(ctx, img, t, e1x, e1y, e2x, e2y, dpr) {
      ctx.setTransform(e1x * dpr, e1y * dpr, e2x * dpr, e2y * dpr, t.cx * dpr, t.cy * dpr);
      // The cell is in the same units the transform above already maps, so the
      // path costs nothing to place — it turns and foreshortens with the stone.
      // Below CARVE_MIN_PX the shape cannot be seen and the path is skipped.
      const poly = t.poly;
      if (poly && t.r >= CARVE_MIN_PX) {
        ctx.beginPath();
        ctx.moveTo(poly[0], poly[1]);
        for (let i = 2; i < poly.length; i += 2) ctx.lineTo(poly[i], poly[i + 1]);
        ctx.closePath();
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, t.sx, t.sy, ATLAS.cell, ATLAS.cell, -1, -1, 2, 2);
        ctx.restore();
        return;
      }
      ctx.drawImage(img, t.sx, t.sy, ATLAS.cell, ATLAS.cell, -1, -1, 2, 2);
    }

    let hoverTile = null;

    function drawMosaic(camDir, horizonAngle) {
      const host = globeInstance && globeInstance._el;
      if (!host || !mosCtx || !atlasReady) return;
      const ctx = mosCtx;
      const w = host.clientWidth, h = host.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (mosCanvas.width !== Math.round(w * dpr) || mosCanvas.height !== Math.round(h * dpr)) {
        mosCanvas.width = Math.round(w * dpr);
        mosCanvas.height = Math.round(h * dpr);
        mosCanvas.style.width = w + 'px';
        mosCanvas.style.height = h + 'px';
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, mosCanvas.width, mosCanvas.height);

      const now = performance.now();
      const cosH = Math.cos(horizonAngle * (1 - MOSAIC_HORIZON_MARGIN));
      const grey = atlasGrey || atlasImg;
      const pop = popAlt.value;
      const lit = [];

      const screenAt = (lat, lng, alt) => {
        let s;
        try { s = globeInstance.getScreenCoords(lat, lng, alt); } catch { return null; }
        return (s && isFinite(s.x) && isFinite(s.y)) ? s : null;
      };

      ctx.globalAlpha = MIX_REST;
      for (const t of tiles) {
        t.on = false;
        if (dot(t.v, camDir) < cosH) continue;
        // A picked country stands on a plinth, so its tesserae rise with it.
        const alt = t.selected ? pop : 0;
        const c = screenAt(t.lat, t.lng, alt);
        if (!c) continue;
        const pe = screenAt(t.e[0], t.e[1], alt);
        const pn = screenAt(t.n[0], t.n[1], alt);
        if (!pe || !pn) continue;
        const e1x = pe.x - c.x, e1y = pe.y - c.y;
        // South, not north: the image's own y-axis runs downward, and mapping
        // it to north would stand every face on its head.
        const e2x = c.x - pn.x, e2y = c.y - pn.y;
        const size = Math.max(Math.hypot(e1x, e1y), Math.hypot(e2x, e2y));
        if (size < MIN_TILE_PX) continue;
        t.on = true; t.cx = c.x; t.cy = c.y; t.r = size;

        const age = now - t.flashAt;
        if (t.selected || t === hoverTile || age < FLASH_HOLD_MS) {
          lit.push([t, e1x, e1y, e2x, e2y, age]);
          continue;
        }
        blit(ctx, grey, t, e1x, e1y, e2x, e2y, dpr);
      }

      // The lit ones over the top, in colour. A bloom fades back to the
      // terrain rather than switching off, so the eye is let go of gently.
      for (const [t, e1x, e1y, e2x, e2y, age] of lit) {
        const out = age > FLASH_HOLD_MS - FLASH_FADE_MS && !t.selected && t !== hoverTile
          ? (FLASH_HOLD_MS - age) / FLASH_FADE_MS
          : 1;
        ctx.globalAlpha = MIX_REST + (MIX_LIT - MIX_REST) * Math.max(0, Math.min(1, out));
        blit(ctx, atlasImg, t, e1x, e1y, e2x, e2y, dpr);
      }

      // Names last, so nothing is drawn over them. Only for the tiles being
      // pointed at or blooming: several hundred labels would bury the mosaic
      // they are meant to be describing.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = '300 12px ui-sans-serif, system-ui, -apple-system, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,.85)';
      ctx.shadowBlur = 6;
      for (const [t, , , , , age] of lit) {
        if (t.selected && t !== hoverTile && age >= FLASH_HOLD_MS) continue;
        if (!t.person) continue;
        ctx.fillStyle = t === hoverTile ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.72)';
        ctx.fillText(givenName(t.person.name), t.cx, t.cy + t.r + 5);
      }
      ctx.shadowBlur = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // ---- The rhythm ----
    let flashCursor = 0;
    function advanceMosaic() {
      let n = 0;
      for (const t of tiles) if (t.on && !t.selected) n++;
      if (!n) return;
      flashCursor = (flashCursor + FLASH_STRIDE) % n;
      let i = 0;
      for (const t of tiles) {
        if (!t.on || t.selected) continue;
        if (i++ !== flashCursor) continue;
        t.flashAt = performance.now();
        mosaicDirty = true;
        return;
      }
    }
    let mosaicTimer = null;
    function syncMosaicTimer() {
      const wanted = tiles.length > 0;
      if (wanted && !mosaicTimer) mosaicTimer = setInterval(advanceMosaic, FLASH_EVERY_MS);
      if (!wanted && mosaicTimer) { clearInterval(mosaicTimer); mosaicTimer = null; }
    }

    // A picked country re-deals its own faces every so often, so a country
    // with a dozen people in the roster and a hundred tesserae shows all of
    // them rather than the same twelve.
    let dealOffset = 0;
    let dealTimer = null;
    function syncDealTimer() {
      const any = tiles.some(t => t.selected);
      if (any && !dealTimer) {
        dealTimer = setInterval(() => {
          dealOffset++;
          for (const t of tiles) if (t.selected) dealFace(t, dealOffset);
          mosaicDirty = true;
          runTimerBar(0);
        }, FACE_DWELL);
        runTimerBar(0);
      }
      if (!any && dealTimer) {
        clearInterval(dealTimer); dealTimer = null;
        dealOffset = 0;
        for (const t of tiles) dealFace(t, 0);
        stopTimerBar();
      }
    }

    // ---- Camera → the lat/lng it is over ----
    // Inverting three-globe's own placement formula (x = s·sin(90−lat)·cos(90−lng),
    // y = s·cos(90−lat), z = s·sin(90−lat)·sin(90−lng)) rather than trusting a
    // guess at its API.
    function camLatLng(pos) {
      const s = Math.hypot(pos.x, pos.y, pos.z) || 1;
      return [
        Math.asin(Math.max(-1, Math.min(1, pos.y / s))) / RAD,
        90 - Math.atan2(pos.z, pos.x) / RAD,
      ];
    }

    // ---- Picking a face ----
    function tileAt(x, y) {
      let best = null, bestD = Infinity;
      for (const t of tiles) {
        if (!t.on) continue;
        const d = Math.hypot(x - t.cx, y - t.cy);
        if (d < t.r && d < bestD) { bestD = d; best = t; }
      }
      return best;
    }

    // globe.gl watches pointerup on the same container and defers its own
    // click to a requestAnimationFrame, so a listener added here runs first
    // whatever the registration order — no stopPropagation needed. Blocking
    // the event instead would stand a chance of stranding OrbitControls
    // mid-drag, since it captures the pointer on the canvas underneath.
    let faceClickHandled = false;
    let pointerDownAt = null;
    const DRAG_SLOP = 6;            // px of travel that still counts as a click

    function hostXY(ev) {
      const host = globeInstance && globeInstance._el;
      if (!host) return null;
      const rect = host.getBoundingClientRect();
      return [ev.clientX - rect.left, ev.clientY - rect.top];
    }
    function onGlobePointerDown(ev) {
      // From here on the camera is theirs — a late answer from the IP lookup
      // or the device must not yank the globe out from under a drag.
      globeUntouched = false;
      faceClickHandled = false;
      pointerDownAt = { x: ev.clientX, y: ev.clientY };
    }
    function onGlobePointerMove(ev) {
      if (!tiles.length) return;
      const at = hostXY(ev);
      const was = hoverTile;
      hoverTile = at ? tileAt(at[0], at[1]) : null;
      if (hoverTile !== was) mosaicDirty = true;
    }
    function onGlobePointerUp(ev) {
      if (ev.button !== 0 || !tiles.length) return;
      // A drag that ends over a face is still a drag.
      if (pointerDownAt && Math.hypot(ev.clientX - pointerDownAt.x, ev.clientY - pointerDownAt.y) > DRAG_SLOP) return;
      const at = hostXY(ev);
      if (!at) return;
      const t = tileAt(at[0], at[1]);
      if (!t || !t.person) return;
      // Either way this gesture is spoken for, so the polygon handler under it
      // stands down rather than also toggling the country.
      faceClickHandled = true;
      // A tessera is a person, not a place. The land around it is the way to
      // pick a country, which is what the polygon handler is for.
      openPerson(t.person);
    }

    // ---- Slideshow timer ----
    // One bar across the top, under the masthead: only a picked country is
    // re-dealing, and the top edge is where a thing that applies to the whole
    // screen belongs.
    let mosTimerBar = null;
    function ensureMosaicTimer() {
      if (mosTimerBar || !mosRoot) return mosTimerBar;
      mosTimerBar = document.createElement('div');
      mosTimerBar.className = 'mos__timer';
      mosTimerBar.style.setProperty('--face-dwell', FACE_DWELL + 'ms');
      mosRoot.appendChild(mosTimerBar);
      return mosTimerBar;
    }
    // Removing the class and forcing a reflow before re-adding it is what makes
    // the animation replay; without the reflow the browser coalesces the two
    // changes and nothing moves.
    function runTimerBar(delayMs) {
      const bar = ensureMosaicTimer();
      if (!bar) return;
      bar.classList.remove('is-running');
      bar.style.animationDelay = '';
      void bar.offsetWidth;
      if (delayMs) bar.style.animationDelay = delayMs + 'ms';
      bar.classList.add('is-running');
    }
    function stopTimerBar() {
      if (mosTimerBar) mosTimerBar.classList.remove('is-running');
    }

    // ---- The frame loop ----
    let mosaicRaf = null;
    let lastCamKey = '';
    function runMosaicLoop() {
      if (!tiles.length) { mosaicRaf = null; lastCamKey = ''; return; }
      mosaicRaf = requestAnimationFrame(runMosaicLoop);
      const host = globeInstance && globeInstance._el;
      if (!host) return;
      let cam;
      try { cam = globeInstance.camera(); } catch { return; }
      const pos = cam && cam.position;
      if (!pos) return;
      const dist = Math.hypot(pos.x, pos.y, pos.z);
      if (!(dist > GLOBE_R)) return;
      // Whatever is under the middle of the screen decides how fast the globe
      // turns. Ahead of the early return below, so the speed keeps easing on a
      // frame where nothing needs redrawing.
      const centre = camLatLng(pos);
      updateSpinRate(centre[0], centre[1]);
      // The globe turns on its own, so the camera is almost never still — but
      // when it is, and nothing has bloomed or been pointed at, the last frame
      // is still the right one.
      const key = [pos.x, pos.y, pos.z, popAlt.value, host.clientWidth, host.clientHeight]
        .map(n => n.toFixed(3)).join(',');
      const fading = tiles.some(t => performance.now() - t.flashAt < FLASH_HOLD_MS);
      if (key === lastCamKey && !mosaicDirty && !fading) return;
      lastCamKey = key;
      mosaicDirty = false;
      const camDir = toVec(centre);
      const horizonAngle = Math.acos(Math.max(-1, Math.min(1, GLOBE_R / dist)));
      drawMosaic(camDir, horizonAngle);
    }
    function startMosaicLoop() {
      if (mosaicRaf == null && tiles.length) mosaicRaf = requestAnimationFrame(runMosaicLoop);
    }

    function clearMosaic() {
      tiles.length = 0;
      hoverTile = null;
      if (mosCtx && mosCanvas) {
        mosCtx.setTransform(1, 0, 0, 1, 0, 0);
        mosCtx.clearRect(0, 0, mosCanvas.width, mosCanvas.height);
      }
    }

    // The whole land is laid at once and left alone. Picking a country doesn't
    // turn its patch on — it lifts the country, frames the camera on it and
    // brings its tesserae up into colour.
    function syncMosaic() {
      if (!globeInstance) return;
      clearMosaic();
      if (!ensureMosaicRoot()) { syncMosaicTimer(); return; }
      loadAtlas();
      buildTiles();
      for (const t of tiles) t.selected = isCountryOn(t.country);
      syncMosaicTimer();
      syncDealTimer();
      mosaicDirty = true;
      lastCamKey = '';        // force a draw on the next frame
      startMosaicLoop();
    }

    // Picking a country changes which tesserae are lit, not which ones exist —
    // so flip the flags rather than re-laying the whole mosaic on every click.
    function syncMosaicSelection() {
      for (const t of tiles) t.selected = isCountryOn(t.country);
      syncDealTimer();
      mosaicDirty = true;
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
        // Outlines are what the lattice is sorted against, so this is the
        // earliest the mosaic can be laid — the land becomes faces here,
        // before anyone touches anything.
        syncMosaic();
      } catch (err) {
        console.error('[famous Baby] country outlines failed:', err);
      }
    }

    // How fast the globe turns when nobody is holding it. Halved from 0.28 —
    // at that speed a country you had just flown to had visibly drifted by the
    // time you finished reading the card next to it.
    const SPIN_SPEED = 0.14;
    // ---- Faster over water ----
    // Everything this site is about is on the land. The Pacific is most of a
    // hemisphere with nothing on it, and at one speed it is most of a
    // hemisphere of waiting. So the globe hurries across the empty stretches
    // and slows again when a coast comes under the middle of the screen.
    //
    // It eases rather than switches: a coastline should read as the globe
    // slowing down to look at something, not as a gear change. Measured, this
    // rate takes 51 frames — a little under a second — to get nine tenths of
    // the way up to ocean speed, and the same to settle back on a coast.
    const OCEAN_SPIN = 18;
    // Slow to wind up, quick to stop. At full speed the globe crosses one of
    // the cells below in a third of a second, so a single easing gentle enough
    // to make leaving a coast feel unhurried would carry it most of the way
    // across the next country before it had slowed down. Braking is nearly
    // three times as sharp as accelerating, which is also how it reads: the
    // globe drifts up to speed over an empty ocean and catches itself on land.
    // Softened, both ways. These are the fraction of the remaining gap closed
    // each frame between the land speed and the ocean one, and at 0.045/0.12
    // the globe visibly lurched as a coast went by — it read as a stutter in
    // the animation rather than as the world easing on once the faces ran out.
    const SPIN_EASE_UP = 0.020;
    const SPIN_EASE_DOWN = 0.045;
    // What slows the globe down is something to look at, not land as such. The
    // first version asked the coastline, and the coastline is a poor judge:
    // one rock in the middle of the Pacific put the brakes on for a landmass
    // with nobody on it, while a shelf of Antarctic ice counted for as much as
    // Italy. So it asks the mosaic instead — where the faces are.
    //
    // It asks about the five degrees under the middle of the screen, and asks
    // for two faces in them. Both numbers were picked by simulating a lap
    // against the real mosaic rather than guessed: looking ten degrees either
    // way, which sounded like sensible margin, dropped a lap at the equator
    // from 83% open water to 26% — the wide net caught something nearly
    // everywhere and the globe hardly ever got up to speed.
    //
    // The easing is what stops a single cell boundary reading as a jolt,
    // rather than the cell being large enough to smooth it.
    const SPIN_CELL = 5;             // degrees to a cell
    const SPIN_LOOK = 0;             // cells either way beyond that one
    const SPIN_FACES_MIN = 2;        // fewer faces than this and it is open sea
    let faceGrid = null;
    function cellKey(lat, lng) {
      const lo = ((lng + 180) % 360 + 360) % 360 - 180;
      return (Math.floor(lat / SPIN_CELL) + 40) * 200 + (Math.floor(lo / SPIN_CELL) + 40);
    }
    function buildFaceGrid() {
      faceGrid = new Map();
      for (const t of tiles) {
        const k = cellKey(t.lat, t.lng);
        faceGrid.set(k, (faceGrid.get(k) || 0) + 1);
      }
    }
    function facesNear(lat, lng) {
      let n = 0;
      for (let i = -SPIN_LOOK; i <= SPIN_LOOK; i++) {
        for (let j = -SPIN_LOOK; j <= SPIN_LOOK; j++) {
          n += faceGrid.get(cellKey(lat + i * SPIN_CELL, lng + j * SPIN_CELL)) || 0;
          if (n >= SPIN_FACES_MIN) return n;
        }
      }
      return n;
    }
    let spinRate = 1;
    function updateSpinRate(lat, lng) {
      // The grid does not exist until the mosaic has been laid. Before that,
      // one speed.
      if (!globeInstance || !faceGrid) return;
      let c;
      try { c = globeInstance.controls(); } catch { return; }
      // Nothing to modulate while the globe is being held, or parked behind an
      // open card — setGlobeSpin owns the speed then.
      if (!c || !('autoRotate' in c) || !c.autoRotate) { spinRate = 1; return; }
      const target = facesNear(lat, lng) >= SPIN_FACES_MIN ? 1 : OCEAN_SPIN;
      spinRate += (target - spinRate) * (target < spinRate ? SPIN_EASE_DOWN : SPIN_EASE_UP);
      c.autoRotateSpeed = SPIN_SPEED * spinRate;
    }

    // Stop and start the idle spin. Through a helper because the controls
    // object is rebuilt every time the globe is, so only one place should have
    // to know how this build spells it.
    function setGlobeSpin(on) {
      if (!globeInstance) return;
      try {
        const c = globeInstance.controls();
        if ('autoRotate' in c) { c.autoRotate = !!on; c.autoRotateSpeed = SPIN_SPEED; }
      } catch {}
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
        // The globe turns on its own — slowly, the way a globe on a stand does
        // when someone has just let go of it. Dragging still overrides it, and
        // it starts stopped if a card is already up, since a rebuild would
        // otherwise hand the spin back behind the card's back.
        if ('autoRotate' in c) {
          c.autoRotate = !selectedPerson.value;
          c.autoRotateSpeed = SPIN_SPEED;
        }
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
      el.addEventListener('pointermove', onGlobePointerMove);
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
      if (mosaicTimer) { clearInterval(mosaicTimer); mosaicTimer = null; }
      if (dealTimer) { clearInterval(dealTimer); dealTimer = null; }
      if (mosaicRaf != null) { cancelAnimationFrame(mosaicRaf); mosaicRaf = null; }
      clearMosaic();
      if (mosRoot) { mosRoot.remove(); mosRoot = null; mosCanvas = null; mosCtx = null; mosTimerBar = null; }
      const el = globeInstance._el;
      if (el) {
        el.removeEventListener('pointerdown', onGlobePointerDown);
        el.removeEventListener('pointermove', onGlobePointerMove);
        el.removeEventListener('pointerup', onGlobePointerUp);
        el.innerHTML = '';
      }
      globeInstance = null;
    }

    // ---- How common the name is, and has been ----
    // Two registers, because a baby and a dog are named from different books:
    // US births from the Social Security Administration, and New York City dog
    // licences. Both are real counts and both are partial — the card names its
    // source rather than implying it speaks for the world.
    // The chart is opened from the OG button rather than shown by default:
    // it is a second thing to read about a name, not the first.
    const showNameChart = ref(false);
    // The name sheet: the given name on its own — what it means, its
    // whole run, and who else here answers to it. A drawer over the
    // card rather than a page of its own, since it is a detour off the
    // card and you have to come back to where you were.
    const nameOpen = ref(false);
    const petMode = ref(localStorage.getItem('fb.petMode') === '1');
    function togglePetMode() {
      petMode.value = !petMode.value;
      try { localStorage.setItem('fb.petMode', petMode.value ? '1' : '0'); } catch {}
    }
    const nameSource = computed(() => NAME_SOURCES[petMode.value ? 'pet' : 'baby']);


    // The roster writes "Zinédine"; the registers write "ZINEDINE". Folded the
    // same way names.js was keyed.
    const foldName = (s) => String(s || '')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    // What the name *is*, as against how often it was given. English
    // Wiktionary writes these as a proper-noun sense on the name's own page —
    // "A female given name from Shona" — which is already the sentence the
    // card wants. Keyed by the same fold as the registers above.
    const nameOriginEntry = computed(() => {
      const p = selectedPerson.value;
      if (!p) return null;
      return NAME_ORIGINS[foldName(givenName(p.name))] || null;
    });
    const nameOrigin = computed(() => (nameOriginEntry.value || {}).s || '');
    // The page the sentence was taken off, not a guess at how to spell it —
    // the fetcher stores the title it actually resolved, so this can't land on
    // a Wiktionary search for a name with an accent in it.
    const nameOriginLink = computed(() => {
      const t = (nameOriginEntry.value || {}).t;
      return t ? 'https://en.wiktionary.org/wiki/' + encodeURIComponent(t) : '';
    });

    // ---- Where the bio came from ----
    // Every entry here was written off Wikipedia, and until now the card took
    // that and said nothing about it. The article was verified at build time
    // by finding the person's birth year in its opening paragraph, so this is
    // a link to the right article rather than a search for their name.
    //
    // No `noreferrer`. The point of the link is to send readers *and* the
    // credit that comes with them — strip the referrer and Wikipedia sees the
    // traffic arrive from nowhere. `noopener` alone is the safety part.
    const personSource = computed(() => {
      const p = selectedPerson.value;
      const t = p && WIKI[p.id];
      return t ? 'https://en.wikipedia.org/wiki/' + encodeURIComponent(t.replace(/ /g, '_')) : '';
    });

    const nameSeries = computed(() => {
      const p = selectedPerson.value;
      if (!p) return null;
      const table = petMode.value ? PET_NAMES : BABY_NAMES;
      return table[foldName(givenName(p.name))] || null;
    });

    // A path across a fixed box, so the card can draw it at any size. The
    // vertical scale is the name's own peak: this is the shape of a name's
    // life, not a comparison between names, and against Mary or Taylor every
    // other line would be flat on the floor.
    const NAME_CHART = { w: 260, h: 54 };
    const nameChart = computed(() => {
      const s = nameSeries.value;
      if (!s || !s.v.length) return null;
      const v = s.v;
      const peak = Math.max(...v);
      if (!(peak > 0)) return null;
      const lastYear = s.s + v.length - 1;
      const stepX = v.length > 1 ? NAME_CHART.w / (v.length - 1) : 0;
      const y = (n) => NAME_CHART.h - (n / peak) * (NAME_CHART.h - 2) - 1;
      let d = '';
      v.forEach((n, i) => { d += (i ? 'L' : 'M') + (i * stepX).toFixed(1) + ' ' + y(n).toFixed(1); });
      // Closed along the bottom so it can be filled as well as stroked.
      const area = d + 'L' + NAME_CHART.w + ' ' + NAME_CHART.h + 'L0 ' + NAME_CHART.h + 'Z';
      let peakAt = 0;
      v.forEach((n, i) => { if (n > v[peakAt]) peakAt = i; });
      return {
        line: d, area, w: NAME_CHART.w, h: NAME_CHART.h,
        from: s.s, to: lastYear,
        peakYear: s.s + peakAt,
        peakX: (peakAt * stepX).toFixed(1),
        peakY: y(v[peakAt]).toFixed(1),
        // Parts per million reads as nothing to anyone; per-million-births is
        // the same number said out loud.
        peakLabel: petMode.value
          ? v[peakAt] + (v[peakAt] === 1 ? ' dog' : ' dogs')
          : (v[peakAt] >= 1000
              ? (v[peakAt] / 10000).toFixed(1) + '% of births'
              : v[peakAt] + ' per million'),
      };
    });

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
    // A browser arriving for the first time arrives at the door, not inside:
    // the gate is the first thing anyone sees, so nothing may be logged in
    // ahead of it. The stored shape is { user, guest } — a null user with
    // guest true is someone who chose to look around without an account, and
    // shouldn't be stopped at the gate a second time.
    let sessionGuest = false;
    function loadSession() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_SESSION) || 'null');
        sessionGuest = !!(saved && saved.guest);
        return saved && saved.user ? saved.user : null;
      } catch { return null; }
    }
    const sessionUser = ref(loadSession());
    const isLoggedIn = computed(() => !!sessionUser.value);
    function persistSession() {
      try {
        localStorage.setItem(STORAGE_SESSION, JSON.stringify({
          user: sessionUser.value,
          guest: guestPass.value,
        }));
      } catch {}
    }
    // What the app is, for anyone who lands on a globe with no explanation.
    // It's information and nothing else now, and it no longer leads the load:
    // the gate below is what a stranger meets first, so this sheet only ever
    // opens because the (i) in the title bar was asked for.
    const aboutOpen = ref(false);
    function closeAbout() { aboutOpen.value = false; }
    function openAbout() { aboutOpen.value = true; }

    // ---- The gate ----
    // The first screen for anyone this browser doesn't already know: the
    // wordmark, a line about what this is, and the two doors. The globe keeps
    // turning behind it, because the thing being offered should be visible
    // from the step. "Look around first" is a real way past — this is a
    // reference book, and a reference book that won't open is no use to
    // anyone — and the choice is remembered, so nobody is asked twice.
    const guestPass = ref(sessionGuest);
    const gateOpen = ref(!sessionUser.value && !sessionGuest);
    function skipGate() {
      guestPass.value = true;
      gateOpen.value = false;
      persistSession();
    }

    // The email door. Still no server behind it, so logging in this way is a
    // name this browser agrees to hold — see the sheet, which says as much.
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
    // The email sheet stands in front of the gate rather than on top of it,
    // so the two never have to argue about which is above the other.
    function gateEmail() {
      gateOpen.value = false;
      openLogin();
    }
    function closeLogin() {
      loginOpen.value = false;
      // Backing out of the email door puts you back at the gate you came
      // through, not on a globe you never chose to be let onto.
      if (!sessionUser.value && !guestPass.value) gateOpen.value = true;
    }

    // ---- Google ----
    // Google Identity Services, loaded only if a client ID was filled in at
    // the top of this file. What comes back is a signed ID token; with no
    // server on the other side there is nothing here that can check that
    // signature, so what we do is read the name and address out of the
    // payload and take Google's word for it. That is exactly as much trust as
    // the email box gets — this is a way of not typing, not a lock. The day
    // there's a backend, `res.credential` is the thing you send it, and the
    // backend is what verifies it.
    const googleOn = !!GOOGLE_CLIENT_ID;
    const googleReady = ref(false);
    const googleError = ref('');
    const gateGoogleBtn = ref(null);
    const loginGoogleBtn = ref(null);
    let gsiLoading = null;

    function loadGsi() {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        return Promise.resolve(true);
      }
      if (!gsiLoading) {
        gsiLoading = new Promise((resolve) => {
          const s = document.createElement('script');
          s.src = 'https://accounts.google.com/gsi/client';
          s.async = true;
          s.defer = true;
          s.onload = () => resolve(true);
          s.onerror = () => {
            googleError.value = "Google's sign-in didn't load. The email door still works.";
            resolve(false);
          };
          document.head.appendChild(s);
        });
      }
      return gsiLoading;
    }

    // The middle third of an ID token: base64url-encoded UTF-8 JSON. Decoded
    // through TextDecoder rather than atob alone, or every accented name in
    // the world comes back as mojibake.
    function readIdToken(token) {
      try {
        const part = String(token).split('.')[1];
        const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
      } catch { return null; }
    }

    function onGoogleCredential(res) {
      const claims = readIdToken(res && res.credential);
      if (!claims || !claims.email) {
        googleError.value = "Google didn't say who that was. Try the email door.";
        return;
      }
      signIn({
        email: claims.email,
        name: claims.name || claims.given_name || claims.email.split('@')[0],
        picture: claims.picture || '',
        via: 'google',
      });
    }

    // Google draws its own button rather than us drawing one: it's the
    // supported way in, and the black pill sits on these sheets without an
    // argument. Called again each time a sheet opens, because a button drawn
    // into a hidden box can come out the wrong width.
    async function mountGoogleButton(box) {
      if (!googleOn || !box) return;
      if (!(await loadGsi())) return;
      const gid = window.google.accounts.id;
      if (!googleReady.value) {
        gid.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: onGoogleCredential,
          use_fedcm_for_prompt: true,
          auto_select: false,
        });
        googleReady.value = true;
      }
      box.innerHTML = '';
      gid.renderButton(box, {
        type: 'standard',
        theme: 'filled_black',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        logo_alignment: 'center',
        width: 260,
      });
    }
    watch(gateOpen, (open) => {
      if (open) nextTick(() => mountGoogleButton(gateGoogleBtn.value));
    });
    watch(loginOpen, (open) => {
      if (open) nextTick(() => mountGoogleButton(loginGoogleBtn.value));
    });
    onMounted(() => { if (gateOpen.value) mountGoogleButton(gateGoogleBtn.value); });

    // ---- Being let in ----
    // One arrival, two keys: the email box and Google both end up here.
    function signIn(user) {
      sessionUser.value = user;
      guestPass.value = false;
      persistSession();
      loginError.value = '';
      googleError.value = '';
      loginOpen.value = false;
      gateOpen.value = false;
      aboutOpen.value = false;
      // A name at the door is a name for the profile, unless one's already there.
      const first = profile.value.searchers[0];
      if (first && !first.name && user.name) first.name = user.name;
    }
    function submitLogin() {
      const email = loginEmail.value.trim();
      // Not validation for a server's sake — nothing is sent anywhere. It's
      // only enough to be sure the address is the one you meant to be known by.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        loginError.value = 'That address is missing something.';
        return;
      }
      signIn({ email, name: loginName.value.trim() || email.split('@')[0], via: 'email' });
    }
    // Logging out ends the session and nothing else: the shortlist, the saved
    // searches and the profile stay put, waiting for the way back in. Clearing
    // them is its own deliberate button in settings. It puts the gate back up,
    // guest pass included — logging out is not the same as looking around.
    function logOut() {
      sessionUser.value = null;
      guestPass.value = false;
      persistSession();
      confirmSignOut.value = false;
      menuOpen.value = false;
      loginOpen.value = false;
      aboutOpen.value = false;
      gateOpen.value = true;
      // And don't let Google walk straight back in on the next load.
      try { window.google.accounts.id.disableAutoSelect(); } catch {}
    }
    // The account sheet's preferences explain themselves behind an (i) rather
    // than in a paragraph under the form.
    const prefsInfoOpen = ref(false);

    // Which face of the account sheet is showing.
    const menuView = ref('root');            // root | favorites | searches | settings
    // It used to take a second argument that opened the sheet with the
    // log-out question already asked, which was how the account screen's
    // "Log out" reached a confirm three groups down the settings page. The
    // confirm is where the button is now, so there is nothing left to arm.
    function openMenu(view) {
      menuView.value = view;
      menuOpen.value = true;
    }
    watch(menuOpen, (open) => {
      if (open) return;
      menuView.value = 'root';
      // Closing the sheet is an answer of "not now" to either question. Left
      // set, they'd be waiting mid-confirm the next time it opened.
      confirmSignOut.value = false;
      confirmForget.value = false;
    });

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
    // Forgetting the device is the one thing here that can't be undone, so it
    // gets a question of its own rather than firing on the first tap.
    const confirmForget = ref(false);
    // Wiping the browser clean: everything this device holds, session included.
    // Distinct from logging out, which only closes the session behind you.
    function forgetThisDevice() {
      confirmForget.value = false;
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
    //
    // initGlobe is async and can throw: it ends in three.js asking for a WebGL
    // context, and a browser is entitled to refuse. Brave's fingerprinting
    // protection is the one that does it in practice. Unhandled, that throw
    // became an unhandled rejection, which the catcher in index.html paints
    // over the whole page — so a browser declining one feature took the site
    // down with it.
    //
    // The globe is not the site. The search, the lists, the drawers and the
    // cards are all reachable without it, so a globe that cannot start says so
    // where the globe would have been and gets out of the way.
    function globeFailed(err) {
      console.error('[famous Baby] the globe could not start:', err);
      const el = document.getElementById('globe-canvas');
      if (!el || el.querySelector('.globe-out')) return;
      const note = document.createElement('p');
      note.className = 'globe-out';
      note.textContent = 'The globe needs WebGL, and this browser would not give it one. '
        + 'Everything else works: search below, or open the menu for the callings.';
      el.appendChild(note);
    }
    function ensureGlobe() {
      if (globeInstance) return;
      if (window.Globe) { initGlobe().catch(globeFailed); return; }
      const start = Date.now();
      const tick = () => {
        if (window.Globe) initGlobe().catch(globeFailed);
        else if (Date.now() - start < 8000) setTimeout(tick, 100);
        // The bundle never arrived — blocked, or the CDN is down. Same story
        // as a refused context from the page's point of view.
        else globeFailed(new Error('globe.gl did not load within 8s'));
      };
      tick();
    }
    onMounted(() => nextTick(() => {
      // Open on the visitor's own part of the world rather than a blank screen.
      // This runs before the globe exists, which is deliberate: it parks
      // HOME_VIEW there, so initGlobe's opening move lands on it unaided.
      openingGlobeView();
      ensureGlobe();
      // Both skipped while the opening view is pinned: they would otherwise
      // pull the camera off it a moment after it arrives. The IP goes first
      // because it always has an answer; the device only speaks if permission
      // was granted in some earlier session, and is the better answer when it
      // does, so it lands last on purpose.
      if (!OPENING_OVERRIDE) { refineHomeFromIp(); refineHomeFromDevice(); }
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
    watch(selectedCountries, () => { repaintPolygons(); syncMosaicSelection(); }, { deep: true });
    // Every polygon height is a fraction of popAlt, and so is where the
    // slideshow stands — so a re-framing has to redraw both, including the
    // paths that move the camera without changing the selection (opening a
    // person's card, say).
    watch(popAlt, () => {
      repaintPolygons();
      // A picked country's tesserae ride its plinth, so a new height means the
      // mosaic has to be re-placed on the next frame.
      lastCamKey = '';
      mosaicDirty = true;
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
    // Where the globe was standing when the card went up, so backing out of it
    // is a way back rather than a way home. Only taken when no card is open
    // yet: a name tag inside one card opens another, and the way back from
    // that is still the globe you left, not the country of the card in
    // between.
    let viewBeforeCard = null;
    function openPerson(p) {
      if (!selectedPerson.value && globeInstance) {
        try { viewBeforeCard = globeInstance.pointOfView(); } catch { viewBeforeCard = null; }
      }
      selectedPerson.value = p;
      // A name in the sheet opens that person's card, and the sheet was about
      // the name we came from — so it stands down rather than following along.
      nameOpen.value = false;
      // The camera drops in on their birth country and the spin stops, so the
      // globe holds still while the card is up.
      // Their country, framed the same way a picked one is — but not picked:
      // the full-screen zoom and the slideshow belong to clicking a country,
      // and opening a card is a different errand.
      if (p && p.country) flyToCountry(p.country, 1);
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
      nameOpen.value = false;
      clearYears();
      // Back to the globe you were looking at, not to the one you arrived on.
      // resetGlobeView flies home — which is the country the IP guessed for
      // you — and having crossed the world to read about somebody, being put
      // back on your own doorstep for closing the card is a long way to be
      // sent for pressing Back.
      if (viewBeforeCard) {
        const back = viewBeforeCard;
        viewBeforeCard = null;
        try {
          // The same restoring resetGlobeView does: a close-up country leaves
          // the polygon heights and the atmosphere where it found them.
          applyFramedAltitude(back.altitude);
          globeInstance.pointOfView({ ...back }, 700);
          syncLabelScaleTo(back.altitude);
          return;
        } catch {}
      }
      resetGlobeView();
    }

    // A card up means the globe holds still. Watched rather than written into
    // openPerson and closePerson, because the card also opens from a tag inside
    // another card, and closes from Esc, from the back arrow and from any
    // filter change — one watch covers all of them and can't fall out of step
    // with a path somebody adds later.
    watch(selectedPerson, (p) => setGlobeSpin(!p));

    // Touching any filter — typing, a category, the timeline, a country, the
    // heart — puts the three-name list back in front of the user. If a card
    // was open it steps aside so the new result set is visible.
    watch(
      [query, selectedFields, selectedSubfields, selectedGenders,
       yearMin, yearMax, selectedCountries, selectedBornMonths, selectedBornDays,
       selectedZodiacs, onlyFavorites, bornTodayActive],
      () => {
        // Not closePerson() — that also pulls the globe back out, and a filter
        // change has its own camera move. The name sheet belonged to the card,
        // so it goes with it either way.
        if (selectedPerson.value) selectedPerson.value = null;
        // This path moves the camera itself, so the way back the card was
        // holding is spent — dropped here rather than left to go stale.
        viewBeforeCard = null;
        nameOpen.value = false;
        hitsExpanded.value = false;
        nextTick(resetDial);
      }
    );

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
      // Innermost first: the login sheet stands in front of the gate.
      if (loginOpen.value) closeLogin();
      else if (gateOpen.value) skipGate();
      else if (randomOpen.value) randomOpen.value = false;
      else if (nameOpen.value) nameOpen.value = false;
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

    // Everyone in the roster called the same thing. Stricter than the card's
    // "Name match" row, which counts a middle name as a name: the sheet is
    // headed by the first name, so a Marie who is only somebody's middle name
    // would be standing under a heading that doesn't describe her.
    const nameSharers = computed(() => {
      const p = selectedPerson.value;
      if (!p) return [];
      const mine = firstName(p.name);
      if (!mine) return [];
      return PEOPLE
        .filter(o => o.id !== p.id && firstName(o.name) === mine)
        .sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0));
    });

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
      // Every row but the origin, which is a sentence rather than a list of
      // tags. capRows measures the first *element* child to work out a row's
      // height, and the origin's is its little source credit — so a two-line
      // sentence measures as taller than two rows and gets railed sideways
      // into a horizontal scroller.
      for (const dd of root.querySelectorAll('.kdl dd:not(.kdl__origin)')) {
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
      petMode, togglePetMode, nameSource, nameChart, givenName, showNameChart,
      nameOpen, nameSharers,
      nameOrigin, nameOriginLink, personSource,
      miniOutline, miniAdmin, miniView, miniFrame, miniMarker,
      miniCities,
      selectedBornMonths, selectedBornDays, selectedZodiacs, ZODIACS,
      toggleBornMonth, toggleBornDay, toggleZodiac,
      isBornMonthSelected, isBornDaySelected, isZodiacSelected,
      clearBornFilters,
      MONTH_NAMES, zodiacFor, zodiacIcon, zodiacWiki, formatBirthDate, daysInMonth,
      selectedChinese,
      // the random drawer
      randomEra, randomPlace, randomGender, randomCategory, randomEverything,
      // dock
      hitsExpanded, visibleHits, menuOpen, aboutOpen,
      hitsSize, setHitsSize, drawersFolded, unfoldDrawers,
      searchInput, runSearch,
      closeAbout, openAbout,
      // session
      sessionUser, isLoggedIn, loginOpen, openLogin, closeLogin, submitLogin, logOut,
      loginEmail, loginName, loginError,
      // the gate, and the Google door in it
      gateOpen, skipGate, gateEmail,
      googleOn, googleError, gateGoogleBtn, loginGoogleBtn,
      profile, hasProfile, profileSummary, startFromProfile, clearProfile,
      menuView, openMenu, prefsInfoOpen,
      savedSearches, saveCurrentSearch, applySavedSearch, deleteSavedSearch,
      searchLabel, isSearchSaved,
      clearSavedData, forgetThisDevice, confirmSignOut, confirmForget, nameMode,
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
