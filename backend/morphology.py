# Suffix-stripping and Dictionary for Lithuanian Language Learning (LT Kalba)

DICTIONARY = {
    # Países / Valstybės
    "Lietuva": {"translation": "Lituânia", "gender": "F", "type": "substantivo (F)"},
    "Airija": {"translation": "Irlanda", "gender": "F", "type": "substantivo (F)"},
    "Anglija": {"translation": "Inglaterra", "gender": "F", "type": "substantivo (F)"},
    "Vokietija": {"translation": "Alemanha", "gender": "F", "type": "substantivo (F)"},
    "Lenkija": {"translation": "Polônia", "gender": "F", "type": "substantivo (F)"},
    "Rusija": {"translation": "Rússia", "gender": "F", "type": "substantivo (F)"},
    
    # Cidades / Sostinės
    "Vilnius": {"translation": "Vilnius (capital)", "gender": "M", "type": "substantivo (M)"},
    "Ryga": {"translation": "Riga", "gender": "F", "type": "substantivo (F)"},
    "Talinas": {"translation": "Tallinn", "gender": "M", "type": "substantivo (M)"},
    "Berlynas": {"translation": "Berlim", "gender": "M", "type": "substantivo (M)"},
    "Varšuva": {"translation": "Varsóvia", "gender": "F", "type": "substantivo (F)"},
    
    # Pessoas / Profissões
    "italas": {"translation": "italiano (homem)", "gender": "M", "type": "substantivo (M)"},
    "italė": {"translation": "italiana (mulher)", "gender": "F", "type": "substantivo (F)"},
    "mokinys": {"translation": "aluno / estudante", "gender": "M", "type": "substantivo (M)"},
    "mokinė": {"translation": "aluna / estudante", "gender": "F", "type": "substantivo (F)"},
    "vyras": {"translation": "homem / marido", "gender": "M", "type": "substantivo (M)"},
    "moteris": {"translation": "mulher", "gender": "F", "type": "substantivo (F)"},
    "draugas": {"translation": "amigo", "gender": "M", "type": "substantivo (M)"},
    "draugė": {"translation": "amiga", "gender": "F", "type": "substantivo (F)"},
    
    # Alimentos / Bebidas
    "kava": {"translation": "café", "gender": "F", "type": "substantivo (F)"},
    "vanduo": {"translation": "água", "gender": "M", "type": "substantivo (M)"},
    "duona": {"translation": "pão", "gender": "F", "type": "substantivo (F)"},
    "arbata": {"translation": "chá", "gender": "F", "type": "substantivo (F)"},
    "pyragas": {"translation": "bolo", "gender": "M", "type": "substantivo (M)"},
    
    # Outros substantivos e palavras
    "vardas": {"translation": "nome", "gender": "M", "type": "substantivo (M)"},
    "butas": {"translation": "apartamento", "gender": "M", "type": "substantivo (M)"},
    "darbas": {"translation": "trabalho", "gender": "M", "type": "substantivo (M)"},
    "šalis": {"translation": "país / terra", "gender": "F", "type": "substantivo (F)"},
    "miestas": {"translation": "cidade", "gender": "M", "type": "substantivo (M)"},
    "namas": {"translation": "casa / prédio", "gender": "M", "type": "substantivo (M)"},
    "brolis": {"translation": "irmão", "gender": "M", "type": "substantivo (M)"},
    "sesuo": {"translation": "irmã", "gender": "F", "type": "substantivo (F)"},
    
    # Expressões e saudações comuns
    "labas": {"translation": "olá / oi", "type": "expressão"},
    "ačiū": {"translation": "obrigado(a)", "type": "expressão"},
    "prašom": {"translation": "por favor / de nada", "type": "expressão"},
    "atsiprašau": {"translation": "desculpe / com licença", "type": "expressão"},
    "rytas": {"translation": "manhã", "gender": "M", "type": "substantivo (M)"},
    "diena": {"translation": "dia", "gender": "F", "type": "substantivo (F)"},
    "vakaras": {"translation": "tarde / noite", "gender": "M", "type": "substantivo (M)"},
    
    # Verbos (Lemas infinitivos e conjugações de presente conhecidas)
    "būti": {"translation": "ser / estar", "type": "verbo", "conjugations": {
        "esu": "1ª Sing (eu sou/estou)",
        "esi": "2ª Sing (tu és/estás)",
        "yra": "3ª Sing/Plur (ele/ela/eles/elas são/estão)",
        "esame": "1ª Plur (nós somos/estamos)",
        "esate": "2ª Plur (vocês são/estão)"
    }},
    "eiti": {"translation": "ir (a pé)", "type": "verbo", "conjugations": {
        "einu": "1ª Sing (eu vou)",
        "eini": "2ª Sing (tu vais)",
        "eina": "3ª Sing/Plur (ele/ela/eles/elas vão)",
        "einame": "1ª Plur (nós vamos)",
        "einate": "2ª Plur (vocês vão)"
    }},
    "gyventi": {"translation": "morar / viver", "type": "verbo", "conjugations": {
        "gyvenu": "1ª Sing (eu moro)",
        "gyveni": "2ª Sing (tu moras)",
        "gyvena": "3ª Sing/Plur (ele/ela/eles/elas moram)",
        "gyvename": "1ª Plur (nós moramos)",
        "gyvenate": "2ª Plur (vocês moram)"
    }},
    "norėti": {"translation": "querer", "type": "verbo", "conjugations": {
        "noriu": "1ª Sing (eu quero)",
        "nori": "2ª/3ª Sing/Plur (tu queres, ele/eles querem)",
        "norime": "1ª Plur (nós queremos)",
        "norite": "2ª Plur (vocês querem)"
    }},
    "dirbti": {"translation": "trabalhar", "type": "verbo", "conjugations": {
        "dirbu": "1ª Sing (eu trabalho)",
        "dirbi": "2ª Sing (tu trabalhas)",
        "dirba": "3ª Sing/Plur (ele/ela/eles/elas trabalham)",
        "dirbame": "1ª Plur (nós trabalhamos)",
        "dirbate": "2ª Plur (vocês trabalham)"
    }},
    "turėti": {"translation": "ter", "type": "verbo", "conjugations": {
        "turiu": "1ª Sing (eu tenho)",
        "turi": "2ª/3ª Sing/Plur (tu tens, ele/eles têm)",
        "turime": "1ª Plur (nós temos)",
        "turite": "2ª Plur (vocês têm)"
    }},
    "kalbėti": {"translation": "falar", "type": "verbo", "conjugations": {
        "kalbu": "1ª Sing (eu falo)",
        "kalbi": "2ª Sing (tu falas)",
        "kalba": "3ª Sing/Plur (ele/ela/eles/elas falam)",
        "kalbame": "1ª Plur (nós falamos)",
        "kalbate": "2ª Plur (vocês falam)"
    }},
    "suprasti": {"translation": "entender", "type": "verbo", "conjugations": {
        "suprantu": "1ª Sing (eu entendo)",
        "supranti": "2ª Sing (tu entendes)",
        "supranta": "3ª Sing/Plur (ele/ela/eles/elas entendem)",
        "suprantame": "1ª Plur (nós entendemos)",
        "suprantate": "2ª Plur (vocês entendem)"
    }}
}

