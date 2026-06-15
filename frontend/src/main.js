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
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="logo-container">
        <div class="logo-icon">LT</div>
        <span class="logo-text">LT Kalba</span>
      </div>
      
      <nav>
        <ul class="nav-links">
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'dashboard' ? 'active' : ''}" data-target="dashboard">
              <span class="nav-icon">📊</span>
              <span>Mano Pažanga</span>
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
              <span>Pokalbiai</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'vocabulary' ? 'active' : ''}" data-target="vocabulary">
              <span class="nav-icon">🎴</span>
              <span>Kortelės</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-btn ${currentTab === 'exercises' ? 'active' : ''}" data-target="exercises">
              <span class="nav-icon">📝</span>
              <span>Pratimai</span>
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
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${progress.streak || 0} dias seguidos</div>
          </div>
        </div>
      </div>
    </aside>
    
    <!-- Main Content Area -->
    <main class="main-content" id="main-view-area">
      <!-- Active view will be rendered here -->
    </main>
  `;

  // Bind Sidebar Navigation Click Events
  document.querySelectorAll('.nav-btn').forEach(btn => {
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
    // 1. Render the HTML string from the view
    viewArea.innerHTML = activeView.render(currentFilterOptions);
    
    // 2. Clear filter option once read to prevent sticky filters on tab swaps
    currentFilterOptions = null;
    
    // 3. Set up listeners and interactivity
    activeView.setup(navigate, forceRenderActiveView);
  }
}

// Navigation Helper
function navigate(tabName, options = null) {
  if (VIEWS[tabName]) {
    currentTab = tabName;
    currentFilterOptions = options;
    
    // Update active state in Sidebar UI
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.target === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    renderActiveView();
  }
}

// Refresh callback for active view redraws (like clicking Next Card)
function forceRenderActiveView() {
  renderActiveView();
  
  // Also refresh sidebar progress streak just in case
  const progress = db.getProgress();
  const flameText = document.querySelector('.streak-badge div div:last-child');
  if (flameText) {
    flameText.textContent = `${progress.streak || 0} dias seguidos`;
  }
}

// Initialize SPA
document.addEventListener('DOMContentLoaded', () => {
  renderLayout();
});

// For situations where DOMContentLoaded already fired (Hot Module Replacement)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  renderLayout();
}
