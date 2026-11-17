// * ARCHIVO A COMPLETAR
import { Schema, model } from 'mongoose';

// * Comentario: subdocumento EMBEBIDO dentro del ticket (arreglo de comentarios).
const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, trim: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ticketSchema = new Schema(
  {
    // TODO: 1. code: string, obligatorio, único, trim y en mayúsculas (uppercase).
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    // TODO: 2. title: string, obligatorio, trim, entre 5 y 100 caracteres.
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    // TODO: 3. description: string, obligatorio, trim, máximo 1000 caracteres.
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    // TODO: 4. status: open, in_progress, resolved o closed; por defecto open.
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    // TODO: 5. priority: low, medium o high; por defecto medium.
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    // TODO: 6. created_by: referencia a User, obligatoria (quien creó el ticket).
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // TODO: 7. assigned_to: referencia a User, opcional, null por defecto (agente asignado).
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // TODO: 8. tags: arreglo de referencias a Tag (N:M; el Tag NO guarda sus tickets).
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],

    // TODO: 9. comments: arreglo de commentSchema (embebido).
    comments: [commentSchema],

    // TODO: 10. activo: boolean con true por defecto.
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const TicketModel = model('Ticket', ticketSchema);
