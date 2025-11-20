const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prisma/client');

describe('API /tarefas', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.tarefa.deleteMany();
    await prisma.$disconnect();
  });

  test('criação de tarefa (201)', async () => {
    const res = await request(app).post('/tarefas').send({
      titulo: 'Minha Tarefa',
      descricao: 'Teste de criação',
      status: 'pendente',
      data_vencimento: '2030-01-01',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.titulo).toBe('Minha Tarefa');
    expect(res.body.data.status).toBe('pendente');
  });

  test('validação: título obrigatório (400)', async () => {
    const res = await request(app).post('/tarefas').send({
      descricao: 'Sem título',
      status: 'pendente',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test('buscar por ID (200)', async () => {
    const created = await request(app).post('/tarefas').send({
      titulo: 'Buscar ID',
      status: 'pendente',
    });
    const id = created.body.data.id;

    const res = await request(app).get(`/tarefas/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(id);
  });
});
