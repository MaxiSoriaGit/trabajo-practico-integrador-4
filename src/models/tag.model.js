// * ARCHIVO A COMPLETAR
import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    // TODO: 1. name: string, obligatorio, único (índice común), trim, entre 3 y 50 caracteres.
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    // TODO: 2. description: string, opcional, máximo 200 caracteres.
    description: {
      type: String,
      maxlength: 200,
    },
    // TODO: 3. activo: boolean con true por defecto.
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    // TODO: 4. Activar virtuals en toJSON y toObject.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO: 5. Virtual "tickets": los tickets que tengan este tag en su arreglo tags (lado inverso de la N:M).
tagSchema.virtual('tickets', {
  ref: 'Ticket',
  localField: '_id',
  foreignField: 'tags',
  match: { activo: true },
});

export const TagModel = model('Tag', tagSchema);
