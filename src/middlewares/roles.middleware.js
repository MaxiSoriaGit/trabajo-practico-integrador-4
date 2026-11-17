// * ARCHIVO A COMPLETAR

// TODO: 1. authorize(...roles) es una FÁBRICA: recibe los roles permitidos y devuelve un middleware.
//          Si req.user no existe o su role no está en la lista -> 403 con { ok: false, mensaje: "Forbidden" }; si no, next().
// ? Uso esperado: authorize("administrator")  /  authorize("agent", "administrator")
export const authorize =
  (...roles) =>
  (req, res, next) => {
  };
