#!/usr/bin/env python3
"""
roster_pick.py — choose one person per country from the harvested candidates.

    python3 roster_pick.py            # writes roster_picks.json + a table

Wikidata ranks by sitelinks, which is a measure of fame and not of anything
else. Sorted that way, 38 of the 102 countries lead with a politician and
several lead with a dictator — Idi Amin for Uganda, Bashar al-Assad for Syria,
Pol Pot for Cambodia. This is an almanac for naming a baby. So:

  * Occupations are mapped onto the subfield taxonomy the roster already uses,
    and each field carries a weight. Musicians, writers, film-makers, artists
    and scientists are what the site is for; heads of state are the fallback,
    not the first answer.
  * A short blocklist covers people no weighting should be trusted to bury —
    figures whose fame rests on mass killing. It names them explicitly rather
    than trying to infer it, because inferring it is how you get it wrong.

The result still wants reading before it ships. This picks; a person decides.
"""

from __future__ import annotations
import json
import pathlib
import re
import unicodedata

# ---- occupation -> (field, subfield) -------------------------------------
# Longest match wins, so put the specific before the general.
OCCUPATION_MAP: list[tuple[str, tuple[str, str]]] = [
    ('singer-songwriter', ('Music', 'Pop')),
    ('jazz musician', ('Music', 'Jazz')),
    ('opera singer', ('Music', 'Classical')),
    ('classical composer', ('Music', 'Classical')),
    ('composer', ('Music', 'Classical')),
    ('conductor', ('Music', 'Classical')),
    ('rapper', ('Music', 'Hip-Hop')),
    ('singer', ('Music', 'Pop')),
    ('musician', ('Music', 'Pop')),
    ('guitarist', ('Music', 'Rock')),
    ('pianist', ('Music', 'Classical')),
    ('violinist', ('Music', 'Classical')),
    ('record producer', ('Music', 'Producer')),

    ('film director', ('Film', 'Director')),
    ('film producer', ('Film', 'Director')),
    ('screenwriter', ('Film', 'Director')),
    ('cinematographer', ('Film', 'Director')),
    ('actress', ('Film', 'Actress')),
    ('actor', ('Film', 'Actor')),
    ('comedian', ('Film', 'Comedian')),
    ('animator', ('Film', 'Animator')),

    ('novelist', ('Literature', 'Novelist')),
    ('poet', ('Literature', 'Poet')),
    ('playwright', ('Literature', 'Novelist')),
    ('essayist', ('Literature', 'Essayist')),
    ('short story writer', ('Literature', 'Short Story')),
    ('prose writer', ('Literature', 'Novelist')),
    ('autobiographer', ('Literature', 'Memoirist')),
    ('writer', ('Literature', 'Novelist')),
    ('journalist', ('Literature', 'Essayist')),

    ('painter', ('Arts', 'Painter')),
    ('sculptor', ('Arts', 'Sculptor')),
    ('photographer', ('Arts', 'Painter')),
    ('choreographer', ('Arts', 'Choreographer')),
    ('dancer', ('Arts', 'Choreographer')),
    ('printmaker', ('Arts', 'Printmaker')),
    ('visual artist', ('Arts', 'Conceptual Artist')),
    ('artist', ('Arts', 'Painter')),

    ('architect', ('Architecture', 'Modernist')),
    ('fashion designer', ('Fashion', 'Designer')),
    ('chef', ('Culinary', 'Restaurateur')),

    ('physicist', ('Science', 'Physicist')),
    ('chemist', ('Science', 'Chemistry')),
    ('astronomer', ('Science', 'Astronomer')),
    ('astrophysicist', ('Science', 'Astrophysicist')),
    ('mathematician', ('Science', 'Mathematician')),
    ('biologist', ('Science', 'Biologist')),
    ('naturalist', ('Science', 'Naturalist')),
    ('psychologist', ('Science', 'Psychologist')),
    ('physician', ('Science', 'Biologist')),
    ('scientist', ('Science', 'Physicist')),
    ('inventor', ('Science', 'Inventor')),

    ('computer scientist', ('Tech', 'Computer Science')),
    ('programmer', ('Tech', 'Software Engineering')),
    ('entrepreneur', ('Tech', 'Entrepreneur')),
    ('engineer', ('Tech', 'Inventor')),

    ('association football player', ('Sports', 'Soccer')),
    ('basketball player', ('Sports', 'NBA')),
    ('tennis player', ('Sports', 'Tennis')),
    ('boxer', ('Sports', 'Boxing')),
    ('sprinter', ('Sports', 'Track & Field')),
    ('long-distance runner', ('Sports', 'Track & Field')),
    ('middle-distance runner', ('Sports', 'Track & Field')),
    ('marathon runner', ('Sports', 'Track & Field')),
    ('athletics competitor', ('Sports', 'Track & Field')),
    ('gymnast', ('Sports', 'Gymnastics')),
    ('cricketer', ('Sports', 'Soccer')),
    ('chess player', ('Sports', 'Track & Field')),

    ('founder of religion', ('Religion', 'Buddhist')),
    ('religious leader', ('Religion', 'Buddhist')),
    ('theologian', ('Religion', 'Catholic')),
    ('monk', ('Religion', 'Buddhist')),
    ('preacher', ('Religion', 'Catholic')),
    ('imam', ('Religion', 'Catholic')),
    ('rabbi', ('Religion', 'Catholic')),
    ('explorer', ('Science', 'Naturalist')),
    ('anthropologist', ('Science', 'Naturalist')),
    ('historian', ('Literature', 'Essayist')),
    ('economist', ('Philosophy', 'Political Economy')),
    ('model', ('Fashion', 'Stylist')),
    ('philosopher', ('Philosophy', 'Political Theory')),
    ('human rights activist', ('Activism', 'Civil Rights')),
    ('activist', ('Activism', 'Civil Rights')),
    ('revolutionary', ('Activism', 'Pro-Democracy')),

    ('monarch', ('Politics', 'Monarch')),
    ('sovereign', ('Politics', 'Monarch')),
    ('diplomat', ('Politics', 'Diplomat')),
    # Holding an office, as against the generic 'politician' that Wikidata
    # gives everyone who ever stood for anything — so these carry full weight
    # while 'politician' stays vague. Without them Shimon Peres, whose list
    # reads "writer; poet; politician; minister", scored 1.35 for Literature
    # against 0.35 for Politics and was filed as a poet.
    ('prime minister', ('Politics', 'Prime Minister')),
    ('minister', ('Politics', 'Minister')),
    ('head of government', ('Politics', 'Prime Minister')),
    ('head of state', ('Politics', 'President')),
    ('politician', ('Politics', 'President')),
    ('lawyer', ('Politics', 'Diplomat')),
    ('jurist', ('Politics', 'Supreme Court Justice')),
    ('military officer', ('Politics', 'President')),
    ('military personnel', ('Politics', 'President')),
]

