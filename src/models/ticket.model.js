// * ARCHIVO A COMPLETAR
import { Schema, model } from "mongoose";

// * Comentario: subdocumento EMBEBIDO dentro del ticket (arreglo de comentarios).
const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ticketSchema = new Schema(
  {
    // TODO: 1. code: string, obligatorio, único, trim y en mayúsculas (uppercase).
    // TODO: 2. title: string, obligatorio, trim, entre 5 y 100 caracteres.
    // TODO: 3. description: string, obligatorio, trim, máximo 1000 caracteres.
    // TODO: 4. status: open, in_progress, resolved o closed; por defecto open.
    // TODO: 5. priority: low, medium o high; por defecto medium.
    // TODO: 6. created_by: referencia a User, obligatoria (quien creó el ticket).
    // TODO: 7. assigned_to: referencia a User, opcional, null por defecto (agente asignado).
    // TODO: 8. tags: arreglo de referencias a Tag (N:M; el Tag NO guarda sus tickets).
    // TODO: 9. comments: arreglo de commentSchema (embebido).
    // TODO: 10. activo: boolean con true por defecto.
  },
  { timestamps: true, versionKey: false }
);

export const TicketModel = model("Ticket", ticketSchema);
