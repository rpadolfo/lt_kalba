// Lithuanian Alphabet (Abėcėlė) and Declensions Reference Data

export const ALPHABET_DATA = [
  { letter: "A a", name: "a" },
  { letter: "Ą ą", name: "a nosinė" },
  { letter: "B b", name: "bė" },
  { letter: "C c", name: "cė" },
  { letter: "Č č", name: "čė" },
  { letter: "D d", name: "dė" },
  { letter: "E e", name: "e" },
  { letter: "Ę ę", name: "e nosinė" },
  { letter: "Ė ė", name: "ė" },
  { letter: "F f", name: "ef" },
  { letter: "G g", name: "gė" },
  { letter: "H h", name: "ha" },
  { letter: "I i", name: "i trumpoji" },
  { letter: "Į į", name: "i nosinė" },
  { letter: "Y y", name: "i ilgoji" },
  { letter: "J j", name: "jot" },
  { letter: "K k", name: "ka" },
  { letter: "L l", name: "el" },
  { letter: "M m", name: "em" },
  { letter: "N n", name: "en" },
  { letter: "O o", name: "o" },
  { letter: "P p", name: "pė" },
  { letter: "R r", name: "er" },
  { letter: "S s", name: "es" },
  { letter: "Š š", name: "eš" },
  { letter: "T t", name: "tė" },
  { letter: "U u", name: "u trumpoji" },
  { letter: "Ų ų", name: "u nosinė" },
  { letter: "Ū ū", name: "u ilgoji" },
  { letter: "V v", name: "vė" },
  { letter: "Z z", name: "zė" },
  { letter: "Ž ž", name: "žė" }
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
