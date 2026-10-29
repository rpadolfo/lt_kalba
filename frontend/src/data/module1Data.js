// ==============================================================================
// LT Kalba - Módulo 1 (A1 - Categoria I da Lituânia)
// Dataset Didático Curricular e Mecânicas Ativas (Substitutos de Flashcards)
// Curadoria Pedagógica: Consultant (Autoridade Linguística)
// Atualização OS-008: Expansão Farta de Conteúdo para IndexedDB e Mecânicas Ativas
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
          { ending: "-is", examples: "brolis (irmão), peilis (faca), medis (árvore), viešbutis (hotel)" },
          { ending: "-ys", examples: "mokinys (estudante), gaidys (galo), Panevėžys (cidade), traukinys (trem)" },
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
        exceptionsNote: "Substantivos femininos em '-is' (com i-stem: žuvis, šalis, naktis, dalis, pilis) e exceções consagradas da 5ª declinação: 'sesuo' (irmã) e 'duktė' (filha)."
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

export const GENDER_SORTING_EXERCISES = [
  {
    "id": "gen-1",
    "word": "namas",
    "translation": "casa",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' é padrão do gênero Masculino (Vyriškoji giminė)."
  },
  {
    "id": "gen-2",
    "word": "vyras",
    "translation": "homem / marido",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' indica gênero Masculino."
  },
  {
    "id": "gen-3",
    "word": "draugas",
    "translation": "amigo",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' indica gênero Masculino."
  },
  {
    "id": "gen-4",
    "word": "miestas",
    "translation": "cidade",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' classifica o substantivo como Masculino."
  },
  {
    "id": "gen-5",
    "word": "stalas",
    "translation": "mesa",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Objetos terminados em '-as' são Masculinos."
  },
  {
    "id": "gen-6",
    "word": "teatras",
    "translation": "teatro",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' é Masculina."
  },
  {
    "id": "gen-7",
    "word": "restoranas",
    "translation": "restaurante",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Lugares terminados em '-as' são Masculinos."
  },
  {
    "id": "gen-8",
    "word": "bankas",
    "translation": "banco",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Substantivo Masculino terminado em '-as'."
  },
  {
    "id": "gen-9",
    "word": "bilietas",
    "translation": "bilhete / passagem",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' pertence ao gênero Masculino."
  },
  {
    "id": "gen-10",
    "word": "kelias",
    "translation": "caminho / estrada",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Substantivo Masculino terminado em '-as'."
  },
  {
    "id": "gen-11",
    "word": "gydytojas",
    "translation": "médico",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Profissão masculina terminada no sufixo de agente '-ojas' (-as)."
  },
  {
    "id": "gen-12",
    "word": "mokytojas",
    "translation": "professor",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Profissão masculina terminada em '-ojas' (-as)."
  },
  {
    "id": "gen-13",
    "word": "studentas",
    "translation": "estudante (homem)",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Terminação '-as' marca gênero Masculino."
  },
  {
    "id": "gen-14",
    "word": "turistas",
    "translation": "turista (homem)",
    "correctGender": "M",
    "ending": "-as",
    "explanation": "Substantivo Masculino terminado em '-as'."
  },
  {
    "id": "gen-15",
    "word": "brolis",
    "translation": "irmão",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Substantivo Masculino com terminação '-is' átono."
  },
  {
    "id": "gen-16",
    "word": "peilis",
    "translation": "faca",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Objeto do gênero Masculino terminado em '-is'."
  },
  {
    "id": "gen-17",
    "word": "medis",
    "translation": "árvore",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Substantivo Masculino terminado em '-is'."
  },
  {
    "id": "gen-18",
    "word": "viešbutis",
    "translation": "hotel",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Substantivo Masculino terminado em '-is'."
  },
  {
    "id": "gen-19",
    "word": "tėtis",
    "translation": "papai / pai",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Parentesco masculino terminado em '-is'."
  },
  {
    "id": "gen-20",
    "word": "automobilis",
    "translation": "automóvel / carro",
    "correctGender": "M",
    "ending": "-is",
    "explanation": "Veículo do gênero Masculino terminado em '-is'."
  },
  {
    "id": "gen-21",
    "word": "mokinys",
    "translation": "aluno / estudante",
    "correctGender": "M",
    "ending": "-ys",
    "explanation": "Terminação '-ys' (com y longo) marca substantivos de agente Masculinos."
  },
  {
    "id": "gen-22",
    "word": "traukinys",
    "translation": "trem",
    "correctGender": "M",
    "ending": "-ys",
    "explanation": "Terminação '-ys' marca o gênero Masculino."
  },
  {
    "id": "gen-23",
    "word": "kambarys",
    "translation": "quarto / cômodo",
    "correctGender": "M",
    "ending": "-ys",
    "explanation": "Substantivo Masculino terminado em '-ys'."
  },
  {
    "id": "gen-24",
    "word": "gaidys",
    "translation": "galo",
    "correctGender": "M",
    "ending": "-ys",
    "explanation": "Animal masculino terminado em '-ys'."
  },
  {
    "id": "gen-25",
    "word": "Panevėžys",
    "translation": "Panevėžys (cidade)",
    "correctGender": "M",
    "ending": "-ys",
    "explanation": "Nome de cidade lituana do gênero Masculino em '-ys'."
  },
  {
    "id": "gen-26",
    "word": "Vilnius",
    "translation": "Vilnius (capital)",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Nomes próprios e substantivos em '-us' são invariavelmente Masculinos."
  },
  {
    "id": "gen-27",
    "word": "sūnus",
    "translation": "filho",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Grau de parentesco Masculino com terminação '-us'."
  },
  {
    "id": "gen-28",
    "word": "alus",
    "translation": "cerveja",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Bebida masculina terminada em '-us'."
  },
  {
    "id": "gen-29",
    "word": "turgus",
    "translation": "feira / mercado",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Lugar público terminado em '-us', gênero Masculino."
  },
  {
    "id": "gen-30",
    "word": "lietus",
    "translation": "chuva",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Fenômeno natural do gênero Masculino terminado em '-us'."
  },
  {
    "id": "gen-31",
    "word": "medus",
    "translation": "mel",
    "correctGender": "M",
    "ending": "-us",
    "explanation": "Alimento do gênero Masculino terminado em '-us'."
  },
  {
    "id": "gen-32",
    "word": "Lietuva",
    "translation": "Lituânia",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Terminação em vogal aberta '-a' marca o gênero Feminino (Moteriškoji giminė)."
  },
  {
    "id": "gen-33",
    "word": "kava",
    "translation": "café",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Terminação '-a' pertence ao gênero Feminino."
  },
  {
    "id": "gen-34",
    "word": "mama",
    "translation": "mãe",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Parentesco feminino com terminação em '-a'."
  },
  {
    "id": "gen-35",
    "word": "knyga",
    "translation": "livro",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Substantivo Feminino terminado em '-a'."
  },
  {
    "id": "gen-36",
    "word": "diena",
    "translation": "dia",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Substantivo Feminino terminado em '-a'."
  },
  {
    "id": "gen-37",
    "word": "duona",
    "translation": "pão",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Alimento do gênero Feminino terminado em '-a'."
  },
  {
    "id": "gen-38",
    "word": "arbata",
    "translation": "chá",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Bebida feminina terminada em '-a'."
  },
  {
    "id": "gen-39",
    "word": "mokykla",
    "translation": "escola",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Instituição feminina terminada em '-a'."
  },
  {
    "id": "gen-40",
    "word": "biblioteka",
    "translation": "biblioteca",
    "correctGender": "F",
    "ending": "-a",
    "explanation": "Lugar do gênero Feminino terminado em '-a'."
  },
  {
    "id": "gen-41",
    "word": "kavinė",
    "translation": "cafeteria",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "A terminação '-ė' é marca registrada do gênero Feminino."
  },
  {
    "id": "gen-42",
    "word": "aikštė",
    "translation": "praça",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Espaço urbano Feminino terminado em '-ė'."
  },
  {
    "id": "gen-43",
    "word": "gatvė",
    "translation": "rua",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Via pública Feminina terminada em '-ė'."
  },
  {
    "id": "gen-44",
    "word": "ligoninė",
    "translation": "hospital",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Instituição de saúde Feminina terminada em '-ė'."
  },
  {
    "id": "gen-45",
    "word": "katė",
    "translation": "gata",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Animal Feminino terminado em '-ė'."
  },
  {
    "id": "gen-46",
    "word": "gėlė",
    "translation": "flor",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Elemento da natureza Feminino terminado em '-ė'."
  },
  {
    "id": "gen-47",
    "word": "parduotuvė",
    "translation": "loja",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Comércio Feminino terminado em '-ė'."
  },
  {
    "id": "gen-48",
    "word": "virtuvė",
    "translation": "cozinha",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Cômodo da casa Feminino terminado em '-ė'."
  },
  {
    "id": "gen-49",
    "word": "vaistinė",
    "translation": "farmácia",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Estabelecimento de saúde Feminino terminado em '-ė'."
  },
  {
    "id": "gen-50",
    "word": "žuvis",
    "translation": "peixe",
    "correctGender": "F",
    "ending": "-is",
    "explanation": "Substantivo Feminino da 3ª declinação (i-stem) terminado em '-is'."
  },
  {
    "id": "gen-51",
    "word": "šalis",
    "translation": "país / terra",
    "correctGender": "F",
    "ending": "-is",
    "explanation": "Substantivo Feminino da 3ª declinação terminado em '-is'."
  },
  {
    "id": "gen-52",
    "word": "naktis",
    "translation": "noite",
    "correctGender": "F",
    "ending": "-is",
    "explanation": "Substantivo Feminino da 3ª declinação terminado em '-is'."
  },
  {
    "id": "gen-53",
    "word": "dalis",
    "translation": "parte / porção",
    "correctGender": "F",
    "ending": "-is",
    "explanation": "Substantivo Feminino terminado em '-is'."
  },
  {
    "id": "gen-54",
    "word": "stotis",
    "translation": "estação (de trem/ônibus)",
    "correctGender": "F",
    "ending": "-is",
    "explanation": "Substantivo Feminino terminado em '-is'."
  },
  {
    "id": "gen-55",
    "word": "sesuo",
    "translation": "irmã",
    "correctGender": "F",
    "ending": "-uo",
    "explanation": "Exceção clássica da 5ª declinação consonantal: 'sesuo' é do gênero Feminino."
  },
  {
    "id": "gen-56",
    "word": "duktė",
    "translation": "filha",
    "correctGender": "F",
    "ending": "-ė",
    "explanation": "Exceção da 5ª declinação consonantal: 'duktė' é do gênero Feminino."
  }
];

