const { PrismaClient } = require('@prisma/client');

// Carrega variáveis de ambiente se estivermos rodando localmente
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const prisma = new PrismaClient();

module.exports = prisma;