import { db } from "@/data";
import { Order, Product, User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      msg: string;
    }
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number; //role:client;
      numberOfProducts: number;
      productWithNoInvetory: number;
      lowInventory: number; // <=10
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getDashBoardData(req, res);

    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}
const getDashBoardData = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInvetory,
    lowInventory,
  ] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ isPaid: true }),
    Order.countDocuments({ isPaid: false }),
    User.countDocuments({ role: "client" }),
    Product.countDocuments(),
    Product.countDocuments({
      inStock: 0,
    }),
    Product.countDocuments({
      inStock: { $gt: 0, $lte: 10 },
    }),
  ]);
  await db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInvetory,
    lowInventory,
  });
};
