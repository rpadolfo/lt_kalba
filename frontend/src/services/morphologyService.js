// Suffix-stripping and Morphological Analyzer for Lithuanian (LT Kalba)
// Reusable client-side service for offline analysis and tooltip translation

export const DICTIONARY = {
  // Países / Valstybės
  "Lietuva": { translation: "Lituânia", gender: "F", type: "substantivo (F)" },
  "Airija": { translation: "Irlanda", gender: "F", type: "substantivo (F)" },
  "Anglija": { translation: "Inglaterra", gender: "F", type: "substantivo (F)" },
  "Vokietija": { translation: "Alemanha", gender: "F", type: "substantivo (F)" },
  "Lenkija": { translation: "Polônia", gender: "F", type: "substantivo (F)" },
  "Rusija": { translation: "Rússia", gender: "F", type: "substantivo (F)" },
  "Brazilija": { translation: "Brasil", gender: "F", type: "substantivo (F)" },

  // Cidades / Sostinės
  "Vilnius": { translation: "Vilnius (capital)", gender: "M", type: "substantivo (M)" },
  "Kaunas": { translation: "Kaunas (cidade)", gender: "M", type: "substantivo (M)" },
  "Klaipėda": { translation: "Klaipėda (cidade litorânea)", gender: "F", type: "substantivo (F)" },
  "Ryga": { translation: "Riga", gender: "F", type: "substantivo (F)" },
  "Talinas": { translation: "Tallinn", gender: "M", type: "substantivo (M)" },
  "Berlynas": { translation: "Berlim", gender: "M", type: "substantivo (M)" },
  "Varšuva": { translation: "Varsóvia", gender: "F", type: "substantivo (F)" },
  "Trakai": { translation: "Trakai (cidade histórica)", gender: "M", type: "substantivo (M pl.)" },
  "Šiauliai": { translation: "Šiauliai (cidade)", gender: "M", type: "substantivo (M pl.)" },
  "Panevėžys": { translation: "Panevėžys (cidade)", gender: "M", type: "substantivo (M)" },

  // Pessoas / Nacionalidades / Profissões
  "lietuvis": { translation: "lituano (homem)", gender: "M", type: "substantivo (M)" },
  "lietuvė": { translation: "lituana (mulher)", gender: "F", type: "substantivo (F)" },
  "brazilas": { translation: "brasileiro (homem)", gender: "M", type: "substantivo (M)" },
  "brazilė": { translation: "brasileira (mulher)", gender: "F", type: "substantivo (F)" },
  "italas": { translation: "italiano (homem)", gender: "M", type: "substantivo (M)" },
  "italė": { translation: "italiana (mulher)", gender: "F", type: "substantivo (F)" },
  "mokinys": { translation: "aluno / estudante", gender: "M", type: "substantivo (M)" },
  "mokinė": { translation: "aluna / estudante", gender: "F", type: "substantivo (F)" },
  "mokytojas": { translation: "professor", gender: "M", type: "substantivo (M)" },
  "mokytoja": { translation: "professora", gender: "F", type: "substantivo (F)" },
  "vyras": { translation: "homem / marido", gender: "M", type: "substantivo (M)" },
  "moteris": { translation: "mulher", gender: "F", type: "substantivo (F)" },
  "draugas": { translation: "amigo", gender: "M", type: "substantivo (M)" },
  "draugė": { translation: "amiga", gender: "F", type: "substantivo (F)" },
  "padavėja": { translation: "garçonete", gender: "F", type: "substantivo (F)" },
  "padavėjas": { translation: "garçom", gender: "M", type: "substantivo (M)" },
  "kasininkė": { translation: "caixa / atendente de guichê", gender: "F", type: "substantivo (F)" },
  "gydytojas": { translation: "médico", gender: "M", type: "substantivo (M)" },
  "gydytoja": { translation: "médica", gender: "F", type: "substantivo (F)" },
  "turistas": { translation: "turista", gender: "M", type: "substantivo (M)" },
  "studentas": { translation: "estudante (homem)", gender: "M", type: "substantivo (M)" },
  "studentė": { translation: "estudante (mulher)", gender: "F", type: "substantivo (F)" },
  "mama": { translation: "mãe", gender: "F", type: "substantivo (F)" },
  "tėtis": { translation: "pai / papai", gender: "M", type: "substantivo (M)" },
  "sūnus": { translation: "filho", gender: "M", type: "substantivo (M)" },
  "duktė": { translation: "filha", gender: "F", type: "substantivo (F)" },
  "Jonas": { translation: "Jonas (nome próprio)", gender: "M", type: "nome próprio" },
  "Maria": { translation: "Maria (nome próprio)", gender: "F", type: "nome próprio" },

  // Alimentos / Bebidas
  "kava": { translation: "café", gender: "F", type: "substantivo (F)" },
  "vanduo": { translation: "água", gender: "M", type: "substantivo (M)" },
  "duona": { translation: "pão", gender: "F", type: "substantivo (F)" },
  "arbata": { translation: "chá", gender: "F", type: "substantivo (F)" },
  "pyragas": { translation: "bolo", gender: "M", type: "substantivo (M)" },
  "pienas": { translation: "leite", gender: "M", type: "substantivo (M)" },
  "alus": { translation: "cerveja", gender: "M", type: "substantivo (M)" },
  "medus": { translation: "mel", gender: "M", type: "substantivo (M)" },
  "žuvis": { translation: "peixe", gender: "F", type: "substantivo (F)" },

  // Substantivos Gerais
  "vardas": { translation: "nome", gender: "M", type: "substantivo (M)" },
  "butas": { translation: "apartamento", gender: "M", type: "substantivo (M)" },
  "darbas": { translation: "trabalho", gender: "M", type: "substantivo (M)" },
  "šalis": { translation: "país / terra", gender: "F", type: "substantivo (F)" },
  "miestas": { translation: "cidade", gender: "M", type: "substantivo (M)" },
  "namas": { translation: "casa / prédio", gender: "M", type: "substantivo (M)" },
  "brolis": { translation: "irmão", gender: "M", type: "substantivo (M)" },
  "sesuo": { translation: "irmã", gender: "F", type: "substantivo (F)" },
  "laikas": { translation: "tempo / hora", gender: "M", type: "substantivo (M)" },
  "vieta": { translation: "lugar / vaga", gender: "F", type: "substantivo (F)" },
  "diena": { translation: "dia", gender: "F", type: "substantivo (F)" },
  "rytas": { translation: "manhã", gender: "M", type: "substantivo (M)" },
  "vakaras": { translation: "tarde / noite", gender: "M", type: "substantivo (M)" },
  "naktis": { translation: "noite", gender: "F", type: "substantivo (F)" },
  "kambarys": { translation: "quarto / cômodo", gender: "M", type: "substantivo (M)" },
  "medis": { translation: "árvore", gender: "M", type: "substantivo (M)" },
  "stalas": { translation: "mesa", gender: "M", type: "substantivo (M)" },
  "knyga": { translation: "livro", gender: "F", type: "substantivo (F)" },
  "peilis": { translation: "faca", gender: "M", type: "substantivo (M)" },
  "automobilis": { translation: "automóvel / carro", gender: "M", type: "substantivo (M)" },
  "traukinys": { translation: "trem", gender: "M", type: "substantivo (M)" },
  "bilietas": { translation: "bilhete / passagem", gender: "M", type: "substantivo (M)" },
  "bankas": { translation: "banco", gender: "M", type: "substantivo (M)" },
  "paštas": { translation: "correios", gender: "M", type: "substantivo (M)" },
  "viešbutis": { translation: "hotel", gender: "M", type: "substantivo (M)" },
  "kavinė": { translation: "cafeteria", gender: "F", type: "substantivo (F)" },
  "biblioteka": { translation: "biblioteca", gender: "F", type: "substantivo (F)" },
  "stotis": { translation: "estação (de trem/ônibus)", gender: "F", type: "substantivo (F)" },
  "stotelė": { translation: "parada / ponto de ônibus", gender: "F", type: "substantivo (F)" },
  "ligoninė": { translation: "hospital", gender: "F", type: "substantivo (F)" },
  "restoranas": { translation: "restaurante", gender: "M", type: "substantivo (M)" },
  "parduotuvė": { translation: "loja", gender: "F", type: "substantivo (F)" },
  "universitetas": { translation: "universidade", gender: "M", type: "substantivo (M)" },
  "mokykla": { translation: "escola", gender: "F", type: "substantivo (F)" },
  "virtuvė": { translation: "cozinha", gender: "F", type: "substantivo (F)" },
  "centras": { translation: "centro", gender: "M", type: "substantivo (M)" },
  "gatvė": { translation: "rua", gender: "F", type: "substantivo (F)" },
  "aikštė": { translation: "praça", gender: "F", type: "substantivo (F)" },
  "turgus": { translation: "feira / mercado livre", gender: "M", type: "substantivo (M)" },
  "teatras": { translation: "teatro", gender: "M", type: "substantivo (M)" },
  "parkas": { translation: "parque", gender: "M", type: "substantivo (M)" },
  "vaistinė": { translation: "farmácia", gender: "F", type: "substantivo (F)" },
  "pilis": { translation: "castelo", gender: "F", type: "substantivo (F)" },
  "dalis": { translation: "parte", gender: "F", type: "substantivo (F)" },
  "katė": { translation: "gata / gato", gender: "F", type: "substantivo (F)" },
  "gėlė": { translation: "flor", gender: "F", type: "substantivo (F)" },
  "gaidys": { translation: "galo", gender: "M", type: "substantivo (M)" },
  "lietus": { translation: "chuva", gender: "M", type: "substantivo (M)" },
  "kelias": { translation: "caminho / estrada", gender: "M", type: "substantivo (M)" },
  "pinigai": { translation: "dinheiro", gender: "M", type: "substantivo (M pl.)" },
  "sąskaita": { translation: "conta / fatura", gender: "F", type: "substantivo (F)" },
  "kortelė": { translation: "cartão (bancário)", gender: "F", type: "substantivo (F)" },
  "valanda": { translation: "hora", gender: "F", type: "substantivo (F)" },
  "pagalba": { translation: "ajuda", gender: "F", type: "substantivo (F)" },

  // Adjetivos
  "gražus": { translation: "bonito / belo", gender: "M", type: "adjetivo" },
  "graži": { translation: "bonita / bela", gender: "F", type: "adjetivo" },
  "didelis": { translation: "grande", gender: "M", type: "adjetivo" },
  "didelė": { translation: "grande", gender: "F", type: "adjetivo" },
  "mažas": { translation: "pequeno", gender: "M", type: "adjetivo" },
  "maža": { translation: "pequena", gender: "F", type: "adjetivo" },
  "geras": { translation: "bom", gender: "M", type: "adjetivo" },
  "gera": { translation: "boa", gender: "F", type: "adjetivo" },
  "naujas": { translation: "novo", gender: "M", type: "adjetivo" },
  "nauja": { translation: "nova", gender: "F", type: "adjetivo" },
  "sveikas": { translation: "saudável / são / bem-vindo", gender: "M", type: "adjetivo" },
  "sveika": { translation: "saudável / sã / bem-vinda", gender: "F", type: "adjetivo" },
  "laba": { translation: "boa / bom (usado em Laba diena)", lemma: "labas", gender: "F", type: "adjetivo (F)", case: "Nominativo (Kas?)" },

  // Expressões, Advérbios e Saudações
  "labas": { translation: "olá / oi", type: "expressão" },
  "ačiū": { translation: "obrigado(a)", type: "expressão" },
  "prašom": { translation: "por favor / de nada / aqui está", type: "expressão" },
  "prašau": { translation: "por favor / eu peço", type: "expressão" },
  "atsiprašau": { translation: "desculpe / com licença", type: "expressão" },
  "taip": { translation: "sim", type: "advérbio" },
  "ne": { translation: "não", type: "advérbio" },
  "labai": { translation: "muito", type: "advérbio" },
  "daug": { translation: "muito / bastante", type: "advérbio" },
  "kur": { translation: "onde", type: "advérbio interrogativo" },
  "dabar": { translation: "agora", type: "advérbio" },
  "čia": { translation: "aqui", type: "advérbio" },
  "ten": { translation: "lá / ali", type: "advérbio" },
  "tuoj": { translation: "logo / já / imediatamente", type: "advérbio" },
  "irgi": { translation: "também", type: "advérbio" },
  "malonu": { translation: "prazer / agradável", type: "advérbio" },

  // Preposições e Conjunções
  "ir": { translation: "e", type: "conjunção" },
  "o": { translation: "e / mas / e quanto a", type: "conjunção" },
  "bet": { translation: "mas / porém", type: "conjunção" },
  "iš": { translation: "de / a partir de (+ Genitivo)", type: "preposição" },
  "į": { translation: "para / em direção a (+ Acusativo)", type: "preposição" },
  "su": { translation: "com (+ Instrumental)", type: "preposição" },
  "be": { translation: "sem (+ Genitivo)", type: "preposição" },

  // Pronomes Funcionais
  "aš": { translation: "eu", type: "pronome pessoal", lemma: "aš", case: "Nominativo (Kas?)" },
  "man": { translation: "a mim / para mim", type: "pronome pessoal", lemma: "aš", case: "Dativo (Kam?)" },
  "mane": { translation: "a mim / me", type: "pronome pessoal", lemma: "aš", case: "Acusativo (Ką?)" },
  "mano": { translation: "meu / minha", type: "pronome possessivo", lemma: "mano", case: "Genitivo" },
  "tu": { translation: "tu / você", type: "pronome pessoal", lemma: "tu", case: "Nominativo (Kas?)" },
  "tau": { translation: "a ti / para você", type: "pronome pessoal", lemma: "tu", case: "Dativo (Kam?)" },
  "tave": { translation: "a ti / te", type: "pronome pessoal", lemma: "tu", case: "Acusativo (Ką?)" },
  "tavo": { translation: "teu / tua / seu / sua", type: "pronome possessivo", lemma: "tavo", case: "Genitivo" },
  "jis": { translation: "ele", type: "pronome pessoal", lemma: "jis", case: "Nominativo (Kas?)", gender: "M" },
  "ji": { translation: "ela", type: "pronome pessoal", lemma: "ji", case: "Nominativo (Kas?)", gender: "F" },
  "kas": { translation: "quem / o que", type: "pronome interrogativo", lemma: "kas", case: "Nominativo (Kas?)" },
  "ko": { translation: "de quem / de que", type: "pronome interrogativo", lemma: "kas", case: "Genitivo (Ko?)" },
  "ką": { translation: "o que / quem", type: "pronome interrogativo", lemma: "kas", case: "Acusativo (Ką?)" },

  // Verbos (com conjugações de presente)
  "būti": {
    translation: "ser / estar",
    type: "verbo",
    conjugations: {
      "esu": "1ª Sing (eu sou/estou)",
      "esi": "2ª Sing (tu és/estás)",
      "yra": "3ª Sing/Plur (ele/ela/eles/elas são/estão)",
      "esame": "1ª Plur (nós somos/estamos)",
      "esate": "2ª Plur (vocês são/estão)"
    }
  },
  "eiti": {
    translation: "ir (a pé)",
    type: "verbo",
    conjugations: {
      "einu": "1ª Sing (eu vou)",
      "eini": "2ª Sing (tu vais)",
      "eina": "3ª Sing/Plur (ele/ela/eles/elas vão)",
      "einame": "1ª Plur (nós vamos)",
      "einate": "2ª Plur (vocês vão)"
    }
  },
  "gyventi": {
    translation: "morar / viver",
    type: "verbo",
    conjugations: {
      "gyvenu": "1ª Sing (eu moro)",
      "gyveni": "2ª Sing (tu moras)",
      "gyvena": "3ª Sing/Plur (ele/ela/eles/elas moram)",
      "gyvename": "1ª Plur (nós moramos)",
      "gyvenate": "2ª Plur (vocês moram)"
    }
  },
  "norėti": {
    translation: "querer",
    type: "verbo",
    conjugations: {
      "noriu": "1ª Sing (eu quero)",
      "nori": "2ª/3ª Sing/Plur (tu queres / ele quer)",
      "norime": "1ª Plur (nós queremos)",
      "norite": "2ª Plur (vocês querem)"
    }
  },
  "dirbti": {
    translation: "trabalhar",
    type: "verbo",
    conjugations: {
      "dirbu": "1ª Sing (eu trabalho)",
      "dirbi": "2ª Sing (tu trabalhas)",
      "dirba": "3ª Sing/Plur (ele/ela/eles/elas trabalham)",
      "dirbame": "1ª Plur (nós trabalhamos)",
      "dirbate": "2ª Plur (vocês trabalham)"
    }
  },
  "turėti": {
    translation: "ter",
    type: "verbo",
    conjugations: {
      "turiu": "1ª Sing (eu tenho)",
      "turi": "2ª/3ª Sing/Plur (tu tens / ele tem)",
      "turime": "1ª Plur (nós temos)",
      "turite": "2ª Plur (vocês têm)",
      "neturiu": "1ª Sing Negação (eu não tenho)",
      "neturi": "2ª/3ª Sing Negação (tu não tens / ele não tem)"
    }
  },
  "kalbėti": {
    translation: "falar",
    type: "verbo",
    conjugations: {
      "kalbu": "1ª Sing (eu falo)",
      "kalbi": "2ª Sing (tu falas)",
      "kalba": "3ª Sing/Plur (ele/ela/eles/elas falam)",
      "kalbame": "1ª Plur (nós falamos)",
      "kalbate": "2ª Plur (vocês falam)"
    }
  },
  "suprasti": {
    translation: "entender",
    type: "verbo",
    conjugations: {
      "suprantu": "1ª Sing (eu entendo)",
      "supranti": "2ª Sing (tu entendes)",
      "supranta": "3ª Sing/Plur (ele/ela/eles/elas entendem)",
      "suprantame": "1ª Plur (nós entendemos)",
      "suprantate": "2ª Plur (vocês entendem)"
    }
  },
  "susipažinti": {
    translation: "conhecer(-se)",
    type: "verbo reflexivo",
    conjugations: {
      "susipažįstu": "1ª Sing (eu conheço)",
      "susipažįsti": "2ª Sing (tu conheces)",
      "susipažįsta": "3ª Sing/Plur (conhece/conhecem)"
    }
  },
  "užsisakyti": {
    translation: "pedir / encomendar",
    type: "verbo reflexivo",
    conjugations: {
      "užsisakau": "1ª Sing (eu peço)",
      "užsisakai": "2ª Sing (tu pedes)",
      "užsisako": "3ª Sing/Plur (ele pede / pedem)",
      "užsisakome": "1ª Plur (nós pedimos)",
      "užsisakote": "2ª Plur (vocês pedem)"
    }
  },
  "atnešti": {
    translation: "trazer",
    type: "verbo",
    conjugations: {
      "atnešu": "Presente (1ª Sing)",
      "atneši": "Presente (2ª Sing)",
      "atneša": "Presente (3ª Pessoa)",
      "atnešiu": "Futuro (1ª Sing: eu trarei)"
    }
  },
  "atvykti": {
    translation: "chegar / vir",
    type: "verbo",
    conjugations: {
      "atvykstu": "Presente (1ª Sing)",
      "atvyksti": "Presente (2ª Sing)",
      "atvyksta": "Presente (3ª Pessoa)",
      "atvykusi": "Particípio Passado Ativo Feminino (chegada)"
    }
  },
  "gerti": {
    translation: "beber",
    type: "verbo",
    conjugations: {
      "geriu": "Presente (1ª Sing)",
      "geri": "Presente (2ª Sing)",
      "geria": "Presente (3ª Pessoa)",
      "geriame": "Presente (1ª Plur)",
      "geriate": "Presente (2ª Plur)",
      "gersiu": "Futuro (1ª Sing)",
      "gersite": "Futuro (2ª Plur)"
    }
  },
  "važiuoti": {
    translation: "ir (de transporte / viajar)",
    type: "verbo",
    conjugations: {
      "važiuoju": "Presente (1ª Sing)",
      "važiuoji": "Presente (2ª Sing)",
      "važiuoja": "Presente (3ª Pessoa)",
      "važiuojame": "Presente (1ª Plur)",
      "važiuojate": "Presente (2ª Plur)"
    }
  },
  "mokėti": {
    translation: "pagar / saber fazer",
    type: "verbo",
    conjugations: {
      "moku": "Presente (1ª Sing)",
      "moki": "Presente (2ª Sing)",
      "moka": "Presente (3ª Pessoa)",
      "mokate": "Presente (2ª Plur)",
      "mokėsiu": "Futuro (1ª Sing: eu pagarei)",
      "mokėsite": "Futuro (2ª Plur: vocês pagarão)"
    }
  },
  "kainuoti": {
    translation: "custar",
    type: "verbo",
    conjugations: {
      "kainuoja": "Presente (3ª Pessoa: custa / custam)"
    }
  },
  "pirkti": {
    translation: "comprar",
    type: "verbo",
    conjugations: {
      "perku": "Presente (1ª Sing)",
      "perki": "Presente (2ª Sing)",
      "perka": "Presente (3ª Pessoa)",
      "perkame": "Presente (1ª Plur)",
      "perkate": "Presente (2a Plur)"
    }
  }
};

