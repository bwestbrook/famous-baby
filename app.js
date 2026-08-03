// famous Baby — Vue 3 application
// Frontend-only for now: filtering runs entirely against the mock dataset.
// We keep the natural-language layer naive (token matching) so it's easy to
// swap in a real backend / LLM-backed query parser later.

console.log('[famous Baby] app.js loaded, importing modules…');

import { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'https://unpkg.com/vue@3.4.27/dist/vue.esm-browser.js';
import { MAJOR_CITIES, CITY_COORDS, REGION_COORDS } from './geo.js';
import { ADMIN1_LINES } from './admin1.js';

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
  'Honduras':       [15.2,  -86.2],
  'Barbados':       [13.2,  -59.5],
  'Martinique':     [14.6,  -61.0],
};
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
      person.name, person.stageName || '', person.birthPlace, person.country,
      person.field, person.subfield,
      teamText, awardText, collabText, person.bio,
      String(person.birthYear),
    ].join(' ').toLowerCase(),
    parts: {
      name: (person.name + ' ' + (person.stageName || '')).toLowerCase(),
      place: (person.birthPlace + ' ' + person.country).toLowerCase(),
      field: (person.field + ' ' + person.subfield).toLowerCase(),
      teams: teamText.toLowerCase(),
      awards: awardText.toLowerCase(),
      collaborators: collabText.toLowerCase(),
      bio: person.bio.toLowerCase(),
    },
  };
}

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
    const YEAR_FLOOR = 1400;
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
    const selectedCountry = ref('');
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

    function selectGlobeCountry(c) {
      selectedCountry.value = (selectedCountry.value === c) ? '' : c;
    }
    function clearCountry() { selectedCountry.value = ''; }

    // Countries ranked by how many people the dataset has from each — the
    // "Places" panel list, and the source of the bar widths in it.
    const countryList = computed(() =>
      [...globeData.value].sort((a, b) => b.count - a.count || a.country.localeCompare(b.country))
    );
    const countryMax = computed(() =>
      countryList.value.reduce((m, c) => Math.max(m, c.count), 1)
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
    function syncLabelScale(altitude) {
      if (!globeInstance) return;
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

    // Fly the camera to a country the way Earth does: stop the spin, ease in.
    function flyToCountry(country, altitude = 0.85) {
      const coords = COUNTRY_COORDS[country];
      if (!coords || !globeInstance) return;
      try {
        globeInstance.pointOfView({ lat: coords[0], lng: coords[1], altitude }, 900);
        syncLabelScaleTo(altitude);
      } catch {}
    }

    // Picking a place from the list (or from a knowledge card) both filters
    // and moves the camera. Re-picking the active country clears the filter
    // but keeps the camera where it is.
    function pickCountry(country) {
      if (!country) return;
      const wasSelected = selectedCountry.value === country;
      selectGlobeCountry(country);
      if (!wasSelected) flyToCountry(country);
    }

    // Where the globe opens, picked once per load. Drawing from MAJOR_CITIES
    // rather than random coordinates means it always faces somewhere inhabited
    // — most of a random lat/lng is ocean.
    const HOME_VIEW = (() => {
      const c = MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
      return c ? { lat: c.lat, lng: c.lng, altitude: 2.4 } : { lat: 20, lng: 0, altitude: 2.4 };
    })();

    // Somewhere else entirely — re-rolls the opening view, so whatever the
    // camera comes "back" to afterwards is the new place too.
    // Spin to somewhere else and filter to it, so the throw always lands on
    // names. Only countries the roster actually has are in the draw, and the
    // one you're already looking at is excluded.
    function randomGlobeView() {
      const pool = countryList.value.filter(
        c => COUNTRY_COORDS[c.country] && c.country !== selectedCountry.value
      );
      if (!pool.length) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const coords = COUNTRY_COORDS[pick.country];
      HOME_VIEW.lat = coords[0];
      HOME_VIEW.lng = coords[1];
      selectedCountry.value = pick.country;
      flyToCountry(pick.country);
    }

    // Pull the camera back out to the view this session started on.
    function resetGlobeView() {
      if (!globeInstance) return;
      try {
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
      if (entry.country === selectedCountry.value) return 'rgba(253,214,99,0.45)';
      if (d === hoveredPoly.value) return 'rgba(138,180,248,0.40)';
      return 'rgba(138,180,248,0.13)';
    }
    function polyStrokeColor(d) {
      const entry = polyEntry(d);
      if (entry && entry.country === selectedCountry.value) return '#FDD663';
      if (!entry) return 'rgba(255,255,255,0.16)';
      return d === hoveredPoly.value ? '#CFE0FF' : 'rgba(160,196,255,0.7)';
    }
    function polyAltitude(d) {
      const entry = polyEntry(d);
      if (!entry) return 0.004;
      if (entry.country === selectedCountry.value || d === hoveredPoly.value) return 0.015;
      return 0.007;
    }
    function repaintPolygons() {
      if (!globeInstance) return;
      globeInstance
        .polygonCapColor(polyCapColor)
        .polygonStrokeColor(polyStrokeColor)
        .polygonAltitude(polyAltitude);
    }

    // Clicking a country selects it. Countries with nobody in the dataset are
    // inert — they're drawn for context, not as targets.
    function handlePolygonClick(d) {
      const entry = polyEntry(d);
      if (!entry) return;
      pickCountry(entry.country);
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
    const MINI_ZOOM_MIN = 0.35, MINI_ZOOM_MAX = 24;
    const MINI_TARGET_SPAN = 26;   // degrees across — comfortable for a city
    const miniAutoZoom = computed(() => {
      const v = miniView.value;
      if (!v) return 1;
      const span = Math.max(v.w, v.h);
      return Math.min(4, Math.max(1, span / MINI_TARGET_SPAN));
    });
    // Null until the user touches the buttons, so a card that opens before the
    // outlines finish loading still picks up the right default afterwards.
    const miniZoomOverride = ref(null);
    const miniZoom = computed(() =>
      miniZoomOverride.value === null ? miniAutoZoom.value : miniZoomOverride.value
    );
    function zoomMini(dir) {
      const next = miniZoom.value * (dir > 0 ? 1.6 : 1 / 1.6);
      miniZoomOverride.value = Math.min(MINI_ZOOM_MAX, Math.max(MINI_ZOOM_MIN, next));
    }
    // (the watch that clears the override per card lives with selectedPerson,
    // which is declared further down — watch() runs immediately, so it can't
    // sit here)

    // The frame actually rendered: the fitted box, scaled by the zoom and
    // centred on the birthplace so zooming in dives toward the person.
    const miniFrame = computed(() => {
      const v = miniView.value;
      if (!v) return null;
      const z = miniZoom.value;
      const w = v.w / z, h = v.h / z;
      const loc = birthLocation(selectedPerson.value);
      const fx = loc ? projX(loc.lng) : v.x + v.w / 2;
      const fy = loc ? projY(loc.lat) : v.y + v.h / 2;
      let x = fx - w / 2, y = fy - h / 2;
      // Zoomed in, hold the frame inside the country's own box; zoomed out,
      // there's nothing to clamp against, so just stay centred.
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
          .polygonSideColor(() => 'rgba(138,180,248,0.12)')
          .polygonStrokeColor(polyStrokeColor)
          .polygonCapColor(polyCapColor)
          .polygonAltitude(polyAltitude)
          .polygonsTransitionDuration(200)
          // No hover tooltip: the country lights up under the cursor, which is
          // all the feedback the globe needs.
          .polygonLabel(() => '')
          .onPolygonClick(handlePolygonClick)
          .onPolygonHover(d => {
            hoveredPoly.value = d || null;
            const el = globeInstance && globeInstance._el;
            if (el) el.style.cursor = (d && polyEntry(d)) ? 'pointer' : 'grab';
            repaintPolygons();
          });
        console.log('[famous Baby] country outlines loaded:', features.length);
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
        .pathColor(() => 'rgba(255,255,255,0.26)')
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
        c.minDistance = 110;   // just outside the sphere (radius ≈ 100)
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
      const el = globeInstance._el;
      if (el) el.innerHTML = '';
      globeInstance = null;
    }

    // ---- Bottom dock ----
    // The search line owns the bottom edge; hits stack directly above it. The
    // box is three rows tall and everything past that scrolls inside it, so a
    // long list never pushes the search line off the screen.
    const HITS_LIMIT = 3;      // rows visible at once — the box's height
    const HITS_MAX = 400;      // rows actually rendered; the rest need a filter
    const hitsExpanded = ref(false);

    // ---- Name order ----
    // Sorting and the A–Z jump read the same key, so the letter someone files
    // under is always the letter they're found at.
    const NAME_SUFFIXES = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv']);
    function surnameOf(person) {
      const parts = String((person && person.name) || '').trim().split(/\s+/);
      while (parts.length > 1 && NAME_SUFFIXES.has(parts[parts.length - 1].toLowerCase())) parts.pop();
      return parts[parts.length - 1] || '';
    }
    const STORAGE_NAMEMODE = 'fb-namemode-v1';
    const nameMode = ref((() => {
      try { return localStorage.getItem(STORAGE_NAMEMODE) || 'first'; } catch { return 'first'; }
    })());                                   // 'first' | 'middle' | 'last'
    watch(nameMode, (v) => { try { localStorage.setItem(STORAGE_NAMEMODE, v); } catch {} });
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
        return { person: r.person, letter, head };
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
    const refineOpen = ref(false);
    // Account / settings sheet behind the three-bar button in the title row.
    const menuOpen = ref(false);
    // Which face of the account sheet is showing.
    const menuView = ref('root');            // root | favorites | searches | settings
    function openMenu(view) { menuView.value = view; menuOpen.value = true; }
    watch(menuOpen, (open) => { if (!open) menuView.value = 'root'; });

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
        country: selectedCountry.value,
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
      selectedCountry.value = st.country || '';
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
    function signOut() {
      clearSavedData();
      clearAll();
      nameMode.value = 'first';
      confirmSignOut.value = false;
      menuOpen.value = false;
    }
    const refineCount = computed(() => typeFilterCount.value + timeFilterCount.value);

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
      // Open on a random country rather than a blank screen. This runs before
      // the globe exists, which is deliberate: it parks HOME_VIEW on that
      // country, so initGlobe's opening move lands there on its own.
      randomGlobeView();
      ensureGlobe();
      syncCatArrows();
    }));
    window.addEventListener('resize', syncCatArrows);
    onUnmounted(() => window.removeEventListener('resize', syncCatArrows));

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
      + selectedBornMonths.value.length
      + selectedBornDays.value.length
      + selectedZodiacs.value.length
      + (bornTodayActive.value ? 1 : 0)
    );
    onUnmounted(disposeGlobe);

    // Repaint the outlines whenever selection changes.
    watch(selectedCountry, repaintPolygons);

    // ---- Surprise Me — random person matching current filters ----
    function surpriseMe() {
      const pool = filtered.value;
      if (!pool || pool.length === 0) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      openPerson(pick.person);
    }

    // ---- Person info modal ----
    const selectedPerson = ref(null);
    // Each card opens at the country-fits-the-tile zoom.
    watch(selectedPerson, () => { miniZoomOverride.value = null; });
    function openPerson(p) {
      selectedPerson.value = p;
      // The camera drops in on their birth country and the spin stops, so the
      // globe holds still while the card is up.
      refineOpen.value = false;
      if (p && p.country) flyToCountry(p.country, 0.55);
      // Reset the per-person Q&A state whenever a different person opens.
      askOpen.value = false;
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
       yearMin, yearMax, selectedCountry, selectedBornMonths, selectedBornDays,
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
    const askOpen = ref(false);
    const askInput = ref('');
    const askAnswer = ref('');
    const askError = ref('');
    const askLoading = ref(false);

    function toggleAsk() {
      askOpen.value = !askOpen.value;
      if (askOpen.value) {
        askError.value = '';
        // Focus the input on next tick.
        setTimeout(() => {
          const el = document.querySelector('.modal__ask-input');
          if (el) el.focus();
        }, 0);
      }
    }

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
      if (menuOpen.value) menuOpen.value = false;
      else if (refineOpen.value) refineOpen.value = false;
      else if (selectedPerson.value) closePerson();
      else if (hitsExpanded.value) hitsExpanded.value = false;
    }
    onMounted(() => document.addEventListener('keydown', onKeydown));
    onUnmounted(() => document.removeEventListener('keydown', onKeydown));

    // ---- Pre-compute soundex / first-name index for similar-name lookup ----
    const NAME_INDEX = PEOPLE.map(p => ({
      person: p,
      first: firstName(p.name),
      sx: soundex(firstName(p.name)),
    }));
    function similarNamesFor(person) {
      if (!person) return { exact: [], similar: [] };
      const fn = firstName(person.name);
      const sx = soundex(fn);
      const exact = [];
      const similar = [];
      for (const n of NAME_INDEX) {
        if (n.person.id === person.id) continue;
        if (n.first === fn) exact.push(n.person);
        else if (n.sx === sx && n.first[0] === fn[0]) similar.push(n.person);
      }
      // Cap each list so the modal doesn't get unwieldy.
      return { exact: exact.slice(0, 12), similar: similar.slice(0, 12) };
    }
    const similarForSelected = computed(() => similarNamesFor(selectedPerson.value));

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

    // (Subfield reset is handled in toggleField below — switching contexts
    //  should always start with a clean subfield state.)

    function clearAll() {
      query.value = '';
      selectedFields.value = [];
      selectedSubfields.value = [];
      selectedGenders.value = [];
      yearMin.value = YEAR_FLOOR;
      yearMax.value = YEAR_CEIL;
      clearBornFilters();
      clearCountry();
    }

    // ---- Toggle helpers ----
    // Reassign the ref to a new array so reactivity tracks the change reliably.
    function toggleArrayItem(refArr, value) {
      const arr = refArr.value;
      refArr.value = arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value];
    }
    // Toggling a parent Field always clears subfield selections so the user
    // gets a clean drilldown for the new context.
    function toggleField(f) {
      toggleArrayItem(selectedFields, f);
      selectedSubfields.value = [];
    }
    const toggleSubfield = (sf) => toggleArrayItem(selectedSubfields, sf);
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

      if (fields.length    > 0 && !fields.includes(person.field))       return null;
      if (subfields.length > 0 && !subfields.includes(person.subfield)) return null;
      if (genders.length   > 0 && !genders.includes(person.gender))     return null;
      if (minY !== null && minY !== '' && person.birthYear < +minY) return null;
      if (maxY !== null && maxY !== '' && person.birthYear > +maxY) return null;
      if (selectedCountry.value && person.country !== selectedCountry.value) return null;
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
      if (selectedCountry.value) {
        out.push({ key: 'c', group: 'Place', label: selectedCountry.value, clear: clearCountry });
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
      yearMin.value !== YEAR_FLOOR || yearMax.value !== YEAR_CEIL
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
    const YEAR_TICKS = (() => {
      const out = [];
      for (let y = 1400; y <= 2000; y += 100) {
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
    function fullNameParts(person) {
      if (!person || !person.middleName) return null;
      const parts = person.name.trim().split(/\s+/);
      if (parts.length < 2) return null;
      return {
        first: parts[0],
        middle: person.middleName,
        last: parts.slice(1).join(' '),
      };
    }

    // Everyone the user has hearted, in dataset order.
    const favoritePeople = computed(() => PEOPLE.filter(p => favorites.value.has(p.id)));

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
      return `${parts.first} ${parts.middle} ${parts.last}`;
    }

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
      catTrack, canCatPrev, canCatNext, catPage, quickPick, syncCatArrows,
      orderedFields, countForField,
      catPointerDown, catPointerMove, catPointerUp,
      // computed
      filtered, availableSubfields, similarForSelected,
      favoritePeople, countryList, countryMax,
      showResults, yearsActive, clearYears, YEAR_TICKS,
      tlMin, tlMax, tlMinPct, tlMaxPct, tlBirthPct, tlLabel,
      activeFilters, hasActiveFilters,
      // selection helpers (templates)
      isFieldSelected, isSubfieldSelected, isGenderSelected,
      // actions
      clearAll,
      // new features
      favorites, onlyFavorites, isFavorite, toggleFavorite, toggleOnlyFavorites,
      bornTodayActive, toggleBornToday,
      selectedCountry, clearCountry, globeData, zoomGlobe,
      pickCountry, flyToCountry, resetGlobeView, randomGlobeView,
      miniOutline, miniAdmin, miniView, miniFrame, miniMarker,
      miniCities, miniZoom, zoomMini,
      selectedBornMonths, selectedBornDays, selectedZodiacs, ZODIACS,
      toggleBornMonth, toggleBornDay, toggleZodiac,
      isBornMonthSelected, isBornDaySelected, isZodiacSelected,
      clearBornFilters,
      MONTH_NAMES, zodiacFor, zodiacIcon, zodiacWiki, formatBirthDate, daysInMonth,
      surpriseMe,
      // dock
      hitsExpanded, visibleHits, refineOpen, refineCount, menuOpen,
      menuView, openMenu,
      savedSearches, saveCurrentSearch, applySavedSearch, deleteSavedSearch,
      searchLabel, isSearchSaved,
      clearSavedData, signOut, confirmSignOut, nameMode,
      dialTrack, dialLetter, onDialScroll, onDialClick,
      dialPointerDown, dialPointerMove, dialPointerUp,
      // hits list: A–Z jump and first/last name order
      AZ, hitLetters, hitsList, jumpToLetter, nameMode, setNameMode,
      clearType, clearTime, clearCategories, typeFilterCount, timeFilterCount,
      toggleField, toggleSubfield, toggleGender,
      openPerson, closePerson, toggleTheme,
      hasPerson, personByName, openOrSearch, searchFor, filterZodiac, filterBirthday,
      // ask-a-question
      askOpen, askInput, askAnswer, askError, askLoading,
      toggleAsk, submitAsk,
      // display helpers
      metaPills, tagsFor, fullNameParts, fullNameOf, middleNameOf, rowMeta,
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
