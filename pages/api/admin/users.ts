import { db } from "@/data";
import { User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/interfaces";
import { isValidObjectId } from "mongoose";

type Data = { msg: string } | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select("-password").lean();
  await db.disconnect();

  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = "", role = "" } = req.body;
  const validRoles = ["admin", "client", "super-user", "CEO"];

  if (!isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ msg: `No existe usuario para la id: ${userId}` });
  }

  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ msg: `Role ${role} no es asignable: ${validRoles.join(", ")}` });
  }
  await db.connect();
  const user = await User.findById(userId);
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ msg: `usuario ${userId} no encontrado` });
  }

  user.role = role;
  await user.save();
  await db.disconnect();
  res.status(200).json({ msg: "Usuario actualizado" });
};
