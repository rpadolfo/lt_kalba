// ==============================================================================
// LT Kalba - Módulo 1 (A1 - Categoria I da Lituânia)
// Dataset Didático Curricular e Mecânicas Ativas (Substitutos de Flashcards)
// Curadoria Pedagógica: Consultant (Autoridade Linguística)
// ==============================================================================

export const MODULE_1_METADATA = {
  id: 1,
  code: "MOD-01",
  level: "A1",
  targetExam: "Categoria I (Pirma kategorija) - Valstybinės kalbos mokėjimo egzaminas",
  title: "Fundamentos da Identidade, Gênero e Espaço",
  subtitle: "Compreensão de gênero, o caso Locativo (Kur?), o verbo Būti, a partícula 'Ar' e a negação com 'ne-'.",
  badge: "Nível A1.1 • Essencial",
  totalLessons: 5,
  activeMechanics: [
    "gender-sorting",
    "case-snapping",
    "sentence-builder",
    "branching-dialogue"
  ]
};

// ------------------------------------------------------------------------------
// 1. Grade Didática das 5 Lições do Módulo 1
// ------------------------------------------------------------------------------
export const MODULE_1_LESSONS = [
  {
    id: "m1-lesson-1",
    moduleId: 1,
    order: 1,
    title: "Gênero dos Substantivos: A Chave das Terminações",
    lithuanianTitle: "Daiktavardžių giminė (Vyriškoji ir Moteriškoji)",
    badge: "Morfologia Básica",
    description: "Em lituano não existem artigos ('o', 'a'). O gênero é identificado diretamente pela terminação da palavra no nominativo.",
    theory: {
      intro: "No lituano, todos os substantivos possuem gênero gramatical intrínseco (Masculino ou Feminino). Identificar o gênero é o primeiro superpoder do estudante, pois dele depende toda a flexão de casos e concordância com adjetivos.",
      masculineRules: {
        title: "👨 Substantivos Masculinos (Vyriškoji giminė)",
        rule: "Terminam sempre na consoante '-s' no nominativo singular:",
        endings: [
          { ending: "-as", examples: "namas (casa), vyras (homem), draugas (amigo), miestas (cidade), stalas (mesa)" },
          { ending: "-is", examples: "brolis (irmão), peilis (faca), medis (árvore), mokinys? (não, -is átono)" },
          { ending: "-ys", examples: "mokinys (estudante), gaidys (galo), Panevėžys (cidade)" },
          { ending: "-us", examples: "Vilnius (capital), sūnus (filho), alus (cerveja), turgus (feira)" }
        ]
      },
      feminineRules: {
        title: "👩 Substantivos Femininos (Moteriškoji giminė)",
        rule: "Terminam em vogal aberta (-a) ou fechada (-ė) no nominativo singular:",
        endings: [
          { ending: "-a", examples: "Lietuva (Lituânia), kava (café), mama (mãe), knyga (livro), diena (dia)" },
          { ending: "-ė", examples: "kavinė (cafeteria), katė (gata), aikštė (praça), gėlė (flor), gatvė (rua)" }
        ],
        exceptionsNote: "Exceções consagradas da 5ª declinação consonantal: 'sesuo' (irmã) e 'duktė' (filha) são femininas."
      },
      modelSentences: [
        { lt: "Jonas yra vyras.", pt: "Jonas é homem.", note: "Jonas (-as) e vyras (-as) são masculinos." },
        { lt: "Maria yra moteris.", pt: "Maria é mulher.", note: "moteris é feminino (substantivo especial em -is)." },
        { lt: "Vilnius yra didelis miestas.", pt: "Vilnius é uma cidade grande.", note: "Vilnius (-us) e miestas (-as) são masculinos." },
        { lt: "Lietuva yra graži šalis.", pt: "A Lituânia é um belo país.", note: "Lietuva (-a) e šalis (F) são femininos." }
      ]
    }
  },
  {
    id: "m1-lesson-2",
    moduleId: 1,
    order: 2,
    title: "O Verbo BŪTI (Ser / Estar) e a Negação com 'ne-'",
    lithuanianTitle: "Veiksmažodis BŪTI ir neiginys NE-",
    badge: "Verbos & Negação",
    description: "Domine a conjugação do verbo mais importante do lituano no presente e aprenda a formar frases negativas colando o prefixo 'ne-'.",
    theory: {
      intro: "O verbo 'būti' equivale tanto a 'ser' quanto a 'estar' em português. O contexto da frase revela o significado. É um verbo irregular fundamental para o exame da Categoria I.",
      conjugationTable: [
        { person: "aš (eu)", affirmative: "esu (sou / estou)", negative: "nesu (não sou / não estou)" },
        { person: "tu (tu / você)", affirmative: "esi (és / estás)", negative: "nesi (não és / não estás)" },
        { person: "jis / ji (ele / ela)", affirmative: "yra (é / está)", negative: "nėra (não é / não está) ⚠️ Irregular!" },
        { person: "mes (nós)", affirmative: "esame (somos / estamos)", negative: "nesame (não somos / não estamos)" },
        { person: "jūs (vós / vocês / Sr./Sra.)", affirmative: "esate (são / estão)", negative: "nesate (não são / não estão)" },
        { person: "jie / jos (eles / elas)", affirmative: "yra (são / estão)", negative: "nėra (não são / não estão) ⚠️ Irregular!" }
      ],
      negationRules: [
        "Para negar qualquer verbo no lituano, basta colar o prefixo 'ne-' no início da forma verbal (ex: nedirbu, negyvenu).",
        "A 3ª pessoa do verbo būti com negação tem uma forma especial e contraída obrigatória: ne + yra = NĖRA."
      ],
      modelSentences: [
        { lt: "Aš esu Jonas.", pt: "Eu sou Jonas.", note: "Apresentação afirmativa." },
        { lt: "Aš nesu italas, aš esu brazilas.", pt: "Não sou italiano, sou brasileiro.", note: "Negação pessoal com 'nesu'." },
        { lt: "Maria nėra čia.", pt: "Maria não está aqui.", note: "Uso da 3ª pessoa negativa irregular 'nėra'." },
        { lt: "Ar tu esi studentas? Ne, aš nesu studentas.", pt: "Você é estudante? Não, eu não sou estudante.", note: "Pergunta e resposta negativa." }
      ]
    }
  },
  {
    id: "m1-lesson-3",
    moduleId: 1,
    order: 3,
    title: "O Caso Locativo (Vietininkas — Kur? / Onde?)",
    lithuanianTitle: "Vietininkas (Klausimas: KUR?)",
    badge: "Casos Espaciais",
    description: "O primeiro caso espacial do lituano. Não usa nenhuma preposição: a terminação da palavra se transforma para indicar 'em / no / na'.",
    theory: {
      intro: "Para responder à pergunta 'Kur?' (Onde?), o lituano não usa preposição antes do substantivo. Em vez de 'em Vilnius', diz-se 'Vilniuje'. As desinências do caso Locativo substituem a terminação nominativa de acordo com 5 regras precisas.",
      transformationRules: [
        {
          nomEnding: "-as",
          locEnding: "-e",
          ruleText: "Substantivos em '-as' trocam por '-e'",
          examples: [
            { nom: "namas (casa)", loc: "name (em casa / na casa)" },
            { nom: "Kaunas (cidade)", loc: "Kaune (em Kaunas)" },
            { nom: "centras (centro)", loc: "centre (no centro)" }
          ]
        },
        {
          nomEnding: "-us",
          locEnding: "-uje",
          ruleText: "Substantivos em '-us' trocam por '-uje'",
          examples: [
            { nom: "Vilnius (capital)", loc: "Vilniuje (em Vilnius)" },
            { nom: "turgus (feira / mercado)", loc: "turguje (na feira)" },
            { nom: "sūnus (filho)", loc: "sūnuje (no filho)" }
          ]
        },
        {
          nomEnding: "-is / -ys",
          locEnding: "-yje",
          ruleText: "Substantivos masculinos em '-is' ou '-ys' trocam por '-yje'",
          examples: [
            { nom: "viešbutis (hotel)", loc: "viešbutyje (no hotel)" },
            { nom: "kambarys (quarto)", loc: "kambaryje (no quarto)" },
            { nom: "Panevėžys (cidade)", loc: "Panevėžyje (em Panevėžys)" }
          ]
        },
        {
          nomEnding: "-a",
          locEnding: "-oje",
          ruleText: "Substantivos femininos em '-a' trocam por '-oje'",
          examples: [
            { nom: "Lietuva (Lituânia)", loc: "Lietuvoje (na Lituânia)" },
            { nom: "Klaipėda (porto)", loc: "Klaipėdoje (em Klaipėda)" },
            { nom: "mokykla (escola)", loc: "mokykloje (na escola)" }
          ]
        },
        {
          nomEnding: "-ė",
          locEnding: "-ėje",
          ruleText: "Substantivos femininos em '-ė' trocam por '-ėje'",
          examples: [
            { nom: "kavinė (cafeteria)", loc: "kavinėje (na cafeteria)" },
            { nom: "aikštė (praça)", loc: "aikštėje (na praça)" },
            { nom: "gatvė (rua)", loc: "gatvėje (na rua)" },
            { nom: "ligoninė (hospital)", loc: "ligoninėje (no hospital)" }
          ]
        }
      ],
      modelSentences: [
        { lt: "Aš gyvenu Lietuvoje, Vilniuje.", pt: "Eu moro na Lituânia, em Vilnius.", note: "Locativo duplo: Lietuv-oje e Vilni-uje." },
        { lt: "Mano draugas dirba kavinėje.", pt: "Meu amigo trabalha na cafeteria.", note: "kavinė -> kavin-ėje." },
        { lt: "Mes dabar esame viešbutyje.", pt: "Nós estamos agora no hotel.", note: "viešbutis -> viešbuty-je." },
        { lt: "Jonas yra name.", pt: "Jonas está na casa.", note: "namas -> nam-e." }
      ]
    }
  },
  {
    id: "m1-lesson-4",
    moduleId: 1,
    order: 4,
    title: "Verbos Essenciais de Ação e Rotina (Gyventi, Dirbti, Kalbėti)",
    lithuanianTitle: "Veiksmažodžiai: GYVENTI, DIRBTI, KALBĖTI",
    badge: "Verbos em Ação",
    description: "Aprenda a conjugar os três verbos mais usados na vida prática da Lituânia e conecte moradia, trabalho e idiomas.",
    theory: {
      intro: "Com os verbos de ação no presente (*esamasis laikas*), você consegue expressar sua rotina e interagir nas situações obrigatórias do exame da Categoria I.",
      verbs: [
        {
          infinitive: "gyventi",
          translation: "morar / viver",
          type: "1ª Asmenuotė (-a)",
          forms: { "aš": "gyvenu", "tu": "gyveni", "jis/ji": "gyvena", "mes": "gyvename", "jūs": "gyvenate", "jie/jos": "gyvena" },
          sample: "Aš gyvenu Vilniuje. (Moro em Vilnius.)"
        },
        {
          infinitive: "dirbti",
          translation: "trabalhar",
          type: "1ª Asmenuotė (-a)",
          forms: { "aš": "dirbu", "tu": "dirbi", "jis/ji": "dirba", "mes": "dirbame", "jūs": "dirbate", "jie/jos": "dirba" },
          sample: "Kur tu dirbi? Aš dirbu ligoninėje. (Onde você trabalha? Trabalho no hospital.)"
        },
        {
          infinitive: "kalbėti",
          translation: "falar",
          type: "2ª Asmenuotė (-i)",
          forms: { "aš": "kalbu", "tu": "kalbi", "jis/ji": "kalba", "mes": "kalbame", "jūs": "kalbate", "jie/jos": "kalba" },
          sample: "Aš kalbu lietuviškai ir angliškai. (Falo lituano e inglês.)"
        }
      ],
      modelSentences: [
        { lt: "Aš gyvenu gražiame bute Vilniuje.", pt: "Eu moro em um belo apartamento em Vilnius.", note: "Verbo gyventi + Locativo." },
        { lt: "Mano sesuo dirba mokykloje.", pt: "Minha irmã trabalha na escola.", note: "Verbo dirbti + Locativo feminino." },
        { lt: "Ar tu kalbi lietuviškai? Taip, aš truputį kalbu.", pt: "Você fala lituano? Sim, falo um pouco.", note: "kalbėti com advérbio de idioma." }
      ]
    }
  },
  {
    id: "m1-lesson-5",
    moduleId: 1,
    order: 5,
    title: "Perguntas com a Partícula 'AR' e Diálogos de Contato",
    lithuanianTitle: "Klausimai su dalelyte AR ir dialogai",
    badge: "Comunicação Real",
    description: "Descubra como formar qualquer pergunta de 'Sim/Não' em lituano colocando apenas 'Ar' no início da frase, sem alterar a ordem das palavras.",
    theory: {
      intro: "Em lituano, não é preciso inverter sujeito e verbo para fazer perguntas. A partícula interrogativa 'AR' no início da frase transforma qualquer afirmativa em uma pergunta imediata.",
      magicRule: {
        affirmative: "Tu gyveni Lietuvoje. (Você mora na Lituânia.)",
        interrogative: "AR tu gyveni Lietuvoje? (Você mora na Lituânia?)",
        ruleText: "Regra: [ AR ] + [ Frase declarativa normal ] + [ ? ]"
      },
      answersStructure: [
        { type: "Afirmação", lt: "Taip, aš gyvenu Lietuvoje.", pt: "Sim, eu moro na Lituânia." },
        { type: "Negação", lt: "Ne, aš negyvenu Lietuvoje, aš gyvenu Brazilijoje.", pt: "Não, eu não moro na Lituânia, moro no Brasil." }
      ],
      modelSentences: [
        { lt: "Ar tu kalbi lietuviškai?", pt: "Você fala lituano?", note: "Pergunta padrão com partícula 'Ar'." },
        { lt: "Ar Jonas dirba čia?", pt: "O Jonas trabalha aqui?", note: "3ª pessoa com 'Ar'." },
        { lt: "Ar tu esi brazilas?", pt: "Você é brasileiro?", note: "Identidade com o verbo būti e 'Ar'." },
        { lt: "Ar kavinė yra atidaryta?", pt: "A cafeteria está aberta?", note: "Situação prática de serviço." }
      ]
    }
  }
];

