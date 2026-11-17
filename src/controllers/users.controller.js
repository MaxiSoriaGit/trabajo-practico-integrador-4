// ! ARCHIVO BASE: no modificar
import { isValidObjectId } from "mongoose";
import { UserModel } from "../models/index.js";

export const getUsers = async (_req, res) => {
  try {
    const users = await UserModel.find({ activo: true });
    return res.status(200).json({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ ok: false, mensaje: "El id no es válido" });
    // Eliminación lógica: se marca activo:false en lugar de borrar el documento
    const user = await UserModel.findOneAndUpdate({ _id: req.params.id, activo: true }, { activo: false });
    if (!user) return res.status(404).json({ ok: false, mensaje: "Usuario no encontrado" });
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};
