// ! ARCHIVO BASE: no modificar
// =====================================================================
// HASH DE PASSWORDS — nunca se guarda la password en texto plano
// =====================================================================
import bcrypt from "bcrypt";

// Al registrar: texto plano -> hash
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Al loguear: compara el texto que escribió la persona contra el hash guardado
export const comparePassword = async (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);
