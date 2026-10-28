import './style.css';
import { db } from './data/mockData.js';
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
  dialogues: DialoguesView,
  vocabulary: VocabularyView,
  exercises: ExercisesView,
  reference: ReferenceView,
  manage: ManageContentView
};

function renderLayout() {
  const appContainer = document.querySelector('#app');
  const progress = db.getProgress();

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
            <button class="nav-btn ${currentTab === 'dialogues' ? 'active' : ''}" data-target="dialogues">
              <span class="nav-icon">💬</span>
              <span>Diálogos</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'vocabulary' ? 'active' : ''}" data-target="vocabulary">
              <span class="nav-icon">🎴</span>
              <span>Cards</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'exercises' ? 'active' : ''}" data-target="exercises">
              <span class="nav-icon">📝</span>
              <span>Treino</span>
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

    <!-- Mobile Bottom Navigation Bar (5 core learning tabs in PT-BR) -->
    <nav class="mobile-bottom-nav">
      <button class="bottom-nav-btn ${currentTab === 'dashboard' ? 'active' : ''}" data-target="dashboard">
        <span class="bottom-nav-icon">📊</span>
        <span class="bottom-nav-label">Início</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'lessons' ? 'active' : ''}" data-target="lessons">
        <span class="bottom-nav-icon">📖</span>
        <span class="bottom-nav-label">Lições</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'dialogues' ? 'active' : ''}" data-target="dialogues">
        <span class="bottom-nav-icon">💬</span>
        <span class="bottom-nav-label">Diálogos</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'vocabulary' ? 'active' : ''}" data-target="vocabulary">
        <span class="bottom-nav-icon">🎴</span>
        <span class="bottom-nav-label">Cards</span>
      </button>
      <button class="bottom-nav-btn ${currentTab === 'exercises' ? 'active' : ''}" data-target="exercises">
        <span class="bottom-nav-icon">📝</span>
        <span class="bottom-nav-label">Treino</span>
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
  const viewArea = document.querySelector('#main-view-area');
  const activeView = VIEWS[currentTab];
  
  if (activeView) {
    viewArea.innerHTML = activeView.render(currentFilterOptions);
    currentFilterOptions = null;
    activeView.setup(navigate, forceRenderActiveView);
  }
}

// Navigation Helper
function navigate(tabName, options = null) {
  if (VIEWS[tabName]) {
    currentTab = tabName;
    currentFilterOptions = options;
    
    // Update active state across all buttons (Desktop sidebar, mobile header, mobile bottom nav)
    document.querySelectorAll('[data-target]').forEach(btn => {
      if (btn.dataset.target === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Scroll smoothly to top of main area
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    renderActiveView();
  }
}

// Refresh callback for active view redraws (like clicking Next Card)
function forceRenderActiveView() {
  renderActiveView();
  
  // Refresh streak indicator in both sidebar and mobile header
  const progress = db.getProgress();
  const streakText = document.querySelector('.streak-label');
  if (streakText) {
    streakText.textContent = `${progress.streak || 0} dias seguidos`;
  }
  const mobileStreakNum = document.querySelector('.streak-num');
  if (mobileStreakNum) {
    mobileStreakNum.textContent = `${progress.streak || 0}`;
  }
}

// Initialize SPA
document.addEventListener('DOMContentLoaded', () => {
  renderLayout();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  renderLayout();
}
