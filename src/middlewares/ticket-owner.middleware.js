// * ARCHIVO A COMPLETAR
import { isValidObjectId } from "mongoose";
import { TicketModel } from "../models/index.js";

// TODO: 1. isTicketCreator: deja pasar solo al usuario que CREÓ el ticket (created_by).
//   - Si el id de la ruta no es un ObjectId válido -> 400.
//   - Si el ticket no existe o está inactivo -> 404.
//   - Si created_by no es el usuario logueado (req.user.id) -> 403 (ni siquiera un administrator).
//   - Si todo está bien -> next(). Ante un error inesperado -> next(error).
// ? ObjectId.equals() compara un ObjectId contra un string; con === daría siempre false.
export const isTicketCreator = async (req, res, next) => {
};
