// Mock Data Layer with localStorage persistence for LT Kalba

const INITIAL_VOCABULARY = [
  {
    id: "vocab-1",
    word: "Labas",
    stressed: "L<span class=\"stressed\">a</span>bas",
    translation: "Olá / Oi",
    type: "expressão",
    example: "L<span class=\"stressed\">a</span>bas, kaip sekasi?",
    exampleTranslation: "Olá, como vai?",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-2",
    word: "Ačiū",
    stressed: "A<span class=\"stressed\">čiū</span>",
    translation: "Obrigado (a)",
    type: "expressão",
    example: "Labai a<span class=\"stressed\">čiū</span> už pagalbą.",
    exampleTranslation: "Muito obrigado pela ajuda.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-3",
    word: "Lietuva",
    stressed: "Lietuv<span class=\"stressed\">à</span>",
    translation: "Lituânia",
    type: "substantivo (F)",
    example: "Aš gyvenu Lietuv<span class=\"stressed\">o</span>je.",
    exampleTranslation: "Eu moro na Lituânia.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-4",
    word: "Vilnius",
    stressed: "V<span class=\"stressed\">i</span>lnius",
    translation: "Vilnius (capital)",
    type: "substantivo (M)",
    example: "V<span class=\"stressed\">i</span>lnius yra didelis miestas.",
    exampleTranslation: "Vilnius é uma cidade grande.",
    module: 2,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-5",
    word: "Kava",
    stressed: "Kav<span class=\"stressed\">à</span>",
    translation: "Café",
    type: "substantivo (F)",
    example: "Aš noriu puodelio kav<span class=\"stressed\">o</span>s.",
    exampleTranslation: "Eu quero uma xícara de café.",
    module: 4,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-6",
    word: "Vanduo",
    stressed: "Vand<span class=\"stressed\">uõ</span>",
    translation: "Água",
    type: "substantivo (M)",
    example: "Prašau stiklinės vanden<span class=\"stressed\">i</span>s.",
    exampleTranslation: "Por favor, um copo de água.",
    module: 4,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-7",
    word: "Duona",
    stressed: "D<span class=\"stressed\">uõ</span>na",
    translation: "Pão",
    type: "substantivo (F)",
    example: "Aš valgau juodą duon<span class=\"stressed\">ą</span>.",
    exampleTranslation: "Eu como pão preto.",
    module: 4,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-8",
    word: "Draugas",
    stressed: "Dr<span class=\"stressed\">au</span>gas",
    translation: "Amigo",
    type: "substantivo (M)",
    example: "Mano dr<span class=\"stressed\">au</span>gas yra lietuvis.",
    exampleTranslation: "Meu amigo é lituano.",
    module: 3,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-9",
    word: "Airija",
    stressed: "<span class=\"stressed\">A</span>irija",
    translation: "Irlanda",
    type: "substantivo (F)",
    example: "Mano sesuo gyvena <span class=\"stressed\">A</span>irijoje.",
    exampleTranslation: "Minha irmã mora na Irlanda.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-10",
    word: "Anglija",
    stressed: "<span class=\"stressed\">A</span>nglija",
    translation: "Inglaterra",
    type: "substantivo (F)",
    example: "Ar tu esi iš <span class=\"stressed\">A</span>nglijos?",
    exampleTranslation: "Você é da Inglaterra?",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-11",
    word: "Vokietija",
    stressed: "Vokiet<span class=\"stressed\">i</span>ja",
    translation: "Alemanha",
    type: "substantivo (F)",
    example: "Vokiet<span class=\"stressed\">i</span>ja yra Europoje.",
    exampleTranslation: "A Alemanha fica na Europa.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-12",
    word: "Lenkija",
    stressed: "L<span class=\"stressed\">e</span>nkija",
    translation: "Polônia",
    type: "substantivo (F)",
    example: "L<span class=\"stressed\">e</span>nkija yra šalia Lietuvos.",
    exampleTranslation: "A Polônia fica perto da Lituânia.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-13",
    word: "Rusija",
    stressed: "R<span class=\"stressed\">u</span>sija",
    translation: "Rússia",
    type: "substantivo (F)",
    example: "R<span class=\"stressed\">u</span>sija yra muito didelė šalis.",
    exampleTranslation: "A Rússia é um país muito grande.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-14",
    word: "Ryga",
    stressed: "Ryg<span class=\"stressed\">à</span>",
    translation: "Riga",
    type: "substantivo (F)",
    example: "Ryg<span class=\"stressed\">à</span> yra Latvijos sostinė.",
    exampleTranslation: "Riga é a capital da Letônia.",
    module: 2,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-15",
    word: "Talinas",
    stressed: "T<span class=\"stressed\">a</span>linas",
    translation: "Tallinn",
    type: "substantivo (M)",
    example: "T<span class=\"stressed\">a</span>linas yra Estijos sostinė.",
    exampleTranslation: "Tallinn é a capital da Estônia.",
    module: 2,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-16",
    word: "Berlynas",
    stressed: "Berl<span class=\"stressed\">y</span>nas",
    translation: "Berlim",
    type: "substantivo (M)",
    example: "Mes važiuojame į Berl<span class=\"stressed\">y</span>ną.",
    exampleTranslation: "Nós estamos indo para Berlim.",
    module: 2,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-17",
    word: "Varšuva",
    stressed: "Varšuv<span class=\"stressed\">à</span>",
    translation: "Varsóvia",
    type: "substantivo (F)",
    example: "Varšuv<span class=\"stressed\">à</span> yra didelis miestas.",
    exampleTranslation: "Varsóvia é uma cidade grande.",
    module: 2,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-18",
    word: "italas",
    stressed: "it<span class=\"stressed\">a</span>las",
    translation: "italiano (homem)",
    type: "substantivo (M)",
    example: "Mano draugas yra it<span class=\"stressed\">a</span>las.",
    exampleTranslation: "Meu amigo é italiano.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-19",
    word: "italė",
    stressed: "it<span class=\"stressed\">a</span>lė",
    translation: "italiana (mulher)",
    type: "substantivo (F)",
    example: "Ši moteris yra it<span class=\"stressed\">a</span>lė.",
    exampleTranslation: "Esta mulher é italiana.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-20",
    word: "mokinys",
    stressed: "mokin<span class=\"stressed\">ỹ</span>s",
    translation: "aluno / estudante (homem)",
    type: "substantivo (M)",
    example: "Šis mokin<span class=\"stressed\">ỹ</span>s yra labai protingas.",
    exampleTranslation: "Este aluno é muito inteligente.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-21",
    word: "mokinė",
    stressed: "mokin<span class=\"stressed\">ė̃</span>",
    translation: "aluna / estudante (mulher)",
    type: "substantivo (F)",
    example: "Mano draugė yra mokin<span class=\"stressed\">ė̃</span>.",
    exampleTranslation: "Minha amiga é estudante.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-22",
    word: "vyras",
    stressed: "v<span class=\"stressed\">ỹ</span>ras",
    translation: "homem / marido",
    type: "substantivo (M)",
    example: "Tas v<span class=\"stressed\">ỹ</span>ras dirba Vilniuje.",
    exampleTranslation: "Aquele homem trabalha em Vilnius.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-23",
    word: "moteris",
    stressed: "m<span class=\"stressed\">o</span>teris",
    translation: "mulher",
    type: "substantivo (F)",
    example: "Moteris geria kavą.",
    exampleTranslation: "A mulher está bebendo café.",
    module: 1,
    srsStage: 0,
    nextReview: Date.now()
  },
  {
    id: "vocab-24",
    word: "draugė",
    stressed: "draug<span class=\"stressed\">ė̃</span>",
    translation: "amiga",
    type: "substantivo (F)",
    example: "Mano draug<span class=\"stressed\">ė̃</span> gyvena Lietuvoje.",
    exampleTranslation: "Minha amiga mora na Lituânia.",
    module: 3,
    srsStage: 0,
    nextReview: Date.now()
  }
];

