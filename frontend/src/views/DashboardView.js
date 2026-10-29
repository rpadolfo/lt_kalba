import { db } from '../data/mockData.js';

export const DashboardView = {
  activeWeekAccordion: 1, // Track which week is expanded
  activeTab: 'daily-journey', // 'daily-journey', 'proficiency', 'schedule'

  render() {
    const progress = db.getProgress();
    const vocab = db.getVocabulary();
    
    // Dynamic greeting based on current local time
    const hour = new Date().getHours();
    let greeting = "Laba diena, estudante! ☀️";
    if (hour >= 5 && hour < 12) {
      greeting = "Labas rytas, estudante! 🌅";
    } else if (hour >= 18 || hour < 5) {
      greeting = "Labas vakaras, estudante! 🌙";
    }

    // Stats calculation
    const totalWords = vocab.length;
    const masteredWords = vocab.filter(w => w.srsStage >= 4).length;
    const learningWords = vocab.filter(w => w.srsStage > 0 && w.srsStage < 4).length;
    
    // Progress calculation for A1 -> A2 transition
    const totalPossiblePoints = totalWords * 5;
    const currentPoints = vocab.reduce((acc, curr) => acc + (curr.srsStage || 0), 0);
    const progressPercent = totalPossiblePoints > 0 ? Math.round((currentPoints / totalPossiblePoints) * 100) : 0;

    // --- 1. CASE PROFICIENCY HEATMAP CALCULATIONS ---
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
      
      // Warm amber/green hue
      const hue = score > 60 ? 150 : score > 30 ? 40 : 15; 
      return {
        name: caseName,
        score: score,
        count: count,
        hue: hue
      };
    });

    // --- 2. COMPETENCY MATRIX CALCULATIONS ---
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

    // --- 3. 12-WEEK STUDY SCHEDULE ---
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
        /* Tactile Dashboard & Journey Styles */
        .journey-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .journey-title-box h1 {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 0.35rem;
        }
        .journey-title-box p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          margin: 0;
        }
        .journey-streak-pills {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .journey-pill {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-bottom: 3px solid #141c17;
          border-radius: 999px;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .journey-pill.amber {
          border-color: rgba(245, 158, 11, 0.4);
          color: var(--primary-hover);
        }

        /* Hero Action Card (1-Touch Study) */
        .hero-study-card {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-premium);
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .hero-study-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, var(--primary), var(--secondary));
        }
        .hero-info-side {
          flex: 1;
          min-width: 260px;
        }
        .hero-badge-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(245, 158, 11, 0.15);
          color: var(--primary-hover);
          padding: 3px 8px;
          border-radius: 6px;
          margin-bottom: 0.6rem;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .hero-study-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
          line-height: 1.25;
        }
        .hero-study-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.45;
          margin: 0;
        }
        .hero-action-side {
          flex-shrink: 0;
        }
        .hero-continue-btn {
          font-size: 1.05rem;
          padding: 1rem 2rem;
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* 3 Daily Missions Section */
        .missions-section {
          margin-bottom: 2.5rem;
        }
        .section-header-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-header-compact h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .section-header-compact span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .missions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .mission-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          transition: transform 0.15s ease, border-color 0.15s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .mission-card:hover {
          border-color: var(--primary-base);
          transform: translateY(-2px);
        }
        .mission-card-top {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .mission-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #111614;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .mission-text-box h4 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .mission-text-box p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0;
        }
        .mission-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mission-xp-tag {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--secondary-hover);
        }

        /* Tactile Dashboard Stats Mini-Grid */
        .stats-mini-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .mini-stat-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .mini-stat-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .mini-stat-val {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .mini-stat-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Heatmap and Matrix */
        .heatmap-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
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
          color: var(--text-primary);
          font-size: 1.05rem;
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
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .matrix-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
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
          color: var(--text-primary);
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
          background: var(--primary);
          color: #111614;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }
        .schedule-body {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background-color: rgba(0, 0, 0, 0.2);
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
        
        <!-- Header with warm contextual greeting and streak indicator -->
        <div class="journey-header">
          <div class="journey-title-box">
            <h1>${greeting}</h1>
            <p>Sua jornada rumo à Categoria I do Exame de Proficiência continua hoje.</p>
          </div>
          <div class="journey-streak-pills">
            <div class="journey-pill amber" title="Ofensiva diária">
              <span class="streak-flame">🔥</span>
              <span>${progress.streak || 0} dias seguidos</span>
            </div>
            <div class="journey-pill" title="Pontos de experiência acumulados">
              <span>⭐</span>
              <span>${progress.xp || 0} XP</span>
            </div>
          </div>
        </div>
        
        <!-- Dashboard Sub-Tabs -->
        <div class="dashboard-tabs">
          <button class="dashboard-tab-btn ${this.activeTab === 'daily-journey' ? 'active' : ''}" data-dash-tab="daily-journey">Jornada Diária</button>
          <button class="dashboard-tab-btn ${this.activeTab === 'proficiency' ? 'active' : ''}" data-dash-tab="proficiency">Casos & Competências</button>
          <button class="dashboard-tab-btn ${this.activeTab === 'schedule' ? 'active' : ''}" data-dash-tab="schedule">Cronograma (12 Semanas)</button>
        </div>

        <!-- 1. Daily Journey Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'daily-journey' ? 'active' : ''}">
          
          <!-- Central Hero Card: 1-Touch Action to Continue Learning -->
          <div class="hero-study-card">
            <div class="hero-info-side">
              <span class="hero-badge-tag">Módulo 1 • Iniciar Trilha</span>
              <h2 class="hero-study-title">Lição 1: Gênero dos Substantivos: A Chave das Terminações</h2>
              <p class="hero-study-desc">
                Aprenda a reconhecer instantaneamente substantivos masculinos (-as, -is, -ys, -us) e femininos (-a, -ė) essenciais para a Categoria I.
              </p>
            </div>
            <div class="hero-action-side">
              <button class="btn btn-primary hero-continue-btn" id="hero-continue-study">
                Continuar Estudo ▶
              </button>
            </div>
          </div>

          <!-- Section: 3 Missões Diárias Ativas (Adeus Cards) -->
          <div class="missions-section">
            <div class="section-header-compact">
              <h3>🎯 Missões do Dia</h3>
              <span>3 passos práticos para avançar no Módulo 1</span>
            </div>

            <div class="missions-grid">
              <!-- Mission 1: Gender Sorting -->
              <div class="mission-card">
                <div class="mission-card-top">
                  <div class="mission-icon-box">👨/👩</div>
                  <div class="mission-text-box">
                    <h4>Separação de Gênero M vs F</h4>
                    <p>Classifique substantivos pelas desinências (-as, -is, -a, -ė) na mecânica ativa.</p>
                  </div>
                </div>
                <div class="mission-card-footer">
                  <span class="mission-xp-tag">+15 XP</span>
                  <button class="btn btn-secondary mission-action-btn" data-target-tab="exercises" data-target-mode="gender-sorting">
                    Treinar Gênero
                  </button>
                </div>
              </div>

              <!-- Mission 2: Case Snapping (Kur?) -->
              <div class="mission-card">
                <div class="mission-card-top">
                  <div class="mission-icon-box">📍</div>
                  <div class="mission-text-box">
                    <h4>Encaixe do Locativo (Kur?)</h4>
                    <p>Encaixe desinências de lugar (-e, -uje, -yje, -oje, -ėje) sem usar preposições.</p>
                  </div>
                </div>
                <div class="mission-card-footer">
                  <span class="mission-xp-tag">+20 XP</span>
                  <button class="btn btn-secondary mission-action-btn" data-target-tab="exercises" data-target-mode="case-snapping">
                    Treinar Locativo
                  </button>
                </div>
              </div>

              <!-- Mission 3: Situational Roleplay -->
              <div class="mission-card">
                <div class="mission-card-top">
                  <div class="mission-icon-box">💬</div>
                  <div class="mission-text-box">
                    <h4>Simulação em Vilnius</h4>
                    <p>Interaja no diálogo guiado com escolhas reais e feedback da prova oral.</p>
                  </div>
                </div>
                <div class="mission-card-footer">
                  <span class="mission-xp-tag">+35 XP</span>
                  <button class="btn btn-secondary mission-action-btn" data-target-tab="dialogues">
                    Iniciar Diálogo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mini Stats Grid -->
          <div class="stats-mini-grid">
            <div class="mini-stat-card">
              <span class="mini-stat-label">Vocabulário Ativo</span>
              <span class="mini-stat-val">${totalWords}</span>
              <span class="mini-stat-sub">${masteredWords} masterizados • ${learningWords} em treino</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Meta Diária de XP</span>
              <span class="mini-stat-val">${progress.xp || 0} / ${progress.dailyGoal || 50}</span>
              <span class="mini-stat-sub">${progress.dailyGoal - (progress.xp || 0) > 0 ? `${progress.dailyGoal - (progress.xp || 0)} XP restantes` : 'Meta diária alcançada! 🎉'}</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Palavras na Memória</span>
              <span class="mini-stat-val">${masteredWords}</span>
              <span class="mini-stat-sub">Fixação sólida de longo prazo</span>
            </div>
            <div class="mini-stat-card">
              <span class="mini-stat-label">Foco Pedagógico</span>
              <span class="mini-stat-val">A1 ➔ A2</span>
              <span class="mini-stat-sub">Categoria I oficial</span>
            </div>
          </div>

          <!-- Milestone Progress Bar -->
          <div class="progress-section">
            <div class="progress-header">
              <div class="progress-title-group">
                <h3>Progresso Rumo à Categoria I</h3>
                <p class="stat-desc" style="margin-top: 0.25rem;">Consolidação do vocabulário e estruturas da prova</p>
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

        <!-- 2. Proficiency Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'proficiency' ? 'active' : ''}">
          <div>
            <h2 class="section-title">📊 Casos Gramaticais Essenciais</h2>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: -0.5rem; margin-bottom: 1.25rem;">
              Sua retenção nos 4 casos gramaticais mais cobrados no dia a dia lituano:
            </p>
            <div class="horizontal-scroll">
              ${casesReport.map(item => `
                <div class="heatmap-card" style="--card-color: hsl(${item.hue}, 80%, 45%)">
                  <div class="heatmap-meta">
                    <span class="heatmap-name">${item.name}</span>
                    <span style="font-weight: 700; color: var(--text-primary);">${item.score}%</span>
                  </div>
                  <div class="heatmap-bar-container">
                    <div class="heatmap-bar-fill" style="width: ${item.score}%"></div>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${item.count} palavras catalogadas</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-top: 2.5rem;">
            <h2 class="section-title">🏆 Matriz de Competências (Categoria I)</h2>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: -0.5rem; margin-bottom: 1.25rem;">
              Habilidades comunicativas exigidas no exame oficial. Marque conforme ganhar confiança:
            </p>
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
                        <div style="width: ${comp.pct}%; height: 100%; background: ${isChecked ? 'var(--secondary)' : 'var(--primary)'}; border-radius: 2px; transition: width 0.5s;"></div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- 3. Schedule Tab -->
        <div class="dashboard-tab-content ${this.activeTab === 'schedule' ? 'active' : ''}">
          <h2 class="section-title">📅 Cronograma de Estudos (12 Semanas)</h2>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: -0.5rem; margin-bottom: 1.25rem;">
            Sua trilha pedagógica passo a passo para a Categoria I:
          </p>
          <div class="schedule-list">
            ${weeksSchedule.map(wk => {
              const isExpanded = this.activeWeekAccordion === wk.wk;
              return `
                <div class="schedule-item">
                  <div class="schedule-header" data-week-id="${wk.wk}">
                    <div class="schedule-header-left">
                      <span class="schedule-week-badge">Sem. ${wk.wk}</span>
                      <span style="font-weight: 600; color: var(--text-primary);">${wk.title}</span>
                    </div>
                    <span style="color: var(--text-muted); font-size: 1.2rem;">${isExpanded ? '▼' : '▶'}</span>
                  </div>
                  <div class="schedule-body ${isExpanded ? 'active' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">
                      <div style="flex: 1; min-width: 200px;">
                        <h4 style="color: var(--primary-hover); margin-bottom: 0.25rem; font-size: 0.9rem;">Tema do Conteúdo:</h4>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.75rem;">${wk.content}</p>
                        <h4 style="color: var(--secondary); margin-bottom: 0.25rem; font-size: 0.9rem;">Prática Recomendada:</h4>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">${wk.practice}</p>
                      </div>
                      <div style="flex-shrink: 0;">
                        <button class="btn btn-primary study-week-btn" data-target-tab="${wk.target}">
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

    // Hero Continue Study button
    const heroBtn = document.getElementById('hero-continue-study');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => {
        navigateCallback('lessons');
      });
    }

    // Mission Action buttons
    document.querySelectorAll('.mission-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.targetTab;
        const targetMode = btn.dataset.targetMode;
        if (targetTab) {
          navigateCallback(targetTab, targetMode ? { mode: targetMode } : null);
        }
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
