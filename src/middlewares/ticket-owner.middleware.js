// * ARCHIVO A COMPLETAR
import { isValidObjectId } from 'mongoose';
import { TicketModel } from '../models/index.js';

// TODO: 1. isTicketCreator: deja pasar solo al usuario que CREÓ el ticket (created_by).
//   - Si el id de la ruta no es un ObjectId válido -> 400.
//   - Si el ticket no existe o está inactivo -> 404.
//   - Si created_by no es el usuario logueado (req.user.id) -> 403 (ni siquiera un administrator).
//   - Si todo está bien -> next(). Ante un error inesperado -> next(error).
// ? ObjectId.equals() compara un ObjectId contra un string; con === daría siempre false.
export const isTicketCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ ok: false, mensaje: 'El id no es válido' });
    const ticket = await TicketModel.findOne({ _id: id, activo: true });
    if (!ticket)
      return res
        .status(404)
        .json({ ok: false, mensaje: 'Ticket no encontrado' });
    if (!ticket.created_by.equals(req.user.id))
      return res
        .status(403)
        .json({
          ok: false,
          mensaje: 'Solo quien creó el ticket puede hacer esto',
        });
    next();
  } catch (error) {
    next(error);
  }
};
