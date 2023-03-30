import { db, SHOP_CONSTANS } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product, User } from "@/models";
import {  IUser } from "@/interfaces";

type Data = { msg: string } | IUser[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    default:
      return res.status(400).json({
        msg: "Bad request",
      });
  }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();
  const users = await User.find()
    .select("_id name email role")
    .lean();
  await db.disconnect();
  return res.status(200).json(users);
};
    