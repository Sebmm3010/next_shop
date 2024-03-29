import { db } from "@/data";
import { IOrder } from "@/interfaces";
import { Order } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { msg: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrderByUser(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}
const getOrderByUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const orders = await Order.find()
    .sort({
      createdAt: "desc",
    })
    .populate("user", "name email")
    .lean();
  await db.disconnect();
  return res.status(200).json(orders);
};
