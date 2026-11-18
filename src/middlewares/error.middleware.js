// * ARCHIVO A COMPLETAR

// TODO: 1. notFound: responde 404 con { ok: false, mensaje: "Ruta no encontrada: METODO URL" }.
export const notFound = (req, res) => {
  res
    .status(404)
    .json({
      ok: false,
      mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    });
};

// TODO: 2. errorHandler (4 parámetros: así Express lo reconoce como manejador de errores):
//   - error.type === "entity.parse.failed" (JSON mal escrito)  -> 400 "JSON mal formado"
//   - error.code === 11000 (índice único violado)              -> 400 "Valor duplicado"
//   - error.name === "CastError" (id con formato inválido)     -> 400 "Id con formato inválido"
//   - cualquier otro -> console.log(error) y 500 "Error interno del servidor"
export const errorHandler = (error, _req, res, _next) => {
  if (error.type === 'entity.parse.failed')
    return res.status(400).json({ ok: false, mensaje: 'JSON mal formado' });
  if (error.code === 11000)
    return res.status(400).json({ ok: false, mensaje: 'Valor duplicado' });
  if (error.name === 'CastError')
    return res
      .status(400)
      .json({ ok: false, mensaje: 'Id con formato inválido' });
  console.log(error);
  return res
    .status(500)
    .json({ ok: false, mensaje: 'Error interno del servidor' });
};
