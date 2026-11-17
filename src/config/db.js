// ! ARCHIVO BASE: no modificar
// =====================================================================
// CONEXIÓN A MONGODB
// MONGO_URI sale del .env. Si no conecta, no tiene sentido seguir: se corta el proceso.
// =====================================================================
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB:", mongoose.connection.name);
  } catch (error) {
    console.log("Error al conectarse a MongoDB:", error.message);
    process.exit(1);
  }
};
