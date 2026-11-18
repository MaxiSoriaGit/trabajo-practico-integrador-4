// * ARCHIVO A COMPLETAR
import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validarCampos } from '../middlewares/validarCampos.middleware.js';
import {
  loginValidation,
  registerValidation,
} from '../middlewares/validations/auth.validation.js';

export const authRoutes = Router();

// TODO: 1. register y login son públicos (con sus validaciones); logout requiere sesión iniciada.
authRoutes.post('/auth/register', registerValidation, validarCampos, register);
authRoutes.post('/auth/login', loginValidation, validarCampos, login);
authRoutes.get('/auth/profile', authMiddleware, logout);
