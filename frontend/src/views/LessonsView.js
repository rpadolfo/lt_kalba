import { MODULE_1_LESSONS, MODULE_1_METADATA } from '../data/module1Data.js';

export const LessonsView = {
  activeLessonId: null,

  render() {
    if (this.activeLessonId !== null) {
      const lesson = MODULE_1_LESSONS.find(l => l.id === this.activeLessonId);
      if (lesson) {
        return this.renderLessonReader(lesson);
      }
    }

    return this.renderLessonsList();
  },

  renderLessonsList() {
    return `
      <style>
        .lessons-header-box {
          margin-bottom: 2rem;
        }
        .module-banner {
          background: #18201B;
          border: 1px solid var(--border-color);
          border-left: 4px solid var(--primary);
          border-radius: var(--card-radius, 14px);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .module-banner-info h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .module-banner-info p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          margin: 0;
          line-height: 1.4;
        }
        .module-target-badge {
          font-size: 0.78rem;
          font-weight: 700;
          background: rgba(245, 158, 11, 0.15);
          color: var(--primary-hover);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 158, 11, 0.3);
          white-space: nowrap;
        }
        .lessons-list-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .lesson-card-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          transition: transform 0.15s ease, border-color 0.15s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .lesson-card-item:hover {
          border-color: var(--primary-base);
          transform: translateY(-2px);
        }
        .lesson-card-left {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          flex: 1;
          min-width: 280px;
        }
        .lesson-number-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #111614;
          border: 1px solid var(--border-color);
          border-bottom: 3px solid #141c17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--primary-hover);
          flex-shrink: 0;
        }
        .lesson-card-info {
          flex: 1;
        }
        .lesson-badge-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(16, 185, 129, 0.15);
          color: var(--secondary-hover);
          padding: 2px 7px;
          border-radius: 5px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          margin-bottom: 0.4rem;
        }
        .lesson-item-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 0.2rem;
        }
        .lesson-item-lt-title {
          font-size: 0.85rem;
          color: var(--primary-hover);
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .lesson-item-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.45;
          margin: 0;
        }
        .lesson-card-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-shrink: 0;
        }
      </style>

      <div class="view lessons-view" style="padding-bottom: 3rem;">
        <div class="lessons-header-box">
          <h1 class="view-title">Trilha do Módulo 1 (A1)</h1>
          <p class="view-subtitle">Fundamentos gramaticais da língua lituana focados nas exigências práticas da Categoria I.</p>
        </div>

        <!-- Module 1 Overview Banner -->
        <div class="module-banner">
          <div class="module-banner-info">
            <h3>${MODULE_1_METADATA.title}</h3>
            <p>${MODULE_1_METADATA.subtitle}</p>
          </div>
          <span class="module-target-badge">${MODULE_1_METADATA.targetExam.split('-')[0].trim()}</span>
        </div>

        <!-- 5 Lessons List -->
        <div class="lessons-list-grid">
          ${MODULE_1_LESSONS.map(lesson => {
            const practiceMode = lesson.order === 1 ? 'gender-sorting' : (lesson.order === 3 || lesson.order === 4) ? 'case-snapping' : 'sentence-builder';
            return `
              <div class="lesson-card-item">
                <div class="lesson-card-left">
                  <div class="lesson-number-circle">${lesson.order}</div>
                  <div class="lesson-card-info">
                    <span class="lesson-badge-tag">${lesson.badge}</span>
                    <h2 class="lesson-item-title">${lesson.title}</h2>
                    <div class="lesson-item-lt-title">${lesson.lithuanianTitle}</div>
                    <p class="lesson-item-desc">${lesson.description}</p>
                  </div>
                </div>

                <div class="lesson-card-actions">
                  <button class="btn btn-secondary read-lesson-btn" data-lesson-id="${lesson.id}">
                    Ler Teoria 📖
                  </button>
                  <button class="btn btn-primary start-lesson-practice-btn" data-practice-mode="${practiceMode}">
                    Praticar ⚡
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  renderLessonReader(lesson) {
    const practiceMode = lesson.order === 1 ? 'gender-sorting' : (lesson.order === 3 || lesson.order === 4) ? 'case-snapping' : 'sentence-builder';
    const theoryHtml = this.buildTheoryHtml(lesson);

    return `
      <style>
        .lesson-reader-container {
          max-width: 820px;
          margin: 0 auto;
          padding-bottom: 3rem;
        }
        .reader-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .reader-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--card-radius, 14px);
          padding: 2rem;
          box-shadow: var(--shadow-premium);
        }
        @media (max-width: 600px) {
          .reader-card {
            padding: 1.25rem;
          }
        }
        .reader-header {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .reader-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(245, 158, 11, 0.15);
          color: var(--primary-hover);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(245, 158, 11, 0.3);
          margin-bottom: 0.75rem;
        }
        .reader-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 0.35rem;
        }
        .reader-lt-title {
          font-size: 1rem;
          color: var(--primary-hover);
          font-style: italic;
          margin-bottom: 1rem;
        }
        .reader-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.5;
          border-left: 3px solid var(--primary);
          padding-left: 1rem;
          margin: 0;
        }

        /* Grammar Boxes & Tables */
        .grammar-box {
          background: #111614;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          margin: 1.25rem 0;
        }
        .grammar-box-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .grammar-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.75rem;
          font-size: 0.9rem;
        }
        .grammar-table th, .grammar-table td {
          padding: 8px 12px;
          border-bottom: 1px solid var(--border-color);
          text-align: left;
        }
        .grammar-table th {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.02);
        }
        .grammar-table td {
          color: var(--text-primary);
        }

        .sentence-card-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .sentence-card {
          background: #111614;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.85rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .sentence-lt {
          font-weight: 700;
          color: var(--primary-hover);
          font-size: 1.05rem;
        }
        .sentence-pt {
          color: var(--text-primary);
          font-size: 0.92rem;
        }
        .sentence-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-style: italic;
        }

        /* Reader Footer CTA */
        .reader-cta-footer {
          border-top: 1px solid var(--border-color);
          margin-top: 2.5rem;
          padding-top: 1.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      </style>

      <div class="view lesson-reader-view lesson-reader-container">
        <div class="reader-nav-bar">
          <button class="btn btn-secondary" id="back-to-lessons-list">
            ⬅️ Voltar para a Trilha
          </button>
          <span style="font-size: 0.85rem; color: var(--text-secondary);">
            Lição ${lesson.order} de 5
          </span>
        </div>

        <div class="reader-card">
          <div class="reader-header">
            <span class="reader-badge">${lesson.badge}</span>
            <h1 class="reader-title">${lesson.title}</h1>
            <div class="reader-lt-title">${lesson.lithuanianTitle}</div>
            <p class="reader-desc">${lesson.description}</p>
          </div>

          <div class="grammar-article-content">
            ${theoryHtml}
          </div>

          <div class="reader-cta-footer">
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">
                Pronto para fixar este conteúdo?
              </h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                Treine com mecânicas interativas sem precisar memorizar listas passivas.
              </p>
            </div>
            <button class="btn btn-primary start-lesson-practice-btn" data-practice-mode="${practiceMode}" style="padding: 0.9rem 1.75rem;">
              Praticar esta Lição Agora 🚀
            </button>
          </div>
        </div>
      </div>
    `;
  },

  buildTheoryHtml(lesson) {
    const t = lesson.theory;
    let html = `<p style="font-size: 1.02rem; line-height: 1.6; margin-bottom: 1.25rem;">${t.intro}</p>`;

    // Lesson 1: Masculine & Feminine
    if (t.masculineRules && t.feminineRules) {
      html += `
        <div class="grammar-box" style="border-left: 4px solid var(--primary);">
          <div class="grammar-box-title">${t.masculineRules.title}</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${t.masculineRules.rule}</p>
          <table class="grammar-table">
            <thead><tr><th>Terminação</th><th>Exemplos do Cotidiano</th></tr></thead>
            <tbody>
              ${t.masculineRules.endings.map(e => `
                <tr><td><code style="color: var(--primary-hover); font-weight: 800;">${e.ending}</code></td><td>${e.examples}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="grammar-box" style="border-left: 4px solid var(--secondary);">
          <div class="grammar-box-title">${t.feminineRules.title}</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${t.feminineRules.rule}</p>
          <table class="grammar-table">
            <thead><tr><th>Terminação</th><th>Exemplos do Cotidiano</th></tr></thead>
            <tbody>
              ${t.feminineRules.endings.map(e => `
                <tr><td><code style="color: var(--secondary-hover); font-weight: 800;">${e.ending}</code></td><td>${e.examples}</td></tr>
              `).join('')}
            </tbody>
          </table>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;">
            ⚠️ ${t.feminineRules.exceptionsNote}
          </p>
        </div>
      `;
    }

    // Lesson 2: Conjugation Table
    if (t.conjugationTable) {
      html += `
        <div class="grammar-box">
          <div class="grammar-box-title">Conjugação no Presente: BŪTI (Ser / Estar)</div>
          <table class="grammar-table">
            <thead>
              <tr><th>Pronome</th><th>Afirmativa</th><th>Negativa (com prefixo ne-)</th></tr>
            </thead>
            <tbody>
              ${t.conjugationTable.map(row => `
                <tr>
                  <td><b>${row.person}</b></td>
                  <td><code style="color: var(--primary-hover); font-weight: 700;">${row.affirmative}</code></td>
                  <td><code style="color: #fca5a5; font-weight: 700;">${row.negative}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="margin-top: 1rem; font-size: 0.88rem; color: var(--text-secondary);">
            ${t.negationRules.map(r => `<p style="margin-bottom: 0.4rem;">• ${r}</p>`).join('')}
          </div>
        </div>
      `;
    }

    // Lesson 3: Locative Transformation Rules
    if (t.transformationRules) {
      html += `
        <div class="grammar-box">
          <div class="grammar-box-title">📍 Regras de Desinência do Locativo (Vietininkas - Kur?)</div>
          <table class="grammar-table">
            <thead>
              <tr><th>Terminação Nominativa</th><th>Desinência do Locativo</th><th>Regra e Exemplos</th></tr>
            </thead>
            <tbody>
              ${t.transformationRules.map(r => `
                <tr>
                  <td><code style="font-weight: 700;">${r.nomEnding}</code></td>
                  <td><code style="color: var(--primary-hover); font-weight: 800;">${r.locEnding}</code></td>
                  <td>
                    <div><b>${r.ruleText}</b></div>
                    <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.25rem;">
                      ${r.examples.map(ex => `${ex.nom} ➔ <b style="color: var(--primary-hover);">${ex.loc}</b>`).join(' • ')}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Lesson 4: Action Verbs
    if (t.verbs) {
      html += `
        <div class="grammar-box">
          <div class="grammar-box-title">⚡ Verbos de Ação Essenciais da Categoria I</div>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.75rem;">
            ${t.verbs.map(v => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; flex-wrap: wrap;">
                  <div>
                    <b style="color: var(--primary-hover); font-size: 1.15rem;">${v.infinitive}</b>
                    <span style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 0.5rem;">(${v.translation})</span>
                  </div>
                  <span style="font-size: 0.78rem; color: var(--text-muted);">${v.type}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem; background: #111614; padding: 0.65rem; border-radius: 6px; font-size: 0.85rem;">
                  <div><span style="color: var(--text-muted);">aš:</span> <b>${v.forms['aš']}</b></div>
                  <div><span style="color: var(--text-muted);">tu:</span> <b>${v.forms['tu']}</b></div>
                  <div><span style="color: var(--text-muted);">jis/ji:</span> <b>${v.forms['jis/ji']}</b></div>
                  <div><span style="color: var(--text-muted);">mes:</span> <b>${v.forms['mes']}</b></div>
                  <div><span style="color: var(--text-muted);">jūs:</span> <b>${v.forms['jūs']}</b></div>
                  <div><span style="color: var(--text-muted);">jie/jos:</span> <b>${v.forms['jie/jos']}</b></div>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.5rem; font-style: italic;">
                  💡 Exemplo: ${v.sample}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Lesson 5: Magic Rule with Ar
    if (t.magicRule) {
      html += `
        <div class="grammar-box" style="border-left: 4px solid var(--primary);">
          <div class="grammar-box-title">A Regra de Ouro da Partícula 'AR'</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Afirmativa: <i>${t.magicRule.affirmative}</i>
          </p>
          <p style="font-size: 0.9rem; color: var(--primary-hover); font-weight: 700; margin-bottom: 0.75rem;">
            Interrogação: <i>${t.magicRule.interrogative}</i>
          </p>
          <div style="background: rgba(245, 158, 11, 0.1); border: 1px dashed var(--primary); padding: 0.75rem; border-radius: 8px; font-size: 0.88rem; color: var(--text-primary); font-weight: 600;">
            ${t.magicRule.ruleText}
          </div>
        </div>
      `;
    }

    // Model Sentences
    if (t.modelSentences && t.modelSentences.length > 0) {
      html += `
        <div style="margin-top: 1.75rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            Frases Modelo para o Exame da Categoria I
          </h3>
          <div class="sentence-card-list">
            ${t.modelSentences.map(s => `
              <div class="sentence-card">
                <span class="sentence-lt">${s.lt}</span>
                <span class="sentence-pt">${s.pt}</span>
                <span class="sentence-note">💡 ${s.note}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return html;
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Back button trigger
    const backBtn = document.getElementById('back-to-lessons-list');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activeLessonId = null;
        forceRenderCallback();
      });
    }

    // 2. Read Lesson triggers
    document.querySelectorAll('.read-lesson-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeLessonId = btn.dataset.lessonId;
        forceRenderCallback();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 3. Practice lesson triggers
    document.querySelectorAll('.start-lesson-practice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.practiceMode || 'gender-sorting';
        this.activeLessonId = null;
        navigateCallback('exercises', { mode: mode });
      });
    });
  }
};
