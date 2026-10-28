# Plano de Implementação - Aplicar MVP do LT Kalba

Este plano de implementação descreve as alterações arquiteturais e funcionais para consolidar o escopo do MVP de aprendizado de Lituano (Nível A1/A2), conforme especificado em [projeto_mvp.md](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/projeto_mvp.md).

## User Review Required

> [!IMPORTANT]
> **Motor Morfológico e Dicionário Integrados:**
> O motor morfológico será implementado no backend (FastAPI) com fallback no frontend (JS). Ele usará suffix-stripping guiado pelo dicionário de lemas catalogados. Isso garante que flexões como `Vilniuje` (Locativo) ou `kavos` (Genitivo) sejam corretamente reduzidas aos lemas `Vilnius` e `kava`.
>
> **Pronúncia por Browser Speech Synthesis:**
> Adicionaremos suporte a síntese de voz (Web Speech API) nativa do navegador para a pronúncia das palavras lituanas em diálogos e lições, eliminando a necessidade de arquivos de áudio pré-gravados.
>
> **Novos Tipos de Exercícios:**
> Implementaremos o exercício de soletração (*Paraidžiui*), validando se o usuário digita os nomes das letras correspondentes (ex: `Lietuva` -> `el, i trumpoji, e, tė, u trumpoji, vė, a`).

## Proposed Changes

As alterações estão divididas entre o Backend (FastAPI, banco de dados/dicionário e motor de morfologia) e o Frontend (interface SPA, novos módulos e recursos visuais).

---

### Backend (Python/FastAPI)

#### [NEW] [morphology.py](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/backend/morphology.py)
- Criação do motor de suffix-stripping.
- Dicionário estruturado em JSON/memória com lemas em lituano, suas traduções, gênero gramatical, tipo de palavra e regras associadas.
- Função `analyze_word(word: str)` que realiza o stripping de sufixos de caso (Locativo, Genitivo, Acusativo) e valida contra os lemas do dicionário.

#### [MODIFY] [main.py](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/backend/main.py)
- Importação do motor de morfologia.
- Criação dos seguintes endpoints da API:
  - `GET /api/dictionary` - Retorna o dicionário completo de lemas.
  - `POST /api/analyze` - Recebe uma palavra flexionada e retorna sua análise morfológica (caso, gênero, lema e tradução).
  - `GET /api/alphabet` - Retorna a tabela do alfabeto com nomes fonéticos.
  - `GET /api/declensions` - Retorna a tabela de declinações de substantivos.

---

### Frontend (SPA Vanilla JS)

#### [MODIFY] [mockData.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/data/mockData.js)
- Expansão do banco de dados local (`localStorage`):
  - Inclusão dos novos vocábulos solicitados:
    - **Países/Valstybės:** Airija, Anglija, Vokietija, Lenkija, Rusija.
    - **Cidades/Sostinės:** Vilnius, Ryga, Talinas, Berlynas, Varšuva.
    - **Profissões e Pessoas:** italas/italė, mokinys/mokinė, vyras, moteris, draugas/draugė.
  - Inclusão de novas conjugações de verbos de ação (`dirbti`, `turėti`, `kalbėti`, `suprasti`).
  - Inclusão de novos exercícios práticos:
    - Exercícios de soletração (*Paraidžiui*).
    - Perguntas diretas de compreensão de diálogos (*Atsakykite į klausimus*).
    - Lacunas contextuais em diálogos (*Pabaikite sakinius*).

#### [MODIFY] [main.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/main.js)
- Inclusão de duas novas rotas no roteador SPA:
  - `dialogues` (Pokalbiai) para os textos contextuais e diálogos práticos.
  - `reference` (Žinynas) para o guia rápido de alfabeto e declinações.
- Atualização do menu lateral (Sidebar) com ícones e links para as novas abas.

#### [NEW] [DialoguesView.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/views/DialoguesView.js)
- Interface de leitura de diálogos integrando:
  - Personagens com avatares e diálogos estruturados.
  - Funcionalidade de clique em qualquer palavra do diálogo para abrir um **Tooltip Morfológico** flutuante.
  - Tooltip consulta `/api/analyze` do backend para detalhar o caso gramatical (Locativo, Genitivo, Acusativo), o gênero (M/F) e a tradução do lema.
  - Botão de pronúncia por voz sintética no tooltip.

#### [NEW] [ReferenceView.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/views/ReferenceView.js)
- Exibição organizada e premium de referências:
  - **Tabela Abėcėlė (Alfabeto):** Grade interativa de letras, suporte fonético e síntese de voz ao clicar.
  - **Tabela de Declinações:** Matriz limpa demonstrando as desinências dos casos Nominativo, Genitivo, Acusativo e Locativo.
  - **Sistema de Verbos:** Conjugação da primeira conjugação e do irregular *būti*.

#### [MODIFY] [DashboardView.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/views/DashboardView.js)
- **Proficiency Heatmap:** Adição de um painel dinâmico em SVG/CSS Grid que exibe a proficiência do usuário nos 4 casos gramaticais (Nominativo, Genitivo, Acusativo, Locativo), derivado do progresso SRS das palavras de cada caso.
- **Competency Matrix:** Grade visual de progresso para a Categoria I (Dados Pessoais, Rotina, Cidade, Compras, Saúde) com status de conclusão.
- **Cronograma de 12 Semanas:** Linha do tempo interativa e expansível exibindo o cronograma detalhado do projeto, com botão rápido para iniciar o estudo do tema correspondente.

#### [MODIFY] [ExercisesView.js](file://///wsl.localhost/Ubuntu/home/rpadolfo/projects/lt_kalba/frontend/src/views/ExercisesView.js)
- Expansão da interface para comportar os novos tipos de exercício:
  - **gap-fill (Pabaikite sakinius)**: Input inline adaptado.
  - **translation (Tradução)**: Tradução direta.
  - **spelling (Paraidžiui)**: Interface dedicada a soletrar a palavra indicada letra por letra, com dicas interativas dos nomes fonéticos das letras lituanas.
  - Integração do motor morfológico para permitir consultar palavras dos enunciados diretamente durante o exercício.

---

## Verification Plan

### Automated Tests
- Faremos testes no backend FastAPI por meio de chamadas HTTP locais utilizando `curl` ou scripts de validação:
  - Validar se `/api/analyze?word=Vilniuje` retorna corretamente a análise Locativa do lema `Vilnius`.
  - Validar se `/api/analyze?word=kavos` retorna a análise Genitiva do lema `kava`.
  - Verificar a integridade do JSON retornado pelas rotas de referência.

### Manual Verification
- Iniciar o ambiente de desenvolvimento local (FastAPI na porta 8000 e Vite na porta 5173).
- Testar a navegação SPA entre todas as abas.
- Validar a abertura e fechamento do Tooltip Morfológico ao clicar em palavras nos Diálogos e nas Lições.
- Testar a pronúncia de palavras lituanas por voz sintética.
- Concluir exercícios (incluindo soletração) e verificar se o ganho de XP e o heatmap de proficiência no Dashboard são atualizados.
