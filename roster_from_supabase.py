#!/usr/bin/env python3
"""
roster_from_supabase.py — use a Supabase table as the list of who to add.

    python3 roster_from_supabase.py --env ../Polyjamorous/.env --limit 200
    python3 roster_from_supabase.py --env ../Polyjamorous/.env --genre Techno

Supabase says *who is worth having*; Wikidata still says who they are. The
artists table over in PolyJamerous is a curated roster of electronic musicians
across 32 genres — exactly what this dataset is thinnest in, with 457 Music
entries and two of them electronic. It carries no birth date, no birthplace and
no photograph, so it can't be imported directly. It is a guide, not a source.

So: read the names out of Supabase, hand them to the same Wikidata lookup
everything else here uses, keep the ones it can actually confirm, and rank by
sitelinks so the best-known arrive first. Anything Wikidata has never heard of
is dropped rather than guessed at.

Writes roster_supabase.json in the shape roster_deepen.py already reads.

Credentials are never read into the repo. Pass --env pointing at a file that
holds DATABASE_URL, or set it in the environment. Nothing is echoed.
"""

from __future__ import annotations
import argparse
import json
import os
import pathlib
import re
import sys
import time

from roster_candidates import ask
from roster_pick import BLOCKED, FIELD_WEIGHT, _fold, classify, parse_year, slug

# The roster's existing Music subfields. New people map onto these; the
# taxonomy is not extended, because a subfield with one person in it is a
# filter nobody can use.
MUSIC_SUBFIELDS = {'Pop', 'Jazz', 'Rock', 'Classical', 'R&B', 'Country',
                   'Hip-Hop', 'Electronic', 'Producer', 'Reggae', 'Soul',
                   'Gospel', 'Afrobeat', 'Chanson'}


def genre_subfield(genre: str) -> str | None:
    """A Supabase genre onto a roster subfield.

    The table is mostly electronic, but not only — it carries Jazz, Reggae and
    a Non-Electronic bucket too. Collapsing all of it to Electronic would file
    a bossa nova singer as a techno producer, so the ones the roster already
    has a home for keep it, and the genuinely electronic genres — thirty-odd
    of them, from Ambient to Vaporwave — share the one subfield that exists.
    """
    g = (genre or '').lower()
    if 'hip-hop' in g or 'rap' in g or 'grime' in g or 'phonk' in g:
        return 'Hip-Hop'
    if 'jazz' in g:
        return 'Jazz'
    if 'reggae' in g or 'dub' in g and 'dubstep' not in g:
        return 'Reggae'
    if 'soul' in g or 'r&b' in g:
        return 'R&B'
    # Only genres that really are electronic collapse into Electronic. The
    # catch-all used to be Electronic itself, which filed a Folk artist as a
    # techno producer — the table carries more genres than the electronic
    # ones, and an unrecognised genre is a question, not a default.
    ELECTRONIC = ('techno', 'house', 'trance', 'drum', 'jungle', 'dubstep',
                  'garage', 'breakbeat', 'big beat', 'ambient', 'idm',
                  'glitch', 'electro', 'synth', 'downtempo', 'chillwave',
                  'chillout', 'hardcore', 'hard dance', 'industrial', 'noise',
                  'disco', 'vaporwave', 'hyperpop', 'trip-hop', 'bass music',
                  'lo-fi', 'trap', 'folktronica', 'grime')
    if any(e in g for e in ELECTRONIC):
        return 'Electronic'
    return None              # let the occupation classifier answer


# Their name, our facts. Matched on label or on the article title, and only
# kept when Wikidata agrees they are a person with a birth date.
# By Wikidata id, not by name. The table stores wikidata_url per artist, which
# makes the match exact — matching stage names against labels and aliases is
# what produced a French composer who died in 1492 as a Techno candidate.
# P31 = Q5 also settles the other question this source raises: half the top of
# that chart is bands, and a band has no birth date, no birthplace and no given
# name, so it cannot become an entry in a naming almanac.
BY_QID = """
SELECT ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?genderLabel
       (GROUP_CONCAT(DISTINCT ?occLabel; separator="; ") AS ?occs) ?article WHERE {
  VALUES ?person { %s }
  ?person wdt:P31 wd:Q5 ; wdt:P569 ?birth ; wikibase:sitelinks ?sitelinks .
  OPTIONAL { ?person wdt:P19 ?bp . ?bp wdt:P17 ?country .
             OPTIONAL { ?bp rdfs:label ?birthPlaceLabel FILTER(lang(?birthPlaceLabel)="en") }
             ?country rdfs:label ?countryLabel FILTER(lang(?countryLabel)="en") }
  ?article schema:about ?person ; schema:isPartOf <https://en.wikipedia.org/> .
  OPTIONAL { ?person wdt:P106 ?occ . ?occ rdfs:label ?occLabel FILTER(lang(?occLabel)="en") }
  OPTIONAL { ?person wdt:P21 ?g . ?g rdfs:label ?genderLabel FILTER(lang(?genderLabel)="en") }
  ?person rdfs:label ?personLabel FILTER(lang(?personLabel)="en")
}
GROUP BY ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?genderLabel ?article
ORDER BY DESC(?sitelinks)
"""

