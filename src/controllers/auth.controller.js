// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { UserModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: 1. Tomar los datos validados (matchedData) y hashear la password (hashPassword).
    // TODO: 2. Crear el user (con su profile embebido) forzando activo: true.
    // TODO: 3. Responder 201 con { ok: true, mensaje, data } donde data es el usuario SIN la password.
    // ? select:false solo afecta a las consultas: el documento que devuelve create() todavía trae la password.
  } catch (error) {
    // TODO: 4. Si el error es de duplicado (code 11000) responder 400.
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user ACTIVO por email (la password hay que pedirla con select("+password")) y comparar (comparePassword).
    // TODO: 2. Credenciales inválidas (email inexistente, usuario inactivo o password incorrecta): 401 con el MISMO mensaje.
    // TODO: 3. Firmar un JWT con el id y el role (signToken) y guardarlo en una cookie httpOnly "token"; responder 200.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const logout = (_req, res) => {
  // TODO: 1. Eliminar la cookie "token" y responder 204 sin cuerpo.
};