export const CASE_SNAPPING_EXERCISES = [
  {
    "id": "snap-1",
    "sentenceBefore": "Aš gyvenu",
    "baseWord": "Vilnius",
    "baseMeaning": "Vilnius (capital, terminação em -us)",
    "sentenceAfter": ".",
    "fullTranslation": "Eu moro em Vilnius.",
    "options": [
      "Vilniuje",
      "Vilniue",
      "Vilniyje",
      "Vilniuoje"
    ],
    "correctAnswer": "Vilniuje",
    "ruleNote": "Regra: Substantivos em '-us' recebem a desinência '-uje' no Locativo (Vilnius -> Vilniuje)."
  },
  {
    "id": "snap-2",
    "sentenceBefore": "Mano brolis dirba",
    "baseWord": "Kaunas",
    "baseMeaning": "Kaunas (segunda maior cidade, terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Meu irmão trabalha em Kaunas.",
    "options": [
      "Kaune",
      "Kaunoje",
      "Kaunuje",
      "Kaunyje"
    ],
    "correctAnswer": "Kaune",
    "ruleNote": "Regra: Substantivos em '-as' flexionam para '-e' no Locativo (Kaunas -> Kaune)."
  },
  {
    "id": "snap-3",
    "sentenceBefore": "Draugė gyvena",
    "baseWord": "Klaipėda",
    "baseMeaning": "Klaipėda (porto litorâneo, terminação em -a)",
    "sentenceAfter": ".",
    "fullTranslation": "Minha amiga mora em Klaipėda.",
    "options": [
      "Klaipėdoje",
      "Klaipėde",
      "Klaipėdyje",
      "Klaipėdėje"
    ],
    "correctAnswer": "Klaipėdoje",
    "ruleNote": "Regra: Substantivos femininos em '-a' flexionam para '-oje' no Locativo (Klaipėda -> Klaipėdoje)."
  },
  {
    "id": "snap-4",
    "sentenceBefore": "Senoji pilis yra",
    "baseWord": "Trakai",
    "baseMeaning": "Trakai (cidade histórica, pluralia tantum em -ai)",
    "sentenceAfter": ".",
    "fullTranslation": "O antigo castelo fica em Trakai.",
    "options": [
      "Trakuose",
      "Trake",
      "Trakuje",
      "Trakoje"
    ],
    "correctAnswer": "Trakuose",
    "ruleNote": "Regra: Trakai é um nome plural masculino (-ai). No Locativo Plural recebe '-uose' (Trakai -> Trakuose)."
  },
  {
    "id": "snap-5",
    "sentenceBefore": "Mano šeima gyvena",
    "baseWord": "Šiauliai",
    "baseMeaning": "Šiauliai (cidade do norte, pluralia tantum em -iai)",
    "sentenceAfter": ".",
    "fullTranslation": "Minha família mora em Šiauliai.",
    "options": [
      "Šiauliuose",
      "Šiaulyje",
      "Šiauliuje",
      "Šiaulie"
    ],
    "correctAnswer": "Šiauliuose",
    "ruleNote": "Regra: Šiauliai é um nome plural em '-iai'. No Locativo Plural recebe '-iuose' (Šiauliai -> Šiauliuose)."
  },
  {
    "id": "snap-6",
    "sentenceBefore": "Aš dirbu",
    "baseWord": "bankas",
    "baseMeaning": "banco (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Eu trabalho no banco.",
    "options": [
      "banke",
      "bankoje",
      "bankuje",
      "bankyje"
    ],
    "correctAnswer": "banke",
    "ruleNote": "Regra: Substantivo masculino em '-as' forma o Locativo trocando por '-e' (bankas -> banke)."
  },
  {
    "id": "snap-7",
    "sentenceBefore": "Svarbus laiškas yra",
    "baseWord": "paštas",
    "baseMeaning": "correios (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "A carta importante está nos correios.",
    "options": [
      "pašte",
      "paštoje",
      "paštuje",
      "paštyje"
    ],
    "correctAnswer": "pašte",
    "ruleNote": "Regra: Substantivos em '-as' trocam a desinência por '-e' no Locativo (paštas -> pašte)."
  },
  {
    "id": "snap-8",
    "sentenceBefore": "Turistas dabar gyvena",
    "baseWord": "viešbutis",
    "baseMeaning": "hotel (terminação em -is)",
    "sentenceAfter": ".",
    "fullTranslation": "O turista está hospedado no hotel agora.",
    "options": [
      "viešbutyje",
      "viešbute",
      "viešbutiuje",
      "viešbutoje"
    ],
    "correctAnswer": "viešbutyje",
    "ruleNote": "Regra: Substantivos em '-is' recebem a terminação '-yje' no Locativo (viešbutis -> viešbutyje)."
  },
  {
    "id": "snap-9",
    "sentenceBefore": "Mes geriame skanią kavą",
    "baseWord": "kavinė",
    "baseMeaning": "cafeteria (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "Nós bebemos um café gostoso na cafeteria.",
    "options": [
      "kavinėje",
      "kavinie",
      "kavinioje",
      "kavinėjeje"
    ],
    "correctAnswer": "kavinėje",
    "ruleNote": "Regra: Substantivos em '-ė' trocam a vogal por '-ėje' no Locativo (kavinė -> kavinėje)."
  },
  {
    "id": "snap-10",
    "sentenceBefore": "Mokinys skaito knygą",
    "baseWord": "biblioteka",
    "baseMeaning": "biblioteca (terminação em -a)",
    "sentenceAfter": ".",
    "fullTranslation": "O estudante lê um livro na biblioteca.",
    "options": [
      "bibliotekoje",
      "biblioteke",
      "bibliotekyje",
      "bibliotekėje"
    ],
    "correctAnswer": "bibliotekoje",
    "ruleNote": "Regra: Substantivo feminino em '-a' flexiona para '-oje' no Locativo (biblioteka -> bibliotekoje)."
  },
  {
    "id": "snap-11",
    "sentenceBefore": "Mes laukiame traukinio",
    "baseWord": "stotis",
    "baseMeaning": "estação (substantivo feminino da 3ª declinação em -is)",
    "sentenceAfter": ".",
    "fullTranslation": "Nós estamos esperando o trem na estação.",
    "options": [
      "stotyje",
      "stotie",
      "stotiuje",
      "stotoje"
    ],
    "correctAnswer": "stotyje",
    "ruleNote": "Regra: Substantivos da 3ª declinação em '-is' recebem '-yje' no Locativo (stotis -> stotyje)."
  },
  {
    "id": "snap-12",
    "sentenceBefore": "Gydytoja dirba",
    "baseWord": "ligoninė",
    "baseMeaning": "hospital (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "A médica trabalha no hospital.",
    "options": [
      "ligoninėje",
      "ligonine",
      "ligoninioje",
      "ligoninyje"
    ],
    "correctAnswer": "ligoninėje",
    "ruleNote": "Regra: Substantivo feminino em '-ė' recebe a desinência '-ėje' no Locativo (ligoninė -> ligoninėje)."
  },
  {
    "id": "snap-13",
    "sentenceBefore": "Jonas pietauja gerame",
    "baseWord": "restoranas",
    "baseMeaning": "restaurante (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Jonas almoça em um bom restaurante.",
    "options": [
      "restorane",
      "restoranoje",
      "restoranuje",
      "restoranyje"
    ],
    "correctAnswer": "restorane",
    "ruleNote": "Regra: Substantivo em '-as' forma o Locativo trocando por '-e' (restoranas -> restorane)."
  },
  {
    "id": "snap-14",
    "sentenceBefore": "Šviežia duona yra",
    "baseWord": "parduotuvė",
    "baseMeaning": "loja / mercado (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "O pão fresco está na loja.",
    "options": [
      "parduotuvėje",
      "parduotuvie",
      "parduotuvyje",
      "parduotuvoje"
    ],
    "correctAnswer": "parduotuvėje",
    "ruleNote": "Regra: Substantivos em '-ė' recebem a desinência '-ėje' no Locativo (parduotuvė -> parduotuvėje)."
  },
  {
    "id": "snap-15",
    "sentenceBefore": "Studentė mokosi",
    "baseWord": "universitetas",
    "baseMeaning": "universidade (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "A estudante estuda na universidade.",
    "options": [
      "universitete",
      "universitetuje",
      "universitetoje",
      "universitetyje"
    ],
    "correctAnswer": "universitete",
    "ruleNote": "Regra: Substantivos em '-as' formam o Locativo trocando por '-e' (universitetas -> universitete)."
  },
  {
    "id": "snap-16",
    "sentenceBefore": "Mama gamina vakarienę",
    "baseWord": "virtuvė",
    "baseMeaning": "cozinha (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "A mãe prepara o jantar na cozinha.",
    "options": [
      "virtuvėje",
      "virtuvie",
      "virtuvyje",
      "virtuvoje"
    ],
    "correctAnswer": "virtuvėje",
    "ruleNote": "Regra: Substantivos femininos em '-ė' trocam por '-ėje' no Locativo (virtuvė -> virtuvėje)."
  },
  {
    "id": "snap-17",
    "sentenceBefore": "Didelis stalas stovi",
    "baseWord": "kambarys",
    "baseMeaning": "quarto / cômodo (terminação em -ys)",
    "sentenceAfter": ".",
    "fullTranslation": "Uma grande mesa está no quarto.",
    "options": [
      "kambaryje",
      "kambare",
      "kambariuje",
      "kambaroje"
    ],
    "correctAnswer": "kambaryje",
    "ruleNote": "Regra: Substantivos masculinos em '-ys' recebem '-yje' no Locativo (kambarys -> kambaryje)."
  },
  {
    "id": "snap-18",
    "sentenceBefore": "Mano butas yra pačiame",
    "baseWord": "centras",
    "baseMeaning": "centro (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Meu apartamento fica no próprio centro.",
    "options": [
      "centre",
      "centroje",
      "centruje",
      "centryje"
    ],
    "correctAnswer": "centre",
    "ruleNote": "Regra: Substantivos em '-as' trocam a desinência por '-e' (centras -> centre)."
  },
  {
    "id": "snap-19",
    "sentenceBefore": "Naujas automobilis stovi",
    "baseWord": "gatvė",
    "baseMeaning": "rua (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "O carro novo está estacionado na rua.",
    "options": [
      "gatvėje",
      "gatvie",
      "gatvyje",
      "gatvoje"
    ],
    "correctAnswer": "gatvėje",
    "ruleNote": "Regra: Substantivos em '-ė' recebem a terminação '-ėje' no Locativo (gatvė -> gatvėje)."
  },
  {
    "id": "snap-20",
    "sentenceBefore": "Žmonės susitinka",
    "baseWord": "aikštė",
    "baseMeaning": "praça (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "As pessoas se encontram na praça.",
    "options": [
      "aikštėje",
      "aikštie",
      "aikštyje",
      "aikštoje"
    ],
    "correctAnswer": "aikštėje",
    "ruleNote": "Regra: Substantivos em '-ė' recebem a desinência '-ėje' no Locativo (aikštė -> aikštėje)."
  },
  {
    "id": "snap-21",
    "sentenceBefore": "Mes perkame daržoves",
    "baseWord": "turgus",
    "baseMeaning": "feira / mercado (terminação em -us)",
    "sentenceAfter": ".",
    "fullTranslation": "Nós compramos vegetais na feira.",
    "options": [
      "turguje",
      "turge",
      "turgyje",
      "turgoje"
    ],
    "correctAnswer": "turguje",
    "ruleNote": "Regra: Substantivos em '-us' formam o Locativo trocando por '-uje' (turgus -> turguje)."
  },
  {
    "id": "snap-22",
    "sentenceBefore": "Spektaklis vyksta",
    "baseWord": "teatras",
    "baseMeaning": "teatro (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "A peça de teatro acontece no teatro.",
    "options": [
      "teatre",
      "teatroje",
      "teatruje",
      "teatryje"
    ],
    "correctAnswer": "teatre",
    "ruleNote": "Regra: Substantivos em '-as' recebem '-e' no Locativo (teatras -> teatre)."
  },
  {
    "id": "snap-23",
    "sentenceBefore": "Visi draugai dabar yra",
    "baseWord": "namas",
    "baseMeaning": "casa (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Todos os amigos estão na casa agora.",
    "options": [
      "name",
      "namoje",
      "namuje",
      "namyje"
    ],
    "correctAnswer": "name",
    "ruleNote": "Regra: Substantivos em '-as' formam o Locativo com '-e' (namas -> name)."
  },
  {
    "id": "snap-24",
    "sentenceBefore": "Vaikai mokosi",
    "baseWord": "mokykla",
    "baseMeaning": "escola (terminação em -a)",
    "sentenceAfter": ".",
    "fullTranslation": "As crianças estudam na escola.",
    "options": [
      "mokykloje",
      "mokykle",
      "mokyklyje",
      "mokyklėje"
    ],
    "correctAnswer": "mokykloje",
    "ruleNote": "Regra: Substantivos femininos em '-a' flexionam para '-oje' no Locativo (mokykla -> mokykloje)."
  },
  {
    "id": "snap-25",
    "sentenceBefore": "Mes vaikštome žaliame",
    "baseWord": "parkas",
    "baseMeaning": "parque (terminação em -as)",
    "sentenceAfter": ".",
    "fullTranslation": "Nós caminhamos no parque verde.",
    "options": [
      "parke",
      "parkoje",
      "parkuje",
      "parkyje"
    ],
    "correctAnswer": "parke",
    "ruleNote": "Regra: Substantivos em '-as' formam o Locativo com '-e' (parkas -> parke)."
  },
  {
    "id": "snap-26",
    "sentenceBefore": "Reikalingi vaistai yra",
    "baseWord": "vaistinė",
    "baseMeaning": "farmácia (terminação em -ė)",
    "sentenceAfter": ".",
    "fullTranslation": "Os remédios necessários estão na farmácia.",
    "options": [
      "vaistinėje",
      "vaistinie",
      "vaistinyje",
      "vaistinoje"
    ],
    "correctAnswer": "vaistinėje",
    "ruleNote": "Regra: Substantivos em '-ė' trocam a desinência por '-ėje' no Locativo (vaistinė -> vaistinėje)."
  }
];


