# Backlog de Ordens de Serviço (OS) - LT Kalba

> **Status:** Ativo  
> **Gestor:** Project Manager (PM)  
> **Repositório:** `https://github.com/rpadolfo/lt_kalba.git`  
> **Deploy Target:** GitHub Pages (`https://rpadolfo.github.io/lt_kalba/`)

---

## Sprint 1: Estabilização, Desacoplamento e Infraestrutura de Deploy

### 🚀 OS-001: Higienização Lexical, Desacoplamento Client-Side e Setup CI/CD
- **Agente Responsável:** `DEV` (`12a5b5f3-2ef9-441f-9bdb-8a52fa266c8f`)
- **Validador:** `QA` (`f5db0ef5-9b76-4591-a86e-baa233c87f0c`)
- **Prioridade:** Imediata (P0)
- **Escopo Técnico & Linguístico:**
  1. **Higienização Lexical (Auditoria do Consultant):**
     - Corrigir `"lituvis"` para `"lietuvis"` em `backend/main.py`.
     - Corrigir `"Rusija yra muito didelė šalis"` para `"Rusija yra labai didelė šalis"` em `frontend/src/data/mockData.js`.
     - Remover termos inventados (*"miestis"*, *"mokytys"*) e ajustar classificação de *"seseris"* em `frontend/src/data/lessonsData.js`.
  2. **Expurgo de Código Residual:**
     - Remover o tipo legado de exercício `spelling` em `frontend/src/views/ExercisesView.js`.
     - Excluir o arquivo template descartável `frontend/src/counter.js`.
  3. **Desacoplamento Client-Side (Zero Custo / Offline-First):**
     - Criar `frontend/src/services/morphologyService.js` transpondo as regras e dicionário do `backend/morphology.py` para JavaScript modular.
     - Atualizar `DialoguesView.js` e `ReferenceView.js` para consumir o `morphologyService.js` diretamente, eliminando chamadas `fetch('http://localhost:8000/...')`.
     - Configurar `vite.config.js` com `base: './'` para suporte a subpastas do GitHub Pages.
  4. **Pipeline CI/CD (GitHub Actions):**
     - Criar `.github/workflows/deploy.yml` para validação de build (`npm run build`) e deploy automático no GitHub Pages no push da branch principal.
- **Critérios de Aceite:**
  - [x] Zero chamadas `fetch(http://localhost:8000)` no código do frontend.
  - [x] `npm run build` executando com sucesso e gerando bundle em `dist/`.
  - [x] Análise morfológica de palavras nos diálogos funcionando 100% offline via `morphologyService.js`.
  - [x] Textos e frases auditadas sem erros de português ou palavras inventadas.
  - [x] Workflow de GitHub Actions configurado e pronto para deploy.
  - [x] Homologação formal emitida pelo QA (Aprovado com 100% de cobertura).
- **Status:** `CONCLUIDO`

---

### 📋 Próximas OSs no Backlog:
* **OS-002 [UX]:** Especificação e Ajuste Ergonômico Mobile-First (Above the Fold e Bottom Sheet no Galaxy S26).
* **OS-003 [DEV]:** Migração da camada de dados para IndexedDB (Dexie.js) com botão de Exportar/Importar Backup JSON.
* **OS-004 [QA]:** Homologação E2E da OS-001, validação de inputs e testes de regressão.
* **OS-005 [Consultant]:** Matriz Didática dos Casos Dativo e Instrumental para a Categoria I.
