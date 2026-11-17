// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { TicketModel } from "../models/index.js";

// ? Podés armar un helper para no repetir los populate en cada consulta.

export const createTicket = async (req, res) => {
  try {
    // TODO: 1. Crear el ticket con los datos validados. created_by es el usuario LOGUEADO (no viene en el body) y activo: true.
    // TODO: 2. Responder 201 con el ticket, incluyendo created_by (username y email) y tags.
  } catch (error) {
    // TODO: 3. Code repetido (11000) -> 400 "El code ya existe".
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const getTickets = async (_req, res) => {
  try {
    // TODO: 4. Listar los tickets ACTIVOS (más nuevos primero) con created_by, assigned_to, tags y los autores de los comments.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    // TODO: 5. Listar los tickets ACTIVOS creados por el usuario logueado, con assigned_to y tags.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    // TODO: 6. Actualizar un ticket activo con los datos del BODY (si vienen tags, reemplazan al arreglo anterior).
    //          Devolver el documento nuevo (new) y correr las validaciones del schema (runValidators).
    // TODO: 7. Responder 200 con el ticket actualizado y sus relaciones.
    // ? isTicketCreator ya comprobó que existe y que es del usuario. matchedData(req, { locations: ["body"] }).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const assignTicket = async (req, res) => {
  try {
    // TODO: 8. Asignar el ticket (assigned_to del body) y pasar su status a "in_progress" con un solo $set.
    //          404 si el ticket no existe o está inactivo. Responder 200 con el ticket y sus relaciones.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const addComment = async (req, res) => {
  try {
    // TODO: 9. Agregar un comentario { author: usuario logueado, text } al arreglo comments con $push.
    //   - 404 si el ticket no existe o está inactivo.
    //   - 403 si el usuario NO es el creador, ni el agente asignado, ni un administrator.
    //   - Responder 201 con el ticket actualizado y sus relaciones.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    // TODO: 10. Eliminación lógica (activo: false) y responder 200 con un mensaje.
    // ? isTicketCreator ya comprobó que existe y que es del usuario.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};