# Suffix rules mapped by descending length of suffix to avoid partial matches
SUFFIX_RULES = [
    # Locativo (Kur?)
    {"suffix": "iuje", "case": "Locativo (Kur?)", "replace": "ius", "gender": "M"},
    {"suffix": "yje", "case": "Locativo (Kur?)", "replace": "is", "gender": "M"}, # can also map to -ys (handled dynamically)
    {"suffix": "uje", "case": "Locativo (Kur?)", "replace": "us", "gender": "M"},
    {"suffix": "oje", "case": "Locativo (Kur?)", "replace": "a", "gender": "F"},
    {"suffix": "ėje", "case": "Locativo (Kur?)", "replace": "ė", "gender": "F"},
    {"suffix": "e", "case": "Locativo (Kur?)", "replace": "as", "gender": "M"},
    
    # Genitivo (Ko?)
    {"suffix": "iaus", "case": "Genitivo (Ko?)", "replace": "us", "gender": "M"},
    {"suffix": "io", "case": "Genitivo (Ko?)", "replace": "is", "gender": "M"}, # can also map to -ys
    {"suffix": "o", "case": "Genitivo (Ko?)", "replace": "as", "gender": "M"},
    {"suffix": "os", "case": "Genitivo (Ko?)", "replace": "a", "gender": "F"},
    {"suffix": "ės", "case": "Genitivo (Ko?)", "replace": "ė", "gender": "F"},
    
    # Acusativo (Ką?)
    {"suffix": "ą", "case": "Acusativo (Ką?)", "replace": "as", "gender": "M"}, # can also map to -a
    {"suffix": "ą", "case": "Acusativo (Ką?)", "replace": "a", "gender": "F"},
    {"suffix": "ę", "case": "Acusativo (Ką?)", "replace": "ė", "gender": "F"},
    {"suffix": "į", "case": "Acusativo (Ką?)", "replace": "is", "gender": "M"}, # can also map to -ys
    {"suffix": "ų", "case": "Acusativo (Ką?)", "replace": "us", "gender": "M"},
]

