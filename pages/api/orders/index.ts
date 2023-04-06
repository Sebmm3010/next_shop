import { db } from "@/data";
import { IOrder } from "@/interfaces";
import { Order, Product } from "@/models";
import { currency } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
// import mongoose from "mongoose";

type Data = { msg: string } | IOrder;

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
  //?Confirmar que el user esta logeado
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
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      // ? Forma alternativa para resolver el current price
      // const currentPrice = dbProducts.find(
      //   (p) => new mongoose.Types.ObjectId(p._id).toString() === current._id
      // )?.price;
      if (!currentPrice) {
        throw new Error(
          "Verifique el carrito de nuevo, producto no encontrado"
        );
      }
      return current.price * current.quantity + prev;
    }, 0);

    const ivaPorcentaje = Number(process.env.NEXT_PUBLIC_IVA || 0);
    const backendTotal = subTotal * (ivaPorcentaje + 1);

    if (total !== backendTotal) {
      throw new Error("El total no cuandra con el monto");
    }

    // Todo bien hasta aqui
    const userId = session.user.id || session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.dolarTotal = currency.pesosToDollar(newOrder.total);
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({ msg: error.message || "Revisar logs del server" });
  }

  // res.status(201).json(req.body);
};
