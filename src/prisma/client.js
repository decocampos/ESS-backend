const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  const dataDir = '/data';
  const hasDataDir = process.platform !== 'win32' && fs.existsSync(dataDir);
  const fallbackPath = hasDataDir ? 'file:/data/dev.db' : `file:${path.join('.', 'dev.db')}`;
  process.env.DATABASE_URL = fallbackPath;
}

const prisma = new PrismaClient();

module.exports = prisma;