# Occupations that say very little on their own. Wikidata gives "writer" to
# anyone who published anything, "politician" to anyone who held office, and
# "artist" to half the arts — so they count for less than a specific trade.
# Garry Kasparov is a writer and a politician; he is a chess player.
VAGUE = {'writer', 'artist', 'scientist', 'politician', 'lawyer', 'model',
         'military personnel', 'military officer', 'journalist', 'engineer',
         'monk', 'preacher', 'sovereign', 'head of state', 'head of government'}

# The other end of the same dial. An office actually held is the strongest
# thing Wikidata says about someone, and it has to outweigh a pile of vague
# ones — Shimon Peres reads "writer; poet; politician; minister", which scored
# 1.35 for Literature against 1.35 for Politics, and the tie went to
# Literature's higher field weight. A Nobel Peace laureate and prime minister
# was filed as a poet.
STRONG = {'prime minister', 'minister', 'diplomat'}

# What this site is for. Heads of state are the fallback, not the first answer.
FIELD_WEIGHT = {
    'Music': 1.70, 'Film': 1.55, 'Literature': 1.50,
    'Science': 1.45, 'Arts': 1.44, 'Architecture': 1.30, 'Fashion': 1.30, 'Culinary': 1.30,
    'Tech': 1.25, 'Sports': 1.20, 'Philosophy': 1.10, 'Activism': 1.10,
    'Religion': 0.80, 'Politics': 0.50,
}