const INITIAL_CONJUGATIONS = [
  {
    id: "conj-1",
    verb: "būti",
    translation: "ser / estar",
    module: 1,
    forms: {
      as: "esu",
      tu: "esi",
      jisji: "yra",
      mes: "esame",
      jus: "esate",
      jiejos: "yra"
    }
  },
  {
    id: "conj-2",
    verb: "eiti",
    translation: "ir (a pé)",
    module: 2,
    forms: {
      as: "einu",
      tu: "eini",
      jisji: "eina",
      mes: "einame",
      jus: "einate",
      jiejos: "eina"
    }
  },
  {
    id: "conj-3",
    verb: "gyventi",
    translation: "morar / viver",
    module: 2,
    forms: {
      as: "gyvenu",
      tu: "gyveni",
      jisji: "gyvena",
      mes: "gyvename",
      jus: "gyvenate",
      jiejos: "gyvena"
    }
  },
  {
    id: "conj-4",
    verb: "norėti",
    translation: "querer",
    module: 4,
    forms: {
      as: "noriu",
      tu: "nori",
      jisji: "nori",
      mes: "norime",
      jus: "norite",
      jiejos: "nori"
    }
  },
  {
    id: "conj-5",
    verb: "dirbti",
    translation: "trabalhar",
    module: 5,
    forms: {
      as: "dirbu",
      tu: "dirbi",
      jisji: "dirba",
      mes: "dirbame",
      jus: "dirbate",
      jiejos: "dirba"
    }
  },
  {
    id: "conj-6",
    verb: "turėti",
    translation: "ter / possuir",
    module: 3,
    forms: {
      as: "turiu",
      tu: "turi",
      jisji: "turi",
      mes: "turime",
      jus: "turite",
      jiejos: "turi"
    }
  },
  {
    id: "conj-7",
    verb: "kalbėti",
    translation: "falar",
    module: 1,
    forms: {
      as: "kalbu",
      tu: "kalbi",
      jisji: "kalba",
      mes: "kalbame",
      jus: "kalbate",
      jiejos: "kalba"
    }
  },
  {
    id: "conj-8",
    verb: "suprasti",
    translation: "entender",
    module: 1,
    forms: {
      as: "suprantu",
      tu: "supranti",
      jisji: "supranta",
      mes: "suprantame",
      jus: "suprantate",
      jiejos: "supranta"
    }
  }
];

