# Instruções de Gerenciamento do Ambiente - LT Kalba

Este arquivo documenta as diretrizes registradas para o gerenciamento automático do ambiente de desenvolvimento deste projeto pelo agente.

## Protocolo de Comandos

### 1. Iniciar o Ambiente
Quando o usuário solicitar **"inicie o ambiente"** (ou variações semelhantes), o agente executará automaticamente em segundo plano:
* **Banco de Dados (Docker)**:
  ```bash
  cd /home/rpadolfo/projects/lt_kalba && docker compose up -d
  ```
* **Backend (FastAPI)**:
  ```bash
  cd /home/rpadolfo/projects/lt_kalba/backend && source .venv/bin/activate && uvicorn main:app --reload
  ```
* **Frontend (Vite)**:
  ```bash
  source ~/.nvm/nvm.sh && cd /home/rpadolfo/projects/lt_kalba/frontend && npm run dev
  ```

---

### 2. Encerrar o Ambiente
Quando o usuário solicitar **"encerre o ambiente"** (ou variações semelhantes), o agente interromperá os processos de segundo plano e desligará os containers:
* **Parar Processos**: Matar as tarefas ativas do Uvicorn (porta 8000) e do Vite (porta 5173).
* **Parar Banco de Dados (Docker)**:
  ```bash
  cd /home/rpadolfo/projects/lt_kalba && docker compose down
  ```
