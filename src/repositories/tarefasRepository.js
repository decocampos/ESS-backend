const prisma = require('../prisma/client');

const tarefasRepository = {
  async create(data) {
    return prisma.tarefa.create({ data });
  },

  async findAll(filter = {}) {
    return prisma.tarefa.findMany({ where: filter, orderBy: { id: 'asc' } });
  },

  async findById(id) {
    return prisma.tarefa.findUnique({ where: { id } });
  },

  async update(id, data) {
    return prisma.tarefa.update({ where: { id }, data });
  },

  async remove(id) {
    return prisma.tarefa.delete({ where: { id } });
  },
};

module.exports = tarefasRepository;
