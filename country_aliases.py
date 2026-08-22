"""country_aliases.py — Wikidata's names for places, mapped to the roster's.

One table, imported by every script that reads Wikidata, because keeping a
copy per script is how "United States" came to be missing from all three of
them at once. The label service answers with whichever label the item happens
to carry — "United States" for some queries and "United States of America" for
others — and a country the roster does not recognise is silently dropped, so
that single missing key meant every American fell out of a pass without
anything being reported. Tony Hawk, Shaun White and Chloe Kim among them.

If a pass comes back suspiciously short of a country you would expect, look
here first.
"""

ALIASES = {
    # The same place under both of Wikidata's names for it.
    'United States': 'USA',
    'United States of America': 'USA',
    'United Kingdom': 'UK',
    'United Kingdom of Great Britain and Ireland': 'UK',
    'Kingdom of the Netherlands': 'Netherlands',
    'Kingdom of Denmark': 'Denmark',
    'Democratic Republic of the Congo': 'DR Congo',
    'Republic of the Congo': 'Congo',
    'Czech Republic': 'Czechia',
    'Republic of Ireland': 'Ireland',
    'Irish Free State': 'Ireland',
    "People's Republic of China": 'China',
    'Republic of Korea': 'South Korea',
    'South Korea': 'South Korea',
    'Ivory Coast': "Côte d'Ivoire",
    'Cape Verde': 'Cabo Verde',
    'Timor-Leste': 'East Timor',
    'Russian Federation': 'Russia',
    'Federal Republic of Germany': 'Germany',
    'German Democratic Republic': 'Germany',
    'Kingdom of Great Britain': 'UK',
    'Weimar Republic': 'Germany',
    'Soviet Union': 'Russia',
    'Kingdom of Italy': 'Italy',
    'French Republic': 'France',
    'Republic of India': 'India',
}


def to_roster(label: str) -> str:
    """Wikidata's label for a country, as the roster spells it."""
    return ALIASES.get(label, label)
