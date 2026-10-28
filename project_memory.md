# Memória Consolidada do Projeto - LT Kalba

> **Status:** Ativo & Permanente  
> **Finalidade:** Este documento consolida todo o histórico, decisões tomadas, feedbacks de usabilidade, correções pedagógicas e aprendizados obtidos em conversas anteriores. Ele serve como registro perene antes da limpeza de chats, garantindo que nenhum conhecimento ou preferência do usuário seja perdido.

---

## 1. Origem e Visão Geral do Projeto

* **Propósito:** Aplicativo de aprendizado prático e estruturado da língua lituana para falantes de português.
* **Escopo Inicial:** Nível A1/A2 com foco direto nos requisitos oficiais da **Categoria I do Exame de Proficiência da Lituânia**, com expansão planejada até o nível **B1**.
* **Natureza:** Projeto de uso pessoal e comunitário, estritamente **não comercial e 100% gratuito**.
* **Materiais de Referência (na pasta `base_reference/`):**
  1. *Mano ir tavo šalis Lietuva* (referência principal para diálogos e comunicação cotidiana).
  2. *Lithuanian, Beginner's* (Dambriunas, Klimas & Schmalstieg - gramática analítica e casos).

---

## 2. Decisões Linguísticas e Pedagógicas Críticas (Regras Imutáveis)

1. ❌ **PROIBIÇÃO DE VOZ / TTS POR IA:**  
   * **Histórico:** Foi testada uma síntese de voz (TTS) gerada por IA e o usuário determinou a **remoção imediata**. As vozes sintéticas pronunciam os diacríticos e acentos lituanos de maneira incorreta, prejudicando o estudo.
   * **Regra:** Não reimplementar áudios sintéticos/TTS automatizados a menos que sejam gravações reais de nativos aprovadas pelo usuário.
2. ❌ **EXCLUSÃO DE EXERCÍCIOS DE SOLETRAR EXTENSO:**  
   * **Histórico:** Os exercícios que cobravam soletração com nomes das letras (ex.: "i trumpoji", "a nosinė") foram testados e reprovados pelo usuário.
   * **Regra:** Manter os nomes das letras exclusivamente como tabela de referência visual no módulo do alfabeto (*Abėcėlė*). Nos exercícios normais, usar apenas a escrita padrão com caracteres bálticos (*ą, č, ę, ė, į, š, ų, ū, ž*).
3. 🎯 **TRADUÇÃO INTERATIVA AO TOQUE:**  
   * **Histórico:** O usuário aprovou e solicitou padronizar o comportamento onde o estudante clica/toca em uma palavra lituana para revelar sua tradução contextual (tooltips/popovers), evitando poluição visual de tabelas cheias de colunas.
4. 🔍 **INTEGRIDADE DO DICIONÁRIO BASE:**  
   * Todas as palavras presentes em diálogos, exercícios e frases precisam estar devidamente cadastradas no dicionário do motor morfológico (ex.: palavras funcionais como *aš*, *iš*, etc.).
   * Erros ortográficos passados foram corrigidos (ex.: a grafia correta é *lietuvis*, não *lituvis*).

---

## 3. Diretrizes de UX/UI e Usabilidade Mobile (Galaxy S26)

* **Dispositivo de Referência:** O usuário utiliza predominantemente o app no smartphone (**Samsung Galaxy S26**). A interface deve ser rigorosamente **Mobile-First**.
* **Eliminação de Rolagem Vertical Excessiva:**
  * No mobile, opções de flashcards, botões de virar carta e botões de submissão ("Enviar/Verificar") devem caber na área visível da tela (**Above the fold**).
  * Evitar o efeito elástico onde o usuário clica em uma opção, a tela rola para baixo e depois precisa rolar manualmente para cima para continuar.
* **Menu e Navegação Mobile:**
  * O menu de navegação precisa ser ergonômico, recolhível ou em bottom-navigation, sem ocupar espaço útil do estudo.
  * Tabelas gramaticais e caixas de diálogo devem ser adaptadas para telas estreitas, sem quebras de linha estranhas ou textos espremidos.

---

## 4. Histórico Técnico & Governança de Infraestrutura

