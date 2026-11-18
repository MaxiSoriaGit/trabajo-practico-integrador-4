// * ARCHIVO A COMPLETAR
import { Router } from 'express';
import {
  createTag,
  deleteTag,
  getTags,
} from '../controllers/tags.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/roles.middleware.js';
import { validarCampos } from '../middlewares/validarCampos.middleware.js';
import {
  createTagValidation,
  tagIdValidation,
} from '../middlewares/validations/tag.validation.js';

export const tagRoutes = Router();

// TODO: 1. POST /tags (administrator), GET /tags (sesión iniciada), DELETE /tags/:id (administrator).
// ? Orden: authMiddleware -> authorize -> validaciones -> validarCampos -> controlador.
tagRoutes.post(
  '/tags',
  authMiddleware,
  authorize('administrator'),
  createTagValidation,
  validarCampos,
  createTag,
);
tagRoutes.get('/tags', authMiddleware, getTags);
tagRoutes.delete(
  '/tags/:id',
  authMiddleware,
  authorize('administrator'),
  tagIdValidation,
  validarCampos,
  deleteTag,
);
