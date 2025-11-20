const tarefasService = require('../services/tarefasService');

function isValidDateString(value) {
  if (value === null || value === undefined || value === '') return true;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function baseValidate(body, requireTitle = false, requireStatus = false) {
  const errors = [];

  // título obrigatório se exigido
  if (requireTitle && (!body.titulo || typeof body.titulo !== 'string' || !body.titulo.trim())) {
    errors.push('Campo "título" é obrigatório e deve ser string.');
  }

  // status obrigatório e deve estar entre os permitidos se exigido
  if (requireStatus) {
    if (!body.status || typeof body.status !== 'string') {
      errors.push('Campo "status" é obrigatório e deve ser string.');
    } else {
      const norm = body.status
        .toString()
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
      if (!tarefasService.ALLOWED_STATUS.includes(norm)) {
        errors.push(
          'Campo "status" inválido. Valores permitidos: ["pendente", "realizando", "concluída"].',
        );
      }
    }
  } else if (body.status !== undefined) {
    const norm = body.status
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    if (!tarefasService.ALLOWED_STATUS.includes(norm)) {
      errors.push(
        'Campo "status" inválido. Valores permitidos: ["pendente", "realizando", "concluída"].',
      );
    }
  }

  // data_vencimento se fornecida deve ser date válida
  if (body.data_vencimento !== undefined && !isValidDateString(body.data_vencimento)) {
    errors.push('Campo "data_vencimento" inválido. Deve ser uma data válida.');
  }

  return errors;
}

function onCreate(req, res, next) {
  const errors = baseValidate(req.body, true, true);
  if (errors.length) return res.status(400).json({ errors });
  return next();
}

function onUpdate(req, res, next) {
  const errors = baseValidate(req.body, false, false);
  if (errors.length) return res.status(400).json({ errors });
  return next();
}

module.exports = { onCreate, onUpdate };
