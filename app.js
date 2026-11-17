// ! ARCHIVO BASE: no modificar
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import "./src/models/index.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/users.routes.js";
import { tagRoutes } from "./src/routes/tags.routes.js";
import { ticketRoutes } from "./src/routes/tickets.routes.js";
import { notFound, errorHandler } from "./src/middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", tagRoutes);
app.use("/api", ticketRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
);
