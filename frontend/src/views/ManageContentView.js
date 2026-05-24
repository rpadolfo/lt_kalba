import { db } from '../data/mockData.js';

export const ManageContentView = {
  activeTab: "vocab", // "vocab" or "conj"
  searchQuery: "",
  editingItemId: null, // null if adding new, id if editing
  
  // Local form state
  formValues: {
    // Vocab fields
    word: "",
    stressed: "",
    translation: "",
    type: "substantivo (M)",
    example: "",
    exampleTranslation: "",
    module: 1,
    
    // Conjugation fields
    verb: "",
    verbTranslation: "",
    as: "",
    tu: "",
    jisji: "",
    mes: "",
    jus: "",
    jiejos: ""
  },

  render() {
    const vocabList = db.getVocabulary();
    const conjList = db.getConjugations();
    
    // Filter lists by search query
    const filteredVocab = vocabList.filter(item => 
      item.word.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    const filteredConj = conjList.filter(item => 
      item.verb.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    let mainTableHtml = "";
    
    if (this.activeTab === "vocab") {
      mainTableHtml = `
        <table class="manager-table">
          <thead>
            <tr>
              <th>Palavra (LT)</th>
              <th>Pronúncia (Tônica)</th>
              <th>Tradução</th>
              <th>Tipo</th>
              <th>Mód.</th>
              <th>SRS</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${filteredVocab.length === 0 ? `
              <tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Nenhuma palavra encontrada.</td></tr>
            ` : filteredVocab.map(item => `
              <tr>
                <td style="font-weight: 600; color: white;">${item.word}</td>
                <td><code style="background-color: rgba(255,255,255,0.02);">${item.stressed}</code></td>
                <td>${item.translation}</td>
                <td><span class="module-badge" style="background-color: rgba(255,255,255,0.05); color: var(--text-secondary);">${item.type}</span></td>
                <td>M${item.module}</td>
                <td><span style="font-family: var(--font-mono); color: var(--primary-hover);">Lvl ${item.srsStage}</span></td>
                <td class="row-actions">
                  <button class="row-btn row-btn-edit" data-edit-vocab="${item.id}" title="Editar">✏️</button>
                  <button class="row-btn row-btn-del" data-del-vocab="${item.id}" title="Excluir">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      mainTableHtml = `
        <table class="manager-table">
          <thead>
            <tr>
              <th>Verbo</th>
              <th>Tradução</th>
              <th>Conjugações (aš, tu, jis, mes, jūs, jie)</th>
              <th>Mód.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${filteredConj.length === 0 ? `
              <tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum verbo conjugado encontrado.</td></tr>
            ` : filteredConj.map(item => `
              <tr>
                <td style="font-weight: 600; color: white; font-size: 1.05rem;">${item.verb}</td>
                <td>${item.translation}</td>
                <td>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.25rem; font-family: var(--font-mono);">
                    <span><b>aš:</b> ${item.forms.as}</span>
                    <span><b>tu:</b> ${item.forms.tu}</span>
                    <span><b>jis/ji:</b> ${item.forms.jisji}</span>
                    <span><b>mes:</b> ${item.forms.mes}</span>
                    <span><b>jūs:</b> ${item.forms.jus}</span>
                    <span><b>jie/jos:</b> ${item.forms.jiejos}</span>
                  </div>
                </td>
                <td>M${item.module}</td>
                <td class="row-actions">
                  <button class="row-btn row-btn-edit" data-edit-conj="${item.id}" title="Editar">✏️</button>
                  <button class="row-btn row-btn-del" data-del-conj="${item.id}" title="Excluir">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Side form card html
    const isEditing = this.editingItemId !== null;
    const formTitle = isEditing ? `Editar ${this.activeTab === 'vocab' ? 'Palavra' : 'Verbo'}` : `Adicionar ${this.activeTab === 'vocab' ? 'Palavra' : 'Verbo'}`;
    
    let formHtml = "";
    
    if (this.activeTab === "vocab") {
      formHtml = `
        <div class="form-group">
          <label>Palavra em Lituano (Sem acentos secundários)</label>
          <input type="text" class="form-control" id="form-word" placeholder="Ex: Labas" value="${this.formValues.word}" required />
        </div>
        <div class="form-group">
          <label>Acento de Pronúncia (Formato HTML)</label>
          <input type="text" class="form-control" id="form-stressed" placeholder="Ex: L&lt;span class=&quot;stressed&quot;&gt;a&lt;/span&gt;bas" value="${this.formValues.stressed}" required />
        </div>
        <div class="form-group">
          <label>Tradução para Português</label>
          <input type="text" class="form-control" id="form-translation" placeholder="Ex: Olá" value="${this.formValues.translation}" required />
        </div>
        <div class="form-group">
          <label>Tipo de Vocábulo</label>
          <select class="form-control" id="form-type">
            <option value="substantivo (M)" ${this.formValues.type === 'substantivo (M)' ? 'selected' : ''}>Substantivo Masculino (M)</option>
            <option value="substantivo (F)" ${this.formValues.type === 'substantivo (F)' ? 'selected' : ''}>Substantivo Feminino (F)</option>
            <option value="verbo" ${this.formValues.type === 'verbo' ? 'selected' : ''}>Verbo</option>
            <option value="adjetivo" ${this.formValues.type === 'adjetivo' ? 'selected' : ''}>Adjetivo</option>
            <option value="pronome" ${this.formValues.type === 'pronome' ? 'selected' : ''}>Pronome</option>
            <option value="expressão" ${this.formValues.type === 'expressão' ? 'selected' : ''}>Expressão</option>
          </select>
        </div>
        <div class="form-group">
          <label>Frase de Exemplo (Lituano)</label>
          <input type="text" class="form-control" id="form-example" placeholder="Opcional" value="${this.formValues.example}" />
        </div>
        <div class="form-group">
          <label>Tradução da Frase (Português)</label>
          <input type="text" class="form-control" id="form-example-translation" placeholder="Opcional" value="${this.formValues.exampleTranslation}" />
        </div>
        <div class="form-group">
          <label>Módulo</label>
          <select class="form-control" id="form-module">
            <option value="1" ${Number(this.formValues.module) === 1 ? 'selected' : ''}>Módulo 1 - Susipažinkime</option>
            <option value="2" ${Number(this.formValues.module) === 2 ? 'selected' : ''}>Módulo 2 - A Cidade e o País</option>
            <option value="3" ${Number(this.formValues.module) === 3 ? 'selected' : ''}>Módulo 3 - Família e Casa</option>
            <option value="4" ${Number(this.formValues.module) === 4 ? 'selected' : ''}>Módulo 4 - Comida e Bebida</option>
          </select>
        </div>
      `;
    } else {
      formHtml = `
        <div class="form-group">
          <label>Verbo Infinitivo</label>
          <input type="text" class="form-control" id="form-verb" placeholder="Ex: būti" value="${this.formValues.verb}" required />
        </div>
        <div class="form-group">
          <label>Tradução para Português</label>
          <input type="text" class="form-control" id="form-verb-translation" placeholder="Ex: ser / estar" value="${this.formValues.verbTranslation}" required />
        </div>
        <div class="form-group">
          <label>Módulo</label>
          <select class="form-control" id="form-module">
            <option value="1" ${Number(this.formValues.module) === 1 ? 'selected' : ''}>Módulo 1</option>
            <option value="2" ${Number(this.formValues.module) === 2 ? 'selected' : ''}>Módulo 2</option>
            <option value="3" ${Number(this.formValues.module) === 3 ? 'selected' : ''}>Módulo 3</option>
            <option value="4" ${Number(this.formValues.module) === 4 ? 'selected' : ''}>Módulo 4</option>
          </select>
        </div>
        
        <div style="border-top: 1px solid var(--border-color); margin: 1rem 0; padding-top: 1rem;">
          <h4 style="font-size: 0.85rem; color: var(--primary-hover); margin-bottom: 0.5rem; text-transform: uppercase;">Conjugações Presente:</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div class="form-group">
              <label>aš (eu)</label>
              <input type="text" class="form-control" id="form-as" placeholder="esu" value="${this.formValues.as}" required />
            </div>
            <div class="form-group">
              <label>tu (tu)</label>
              <input type="text" class="form-control" id="form-tu" placeholder="esi" value="${this.formValues.tu}" required />
            </div>
            <div class="form-group">
              <label>jis / ji (ele)</label>
              <input type="text" class="form-control" id="form-jisji" placeholder="yra" value="${this.formValues.jisji}" required />
            </div>
            <div class="form-group">
              <label>mes (nós)</label>
              <input type="text" class="form-control" id="form-mes" placeholder="esame" value="${this.formValues.mes}" required />
            </div>
            <div class="form-group">
              <label>jūs (vós)</label>
              <input type="text" class="form-control" id="form-jus" placeholder="esate" value="${this.formValues.jus}" required />
            </div>
            <div class="form-group">
              <label>jie / jos (eles)</label>
              <input type="text" class="form-control" id="form-jiejos" placeholder="yra" value="${this.formValues.jiejos}" required />
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="view manage-content-view">
        <h1 class="view-title">Redigir Conteúdo</h1>
        <p class="view-subtitle">Gerencie o vocabulário, adicione novos termos baseados nos livros de referência e edite dados de conjugações.</p>

        <!-- Search and Navigation Tabs -->
        <div class="manager-tabs">
          <button class="tab-btn ${this.activeTab === 'vocab' ? 'active' : ''}" id="tab-vocab">Vocabulário</button>
          <button class="tab-btn ${this.activeTab === 'conj' ? 'active' : ''}" id="tab-conj">Verbos & Conjugações</button>
        </div>

        <div class="manager-actions">
          <div class="search-bar">
            <input type="text" class="search-input" id="search-field" placeholder="Buscar por palavra, tradução..." value="${this.searchQuery}" />
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            Tabelas salvas no <code>localStorage</code>
          </div>
        </div>

        <div class="admin-grid">
          <!-- Left: Content Table -->
          <div class="table-wrapper">
            ${mainTableHtml}
          </div>

          <!-- Right: Ingestion/Editor Form Panel -->
          <div class="form-panel">
            <h3 class="form-title">${formTitle}</h3>
            <form class="editor-form" id="content-form">
              ${formHtml}
              <button type="submit" class="btn-form btn-form-submit">${isEditing ? 'Salvar Alterações' : 'Adicionar Item'}</button>
              ${isEditing ? `
                <button type="button" class="btn-form btn-form-cancel" id="btn-cancel-edit">Cancelar</button>
              ` : ''}
            </form>
          </div>
        </div>
      </div>
    `;
  },

  setup(navigateCallback, forceRenderCallback) {
    // 1. Tab switches
    const tabVocab = document.getElementById('tab-vocab');
    const tabConj = document.getElementById('tab-conj');
    
    if (tabVocab) {
      tabVocab.addEventListener('click', () => {
        if (this.activeTab !== 'vocab') {
          this.activeTab = 'vocab';
          this.editingItemId = null;
          this.clearForm();
          forceRenderCallback();
        }
      });
    }

    if (tabConj) {
      tabConj.addEventListener('click', () => {
        if (this.activeTab !== 'conj') {
          this.activeTab = 'conj';
          this.editingItemId = null;
          this.clearForm();
          forceRenderCallback();
        }
      });
    }

    // 2. Search typing filter
    const searchField = document.getElementById('search-field');
    if (searchField) {
      searchField.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        // Search filter works instantly without full redraw issues but we rerender tables
        // To maintain search focus, we don't full redrawn if we just update table but we do simple rerender
        // For standard setup we rerender, but we restore focus at the end of setup
        forceRenderCallback();
        const freshSearch = document.getElementById('search-field');
        if (freshSearch) {
          freshSearch.focus();
          freshSearch.setSelectionRange(this.searchQuery.length, this.searchQuery.length);
        }
      });
    }

    // 3. Edit Action Buttons
    document.querySelectorAll('[data-edit-vocab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.editVocab;
        const vocab = db.getVocabulary().find(v => v.id === id);
        if (vocab) {
          this.editingItemId = id;
          this.formValues.word = vocab.word;
          this.formValues.stressed = vocab.stressed;
          this.formValues.translation = vocab.translation;
          this.formValues.type = vocab.type;
          this.formValues.example = vocab.example || "";
          this.formValues.exampleTranslation = vocab.exampleTranslation || "";
          this.formValues.module = vocab.module;
          forceRenderCallback();
        }
      });
    });

    document.querySelectorAll('[data-edit-conj]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.editConj;
        const conj = db.getConjugations().find(c => c.id === id);
        if (conj) {
          this.editingItemId = id;
          this.formValues.verb = conj.verb;
          this.formValues.verbTranslation = conj.translation;
          this.formValues.module = conj.module;
          this.formValues.as = conj.forms.as;
          this.formValues.tu = conj.forms.tu;
          this.formValues.jisji = conj.forms.jisji;
          this.formValues.mes = conj.forms.mes;
          this.formValues.jus = conj.forms.jus;
          this.formValues.jiejos = conj.forms.jiejos;
          forceRenderCallback();
        }
      });
    });

    // 4. Delete Action Buttons
    document.querySelectorAll('[data-del-vocab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.delVocab;
        if (confirm("Tem certeza que deseja remover esta palavra?")) {
          db.deleteVocabularyItem(id);
          if (this.editingItemId === id) this.editingItemId = null;
          forceRenderCallback();
        }
      });
    });

    document.querySelectorAll('[data-del-conj]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.delConj;
        if (confirm("Tem certeza que deseja remover este verbo?")) {
          db.deleteConjugation(id);
          if (this.editingItemId === id) this.editingItemId = null;
          forceRenderCallback();
        }
      });
    });

    // 5. Cancel Edit trigger
    const cancelEditBtn = document.getElementById('btn-cancel-edit');
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', () => {
        this.editingItemId = null;
        this.clearForm();
        forceRenderCallback();
      });
    }

    // 6. Submit Form (Save or Add)
    const contentForm = document.getElementById('content-form');
    if (contentForm) {
      contentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (this.activeTab === "vocab") {
          const wordVal = document.getElementById('form-word').value.trim();
          const stressedVal = document.getElementById('form-stressed').value.trim();
          const transVal = document.getElementById('form-translation').value.trim();
          const typeVal = document.getElementById('form-type').value;
          const exVal = document.getElementById('form-example').value.trim();
          const exTransVal = document.getElementById('form-example-translation').value.trim();
          const modVal = parseInt(document.getElementById('form-module').value);
          
          const payload = {
            word: wordVal,
            stressed: stressedVal,
            translation: transVal,
            type: typeVal,
            example: exVal,
            exampleTranslation: exTransVal,
            module: modVal
          };

          if (this.editingItemId) {
            db.updateVocabularyItem(this.editingItemId, payload);
          } else {
            db.addVocabularyItem(payload);
          }
        } else {
          // Conjugations
          const verbVal = document.getElementById('form-verb').value.trim();
          const verbTransVal = document.getElementById('form-verb-translation').value.trim();
          const modVal = parseInt(document.getElementById('form-module').value);
          
          const asVal = document.getElementById('form-as').value.trim();
          const tuVal = document.getElementById('form-tu').value.trim();
          const jisjiVal = document.getElementById('form-jisji').value.trim();
          const mesVal = document.getElementById('form-mes').value.trim();
          const jusVal = document.getElementById('form-jus').value.trim();
          const jiejosVal = document.getElementById('form-jiejos').value.trim();

          const payload = {
            verb: verbVal,
            translation: verbTransVal,
            module: modVal,
            forms: {
              as: asVal,
              tu: tuVal,
              jisji: jisjiVal,
              mes: mesVal,
              jus: jusVal,
              jiejos: jiejosVal
            }
          };

          if (this.editingItemId) {
            db.updateConjugation(this.editingItemId, payload);
          } else {
            db.addConjugation(payload);
          }
        }

        // Complete save sequence
        this.editingItemId = null;
        this.clearForm();
        alert("Salvo com sucesso!");
        forceRenderCallback();
      });
    }
  },
  
  clearForm() {
    this.formValues.word = "";
    this.formValues.stressed = "";
    this.formValues.translation = "";
    this.formValues.type = "substantivo (M)";
    this.formValues.example = "";
    this.formValues.exampleTranslation = "";
    this.formValues.module = 1;
    
    this.formValues.verb = "";
    this.formValues.verbTranslation = "";
    this.formValues.as = "";
    this.formValues.tu = "";
    this.formValues.jisji = "";
    this.formValues.mes = "";
    this.formValues.jus = "";
    this.formValues.jiejos = "";
  }
};