const INITIAL_EXERCISES = [
  {
    id: "ex-1",
    type: "gap-fill",
    prompt: "Preencha a lacuna com a conjugação correta do verbo <b>būti</b> (ser/estar):",
    sentence: "Aš [gap] iš Brazilijos.",
    translation: "Eu sou do Brasil.",
    gap: "esu",
    explanation: "A primeira pessoa do singular (aš - eu) do verbo 'būti' é 'esu'.",
    module: 1
  },
  {
    id: "ex-2",
    type: "gap-fill",
    prompt: "A cidade no caso Locativo (onde?). Vilni<b>us</b> se torna Vilni<b>uje</b>. Complete a frase:",
    sentence: "Mano draugas gyvena Vilni[gap].",
    translation: "Meu amigo mora em Vilnius.",
    gap: "uje",
    explanation: "Substantivos masculinos terminados em '-us' declinam no caso Locativo com a terminação '-uje'.",
    module: 2
  },
  {
    id: "ex-3",
    type: "translation",
    prompt: "Traduza para o Lituano (lembre-se das saudações):",
    sentence: "Olá, como vai?",
    translation: "Labas, kaip sekasi?",
    gap: "Labas, kaip sekasi?",
    explanation: "A expressão padrão para 'Olá, como vai?' ou 'como vão as coisas?' é 'Labas, kaip sekasi?'.",
    module: 1
  },
  {
    id: "ex-4",
    type: "gap-fill",
    prompt: "Preencha com o verbo <b>norėti</b> (querer) no presente na conjugação correspondente:",
    sentence: "Ar tu [gap] kavos?",
    translation: "Você quer café?",
    gap: "nori",
    explanation: "A segunda pessoa do singular (tu) do verbo 'norėti' tem terminação em '-i', ficando 'nori'.",
    module: 4
  },
  {
    id: "ex-7",
    type: "gap-fill",
    prompt: "Complete a frase do diálogo: Jonas pergunta para Maria onde ela mora.",
    sentence: "Maria, kur tu [gap] dabar?",
    translation: "Maria, onde você mora agora?",
    gap: "gyveni",
    explanation: "A segunda pessoa do presente do verbo 'gyventi' (morar) é 'gyveni'.",
    module: 2
  },
  {
    id: "ex-8",
    type: "gap-fill",
    prompt: "Caso Genitivo (Ko?) com Negação. Complete com o café declinado na negação:",
    sentence: "Aš neturiu [gap] (kava).",
    translation: "Eu não tenho café.",
    gap: "kavos",
    explanation: "Na negação (neturiu), o objeto direto vai para o Genitivo. Kava (Fem. sing. em -a) vira 'kavos'.",
    module: 3
  },
  {
    id: "ex-9",
    type: "translation",
    prompt: "Traduza o diálogo para o Lituano: 'Eu moro em Vilnius.'",
    sentence: "Eu moro em Vilnius.",
    translation: "Aš gyvenu Vilniuje.",
    gap: "Aš gyvenu Vilniuje.",
    explanation: "Aš (eu), gyvenu (moro), Vilniuje (Locativo de Vilnius).",
    module: 2
  }
];

const STORAGE_KEYS = {
  VOCABULARY: "lt_kalba_vocab",
  CONJUGATIONS: "lt_kalba_conj",
  EXERCISES: "lt_kalba_exercises",
  PROGRESS: "lt_kalba_progress"
};

