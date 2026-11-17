// ! ARCHIVO BASE: no modificar
// =====================================================================
// JWT — el token firmado que viaja en la cookie
// =====================================================================
import jwt from "jsonwebtoken";

// payload = lo que queremos recordar del usuario (ADAPTAR si necesitás más datos)
export const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

// Lanza error si el token es falso o venció (por eso se usa dentro de try/catch)
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
