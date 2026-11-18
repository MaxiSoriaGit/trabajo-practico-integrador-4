// * ARCHIVO A COMPLETAR
import { verifyToken } from '../helpers/jwt.helper.js';

export const authMiddleware = (req, res, next) => {
  // TODO: 1. Leer el token de la cookie "token". Si no existe: 401 con { ok: false, mensaje: "No autorizado" }.
  // TODO: 2. Verificar el token (verifyToken) y guardar el payload en req.user. Si es inválido o venció: 401.
  // TODO: 3. Llamar a next() si todo está bien.
  try {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido o expirado' });
  }
  // ? verifyToken lanza un error si el token es falso o venció: usar try/catch.
};
