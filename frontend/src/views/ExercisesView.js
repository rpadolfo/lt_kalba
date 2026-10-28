// Exercises View (Pratimai) supporting gap-fill and translation
import { db } from '../data/mockData.js';

export const ExercisesView = {
  currentExerciseIndex: 0,
  deck: [],
  userAnswered: false,
  isCorrectAnswer: false,
  userTypedValue: "",

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
        <div class="exercise-interactive" style="font-size: 1.25rem; justify-content: center; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span>${parts[0]}</span>
          <input type="text" class="gap-input" id="gap-field" 
            placeholder="..." autocomplete="off" 
            value="${this.userAnswered ? this.userTypedValue : ''}"
            ${this.userAnswered ? 'disabled' : ''} 
            style="width: 120px; text-align: center; border-bottom: 2px solid var(--primary); background: rgba(255,255,255,0.02); color: white; font-weight: 700; border-radius: 4px; padding: 6px 8px;"
          />
          <span>${parts[1] || ''}</span>
        </div>
      `;
    } else {
      // Translation style
      exerciseHtml = `
        <div class="exercise-interactive" style="font-size: 1.35rem; text-align: center; color: var(--text-secondary); margin-bottom: 1.25rem;">
          "${currentEx.sentence}"
        </div>
        <div class="exercise-input-block">
          <input type="text" class="text-input-field" id="translation-field" 
            placeholder="Digite a tradução em Lituano..." autocomplete="off"
            value="${this.userAnswered ? this.userTypedValue : ''}"
            ${this.userAnswered ? 'disabled' : ''}
            style="width: 100%; text-align: center; font-size: 1.1rem; padding: 10px;"
          />
        </div>
      `;
    }

    return `
      <div class="view exercises-view">
        <h1 class="view-title">Pratimai (Treino & Exercícios)</h1>
        <p class="view-subtitle">Fixe a escrita e regras de casos gramaticais.</p>

        <div class="exercise-container" style="max-width: 650px; margin: 0 auto;">
          <div class="srs-info-bar">
            <span>Módulo ${currentEx.module} • Nível A1/A2</span>
            <span class="srs-counter">Exercício ${this.currentExerciseIndex + 1} de ${this.deck.length}</span>
          </div>

          <div class="exercise-question-box">
            <p class="exercise-prompt">
              ${currentEx.prompt}
            </p>
            ${exerciseHtml}
            
            <p class="exercise-translation-hint">
              Tradução de apoio: "${currentEx.translation}"
            </p>
          </div>

          <!-- Feedback Panel (Immediately under question box) -->
          ${this.userAnswered ? `
            <div class="feedback-box ${this.isCorrectAnswer ? 'correct' : 'incorrect'}">
              <div class="feedback-header">
                <span>${this.isCorrectAnswer ? '🎉 Teisingai! (Correto)' : '❌ Neteisingai (Incorreto)'}</span>
                <span style="font-size: 0.9rem; font-weight: normal; opacity: 0.85;">+${this.isCorrectAnswer ? '20' : '5'} XP</span>
              </div>
              <p class="feedback-msg">
                Resposta correta: <code>${currentEx.gap}</code>
              </p>
              <div class="feedback-explanation">
                <b>Explicação pedagógica:</b> ${currentEx.explanation}
              </div>
            </div>
          ` : ''}

          <!-- Live Help Explanation -->
          <div id="quick-help-panel" style="display: none; background-color: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-color); padding: 1rem; border-radius: 10px; margin-top: 1rem; animation: fadeIn 0.3s;">
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.45; margin: 0;">
              💡 <b>Dica de Estudo:</b> ${currentEx.explanation}
            </p>
          </div>

          <!-- Actions Bar (Fixed on mobile directly above bottom nav) -->
          <div class="exercise-actions">
            ${this.userAnswered ? `
              <button class="action-btn action-btn-primary" id="btn-next-exercise" style="width: 100%;">Avançar ➡️</button>
            ` : `
              <button class="action-btn action-btn-secondary" id="btn-reveal-help">Explicação 💡</button>
              <button class="action-btn action-btn-primary" id="btn-verify-answer">Verificar ✓</button>
            `}
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

    // Help panel toggle
    if (btnHelp && helpPanel) {
      btnHelp.addEventListener('click', () => {
        helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
      });
    }

    // Checking the answer
    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        const currentEx = this.deck[this.currentExerciseIndex];
        let userAnswer = "";

        if (currentEx.type === "gap-fill" && gapField) {
          userAnswer = gapField.value.trim();
        } else if (transField) {
          userAnswer = transField.value.trim();
        }

        this.userTypedValue = userAnswer;
        this.userAnswered = true;

        // Clean answers to make evaluation smart: ignore punctuation, spaces
        const cleanStr = (str) => {
          return str.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"“”'„–—]/g, "")
            .replace(/\s+/g, "")
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
      const inputField = gapField || transField;
      if (inputField) {
        inputField.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            btnVerify.click();
          }
        });
        inputField.focus();
      }
    }

    // Moving to next exercise
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.userAnswered = false;
        this.isCorrectAnswer = false;
        this.userTypedValue = "";
        
        this.currentExerciseIndex = (this.currentExerciseIndex + 1) % this.deck.length;
        forceRenderCallback();
      });
    }
  }
};