// Initialize helper with smart merge to support app updates
function initLocalStorage() {
  const existingVocab = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
  if (!existingVocab || JSON.parse(existingVocab).length < INITIAL_VOCABULARY.length) {
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(INITIAL_VOCABULARY));
  }
  
  const existingConj = localStorage.getItem(STORAGE_KEYS.CONJUGATIONS);
  if (!existingConj || JSON.parse(existingConj).length < INITIAL_CONJUGATIONS.length) {
    localStorage.setItem(STORAGE_KEYS.CONJUGATIONS, JSON.stringify(INITIAL_CONJUGATIONS));
  }
  
  const existingExercises = localStorage.getItem(STORAGE_KEYS.EXERCISES);
  if (!existingExercises || JSON.parse(existingExercises).length < INITIAL_EXERCISES.length) {
    localStorage.setItem(STORAGE_KEYS.EXERCISES, JSON.stringify(INITIAL_EXERCISES));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
    const initialProgress = {
      streak: 5, // starting with a nice mock streak of 5 days
      xp: 240,
      dailyGoal: 50,
      wordsMastered: 3,
      lastActive: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initialProgress));
  }
}

// Call initialization
initLocalStorage();

// Data access operations
export const db = {
  // Vocabulary API
  getVocabulary() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOCABULARY)) || [];
  },
  
  saveVocabulary(vocab) {
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocab));
  },
  
  addVocabularyItem(item) {
    const vocab = this.getVocabulary();
    const newItem = {
      id: "vocab-" + Date.now(),
      srsStage: 0,
      nextReview: Date.now(),
      ...item
    };
    vocab.push(newItem);
    this.saveVocabulary(vocab);
    return newItem;
  },
  
  updateVocabularyItem(id, updatedFields) {
    const vocab = this.getVocabulary();
    const index = vocab.findIndex(item => item.id === id);
    if (index !== -1) {
      vocab[index] = { ...vocab[index], ...updatedFields };
      this.saveVocabulary(vocab);
      return vocab[index];
    }
    return null;
  },
  
  deleteVocabularyItem(id) {
    const vocab = this.getVocabulary();
    const filtered = vocab.filter(item => item.id !== id);
    this.saveVocabulary(filtered);
  },

  // Conjugations API
  getConjugations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONJUGATIONS)) || [];
  },

  saveConjugations(conj) {
    localStorage.setItem(STORAGE_KEYS.CONJUGATIONS, JSON.stringify(conj));
  },

  addConjugation(item) {
    const conj = this.getConjugations();
    const newItem = {
      id: "conj-" + Date.now(),
      ...item
    };
    conj.push(newItem);
    this.saveConjugations(conj);
    return newItem;
  },

  updateConjugation(id, updatedFields) {
    const conj = this.getConjugations();
    const index = conj.findIndex(item => item.id === id);
    if (index !== -1) {
      conj[index] = { ...conj[index], ...updatedFields };
      this.saveConjugations(conj);
      return conj[index];
    }
    return null;
  },

  deleteConjugation(id) {
    const conj = this.getConjugations();
    const filtered = conj.filter(item => item.id !== id);
    this.saveConjugations(filtered);
  },

  // Exercises API
  getExercises() {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXERCISES)) || [];
    return all.filter(ex => ex.type !== "spelling");
  },

  // User Progress API
  getProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
  },

  saveProgress(progress) {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  addXP(amount) {
    const progress = this.getProgress();
    progress.xp = (progress.xp || 0) + amount;
    this.saveProgress(progress);
    return progress;
  },

  // Spaced Repetition SRS Algorithm Logic
  processSRSRating(wordId, rating) {
    const vocab = this.getVocabulary();
    const index = vocab.findIndex(w => w.id === wordId);
    if (index === -1) return;

    const word = vocab[index];
    let newStage = word.srsStage || 0;
    let intervalHours = 4;

    if (rating === 'easy') {
      newStage = Math.min(newStage + 1, 5);
    } else if (rating === 'hard') {
      newStage = Math.max(newStage - 1, 0);
    }
    
    if (rating === 'good' && newStage === 0) {
      newStage = 1;
    }

    const intervals = [1, 4, 24, 72, 168, 720];
    intervalHours = intervals[newStage] || 4;

    word.srsStage = newStage;
    word.nextReview = Date.now() + (intervalHours * 60 * 60 * 1000);
    
    this.saveVocabulary(vocab);
    
    let xpGained = rating === 'easy' ? 15 : rating === 'good' ? 10 : 5;
    this.addXP(xpGained);

    const masteredCount = vocab.filter(w => w.srsStage >= 4).length;
    const progress = this.getProgress();
    progress.wordsMastered = masteredCount;
    this.saveProgress(progress);

    return {
      word,
      xpGained,
      nextReviewDate: new Date(word.nextReview).toLocaleDateString()
    };
  }
};