// Suffix rules mapped by descending length to prevent partial prefix collision
export const SUFFIX_RULES = [
  // Locativo (Kur? - Onde?)
  { suffix: "iuje", case: "Locativo (Kur?)", replace: "ius", gender: "M" },
  { suffix: "yje", case: "Locativo (Kur?)", replace: "is", gender: "M" },
  { suffix: "uje", case: "Locativo (Kur?)", replace: "us", gender: "M" },
  { suffix: "oje", case: "Locativo (Kur?)", replace: "a", gender: "F" },
  { suffix: "ėje", case: "Locativo (Kur?)", replace: "ė", gender: "F" },
  { suffix: "e", case: "Locativo (Kur?)", replace: "as", gender: "M" },

  // Genitivo (Ko? - De quem? / Negação / Partitivo)
  { suffix: "iaus", case: "Genitivo (Ko?)", replace: "us", gender: "M" },
  { suffix: "io", case: "Genitivo (Ko?)", replace: "is", gender: "M" },
  { suffix: "o", case: "Genitivo (Ko?)", replace: "as", gender: "M" },
  { suffix: "os", case: "Genitivo (Ko?)", replace: "a", gender: "F" },
  { suffix: "ės", case: "Genitivo (Ko?)", replace: "ė", gender: "F" },

  // Acusativo (Ką? - Objeto direto / Direção)
  { suffix: "ą", case: "Acusativo (Ką?)", replace: "as", gender: "M" },
  { suffix: "ę", case: "Acusativo (Ką?)", replace: "ė", gender: "F" },
  { suffix: "į", case: "Acusativo (Ką?)", replace: "is", gender: "M" },
  { suffix: "ų", case: "Acusativo (Ką?)", replace: "us", gender: "M" }
];

