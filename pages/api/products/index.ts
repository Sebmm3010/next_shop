import { db, SHOP_CONSTANS } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";

type Data = { msg: string } | IProduct[];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);

    default:
      return res.status(400).json({
        msg: "Bad request",
      });
  }
}
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;

  let condition={};

  if (gender !== "all" && SHOP_CONSTANS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }

  await db.connect();
  const products = await Product.find(condition)
    .select("title images price inStock slug -_id")
    .lean();
  await db.disconnect();
  return res.status(200).json(products);
};
