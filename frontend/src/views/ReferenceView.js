// Reference View (Žinynas) displaying the Alphabet (Abėcėlė) and Noun/Verb reference tables.
import { ALPHABET_DATA, DECLENSIONS_DATA } from '../data/referenceData.js';
import { morphologyService } from '../services/morphologyService.js';

export const ReferenceView = {
  alphabet: ALPHABET_DATA,
  declensions: DECLENSIONS_DATA,
  activeSubTab: "alphabet", // "alphabet", "declensions", "verbs"

  render() {
    let tabContent = "";
    if (this.activeSubTab === "alphabet") {
      tabContent = this.renderAlphabetTab();
    } else if (this.activeSubTab === "declensions") {
      tabContent = this.renderDeclensionsTab();
    } else {
      tabContent = this.renderVerbsTab();
    }

    return `
      <style>
        .reference-subnav {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .reference-subnav::-webkit-scrollbar {
          display: none;
        }
        .ref-tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 8px;
          transition: var(--transition-fast);
          white-space: nowrap;
        }
        .ref-tab-btn:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.03);
        }
        .ref-tab-btn.active {
          color: var(--primary-hover);
          background-color: var(--primary-glow);
        }
        
        /* Alphabet Grid */
        .alphabet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .alphabet-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition-smooth);
        }
        .alphabet-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-premium);
        }
        .letter-glyph {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          font-family: var(--font-heading);
        }
        .letter-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        
        /* Reference tables */
        .reference-table-wrapper {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: var(--shadow-premium);
          margin-bottom: 1.5rem;
        }
        .reference-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 480px;
        }
        .reference-table th {
          background-color: rgba(255,255,255,0.02);
          border-bottom: 2px solid var(--border-color);
          padding: 8px 12px;
          color: white;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .reference-table td {
          border-bottom: 1px solid var(--border-color);
          padding: 8px 12px;
          color: var(--text-secondary);
          vertical-align: middle;
          font-size: 0.9rem;
        }
        .reference-table tr:last-child td {
          border-bottom: none;
        }
        .reference-table code {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--primary-hover);
          padding: 3px 6px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.9rem;
        }

        .clickable-word {
          cursor: pointer;
          border-bottom: 1.5px dashed rgba(139, 92, 246, 0.6);
          display: inline-block;
          transition: var(--transition-fast);
          padding: 0 2px;
        }
        .clickable-word:hover, .clickable-word:active {
          color: var(--primary-hover);
          background-color: rgba(139, 92, 246, 0.15);
          border-radius: 3px;
        }
      </style>

      <div class="view reference-view">
        <h1 class="view-title">Žinynas (Guia de Referência)</h1>
        <p class="view-subtitle">Guia rápido de fonética, declinações de substantivos e regras verbais do lituano A1/A2.</p>
        
        <div class="reference-subnav">
          <button class="ref-tab-btn ${this.activeSubTab === 'alphabet' ? 'active' : ''}" data-ref-tab="alphabet">Abėcėlė (Alfabeto)</button>
          <button class="ref-tab-btn ${this.activeSubTab === 'declensions' ? 'active' : ''}" data-ref-tab="declensions">Declinações</button>
          <button class="ref-tab-btn ${this.activeSubTab === 'verbs' ? 'active' : ''}" data-ref-tab="verbs">Verbos no Presente</button>
        </div>

        <div class="reference-tab-content">
          ${tabContent}
        </div>
      </div>

      <!-- Backdrop for Bottom Sheet -->
      <div id="ref-sheet-backdrop" class="bottom-sheet-backdrop"></div>

      <!-- Morphological Bottom Sheet Drawer -->
      <div id="ref-bottom-sheet" class="bottom-sheet" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="bottom-sheet-handle"></div>
        <div class="bottom-sheet-header">
          <div class="bottom-sheet-title-group">
            <span class="bottom-sheet-word" id="ref-sheet-word">Žodis</span>
            <span class="bottom-sheet-badge" id="ref-sheet-case">Forma</span>
          </div>
          <button class="bottom-sheet-close-btn" id="ref-sheet-close-btn" aria-label="Fechar gaveta">✕</button>
        </div>
        
        <div class="bottom-sheet-content">
          <div class="sheet-info-grid">
            <div class="sheet-info-card">
              <span class="sheet-label">Lema (Dicionário)</span>
              <span class="sheet-val" id="ref-sheet-lemma">-</span>
            </div>
            <div class="sheet-info-card">
              <span class="sheet-label">Classe / Gênero</span>
              <span class="sheet-val" id="ref-sheet-type">-</span>
            </div>
            <div class="sheet-info-card sheet-translation-card">
              <span class="sheet-label">Tradução em Português</span>
              <span class="sheet-val sheet-translation" id="ref-sheet-translation">-</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderAlphabetTab() {
    return `
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
        Tabela oficial de letras e nomes fonéticos do alfabeto lituano:
      </p>

      <div class="alphabet-grid">
        ${this.alphabet.map(item => `
          <div class="alphabet-card">
            <span class="letter-glyph">${item.letter}</span>
            <span class="letter-name">${item.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderDeclensionsTab() {
    return `
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
        Terminações essenciais de substantivos para o nível A1/A2 da Categoria I:
      </p>

      <h3 style="font-family: var(--font-heading); color: white; margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.25rem;">
        Singular (Vienaskaita)
      </h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 25%">Caso</th>
              <th style="width: 25%">Masc. (-as, -is, -ys, -ius)</th>
              <th style="width: 25%">Fem. (-a, -ė)</th>
              <th style="width: 25%">Uso Prático</th>
            </tr>
          </thead>
          <tbody>
            ${this.declensions.singular.map(row => `
              <tr>
                <td><b>${row.case}</b></td>
                <td><code>${row.m_suffix}</code></td>
                <td><code>${row.f_suffix}</code></td>
                <td>${row.usage}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <h3 style="font-family: var(--font-heading); color: white; margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.25rem;">
        Plural (Daugiskaita)
      </h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 30%">Caso</th>
              <th style="width: 35%">Terminações Plurais</th>
              <th style="width: 35%">Uso Prático</th>
            </tr>
          </thead>
          <tbody>
            ${this.declensions.plural.map(row => `
              <tr>
                <td><b>${row.case}</b></td>
                <td><code>${row.suffix}</code></td>
                <td>${row.usage}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderVerbsTab() {
    return `
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
        Conjugação no presente dos 3 verbos estruturais da Categoria I. Toque em qualquer forma conjugada para abrir a análise:
      </p>

      <h3 style="font-family: var(--font-heading); color: white; margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.25rem;">
        Verbo BŪTI (Ser / Estar) • Irregular
      </h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 30%">Pronome</th>
              <th style="width: 35%">Forma em Lituano</th>
              <th style="width: 35%">Significado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><b>aš</b> (eu)</td><td><code><span class="clickable-word" data-word="esu">esu</span></code></td><td>sou / estou</td></tr>
            <tr><td><b>tu</b> (tu/você)</td><td><code><span class="clickable-word" data-word="esi">esi</span></code></td><td>és / estás</td></tr>
            <tr><td><b>jis / ji</b> (ele/ela)</td><td><code><span class="clickable-word" data-word="yra">yra</span></code></td><td>é / está</td></tr>
            <tr><td><b>mes</b> (nós)</td><td><code><span class="clickable-word" data-word="esame">esame</span></code></td><td>somos / estamos</td></tr>
            <tr><td><b>jūs</b> (vocês)</td><td><code><span class="clickable-word" data-word="esate">esate</span></code></td><td>sois / estais</td></tr>
            <tr><td><b>jie / jos</b> (eles/elas)</td><td><code><span class="clickable-word" data-word="yra">yra</span></code></td><td>são / estão</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style="font-family: var(--font-heading); color: white; margin-top: 2rem; margin-bottom: 0.75rem; font-size: 1.25rem;">
        Verbos Regulares: 1ª Conjugação (-a)
      </h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 25%">Pronome</th>
              <th style="width: 25%">Sufixo</th>
              <th style="width: 25%">dirbti (trabalhar)</th>
              <th style="width: 25%">gyventi (morar)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><b>aš</b></td><td><code>-u</code></td><td><code><span class="clickable-word" data-word="dirbu">dirbu</span></code></td><td><code><span class="clickable-word" data-word="gyvenu">gyvenu</span></code></td></tr>
            <tr><td><b>tu</b></td><td><code>-i</code></td><td><code><span class="clickable-word" data-word="dirbi">dirbi</span></code></td><td><code><span class="clickable-word" data-word="gyveni">gyveni</span></code></td></tr>
            <tr><td><b>jis / ji</b></td><td><code>-a</code></td><td><code><span class="clickable-word" data-word="dirba">dirba</span></code></td><td><code><span class="clickable-word" data-word="gyvena">gyvena</span></code></td></tr>
            <tr><td><b>mes</b></td><td><code>-ame</code></td><td><code><span class="clickable-word" data-word="dirbame">dirbame</span></code></td><td><code><span class="clickable-word" data-word="gyvename">gyvename</span></code></td></tr>
            <tr><td><b>jūs</b></td><td><code>-ate</code></td><td><code><span class="clickable-word" data-word="dirbate">dirbate</span></code></td><td><code><span class="clickable-word" data-word="gyvenate">gyvenate</span></code></td></tr>
            <tr><td><b>jie / jos</b></td><td><code>-a</code></td><td><code><span class="clickable-word" data-word="dirba">dirba</span></code></td><td><code><span class="clickable-word" data-word="gyvena">gyvena</span></code></td></tr>
          </tbody>
        </table>
      </div>
    `;
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Tab switches
    document.querySelectorAll('[data-ref-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeSubTab = btn.dataset.refTab;
        forceRenderCallback();
      });
    });

    // 2. Bottom Sheet Interactivity
    const bottomSheet = document.getElementById('ref-bottom-sheet');
    const backdrop = document.getElementById('ref-sheet-backdrop');
    const closeBtn = document.getElementById('ref-sheet-close-btn');

    const closeSheet = () => {
      if (bottomSheet && backdrop) {
        bottomSheet.classList.remove('open');
        backdrop.classList.remove('open');
        bottomSheet.setAttribute('aria-hidden', 'true');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeSheet);
    if (backdrop) backdrop.addEventListener('click', closeSheet);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSheet();
    });

    const clickableWords = document.querySelectorAll('.clickable-word');
    clickableWords.forEach(wordSpan => {
      wordSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        const result = morphologyService.analyzeWord(word);
        
        const wordEl = document.getElementById('ref-sheet-word');
        const caseEl = document.getElementById('ref-sheet-case');
        const lemmaEl = document.getElementById('ref-sheet-lemma');
        const typeEl = document.getElementById('ref-sheet-type');
        const transEl = document.getElementById('ref-sheet-translation');

        if (wordEl) wordEl.textContent = result.word;
        if (lemmaEl) lemmaEl.textContent = result.lemma;
        
        if (caseEl) {
          const isNominative = result.case.includes("Nominativo") || result.case.includes("Infinitivo");
          const badgeColor = isNominative ? "rgba(139, 92, 246, 0.2)" : "rgba(16, 185, 129, 0.2)";
          const textColor = isNominative ? "var(--primary-hover)" : "var(--success)";
          
          caseEl.textContent = result.case;
          caseEl.style.backgroundColor = badgeColor;
          caseEl.style.color = textColor;
        }
        
        if (typeEl) {
          typeEl.textContent = `${result.type} ${result.gender !== 'N/A' ? '(' + result.gender + ')' : ''}`;
        }
        if (transEl) {
          transEl.textContent = result.translation;
        }
        
        if (bottomSheet && backdrop) {
          bottomSheet.classList.add('open');
          backdrop.classList.add('open');
          bottomSheet.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }
};
