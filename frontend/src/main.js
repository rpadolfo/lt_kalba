import './style.css';
import { db } from './data/mockData.js';
import { dbService } from './services/db.js';
import { DashboardView } from './views/DashboardView.js';
import { LessonsView } from './views/LessonsView.js';
import { DialoguesView } from './views/DialoguesView.js';
import { VocabularyView } from './views/VocabularyView.js';
import { ExercisesView } from './views/ExercisesView.js';
import { ReferenceView } from './views/ReferenceView.js';
import { ManageContentView } from './views/ManageContentView.js';

// SPA Router State
let currentTab = 'dashboard';
let currentFilterOptions = null;

const VIEWS = {
  dashboard: DashboardView,
  lessons: LessonsView,
  exercises: ExercisesView,
  dialogues: DialoguesView,
  reference: ReferenceView,
  manage: ManageContentView,
  vocabulary: VocabularyView // Retained for backwards compatibility
};

function renderLayout() {
  const appContainer = document.querySelector('#app');
  const progress = dbService.getProgress();

  appContainer.innerHTML = `
    <!-- Top Mobile Header (visible only on <= 768px) -->
    <header class="mobile-top-header">
      <div class="mobile-header-brand">
        <div class="logo-icon">LT</div>
        <span class="logo-text">LT Kalba</span>
      </div>
      
      <div class="mobile-header-actions">
        <div class="mobile-streak-pill" title="Dias seguidos">
          <span class="streak-flame">🔥</span>
          <span class="streak-num">${progress.streak || 0}</span>
        </div>

        <button class="header-action-btn ${currentTab === 'reference' ? 'active' : ''}" data-target="reference" title="Žinynas (Guia de Referência)">
          <span>📚</span>
          <span class="header-btn-text">Žinynas</span>
        </button>

        <button class="header-action-btn ${currentTab === 'manage' ? 'active' : ''}" data-target="manage" title="Redigir / Gerenciar Conteúdo">
          <span>✍️</span>
          <span class="header-btn-text">Redigir</span>
        </button>
      </div>
    </header>

    <!-- Desktop Sidebar Navigation (hidden on mobile) -->
    <aside class="sidebar desktop-sidebar">
      <div class="logo-container">
        <div class="logo-icon">LT</div>
        <span class="logo-text">LT Kalba</span>
      </div>
      
      <nav>
        <ul class="nav-links">
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'dashboard' ? 'active' : ''}" data-target="dashboard">
              <span class="nav-icon">📊</span>
              <span>Início</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'lessons' ? 'active' : ''}" data-target="lessons">
              <span class="nav-icon">📖</span>
              <span>Lições</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'exercises' ? 'active' : ''}" data-target="exercises">
              <span class="nav-icon">📝</span>
              <span>Treino</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'dialogues' ? 'active' : ''}" data-target="dialogues">
              <span class="nav-icon">💬</span>
              <span>Diálogos</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'reference' ? 'active' : ''}" data-target="reference">
              <span class="nav-icon">📚</span>
              <span>Žinynas</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'manage' ? 'active' : ''}" data-target="manage">
              <span class="nav-icon">✍️</span>
              <span>Redigir</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer">
        <div class="streak-badge">
          <span class="streak-flame">🔥</span>
          <div>
            <div style="font-weight: 700; color: white;">Ofensiva</div>
            <div class="streak-label" style="font-size: 0.85rem; color: var(--text-secondary);">${progress.streak || 0} dias seguidos</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content" id="main-view-area">
      <!-- Active view will be rendered here -->
    </main>

    <!-- Mobile Bottom Navigation Bar (4 essential learning tabs in PT-BR) -->
    <nav class="mobile-bottom-nav">
      <button class="bottom-nav-btn ${currentTab === 'dashboard' ? 'active' : ''}" data-target="dashboard">
        <span class="bottom-nav-icon">📊</span>
        <span class="bottom-nav-label">Início</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'lessons' ? 'active' : ''}" data-target="lessons">
        <span class="bottom-nav-icon">📖</span>
        <span class="bottom-nav-label">Lições</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'exercises' ? 'active' : ''}" data-target="exercises">
        <span class="bottom-nav-icon">📝</span>
        <span class="bottom-nav-label">Treino</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'dialogues' ? 'active' : ''}" data-target="dialogues">
        <span class="bottom-nav-icon">💬</span>
        <span class="bottom-nav-label">Diálogos</span>
      </button>
    </nav>
  `;

  // Bind All Navigation Click Events (Sidebar, Mobile Header, Bottom Nav)
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      navigate(target);
    });
  });

  // Render the initial active view
  renderActiveView();
}

function renderActiveView() {
  const mainViewArea = document.querySelector('#main-view-area');
  if (!mainViewArea) return;

  const ViewComponent = VIEWS[currentTab] || DashboardView;

  // Render view HTML
  mainViewArea.innerHTML = ViewComponent.render(currentFilterOptions);

  // Bind events and lifecycle hooks for the rendered view
  if (typeof ViewComponent.setup === 'function') {
    ViewComponent.setup(navigate, forceRender);
  }

  // Update document title for context
  const titles = {
    dashboard: 'LT Kalba - Jornada de Estudo',
    lessons: 'LT Kalba - Trilha de Lições (Módulo 1)',
    exercises: 'LT Kalba - Hub de Treino Ativo',
    dialogues: 'LT Kalba - Diálogos Situacionais',
    reference: 'LT Kalba - Žinynas (Guia de Referência)',
    manage: 'LT Kalba - Redigir Conteúdo',
    vocabulary: 'LT Kalba - Vocabulário'
  };
  document.title = titles[currentTab] || 'LT Kalba';
}

function updateActiveNavClasses() {
  // Update desktop sidebar buttons
  document.querySelectorAll('.sidebar .nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === currentTab);
  });

  // Update mobile bottom nav buttons
  document.querySelectorAll('.mobile-bottom-nav .bottom-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === currentTab);
  });

  // Update mobile top header action buttons
  document.querySelectorAll('.mobile-top-header .header-action-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === currentTab);
  });
}

function navigate(tabName, options = null) {
  if (VIEWS[tabName]) {
    currentTab = tabName;
    currentFilterOptions = options;
    
    // Update active visual classes across headers and navigation
    updateActiveNavClasses();

    // Render new view
    renderActiveView();

    // Reset window scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function forceRender() {
  renderActiveView();
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', async () => {
  await dbService.init();
  await dbService.updateStreak();
  renderLayout();
});
