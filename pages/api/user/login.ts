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
    case "POST":
      return loginUser(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res
      .status(400)
      .json({ msg: "Correo o contraseña invalidos - EMAIL" });
  }
  if (!bcrypt.compareSync(password, user.password!)) {
    return res
      .status(400)
      .json({ msg: "Correo o contraseña no validos - contraseña" });
  }

  const { role, name, _id } = user;

  const token= jwt.singToken(_id, email);

  return res.status(200).json({
    token, //JWT
    user: {
      name,
      email,
      role,
    },
  });
};