export const SENTENCE_BUILDER_EXERCISES = [
  {
    "id": "build-1",
    "targetPortuguese": "Você fala lituano?",
    "blocks": [
      "lietuviškai?",
      "Ar",
      "tu",
      "kalbi"
    ],
    "correctOrder": [
      "Ar",
      "tu",
      "kalbi",
      "lietuviškai?"
    ],
    "grammarFocus": "A partícula interrogativa 'Ar' posiciona-se no início da frase para criar a pergunta."
  },
  {
    "id": "build-2",
    "targetPortuguese": "Eu não moro em Kaunas.",
    "blocks": [
      "Kaune.",
      "Aš",
      "negyvenu"
    ],
    "correctOrder": [
      "Aš",
      "negyvenu",
      "Kaune."
    ],
    "grammarFocus": "O prefixo negativo 'ne-' une-se diretamente ao verbo 'gyventi' formando 'negyvenu'."
  },
  {
    "id": "build-3",
    "targetPortuguese": "Maria não está aqui agora.",
    "blocks": [
      "dabar.",
      "nėra",
      "Maria",
      "čia"
    ],
    "correctOrder": [
      "Maria",
      "nėra",
      "čia",
      "dabar."
    ],
    "grammarFocus": "A forma negativa da 3ª pessoa do verbo būti é irregular e obrigatória: 'nėra'."
  },
  {
    "id": "build-4",
    "targetPortuguese": "Você é brasileiro?",
    "blocks": [
      "brazilas?",
      "Ar",
      "esi",
      "tu"
    ],
    "correctOrder": [
      "Ar",
      "tu",
      "esi",
      "brazilas?"
    ],
    "grammarFocus": "Interrogação com 'Ar' + pronome + verbo 'būti' conjugado na 2ª pessoa (esi)."
  },
  {
    "id": "build-5",
    "targetPortuguese": "Meu amigo trabalha no hotel.",
    "blocks": [
      "dirba",
      "Mano",
      "viešbutyje.",
      "draugas"
    ],
    "correctOrder": [
      "Mano",
      "draugas",
      "dirba",
      "viešbutyje."
    ],
    "grammarFocus": "Estrutura Sujeito (Mano draugas) + Verbo (dirba) + Locativo de lugar (viešbutyje)."
  },
  {
    "id": "build-6",
    "targetPortuguese": "Você entende português?",
    "blocks": [
      "portugališkai?",
      "Ar",
      "supranti",
      "tu"
    ],
    "correctOrder": [
      "Ar",
      "tu",
      "supranti",
      "portugališkai?"
    ],
    "grammarFocus": "Verbo 'suprasti' (entender) na 2ª pessoa (supranti) com interrogação 'Ar'."
  },
  {
    "id": "build-7",
    "targetPortuguese": "Eu não entendo lituano.",
    "blocks": [
      "nesuprantu",
      "Aš",
      "lietuviškai."
    ],
    "correctOrder": [
      "Aš",
      "nesuprantu",
      "lietuviškai."
    ],
    "grammarFocus": "Prefixo negativo 'ne-' colado ao verbo: ne + suprantu = 'nesuprantu'."
  },
  {
    "id": "build-8",
    "targetPortuguese": "Você quer café ou chá?",
    "blocks": [
      "arbatos?",
      "nori",
      "Ar",
      "tu",
      "kavos",
      "ar"
    ],
    "correctOrder": [
      "Ar",
      "tu",
      "nori",
      "kavos",
      "ar",
      "arbatos?"
    ],
    "grammarFocus": "Verbo 'norėti' com substâncias no caso Genitivo partitivo (kavos, arbatos)."
  },
  {
    "id": "build-9",
    "targetPortuguese": "Eu não tenho tempo hoje.",
    "blocks": [
      "neturiu",
      "laiko.",
      "Aš",
      "šiandien"
    ],
    "correctOrder": [
      "Aš",
      "šiandien",
      "neturiu",
      "laiko."
    ],
    "grammarFocus": "Regra de Ouro do Lituano: Negação verbal (neturiu) exige o objeto no Genitivo (laikas -> laiko)."
  },
  {
    "id": "build-10",
    "targetPortuguese": "Jonas trabalha no banco?",
    "blocks": [
      "banke?",
      "Ar",
      "dirba",
      "Jonas"
    ],
    "correctOrder": [
      "Ar",
      "Jonas",
      "dirba",
      "banke?"
    ],
    "grammarFocus": "Pergunta com 'Ar' + Sujeito + Verbo 'dirbti' + Locativo (banke)."
  },
  {
    "id": "build-11",
    "targetPortuguese": "Nós não estamos no restaurante.",
    "blocks": [
      "nesame",
      "restorane.",
      "Mes"
    ],
    "correctOrder": [
      "Mes",
      "nesame",
      "restorane."
    ],
    "grammarFocus": "Negação do verbo būti na 1ª pessoa do plural: 'nesame' + Locativo."
  },
  {
    "id": "build-12",
    "targetPortuguese": "Você tem o bilhete?",
    "blocks": [
      "turi",
      "bilietą?",
      "Ar",
      "tu"
    ],
    "correctOrder": [
      "Ar",
      "tu",
      "turi",
      "bilietą?"
    ],
    "grammarFocus": "Verbo 'turėti' afirmativo pede o objeto direto no Acusativo (bilietas -> bilietą)."
  },
  {
    "id": "build-13",
    "targetPortuguese": "Eu não tenho dinheiro.",
    "blocks": [
      "neturiu",
      "pinigų.",
      "Aš"
    ],
    "correctOrder": [
      "Aš",
      "neturiu",
      "pinigų."
    ],
    "grammarFocus": "Negação com Genitivo Plural de substância/quantidade (pinigai -> pinigų)."
  },
  {
    "id": "build-14",
    "targetPortuguese": "Ela fala inglês muito bem.",
    "blocks": [
      "kalba",
      "gerai",
      "angliškai.",
      "labai",
      "Ji"
    ],
    "correctOrder": [
      "Ji",
      "labai",
      "gerai",
      "kalba",
      "angliškai."
    ],
    "grammarFocus": "Ordem dos advérbios modificadores (labai gerai) antes do verbo 'kalba'."
  },
  {
    "id": "build-15",
    "targetPortuguese": "O hospital fica no centro?",
    "blocks": [
      "centre?",
      "Ar",
      "ligoninė",
      "yra"
    ],
    "correctOrder": [
      "Ar",
      "ligoninė",
      "yra",
      "centre?"
    ],
    "grammarFocus": "Pergunta de localização com 'Ar' + substantivo feminino + 'yra' + Locativo (centre)."
  },
  {
    "id": "build-16",
    "targetPortuguese": "Você quer pagar com cartão?",
    "blocks": [
      "mokėti",
      "kortele?",
      "norite",
      "Ar"
    ],
    "correctOrder": [
      "Ar",
      "norite",
      "mokėti",
      "kortele?"
    ],
    "grammarFocus": "Frase de cortesia comercial: 'Ar norite' + infinitivo 'mokėti' + Instrumental (kortele)."
  }
];

