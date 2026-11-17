// ! ARCHIVO BASE: no modificar
import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/roles.middleware.js";

export const userRoutes = Router();

userRoutes.get("/users", authMiddleware, authorize("administrator"), getUsers);
userRoutes.delete("/users/:id", authMiddleware, authorize("administrator"), deleteUser);
