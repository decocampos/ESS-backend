const { Router } = require('express');

const tarefasController = require('../controllers/tarefasController');
const validateTask = require('../middlewares/validateTask');

const router = Router();

router.get('/', tarefasController.listarTarefas);
router.get('/:id', tarefasController.buscarPorId);
router.post('/', validateTask.onCreate, tarefasController.criarTarefa);
router.put('/:id', validateTask.onUpdate, tarefasController.atualizar);
router.delete('/:id', tarefasController.remover);

module.exports = router;
