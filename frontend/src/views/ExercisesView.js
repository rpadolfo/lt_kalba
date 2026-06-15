// Exercises View (Pratimai) supporting gap-fill, translation, and spelling (Paraidžiui)
import { db } from '../data/mockData.js';

export const ExercisesView = {
  currentExerciseIndex: 0,
  deck: [],
  userAnswered: false,
  isCorrectAnswer: false,
  userTypedValue: "",
  selectedSpellingTiles: [], // Stores selected tiles for spelling exercises

  render() {
    this.deck = db.getExercises();

    if (this.deck.length === 0) {
      return `
        <div class="view exercises-view">
          <h1 class="view-title">Pratimai (Exercícios)</h1>
          <p class="view-subtitle">Pratique e fixe declinações, verbos e vocabulário.</p>
          
          <div style="background-color: var(--bg-card); padding: 3rem; border-radius: 16px; border: 1px solid var(--border-color); text-align: center; max-width: 600px; margin: 0 auto;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: white; margin-bottom: 0.5rem;">Nenhum exercício disponível</h3>
            <p style="color: var(--text-secondary);">
              Não há exercícios cadastrados no banco de dados local.
            </p>
          </div>
        </div>
      `;
    }

    if (this.currentExerciseIndex >= this.deck.length) {
      this.currentExerciseIndex = 0;
    }

    const currentEx = this.deck[this.currentExerciseIndex];
    let exerciseHtml = "";

    if (currentEx.type === "gap-fill") {
      const parts = currentEx.sentence.split("[gap]");
      exerciseHtml = `
        <div class="exercise-interactive" style="font-size: 1.35rem; justify-content: center; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span>${parts[0]}</span>
          <input type="text" class="gap-input" id="gap-field" 
            placeholder="..." autocomplete="off" 
            value="${this.userAnswered ? this.userTypedValue : ''}"
            ${this.userAnswered ? 'disabled' : ''} 
            style="width: 120px; text-align: center; border-bottom: 2px solid var(--primary); background: rgba(255,255,255,0.02); color: white; font-weight: 700; border-radius: 4px; padding: 4px 8px;"
          />
          <span>${parts[1] || ''}</span>
        </div>
      `;
    } else if (currentEx.type === "spelling") {
      // Spelling (Paraidžiui) layout
      const letterNames = currentEx.gap.split(',').map(s => s.trim());
      
      // Let's generate a scrambled set of tiles containing correct letter names and some distractor letters
      // To make it easy, we just supply the correct letter names of this word scrambled so the user can build the spelling
      const scrambledTiles = [...letterNames].sort(() => Math.random() - 0.5);

      exerciseHtml = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 0.25rem;">Soletrando a palavra:</div>
          <div style="font-size: 2.25rem; font-weight: 800; color: white; letter-spacing: 4px; font-family: var(--font-heading); margin-bottom: 1.5rem;">
            ${currentEx.sentence}
          </div>
          
          <div class="exercise-input-block" style="margin-bottom: 1rem;">
            <input type="text" class="text-input-field" id="spelling-field" 
              placeholder="Clique nas peças abaixo ou digite os nomes separados por vírgula..." autocomplete="off"
              value="${this.userAnswered ? this.userTypedValue : this.selectedSpellingTiles.join(', ')}"
              ${this.userAnswered ? 'disabled' : ''}
              style="width: 100%; text-align: center;"
            />
          </div>

          <!-- Interactive Clickable Tiles (Only when not answered) -->
          ${!this.userAnswered ? `
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Peças de Apoio (Clique para adicionar):</div>
              <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-top: 0.25rem;">
                ${scrambledTiles.map((tileName, idx) => `
                  <button class="spelling-tile-btn" data-tile-value="${tileName}" style="background-color: var(--bg-body); border: 1px solid var(--border-color); color: var(--primary-hover); font-weight: 600; padding: 6px 12px; border-radius: 8px; cursor: pointer; transition: var(--transition-fast);">
                    ${tileName}
                  </button>
                `).join('')}
                <button id="btn-clear-spelling" style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--danger); font-weight: 600; padding: 6px 12px; border-radius: 8px; cursor: pointer;">
                  Limpar ⌫
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      // Translation style
      exerciseHtml = `
        <div class="exercise-interactive" style="font-size: 1.5rem; text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem;">
          "${currentEx.sentence}"
        </div>
        <div class="exercise-input-block">
          <input type="text" class="text-input-field" id="translation-field" 
            placeholder="Digite a tradução em Lituano..." autocomplete="off"
            value="${this.userAnswered ? this.userTypedValue : ''}"
            ${this.userAnswered ? 'disabled' : ''}
            style="width: 100%;"
          />
        </div>
      `;
    }

    return `
      <style>
        .spelling-tile-btn:hover {
          background-color: var(--primary-glow) !important;
          border-color: var(--primary) !important;
          transform: scale(1.05);
        }
        .spelling-tile-btn:active {
          transform: scale(0.95);
        }
      </style>

      <div class="view exercises-view">
        <h1 class="view-title">Pratimai (Exercícios)</h1>
        <p class="view-subtitle">Fixe a escrita, soletragem e regras de casos gramaticais.</p>

        <div class="exercise-container" style="max-width: 650px; margin: 0 auto;">
          <div class="srs-info-bar">
            <span>Módulo ${currentEx.module} • Nível A1/A2</span>
            <span class="srs-counter">Exercício ${this.currentExerciseIndex + 1} de ${this.deck.length}</span>
          </div>

          <div class="exercise-question-box" style="padding: 2.5rem; background-color: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-premium);">
            <p class="exercise-prompt" style="font-size: 1.1rem; color: white; margin-bottom: 1.5rem; text-align: center; font-weight: 500;">
              ${currentEx.prompt}
            </p>
            ${exerciseHtml}
            
            ${currentEx.type !== "spelling" ? `
              <p style="font-size: 0.95rem; color: var(--text-muted); font-style: italic; text-align: center; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 1rem;">
                Tradução de apoio: "${currentEx.translation}"
              </p>
            ` : ''}
          </div>

          <!-- Actions -->
          <div class="exercise-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
            ${this.userAnswered ? `
              <button class="action-btn action-btn-primary" id="btn-next-exercise" style="padding: 10px 24px;">Avançar ➡️</button>
            ` : `
              <button class="action-btn action-btn-secondary" id="btn-reveal-help" style="padding: 10px 20px;">Explicação 💡</button>
              <button class="action-btn action-btn-primary" id="btn-verify-answer" style="padding: 10px 24px;">Verificar ✓</button>
            `}
          </div>

          <!-- Feedback Panel -->
          ${this.userAnswered ? `
            <div class="feedback-box ${this.isCorrectAnswer ? 'correct' : 'incorrect'}" style="margin-top: 1.5rem; padding: 1.5rem; border-radius: 12px; border: 1px solid;">
              <div class="feedback-header" style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                <span>${this.isCorrectAnswer ? '🎉 Teisingai! (Correto)' : '❌ Neteisingai (Incorreto)'}</span>
                <span style="font-size: 0.9rem; font-weight: normal; opacity: 0.85;">+${this.isCorrectAnswer ? '20' : '5'} XP</span>
              </div>
              <p class="feedback-msg" style="margin-bottom: 0.75rem; font-size: 1rem;">
                Resposta correta: <code style="background-color: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); color: white; font-weight: bold;">${currentEx.gap}</code>
              </p>
              <div class="feedback-explanation" style="font-size: 0.9rem; line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.75rem; opacity: 0.9;">
                <b>Explicação pedagógica:</b> ${currentEx.explanation}
              </div>
            </div>
          ` : ''}

          <!-- Live Help Explanation -->
          <div id="quick-help-panel" style="display: none; background-color: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-color); padding: 1.25rem; border-radius: 10px; margin-top: 1.5rem; animation: fadeIn 0.3s;">
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.45; margin: 0;">
              💡 <b>Dica de Estudo:</b> ${currentEx.explanation}
            </p>
          </div>
        </div>
      </div>
    `;
  },

  setup(navigateCallback, forceRenderCallback) {
    if (this.deck.length === 0) return;

    const btnVerify = document.getElementById('btn-verify-answer');
    const btnNext = document.getElementById('btn-next-exercise');
    const btnHelp = document.getElementById('btn-reveal-help');
    const helpPanel = document.getElementById('quick-help-panel');
    
    const gapField = document.getElementById('gap-field');
    const transField = document.getElementById('translation-field');
    const spellingField = document.getElementById('spelling-field');

    // Help panel toggle
    if (btnHelp && helpPanel) {
      btnHelp.addEventListener('click', () => {
        helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
      });
    }

    // Spelling tile click handlers
    document.querySelectorAll('.spelling-tile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.tileValue;
        this.selectedSpellingTiles.push(val);
        
        if (spellingField) {
          spellingField.value = this.selectedSpellingTiles.join(', ');
        }
      });
    });

    const clearSpellingBtn = document.getElementById('btn-clear-spelling');
    if (clearSpellingBtn) {
      clearSpellingBtn.addEventListener('click', () => {
        this.selectedSpellingTiles = [];
        if (spellingField) {
          spellingField.value = "";
        }
      });
    }

    // Checking the answer
    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        const currentEx = this.deck[this.currentExerciseIndex];
        let userAnswer = "";

        if (currentEx.type === "gap-fill" && gapField) {
          userAnswer = gapField.value.trim();
        } else if (currentEx.type === "spelling" && spellingField) {
          userAnswer = spellingField.value.trim();
        } else if (transField) {
          userAnswer = transField.value.trim();
        }

        this.userTypedValue = userAnswer;
        this.userAnswered = true;

        // Clean answers to make evaluation smart: ignore punctuation, spaces, double spaces
        const cleanStr = (str) => {
          return str.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”]/g, "") // remove punctuation
            .replace(/\s+/g, "") // remove all spaces
            .trim();
        };

        const targetAnswer = cleanStr(currentEx.gap);
        const cleanedUserAnswer = cleanStr(userAnswer);

        this.isCorrectAnswer = (cleanedUserAnswer === targetAnswer);

        // Update progress & give XP
        if (this.isCorrectAnswer) {
          db.addXP(20);
        } else {
          db.addXP(5); // Consolation XP for effort
        }

        // Rerender view to show feedback panel
        forceRenderCallback();
      });

      // Allow pressing 'Enter' in text fields to verify
      const inputField = gapField || transField || spellingField;
      if (inputField) {
        inputField.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            btnVerify.click();
          }
        });
        // Auto focus input
        inputField.focus();
      }
    }

    // Moving to next exercise
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.userAnswered = false;
        this.isCorrectAnswer = false;
        this.userTypedValue = "";
        this.selectedSpellingTiles = [];
        
        this.currentExerciseIndex = (this.currentExerciseIndex + 1) % this.deck.length;
        forceRenderCallback();
      });
    }
  }
};
