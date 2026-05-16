// famous Baby — Vue 3 application
// Frontend-only for now: filtering runs entirely against the mock dataset.
// We keep the natural-language layer naive (token matching) so it's easy to
// swap in a real backend / LLM-backed query parser later.

console.log('[famous Baby] app.js loaded, importing modules…');

import { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'https://unpkg.com/vue@3.4.27/dist/vue.esm-browser.js';

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
  'Visual Arts':  '#D67A2A', // saffron
  'Fashion':      '#E03B7C', // hot pink
  'Tech':         '#1F8DEB', // electric blue
  'Religion':     '#C18A3B', // mustard
  'Philosophy':   '#6B7C42', // olive
  'Culinary':     '#B26A2E', // copper
};
const DEFAULT_FIELD_COLOR = '#0B1F3A';
const colorForField = (f) => FIELD_COLORS[f] || DEFAULT_FIELD_COLOR;

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
      person.name, person.birthPlace, person.country,
      person.field, person.subfield,
      teamText, awardText, collabText, person.bio,
      String(person.birthYear),
    ].join(' ').toLowerCase(),
    parts: {
      name: person.name.toLowerCase(),
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
    // Pre-seeded query so first-time visitors land on a meaningful result
     // set instead of an empty page. Acts like a soft default — the user can
     // edit/clear the input at any time, same as any other typed query.
    const query             = ref('women scientists');
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
    function loadFavs() {
      try {
        const raw = localStorage.getItem(STORAGE_FAVS);
        return raw ? new Set(JSON.parse(raw)) : new Set();
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
    // selectedBornMonth: 0 means "any", 1-12 picks a calendar month.
    // selectedBornDay: 0 means "any", 1-31 picks a day-of-month (refines month).
    const selectedBornMonth = ref(0);
    const selectedBornDay = ref(0);
    function setBornMonth(m) {
      selectedBornMonth.value = selectedBornMonth.value === m ? 0 : m;
      if (selectedBornMonth.value === 0) selectedBornDay.value = 0;
    }
    function clearBornFilters() {
      selectedBornMonth.value = 0;
      selectedBornDay.value = 0;
      bornTodayActive.value = false;
    }
    function passBornFilters(person) {
      if (selectedBornMonth.value > 0) {
        if (person.birthMonth !== selectedBornMonth.value) return false;
      }
      if (selectedBornDay.value > 0) {
        if (person.birthDay !== selectedBornDay.value) return false;
      }
      return true;
    }

    // ---- 3D globe (map-based country search) ----
    const selectedCountry = ref('');
    const globeRotating = ref(true);
    const hoveredCountry = ref(null);
    let globeInstance = null;

    const globeData = computed(() => {
      const byCountry = new Map();
      for (const p of PEOPLE) {
        if (!p.country) continue;
        const coords = COUNTRY_COORDS[p.country];
        if (!coords) continue;
        if (!byCountry.has(p.country)) {
          byCountry.set(p.country, {
            country: p.country, lat: coords[0], lng: coords[1],
            count: 0, sample: [],
          });
        }
        const entry = byCountry.get(p.country);
        entry.count += 1;
        if (entry.sample.length < 5) entry.sample.push(p.name);
      }
      return [...byCountry.values()];
    });

    function selectGlobeCountry(c) {
      selectedCountry.value = (selectedCountry.value === c) ? '' : c;
    }
    function clearCountry() { selectedCountry.value = ''; }
    function toggleGlobeRotation() { globeRotating.value = !globeRotating.value; }

    // Step zoom for the +/− buttons. dir = -1 zooms in (camera moves closer),
    // dir = +1 zooms out. Clamped by the OrbitControls min/maxDistance set in
    // initGlobe(). Wheel zoom keeps working independently.
    function zoomGlobe(dir) {
      if (!globeInstance) return;
      try {
        const pov = globeInstance.pointOfView();
        const altitude = Math.max(0.05, Math.min(4.0, pov.altitude * (dir > 0 ? 1.35 : 0.74)));
        globeInstance.pointOfView({ lat: pov.lat, lng: pov.lng, altitude }, 350);
      } catch {}
    }

    function pointColorFor(d) {
      if (d === hoveredCountry.value) return '#FFE56A';
      if (!selectedCountry.value) return '#C8463A';
      return d.country === selectedCountry.value ? '#FFE56A' : '#C8463A';
    }
    function pointRadiusFor(d) {
      // Larger pins → easier to click and hover. Sized in degrees of arc:
      // ~1.2 minimum (covers a few hundred km on the surface) plus a
      // log-scaled bump for countries with more people in the dataset.
      const base = 1.2 + Math.log(d.count + 1) * 0.42;
      return d === hoveredCountry.value ? base * 1.45 : base;
    }
    function pointAltitudeFor(d) {
      // Lift pins further off the surface so the body of the peg sits clear
      // of the globe — pointer rays hit the peg before the sphere behind it.
      return 0.06 + Math.log(d.count + 1) * 0.03;
    }

    // Suppression flag: when a pin is clicked, swallow the canvas click that
    // follows so it doesn't also toggle rotation.
    let _suppressGlobeClick = false;

    function handleGlobeBackgroundClick() {
      if (_suppressGlobeClick) { _suppressGlobeClick = false; return; }
      globeRotating.value = !globeRotating.value;
    }

    function handleGlobePointClick(d) {
      _suppressGlobeClick = true;
      // Belt-and-suspenders: clear the flag next tick in case the canvas
      // click event never arrives (event ordering quirks across browsers).
      setTimeout(() => { _suppressGlobeClick = false; }, 0);
      if (globeRotating.value) {
        // First click stops the spin; user clicks again to select.
        globeRotating.value = false;
        return;
      }
      selectGlobeCountry(d.country);
    }

    async function initGlobe() {
      await nextTick();
      const el = document.getElementById('globe-canvas');
      if (!window.Globe || !el || globeInstance) return;
      // The sticky rail can layout late — wait until the canvas has real
      // dimensions before initializing, otherwise globe.gl creates a 0x0
      // canvas that never paints.
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
      // Clamp dimensions so a layout glitch can't blow the canvas up to
      // viewport-sized.
      const rawW = el.clientWidth, rawH = el.clientHeight;
      const w = Math.min(Math.max(rawW, 240), 560);
      const h = Math.min(Math.max(rawH, 240), 520);
      console.log('[famous Baby] initGlobe dimensions: el=', rawW, 'x', rawH, '→ canvas=', w, 'x', h);
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
        .backgroundColor('#0a1228')
        .globeImageUrl(EARTH_URL)
        .bumpImageUrl(BUMP_URL)
        .showAtmosphere(true)
        .atmosphereColor('#C8463A')
        .atmosphereAltitude(0.15)
        .pointsData(globeData.value)
        .pointLat('lat')
        .pointLng('lng')
        .pointAltitude(pointAltitudeFor)
        .pointColor(pointColorFor)
        .pointRadius(pointRadiusFor)
        .pointResolution(16)
        .pointLabel(d =>
          `<div style="background:#1A1612;color:#F5EFE2;padding:6px 10px;border:1px solid #C8463A;` +
          `font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em">` +
          `<strong>${d.country}</strong> · ${d.count} ${d.count === 1 ? 'person' : 'people'}<br/>` +
          `<span style="color:#8A7B6B;font-size:10px">${d.sample.slice(0,3).join(' · ')}` +
          `${d.count > 3 ? ` · +${d.count - 3} more` : ''}</span></div>`
        )
        .onPointClick(handleGlobePointClick)
        .onPointHover(d => {
          hoveredCountry.value = d || null;
          if (el) el.style.cursor = d ? 'pointer' : (globeRotating.value ? 'pointer' : 'grab');
          if (globeInstance) {
            globeInstance.pointColor(pointColorFor).pointRadius(pointRadiusFor);
          }
        });
      try {
        const c = globeInstance.controls();
        c.autoRotate = globeRotating.value;
        c.autoRotateSpeed = 0.4;
        // Zoom (wheel / pinch). globe.gl defaults vary by version; pin them
        // explicitly so users can scroll-zoom in/out of the globe.
        c.enableZoom = true;
        c.zoomSpeed = 1.2;
        c.minDistance = 110;   // just outside the sphere (radius ≈ 100)
        c.maxDistance = 600;
      } catch {}
      // Background click on the canvas toggles rotation. Pin clicks set
      // _suppressGlobeClick first so we don't double-fire.
      el.addEventListener('click', handleGlobeBackgroundClick);
      el.style.cursor = globeRotating.value ? 'pointer' : 'grab';
      const ro = new ResizeObserver(() => {
        if (!globeInstance || !el.isConnected) return;
        const rw = Math.min(Math.max(el.clientWidth, 240), 560);
        const rh = Math.min(Math.max(el.clientHeight, 240), 520);
        globeInstance.width(rw).height(rh);
      });
      ro.observe(el);
      globeInstance._ro = ro;
      globeInstance._clickHandler = handleGlobeBackgroundClick;
      globeInstance._el = el;
    }

    function disposeGlobe() {
      if (!globeInstance) return;
      globeInstance._ro && globeInstance._ro.disconnect();
      const el = globeInstance._el;
      if (el && globeInstance._clickHandler) {
        el.removeEventListener('click', globeInstance._clickHandler);
      }
      if (el) el.innerHTML = '';
      globeInstance = null;
    }

    onMounted(() => {
      if (window.Globe) {
        initGlobe();
      } else {
        const start = Date.now();
        const tick = () => {
          if (window.Globe) initGlobe();
          else if (Date.now() - start < 5000) setTimeout(tick, 100);
        };
        tick();
      }
    });
    onUnmounted(disposeGlobe);

    // Recolor pins (and update cursor) reactively when state changes.
    watch([selectedCountry, hoveredCountry], () => {
      if (globeInstance) {
        globeInstance.pointColor(pointColorFor).pointRadius(pointRadiusFor);
      }
    });
    watch(globeRotating, (spinning) => {
      if (!globeInstance) return;
      try {
        const c = globeInstance.controls();
        c.autoRotate = spinning;
      } catch {}
      if (globeInstance._el) {
        globeInstance._el.style.cursor = spinning ? 'pointer' : 'grab';
      }
    });

    // ---- Surprise Me — random person matching current filters ----
    function surpriseMe() {
      const pool = filtered.value;
      if (!pool || pool.length === 0) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      openPerson(pick.person);
    }

    // ---- Person info modal ----
    const selectedPerson = ref(null);
    function openPerson(p) {
      selectedPerson.value = p;
      // Reset the per-person Q&A state whenever a different person opens.
      askOpen.value = false;
      askInput.value = '';
      askAnswer.value = '';
      askError.value = '';
      askLoading.value = false;
    }
    function closePerson() { selectedPerson.value = null; }

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
      if (e.key === 'Escape' && selectedPerson.value) closePerson();
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
          out.sort((a, b) => a.person.name.localeCompare(b.person.name));
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
      if (selectedBornMonth.value > 0) {
        const monthName = MONTH_NAMES[selectedBornMonth.value];
        const label = selectedBornDay.value > 0 ? `${monthName} ${selectedBornDay.value}` : monthName;
        out.push({ key: 'bm', group: 'Born', label, clear: () => { selectedBornMonth.value = 0; selectedBornDay.value = 0; } });
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
      FIELDS, GENDERS, FIELD_COLORS, today,
      colorForField,
      // computed
      filtered, availableSubfields, similarForSelected,
      activeFilters, hasActiveFilters,
      // selection helpers (templates)
      isFieldSelected, isSubfieldSelected, isGenderSelected,
      // actions
      clearAll,
      // new features
      favorites, onlyFavorites, isFavorite, toggleFavorite, toggleOnlyFavorites,
      bornTodayActive, toggleBornToday,
      selectedCountry, clearCountry, globeData, globeRotating, toggleGlobeRotation, zoomGlobe,
      selectedBornMonth, selectedBornDay,
      setBornMonth, clearBornFilters,
      MONTH_NAMES, zodiacFor, formatBirthDate, daysInMonth,
      surpriseMe,
      toggleField, toggleSubfield, toggleGender,
      openPerson, closePerson, toggleTheme,
      // ask-a-question
      askOpen, askInput, askAnswer, askError, askLoading,
      toggleAsk, submitAsk,
      // display helpers
      metaPills, tagsFor, fullNameParts,
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
