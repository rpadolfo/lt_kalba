// Dialogues View (Pokalbiai) with Suffix-Stripping Morphological Tooltip and Speech Synthesis
import { db } from '../data/mockData.js';

// Fallback dialogues if backend is not started yet
const FALLBACK_DIALOGUES = [
  {
    id: "dial-1",
    title: "Susipažinkime (Apresentando-se)",
    description: "Jonas e Maria se conhecem e conversam sobre suas nacionalidades e identidades.",
    module: 1,
    conversation: [
      {"speaker": "Jonas", "avatar": "👨", "text": "Labas rytas! Mano vardas yra Jonas. Aš esu lietuvis. O tu?"},
      {"speaker": "Maria", "avatar": "👩", "text": "Labas rytas! Mano vardas yra Maria. Aš esu iš Brazilijos, aš esu brazilė."},
      {"speaker": "Jonas", "avatar": "👨", "text": "Malonu susipažinti, Maria! Sveika atvykusi į Lietuvą."},
      {"speaker": "Maria", "avatar": "👩", "text": "Ačiū! Man irgi labai malonu."}
    ]
  },
  {
    id: "dial-2",
    title: "Mano Miestas (Onde você mora?)",
    description: "Maria explica onde está morando e Jonas fala sobre seu trabalho.",
    module: 2,
    conversation: [
      {"speaker": "Jonas", "avatar": "👨", "text": "Maria, kur tu gyveni dabar?"},
      {"speaker": "Maria", "avatar": "👩", "text": "Aš gyvenu Vilniuje, gražiame bute. O kur tu gyveni?"},
      {"speaker": "Jonas", "avatar": "👨", "text": "Aš gyvenu Kaune, bet mano darbas yra Vilniuje. Aš dirbu čia."},
      {"speaker": "Maria", "avatar": "👩", "text": "Vilnius yra labai gražus miestas."}
    ]
  },
  {
    id: "dial-3",
    title: "Kavinėje (No Café)",
    description: "Maria e Jonas pedem comida e bebida utilizando o caso Acusativo e Genitivo.",
    module: 4,
    conversation: [
      {"speaker": "Padavėja", "avatar": "💁‍♀️", "text": "Laba diena! Ką norite užsisakyti?"},
      {"speaker": "Maria", "avatar": "👩", "text": "Laba diena! Aš noriu kavos ir duonos, prašau."},
      {"speaker": "Jonas", "avatar": "👨", "text": "O aš noriu arbatos ir pyrago, prašau. Aš neturiu daug laiko."},
      {"speaker": "Padavėja", "avatar": "💁‍♀️", "text": "Prašom, tuoj atnešiu."}
    ]
  }
];

