// Active Learning Hub (Pratimai) - Module 1 Curriculum
// Replacing legacy flashcards with 3 tactile active mechanics
import { db } from '../data/mockData.js';
import { 
  GENDER_SORTING_EXERCISES, 
  CASE_SNAPPING_EXERCISES, 
  SENTENCE_BUILDER_EXERCISES 
} from '../data/module1Data.js';

export const ExercisesView = {
  activeMode: 'gender-sorting', // 'gender-sorting', 'case-snapping', 'sentence-builder'
  
  // State for Gender Sorting
  genderIndex: 0,
  genderAnswered: false,
  genderSelected: null,
  genderIsCorrect: false,

  // State for Case Snapping
  caseIndex: 0,
  caseAnswered: false,
  caseSelected: null,
  caseIsCorrect: false,

  // State for Sentence Builder
  builderIndex: 0,
  builderAnswered: false,
  builderIsCorrect: false,
  selectedTokens: [],
  availableTokens: [],

  render(options) {
    if (options && options.mode) {
      this.activeMode = options.mode;
    }

    let mechanicHtml = "";
    if (this.activeMode === 'gender-sorting') {
      mechanicHtml = this.renderGenderSorting();
    } else if (this.activeMode === 'case-snapping') {
      mechanicHtml = this.renderCaseSnapping();
    } else {
      mechanicHtml = this.renderSentenceBuilder();
    }

    return `
      <style>
        .exercises-hub-header {
          margin-bottom: 1.5rem;
        }
        .mechanic-nav-tabs {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .mechanic-nav-tabs::-webkit-scrollbar {
          display: none;
        }
        .mechanic-tab-btn {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-bottom: 3px solid #141c17;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all 0.1s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .mechanic-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary-base);
        }
        .mechanic-tab-btn.active {
          color: #111614;
          background-color: var(--primary);
          border-color: var(--primary);
          border-bottom: 3px solid var(--primary-active);
        }
        .mechanic-tab-btn:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
        }

        .exercise-stage-container {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 2rem;
          max-width: 680px;
          margin: 0 auto;
          box-shadow: var(--shadow-premium);
          position: relative;
        }
        @media (max-width: 600px) {
          .exercise-stage-container {
            padding: 1.25rem;
          }
        }
        .stage-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .stage-counter-badge {
          background: rgba(255, 255, 255, 0.04);
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        /* 1. Gender Sorting Styles */
        .gender-focus-card {
          text-align: center;
          padding: 1.5rem 1rem;
          background: #111614;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-bottom: 1.75rem;
        }
        .gender-word-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }
        .gender-word-translation {
          font-size: 1.1rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        .gender-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 500px) {
          .gender-buttons-grid {
            grid-template-columns: 1fr;
          }
        }
        .gender-pick-btn {
          padding: 1.15rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease, background-color 0.15s ease;
          user-select: none;
        }
        .gender-btn-m {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid var(--primary);
          border-bottom: 4px solid var(--primary-active);
          color: var(--primary-hover);
        }
        .gender-btn-m:hover {
          background: rgba(245, 158, 11, 0.22);
        }
        .gender-btn-m:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }
        .gender-btn-f {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid var(--secondary);
          border-bottom: 4px solid var(--secondary-base);
          color: var(--secondary-hover);
        }
        .gender-btn-f:hover {
          background: rgba(16, 185, 129, 0.22);
        }
        .gender-btn-f:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }
        .gender-btn-sub {
          font-size: 0.75rem;
          font-weight: 400;
          opacity: 0.85;
        }

        /* 2. Case Snapping Styles */
        .snapping-phrase-card {
          background: #111614;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.75rem 1.25rem;
          margin-bottom: 1.75rem;
          text-align: center;
        }
        .snapping-phrase {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 0.6rem;
        }
        .snap-slot {
          color: var(--primary-hover);
          border-bottom: 3px dashed var(--primary);
          padding: 0 6px;
        }
        .snap-slot.filled {
          border-bottom-style: solid;
        }
        .snapping-base-hint {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }
        .snapping-full-translation {
          font-size: 1rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        .snapping-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 500px) {
          .snapping-options-grid {
            grid-template-columns: 1fr;
          }
        }
        .snap-option-btn {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-bottom: 4px solid #111614;
          border-radius: 12px;
          padding: 1rem;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease, background-color 0.15s ease;
          user-select: none;
        }
        .snap-option-btn:hover {
          border-color: var(--primary-base);
          background: #212c25;
        }
        .snap-option-btn:active {
          transform: translateY(2px);
          border-bottom-width: 2px;
        }

        /* 3. Sentence Builder Styles */
        .builder-prompt-card {
          background: #111614;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .builder-target-pt {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--primary-hover);
          margin-top: 0.35rem;
        }
        .construction-zone {
          min-height: 70px;
          background: rgba(0, 0, 0, 0.25);
          border: 2px dashed var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
          margin-bottom: 1.5rem;
          transition: border-color 0.2s ease;
        }
        .construction-zone.has-items {
          border-style: solid;
          border-color: var(--primary-base);
        }
        .construction-empty-hint {
          width: 100%;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .word-token-chip {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-bottom: 3px solid #111614;
          color: var(--text-primary);
          padding: 8px 14px;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          user-select: none;
          transition: transform 0.08s ease, border-bottom-width 0.08s ease;
        }
        .word-token-chip:hover {
          border-color: var(--primary-base);
          background: #212c25;
        }
        .word-token-chip:active {
          transform: translateY(2px);
          border-bottom-width: 1px;
        }
        .word-token-chip.in-construction {
          background: var(--primary);
          color: #111614;
          border-color: var(--primary);
          border-bottom-color: var(--primary-active);
        }
        .tokens-bank {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: center;
          margin-bottom: 1.75rem;
          min-height: 50px;
        }

        /* Generic Feedback Banner */
        .mechanic-feedback-box {
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          animation: fadeIn 0.25s ease;
        }
        .mechanic-feedback-box.correct {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid var(--success);
          color: white;
        }
        .mechanic-feedback-box.incorrect {
          background: rgba(234, 88, 12, 0.15);
          border: 1px solid var(--accent);
          color: white;
        }
        .feedback-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .feedback-desc-text {
          font-size: 0.9rem;
          line-height: 1.45;
          opacity: 0.95;
        }
      </style>

      <div class="view exercises-view" style="padding-bottom: 4rem;">
        <div class="exercises-hub-header">
          <h1 class="view-title">Hub de Treino Ativo (Módulo 1)</h1>
          <p class="view-subtitle">Mecânicas práticas sem flashcards. Treine gênero, o caso locativo e sintaxe de frases.</p>
        </div>

        <!-- 3 Active Mechanics Tabs -->
        <div class="mechanic-nav-tabs">
          <button class="mechanic-tab-btn ${this.activeMode === 'gender-sorting' ? 'active' : ''}" data-mode="gender-sorting">
            <span>👨/👩</span> <span>Gênero M vs F</span>
          </button>
          <button class="mechanic-tab-btn ${this.activeMode === 'case-snapping' ? 'active' : ''}" data-mode="case-snapping">
            <span>📍</span> <span>Encaixe de Caso (Kur?)</span>
          </button>
          <button class="mechanic-tab-btn ${this.activeMode === 'sentence-builder' ? 'active' : ''}" data-mode="sentence-builder">
            <span>🧱</span> <span>Montador de Frases</span>
          </button>
        </div>

        <!-- Active Stage Container -->
        <div class="exercise-stage-container">
          ${mechanicHtml}
        </div>
      </div>
    `;
  },

  // 1. Render Gender Sorting
  renderGenderSorting() {
    const total = GENDER_SORTING_EXERCISES.length;
    const current = GENDER_SORTING_EXERCISES[this.genderIndex];

    return `
      <div class="stage-top-bar">
        <span>Mecânica 1: Separação Binária de Gênero</span>
        <span class="stage-counter-badge">Palavra ${this.genderIndex + 1} de ${total}</span>
      </div>

      <div class="gender-focus-card">
        <h2 class="gender-word-title">${current.word}</h2>
        <div class="gender-word-translation">"${current.translation}"</div>
      </div>

      ${!this.genderAnswered ? `
        <div class="gender-buttons-grid">
          <button class="gender-pick-btn gender-btn-m" data-choice="M">
            <span>👨 Vyriškoji (Masculino)</span>
            <span class="gender-btn-sub">Terminações: -as, -is, -ys, -us</span>
          </button>
          <button class="gender-pick-btn gender-btn-f" data-choice="F">
            <span>👩 Moteriškoji (Feminino)</span>
            <span class="gender-btn-sub">Terminações: -a, -ė, -uo</span>
          </button>
        </div>
      ` : `
        <div class="mechanic-feedback-box ${this.genderIsCorrect ? 'correct' : 'incorrect'}">
          <div class="feedback-title-row">
            <span>${this.genderIsCorrect ? '✓ Teisingai! (Correto!)' : '✕ Neteisingai (Atenção)'}</span>
            <span style="font-size: 0.85rem; font-weight: 600; margin-left: auto;">
              Gênero correto: <b>${current.correctGender === 'M' ? 'Masculino (M)' : 'Feminino (F)'}</b>
            </span>
          </div>
          <div class="feedback-desc-text">
            ${current.explanation}
          </div>
        </div>

        <button class="btn btn-primary" id="btn-next-gender" style="width: 100%; padding: 1rem;">
          Próxima Palavra ➡️
        </button>
      `}
    `;
  },

  // 2. Render Case Snapping
  renderCaseSnapping() {
    const total = CASE_SNAPPING_EXERCISES.length;
    const current = CASE_SNAPPING_EXERCISES[this.caseIndex];

    return `
      <div class="stage-top-bar">
        <span>Mecânica 2: Encaixe do Caso Locativo (Kur?)</span>
        <span class="stage-counter-badge">Exercício ${this.caseIndex + 1} de ${total}</span>
      </div>

      <div class="snapping-phrase-card">
        <div class="snapping-base-hint">Forma base no nominativo: <b>${current.baseWord}</b> (${current.baseMeaning})</div>
        <div class="snapping-phrase">
          ${current.sentenceBefore} 
          <span class="snap-slot ${this.caseSelected ? 'filled' : ''}">${this.caseSelected || '[ _____ ]'}</span>
          ${current.sentenceAfter}
        </div>
        <div class="snapping-full-translation">"${current.fullTranslation}"</div>
      </div>

      ${!this.caseAnswered ? `
        <div class="snapping-options-grid">
          ${current.options.map(opt => `
            <button class="snap-option-btn" data-snap-option="${opt}">
              ${opt}
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="mechanic-feedback-box ${this.caseIsCorrect ? 'correct' : 'incorrect'}">
          <div class="feedback-title-row">
            <span>${this.caseIsCorrect ? '✓ Puiku! (Excelente!)' : '✕ Neteisingai (Quase lá)'}</span>
            <span style="font-size: 0.85rem; font-weight: 600; margin-left: auto;">
              Resposta: <b>${current.correctAnswer}</b>
            </span>
          </div>
          <div class="feedback-desc-text">
            ${current.ruleNote}
          </div>
        </div>

        <button class="btn btn-primary" id="btn-next-case" style="width: 100%; padding: 1rem;">
          Próximo Encaixe ➡️
        </button>
      `}
    `;
  },

  // 3. Render Sentence Builder
  renderSentenceBuilder() {
    const total = SENTENCE_BUILDER_EXERCISES.length;
    const current = SENTENCE_BUILDER_EXERCISES[this.builderIndex];

    // Initialize tokens if first time on this exercise
    if (this.selectedTokens.length === 0 && this.availableTokens.length === 0 && !this.builderAnswered) {
      this.availableTokens = [...current.blocks];
    }

    const allUsed = this.availableTokens.length === 0;

    return `
      <div class="stage-top-bar">
        <span>Mecânica 3: Montador de Frases (Sintaxe Tátil)</span>
        <span class="stage-counter-badge">Frase ${this.builderIndex + 1} de ${total}</span>
      </div>

      <div class="builder-prompt-card">
        <span style="font-size: 0.82rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">
          Construa a frase em lituano:
        </span>
        <div class="builder-target-pt">"${current.targetPortuguese}"</div>
      </div>

      <!-- Construction Area: Tokens placed by user -->
      <div class="construction-zone ${this.selectedTokens.length > 0 ? 'has-items' : ''}" id="builder-zone">
        ${this.selectedTokens.length === 0 ? `
          <div class="construction-empty-hint">Toque nas palavras abaixo para ordenar a frase</div>
        ` : this.selectedTokens.map((tok, idx) => `
          <button class="word-token-chip in-construction" data-remove-token-idx="${idx}">
            ${tok} ✕
          </button>
        `).join('')}
      </div>

      <!-- Available Tokens Bank -->
      ${!this.builderAnswered ? `
        <div class="tokens-bank">
          ${this.availableTokens.map((tok, idx) => `
            <button class="word-token-chip" data-add-token-idx="${idx}">
              ${tok}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
          <button class="btn btn-secondary" id="btn-reset-builder" ${this.selectedTokens.length === 0 ? 'disabled style="opacity: 0.5;"' : ''}>
            Limpar 🔄
          </button>
          <button class="btn btn-primary" id="btn-verify-builder" ${!allUsed ? 'disabled style="opacity: 0.5;"' : ''}>
            Verificar Frase ✓
          </button>
        </div>
      ` : `
        <div class="mechanic-feedback-box ${this.builderIsCorrect ? 'correct' : 'incorrect'}">
          <div class="feedback-title-row">
            <span>${this.builderIsCorrect ? '✓ Teisingai! (Frase perfeita!)' : '✕ Ordem Incorreta'}</span>
          </div>
          <div class="feedback-desc-text">
            <div>Ordem correta: <b>${current.correctOrder.join(' ')}</b></div>
            <div style="margin-top: 0.35rem; font-size: 0.85rem; color: var(--text-primary); opacity: 0.9;">
              💡 <b>Foco Gramatical:</b> ${current.grammarFocus}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          ${!this.builderIsCorrect ? `
            <button class="btn btn-secondary" id="btn-retry-builder" style="flex: 1;">
              Tentar Novamente 🔄
            </button>
          ` : ''}
          <button class="btn btn-primary" id="btn-next-builder" style="flex: 2;">
            Avançar ➡️
          </button>
        </div>
      `}
    `;
  },

  setup(navigateCallback, forceRenderCallback) {
    // Mode switcher buttons
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeMode = btn.dataset.mode;
        // Reset sub-states if necessary
        this.selectedTokens = [];
        this.availableTokens = [];
        this.builderAnswered = false;
        forceRenderCallback();
      });
    });

    // 1. Gender Sorting Event Listeners
    if (this.activeMode === 'gender-sorting') {
      document.querySelectorAll('[data-choice]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.genderAnswered) return;
          const choice = btn.dataset.choice;
          const current = GENDER_SORTING_EXERCISES[this.genderIndex];

          this.genderSelected = choice;
          this.genderAnswered = true;
          this.genderIsCorrect = (choice === current.correctGender);

          if (this.genderIsCorrect) {
            db.addXP(15);
          } else {
            db.addXP(5);
          }
          forceRenderCallback();
        });
      });

      const nextGenderBtn = document.getElementById('btn-next-gender');
      if (nextGenderBtn) {
        nextGenderBtn.addEventListener('click', () => {
          this.genderIndex = (this.genderIndex + 1) % GENDER_SORTING_EXERCISES.length;
          this.genderAnswered = false;
          this.genderSelected = null;
          this.genderIsCorrect = false;
          forceRenderCallback();
        });
      }
    }

    // 2. Case Snapping Event Listeners
    if (this.activeMode === 'case-snapping') {
      document.querySelectorAll('[data-snap-option]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.caseAnswered) return;
          const opt = btn.dataset.snapOption;
          const current = CASE_SNAPPING_EXERCISES[this.caseIndex];

          this.caseSelected = opt;
          this.caseAnswered = true;
          this.caseIsCorrect = (opt === current.correctAnswer);

          if (this.caseIsCorrect) {
            db.addXP(20);
          } else {
            db.addXP(5);
          }
          forceRenderCallback();
        });
      });

      const nextCaseBtn = document.getElementById('btn-next-case');
      if (nextCaseBtn) {
        nextCaseBtn.addEventListener('click', () => {
          this.caseIndex = (this.caseIndex + 1) % CASE_SNAPPING_EXERCISES.length;
          this.caseAnswered = false;
          this.caseSelected = null;
          this.caseIsCorrect = false;
          forceRenderCallback();
        });
      }
    }

    // 3. Sentence Builder Event Listeners
    if (this.activeMode === 'sentence-builder') {
      // Add token from bank to construction zone
      document.querySelectorAll('[data-add-token-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.addTokenIdx);
          const token = this.availableTokens.splice(idx, 1)[0];
          this.selectedTokens.push(token);
          forceRenderCallback();
        });
      });

      // Remove token from construction zone back to bank
      document.querySelectorAll('[data-remove-token-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.removeTokenIdx);
          const token = this.selectedTokens.splice(idx, 1)[0];
          this.availableTokens.push(token);
          forceRenderCallback();
        });
      });

      // Reset builder
      const resetBtn = document.getElementById('btn-reset-builder');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const current = SENTENCE_BUILDER_EXERCISES[this.builderIndex];
          this.availableTokens = [...current.blocks];
          this.selectedTokens = [];
          this.builderAnswered = false;
          forceRenderCallback();
        });
      }

      // Verify builder
      const verifyBtn = document.getElementById('btn-verify-builder');
      if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
          const current = SENTENCE_BUILDER_EXERCISES[this.builderIndex];
          this.builderAnswered = true;
          this.builderIsCorrect = (this.selectedTokens.join(' ') === current.correctOrder.join(' '));

          if (this.builderIsCorrect) {
            db.addXP(25);
          } else {
            db.addXP(5);
          }
          forceRenderCallback();
        });
      }

      // Retry builder
      const retryBtn = document.getElementById('btn-retry-builder');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          const current = SENTENCE_BUILDER_EXERCISES[this.builderIndex];
          this.availableTokens = [...current.blocks];
          this.selectedTokens = [];
          this.builderAnswered = false;
          forceRenderCallback();
        });
      }

      // Next builder
      const nextBuilderBtn = document.getElementById('btn-next-builder');
      if (nextBuilderBtn) {
        nextBuilderBtn.addEventListener('click', () => {
          this.builderIndex = (this.builderIndex + 1) % SENTENCE_BUILDER_EXERCISES.length;
          const current = SENTENCE_BUILDER_EXERCISES[this.builderIndex];
          this.availableTokens = [...current.blocks];
          this.selectedTokens = [];
          this.builderAnswered = false;
          this.builderIsCorrect = false;
          forceRenderCallback();
        });
      }
    }
  }
};
