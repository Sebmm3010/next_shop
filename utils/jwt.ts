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

export const isValidaToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error(
      "No se encontro semilla del Json web token - Revisar variables de entorno"
    );
  }

  return new Promise((resolve, reject) => {
    try {
      JWT.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("JWT es invalido");

        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject("JWT es invalido");
    }
  });
};