export const ALTERNATE_MAPS = {
  "yje": "ys",
  "io": "ys",
  "į": "ys",
  "ą": "a"
};

/**
 * Analyzes a Lithuanian word, identifying its lemma, grammatical case, gender, and Portuguese translation.
 * Runs 100% offline in client-side JavaScript.
 * 
 * @param {string} rawWord - Raw word clicked or typed by the user
 * @returns {object} Analysis result { word, lemma, case, gender, translation, type }
 */
export function analyzeWord(rawWord) {
  if (!rawWord || typeof rawWord !== "string") {
    return {
      word: "",
      lemma: "",
      case: "N/A",
      gender: "N/A",
      translation: "Palavra inválida",
      type: "N/A"
    };
  }

  // Strip leading and trailing punctuation (quotes, periods, commas, exclamation/question marks)
  const cleaned = rawWord
    .trim()
    .replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+/, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+$/, '')
    .toLowerCase();

  if (!cleaned) {
    return {
      word: rawWord,
      lemma: rawWord,
      case: "N/A",
      gender: "N/A",
      translation: "Sinal de pontuação",
      type: "pontuação"
    };
  }

  // Helper to find lemma in dictionary case-insensitively
  const findInDict = (searchStr) => {
    const lower = searchStr.toLowerCase();
    for (const [key, value] of Object.entries(DICTIONARY)) {
      if (key.toLowerCase() === lower) {
        return { lemma: key, info: value };
      }
    }
    return null;
  };

  // 1. Direct Lemma / Word match
  const directMatch = findInDict(cleaned);
  if (directMatch) {
    const { lemma, info } = directMatch;
    let grammaticalCase = "Nominativo (Kas?)";
    if (info.type === "verbo" || info.type === "verbo reflexivo") {
      grammaticalCase = "Infinitivo";
    } else if (info.case) {
      grammaticalCase = info.case;
    }

    return {
      word: rawWord,
      lemma: info.lemma || lemma,
      case: grammaticalCase,
      gender: info.gender || "N/A",
      translation: info.translation,
      type: info.type || "substantivo"
    };
  }

  // 2. Conjugated Verb or Participle match
  for (const [verb, info] of Object.entries(DICTIONARY)) {
    if ((info.type === "verbo" || info.type === "verbo reflexivo") && info.conjugations) {
      if (info.conjugations[cleaned]) {
        return {
          word: rawWord,
          lemma: verb,
          case: `Presente (${info.conjugations[cleaned]})`,
          gender: "N/A",
          translation: info.translation,
          type: info.type
        };
      }
    }
  }

  // 3. Adjective agreement (gražiame -> gražus)
  if (cleaned.endsWith("iame")) {
    const stem = cleaned.slice(0, -4);
    const candidate = stem + "us";
    const match = findInDict(candidate);
    if (match) {
      return {
        word: rawWord,
        lemma: match.lemma,
        case: "Locativo Masculino",
        gender: "M",
        translation: match.info.translation,
        type: "adjetivo"
      };
    }
  }

  // 4. Suffix-Stripping Rules (Noun Cases)
  for (const rule of SUFFIX_RULES) {
    const suffix = rule.suffix;
    if (cleaned.endsWith(suffix) && cleaned.length > suffix.length) {
      const stem = cleaned.slice(0, -suffix.length);

      // 4a. Primary candidate
      const candidate = stem + rule.replace;
      const matched = findInDict(candidate);
      if (matched) {
        return {
          word: rawWord,
          lemma: matched.lemma,
          case: rule.case,
          gender: matched.info.gender || rule.gender,
          translation: matched.info.translation,
          type: matched.info.type || "substantivo"
        };
      }

      // 4b. Alternate mapping (e.g. -yje -> -ys, -ą -> -a)
      if (ALTERNATE_MAPS[suffix]) {
        const altCandidate = stem + ALTERNATE_MAPS[suffix];
        const altMatched = findInDict(altCandidate);
        if (altMatched) {
          return {
            word: rawWord,
            lemma: altMatched.lemma,
            case: rule.case,
            gender: altMatched.info.gender || rule.gender,
            translation: altMatched.info.translation,
            type: altMatched.info.type || "substantivo"
          };
        }
      }
    }
  }

  // 5. Fallback for unregistered words
  return {
    word: rawWord,
    lemma: rawWord,
    case: "Forma desconhecida",
    gender: "N/A",
    translation: "Tradução não cadastrada",
    type: "N/A"
  };
}

export const morphologyService = {
  DICTIONARY,
  SUFFIX_RULES,
  ALTERNATE_MAPS,
  analyzeWord
};
