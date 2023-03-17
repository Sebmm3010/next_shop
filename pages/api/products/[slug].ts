import { db } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/models";
import { IProduct } from '../../../interfaces';

type Data = { msg: string } | IProduct;


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({
        msg: "Bad Request",
      });
  }
}
const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  await db.connect();
  const product = await Product.findOne({slug})
  await db.disconnect();
    if(!product){
        await db.disconnect();
        return res.status(404).json({
            msg:"Producto no encontrado"
        })
    }

  return res.status(200).json(product);
};