# Fame that rests on mass killing or the running of a police state. Named
# rather than inferred: a rule clever enough to catch these on its own would
# also catch people it shouldn't.
BLOCKLIST = {
    'Idi Amin', 'Pol Pot', 'Bashar al-Assad', 'Hafez al-Assad', 'Saddam Hussein',
    'Muammar Gaddafi', 'Slobodan Milošević', 'Radovan Karadžić', 'Ratko Mladić',
    'Omar al-Bashir', 'Charles Taylor', 'Mengistu Haile Mariam', 'Hissène Habré',
    'Jean-Bédel Bokassa', 'Francisco Macías Nguema', 'Teodoro Obiang Nguema Mbasogo',
    'Efraín Ríos Montt', 'Augusto Pinochet', 'Alberto Fujimori', 'Rafael Trujillo',
    'François Duvalier', 'Jean-Claude Duvalier', 'Anastasio Somoza Debayle',
    'Manuel Noriega', 'Ferdinand Marcos', 'Suharto', 'Ne Win', 'Than Shwe',
    'Saparmyrat Nyýazow', 'Islam Karimov', 'Nicolae Ceaușescu', 'Enver Hoxha',
    'Kim Il Sung', 'Kim Jong Il', 'Kim Jong Un', 'Robert Mugabe', 'Mobutu Sese Seko',
    'Sani Abacha', 'Yahya Jammeh', 'Isaias Afwerki', 'Laurent-Désiré Kabila',
    'Emperor Hirohito', 'Josef Mengele', 'Radovan Karadzic',
    'Joseph Stalin', 'Osama bin Laden', 'Genghis Khan', 'Teodoro Obiang',
    'Adolf Hitler', 'Benito Mussolini', 'Vladimir Lenin', 'Mao Zedong',
    'Hugo Chávez', 'Imelda Marcos', 'Daniel Ortega', 'Yazid I',
    'Alfredo Stroessner', 'Idriss Déby', 'Paul Biya', 'Denis Sassou Nguesso',
    'Emomali Rahmon', 'Gurbanguly Berdimuhamedow', 'Alexander Lukashenko',
    'Hun Sen', 'Meles Zenawi', 'Blaise Compaoré', 'Ali Khamenei',
    'Ruhollah Khomeini', 'Abu Bakr al-Baghdadi', 'Ayman al-Zawahiri',
}

# Match on a folded form, so an accent or a stray title can't slip someone past.
def _fold(name: str) -> str:
    return unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower().strip()


BLOCKED = {_fold(n) for n in BLOCKLIST}


# ---- the editorial pass ---------------------------------------------------
# Ranking and weighting get most of the way; these are the ones they can't
# reach. Some are the wrong person for the country (John McCain was born in the
# Canal Zone, which does not make him Panama's answer). Some are a worse answer
# than one further down the list — Uganda's best-known son by sitelinks is Idi
# Amin, but Joshua Cheptegei holds the 10,000m world record. And some are only
# a wrong label: Wikidata calls Eratosthenes a poet, which he also was.
#
# Value is the article title to prefer; an optional (field, subfield) after it
# overrides the classifier too.
OVERRIDES: dict[str, tuple] = {
    'Uganda':        ('Joshua Cheptegei', 'Sports', 'Track & Field'),
    'Bulgaria':      ('Elias Canetti', 'Literature', 'Novelist'),
    'Bahamas':       ('Steven Gardiner', 'Sports', 'Track & Field'),
    'Falkland Is.':  ('Louis Baillon', 'Sports', 'Track & Field'),
    'Malaysia':      ('Michelle Yeoh', 'Film', 'Actress'),
    'Guinea':        ('Naby Keïta', 'Sports', 'Soccer'),
    'Armenia':       ('Henrikh Mkhitaryan', 'Sports', 'Soccer'),
    'Namibia':       ('Frankie Fredericks', 'Sports', 'Track & Field'),
    'Sierra Leone':  ('Trevoh Chalobah', 'Sports', 'Soccer'),
    'Liberia':       ('George Weah', 'Sports', 'Soccer'),
    'Moldova':       ('Anton Rubinstein', 'Music', 'Classical'),
    'W. Sahara':     ('Mariem Hassan', 'Music', 'Pop'),
    'Afghanistan':   ('Khaled Hosseini', 'Literature', 'Novelist'),
    'El Salvador':   ('Óscar Romero', 'Religion', 'Catholic'),
    'Syria':         ('John of Damascus', 'Religion', 'Catholic'),
    'Saudi Arabia':  ('Muhammad', 'Religion', 'Catholic'),
    'Oman':          ('Qaboos bin Said', 'Politics', 'Monarch'),
    'Jordan':        ('Abdullah II of Jordan', 'Politics', 'Monarch'),
    'Turkmenistan':  ('Tomyris', 'Politics', 'Monarch'),
    'Ecuador':       ('Atahualpa', 'Politics', 'Monarch'),
    'Venezuela':     ('Simón Bolívar', 'Politics', 'President'),
    'Zambia':        ('Kenneth Kaunda', 'Politics', 'President'),
    'Malawi':        ('Joyce Banda', 'Politics', 'President'),
    'Brunei':        ('Wu Chun', 'Film', 'Actor'),
    'Panama':        ('Jordana Brewster', 'Film', 'Actress'),
    'Bolivia':       ('Evo Morales', 'Politics', 'President'),
    # Right person, wrong label.
    'Libya':         ('Eratosthenes', 'Science', 'Astronomer'),
    'Sri Lanka':     ('Michael Ondaatje', 'Literature', 'Novelist'),
    'Cyprus':        ('Zeno of Citium', 'Philosophy', 'Political Theory'),
    'Kazakhstan':    ('Al-Farabi', 'Philosophy', 'Political Theory'),
    'Uzbekistan':    ('Avicenna', 'Science', 'Physicist'),
    'Tajikistan':    ('Rumi', 'Literature', 'Poet'),
    'Kyrgyzstan':    ('Li Bai', 'Literature', 'Poet'),
    'Azerbaijan':    ('Lev Landau', 'Science', 'Physicist'),
    'Georgia':       ('Vladimir Mayakovsky', 'Literature', 'Poet'),
    'Lithuania':     ('Emma Goldman', 'Activism', 'Labor'),
    'Turkey':        (None,),
}


