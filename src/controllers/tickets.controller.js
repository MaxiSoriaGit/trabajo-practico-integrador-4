// * ARCHIVO A COMPLETAR
import { matchedData } from 'express-validator';
import { TicketModel } from '../models/index.js';

// ? Podés armar un helper para no repetir los populate en cada consulta.
const conRelaciones = (query) =>
  query
    .populate('created_by', 'username email')
    .populate('assigned_to', 'username email')
    .populate('tags')
    .populate('comments.author', 'username');

export const createTicket = async (req, res) => {
  try {
    // TODO: 1. Crear el ticket con los datos validados. created_by es el usuario LOGUEADO (no viene en el body) y activo: true.
    // TODO: 2. Responder 201 con el ticket, incluyendo created_by (username y email) y tags.
    const creado = await TicketModel.create({
      ...matchedData(req),
      created_by: req.user.id,
      activo: true,
    });
    await creado.populate([
      { path: 'created_by', select: 'username email' },
      { path: 'tags' },
    ]);
    return res
      .status(201)
      .json({ ok: true, mensaje: 'Ticket creado correctamente', data: creado });
  } catch (error) {
    // TODO: 3. Code repetido (11000) -> 400 "El code ya existe".
    if (error.code === 11000)
      return res.status(400).json({ ok: false, mensaje: 'El code ya existe' });
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const getTickets = async (_req, res) => {
  try {
    // TODO: 4. Listar los tickets ACTIVOS (más nuevos primero) con created_by, assigned_to, tags y los autores de los comments.
    const tickets = await conRelaciones(
      TicketModel.find({ activo: true }).sort({ createdAt: -1 }),
    );
    return res.status(200).json({ ok: true, data: tickets });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    // TODO: 5. Listar los tickets ACTIVOS creados por el usuario logueado, con assigned_to y tags.
    const tickets = await TicketModel.find({
      created_by: req.user.id,
      activo: true,
    })
      .populate('assigned_to', 'username')
      .populate('tags');
    return res.status(200).json({ ok: true, data: tickets });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const updateTicket = async (req, res) => {
  try {
    // TODO: 6. Actualizar un ticket activo con los datos del BODY (si vienen tags, reemplazan al arreglo anterior).
    //          Devolver el documento nuevo (new) y correr las validaciones del schema (runValidators).
    // TODO: 7. Responder 200 con el ticket actualizado y sus relaciones.
    // ? isTicketCreator ya comprobó que existe y que es del usuario. matchedData(req, { locations: ["body"] }).
    const datos = matchedData(req, { locations: ['body'] });
    const ticket = await conRelaciones(
      TicketModel.findOneAndUpdate(
        { _id: req.params.id, activo: true },
        datos,
        { new: true, runValidators: true },
      ),
    );
    return res
      .status(200)
      .json({
        ok: true,
        mensaje: 'Ticket actualizado correctamente',
        data: ticket,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const assignTicket = async (req, res) => {
  try {
    // TODO: 8. Asignar el ticket (assigned_to del body) y pasar su status a "in_progress" con un solo $set.
    //          404 si el ticket no existe o está inactivo. Responder 200 con el ticket y sus relaciones.
    const { assigned_to } = matchedData(req, { locations: ['body'] });
    const ticket = await conRelaciones(
      TicketModel.findOneAndUpdate(
        { _id: req.params.id, activo: true },
        { $set: { assigned_to, status: 'in_progress' } },
        { new: true },
      ),
    );
    if (!ticket)
      return res
        .status(404)
        .json({ ok: false, mensaje: 'Ticket no encontrado' });
    return res
      .status(200)
      .json({
        ok: true,
        mensaje: 'Ticket asignado correctamente',
        data: ticket,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const addComment = async (req, res) => {
  try {
    // TODO: 9. Agregar un comentario { author: usuario logueado, text } al arreglo comments con $push.
    //   - 404 si el ticket no existe o está inactivo.
    //   - 403 si el usuario NO es el creador, ni el agente asignado, ni un administrator.
    //   - Responder 201 con el ticket actualizado y sus relaciones.
    const { text } = matchedData(req, { locations: ['body'] });
    const existente = await TicketModel.findOne({
      _id: req.params.id,
      activo: true,
    });
    if (!existente)
      return res
        .status(404)
        .json({ ok: false, mensaje: 'Ticket no encontrado' });

    const esCreador = existente.created_by.equals(req.user.id);
    const esAsignado = existente.assigned_to?.equals(req.user.id);
    if (!esCreador && !esAsignado && req.user.role !== 'administrator')
      return res
        .status(403)
        .json({ ok: false, mensaje: 'No participás en este ticket' });

    const ticket = await conRelaciones(
      TicketModel.findByIdAndUpdate(
        existente._id,
        { $push: { comments: { author: req.user.id, text } } },
        { new: true },
      ),
    );
    return res
      .status(201)
      .json({ ok: true, mensaje: 'Comentario agregado', data: ticket });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    // TODO: 10. Eliminación lógica (activo: false) y responder 200 con un mensaje.
    // ? isTicketCreator ya comprobó que existe y que es del usuario.
    await TicketModel.findByIdAndUpdate(req.params.id, { activo: false });
    return res
      .status(200)
      .json({ ok: true, mensaje: 'Ticket eliminado correctamente' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
