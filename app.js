// famous Baby — Vue 3 application
// Frontend-only for now: filtering runs entirely against the mock dataset.
// We keep the natural-language layer naive (token matching) so it's easy to
// swap in a real backend / LLM-backed query parser later.

console.log('[famous Baby] app.js loaded, importing modules…');

import { createApp, ref, computed, watch, onMounted, onUnmounted } from 'https://unpkg.com/vue@3.4.27/dist/vue.esm-browser.js';
// data.js gets a cache-buster so dev refreshes always pick up changes.
const __DATA_URL = './data.js?v=' + Date.now();
const { PEOPLE, FIELDS, GENDERS, ERAS } = await import(__DATA_URL);

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

// Letters of the English alphabet — used by the keyboard picker.
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// QWERTY layout for the keyboard, three rows like a real keyboard.
const KEYBOARD_ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split(''),
];

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

// Normalize a string for letter matching: strip diacritics, lowercase,
// drop anything outside a-z. So "Toni Kukoč" → "tonikukoc".
function normalizeName(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '');
}

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
    const query             = ref('');
    const selectedFields    = ref([]);
    const selectedSubfields = ref([]);          // genres/leagues/etc. inside a field
    const selectedGenders   = ref([]);
    const selectedEra       = ref(null);        // ERA object or null
    const yearMin           = ref(null);
    const yearMax           = ref(null);
    const selectedLetters   = ref([]);          // lowercase letters the name must contain
    const sort              = ref('relevance'); // 'relevance' | 'alpha' | 'oldest' | 'newest'

    // ---- Person info modal ----
    const selectedPerson = ref(null);
    function openPerson(p) { selectedPerson.value = p; }
    function closePerson() { selectedPerson.value = null; }

    // ---- Aesthetic / theme toggle ----
    // Persist to localStorage so the user's choice survives reloads.
    const THEMES = ['sports', 'editorial'];
    const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('fb-theme')) || 'sports';
    const theme = ref(THEMES.includes(stored) ? stored : 'sports');
    watch(theme, (t) => {
      try { localStorage.setItem('fb-theme', t); } catch {}
      document.documentElement.setAttribute('data-theme', t);
    }, { immediate: true });
    function toggleTheme() {
      const i = THEMES.indexOf(theme.value);
      theme.value = THEMES[(i + 1) % THEMES.length];
    }

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
    const isLetterSelected   = (L)  => selectedLetters.value.includes(L.toLowerCase());

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

    // ---- Suggestions (clickable example queries) ----
    const suggestions = [
      'NFL players born in Chicago between 1990 and 1995',
      'NBA players who played with Michael Jordan',
      'Women who won the first Best Actress Oscar',
      'Scientists born before 1920',
      'Soccer players from California',
    ];

    function applySuggestion(s) {
      query.value = s;
      selectedFields.value = [];
      selectedSubfields.value = [];
      selectedGenders.value = [];
      selectedEra.value = null;
      yearMin.value = null;
      yearMax.value = null;
      selectedLetters.value = [];
    }

    function clearAll() {
      query.value = '';
      selectedFields.value = [];
      selectedSubfields.value = [];
      selectedGenders.value = [];
      selectedEra.value = null;
      yearMin.value = null;
      yearMax.value = null;
      selectedLetters.value = [];
    }

    function clearLetters() { selectedLetters.value = []; }

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
    const toggleLetter   = (L)  => toggleArrayItem(selectedLetters, L.toLowerCase());
    function selectEra(era) {
      selectedEra.value = (selectedEra.value && selectedEra.value.label === era.label) ? null : era;
    }

    // ---- Filtering pipeline ----
    // The pipeline runs in two passes so we can compute "which letters are
    // still available" against everything *except* the letter filter itself.
    function passNonLetterFilters(person) {
      const tokens = tokenize(query.value);
      const queryYears = extractYears(query.value);
      const fields    = selectedFields.value;
      const subfields = selectedSubfields.value;
      const genders   = selectedGenders.value;
      const era       = selectedEra.value;
      const minY      = yearMin.value;
      const maxY      = yearMax.value;

      if (fields.length    > 0 && !fields.includes(person.field))       return null;
      if (subfields.length > 0 && !subfields.includes(person.subfield)) return null;
      if (genders.length   > 0 && !genders.includes(person.gender))     return null;
      if (era && (person.birthYear < era.min || person.birthYear > era.max)) return null;
      if (minY !== null && minY !== '' && person.birthYear < +minY) return null;
      if (maxY !== null && maxY !== '' && person.birthYear > +maxY) return null;
      if (queryYears.length === 2) {
        const [a, b] = [Math.min(...queryYears), Math.max(...queryYears)];
        if (person.birthYear < a || person.birthYear > b) return null;
      }
      const { score, matchedParts } = scorePerson(person, tokens);
      if (tokens.length > 0 && score === 0) return null;
      return { person, score, matchedParts };
    }

    function passLetterFilter(person) {
      const letters = selectedLetters.value;
      if (letters.length === 0) return true;
      const norm = normalizeName(person.name);
      for (const L of letters) if (!norm.includes(L)) return false;
      return true;
    }

    const filtered = computed(() => {
      const out = [];
      for (const person of PEOPLE) {
        const r = passNonLetterFilters(person);
        if (!r) continue;
        if (!passLetterFilter(person)) continue;
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

    // For the keyboard: which letters would still produce results if added
    // to the current selection? Returned as a plain object map for fast lookup
    // in the template (avoids any Set auto-unwrap quirks).
    const availableLetters = computed(() => {
      const candidates = [];
      for (const p of PEOPLE) {
        const r = passNonLetterFilters(p);
        if (!r) continue;
        if (!passLetterFilter(p)) continue;
        candidates.push(normalizeName(p.name));
      }
      const map = {};
      for (const L of LETTERS) {
        const lower = L.toLowerCase();
        if (selectedLetters.value.includes(lower)) { map[L] = true; continue; }
        map[L] = candidates.some(n => n.includes(lower));
      }
      return map;
    });

    // ---- Display helpers ----
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
      selectedFields, selectedSubfields, selectedGenders, selectedEra,
      yearMin, yearMax, selectedLetters, sort,
      selectedPerson, theme,
      // data / constants
      FIELDS, GENDERS, ERAS, LETTERS, KEYBOARD_ROWS, FIELD_COLORS, suggestions, today,
      colorForField,
      // computed
      filtered, availableSubfields, availableLetters, similarForSelected,
      // selection helpers (templates)
      isFieldSelected, isSubfieldSelected, isGenderSelected, isLetterSelected,
      // actions
      applySuggestion, clearAll, clearLetters,
      toggleField, toggleSubfield, toggleGender, toggleLetter, selectEra,
      openPerson, closePerson, toggleTheme,
      // display helpers
      metaPills, tagsFor,
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
