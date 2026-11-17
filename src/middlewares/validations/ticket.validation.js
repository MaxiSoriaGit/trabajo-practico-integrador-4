// * ARCHIVO A COMPLETAR
import { body, param } from "express-validator";
import { TagModel, TicketModel, UserModel } from "../../models/index.js";

const PRIORITIES = ["low", "medium", "high"];

// * Reglas de tags compartidas por crear y editar (TODO 5 y 9).

export const ticketIdValidation = [
  // TODO: 1. Validar el :id de la ruta (ObjectId).
];

export const createTicketValidation = [
  // TODO: 2. code: obligatorio, entre 3 y 20 caracteres y único (TicketModel; compará en mayúsculas).
  // TODO: 3. title: obligatorio (5 a 100 caracteres). description: obligatoria (máximo 1000).
  // TODO: 4. priority: opcional y dentro de low, medium, high.
  // TODO: 5. tags: opcional; si viene, arreglo con al menos 1 elemento, sin ids repetidos, y cada uno un ObjectId de un tag existente y ACTIVO.
  // ? Para cada elemento de un arreglo se usa el comodín: body("tags.*"). Formato (isMongoId + bail) antes de consultar la base.
];

export const updateTicketValidation = [
  // TODO: 6. Validar el id de la ruta. title, description, priority y tags como OPCIONALES, con las mismas reglas que al crear.
  // ? code, status y assigned_to NO se editan por este endpoint: no los valides y matchedData no los va a devolver.
];

export const assignTicketValidation = [
  // TODO: 7. Validar el id de la ruta y assigned_to: obligatorio, ObjectId válido de un usuario ACTIVO con role "agent".
];

export const commentValidation = [
  // TODO: 8. Validar el id de la ruta y text: obligatorio, máximo 500 caracteres.
];
