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
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }
        .ref-tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          transition: var(--transition-fast);
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
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .alphabet-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1rem;
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
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
          font-family: var(--font-heading);
        }
        .letter-name {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
        }
        .letter-speak {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .letter-speak:hover {
          color: var(--primary-hover);
          transform: scale(1.15);
        }
        
        /* Reference tables */
        .reference-table-wrapper {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow-x: auto;
          box-shadow: var(--shadow-premium);
          margin-bottom: 2rem;
        }
        .reference-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 500px;
        }
        .reference-table th {
          background-color: rgba(255,255,255,0.02);
          border-bottom: 2px solid var(--border-color);
          padding: 8px 12px;
          color: white;
          font-weight: 600;
        }
        .reference-table td {
          border-bottom: 1px solid var(--border-color);
          padding: 8px 12px;
          color: var(--text-secondary);
          vertical-align: middle;
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
          font-size: 0.95rem;
        }

        /* Tooltip and Clickable word */
        .clickable-word {
          cursor: pointer;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.35);
          display: inline-block;
          transition: var(--transition-fast);
        }
        .clickable-word:hover {
          color: var(--primary-hover);
          border-bottom-color: var(--primary-hover);
          background-color: rgba(139, 92, 246, 0.08);
          border-radius: 3px;
        }
        
        /* Glassmorphism Morphological Tooltip */
        .morph-tooltip {
          position: absolute;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          max-width: 280px;
          color: white;
          font-size: 0.9rem;
          animation: tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: none;
        }
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tooltip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.5rem;
        }
        .tooltip-word {
          font-weight: 700;
          color: var(--primary-hover);
          font-size: 1.15rem;
        }
        .tooltip-row {
          margin-bottom: 0.5rem;
        }
        .tooltip-label {
          color: var(--text-secondary);
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
        }
        .tooltip-value {
          font-weight: 500;
          color: white;
        }
        .tooltip-badge {
          background-color: var(--primary-glow);
          color: var(--primary-hover);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
          margin-top: 2px;
        }
      </style>

      <div class="view reference-view">
        <h1 class="view-title">Žinynas (Guia de Referência)</h1>
        <p class="view-subtitle">Guia rápido de fonética, declinações de substantivos e regras verbais do lituano A1/A2.</p>
        
        <div class="reference-subnav">
          <button class="ref-tab-btn ${this.activeSubTab === 'alphabet' ? 'active' : ''}" data-ref-tab="alphabet">Abėcėlė (Alfabeto)</button>
          <button class="ref-tab-btn ${this.activeSubTab === 'declensions' ? 'active' : ''}" data-ref-tab="declensions">Declinação de Substantivos</button>
          <button class="ref-tab-btn ${this.activeSubTab === 'verbs' ? 'active' : ''}" data-ref-tab="verbs">Conjugação Verbal</button>
        </div>

        <div class="reference-tab-content">
          ${tabContent}
        </div>
      </div>

      <!-- Single reusable tooltip DOM structure -->
      <div id="word-analyzer-tooltip" class="morph-tooltip">
        <div class="tooltip-header">
          <span class="tooltip-word" id="tooltip-title">Vilniuje</span>
        </div>
        <div id="tooltip-body">
          <div class="tooltip-row">
            <div class="tooltip-label">Lema (Infinitivo/Nominativo)</div>
            <div class="tooltip-value" id="tooltip-lemma">Vilnius</div>
          </div>
          <div class="tooltip-row">
            <div class="tooltip-label">Tempo / Caso</div>
            <div class="tooltip-value" id="tooltip-case"><span class="tooltip-badge">Locativo (Kur?)</span></div>
          </div>
          <div class="tooltip-row">
            <div class="tooltip-label">Classe</div>
            <div class="tooltip-value" id="tooltip-type">Substantivo Masculino (M)</div>
          </div>
          <div class="tooltip-row" style="margin-bottom: 0;">
            <div class="tooltip-label">Tradução</div>
            <div class="tooltip-value" id="tooltip-translation" style="color: var(--success);">Vilnius (capital)</div>
          </div>
        </div>
      </div>
    `;
  },

  renderAlphabetTab() {
    return `
      <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
        Esta é a tabela de soletração e fonética da língua lituana. O domínio dos nomes das letras é útil para exercitar a <b>soletração (Paraidžiui)</b>.
      </p>
      
      <div class="alphabet-grid">
        ${this.alphabet.map(item => `
          <div class="alphabet-card">
            <div>
              <div class="letter-glyph">${item.letter}</div>
              <div class="letter-name">${item.name}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderDeclensionsTab() {
    return `
      <h3 style="color: white; margin-bottom: 0.75rem; font-family: var(--font-heading);">Declinações Singulares</h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 25%">Caso</th>
              <th style="width: 25%">Masculino (Sing.)</th>
              <th style="width: 25%">Feminino (Sing.)</th>
              <th style="width: 25%">Função Principal</th>
            </tr>
          </thead>
          <tbody>
            ${this.declensions.singular.map(row => `
              <tr>
                <td style="font-weight: 700; color: white;">${row.case}</td>
                <td><code>${row.m_suffix}</code></td>
                <td><code>${row.f_suffix}</code></td>
                <td>${row.usage}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <h3 style="color: white; margin-bottom: 0.75rem; font-family: var(--font-heading); margin-top: 2rem;">Declinações Plurais</h3>
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 30%">Caso</th>
              <th style="width: 35%">Terminação Plural</th>
              <th style="width: 35%">Função Principal</th>
            </tr>
          </thead>
          <tbody>
            ${this.declensions.plural.map(row => `
              <tr>
                <td style="font-weight: 700; color: white;">${row.case}</td>
                <td><code>${row.suffix}</code></td>
                <td>${row.usage}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="background-color: rgba(139, 92, 246, 0.04); border-left: 4px solid var(--primary); padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
        <h4 style="color: var(--primary-hover); margin-bottom: 0.25rem;">💡 Regra de Ouro do Genitivo Plural</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
          No plural, <b>todos</b> os substantivos lituanos de todos os gêneros e declinações terminam em <b>-ų</b> ou <b>-ių</b> no caso Genitivo (ex: <i>namai</i> -> <i>namų</i>, <i>kavos</i> -> <i>kavų</i>).
        </p>
      </div>
    `;
  },

  renderVerbsTab() {
    return `
      <h3 style="color: white; margin-bottom: 0.75rem; font-family: var(--font-heading);">Verbo Irregular BŪTI (Ser / Estar)</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">O principal verbo da língua lituana tem conjugação irregular no presente:</p>
      
      <div class="reference-table-wrapper" style="margin-bottom: 2rem;">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 50%">Pronome</th>
              <th style="width: 50%">Conjugação (Clique para traduzir)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><b>aš</b> (eu)</td><td><code><span class="clickable-word" data-word="esu">esu</span></code></td></tr>
            <tr><td><b>tu</b> (tu/você)</td><td><code><span class="clickable-word" data-word="esi">esi</span></code></td></tr>
            <tr><td><b>jis / ji</b> (ele/ela)</td><td><code><span class="clickable-word" data-word="yra">yra</span></code></td></tr>
            <tr><td><b>mes</b> (nós)</td><td><code><span class="clickable-word" data-word="esame">esame</span></code></td></tr>
            <tr><td><b>jūs</b> (vocês)</td><td><code><span class="clickable-word" data-word="esate">esate</span></code></td></tr>
            <tr><td><b>jie / jos</b> (eles/elas)</td><td><code><span class="clickable-word" data-word="yra">yra</span></code></td></tr>
          </tbody>
        </table>
      </div>

      <h3 style="color: white; margin-bottom: 0.75rem; font-family: var(--font-heading); margin-top: 2rem;">1ª Asmenuotė (Conjugação de Verbos Regulares)</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">Verbos regulares terminados em <b>-ti</b> (presente com raiz em -a-, como <i>dirbti</i>, <i>gyventi</i>, <i>suprasti</i>) seguem as seguintes desinências no presente:</p>
      
      <div class="reference-table-wrapper">
        <table class="reference-table">
          <thead>
            <tr>
              <th style="width: 25%">Pessoa</th>
              <th style="width: 25%">Desinência</th>
              <th style="width: 25%">dirbti</th>
              <th style="width: 25%">gyventi</th>
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

    // 2. Clickable word tooltip analyzer trigger
    const clickableWords = document.querySelectorAll('.clickable-word');
    const tooltip = document.getElementById('word-analyzer-tooltip');
    
    if (tooltip) {
      document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('clickable-word') && !tooltip.contains(e.target)) {
          tooltip.style.display = 'none';
        }
      });
    }

    clickableWords.forEach(wordSpan => {
      wordSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = wordSpan.dataset.word;
        
        const rect = wordSpan.getBoundingClientRect();
        const tooltipX = Math.max(10, Math.min(window.innerWidth - 300, rect.left + window.scrollX));
        const tooltipY = rect.bottom + window.scrollY + 8;
        
        tooltip.style.left = `${tooltipX}px`;
        tooltip.style.top = `${tooltipY}px`;
        tooltip.style.display = 'block';
        
        const result = morphologyService.analyzeWord(word);
        
        document.getElementById('tooltip-title').textContent = result.word;
        document.getElementById('tooltip-lemma').textContent = result.lemma;
        document.getElementById('tooltip-case').innerHTML = `<span class="tooltip-badge" style="background-color: rgba(139, 92, 246, 0.2); color: var(--primary-hover);">${result.case}</span>`;
        document.getElementById('tooltip-type').textContent = `${result.type} ${result.gender !== 'N/A' ? '(' + result.gender + ')' : ''}`;
        document.getElementById('tooltip-translation').textContent = result.translation;
      });
    });
  }
};
