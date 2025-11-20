// Middleware central de tratamento de erros
// Deve capturar erros e responder com um formato consistente
module.exports = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);

  const status = err.statusCode || 500;
  const message =
    status === 500 ? 'Erro interno do servidor' : err.message || 'Erro na requisição';

  return res.status(status).json({ error: message });
};
