# Gerenciador de Tarefas API

API RESTful completa para gerenciamento de tarefas utilizando Node.js, Express.js e Prisma ORM com banco de dados SQLite.

## Tecnologias
- Node.js
- Express.js
- Prisma ORM
- SQLite
- Jest + Supertest
- ESLint + Prettier
- dotenv

## Instalação
```bash
npm install
```

## Banco de Dados e Prisma
- Configure o arquivo `.env` baseado em `.env.example`.
- Geração do cliente e migrações:
```bash
npx prisma migrate dev --schema src/prisma/schema.prisma
```

## Como rodar
- Desenvolvimento:
```bash
npm run dev
```
- Produção:
```bash
npm start
```

## Endpoints
- POST `/tarefas` – Criar tarefa
- GET `/tarefas` – Listar tarefas (suporta filtro `?status={status}`)
- GET `/tarefas/:id` – Buscar por ID
- PUT `/tarefas/:id` – Atualizar tarefa
- DELETE `/tarefas/:id` – Excluir tarefa

### Campos
- `título` (string, obrigatório)
- `descrição` (string, opcional)
- `status` (string, obrigatório: "pendente", "realizando", "concluída")
- `data_vencimento` (date válida, opcional)

### Regras de Validação
- `título` obrigatório → 400 Bad Request se ausente.
- `status` obrigatório e deve ser um dos: ["pendente", "realizando", "concluída"].
- `data_vencimento` se fornecida, deve ser uma data válida.
- ID inexistente → 404 Not Found.
- Erros internos → 500 Internal Server Error.

## Arquitetura
Arquitetura em camadas:
- Controller → Service → Repository
- Middlewares de validação e erro global
- Rotas desacopladas do app

Estrutura de pastas:
```
project/
 ├── src/
 │   ├── controllers/
 │   │    └── tarefasController.js
 │   ├── services/
 │   │    └── tarefasService.js
 │   ├── repositories/
 │   │    └── tarefasRepository.js
 │   ├── routes/
 │   │    └── tarefasRoutes.js
 │   ├── middlewares/
 │   │    └── errorHandler.js
 │   │    └── validateTask.js
 │   ├── prisma/
 │   │    ├── schema.prisma
 │   │    └── client.js
 │   ├── app.js
 │   └── server.js
 ├── .env.example
 ├── package.json
 ├── README.md
 └── prisma/
      └── migrations/ (gerado automaticamente)
```

## Exemplos de Requisição
- Criar:
```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Estudar Node.js",
  "descricao": "Ler documentação do Express",
  "status": "pendente",
  "data_vencimento": "2025-12-31"
}
```

- Listar com filtro:
```http
GET /tarefas?status=realizando
```

- Atualizar:
```http
PUT /tarefas/1
Content-Type: application/json

{
  "status": "concluída"
}
```

## Testes
Executar testes:
```bash
npm test
```

## Observação
Este projeto não realiza deploy automaticamente.