// ------------------------------------------------------------------------------
// 2. Mecânica 1: Separação Binária de Gênero (Gender Sorting)
// Classificação rápida tátil M vs F por terminação
// ------------------------------------------------------------------------------
export const GENDER_SORTING_EXERCISES = [
  {
    id: "gen-1",
    word: "namas",
    translation: "casa",
    correctGender: "M",
    ending: "-as",
    explanation: "Palavras terminadas em '-as' são sempre do gênero Masculino (Vyriškoji giminė)."
  },
  {
    id: "gen-2",
    word: "kava",
    translation: "café",
    correctGender: "F",
    ending: "-a",
    explanation: "Palavras terminadas em '-a' pertencem ao gênero Feminino (Moteriškoji giminė)."
  },
  {
    id: "gen-3",
    word: "brolis",
    translation: "irmão",
    correctGender: "M",
    ending: "-is",
    explanation: "Substantivos terminados em '-is' (com raiz curta/átona) são Masculinos."
  },
  {
    id: "gen-4",
    word: "kavinė",
    translation: "cafeteria",
    correctGender: "F",
    ending: "-ė",
    explanation: "A terminação '-ė' é marca registrada do gênero Feminino."
  },
  {
    id: "gen-5",
    word: "Vilnius",
    translation: "Vilnius (capital)",
    correctGender: "M",
    ending: "-us",
    explanation: "Nomes próprios e substantivos em '-us' são invariavelmente Masculinos."
  },
  {
    id: "gen-6",
    word: "Lietuva",
    translation: "Lituânia",
    correctGender: "F",
    ending: "-a",
    explanation: "Terminação '-a' indica gênero Feminino."
  },
  {
    id: "gen-7",
    word: "mokinys",
    translation: "aluno / estudante",
    correctGender: "M",
    ending: "-ys",
    explanation: "Terminação '-ys' (com y longo) é típica de substantivos Masculinos de agente."
  },
  {
    id: "gen-8",
    word: "aikštė",
    translation: "praça",
    correctGender: "F",
    ending: "-ė",
    explanation: "Substantivo Feminino terminado em '-ė'."
  },
  {
    id: "gen-9",
    word: "viešbutis",
    translation: "hotel",
    correctGender: "M",
    ending: "-is",
    explanation: "Terminação '-is' classifica o substantivo como Masculino."
  },
  {
    id: "gen-10",
    word: "sesuo",
    translation: "irmã",
    correctGender: "F",
    ending: "-uo",
    explanation: "Exceção clássica da 5ª declinação consonantal: 'sesuo' é do gênero Feminino."
  }
];

