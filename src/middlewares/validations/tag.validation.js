// * ARCHIVO A COMPLETAR
import { body, param } from 'express-validator';

export const createTagValidation = [
  // TODO: 1. name: obligatorio, entre 3 y 50 caracteres.
  body('name')
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres'),
  // TODO: 2. description: opcional, texto de máximo 200 caracteres.
  body('description').optional().isLength({ max: 200 }),
];

export const tagIdValidation = [
  // TODO: 3. Validar el :id de la ruta (formato de ObjectId). Si no existe, el 404 lo da el controlador.
  param('id').isMongoId().withMessage('El ID no es un ObjectId válido'),
];
