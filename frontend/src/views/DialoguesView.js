// Dialogues View (Pokalbiai) with Morphological Bottom Sheet & Interactive Roleplay
import { DIALOGUES_DATA } from '../data/dialoguesData.js';
import { SITUATIONAL_DIALOGUES } from '../data/module1Data.js';
import { morphologyService } from '../services/morphologyService.js';
import { db } from '../data/mockData.js';

export const DialoguesView = {
  activeDialogueId: null,
  roleplayStep: 1,
  roleplayHistory: [],
  roleplayFeedback: null,

  render() {
    let viewHtml = "";
    
    if (this.activeDialogueId === 'roleplay-1') {
      viewHtml = this.renderRoleplayPlayer(SITUATIONAL_DIALOGUES[0]);
    } else if (this.activeDialogueId !== null) {
      const dialogue = DIALOGUES_DATA.find(d => d.id === this.activeDialogueId);
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
          border-radius: var(--card-radius, 14px);
          padding: 1.25rem;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 190px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .dialogue-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary-base);
        }
        .dialogue-card.interactive-feature {
          border-left: 4px solid var(--primary);
        }
        .chat-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
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
          background: #111614;
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
          background-color: #111614;
          border: 1px solid var(--border-color);
          padding: 0.85rem 1.15rem;
          border-radius: 14px;
          border-top-left-radius: 2px;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.5;
        }
        .chat-bubble-row.user-side .bubble-text {
          background: #1f2b23;
          border-color: rgba(245, 158, 11, 0.35);
          border-radius: 14px;
          border-top-right-radius: 2px;
        }
        .clickable-word {
          cursor: pointer;
          border-bottom: 1.5px dashed rgba(245, 158, 11, 0.7);
          display: inline-block;
          transition: var(--transition-fast);
          padding: 0 1px;
        }
        .clickable-word:hover, .clickable-word:active {
          color: var(--primary-hover);
          background-color: rgba(245, 158, 11, 0.18);
          border-radius: 3px;
        }

        /* Roleplay Interactive Choices */
        .roleplay-choice-btn {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-bottom: 3px solid #111614;
          border-radius: 10px;
          padding: 0.9rem 1.15rem;
          text-align: left;
          cursor: pointer;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease;
        }
        .roleplay-choice-btn:hover {
          border-color: var(--primary-base);
          background: #212c25;
        }
        .roleplay-choice-btn:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
        }
      </style>

      <div class="view dialogues-view" style="padding-bottom: 3rem;">
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
    const roleplay = SITUATIONAL_DIALOGUES[0];

    return `
      <h1 class="view-title">Pokalbiai (Diálogos Contextuais)</h1>
      <p class="view-subtitle">Pratique conversação real para a prova oral da Categoria I. Toque em qualquer palavra para abrir a análise gramatical.</p>
      
      <!-- Featured Interactive Roleplay Dialogue from Module 1 -->
      <div style="margin-top: 1.5rem; margin-bottom: 2rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-hover); text-transform: uppercase; margin-bottom: 0.5rem;">
          ⭐ Simulação Prática do Módulo 1 (Interativo)
        </div>
        <div class="dialogue-card interactive-feature" style="padding: 1.5rem;">
          <div>
            <span class="module-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--primary-hover); border-color: rgba(245, 158, 11, 0.3);">
              Módulo 1 • Roleplay
            </span>
            <h2 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--text-primary); margin-top: 0.5rem; margin-bottom: 0.35rem;">
              ${roleplay.title}
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.45; margin-bottom: 1.25rem;">
              ${roleplay.context}
            </p>
          </div>
          <button class="btn btn-primary play-roleplay-btn" data-roleplay-id="${roleplay.id}" style="align-self: flex-start; padding: 0.85rem 1.5rem;">
            Iniciar Simulação Interativa 💬
          </button>
        </div>
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
        📖 Diálogos de Leitura com Toque Morfológico
      </div>
      <div class="dialogues-grid">
        ${DIALOGUES_DATA.map(d => `
          <div class="dialogue-card">
            <div>
              <span class="module-badge">Módulo ${d.module}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--text-primary); margin-top: 0.5rem; margin-bottom: 0.5rem;">${d.title}</h3>
              <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.4;">${d.description}</p>
            </div>
            <button class="btn btn-secondary play-dialogue-btn" data-dial-id="${d.id}" style="margin-top: 1.25rem; width: 100%;">
              Iniciar Leitura 📖
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderRoleplayPlayer(roleplay) {
    const currentStepObj = roleplay.steps.find(s => s.step === this.roleplayStep);
    const isCompleted = !currentStepObj;

    return `
      <div style="max-width: 720px; margin: 0 auto;">
        <button class="btn btn-secondary" id="back-to-dialogues" style="margin-bottom: 1rem; padding: 8px 16px;">
          ⬅️ Voltar aos Diálogos
        </button>

        <div class="chat-container">
          <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="module-badge" style="background: rgba(245, 158, 11, 0.15); color: var(--primary-hover); border-color: rgba(245, 158, 11, 0.3);">
              Simulação de Conversa • Etapa ${this.roleplayStep} de ${roleplay.steps.length}
            </span>
            <h2 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--text-primary); margin-top: 0.35rem;">
              ${roleplay.title}
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.25rem;">
              ${roleplay.context}
            </p>
          </div>

          <!-- History of turns -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${this.roleplayHistory.map(turn => `
              <div class="chat-bubble-row ${turn.isUser ? 'user-side' : ''}">
                <div class="speaker-avatar">${turn.avatar}</div>
                <div class="bubble-content">
                  <span class="speaker-name">${turn.speaker}</span>
                  <div class="bubble-text">
                    ${this.makeTextClickable(turn.text)}
                  </div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">"${turn.translation}"</span>
                </div>
              </div>
            `).join('')}

            ${!isCompleted ? `
              <!-- Partner current turn -->
              <div class="chat-bubble-row">
                <div class="speaker-avatar">${roleplay.avatarPartner}</div>
                <div class="bubble-content">
                  <span class="speaker-name">${roleplay.partnerName}</span>
                  <div class="bubble-text">
                    ${this.makeTextClickable(currentStepObj.partnerSpeech)}
                  </div>
                  <span style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">
                    "${currentStepObj.partnerTranslation}"
                  </span>
                </div>
              </div>
            ` : `
              <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--success); border-radius: 12px; padding: 1.5rem; text-align: center; margin-top: 1rem;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎉</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--text-primary); margin-bottom: 0.35rem;">
                  Simulação Concluída com Sucesso!
                </h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.25rem;">
                  Você respondeu com precisão e aplicou o verbo būti, o locativo e a partícula 'Ar'. Ganhou <b>+35 XP</b>!
                </p>
                <button class="btn btn-primary" id="btn-restart-roleplay">
                  Jogar Novamente 🔄
                </button>
              </div>
            `}
          </div>

          <!-- Options choices for current step -->
          ${!isCompleted ? `
            <div style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-hover); margin-bottom: 0.75rem;">
                💬 Escolha a resposta mais adequada em lituano:
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${currentStepObj.options.map((opt, optIdx) => `
                  <button class="roleplay-choice-btn" data-choice-idx="${optIdx}">
                    <div style="font-weight: 700; margin-bottom: 0.2rem;">${opt.text}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); font-style: italic;">"${opt.translation}"</div>
                  </button>
                `).join('')}
              </div>

              ${this.roleplayFeedback ? `
                <div style="margin-top: 1rem; padding: 0.85rem 1rem; border-radius: 8px; background: rgba(234, 88, 12, 0.15); border: 1px solid var(--accent); color: white; font-size: 0.88rem;">
                  ⚠️ ${this.roleplayFeedback}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  renderDialoguePlayer(dialogue) {
    return `
      <div style="max-width: 720px; margin: 0 auto;">
        <button class="btn btn-secondary" id="back-to-dialogues" style="margin-bottom: 1rem; padding: 8px 16px;">
          ⬅️ Voltar aos Diálogos
        </button>

        <div class="chat-container">
          <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <span class="module-badge">Módulo ${dialogue.module}</span>
            <h2 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-primary); margin-top: 0.25rem;">
              ${dialogue.title}
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.25rem;">
              Toque em qualquer palavra sublinhada para abrir a gaveta de tradução.
            </p>
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
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">"${line.translation}"</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  makeTextClickable(text) {
    return text.split(' ').map(rawWord => {
      const cleanWord = rawWord.replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+/, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—\s]+$/, '').trim();
      if (cleanWord.length > 0) {
        return `<span class="clickable-word" data-word="${cleanWord}">${rawWord}</span>`;
      }
      return rawWord;
    }).join(' ');
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Back button trigger
    const backBtn = document.getElementById('back-to-dialogues');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activeDialogueId = null;
        this.roleplayStep = 1;
        this.roleplayHistory = [];
        this.roleplayFeedback = null;
        forceRenderCallback();
      });
    }

    // 2. Play classical dialogue triggers
    document.querySelectorAll('.play-dialogue-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeDialogueId = btn.dataset.dialId;
        forceRenderCallback();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 3. Play interactive roleplay trigger
    document.querySelectorAll('.play-roleplay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeDialogueId = 'roleplay-1';
        this.roleplayStep = 1;
        this.roleplayHistory = [];
        this.roleplayFeedback = null;
        forceRenderCallback();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 4. Roleplay restart button
    const restartBtn = document.getElementById('btn-restart-roleplay');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.roleplayStep = 1;
        this.roleplayHistory = [];
        this.roleplayFeedback = null;
        forceRenderCallback();
      });
    }

    // 5. Roleplay choice selection
    document.querySelectorAll('[data-choice-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const choiceIdx = parseInt(btn.dataset.choiceIdx);
        const roleplay = SITUATIONAL_DIALOGUES[0];
        const currentStepObj = roleplay.steps.find(s => s.step === this.roleplayStep);
        if (!currentStepObj) return;

        const choice = currentStepObj.options[choiceIdx];
        if (choice.isCorrect) {
          // Push partner turn and user turn into history
          this.roleplayHistory.push({
            speaker: roleplay.partnerName,
            avatar: roleplay.avatarPartner,
            text: currentStepObj.partnerSpeech,
            translation: currentStepObj.partnerTranslation,
            isUser: false
          });
          this.roleplayHistory.push({
            speaker: "Você (Maria)",
            avatar: "👩",
            text: choice.text,
            translation: choice.translation,
            isUser: true
          });

          this.roleplayFeedback = null;
          this.roleplayStep += 1;
          db.addXP(15);
          forceRenderCallback();
        } else {
          this.roleplayFeedback = choice.feedback;
          forceRenderCallback();
        }
      });
    });

    // 6. Morphological Bottom Sheet Drawer logic
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

    // Bind clickable word analysis
    document.querySelectorAll('.clickable-word').forEach(wordSpan => {
      wordSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        const result = morphologyService.analyzeWord(word);
        
        const wordEl = document.getElementById('sheet-word');
        const caseEl = document.getElementById('sheet-case');
        const lemmaEl = document.getElementById('sheet-lemma');
        const typeEl = document.getElementById('sheet-type');
        const transEl = document.getElementById('sheet-translation');

        if (wordEl) wordEl.textContent = result.word;
        if (lemmaEl) lemmaEl.textContent = result.lemma;
        
        if (caseEl) {
          const isNominative = result.case.includes("Nominativo") || result.case.includes("Infinitivo");
          const badgeColor = isNominative ? "rgba(245, 158, 11, 0.18)" : "rgba(16, 185, 129, 0.18)";
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
        
        if (bottomSheet && backdrop) {
          bottomSheet.classList.add('open');
          backdrop.classList.add('open');
          bottomSheet.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }
};