// ------------------------------------------------------------------------------
// 3. Mecânica 2: Encaixe de Caso / Case Snapping (Vietininkas Snapper)
// Treino tátil de desinências espaciais (Kur? - Onde?)
// ------------------------------------------------------------------------------
export const CASE_SNAPPING_EXERCISES = [
  {
    id: "snap-1",
    sentenceBefore: "Aš gyvenu",
    baseWord: "Vilnius",
    baseMeaning: "Vilnius (terminação em -us)",
    sentenceAfter: ".",
    fullTranslation: "Eu moro em Vilnius.",
    options: ["Vilniuje", "Vilniue", "Vilniyje", "Vilniuoje"],
    correctAnswer: "Vilniuje",
    ruleNote: "Regra: Substantivos em '-us' recebem a desinência '-uje' no Locativo (Vilnius -> Vilniuje)."
  },
  {
    id: "snap-2",
    sentenceBefore: "Mano draugė gyvena",
    baseWord: "Lietuva",
    baseMeaning: "Lituânia (terminação em -a)",
    sentenceAfter: ".",
    fullTranslation: "Minha amiga mora na Lituânia.",
    options: ["Lietuvoje", "Lietuve", "Lietuvyje", "Lietuvėje"],
    correctAnswer: "Lietuvoje",
    ruleNote: "Regra: Substantivos femininos em '-a' flexionam para '-oje' no Locativo (Lietuva -> Lietuvoje)."
  },
  {
    id: "snap-3",
    sentenceBefore: "Jonas dirba",
    baseWord: "kavinė",
    baseMeaning: "cafeteria (terminação em -ė)",
    sentenceAfter: ".",
    fullTranslation: "Jonas trabalha na cafeteria.",
    options: ["kavinėje", "kavinie", "kavinioje", "kavinėjeje"],
    correctAnswer: "kavinėje",
    ruleNote: "Regra: Substantivos em '-ė' trocam a vogal por '-ėje' no Locativo (kavinė -> kavinėje)."
  },
  {
    id: "snap-4",
    sentenceBefore: "Mes dabar esame",
    baseWord: "namas",
    baseMeaning: "casa (terminação em -as)",
    sentenceAfter: ".",
    fullTranslation: "Nós estamos na casa agora.",
    options: ["name", "namoje", "namuje", "namyje"],
    correctAnswer: "name",
    ruleNote: "Regra: Substantivos em '-as' formam o Locativo trocando por '-e' (namas -> name)."
  },
  {
    id: "snap-5",
    sentenceBefore: "Turistas gyvena",
    baseWord: "viešbutis",
    baseMeaning: "hotel (terminação em -is)",
    sentenceAfter: ".",
    fullTranslation: "O turista está hospedado no hotel.",
    options: ["viešbutyje", "viešbute", "viešbutiuje", "viešbutoje"],
    correctAnswer: "viešbutyje",
    ruleNote: "Regra: Substantivos masculinos em '-is' / '-ys' recebem '-yje' no Locativo (viešbutis -> viešbutyje)."
  },
  {
    id: "snap-6",
    sentenceBefore: "Gydytoja dirba",
    baseWord: "ligoninė",
    baseMeaning: "hospital (terminação em -ė)",
    sentenceAfter: ".",
    fullTranslation: "A médica trabalha no hospital.",
    options: ["ligoninėje", "ligonine", "ligoninė", "ligoninioje"],
    correctAnswer: "ligoninėje",
    ruleNote: "Regra: Substantivo feminino em '-ė' recebe a desinência '-ėje' no Locativo."
  }
];

