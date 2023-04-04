import { db } from "@/data";
import { IOrder } from "@/interfaces";
import { Product } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = { msg: string } | { order: IOrder };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(400).json({ msg: "Bad request" });
  }

  res.status(200).json({ msg: "Hola, mi nombre el frile horn hernesto perez" });
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  // Confirmar que el user esta logeado
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    return res
      .status(401)
      .json({ msg: "Debe de estar autenticado para hacer esto" });
  }
  //Crear un arreglo de los productos que el usuario quiere
  const productId = orderItems.map((item) => item._id);

  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productId } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      //? Cambiar el current price por el valor que viene de mi base de datos
      const currentPrice = dbProducts.find((prod) => prod._id === current._id)!.price;
      if(currentPrice){
        throw new Error("Verifique el carrito de nuevo, producto no encontrado");
        
      }

      return (current.price * current.quantity) + prev;
    }, 0);
  } catch (error) {}

  res.status(201).json(session);
};
