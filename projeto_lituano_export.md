# Projeto de Aplicativo para Prática de Lituano

## Visão Geral
Este documento consolida todas as ideias e requisitos discutidos até agora para o desenvolvimento do aplicativo de aprendizado da língua lituana, facilitando a migração para o ambiente WSL.

O objetivo principal é construir uma aplicação web estruturada, utilizando dois livros base (localizados em `base_reference`):
1. *Lithuanian, Beginner's (Dambriūnas, Klimas & Schmalstieg)*
2. *Mano ir tavo šalis Lietuva*

## Principais Funcionalidades

### 1. Flashcards de Vocabulário e Pronúncia
- **Tradução e Identificação:** Exercícios para identificar a tradução correta de palavras.
- **Ajuda de Pronúncia:** Destaque visual para a sílaba tônica (mais forte) das palavras, essencial para a correta pronúncia em lituano.
- **Sistema de Repetição Espaçada (Spaced Repetition):** O sistema deve rastrear o desempenho do usuário. Se uma palavra for acertada frequentemente, ela deve ser marcada como "aprendida" e aparecer com menos frequência.

### 2. Exercícios de Gramática e Conjugação
- **Complete a Frase:** Exercícios clássicos de preencher lacunas, focados na aplicação de verbos no contexto de uma frase.
- **Drills de Conjugação Direta:** Exercícios focados apenas em conjugar um verbo para o pronome específico (ex: "Jis _______" indicando qual verbo deve ser conjugado).
- **Lógica Anti-Repetição:** Garantir que o aluno tenha variedade nos exercícios e não veja sempre as mesmas frases/verbos em sequência.

## Arquitetura Proposta (Extensível e Escalável)

O aplicativo precisa de uma arquitetura que permita a fácil integração de novos conteúdos (especialmente conteúdos gerados por IA no futuro). 

### Front-end
- Interface de usuário rica, dinâmica e com visual premium.
- Tecnologias recomendadas: **React (Next.js ou Vite)** e **CSS Vanilla/Módulos** para customização detalhada, ou Tailwind (se preferido).
- Responsividade e uso de micro-animações para melhorar a experiência do usuário durante os exercícios.

### Back-end
- API robusta para fornecer os exercícios, validar respostas e gerenciar o progresso do usuário.
- Pode ser construído em **Node.js (Express/NestJS)** ou **Python (FastAPI/Django)**.
- Endpoint dedicado para importação de exercícios em lote ou ingestão de dados gerados por IA.

### Banco de Dados
- Armazenamento de palavras, conjugações, regras gramaticais e frases de exemplo.
- Armazenamento do perfil do usuário e histórico de respostas (para alimentar o algoritmo de repetição espaçada).
- **PostgreSQL** seria a recomendação ideal pelas suas capacidades relacionais (bom para estrutura de gramática e verbos) e flexibilidade com JSON (para dados estruturados por IA).

## Próximos Passos (Roadmap no WSL)

1. **Setup Inicial:**
   - Criar o repositório no WSL.
   - Inicializar o projeto frontend (`npx create-vite` ou `npx create-next-app`).
   - Inicializar o projeto backend e o banco de dados.

2. **Estruturação de Dados:**
   - Criar os modelos (schema) para Palavras, Verbos, Exercícios e Progresso do Usuário.
   - Extrair um primeiro lote de vocabulário e regras dos PDFs base para popular o banco de dados.

3. **Desenvolvimento do Core:**
   - Implementar o algoritmo de repetição espaçada (Spaced Repetition).
   - Criar os componentes de UI para os Flashcards (com destaque silábico) e exercícios de lacuna.