// ------------------------------------------------------------------------------
// 4. Mecânica 3: Montador de Frases / Sentence Builder (Sintaxe Tátil)
// Ordenação de blocos para fixação de perguntas com 'Ar' e negação com 'ne-'
// ------------------------------------------------------------------------------
export const SENTENCE_BUILDER_EXERCISES = [
  {
    id: "build-1",
    targetPortuguese: "Você fala lituano?",
    blocks: ["lietuviškai?", "Ar", "tu", "kalbi"],
    correctOrder: ["Ar", "tu", "kalbi", "lietuviškai?"],
    grammarFocus: "A partícula interrogativa 'Ar' posiciona-se no início da frase para criar a pergunta."
  },
  {
    id: "build-2",
    targetPortuguese: "Eu não moro em Kaunas.",
    blocks: ["Kaune.", "Aš", "negyvenu"],
    correctOrder: ["Aš", "negyvenu", "Kaune."],
    grammarFocus: "O prefixo negativo 'ne-' une-se diretamente ao verbo 'gyventi' formando 'negyvenu'."
  },
  {
    id: "build-3",
    targetPortuguese: "Maria não está aqui agora.",
    blocks: ["dabar.", "nėra", "Maria", "čia"],
    correctOrder: ["Maria", "nėra", "čia", "dabar."],
    grammarFocus: "A forma negativa da 3ª pessoa do verbo būti é irregular e obrigatória: 'nėra'."
  },
  {
    id: "build-4",
    targetPortuguese: "Você é brasileiro?",
    blocks: ["brazilas?", "Ar", "esi", "tu"],
    correctOrder: ["Ar", "tu", "esi", "brazilas?"],
    grammarFocus: "Interrogação com 'Ar' + pronome + verbo 'būti' conjugado na 2ª pessoa (esi)."
  },
  {
    id: "build-5",
    targetPortuguese: "Meu amigo trabalha no hotel.",
    blocks: ["dirba", "Mano", "viešbutyje.", "draugas"],
    correctOrder: ["Mano", "draugas", "dirba", "viešbutyje."],
    grammarFocus: "Estrutura Sujeito (Mano draugas) + Verbo (dirba) + Locativo de lugar (viešbutyje)."
  }
];