### 4.1. Protocolo do Ambiente (`instrucoes_agente.md`)
* **Iniciar Ambiente:**
  * Docker: `docker compose up -d` (MySQL na porta 3306, phpMyAdmin na 8080).
  * Backend: `uvicorn main:app --reload` (FastAPI na porta 8000 via `.venv`).
  * Frontend: `npm run dev` (Vite na porta 5173).
* **Encerrar Ambiente:**
  * Matar processos ativos nas portas 8000 e 5173.
  * Docker: `docker compose down`.

### 4.2. Diretriz de Simplicidade Arquitetural (Deploy Gratuito & Mobile)
* **GitHub Pages (`github.io`):** A meta de distribuição inicial é hospedar o frontend no GitHub Pages. Como o GitHub Pages só serve arquivos estáticos, o projeto deve priorizar o desacoplamento das regras morfológicas e dicionário em JavaScript puro client-side, permitindo custo zero de hospedagem.
* **Portabilidade Mobile (Android):** A base do frontend (HTML/CSS/JS) deve ser mantida limpa e compatível com empacotamento via PWA ou Capacitor para gerar um APK nativo Android posteriormente.

---

## 5. Governança da Equipe de Agentes e Qualidade de Código

> [!IMPORTANT] **Diretrizes Mandatórias de Atuação do Project Manager (PM / Tech Lead Orquestrador)**

### Regras Mandatórias Estabelecidas pelo Usuário:
1. **Regra de Ouro (Proibição Estrita de Edição de Código):** O PM **NÃO programa** e **NUNCA edita arquivos de código-fonte** da aplicação. Sua função é exclusivamente documentar, arquitetar, especificar soluções e gerar Ordens de Serviço (OS). Só tem permissão para editar arquivos de documentação viva (`agents.md`, `project_memory.md`, especificações).
2. **Topologia Fixa de Agentes (Sem Agentes Fantasmas):**
   - O projeto possui 4 agentes/abas dedicados com responsabilidades exclusivas:
     * **`DEV`** (`12a5b5f3-2ef9-441f-9bdb-8a52fa266c8f`): Responsável único por implementar código e alterar arquivos do projeto.
     * **`QA`** (`f5db0ef5-9b76-4591-a86e-baa233c87f0c`): Responsável por testar, auditar diffs, validar regras de negócio e aprovar/reprovar.
     * **`UI/UX`** (`efd047af-2d64-431a-89a2-4ed8dfcb48bb`): Responsável por design, ergonomia mobile (Galaxy S26) e fluxos.
     * **`Consultant`** (`16052ba6-9590-4990-82d9-cc56d992ea86`): Responsável por acurácia pedagógica e linguística do Lituano.
   - **TERMINANTEMENTE PROIBIDO instanciar novos subagentes descartáveis (`invoke_subagent`).**
   - Toda delegação é despachada exclusivamente para as abas fixas via `send_message`. Se um agente travar, reportar ao usuário; nunca substituí-lo por conta própria.
3. **Alinhamento Prévio Obrigatório (NUNCA sair executando):**
   - Ao receber qualquer nova demanda, bug ou print do usuário:
     1. **NÃO despachar OS de imediato.**
     2. Primeiro fazer a triagem, explicar o diagnóstico, propor as alternativas e perguntar se o usuário tem mais observações.
     3. Somente após o **"OK" explícito** do usuário, registrar a OS no backlog e despachar para o agente responsável via `send_message`.
4. **Otimização Rigorosa da Cota Diária de Tokens:**
   - O PM é o guardião do consumo de tokens: respostas enxutas, sem prolixidade, sem comandos desnecessários e sem retrabalho.
   - Toda OS deve conter apenas os insumos cirúrgicos essenciais para a tarefa, evitando tráfego inútil de contexto e preservando a cota diária do usuário.
5. **Organização de Código e Reutilização (Anti-Dispersão de Funções):**
   - Não pulverizar o código com funções desnecessárias espalhadas em múltiplos arquivos.
   - Funções auxiliares devem ser organizadas em pastas dedicadas (ex.: `utils/`, `helpers/`, `services/`).
   - Todo código adicionado deve ser reutilizável; nada de funções ou scripts descartáveis de uso único.
5. **Tolerância Zero a Processos Pendurados em Background:**
   - Nenhum agente deve deixar tarefas, scripts, servidores ou processos órfãos rodando em segundo plano.
6. **Commits e Branches:** O progresso deve ser salvo por checkpoints e commits claros no repositório GitHub já conectado.
