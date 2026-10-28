import { db } from '../data/mockData.js';

export const DashboardView = {
  activeWeekAccordion: 1, // Track which week is expanded
  activeTab: 'overview', // 'overview', 'proficiency', 'schedule'

  render() {
    const progress = db.getProgress();
    const vocab = db.getVocabulary();
    
    // Stats calculation
    const totalWords = vocab.length;
    const masteredWords = vocab.filter(w => w.srsStage >= 4).length;
    const learningWords = vocab.filter(w => w.srsStage > 0 && w.srsStage < 4).length;
    
    // Progress calculation for A1 -> A2 transition
    const totalPossiblePoints = totalWords * 5;
    const currentPoints = vocab.reduce((acc, curr) => acc + (curr.srsStage || 0), 0);
    const progressPercent = totalPossiblePoints > 0 ? Math.round((currentPoints / totalPossiblePoints) * 100) : 0;

    // --- 1. CASE PROFICIENCY HEATMAP CALCULATIONS (Section 5) ---
    const caseStats = {
      "Nominativo": { words: [], sum: 0 },
      "Genitivo": { words: [], sum: 0 },
      "Acusativo": { words: [], sum: 0 },
      "Locativo": { words: [], sum: 0 }
    };

    vocab.forEach(w => {
      const term = w.word.toLowerCase();
      let detectedCase = "Nominativo";
      
      if (term.endsWith("oje") || term.endsWith("ėje") || term.endsWith("uje") || term.endsWith("yje") || term.endsWith("e")) {
        detectedCase = "Locativo";
      } else if (term.endsWith("os") || term.endsWith("ės") || term.endsWith("iaus") || (term.endsWith("o") && !term.endsWith("io"))) {
        detectedCase = "Genitivo";
      } else if (term.endsWith("ą") || term.endsWith("ę") || term.endsWith("į") || term.endsWith("ų")) {
        detectedCase = "Acusativo";
      }
      
      caseStats[detectedCase].words.push(w);
      caseStats[detectedCase].sum += (w.srsStage || 0);
    });

    const casesReport = Object.keys(caseStats).map(caseName => {
      const stats = caseStats[caseName];
      const count = stats.words.length;
      const score = count > 0 ? Math.round((stats.sum / (count * 5)) * 100) : 0;
      
      const hue = Math.min(score * 1.3, 130); 
      return {
        name: caseName,
        score: score,
        count: count,
        hue: hue
      };
    });

    // --- 2. COMPETENCY MATRIX CALCULATIONS (Section 5) ---
    const getModuleCompletion = (modId) => {
      const modWords = vocab.filter(w => w.module === modId);
      if (modWords.length === 0) return 0;
      const sum = modWords.reduce((acc, curr) => acc + (curr.srsStage || 0), 0);
      return Math.round((sum / (modWords.length * 5)) * 100);
    };

    const competencies = [
      { id: "comp-1", name: "Dados Pessoais", desc: "Identidade, idade e família (Mód. 1 & 3)", pct: Math.round((getModuleCompletion(1) + getModuleCompletion(3)) / 2) },
      { id: "comp-2", name: "Rotina e Clima", desc: "Descrição temporal e cotidiana (Mód. 5)", pct: getModuleCompletion(5) || 10 },
      { id: "comp-3", name: "Cidade e Transporte", desc: "Orientação espacial e locais (Mód. 2)", pct: getModuleCompletion(2) },
      { id: "comp-4", name: "Compras e Serviços", desc: "Interação em lojas, cafés e restaurantes (Mód. 4)", pct: getModuleCompletion(4) },
      { id: "comp-5", name: "Saúde e Emergência", desc: "Partes do corpo e sintomas básicos (Mód. 10)", pct: 0 }
    ];

    // --- 3. 12-WEEK STUDY SCHEDULE (Section 4) ---
    const weeksSchedule = [
      { wk: 1, month: 1, title: "Fonética e Identidade", content: "Alfabeto (nomes das letras) e saudações básicas.", practice: "Soletração (Reference e Exercises).", target: "reference" },
      { wk: 2, month: 1, title: "Estruturas Iniciais", content: "Números 0-20, pronomes pessoais e o verbo būti no presente.", practice: "Flashcards do Módulo 1.", target: "lessons" },
      { wk: 3, month: 1, title: "Gêneros e Objetos", content: "Identificação e taxonomia de substantivos Masculino/Feminino.", practice: "Exercícios do Módulo 1.", target: "lessons" },
      { wk: 4, month: 1, title: "Localização (Locativo)", content: "Formação e uso prático do caso Locativo ('Aš esu Vilniuje').", practice: "Flashcards do Módulo 2.", target: "lessons" },
      { wk: 5, month: 2, title: "Rotina e Presente", content: "Conjugação dos verbos regulares dirbti e gyventi no presente.", practice: "Verbos no menu Redigir.", target: "reference" },
      { wk: 6, month: 2, title: "Compras (Acusativo)", content: "Pedidos e alimentação usando o caso Acusativo ('Aš noriu kavos').", practice: "Flashcards do Módulo 4.", target: "lessons" },
      { wk: 7, month: 2, title: "Tempo e Clima", content: "Dias da semana, leitura de horas e condições climáticas.", practice: "Conjugação no presente.", target: "exercises" },
      { wk: 8, month: 2, title: "Movimento e Direções", content: "Verbos eiti/važiuoti e preposições de direção į/iš.", practice: "Diálogo 2 (Pokalbiai).", target: "dialogues" },
      { wk: 9, month: 3, title: "Passado e Futuro Simples", content: "Uso dos verbos būti e turėti no passado (buvo) e futuro (būsiu).", practice: "Escrever frases de exemplo.", target: "manage" },
      { wk: 10, month: 3, title: "Saúde e Trabalho", content: "Vocabulário de bem-estar, corpo e atendimento ao cliente.", practice: "Flashcards gerais.", target: "vocabulary" },
      { wk: 11, month: 3, title: "Escrita Formal", content: "Preenchimento de formulários e redação de textos curtos.", practice: "Exercício de tradução.", target: "exercises" },
      { wk: 12, month: 3, title: "Simulado da Categoria I", content: "Simulação de diálogo de compras e serviços (12 min).", practice: "Diálogo 3 (Kavinėje).", target: "dialogues" }
    ];

    return `
      <style>
        .heatmap-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .heatmap-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: var(--card-color);
        }
        .heatmap-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-premium);
          border-color: var(--card-color);
        }
        .heatmap-name {
          font-weight: 700;
          color: white;
          font-size: 1.1rem;
        }
        .heatmap-bar-container {
          width: 100%;
          height: 8px;
          background-color: rgba(255,255,255,0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.25rem;
        }
        .heatmap-bar-fill {
          height: 100%;
          border-radius: 4px;
          background-color: var(--card-color);
          transition: width 0.8s ease-out;
        }
        .heatmap-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .matrix-card {
          background: linear-gradient(135deg, var(--bg-card), rgba(255,255,255,0.01));
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: var(--transition-smooth);
        }
        .matrix-card:hover {
          border-color: var(--primary);
        }
        .matrix-checkbox {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--success);
          transition: var(--transition-fast);
          flex-shrink: 0;
          cursor: pointer;
        }
        .matrix-checkbox.checked {
          background-color: rgba(16, 185, 129, 0.15);
          border-color: var(--success);
        }
        .matrix-info {
          flex-grow: 1;
        }
        .matrix-title {
          font-weight: 600;
          color: white;
          font-size: 0.95rem;
        }
        .matrix-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .schedule-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .schedule-header {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
          background-color: rgba(255, 255, 255, 0.01);
        }
        .schedule-header:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }
        .schedule-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .schedule-week-badge {
          background: linear-gradient(135deg, var(--primary), var(--primary-hover));
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }
        .schedule-body {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background-color: rgba(0, 0, 0, 0.15);
          display: none;
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .schedule-body.active {
          display: block;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="view dashboard-view" style="padding-bottom: 3rem;">
        <h1 class="view-title">Mano Pažanga</h1>
        <p class="view-subtitle">Bem-vindo de volta! Acompanhe seu aprendizado focando no que importa agora.</p>
        
        <!-- Dashboard Tabs Nav -->
        <div class="dashboard-tabs">
          <button class="dashboard-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-dash-tab="overview">Visão Geral</button>
          <button class="dashboard-tab-btn ${this.activeTab === 'proficiency' ? 'active' : ''}" data-dash-tab="proficiency">Proficiência</button>
          <button class="dashboard-tab-btn ${this.activeTab === 'schedule' ? 'active' : ''}" data-dash-tab="schedule">Cronograma</button>
        </div>

        <!-- Overview Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'overview' ? 'active' : ''}">
          <div class="dashboard-grid">
            <div class="stat-card" style="--gradient: linear-gradient(to right, #8b5cf6, #3b82f6)">
              <span class="stat-label">Vocabulário Geral</span>
              <span class="stat-value">${totalWords}</span>
              <span class="stat-desc">${masteredWords} masterizados • ${learningWords} em progresso</span>
            </div>
            
            <div class="stat-card" style="--gradient: linear-gradient(to right, #10b981, #059669)">
              <span class="stat-label">Pontos de XP</span>
              <span class="stat-value">${progress.xp || 0}</span>
              <span class="stat-desc">${progress.dailyGoal - (progress.xp || 0) > 0 ? `${progress.dailyGoal - (progress.xp || 0)} XP para a meta diária` : 'Meta diária concluída! 🎉'}</span>
            </div>

            <div class="stat-card" style="--gradient: linear-gradient(to right, #f59e0b, #d97706)">
              <span class="stat-label">Palavras Masterizadas</span>
              <span class="stat-value">${masteredWords}</span>
              <span class="stat-desc">Cards fixados na memória de longo prazo</span>
            </div>

            <div class="stat-card" style="--gradient: linear-gradient(to right, #ef4444, #db2777)">
              <span class="stat-label">Ofensiva diária</span>
              <span class="stat-value">${progress.streak || 0} dias</span>
              <span class="stat-desc">Mantenha a chama acesa! 🔥</span>
            </div>
          </div>

          <!-- Global Transition A1 -> A2 Milestone -->
          <div class="progress-section" style="margin-top: 2rem;">
            <div class="progress-header">
              <div class="progress-title-group">
                <h3>Progresso para Nível A2</h3>
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
        </div>

        <!-- Proficiency Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'proficiency' ? 'active' : ''}">
          <div>
            <h2 class="section-title">📊 Casos Gramaticais</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: -0.5rem;">Deslize para ver sua precisão nos casos fundamentais.</p>
            <div class="horizontal-scroll">
              ${casesReport.map(item => `
                <div class="heatmap-card" style="--card-color: hsl(${item.hue}, 80%, 50%)">
                  <div class="heatmap-meta">
                    <span class="heatmap-name">${item.name}</span>
                    <span style="font-weight: 700; color: white;">${item.score}%</span>
                  </div>
                  <div class="heatmap-bar-container">
                    <div class="heatmap-bar-fill" style="width: ${item.score}%"></div>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.count} palavras catalogadas</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <h2 class="section-title">🏆 Matriz de Competências</h2>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: -0.5rem;">Requisitos para aprovação na Categoria I. Deslize para ver mais.</p>
            <div class="horizontal-scroll">
              ${competencies.map(comp => {
                const isChecked = comp.pct >= 75;
                return `
                  <div class="matrix-card">
                    <div class="matrix-checkbox ${isChecked ? 'checked' : ''}" data-comp-id="${comp.id}">
                      ${isChecked ? '✓' : ''}
                    </div>
                    <div class="matrix-info">
                      <div class="matrix-title">${comp.name}</div>
                      <div class="matrix-desc">${comp.desc}</div>
                      <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-top: 6px; overflow:hidden;">
                        <div style="width: ${comp.pct}%; height: 100%; background: ${isChecked ? 'var(--success)' : 'var(--primary)'}; border-radius: 2px; transition: width 0.5s;"></div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Schedule Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'schedule' ? 'active' : ''}">
          <h2 class="section-title">📅 Cronograma de Estudos</h2>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: -0.5rem;">Sua trilha pedagógica passo a passo para a Categoria I.</p>
          <div class="schedule-list">
            ${weeksSchedule.map(wk => {
              const isExpanded = this.activeWeekAccordion === wk.wk;
              return `
                <div class="schedule-item">
                  <div class="schedule-header" data-week-id="${wk.wk}">
                    <div class="schedule-header-left">
                      <span class="schedule-week-badge">Sem. ${wk.wk}</span>
                      <span style="font-weight: 600; color: white;">${wk.title}</span>
                    </div>
                    <span style="color: var(--text-muted); font-size: 1.2rem;">${isExpanded ? '▼' : '▶'}</span>
                  </div>
                  <div class="schedule-body ${isExpanded ? 'active' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">
                      <div style="flex: 1; min-width: 200px;">
                        <h4 style="color: var(--primary-hover); margin-bottom: 0.25rem; font-size: 0.9rem;">Tema do Conteúdo:</h4>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.75rem;">${wk.content}</p>
                        <h4 style="color: var(--success); margin-bottom: 0.25rem; font-size: 0.9rem;">Prática Recomendada:</h4>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">${wk.practice}</p>
                      </div>
                      <div style="flex-shrink: 0;">
                        <button class="action-btn action-btn-primary study-week-btn" data-target-tab="${wk.target}">
                          Estudar Tema 🚀
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },
  
  setup(navigateCallback, forceRenderCallback) {
    // Tabs toggle
    document.querySelectorAll('[data-dash-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.dashTab;
        forceRenderCallback();
      });
    });

    // Accordion Toggle Click Handlers
    document.querySelectorAll('.schedule-header').forEach(header => {
      header.addEventListener('click', () => {
        const weekId = parseInt(header.dataset.weekId);
        if (this.activeWeekAccordion === weekId) {
          this.activeWeekAccordion = null; 
        } else {
          this.activeWeekAccordion = weekId; 
        }
        forceRenderCallback();
      });
    });

    // Study week redirect button triggers
    document.querySelectorAll('.study-week-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.dataset.targetTab;
        navigateCallback(targetTab);
      });
    });

    // Competency checkbox toggle
    document.querySelectorAll('.matrix-checkbox').forEach(box => {
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        box.classList.toggle('checked');
        box.innerHTML = box.classList.contains('checked') ? '✓' : '';
      });
    });
  }
};
