// * ARCHIVO A COMPLETAR
import { Router } from "express";
import {
  addComment, assignTicket, createTicket, deleteTicket, getMyTickets, getTickets, updateTicket,
} from "../controllers/tickets.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roles.middleware.js";
import { isTicketCreator } from "../middlewares/ticket-owner.middleware.js";
import { validarCampos } from "../middlewares/validarCampos.middleware.js";
import {
  assignTicketValidation, commentValidation, createTicketValidation, ticketIdValidation, updateTicketValidation,
} from "../middlewares/validations/ticket.validation.js";

export const ticketRoutes = Router();

// TODO: 1. Aplicar en cada ruta los middlewares que correspondan, en el orden correcto:
//   POST   /tickets                -> sesión iniciada
//   GET    /tickets                -> agent o administrator
//   GET    /tickets/my-tickets     -> sesión iniciada   (OJO: debe ir ANTES de /tickets/:id)
//   PUT    /tickets/:id            -> solo el creador
//   PATCH  /tickets/:id/assign     -> agent o administrator
//   POST   /tickets/:id/comments   -> sesión iniciada (la regla de participación la resuelve el controlador)
//   DELETE /tickets/:id            -> solo el creador
