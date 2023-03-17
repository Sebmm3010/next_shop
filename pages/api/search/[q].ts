import { db } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/models";
import { IProduct } from "../../../interfaces";

type Data = { msg: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProduct(req, res);

    default:
      return res.status(400).json({
        msg: "Bad Request",
      });
  }
}
const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = "" } = req.query;
  if (q.length === 0) {
    return res.status(400).json({
      msg: "Bad request",
    });
  }

  q = q.toString().toLowerCase();
  await db.connect();

  const products = await Product.find({ $text: { $search: q } })
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return res.json(products);
};
