// ! ARCHIVO BASE: no modificar
// =====================================================================
// validarCampos — corta la petición si alguna validación falló
// Va SIEMPRE después de las reglas de express-validator y antes del controlador.
// =====================================================================
import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // mapped() agrupa por campo: { name: { msg, path, ... } }
    return res.status(400).json({ ok: false, errors: errors.mapped() });
  }
  next(); // sin errores -> sigue al controlador
};
