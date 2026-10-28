// Dialogues View (Pokalbiai) with Suffix-Stripping Morphological Tooltip
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
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
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
      wordSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        
        // Position tooltip near element
        const rect = wordSpan.getBoundingClientRect();
        const tooltipX = Math.max(10, Math.min(window.innerWidth - 300, rect.left + window.scrollX));
        const tooltipY = rect.bottom + window.scrollY + 8;
        
        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
        tooltip.style.display = 'block';
        
        // Immediate client-side offline analysis
        const result = morphologyService.analyzeWord(word);
        this.populateTooltip(result);
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
  }
};
