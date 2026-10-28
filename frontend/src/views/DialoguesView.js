// Dialogues View (Pokalbiai) with Morphological Bottom Sheet (Mobile-First)
import { DIALOGUES_DATA } from '../data/dialoguesData.js';
import { morphologyService } from '../services/morphologyService.js';

export const DialoguesView = {
  dialogues: DIALOGUES_DATA,
  activeDialogueId: null,

  render() {
    let viewHtml = "";
    
    if (this.activeDialogueId !== null) {
      const dialogue = this.dialogues.find(d => d.id === this.activeDialogueId) || DIALOGUES_DATA.find(d => d.id === this.activeDialogueId);
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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        .dialogue-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 190px;
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
          padding: 1.5rem;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-premium);
        }
        .chat-bubble-row {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          width: 100%;
        }
        .chat-bubble-row.user-side {
          flex-direction: row-reverse;
        }
        .speaker-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .bubble-content {
          max-width: 82%;
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
          padding: 0.85rem 1.15rem;
          border-radius: 18px;
          border-top-left-radius: 2px;
          color: white;
          font-size: 1rem;
          line-height: 1.5;
        }
        .chat-bubble-row.user-side .bubble-text {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.06));
          border-color: rgba(139, 92, 246, 0.3);
          border-radius: 18px;
          border-top-right-radius: 2px;
        }
        .clickable-word {
          cursor: pointer;
          border-bottom: 1.5px dashed rgba(139, 92, 246, 0.6);
          display: inline-block;
          transition: var(--transition-fast);
          padding: 0 1px;
        }
        .clickable-word:hover, .clickable-word:active {
          color: var(--primary-hover);
          background-color: rgba(139, 92, 246, 0.15);
          border-radius: 3px;
        }
      </style>

      <div class="view dialogues-view">
        ${viewHtml}
      </div>

      <!-- Backdrop for Bottom Sheet -->
      <div id="dialogue-sheet-backdrop" class="bottom-sheet-backdrop"></div>

      <!-- Morphological Bottom Sheet Drawer -->
      <div id="dialogue-bottom-sheet" class="bottom-sheet" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="bottom-sheet-handle"></div>
        <div class="bottom-sheet-header">
          <div class="bottom-sheet-title-group">
            <span class="bottom-sheet-word" id="sheet-word">Žodis</span>
            <span class="bottom-sheet-badge" id="sheet-case">Nominativo</span>
          </div>
          <button class="bottom-sheet-close-btn" id="sheet-close-btn" aria-label="Fechar gaveta">✕</button>
        </div>
        
        <div class="bottom-sheet-content">
          <div class="sheet-info-grid">
            <div class="sheet-info-card">
              <span class="sheet-label">Lema (Dicionário)</span>
              <span class="sheet-val" id="sheet-lemma">-</span>
            </div>
            <div class="sheet-info-card">
              <span class="sheet-label">Classe / Gênero</span>
              <span class="sheet-val" id="sheet-type">-</span>
            </div>
            <div class="sheet-info-card sheet-translation-card">
              <span class="sheet-label">Tradução em Português</span>
              <span class="sheet-val sheet-translation" id="sheet-translation">-</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderDialoguesList() {
    return `
      <h1 class="view-title">Pokalbiai (Diálogos Contextuais)</h1>
      <p class="view-subtitle">Leia os diálogos adaptados da obra <i>Mano ir tavo šalis Lietuva</i>. Toque nas palavras em lituano para ver a análise gramatical.</p>
      
      <div class="dialogues-grid">
        ${this.dialogues.map(d => `
          <div class="dialogue-card">
            <div>
              <span class="module-badge">Módulo ${d.module}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: white; margin-top: 0.5rem; margin-bottom: 0.5rem;">${d.title}</h3>
              <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.4;">${d.description}</p>
            </div>
            <button class="action-btn action-btn-primary play-dialogue-btn" data-dial-id="${d.id}" style="margin-top: 1.25rem; text-align: center; width: 100%;">
              Iniciar Leitura 💬
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderDialoguePlayer(dialogue) {
    return `
      <button class="action-btn action-btn-secondary" id="back-to-dialogues" style="margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; padding: 8px 16px;">
        ⬅️ Voltar aos Diálogos
      </button>

      <div class="chat-container">
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <span class="module-badge">Módulo ${dialogue.module}</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.4rem; color: white; margin-top: 0.25rem;">${dialogue.title}</h2>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.25rem;">Toque em qualquer palavra sublinhada para abrir a gaveta de tradução.</p>
        </div>

        <!-- Dialogue bubbles list -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${dialogue.conversation.map((line) => {
            const isUserSide = (line.speaker === "Maria");
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
    return text.split(' ').map(rawWord => {
      const cleanWord = rawWord.replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+/, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+$/, '').trim();
      if (cleanWord.length === 0) return rawWord;
      
      const startPunc = rawWord.match(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—]+/);
      const endPunc = rawWord.match(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—]+$/);
      
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

    // 3. Bottom Sheet Interactivity
    const bottomSheet = document.getElementById('dialogue-bottom-sheet');
    const backdrop = document.getElementById('dialogue-sheet-backdrop');
    const closeBtn = document.getElementById('sheet-close-btn');

    const closeSheet = () => {
      if (bottomSheet && backdrop) {
        bottomSheet.classList.remove('open');
        backdrop.classList.remove('open');
        bottomSheet.setAttribute('aria-hidden', 'true');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeSheet);
    if (backdrop) backdrop.addEventListener('click', closeSheet);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSheet();
    });

    // 4. Clickable word trigger
    const clickableWords = document.querySelectorAll('.clickable-word');
    clickableWords.forEach(wordSpan => {
      wordSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        const result = morphologyService.analyzeWord(word);
        
        this.populateBottomSheet(result);
        
        if (bottomSheet && backdrop) {
          bottomSheet.classList.add('open');
          backdrop.classList.add('open');
          bottomSheet.setAttribute('aria-hidden', 'false');
        }
      });
    });
  },

  populateBottomSheet(result) {
    const wordEl = document.getElementById('sheet-word');
    const caseEl = document.getElementById('sheet-case');
    const lemmaEl = document.getElementById('sheet-lemma');
    const typeEl = document.getElementById('sheet-type');
    const transEl = document.getElementById('sheet-translation');

    if (wordEl) wordEl.textContent = result.word;
    if (lemmaEl) lemmaEl.textContent = result.lemma;
    
    if (caseEl) {
      const isNominative = result.case.includes("Nominativo") || result.case.includes("Infinitivo");
      const badgeColor = isNominative ? "rgba(139, 92, 246, 0.2)" : "rgba(16, 185, 129, 0.2)";
      const textColor = isNominative ? "var(--primary-hover)" : "var(--success)";
      
      caseEl.textContent = result.case;
      caseEl.style.backgroundColor = badgeColor;
      caseEl.style.color = textColor;
    }
    
    if (typeEl) {
      typeEl.textContent = `${result.type} ${result.gender !== 'N/A' ? '(' + result.gender + ')' : ''}`;
    }
    if (transEl) {
      transEl.textContent = result.translation;
    }
  }
};
