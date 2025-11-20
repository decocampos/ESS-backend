const tarefasService = require('../services/tarefasService');

async function criarTarefa(req, res, next) {
  try {
    const tarefa = await tarefasService.criar(req.body);
    return res.status(201).json({ data: tarefa });
  } catch (err) {
    return next(err);
  }
}

async function listarTarefas(req, res, next) {
  try {
    const tarefas = await tarefasService.listar({ status: req.query.status });
    return res.status(200).json({ data: tarefas });
  } catch (err) {
    return next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const tarefa = await tarefasService.buscarPorId(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.status(200).json({ data: tarefa });
  } catch (err) {
    return next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    // Verifica existência antes de atualizar
    const existente = await tarefasService.buscarPorId(id);
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada' });

    const tarefa = await tarefasService.atualizar(id, req.body);
    return res.status(200).json({ data: tarefa });
  } catch (err) {
    return next(err);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    // Verifica existência antes de remover
    const existente = await tarefasService.buscarPorId(id);
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada' });

    await tarefasService.remover(id);
    return res.status(200).json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  criarTarefa,
  listarTarefas,
  buscarPorId,
  atualizar,
  remover,
};
