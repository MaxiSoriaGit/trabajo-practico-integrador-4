// * ARCHIVO A COMPLETAR
import { body, param } from 'express-validator';
import { TagModel, TicketModel, UserModel } from '../../models/index.js';

const PRIORITIES = ['low', 'medium', 'high'];

// * Reglas de tags compartidas por crear y editar (TODO 5 y 9).

export const ticketIdValidation = [
  // TODO: 1. Validar el :id de la ruta (ObjectId).
  param('id').isMongoId().withMessage('El ID no es un ObjectId válido'),
];

export const createTicketValidation = [
  // TODO: 2. code: obligatorio, entre 3 y 20 caracteres y único (TicketModel; compará en mayúsculas).
  body('code')
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage('El code debe tener entre 3 y 20 caracteres')
    .bail()
    .custom(async (code) => {
      const existe = await TicketModel.exists({ code });
      if (existe) throw new Error('Ya existe un code con ese nombre');
    }),
  // TODO: 3. title: obligatorio (5 a 100 caracteres). description: obligatoria (máximo 1000).
  body('title')
    .notEmpty()
    .isLength({ min: 5, max: 100 })
    .withMessage('El titulo debe tener entre 5 y 100 caracteres'),
  body('description')
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage('La descripcion debe tener como maximo 1000 caracteres'),
  // TODO: 4. priority: opcional y dentro de low, medium, high.
  body('priority')
    .optional()
    .isIn(PRIORITIES)
    .withMessage(`La prioridad debe ser uno de: ${ESTADOS.join(', ')}`),

  // TODO: 5. tags: opcional; si viene, arreglo con al menos 1 elemento, sin ids repetidos, y cada uno un ObjectId de un tag existente y ACTIVO.
  // ? Para cada elemento de un arreglo se usa el comodín: body("tags.*"). Formato (isMongoId + bail) antes de consultar la base.
  body('tags')
    .optional()
    .isArray({ min: 1 })
    .withMessage('tags debe ser un arreglo con al menos 1 elemento')
    .bail()
    .custom((value) => {
      // sin ids repetidos: el Set elimina duplicados, si cambia el tamaño había repetidos
      if (new Set(value.map(String)).size !== value.length) {
        throw new Error('tags no puede tener ids repetidos');
      }
      return true;
    }),
  body('tags.*')
    .isMongoId()
    .withMessage('cada tag debe ser un ObjectId válido')
    .bail() // si el formato falla, NO consulta la base
    .custom(async (value) => {
      const tag = await TagModel.findOne({ _id: value, activo: true });
      if (!tag) throw new Error('El tag no existe o está inactivo');
      return true;
    }),
];

export const updateTicketValidation = [
  // TODO: 6. Validar el id de la ruta. title, description, priority y tags como OPCIONALES, con las mismas reglas que al crear.
  // ? code, status y assigned_to NO se editan por este endpoint: no los valides y matchedData no los va a devolver.
  param('id').isMongoId().withMessage('El ID no es un ObjectId válido'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El title no puede estar vacío')
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage('El title debe tener entre 5 y 100 caracteres'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La description no puede estar vacía')
    .bail()
    .isLength({ max: 1000 })
    .withMessage('La description no puede superar los 1000 caracteres'),
  body('priority')
    .optional()
    .isIn(PRIORITIES)
    .withMessage(`priority debe ser: ${PRIORITIES.join(', ')}`),
  ...tagsRules,
];

export const assignTicketValidation = [
  // TODO: 7. Validar el id de la ruta y assigned_to: obligatorio, ObjectId válido de un usuario ACTIVO con role "agent".
  param('id').isMongoId().withMessage('El ID no es un ObjectId válido'),
  body('assigned_to')
    .notEmpty()
    .withMessage('assigned_to es obligatorio')
    .bail()
    .isMongoId()
    .withMessage('assigned_to debe ser un ObjectId válido')
    .bail()
    .custom(async (id) => {
      if (!(await UserModel.findOne({ _id: id, activo: true, role: 'agent' })))
        throw new Error('El usuario asignado debe ser un agente activo');
      return true;
    }),
];

export const commentValidation = [
  // TODO: 8. Validar el id de la ruta y text: obligatorio, máximo 500 caracteres.
  param('id').isMongoId().withMessage('El ID no es un ObjectId válido'),
  body('text')
    .notEmpty()
    .withMessage('El texto es obligatorio')
    .isLength({ max: 500 })
    .bail()
    .withMessage('El texto debe tener como maximo 500 caracteres'),
];
