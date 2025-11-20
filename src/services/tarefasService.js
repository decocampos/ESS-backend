const tarefasRepository = require('../repositories/tarefasRepository');

const ALLOWED_STATUS = ['pendente', 'realizando', 'concluida'];

function normalizeStatus(status) {
  if (!status) return status;
  return status
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function presentStatus(status) {
  if (!status) return status;
  if (status === 'concluida') return 'concluída';
  return status;
}

function toResponse(task) {
  if (!task) return task;
  return {
    id: task.id,
    titulo: task.titulo,
    descricao: task.descricao ?? null,
    status: presentStatus(task.status),
    data_vencimento: task.dataVencimento ? task.dataVencimento.toISOString() : null,
  };
}

const tarefasService = {
  async criar({ titulo, descricao, status, data_vencimento }) {
    const normStatus = normalizeStatus(status);

    const toCreate = {
      titulo,
      descricao: descricao ?? null,
      status: normStatus,
      dataVencimento: data_vencimento ? new Date(data_vencimento) : null,
    };

    const created = await tarefasRepository.create(toCreate);
    return toResponse(created);
  },

  async listar(filtro) {
    const where = {};
    if (filtro?.status) {
      where.status = normalizeStatus(filtro.status);
    }
    const list = await tarefasRepository.findAll(where);
    return list.map(toResponse);
  },

  async buscarPorId(id) {
    const found = await tarefasRepository.findById(id);
    return toResponse(found);
  },

  async atualizar(id, { titulo, descricao, status, data_vencimento }) {
    const data = {};
    if (titulo !== undefined) data.titulo = titulo;
    if (descricao !== undefined) data.descricao = descricao;
    if (status !== undefined) data.status = normalizeStatus(status);
    if (data_vencimento !== undefined)
      data.dataVencimento = data_vencimento ? new Date(data_vencimento) : null;

    const updated = await tarefasRepository.update(id, data);
    return toResponse(updated);
  },

  async remover(id) {
    await tarefasRepository.remove(id);
  },

  ALLOWED_STATUS,
};

module.exports = tarefasService;