# Alternate maps if first candidate is not in dictionary
ALTERNATE_MAPS = {
    "yje": "ys",
    "io": "ys",
    "į": "ys",
    "ą": "a"
}

def analyze_word(word: str) -> dict:
    # Normalize word
    cleaned = word.strip().strip(",.?!:;()\"'“”-*").lower()
    
    # 1. Check if word is already a direct lemma
    for lemma, info in DICTIONARY.items():
        if lemma.lower() == cleaned:
            return {
                "word": word,
                "lemma": lemma,
                "case": "Nominativo (Kas?)" if info.get("type") != "verbo" else "Infinitivo",
                "gender": info.get("gender", "N/A"),
                "translation": info["translation"],
                "type": info.get("type", "substantivo")
            }
            
    # 2. Check if word is a conjugated form of a verb
    for verb, info in DICTIONARY.items():
        if info.get("type") == "verbo" and "conjugations" in info:
            if cleaned in info["conjugations"]:
                return {
                    "word": word,
                    "lemma": verb,
                    "case": f"Presente ({info['conjugations'][cleaned]})",
                    "gender": "N/A",
                    "translation": info["translation"],
                    "type": "verbo"
                }

    # 3. Apply suffix-stripping rules
    for rule in SUFFIX_RULES:
        suffix = rule["suffix"]
        if cleaned.endswith(suffix):
            stem = cleaned[:-len(suffix)]
            
            # Primary candidate
            candidate = stem + rule["replace"]
            matched_lemma = None
            for lemma in DICTIONARY:
                if lemma.lower() == candidate:
                    matched_lemma = lemma
                    break
            
            if matched_lemma:
                info = DICTIONARY[matched_lemma]
                return {
                    "word": word,
                    "lemma": matched_lemma,
                    "case": rule["case"],
                    "gender": info.get("gender", rule["gender"]),
                    "translation": info["translation"],
                    "type": info.get("type", "substantivo")
                }
                
            # Secondary candidate (alternate ending mapping)
            if suffix in ALTERNATE_MAPS:
                alt_candidate = stem + ALTERNATE_MAPS[suffix]
                matched_alt = None
                for lemma in DICTIONARY:
                    if lemma.lower() == alt_candidate:
                        matched_alt = lemma
                        break
                
                if matched_alt:
                    info = DICTIONARY[matched_alt]
                    return {
                        "word": word,
                        "lemma": matched_alt,
                        "case": rule["case"],
                        "gender": info.get("gender", rule["gender"]),
                        "translation": info["translation"],
                        "type": info.get("type", "substantivo")
                    }

    # 4. Fallback if no rules matched
    return {
        "word": word,
        "lemma": word,
        "case": "Nominativo ou Desconhecido",
        "gender": "N/A",
        "translation": "Tradução não encontrada",
        "type": "N/A"
    }