export const SITUATIONAL_DIALOGUES = [
  {
    "id": "roleplay-1",
    "title": "Primeiro Encontro em Vilnius (Pirmas susitikimas)",
    "context": "Você acaba de chegar a Vilnius e encontra Jonas na recepção de um evento cultural.",
    "avatarPartner": "👨",
    "partnerName": "Jonas",
    "steps": [
      {
        "step": 1,
        "partnerSpeech": "Labas rytas! Mano vardas yra Jonas. Ar tu esi Maria?",
        "partnerTranslation": "Bom dia! Meu nome é Jonas. Você é a Maria?",
        "options": [
          {
            "text": "Labas rytas! Taip, aš esu Maria. Malonu susipažinti.",
            "translation": "Bom dia! Sim, eu sou a Maria. Prazer em conhecer.",
            "isCorrect": true,
            "feedback": "Excelente! Resposta cortês com a confirmação correta do verbo būti (esu)."
          },
          {
            "text": "Ne, aš gyvenu Lietuvoje.",
            "translation": "Não, eu moro na Lituânia.",
            "isCorrect": false,
            "feedback": "Incoerente: Jonas perguntou seu nome/identidade, e não onde você mora."
          },
          {
            "text": "Taip, aš yra Maria.",
            "translation": "Sim, eu é a Maria.",
            "isCorrect": false,
            "feedback": "Erro gramatical: para a 1ª pessoa (aš), deve-se usar 'esu', nunca 'yra'."
          }
        ]
      },
      {
        "step": 2,
        "partnerSpeech": "Labai malonu, Maria! Ar tu kalbi lietuviškai?",
        "partnerTranslation": "Muito prazer, Maria! Você fala lituano?",
        "options": [
          {
            "text": "Taip, aš truputį kalbu lietuviškai.",
            "translation": "Sim, eu falo um pouco de lituano.",
            "isCorrect": true,
            "feedback": "Perfeito! Uso natural do advérbio 'truputį' (um pouco) e verbo kalbėti."
          },
          {
            "text": "Ne, aš nedirba čia.",
            "translation": "Não, eu não trabalha aqui.",
            "isCorrect": false,
            "feedback": "Incorreto: mistura o verbo dirbti (trabalhar) conjugado incorretamente."
          },
          {
            "text": "Aš kalbu Lietuvoje.",
            "translation": "Eu falo na Lituânia.",
            "isCorrect": false,
            "feedback": "Sem sentido: deve-se responder sobre a habilidade de falar o idioma."
          }
        ]
      },
      {
        "step": 3,
        "partnerSpeech": "Puiku! O kur tu dabar gyveni Vilniuje?",
        "partnerTranslation": "Ótimo! E onde você mora agora em Vilnius?",
        "options": [
          {
            "text": "Aš gyvenu viešbutyje, centre.",
            "translation": "Eu moro em um hotel, no centro.",
            "isCorrect": true,
            "feedback": "Brilhante! Emprego duplo e correto do caso Locativo (viešbutyje e centre)."
          },
          {
            "text": "Aš gyvenu viešbutis.",
            "translation": "Eu moro hotel (nominativo sem declinação).",
            "isCorrect": false,
            "feedback": "Erro de caso: falta a desinência do Locativo. O correto é 'viešbutyje'."
          },
          {
            "text": "Aš esu Brazilija.",
            "translation": "Eu sou Brasil.",
            "isCorrect": false,
            "feedback": "Incorreto: para indicar origem usa-se 'iš Brazilijos' (Genitivo) e a pergunta foi sobre onde mora."
          }
        ]
      }
    ]
  },
  {
    "id": "roleplay-2",
    "title": "Kavinėje (No Café em Vilnius)",
    "context": "Você entra em uma cafeteria charmosa no centro histórico de Vilnius para pedir café da manhã e a conta.",
    "avatarPartner": "💁‍♀️",
    "partnerName": "Padavėja (Garçonete)",
    "steps": [
      {
        "step": 1,
        "partnerSpeech": "Laba diena! Prašom prisėsti. Ką norite užsisakyti?",
        "partnerTranslation": "Boa tarde! Por favor, sentem-se. O que gostariam de pedir?",
        "options": [
          {
            "text": "Laba diena! Aš noriu kavos su pienu ir pyrago, prašau.",
            "translation": "Boa tarde! Eu quero um café com leite e bolo, por favor.",
            "isCorrect": true,
            "feedback": "Perfeito! Pedido padrão em restaurantes utilizando o Genitivo partitivo (kavos, pyrago) e preposição 'su'."
          },
          {
            "text": "Aš esu kavinė, ačiū.",
            "translation": "Eu sou cafeteria, obrigado.",
            "isCorrect": false,
            "feedback": "Erro semântico: 'aš esu' significa 'eu sou'. Você deve pedir o que deseja com 'noriu'."
          },
          {
            "text": "Noriu kava ir pyragas.",
            "translation": "Quero café e bolo (nominativo bruto).",
            "isCorrect": false,
            "feedback": "Falta de declinação: para pedidos de alimentos usa-se o Acusativo ou o Genitivo partitivo (kavos, pyrago)."
          }
        ]
      },
      {
        "step": 2,
        "partnerSpeech": "Puikus pasirinkimas! Ar gersite čia, ar išsinešti?",
        "partnerTranslation": "Excelente escolha! Vão beber aqui ou para viagem?",
        "options": [
          {
            "text": "Gersiu čia, prie šio staliuko, prašau.",
            "translation": "Vou beber aqui, junto a esta mesa, por favor.",
            "isCorrect": true,
            "feedback": "Excelente! Resposta clara com o verbo 'gerti' no futuro e advérbio 'čia' (aqui)."
          },
          {
            "text": "Taip, aš negeriu arbatos.",
            "translation": "Sim, eu não bebo chá.",
            "isCorrect": false,
            "feedback": "Incoerente: a pergunta é se o consumo será no local ou para levar."
          },
          {
            "text": "Aš nedirbu čia dabar.",
            "translation": "Eu não trabalho aqui agora.",
            "isCorrect": false,
            "feedback": "Totalmente fora de contexto com o verbo dirbti."
          }
        ]
      },
      {
        "step": 3,
        "partnerSpeech": "Štai jūsų kava ir pyragas. Skanaus!",
        "partnerTranslation": "Aqui está o seu café e bolo. Bom apetite!",
        "options": [
          {
            "text": "Labai ačiū! Prašau sąskaitą, noriu mokėti kortele.",
            "translation": "Muito obrigado! A conta, por favor, quero pagar com cartão.",
            "isCorrect": true,
            "feedback": "Impecável! Fórmula oficial de finalização de consumo e pagamento cortês da Categoria I."
          },
          {
            "text": "Aš neturiu kava.",
            "translation": "Eu não tenho café (nominativo errado).",
            "isCorrect": false,
            "feedback": "Incorreto: você acabou de receber o café e, na negação, deveria ser 'kavos'."
          },
          {
            "text": "Kur yra Vilnius?",
            "translation": "Onde fica Vilnius?",
            "isCorrect": false,
            "feedback": "Pergunta sem sentido em uma cafeteria na própria cidade de Vilnius."
          }
        ]
      }
    ]
  },
  {
    "id": "roleplay-3",
    "title": "Gatvėje (Pedindo Informações na Rua)",
    "context": "Você está caminhando pela avenida Gediminas e precisa encontrar a parada de ônibus mais próxima.",
    "avatarPartner": "🚶‍♂️",
    "partnerName": "Praeivis (Pedestre)",
    "steps": [
      {
        "step": 1,
        "partnerSpeech": "Laba diena! Kuo galiu padėti?",
        "partnerTranslation": "Boa tarde! Em que posso ajudar?",
        "options": [
          {
            "text": "Atsiprašau, ar galite pasakyti, kur yra autobusų stotelė?",
            "translation": "Com licença, o senhor pode dizer onde fica a parada de ônibus?",
            "isCorrect": true,
            "feedback": "Excelente! Abordagem educada com 'Atsiprašau', interrogação com 'ar' e pergunta de lugar 'kur yra'."
          },
          {
            "text": "Aš gyvenu autobuse.",
            "translation": "Eu moro no ônibus.",
            "isCorrect": false,
            "feedback": "Incoerente: você precisa pedir informação de localização, não relatar moradia no veículo."
          },
          {
            "text": "Stotelė yra namas.",
            "translation": "Parada é casa.",
            "isCorrect": false,
            "feedback": "Frase sem sentido sintático ou pragmático."
          }
        ]
      },
      {
        "step": 2,
        "partnerSpeech": "Taip, žinoma! Stotelė yra visai netoli, prie žalio parko.",
        "partnerTranslation": "Sim, claro! A parada fica bem perto, junto ao parque verde.",
        "options": [
          {
            "text": "Supratau. Ar reikia eiti tiesiai, ar sukti į dešinę?",
            "translation": "Entendi. É preciso ir direto ou virar à direita?",
            "isCorrect": true,
            "feedback": "Brilhante! Uso do verbo 'suprasti' (supratau = entendi) e pergunta de direção prática da Categoria I."
          },
          {
            "text": "Ne, aš nekalbu apie parką.",
            "translation": "Não, eu não falo sobre o parque.",
            "isCorrect": false,
            "feedback": "Grosseiro e desconexo da orientação dada pelo pedestre."
          },
          {
            "text": "Parkas yra studentas.",
            "translation": "O parque é um estudante.",
            "isCorrect": false,
            "feedback": "Incompatibilidade semântica total."
          }
        ]
      },
      {
        "step": 3,
        "partnerSpeech": "Eikite tiesiai apie du šimtus metrų, stotelė bus dešinėje pusėje.",
        "partnerTranslation": "Vá direto cerca de duzentos metros, a parada estará do lado direito.",
        "options": [
          {
            "text": "Labai ačiū už pagalbą! Geros dienos!",
            "translation": "Muito obrigado pela ajuda! Tenha um bom dia!",
            "isCorrect": true,
            "feedback": "Perfeito! Agradecimento cortês ('už pagalbą' com acusativo) e despedida nativa lituana."
          },
          {
            "text": "Aš nesu čia dabar.",
            "translation": "Eu não sou aqui agora.",
            "isCorrect": false,
            "feedback": "Frase incorreta: confunde 'ser' com estar e não faz sentido na despedida."
          },
          {
            "text": "Prašau duonos.",
            "translation": "Por favor, pão.",
            "isCorrect": false,
            "feedback": "Inadequado: o pedestre não está vendendo alimentos."
          }
        ]
      }
    ]
  },
  {
    "id": "roleplay-4",
    "title": "Geležinkelio Stotyje (Na Estação de Trem)",
    "context": "Você está na Estação Ferroviária de Vilnius (Vilniaus geležinkelio stotis) no guichê de passagens para viajar a Kaunas.",
    "avatarPartner": "👩‍💼",
    "partnerName": "Kasininkė (Atendente do Guichê)",
    "steps": [
      {
        "step": 1,
        "partnerSpeech": "Laba diena! Kur norite važiuoti?",
        "partnerTranslation": "Boa tarde! Para onde gostaria de viajar?",
        "options": [
          {
            "text": "Laba diena! Prašau vieną bilietą į Kauną.",
            "translation": "Boa tarde! Por favor, um bilhete para Kaunas.",
            "isCorrect": true,
            "feedback": "Excelente! Pedido direto com preposição 'į' que rege Acusativo de direção (Kaunas -> Kauną)."
          },
          {
            "text": "Aš gyvenu stotyje.",
            "translation": "Eu moro na estação.",
            "isCorrect": false,
            "feedback": "Inadequado: você deve informar seu destino de viagem."
          },
          {
            "text": "Noriu bilietas Kaune.",
            "translation": "Quero bilhete em Kaunas.",
            "isCorrect": false,
            "feedback": "Erros de caso: 'bilietas' deveria estar no acusativo e a direção para Kaunas usa 'į Kauną', não locativo."
          }
        ]
      },
      {
        "step": 2,
        "partnerSpeech": "Gerai. Kada norite išvykti? Yra traukinys dešimtą valandą.",
        "partnerTranslation": "Tudo bem. Quando deseja partir? Há um trem às 10 horas.",
        "options": [
          {
            "text": "Taip, dešimtą valandą labai tinka. Prašau į antrą klasę.",
            "translation": "Sim, às 10 horas é muito conveniente. Por favor, na segunda classe.",
            "isCorrect": true,
            "feedback": "Perfeito! Confirmação de horário de transporte público, item crucial do exame oficial da Categoria I."
          },
          {
            "text": "Ne, aš neturiu traukinio.",
            "translation": "Não, eu não tenho trem.",
            "isCorrect": false,
            "feedback": "Incoerente: a atendente perguntou sobre o horário do embarque."
          },
          {
            "text": "Dešimt yra stalas.",
            "translation": "Dez é mesa.",
            "isCorrect": false,
            "feedback": "Frase sem sentido algum."
          }
        ]
      },
      {
        "step": 3,
        "partnerSpeech": "Bilietas kainuoja aštuonis eurus. Mokėsite grynaisiais ar kortele?",
        "partnerTranslation": "A passagem custa 8 euros. Vai pagar em dinheiro vivo ou cartão?",
        "options": [
          {
            "text": "Mokėsiu kortele. Štai, prašom.",
            "translation": "Vou pagar com cartão. Aqui está, por favor.",
            "isCorrect": true,
            "feedback": "Impecável! Resposta no tempo futuro ('mokėsiu') com o caso Instrumental ('kortele')."
          },
          {
            "text": "Aš neturiu Kauno.",
            "translation": "Eu não tenho de Kaunas.",
            "isCorrect": false,
            "feedback": "Incoerente: a pergunta é a forma de pagamento do bilhete."
          },
          {
            "text": "Kortelė yra miestas.",
            "translation": "Cartão é cidade.",
            "isCorrect": false,
            "feedback": "Frase absurda sem nexo contextual."
          }
        ]
      }
    ]
  }
];