BY_NAME = """
SELECT ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?article ?genderLabel
       (GROUP_CONCAT(DISTINCT ?occLabel; separator="; ") AS ?occs) WHERE {
  VALUES ?name { %s }
  ?person rdfs:label|skos:altLabel ?name .
  ?person wdt:P31 wd:Q5 ; wdt:P569 ?birth ; wikibase:sitelinks ?sitelinks .
  OPTIONAL { ?person wdt:P19 ?bp . ?bp wdt:P17 ?country .
             OPTIONAL { ?bp rdfs:label ?birthPlaceLabel FILTER(lang(?birthPlaceLabel)="en") }
             ?country rdfs:label ?countryLabel FILTER(lang(?countryLabel)="en") }
  ?article schema:about ?person ; schema:isPartOf <https://en.wikipedia.org/> .
  OPTIONAL { ?person wdt:P106 ?occ . ?occ rdfs:label ?occLabel FILTER(lang(?occLabel)="en") }
  OPTIONAL { ?person wdt:P21 ?g . ?g rdfs:label ?genderLabel FILTER(lang(?genderLabel)="en") }
  ?person rdfs:label ?personLabel FILTER(lang(?personLabel)="en")
}
GROUP BY ?person ?personLabel ?birth ?birthPlaceLabel ?countryLabel ?sitelinks ?article ?genderLabel
ORDER BY DESC(?sitelinks)
"""


def database_url(env_path: str | None) -> str:
    """DATABASE_URL from the environment, or from a .env that stays put."""
    url = os.environ.get('DATABASE_URL')
    if url:
        return url
    if env_path:
        for line in pathlib.Path(env_path).read_text(encoding='utf-8').splitlines():
            if line.startswith('DATABASE_URL='):
                return line.split('=', 1)[1].strip().strip('"\'')
    print('no DATABASE_URL — pass --env path/to/.env or set it in the environment',
          file=sys.stderr)
    raise SystemExit(2)


