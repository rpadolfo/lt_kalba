import { LESSONS } from '../data/lessonsData.js';

export const LessonsView = {
  activeLessonId: null,

  render() {
    if (this.activeLessonId !== null) {
      const lesson = LESSONS.find(l => l.id === this.activeLessonId);
      if (lesson) {
        return this.renderLessonReader(lesson);
      }
    }

    return this.renderLessonsList();
  },

  renderLessonsList() {
    return `
      <div class="view lessons-view">
        <h1 class="view-title">Gramatikos Pamokos (Lições)</h1>
        <p class="view-subtitle">Aprenda a estrutura gramatical do lituano de forma resumida e simplificada antes de praticar.</p>

        <div class="lessons-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
          ${LESSONS.map(lesson => `
            <div class="stat-card" style="--gradient: linear-gradient(to right, #8b5cf6, #ec4899); justify-content: space-between; min-height: 250px;">
              <div>
                <span class="module-badge" style="margin-bottom: 0.75rem;">${lesson.badge}</span>
                <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: white; margin-bottom: 0.5rem; margin-top: 0.25rem;">
                  ${lesson.title}
                </h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  ${lesson.description}
                </p>
              </div>
              <button class="action-btn action-btn-primary read-lesson-btn" data-lesson-id="${lesson.id}" style="margin-top: 1.5rem; width: 100%; text-align: center;">
                Ler Explicação 📖
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderLessonReader(lesson) {
    return `
      <div class="view lesson-reader-view" style="max-width: 800px; margin: 0 auto; padding-bottom: 2rem;">
        <button class="action-btn action-btn-secondary" id="back-to-lessons-list" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
          ⬅️ Voltar para Lições
        </button>

        <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 2.5rem; box-shadow: var(--shadow-premium);">
          <span class="module-badge" style="margin-bottom: 1rem;">${lesson.badge}</span>
          <h1 style="font-family: var(--font-heading); font-size: 2.25rem; font-weight: 700; color: white; margin-bottom: 1rem; line-height: 1.2;">
            ${lesson.title}
          </h1>
          <p style="color: var(--text-secondary); font-size: 1.05rem; font-style: italic; border-left: 3px solid var(--primary); padding-left: 1rem; margin-bottom: 2rem; line-height: 1.5;">
            ${lesson.description}
          </p>

          <!-- Grammar Content Rich Injection -->
          <div class="grammar-article-content" style="color: var(--text-primary); line-height: 1.7; font-size: 1.025rem;">
            ${lesson.content}
          </div>

          <!-- Interactive Call to Action Footer -->
          <div style="border-top: 1px solid var(--border-color); margin-top: 3rem; padding-top: 2rem; text-align: center;">
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: white; margin-bottom: 0.5rem;">Pronto para praticar o que aprendeu?</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">Treine os termos desta lição na prática e fixe na memória!</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button class="action-btn action-btn-primary start-cards-practice" data-module-id="${lesson.moduleId}">
                Treinar Vocabulário 🎴
              </button>
              <button class="action-btn action-btn-secondary start-exercises-practice">
                Fazer Exercícios 📝
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
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
        const lessonId = btn.dataset.lessonId;
        this.activeLessonId = lessonId;
        forceRenderCallback();
        // Auto scroll reader to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 3. CTA practice redirect triggers
    const cardsPracticeBtn = document.querySelector('.start-cards-practice');
    if (cardsPracticeBtn) {
      cardsPracticeBtn.addEventListener('click', () => {
        const modId = parseInt(cardsPracticeBtn.dataset.moduleId);
        this.activeLessonId = null; // Reset reader state
        navigateCallback('vocabulary', modId);
      });
    }

    const exPracticeBtn = document.querySelector('.start-exercises-practice');
    if (exPracticeBtn) {
      exPracticeBtn.addEventListener('click', () => {
        this.activeLessonId = null; // Reset reader state
        navigateCallback('exercises');
      });
    }
  }
};
