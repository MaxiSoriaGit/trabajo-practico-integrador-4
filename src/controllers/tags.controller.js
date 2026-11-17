// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { TagModel, TicketModel } from "../models/index.js";

export const createTag = async (req, res) => {
  try {
    // TODO: 1. Crear el tag con los datos validados forzando activo: true y responder 201 con { ok, mensaje, data }.
  } catch (error) {
    // TODO: 2. Nombre repetido (code 11000) -> 400 "El nombre ya existe".
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const getTags = async (_req, res) => {
  try {
    // TODO: 3. Listar los tags ACTIVOS con sus tickets ACTIVOS (virtual populate con match; de cada ticket solo code y title).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    // TODO: 4. Eliminación lógica: activo -> false (solo si estaba activo). 404 si no existe.
    // TODO: 5. Cascada manual: quitar el tag del arreglo tags de todos los tickets que lo tengan ($pull).
    // TODO: 6. Responder 200 con un mensaje y ticketsActualizados (modifiedCount).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};
