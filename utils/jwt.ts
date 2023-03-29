import JWT from "jsonwebtoken";

export const singToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error(
      "No se encontro semilla del Json web token - Revisar variables de entorno"
    );
  }

  return JWT.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: "30d",
  });
};