def classify(occupations: str) -> tuple[str, str]:
    """Map a Wikidata occupation list onto the roster's own taxonomy.

    By weight of evidence, not by the single best-sounding match. Wikidata
    lists Mario Vargas Llosa as writer, playwright, literary critic, journalist
    *and* film director; picking the highest-weighted single occupation filed a
    Nobel novelist under Film. Counting how many of his occupations point at
    each field puts him back in Literature, where four of them do. The weight
    only breaks ties.
    """
    text = occupations.lower()
    hits: dict[str, list] = {}
    score: dict[str, float] = {}
    for needle, (field, subfield) in OCCUPATION_MAP:
        if needle in text:
            hits.setdefault(field, []).append(subfield)
            weight = 0.35 if needle in VAGUE else (2.0 if needle in STRONG else 1.0)
            score[field] = score.get(field, 0.0) + weight
    if not hits:
        return ('Politics', 'President')
    field = max(hits, key=lambda f: (score[f], FIELD_WEIGHT.get(f, 1.0)))
    return (field, hits[field][0])


def parse_year(raw: str) -> int | None:
    """Wikidata timestamps, BCE included.

    A BCE date arrives as "-0500-01-01T…"; slicing the first four characters
    off that reads "-050" and files the Buddha under the year -50. Sign first,
    then the four digits after it.
    """
    if not raw:
        return None
    neg = raw.startswith('-')
    digits = raw[1:5] if neg else raw[:4]
    if not digits.isdigit():
        return None
    year = int(digits)
    return -year if neg else year


def slug(name: str) -> str:
    ascii_name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+', '-', ascii_name).strip('-').lower()
    return s or 'unnamed'


def main() -> int:
    repo = pathlib.Path(__file__).parent
    data = json.loads((repo / 'roster_candidates.json').read_text(encoding='utf-8'))

    picks = []
    for entry in data:
        scored = []
        for c in entry['candidates']:
            if _fold(c['name']) in BLOCKED or _fold(c['article']) in BLOCKED:
                continue
            field, subfield = classify(c['occupations'])
            scored.append((c['sitelinks'] * FIELD_WEIGHT.get(field, 1.0), field, subfield, c))
        if not scored:
            continue
        scored.sort(key=lambda t: -t[0])
        score, field, subfield, c = scored[0]
        ov = OVERRIDES.get(entry['atlas']) or OVERRIDES.get(entry['country'])
        if ov and ov[0]:
            match = next((s for s in scored if s[3]['article'] == ov[0] or s[3]['name'] == ov[0]), None)
            if match:
                score, field, subfield, c = match
                if len(ov) == 3:
                    field, subfield = ov[1], ov[2]
        year = parse_year(c['birth'])
        picks.append({
            'country': entry['country'], 'atlas': entry['atlas'], 'iso': entry['iso'],
            'id': slug(c['article'] or c['name']),
            'name': (c['article'] or c['name']).strip(), 'qid': c['qid'],
            'article': c['article'], 'birth': c['birth'], 'birthYear': year,
            'birthPlace': c['birthPlace'], 'gender': c['gender'],
            'field': field, 'subfield': subfield,
            'sitelinks': c['sitelinks'], 'occupations': c['occupations'],
            # Kept so a reviewer can see what was passed over.
            'runnersUp': [{'name': s[3]['name'], 'field': s[1], 'sitelinks': s[3]['sitelinks']}
                          for s in scored[1:4]],
        })

    (repo / 'roster_picks.json').write_text(json.dumps(picks, indent=1, ensure_ascii=False) + '\n',
                                            encoding='utf-8')
    by_field: dict[str, int] = {}
    for p in picks:
        by_field[p['field']] = by_field.get(p['field'], 0) + 1
    print(f'{len(picks)} countries picked\n')
    for f, n in sorted(by_field.items(), key=lambda kv: -kv[1]):
        print(f'  {n:3d}  {f}')
    print('\nwrote roster_picks.json')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
