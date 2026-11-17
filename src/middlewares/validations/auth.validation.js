// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. username: obligatorio, entre 3 y 20 caracteres y único entre usuarios ACTIVOS.
  // TODO: 2. email: obligatorio, con formato válido y único entre usuarios activos.
  // TODO: 3. password: obligatoria, mínimo 8 caracteres.
  // TODO: 4. role: opcional y limitado a client, agent y administrator.
  // TODO: 5. profile: obligatorio y de tipo objeto.
  // TODO: 6. profile.full_name: obligatorio.
  // TODO: 7. profile.phone: opcional.
  // ? Las unicidades requieren una validación personalizada asíncrona (custom) que consulte UserModel.
];

export const loginValidation = [
  // TODO: 8. email: obligatorio y con formato válido.
  // TODO: 9. password: obligatoria.
];
