// * ARCHIVO A COMPLETAR
import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    // TODO: 1. name: string, obligatorio, único (índice común), trim, entre 3 y 50 caracteres.
    // TODO: 2. description: string, opcional, máximo 200 caracteres.
    // TODO: 3. activo: boolean con true por defecto.
  },
  {
    timestamps: true,
    versionKey: false,
    // TODO: 4. Activar virtuals en toJSON y toObject.
  }
);

// TODO: 5. Virtual "tickets": los tickets que tengan este tag en su arreglo tags (lado inverso de la N:M).

export const TagModel = model("Tag", tagSchema);
