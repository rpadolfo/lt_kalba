import { db } from '../data/mockData.js';

export const VocabularyView = {
  activeModuleFilter: null,
  currentCardIndex: 0,
  deck: [],

  render(filterModuleId = null) {
    if (filterModuleId !== null) {
      this.activeModuleFilter = filterModuleId;
    }
    
    // Get vocabulary and build active review deck
    const allVocab = db.getVocabulary();
    
    // Filter by module if set, otherwise prioritize cards that are ready for review
    if (this.activeModuleFilter) {
      this.deck = allVocab.filter(w => w.module === this.activeModuleFilter);
    } else {
      // Show all, sorting by nextReview (earliest review times first)
      this.deck = [...allVocab].sort((a, b) => a.nextReview - b.nextReview);
    }

    if (this.deck.length === 0) {
      return `
        <div class="view vocabulary-view">
          <h1 class="view-title">Kortelės (Flashcards)</h1>
          <p class="view-subtitle">Aprimore seu vocabulário lituano por meio de Repetição Espaçada.</p>
          
          <div style="background-color: var(--bg-card); padding: 3rem; border-radius: 16px; border: 1px solid var(--border-color); text-align: center; max-width: 600px; margin: 0 auto; box-shadow: var(--shadow-premium);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: white; margin-bottom: 0.5rem;">Nenhuma palavra encontrada</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
              ${this.activeModuleFilter ? `Não há palavras cadastradas para o Módulo ${this.activeModuleFilter} no momento.` : 'Você não possui palavras registradas.'}
            </p>
            <button class="action-btn action-btn-primary" id="go-to-manager">Ir para Gerenciar Conteúdo</button>
          </div>
        </div>
      `;
    }

    // Safety index check
    if (this.currentCardIndex >= this.deck.length) {
      this.currentCardIndex = 0;
    }

    const currentWord = this.deck[this.currentCardIndex];
    const isFilteredMsg = this.activeModuleFilter ? `Filtrado por: Módulo ${this.activeModuleFilter} (<span id="clear-filter" style="color: var(--primary-hover); cursor: pointer; text-decoration: underline;">Limpar Filtro</span>)` : `Próximo a Revisar`;

    return `
      <div class="view vocabulary-view">
        <h1 class="view-title">Kortelės (Vocabulário)</h1>
        <p class="view-subtitle">Toque na carta para revelar a tradução e selecione a dificuldade para programar a próxima revisão.</p>
        
        <div class="flashcard-view-container">
          <div class="srs-info-bar">
            <span>${isFilteredMsg}</span>
            <span class="srs-counter">Kortelė ${this.currentCardIndex + 1} de ${this.deck.length}</span>
          </div>

          <!-- 3D Card Container -->
          <div class="card-outer" id="flashcard">
            <div class="card-inner">
              <!-- Front Side -->
              <div class="card-front">
                <span class="word-type">${currentWord.type}</span>
                <h2 class="word-term">${currentWord.stressed}</h2>
                <div class="flip-hint">
                  <span>🔄</span>
                  <span>Clique para virar</span>
                </div>
              </div>
              
              <!-- Back Side -->
              <div class="card-back">
                <span class="word-type" style="border-color: rgba(139, 92, 246, 0.3); color: var(--primary-hover);">${currentWord.type}</span>
                <h2 class="word-translation">${currentWord.translation}</h2>
                
                ${currentWord.example ? `
                  <p class="word-example">${currentWord.example}</p>
                  <p class="word-example-translation">${currentWord.exampleTranslation}</p>
                ` : ''}
                
                <div class="flip-hint" style="color: var(--text-muted);">
                  <span>Clique para desvirar</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feedback notification Toast in-UI -->
          <div id="xp-toast" style="opacity: 0; transform: translateY(10px); transition: var(--transition-smooth); background-color: var(--success-glow); border: 1px solid var(--success); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; text-align: center; width: 100%; font-size: 0.95rem; font-weight: 500;">
            +15 XP! Próxima revisão agendada.
          </div>

          <!-- SRS Buttons Group (Visible when card is flipped) -->
          <div class="srs-buttons-container" id="srs-actions" style="display: none;">
            <button class="srs-btn srs-btn-hard" data-rating="hard">
              <span>Difícil</span>
              <span class="srs-btn-sub">Rever logo</span>
            </button>
            <button class="srs-btn srs-btn-good" data-rating="good">
              <span>Bom</span>
              <span class="srs-btn-sub">Manter</span>
            </button>
            <button class="srs-btn srs-btn-easy" data-rating="easy">
              <span>Fácil</span>
              <span class="srs-btn-sub">Dominado</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Go to Manager empty state trigger
    const managerBtn = document.getElementById('go-to-manager');
    if (managerBtn) {
      managerBtn.addEventListener('click', () => {
        navigateCallback('manage');
      });
      return;
    }

    // 2. Clear filter trigger
    const clearFilterLink = document.getElementById('clear-filter');
    if (clearFilterLink) {
      clearFilterLink.addEventListener('click', () => {
        this.activeModuleFilter = null;
        this.currentCardIndex = 0;
        forceRenderCallback();
      });
    }

    const card = document.getElementById('flashcard');
    const srsActions = document.getElementById('srs-actions');
    const toast = document.getElementById('xp-toast');

    if (!card) return;

    // 3. Card Flip trigger
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      
      const isFlipped = card.classList.contains('flipped');
      srsActions.style.display = isFlipped ? 'flex' : 'none';
      
      // Auto-hide toast when flipping card back/forth
      toast.style.opacity = 0;
      toast.style.transform = 'translateY(10px)';
    });

    // 4. SRS Buttons triggers
    document.querySelectorAll('.srs-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid reflipping the card
        
        const rating = btn.dataset.rating;
        const currentWord = this.deck[this.currentCardIndex];
        
        // Process SRS rating and calculate new state
        const srsResult = db.processSRSRating(currentWord.id, rating);
        
        if (srsResult) {
          // Show toast with dynamic SRS info
          toast.textContent = `+${srsResult.xpGained} XP! Próxima revisão agendada para: ${srsResult.nextReviewDate}`;
          toast.style.opacity = 1;
          toast.style.transform = 'translateY(0)';
          
          // Animate and switch to next card after a brief delay
          setTimeout(() => {
            card.classList.remove('flipped');
            srsActions.style.display = 'none';
            toast.style.opacity = 0;
            toast.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
              this.currentCardIndex = (this.currentCardIndex + 1) % this.deck.length;
              forceRenderCallback();
            }, 300); // Wait for card back-flip animation to finish
            
          }, 1500); // Show review toast info for 1.5 seconds
        }
      });
    });
  }
};