// ------------------------------------------------------------------------------
// 5. Mecânica 4: Diálogo Situacional Guiado (Branching Roleplay)
// Aplicação situacional da Categoria I com escolhas contextuais reais
// ------------------------------------------------------------------------------
export const SITUATIONAL_DIALOGUES = [
  {
    id: "roleplay-1",
    title: "Primeiro Encontro em Vilnius (Pirmas susitikimas)",
    context: "Você acaba de chegar a Vilnius e encontra Jonas na recepção de um evento cultural.",
    avatarPartner: "👨",
    partnerName: "Jonas",
    steps: [
      {
        step: 1,
        partnerSpeech: "Labas rytas! Mano vardas yra Jonas. Ar tu esi Maria?",
        partnerTranslation: "Bom dia! Meu nome é Jonas. Você é a Maria?",
        options: [
          {
            text: "Labas rytas! Taip, aš esu Maria. Malonu susipažinti.",
            translation: "Bom dia! Sim, eu sou a Maria. Prazer em conhecer.",
            isCorrect: true,
            feedback: "Excelente! Resposta cortês com a confirmação correta do verbo būti (esu)."
          },
          {
            text: "Ne, aš gyvenu Lietuvoje.",
            translation: "Não, eu moro na Lituânia.",
            isCorrect: false,
            feedback: "Incoerente: Jonas perguntou seu nome/identidade, e não onde você mora."
          },
          {
            text: "Taip, aš yra Maria.",
            translation: "Sim, eu é a Maria.",
            isCorrect: false,
            feedback: "Erro gramatical: para a 1ª pessoa (aš), deve-se usar 'esu', nunca 'yra'."
          }
        ]
      },
      {
        step: 2,
        partnerSpeech: "Labai malonu, Maria! Ar tu kalbi lietuviškai?",
        partnerTranslation: "Muito prazer, Maria! Você fala lituano?",
        options: [
          {
            text: "Taip, aš truputį kalbu lietuviškai.",
            translation: "Sim, eu falo um pouco de lituano.",
            isCorrect: true,
            feedback: "Perfeito! Uso natural do advérbio 'truputį' (um pouco) e verbo kalbėti."
          },
          {
            text: "Ne, aš nedirba čia.",
            translation: "Não, eu não trabalha aqui.",
            isCorrect: false,
            feedback: "Incorreto: mistura o verbo dirbti (trabalhar) conjugado incorretamente."
          },
          {
            text: "Aš kalbu Lietuvoje.",
            translation: "Eu falo na Lituânia.",
            isCorrect: false,
            feedback: "Sem sentido: deve-se responder sobre a habilidade de falar o idioma."
          }
        ]
      },
      {
        step: 3,
        partnerSpeech: "Puiku! O kur tu dabar gyveni Vilniuje?",
        partnerTranslation: "Ótimo! E onde você mora agora em Vilnius?",
        options: [
          {
            text: "Aš gyvenu viešbutyje, centre.",
            translation: "Eu moro em um hotel, no centro.",
            isCorrect: true,
            feedback: "Brilhante! Emprego duplo e correto do caso Locativo (viešbutyje e centre)."
          },
          {
            text: "Aš gyvenu viešbutis.",
            translation: "Eu moro hotel (nominativo sem declinação).",
            isCorrect: false,
            feedback: "Erro de caso: falta a desinência do Locativo. O correto é 'viešbutyje'."
          },
          {
            text: "Aš esu Brazilija.",
            translation: "Eu sou Brasil.",
            isCorrect: false,
            feedback: "Incorreto: para indicar origem usa-se 'iš Brazilijos' (Genitivo) e a pergunta foi sobre onde mora."
          }
        ]
      }
    ]
  }
];
