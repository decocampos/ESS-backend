const express = require('express');
const dotenv = require('dotenv');

const tarefasRoutes = require('./routes/tarefasRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/tarefas', tarefasRoutes);

// Rota default simples
app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'API de Gerenciamento de Tarefas' });
});

// Middleware central de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
