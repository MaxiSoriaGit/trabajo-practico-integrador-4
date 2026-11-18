// * ARCHIVO A COMPLETAR
import { matchedData } from 'express-validator';
import { UserModel } from '../models/index.js';
import { hashPassword, comparePassword } from '../helpers/bcrypt.helper.js';
import { signToken } from '../helpers/jwt.helper.js';

// Opciones de la cookie (se usan en login y logout)
const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

export const register = async (req, res) => {
  try {
    const datos = matchedData(req);
    const password = await hashPassword(datos.password);
    const creado = await UserModel.create({ ...datos, password, activo: true });

    // select:false no afecta a create(): hay que sacar la password a mano
    const user = creado.toObject();
    delete user.password;

    return res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado correctamente',
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ ok: false, mensaje: 'username o email ya registrado' });
    }
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // Usuario ACTIVO, pidiendo la password (tiene select:false)
    const user = await UserModel.findOne({ email, activo: true }).select(
      '+password',
    );

    // Mismo mensaje si el email no existe, está inactivo o la password falla
    if (!user || !(await comparePassword(password, user.password))) {
      return res
        .status(401)
        .json({ ok: false, mensaje: 'Credenciales inválidas' });
    }

    const token = signToken({ id: user._id, role: user.role });
    res.cookie('token', token, { ...cookieOptions, maxAge: 60 * 60 * 1000 }); // 1 hora

    return res.status(200).json({ ok: true, mensaje: 'Login exitoso' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const logout = (_req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.status(204).send();
};
