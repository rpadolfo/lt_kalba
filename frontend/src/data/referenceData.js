// Lithuanian Alphabet (Abėcėlė) and Declensions Reference Data
// Enriched with Brazilian Portuguese phonetic approximations for intuitive learning

export const ALPHABET_DATA = [
  {
    letter: "A a",
    name: "a",
    phonetic: "Som de 'A' aberto (como em casa)",
    isSpecial: false
  },
  {
    letter: "Ą ą",
    name: "a nosinė",
    phonetic: "Som de 'A' longo e aberto (como 'canto' sustentado; vogal longa)",
    badge: "Vogal Longa",
    isSpecial: true
  },
  {
    letter: "B b",
    name: "bė",
    phonetic: "Som de 'B' (como em bola)",
    isSpecial: false
  },
  {
    letter: "C c",
    name: "cė",
    phonetic: "Som de 'TS' (como em pizza ou tsunami)",
    isSpecial: false
  },
  {
    letter: "Č č",
    name: "čė",
    phonetic: "Som de 'TCH' (como em tchau ou chocolate)",
    badge: "Paukščiukas (Caron)",
    isSpecial: true
  },
  {
    letter: "D d",
    name: "dė",
    phonetic: "Som de 'D' dental duro (como em dado; nunca 'dj' de dia)",
    isSpecial: false
  },
  {
    letter: "E e",
    name: "e",
    phonetic: "Som de 'É' aberto e curto (como em festa ou pé)",
    isSpecial: false
  },
  {
    letter: "Ę ę",
    name: "e nosinė",
    phonetic: "Som de 'É' longo e aberto (como 'festa' sustentado; vogal longa)",
    badge: "Vogal Longa",
    isSpecial: true
  },
  {
    letter: "Ė ė",
    name: "ė",
    phonetic: "Som de 'Ê' bem fechado e tenso (como em você ou ipê)",
    badge: "Taškas (Ponto)",
    isSpecial: true
  },
  {
    letter: "F f",
    name: "ef",
    phonetic: "Som de 'F' (como em fogo)",
    isSpecial: false
  },
  {
    letter: "G g",
    name: "gė",
    phonetic: "Som de 'G' sempre duro (como em gato ou guitarra; nunca 'j')",
    isSpecial: false
  },
  {
    letter: "H h",
    name: "ha",
    phonetic: "Som de 'R' aspirado suave (como em hotel no inglês)",
    isSpecial: false
  },
  {
    letter: "I i",
    name: "i trumpoji",
    phonetic: "Som de 'I' curto (como em mito)",
    isSpecial: false
  },
  {
    letter: "Į į",
    name: "i nosinė",
    phonetic: "Som de 'I' longo (como 'ilha' sustentado; sem som de 'N')",
    badge: "Vogal Longa",
    isSpecial: true
  },
  {
    letter: "Y y",
    name: "i ilgoji",
    phonetic: "Som de 'I' longo idêntico a Į (sustentado)",
    badge: "I Longo",
    isSpecial: true
  },
  {
    letter: "J j",
    name: "jot",
    phonetic: "Som de 'I' consonantal (como o 'i' em iate ou 'y' em yes)",
    isSpecial: false
  },
  {
    letter: "K k",
    name: "ka",
    phonetic: "Som de 'K' / 'C' (como em casa)",
    isSpecial: false
  },
  {
    letter: "L l",
    name: "el",
    phonetic: "Som de 'L' firme tocando o céu da boca (nunca som de 'U' como no final de 'sol')",
    isSpecial: false
  },
  {
    letter: "M m",
    name: "em",
    phonetic: "Som de 'M' (como em mãe)",
    isSpecial: false
  },
  {
    letter: "N n",
    name: "en",
    phonetic: "Som de 'N' (como em navio)",
    isSpecial: false
  },
  {
    letter: "O o",
    name: "o",
    phonetic: "Som de 'Ó' ou 'Ô' longo (em palavras lituanas autênticas é sempre longo)",
    isSpecial: false
  },
  {
    letter: "P p",
    name: "pė",
    phonetic: "Som de 'P' (como em porta)",
    isSpecial: false
  },
  {
    letter: "R r",
    name: "er",
    phonetic: "Som de 'R' vibrado na ponta da língua (como em prato ou arara)",
    isSpecial: false
  },
  {
    letter: "S s",
    name: "es",
    phonetic: "Som de 'S' sibilante (como em sapo ou pássaro; nunca som de 'Z')",
    isSpecial: false
  },
  {
    letter: "Š š",
    name: "eš",
    phonetic: "Som de 'CH' ou 'X' (como em chave ou xícara)",
    badge: "Paukščiukas (Caron)",
    isSpecial: true
  },
  {
    letter: "T t",
    name: "tė",
    phonetic: "Som de 'T' dental duro (como em teto; nunca 'tch' antes de 'i')",
    isSpecial: false
  },
  {
    letter: "U u",
    name: "u trumpoji",
    phonetic: "Som de 'U' curto (como em uva)",
    isSpecial: false
  },
  {
    letter: "Ų ų",
    name: "u nosinė",
    phonetic: "Som de 'U' longo (como 'uva' sustentado; sem som de 'N')",
    badge: "Vogal Longa",
    isSpecial: true
  },
  {
    letter: "Ū ū",
    name: "u ilgoji",
    phonetic: "Som de 'U' longo idêntico a Ų (sustentado)",
    badge: "Brūkšnys (Macron)",
    isSpecial: true
  },
  {
    letter: "V v",
    name: "vė",
    phonetic: "Som de 'V' (como em vela)",
    isSpecial: false
  },
  {
    letter: "Z z",
    name: "zė",
    phonetic: "Som de 'Z' sonoro (como em zebra)",
    isSpecial: false
  },
  {
    letter: "Ž ž",
    name: "žė",
    phonetic: "Som de 'J' (como em janela ou jogo)",
    badge: "Paukščiukas (Caron)",
    isSpecial: true
  }
];

export const DECLENSIONS_DATA = {
  singular: [
    { case: "Nominativo (Kas?)", m_suffix: "-as, -is, -ys, -ius", f_suffix: "-a, -ė", usage: "Sujeito da frase" },
    { case: "Genitivo (Ko?)", m_suffix: "-o, -io, -io, -iaus", f_suffix: "-os, -ės", usage: "Posse (de quem?), negação, partitivo" },
    { case: "Acusativo (Ką?)", m_suffix: "-ą, -ę, -į, -ų", f_suffix: "-ą, -ę, -į, -ų", usage: "Objeto direto, direção com preposição" },
    { case: "Locativo (Kur?)", m_suffix: "-e, -yje, -yje, -iuje", f_suffix: "-oje, -ėje", usage: "Lugar onde (em/no/na)" }
  ],
  plural: [
    { case: "Nominativo (Kas?)", suffix: "-ai, -iai / -os, -ės", usage: "Sujeitos no plural" },
    { case: "Genitivo (Ko?)", suffix: "-ų, -ių (Regra de Ouro)", usage: "Posse, negação plural, quantidades" },
    { case: "Acusativo (Ką?)", suffix: "-us, -ius / -as, -es", usage: "Objetos diretos no plural" },
    { case: "Locativo (Kur?)", suffix: "-uose, -iuose / -ose, -ėse", usage: "Lugares plural (nos/nas)" }
  ]
};
