// * ARCHIVO A COMPLETAR
import { matchedData } from 'express-validator';
import { TagModel, TicketModel } from '../models/index.js';

export const createTag = async (req, res) => {
  try {
    // TODO: 1. Crear el tag con los datos validados forzando activo: true y responder 201 con { ok, mensaje, data }.
    const datos = matchedData(req);
    const tag = await TagModel.create(datos);
    return res
      .status(201)
      .json({ ok: true, mensaje: 'Etiqueta creada correctamente', data: tag });
  } catch (error) {
    // TODO: 2. Nombre repetido (code 11000) -> 400 "El nombre ya existe".
    if (error.code === 11000)
      return res
        .status(400)
        .json({ ok: false, mensaje: 'Error al crear la etiqueta' });
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const getTags = async (_req, res) => {
  try {
    // TODO: 3. Listar los tags ACTIVOS con sus tickets ACTIVOS (virtual populate con match; de cada ticket solo code y title).
    const tags = await TagModel.find({ activo: true }).populate({
      path: 'tasks',
      select: 'code title',
    });
    res.status(200).json({ ok: true, data: tags });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const deleteTag = async (req, res) => {
  try {
    // TODO: 4. Eliminación lógica: activo -> false (solo si estaba activo). 404 si no existe.
    // TODO: 5. Cascada manual: quitar el tag del arreglo tags de todos los tickets que lo tengan ($pull).
    // TODO: 6. Responder 200 con un mensaje y ticketsActualizados (modifiedCount).
    const { id } = matchedData(req);
    const tag = await TagModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { returnDocument: 'after' },
    );
    if (!tag) {
      return res
        .status(404)
        .json({ ok: false, mensaje: 'Etiqueta no encontrada' });
    }

    // Cascada: quita la etiqueta de todas las tareas que la tenían
    await TicketModel.updateMany({ tags: id }, { $pull: { tags: id } });

    res
      .status(200)
      .json({ ok: true, mensaje: 'Etiqueta eliminada correctamente' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
