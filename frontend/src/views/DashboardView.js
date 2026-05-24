import { db } from '../data/mockData.js';

export const DashboardView = {
  render() {
    const progress = db.getProgress();
    const vocab = db.getVocabulary();
    const conjs = db.getConjugations();
    
    // Stats calculation
    const totalWords = vocab.length;
    const masteredWords = vocab.filter(w => w.srsStage >= 4).length;
    const learningWords = vocab.filter(w => w.srsStage > 0 && w.srsStage < 4).length;
    
    // Progress calculation for A1 -> A2 transistion
    // Let's assume progress is based on average SRS stage of all words (max 5 per word)
    const totalPossiblePoints = totalWords * 5;
    const currentPoints = vocab.reduce((acc, curr) => acc + (curr.srsStage || 0), 0);
    const progressPercent = totalPossiblePoints > 0 ? Math.round((currentPoints / totalPossiblePoints) * 100) : 0;
    
    const xpPercent = Math.min(Math.round(((progress.xp || 0) / (progress.dailyGoal || 50)) * 100), 100);

    return `
      <div class="view dashboard-view">
        <h1 class="view-title">Mano Pažanga</h1>
        <p class="view-subtitle">Bem-vindo de volta! Veja o seu progresso no aprendizado do Lituano.</p>
        
        <!-- Statistics Grid -->
        <div class="dashboard-grid">
          <div class="stat-card" style="--gradient: linear-gradient(to right, #8b5cf6, #3b82f6)">
            <span class="stat-label">Vocabulário Geral</span>
            <span class="stat-value">${totalWords}</span>
            <span class="stat-desc">${masteredWords} aprendidos • ${learningWords} em progresso</span>
          </div>
          
          <div class="stat-card" style="--gradient: linear-gradient(to right, #10b981, #059669)">
            <span class="stat-label">Pontos de XP</span>
            <span class="stat-value">${progress.xp || 0}</span>
            <span class="stat-desc">${progress.dailyGoal - (progress.xp || 0) > 0 ? `${progress.dailyGoal - (progress.xp || 0)} XP para a meta diária` : 'Meta diária concluída! 🎉'}</span>
          </div>

          <div class="stat-card" style="--gradient: linear-gradient(to right, #f59e0b, #d97706)">
            <span class="stat-label">Palavras Masterizadas</span>
            <span class="stat-value">${masteredWords}</span>
            <span class="stat-desc">Fixadas com sucesso na memória</span>
          </div>

          <div class="stat-card" style="--gradient: linear-gradient(to right, #ef4444, #db2777)">
            <span class="stat-label">Ofensiva diária</span>
            <span class="stat-value">${progress.streak || 0} dias</span>
            <span class="stat-desc">Mantenha a chama acesa! 🔥</span>
          </div>
        </div>

        <!-- Global Transition A1 -> A2 Milestone -->
        <div class="progress-section">
          <div class="progress-header">
            <div class="progress-title-group">
              <h3>Progresso para Nível A2 (Transição Global)</h3>
              <p class="stat-desc" style="margin-top: 0.25rem;">Meta de proficiência baseada na fixação do vocabulário A1</p>
            </div>
            <span class="progress-value">${progressPercent}% concluído</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
          </div>
          
          <div class="milestones-timeline">
            <div class="milestone-node completed">
              <div class="milestone-dot"></div>
              <span class="milestone-name">Início</span>
            </div>
            <div class="milestone-node ${progressPercent >= 20 ? 'completed' : progressPercent >= 5 ? 'active' : ''}">
              <div class="milestone-dot"></div>
              <span class="milestone-name">Módulo 1</span>
            </div>
            <div class="milestone-node ${progressPercent >= 50 ? 'completed' : progressPercent >= 25 ? 'active' : ''}">
              <div class="milestone-dot"></div>
              <span class="milestone-name">Módulo 2</span>
            </div>
            <div class="milestone-node ${progressPercent >= 80 ? 'completed' : progressPercent >= 55 ? 'active' : ''}">
              <div class="milestone-dot"></div>
              <span class="milestone-name">Módulo 3</span>
            </div>
            <div class="milestone-node ${progressPercent >= 100 ? 'completed' : progressPercent >= 85 ? 'active' : ''}">
              <div class="milestone-dot"></div>
              <span class="milestone-name">Nível A2</span>
            </div>
          </div>
        </div>

        <!-- Active Modules List -->
        <div class="modules-section">
          <h2 class="section-title">📚 Módulos de Estudo</h2>
          <div class="modules-list">
            <div class="module-card">
              <div class="module-info">
                <span class="module-badge">MÓDULO 1 • A1.1</span>
                <span class="module-title">Susipažinkime (Apresentações e Fundamentos)</span>
                <span class="module-desc">Saudações, gêneros de substantivos, pronomes e o verbo būtise/estar no presente.</span>
              </div>
              <button class="module-action-btn" data-module="1">Praticar Módulo</button>
            </div>

            <div class="module-card">
              <div class="module-info">
                <span class="module-badge">MÓDULO 2 • A1.2</span>
                <span class="module-title">Mano ir Tavo Šalis / Miestas (A Cidade e o País)</span>
                <span class="module-desc">Vocabulário de lugares e meios de transporte. Introdução ao caso Locativo (onde?).</span>
              </div>
              <button class="module-action-btn" data-module="2">Praticar Módulo</button>
            </div>

            <div class="module-card">
              <div class="module-info">
                <span class="module-badge">MÓDULO 3 • A1.3</span>
                <span class="module-title">O Čia – Mūsų Šeima (Família e Casa)</span>
                <span class="module-desc">Membros da família, adjetivos e o caso Genitivo (posse e negação de ter algo).</span>
              </div>
              <button class="module-action-btn" data-module="3">Praticar Módulo</button>
            </div>

            <div class="module-card">
              <div class="module-info">
                <span class="module-badge">MÓDULO 4 • A2.1</span>
                <span class="module-title">Einame Užkąsti (Comida e Bebida)</span>
                <span class="module-desc">Vocabulário de alimentos e mercado. Introdução ao caso Acusativo (objeto direto).</span>
              </div>
              <button class="module-action-btn" data-module="4">Praticar Módulo</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  setup(navigateCallback) {
    // Setup action triggers for studying
    document.querySelectorAll('.module-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const moduleId = parseInt(e.target.dataset.module);
        // Switch tab to Vocabulary and filter by module
        navigateCallback('vocabulary', moduleId);
      });
    });
  }
};
