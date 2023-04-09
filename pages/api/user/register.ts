import { db } from "@/data";
import { User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { jwt, validation } from "@/utils";

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
    case "POST":
      return registerUser(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    email = "",
    password = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      msg: "la contraseña debe tener minimo 6 caracteres",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      msg: "Nombre debe ser mayor a 2 caracteres",
    });
  }

  if (!validation.isValidEmail(email)) {
    return res.status(400).json({
      msg: "Nombre debe ser mayor a 2 caracteres",
    });
  }

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();
  if (user) {
    return res.status(400).json({
      msg: "Correo en uso",
    });
  }

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Revisar logs del server" });
  }

  const { role, _id } = newUser;

  const token = jwt.singToken(_id, email);

  return res.status(200).json({
    token, //JWT
    user: {
      name,
      email,
      role,
    },
  });
};
