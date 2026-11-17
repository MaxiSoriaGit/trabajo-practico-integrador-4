// * ARCHIVO A COMPLETAR
import { body } from 'express-validator';
import { UserModel } from '../../models/index.js';

const ESTADOS = ['agent', 'administrador'];

export const registerValidation = [
  // TODO: 1. username: obligatorio, entre 3 y 20 caracteres y único entre usuarios ACTIVOS.
  body('username')
    .trim()
    .notEmpty()
    .withMessage('el username es obligatorio')
    .isLength({ min: 3, max: 20 })
    .withMessage('El username debe tener entre 3 y 20 caracteres')
    .isAlphanumeric()
    .withMessage('El username solo puede tener letras y numeros')
    .bail()
    .custom(async (user) => {
      const existe = await UserModel.exists({ username });
      if (existe) throw new Error('Ese username ya esta en uso');
    }),

  // TODO: 2. email: obligatorio, con formato válido y único entre usuarios activos.
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('el email es obligatorio')
    .isEmail()
    .withMessage('El email no es valido')
    .bail()
    .custom(async (email) => {
      const existe = await UserModel.exists({ email });
      if (existe) throw new Error('Ya existe un usuario con ese email');
    }),
  // TODO: 3. password: obligatoria, mínimo 8 caracteres.
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isStrongPassword({
      minLength: 8,
    })
    .withMessage('La contraseña debe tener minimo 8 caracteres'),
  // TODO: 4. role: opcional y limitado a client, agent y administrator.
  body('role')
    .optional()
    .isIn(ESTADOS)
    .withMessage(`El rol debe ser uno de: ${ESTADOS.join(', ')}`),

  // TODO: 5. profile: obligatorio y de tipo objeto.
  body('profile')
    .exists({ values: 'undefined' })
    .withMessage('El profile es obligatorio')
    .bail(),

  // TODO: 6. profile.full_name: obligatorio.
  body('profile.full_name')
    .notEmpty()
    .trim()
    .withMessage('El nombre del perfil es obligatorio'),
  // TODO: 7. profile.phone: opcional.
  body('profile.phone').optional(),
  // ? Las unicidades requieren una validación personalizada asíncrona (custom) que consulte UserModel.
];

export const loginValidation = [
  // TODO: 8. email: obligatorio y con formato válido.
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es valido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  // TODO: 9. password: obligatoria.
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];