export const DialoguesView = {
  dialogues: FALLBACK_DIALOGUES,
  activeDialogueId: null,

  render() {
    this.fetchDialoguesFromBackend(); // Async trigger, updates UI when resolved

    let viewHtml = "";
    
    if (this.activeDialogueId !== null) {
      const dialogue = this.dialogues.find(d => d.id === this.activeDialogueId) || FALLBACK_DIALOGUES.find(d => d.id === this.activeDialogueId);
      if (dialogue) {
        viewHtml = this.renderDialoguePlayer(dialogue);
      } else {
        viewHtml = this.renderDialoguesList();
      }
    } else {
      viewHtml = this.renderDialoguesList();
    }

    return `
      <!-- Local Component Styles -->
      <style>
        .dialogues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .dialogue-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 200px;
        }
        .dialogue-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-premium);
        }
        .chat-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--shadow-premium);
        }
        .chat-bubble-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          width: 100%;
        }
        .chat-bubble-row.user-side {
          flex-direction: row-reverse;
        }
        .speaker-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 1px solid var(--border-color);
        }
        .bubble-content {
          max-width: 70%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .speaker-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .chat-bubble-row.user-side .speaker-name {
          text-align: right;
        }
        .bubble-text {
          background-color: var(--bg-body);
          border: 1px solid var(--border-color);
          padding: 0.85rem 1.25rem;
          border-radius: 18px;
          border-top-left-radius: 2px;
          color: white;
          font-size: 1.05rem;
          line-height: 1.5;
        }
        .chat-bubble-row.user-side .bubble-text {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.05));
          border-color: rgba(139, 92, 246, 0.3);
          border-radius: 18px;
          border-top-right-radius: 2px;
        }
        .clickable-word {
          cursor: pointer;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.35);
          display: inline-block;
          transition: var(--transition-fast);
        }
        .clickable-word:hover {
          color: var(--primary-hover);
          border-bottom-color: var(--primary-hover);
          background-color: rgba(139, 92, 246, 0.08);
          border-radius: 3px;
        }
        
        /* Glassmorphism Morphological Tooltip */
        .morph-tooltip {
          position: absolute;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          max-width: 280px;
          color: white;
          font-size: 0.9rem;
          animation: tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: none;
        }
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tooltip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.5rem;
        }
        .tooltip-word {
          font-weight: 700;
          color: var(--primary-hover);
          font-size: 1.15rem;
        }
        .tooltip-speak-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 2px;
          transition: var(--transition-fast);
        }
        .tooltip-speak-btn:hover {
          transform: scale(1.2);
        }
        .tooltip-row {
          margin-bottom: 0.5rem;
        }
        .tooltip-label {
          color: var(--text-secondary);
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
        }
        .tooltip-value {
          font-weight: 500;
          color: white;
        }
        .tooltip-badge {
          background-color: var(--primary-glow);
          color: var(--primary-hover);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
          margin-top: 2px;
        }
      </style>

      <div class="view dialogues-view">
        ${viewHtml}
      </div>

      <!-- Single reusable tooltip DOM structure -->
      <div id="word-analyzer-tooltip" class="morph-tooltip">
        <div class="tooltip-header">
          <span class="tooltip-word" id="tooltip-title">Vilniuje</span>
        </div>
        <div id="tooltip-body">
          <div class="tooltip-row">
            <div class="tooltip-label">Lema (Nominativo)</div>
            <div class="tooltip-value" id="tooltip-lemma">Vilnius</div>
          </div>
          <div class="tooltip-row">
            <div class="tooltip-label">Caso Gramatical</div>
            <div class="tooltip-value" id="tooltip-case"><span class="tooltip-badge">Locativo (Kur?)</span></div>
          </div>
          <div class="tooltip-row">
            <div class="tooltip-label">Gênero / Classe</div>
            <div class="tooltip-value" id="tooltip-type">Substantivo Masculino (M)</div>
          </div>
          <div class="tooltip-row" style="margin-bottom: 0;">
            <div class="tooltip-label">Tradução</div>
            <div class="tooltip-value" id="tooltip-translation" style="color: var(--success);">Vilnius (capital)</div>
          </div>
        </div>
      </div>
    `;
  },

  renderDialoguesList() {
    return `
      <h1 class="view-title">Pokalbiai (Diálogos Contextuais)</h1>
      <p class="view-subtitle">Leia os diálogos adaptados da obra <i>Mano ir tavo šalis Lietuva</i>. Clique nas palavras em lituano para ver a gramática.</p>
      
      <div class="dialogues-grid">
        ${this.dialogues.map(d => `
          <div class="dialogue-card">
            <div>
              <span class="module-badge">Módulo ${d.module}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.2rem; color: white; margin-top: 0.5rem; margin-bottom: 0.5rem;">${d.title}</h3>
              <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">${d.description}</p>
            </div>
            <button class="action-btn action-btn-primary play-dialogue-btn" data-dial-id="${d.id}" style="margin-top: 1.5rem; text-align: center; width: 100%;">
              Iniciar Leitura 💬
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderDialoguePlayer(dialogue) {
    return `
      <button class="action-btn action-btn-secondary" id="back-to-dialogues" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        ⬅️ Voltar para Lista
      </button>

      <div class="chat-container">
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
          <span class="module-badge">Módulo ${dialogue.module}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: white; margin-top: 0.25rem;">${dialogue.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">Clique em qualquer palavra destacada em lituano para abrir o dicionário morfológico.</p>
        </div>

        <!-- Dialogue bubbles list -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${dialogue.conversation.map((line, idx) => {
            const isUserSide = (line.speaker === "Maria"); // Maria is left/right aligned for visual distinction
            return `
              <div class="chat-bubble-row ${isUserSide ? 'user-side' : ''}">
                <div class="speaker-avatar" title="${line.speaker}">${line.avatar}</div>
                <div class="bubble-content">
                  <span class="speaker-name">${line.speaker}</span>
                  <div class="bubble-text">
                    ${this.makeTextClickable(line.text)}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  makeTextClickable(text) {
    // Splits words and parses punctuation
    return text.split(' ').map(rawWord => {
      // Isolate clean word for lookup (removes punctuation)
      const cleanWord = rawWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”]/g, "").trim();
      if (cleanWord.length === 0) return rawWord;
      
      // Rebuild with wrapped word + punctuation restored outside the span
      const startPunc = rawWord.match(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"“”]+/);
      const endPunc = rawWord.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”]+$/);
      
      const prefix = startPunc ? startPunc[0] : "";
      const suffix = endPunc ? endPunc[0] : "";
      
      return `${prefix}<span class="clickable-word" data-word="${cleanWord}">${cleanWord}</span>${suffix}`;
    }).join(' ');
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Back button trigger
    const backBtn = document.getElementById('back-to-dialogues');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activeDialogueId = null;
        forceRenderCallback();
      });
    }

    // 2. Play Dialogue trigger
    document.querySelectorAll('.play-dialogue-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.dialId;
        this.activeDialogueId = id;
        forceRenderCallback();
      });
    });

    // 3. Clickable word tooltip analyzer trigger
    const clickableWords = document.querySelectorAll('.clickable-word');
    const tooltip = document.getElementById('word-analyzer-tooltip');
    
    if (tooltip) {
      // Close tooltip when clicking elsewhere
      document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('clickable-word') && !tooltip.contains(e.target)) {
          tooltip.style.display = 'none';
        }
      });
    }

    clickableWords.forEach(wordSpan => {
      wordSpan.addEventListener('click', async (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        
        // Show loading and position tooltip near element
        const rect = wordSpan.getBoundingClientRect();
        const tooltipX = rect.left + window.scrollX;
        const tooltipY = rect.bottom + window.scrollY + 8;
        
        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
        tooltip.style.display = 'block';
        
        // Render Loading inside tooltip
        document.getElementById('tooltip-title').textContent = word;
        document.getElementById('tooltip-lemma').innerHTML = `<span style="color: var(--text-muted);">Analisando...</span>`;
        document.getElementById('tooltip-case').innerHTML = "";
        document.getElementById('tooltip-type').textContent = "";
        document.getElementById('tooltip-translation').textContent = "";

        // Fetch Analysis from FastAPI backend
        try {
          const response = await fetch('http://localhost:8000/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word: word })
          });
          
          if (!response.ok) throw new Error('API failed');
          
          const result = await response.json();
          this.populateTooltip(result);
        } catch (error) {
          // Backend offline - use local Javascript morphological analyzer fallback!
          console.warn('Backend morphology API unreachable, using JS local fallback.', error);
          const fallbackResult = this.offlineAnalyze(word);
          this.populateTooltip(fallbackResult);
        }
      });
    });
  },

  populateTooltip(result) {
    document.getElementById('tooltip-title').textContent = result.word;
    document.getElementById('tooltip-lemma').textContent = result.lemma;
    
    const isNominative = result.case.includes("Nominativo") || result.case.includes("Infinitivo");
    const badgeColor = isNominative ? "rgba(139, 92, 246, 0.2)" : "rgba(16, 185, 129, 0.2)";
    const textColor = isNominative ? "var(--primary-hover)" : "var(--success)";
    
    document.getElementById('tooltip-case').innerHTML = `
      <span class="tooltip-badge" style="background-color: ${badgeColor}; color: ${textColor};">${result.case}</span>
    `;
    document.getElementById('tooltip-type').textContent = `${result.type} ${result.gender !== 'N/A' ? '(' + result.gender + ')' : ''}`;
    document.getElementById('tooltip-translation').textContent = result.translation;
  },

  async fetchDialoguesFromBackend() {
    try {
      const response = await fetch('http://localhost:8000/api/dialogues');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          this.dialogues = data;
        }
      }
    } catch (e) {
      // Keep fallbacks silently
    }
  },

  // JavaScript Local morphological parser fallback
  offlineAnalyze(word) {
    const cleaned = word.toLowerCase().trim();
    
    // Quick mini-dictionary for common words in dialogues
    const localDict = {
      "labas": { lemma: "labas", translation: "olá / oi", case: "Nominativo (Kas?)", type: "expressão", gender: "N/A" },
      "rytas": { lemma: "rytas", translation: "manhã", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "vardas": { lemma: "vardas", translation: "nome", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "jonas": { lemma: "Jonas", translation: "Jonas (nome)", case: "Nominativo (Kas?)", type: "nome próprio", gender: "M" },
      "lietuvis": { lemma: "lietuvis", translation: "lituano (homem)", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "maria": { lemma: "Maria", translation: "Maria (nome)", case: "Nominativo (Kas?)", type: "nome próprio", gender: "F" },
      "brazilė": { lemma: "brazilė", translation: "brasileira (mulher)", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "lietuva": { lemma: "Lietuva", translation: "Lituânia", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "lietuvas": { lemma: "Lietuva", translation: "Lituânia (Acusativo?)", case: "Acusativo", type: "substantivo", gender: "F" },
      "kava": { lemma: "kava", translation: "café", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "duona": { lemma: "duona", translation: "pão", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "arbata": { lemma: "arbata", translation: "chá", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "pyragas": { lemma: "pyragas", translation: "bolo", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "laikas": { lemma: "laikas", translation: "tempo", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "vieta": { lemma: "vieta", translation: "lugar", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "miestas": { lemma: "miestas", translation: "cidade", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "darbas": { lemma: "darbas", translation: "trabalho", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "butas": { lemma: "butas", translation: "apartamento", case: "Nominativo (Kas?)", type: "substantivo", gender: "M" },
      "gražiame": { lemma: "gražus", translation: "bonito", case: "Locativo Masculino", type: "adjetivo", gender: "M" },
      
      // Additional Dialogue Words
      "mano": { lemma: "mano", translation: "meu / minha", case: "Genitivo", type: "pronome possessivo", gender: "N/A" },
      "aš": { lemma: "aš", translation: "eu", case: "Nominativo (Kas?)", type: "pronome pessoal", gender: "N/A" },
      "o": { lemma: "o", translation: "e / e quanto a", case: "N/A", type: "conjunção", gender: "N/A" },
      "tu": { lemma: "tu", translation: "tu / você", case: "Nominativo (Kas?)", type: "pronome pessoal", gender: "N/A" },
      "iš": { lemma: "iš", translation: "de / desde", case: "N/A", type: "preposição", gender: "N/A" },
      "brazilijos": { lemma: "Brazilija", translation: "Brasil", case: "Genitivo (Ko?)", type: "nome próprio", gender: "F" },
      "brazilija": { lemma: "Brazilija", translation: "Brasil", case: "Nominativo (Kas?)", type: "nome próprio", gender: "F" },
      "malonu": { lemma: "malonu", translation: "prazer / agradável", case: "N/A", type: "advérbio", gender: "N/A" },
      "susipažinti": { lemma: "susipažinti", translation: "conhecer", case: "Infinitivo", type: "verbo reflexivo", gender: "N/A" },
      "sveika": { lemma: "sveikas", translation: "bem-vinda / saudável", case: "Nominativo", type: "adjetivo", gender: "F" },
      "atvykusi": { lemma: "atvykti", translation: "chegada", case: "Particípio Ativo", type: "verbo", gender: "F" },
      "į": { lemma: "į", translation: "para / em direção a", case: "N/A", type: "preposição", gender: "N/A" },
      "ačiū": { lemma: "ačiū", translation: "obrigado", case: "N/A", type: "interjeição", gender: "N/A" },
      "man": { lemma: "aš", translation: "para mim", case: "Dativo (Kam?)", type: "pronome pessoal", gender: "N/A" },
      "irgi": { lemma: "irgi", translation: "também", case: "N/A", type: "advérbio", gender: "N/A" },
      "labai": { lemma: "labai", translation: "muito", case: "N/A", type: "advérbio", gender: "N/A" },
      "kur": { lemma: "kur", translation: "onde", case: "N/A", type: "advérbio interrogativo", gender: "N/A" },
      "dabar": { lemma: "dabar", translation: "agora", case: "N/A", type: "advérbio", gender: "N/A" },
      "vilnius": { lemma: "Vilnius", translation: "Vilnius (capital)", case: "Nominativo (Kas?)", type: "nome próprio", gender: "M" },
      "kaunas": { lemma: "Kaunas", translation: "Kaunas (cidade)", case: "Nominativo (Kas?)", type: "nome próprio", gender: "M" },
      "bet": { lemma: "bet", translation: "mas", case: "N/A", type: "conjunção", gender: "N/A" },
      "čia": { lemma: "čia", translation: "aqui", case: "N/A", type: "advérbio", gender: "N/A" },
      "gražus": { lemma: "gražus", translation: "bonito", case: "Nominativo (Kas?)", type: "adjetivo", gender: "M" },
      "laba": { lemma: "labas", translation: "boa", case: "Nominativo (Kas?)", type: "adjetivo", gender: "F" },
      "diena": { lemma: "diena", translation: "dia", case: "Nominativo (Kas?)", type: "substantivo", gender: "F" },
      "ką": { lemma: "kas", translation: "o que", case: "Acusativo (Ką?)", type: "pronome interrogativo", gender: "N/A" },
      "norite": { lemma: "norėti", translation: "querer", case: "Presente (2ª Plural)", type: "verbo", gender: "N/A" },
      "užsisakyti": { lemma: "užsisakyti", translation: "pedir / encomendar", case: "Infinitivo", type: "verbo reflexivo", gender: "N/A" },
      "ir": { lemma: "ir", translation: "e", case: "N/A", type: "conjunção", gender: "N/A" },
      "prašau": { lemma: "prašyti", translation: "por favor / eu peço", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" },
      "daug": { lemma: "daug", translation: "muito / muitos", case: "N/A", type: "advérbio", gender: "N/A" },
      "prašom": { lemma: "prašom", translation: "de nada / aqui está", case: "N/A", type: "interjeição", gender: "N/A" },
      "tuoj": { lemma: "tuoj", translation: "logo / imediatamente", case: "N/A", type: "advérbio", gender: "N/A" },
      "atnešiu": { lemma: "atnešti", translation: "trazer", case: "Futuro (1ª Sing)", type: "verbo", gender: "N/A" },
      
      // Verbs
      "esu": { lemma: "būti", translation: "ser / estar", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" },
      "esi": { lemma: "būti", translation: "ser / estar", case: "Presente (2ª Sing)", type: "verbo", gender: "N/A" },
      "yra": { lemma: "būti", translation: "ser / estar", case: "Presente (3ª Sing/Plur)", type: "verbo", gender: "N/A" },
      "gyvenu": { lemma: "gyventi", translation: "morar / viver", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" },
      "gyveni": { lemma: "gyventi", translation: "morar / viver", case: "Presente (2ª Sing)", type: "verbo", gender: "N/A" },
      "gyvena": { lemma: "gyventi", translation: "morar / viver", case: "Presente (3ª Sing/Plur)", type: "verbo", gender: "N/A" },
      "noriu": { lemma: "norėti", translation: "querer", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" },
      "nori": { lemma: "norėti", translation: "querer", case: "Presente (2ª/3ª Sing/Plur)", type: "verbo", gender: "N/A" },
      "dirbu": { lemma: "dirbti", translation: "trabalhar", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" },
      "neturiu": { lemma: "turėti", translation: "não ter (negação)", case: "Presente (1ª Sing)", type: "verbo", gender: "N/A" }
    };

    if (localDict[cleaned]) {
      return {
        word: word,
        ...localDict[cleaned]
      };
    }

    // Rules-based suffix-stripper in local JS (Genitive, Locative, Accusative)
    const suffixRules = [
      { suffix: "iuje", replace: "ius", c: "Locativo (Kur?)", g: "M" },
      { suffix: "yje", replace: "is", c: "Locativo (Kur?)", g: "M" },
      { suffix: "uje", replace: "us", c: "Locativo (Kur?)", g: "M" },
      { suffix: "oje", replace: "a", c: "Locativo (Kur?)", g: "F" },
      { suffix: "ėje", replace: "ė", c: "Locativo (Kur?)", g: "F" },
      { suffix: "e", replace: "as", c: "Locativo (Kur?)", g: "M" },
      
      { suffix: "iaus", replace: "us", c: "Genitivo (Ko?)", g: "M" },
      { suffix: "io", replace: "is", c: "Genitivo (Ko?)", g: "M" },
      { suffix: "o", replace: "as", c: "Genitivo (Ko?)", g: "M" },
      { suffix: "os", replace: "a", c: "Genitivo (Ko?)", g: "F" },
      { suffix: "ės", replace: "ė", c: "Genitivo (Ko?)", g: "F" },
      
      { suffix: "ą", replace: "a", c: "Acusativo (Ką?)", g: "F" },
      { suffix: "ą", replace: "as", c: "Acusativo (Ką?)", g: "M" },
      { suffix: "ę", replace: "ė", c: "Acusativo (Ką?)", g: "F" },
      { suffix: "į", replace: "is", c: "Acusativo (Ką?)", g: "M" },
      { suffix: "ų", replace: "us", c: "Acusativo (Ką?)", g: "M" }
    ];

    for (let rule of suffixRules) {
      if (cleaned.endsWith(rule.suffix)) {
        const stem = cleaned.slice(0, -rule.suffix.length);
        const lemmaCandidate = stem + rule.replace;
        
        // Check if candidate is in our dictionary list
        if (localDict[lemmaCandidate]) {
          return {
            word: word,
            lemma: lemmaCandidate,
            case: rule.c,
            gender: rule.g,
            translation: localDict[lemmaCandidate].translation,
            type: localDict[lemmaCandidate].type
          };
        }
      }
    }

    // Default Fallback
    return {
      word: word,
      lemma: word,
      case: "Nominativo ou Desconhecido",
      gender: "N/A",
      translation: "Palavra não cadastrada no dicionário offline",
      type: "N/A"
    };
  }
};