def read_artists(url: str, limit: int, genre: str | None) -> list[dict]:
    """Names out of the artists table, best-documented first.

    The table has no popularity column, so 'most popular' is approximated the
    only way it can be from this schema: artists somebody has bothered to
    write a real biography for, and that carry a MusicBrainz id, are the ones
    the wider world has heard of. Wikidata sitelinks do the real ranking
    afterwards.
    """
    try:
        import psycopg2  # noqa: PLC0415
    except ImportError:
        print('psycopg2 is not installed. Either:\n'
              '  pip3 install --user psycopg2-binary\n'
              'or export the table yourself and pass it with --names-file:\n'
              "  psql \"$DATABASE_URL\" -At -c \"select name from artists\" > names.txt",
              file=sys.stderr)
        raise SystemExit(2)

    where = 'WHERE name IS NOT NULL'
    params: list = []
    if genre:
        where += ' AND genre = %s'
        params.append(genre)
    sql = f"""
        SELECT name, genre, subgenres, location, years_active
        FROM artists
        {where}
        ORDER BY (bio IS NOT NULL AND bio NOT LIKE '[HINT]%%') DESC,
                 (mbid IS NOT NULL) DESC,
                 length(coalesce(bio, '')) DESC
        LIMIT %s
    """
    params.append(limit)
    with psycopg2.connect(url) as conn, conn.cursor() as cur:
        cur.execute(sql, params)
        return [{'name': r[0], 'genre': r[1], 'subgenres': r[2],
                 'location': r[3], 'years': r[4]} for r in cur.fetchall()]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--env', help='file holding DATABASE_URL; never copied into this repo')
    ap.add_argument('--limit', type=int, default=200)
    ap.add_argument('--genre', help='one genre rather than all 32')
    ap.add_argument('--names-file', help='skip Supabase; one artist name per line')
    args = ap.parse_args()

    repo = pathlib.Path(__file__).parent
    if args.names_file:
        names = [{'name': n.strip()} for n in
                 pathlib.Path(args.names_file).read_text(encoding='utf-8').splitlines() if n.strip()]
    else:
        names = read_artists(database_url(args.env), args.limit, args.genre)
    print(f'{len(names)} artists from Supabase\n')

    src = (repo / 'data.js').read_text(encoding='utf-8')
    taken_names = {_fold(n) for n in re.findall(r"name:['\"]([^'\"]+)['\"]", src)}
    known_countries = set(re.findall(r"country:['\"]([^'\"]+)['\"]", src))
    fresh = [a for a in names if _fold(a['name']) not in taken_names]
    print(f'{len(fresh)} of them are not in the roster already')

    # Ask Wikidata in batches; a VALUES list of a few hundred literals times out.
    found: dict[str, dict] = {}
    for i in range(0, len(fresh), 40):
        chunk = fresh[i:i + 40]
        asked = {_fold(a['name']): a for a in chunk}
        literals = ' '.join('"%s"@en' % a['name'].replace('\\', '').replace('"', '')
                            for a in chunk)
        try:
            rows = ask(BY_NAME % literals)
        except Exception as e:  # noqa: BLE001
            print(f'  batch {i // 40 + 1}: {type(e).__name__}, skipped')
            continue
        for b in rows:
            label = b['personLabel']['value']
            if label not in found or int(b['sitelinks']['value']) > found[label]['sitelinks']:
                found[label] = {
                    'name': label, 'birth': b['birth']['value'],
                    'sitelinks': int(b['sitelinks']['value']),
                    'article': b['article']['value'].rsplit('/', 1)[-1].replace('_', ' '),
                    'birthPlace': b.get('birthPlaceLabel', {}).get('value', ''),
                    'country': b.get('countryLabel', {}).get('value', ''),
                    'gender': b.get('genderLabel', {}).get('value', ''),
                    'occupations': b['occs']['value'],
                    # Which row of the artists table this answer came from.
                    'source': asked.get(_fold(label)) or asked.get(_fold(
                        b['article']['value'].rsplit('/', 1)[-1].replace('_', ' '))),
                }
        print(f'  batch {i // 40 + 1}: {len(found)} confirmed so far')
        time.sleep(1.2)

    aliases = {'United States of America': 'USA', 'United Kingdom': 'UK',
               'Kingdom of the Netherlands': 'Netherlands', 'Czech Republic': 'Czechia'}

    # Matching a stage name against labels and aliases finds people who merely
    # share a word with one. The first run returned Antoine Busnois, a French
    # composer who died in 1492, and two seventeenth-century painters — none of
    # them on a Techno label. A name alone is not a match, so corroborate it:
    # the source table is electronic musicians, so the person Wikidata offers
    # has to plausibly be one.
    MUSICAL = ('musician', 'disc jockey', 'dj', 'record producer', 'composer',
               'singer', 'rapper', 'songwriter', 'music', 'guitarist',
               'keyboardist', 'drummer', 'sound', 'audio')
    out, rejected = [], []
    for info in sorted(found.values(), key=lambda x: -x['sitelinks']):
        if _fold(info['name']) in BLOCKED or _fold(info['name']) in taken_names:
            continue
        year = parse_year(info['birth'])
        if year is None:
            continue
        occ = (info['occupations'] or '').lower()
        if not any(m in occ for m in MUSICAL):
            rejected.append((info['name'], year, 'not a musician'))
            continue
        # Recorded electronic music did not exist before this, so anyone the
        # lookup offers from earlier is somebody else with the same name.
        if year < 1900:
            rejected.append((info['name'], year, 'born too early to be this artist'))
            continue
        country = aliases.get(info['country'], info['country'])
        if country not in known_countries:
            continue
        field, subfield = classify(info['occupations'])
        # The table is electronic musicians, and it knows each one's genre.
        # Trust it over the classifier: Wikidata lists a drum-and-bass producer
        # as a "composer", which the occupation map dutifully files under
        # Music/Classical. The roster's own taxonomy has one electronic
        # subfield, so that is where they go — the genre itself is recorded in
        # the bio rather than invented as a new category.
        src_row = info.get('source') or {}
        genre = src_row.get('genre')
        if genre:
            mapped = genre_subfield(genre)
            if mapped:
                field, subfield = 'Music', mapped
        out.append({'genre': genre,
                    'id': slug(info['article'] or info['name']),
                    'name': info['article'] or info['name'],
                    'birth': info['birth'], 'birthYear': year,
                    'birthPlace': info['birthPlace'], 'gender': info['gender'],
                    'country': country, 'field': field, 'subfield': subfield,
                    'occupations': info['occupations'], 'sitelinks': info['sitelinks']})

    (repo / 'roster_supabase.json').write_text(
        json.dumps([{'country': 'SUPABASE', 'have': 0, 'want': len(out), 'candidates': out}],
                   indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'\n{len(out)} confirmed and rankable — wrote roster_supabase.json')
    for c in out[:10]:
        print(f"  {c['name'][:30]:31} {c['birthYear']}  {c['country'][:14]:15} "
              f"{c['field']}/{c['subfield']}  {c.get('genre') or ''}  sl{c['sitelinks']}")
    if len(out) > 10:
        print(f'  … and {len(out) - 10} more')
    if rejected:
        print(f'\nrejected {len(rejected)} as the wrong person of that name:')
        for name, year, why in rejected[:8]:
            print(f'  {name[:30]:31} {year}  {why}')
        if len(rejected) > 8:
            print(f'  … and {len(rejected) - 8} more')
    print('\nnext: python3 roster_write.py --from roster_supabase.json  (or read it first)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
