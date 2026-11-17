// * ARCHIVO A COMPLETAR
import { Schema, model } from "mongoose";

// * Perfil del usuario (relación 1:1): va EMBEBIDO dentro del usuario, sin colección propia.
const profileSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, trim: true, maxlength: 20 },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 },
    password: { type: String, required: true, select: false },
    // TODO: 1. role: string limitado a client, agent y administrator, con client por defecto.
    // TODO: 2. profile: embeber profileSchema como subdocumento obligatorio.
    // TODO: 3. activo: boolean con true por defecto (eliminación lógica).
  },
  { timestamps: true, versionKey: false }
);

// TODO: 4. username y email únicos SOLO entre usuarios activos (índices parciales con activo: true).

export const UserModel = model("User", userSchema);
