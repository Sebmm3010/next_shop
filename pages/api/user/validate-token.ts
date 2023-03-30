import { db } from "@/data";
import { User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { jwt } from "@/utils";

type Data =
  | { msg: string }
  | {
      token: string;
      user: {
        name: string;
        email: any;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return validateJWT(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}

const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidaToken(token);
  } catch (error) {
    return res.status(401).json({ msg: "Token enviado es invalido" });
  }

    await db.connect();
    const user= await User.findById(userId).lean();
    await db.disconnect();

    if (!user) {
      return res
        .status(400)
        .json({ msg: "El usuario con esa id no existe" });
    }
const { _id, email, role, name}=user;

    return res.status(200).json({
      token: jwt.singToken(_id, email), //JWT
      user: {
        email,
        role,
        name
      },
    });
};
