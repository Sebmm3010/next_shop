import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "@/interfaces";
import { db } from "@/data";
import { Product } from "@/models";
import { isValidObjectId } from "mongoose";

type Data = { msg: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "POST":
      return createProduct(req, res);
    default:
      return res.status(400).json({ msg: "Bad request" });
  }
}
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const product = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();
  //TODO: actualizar imagenes
  return res.status(200).json(product);
};
const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ msg: `El ID: ${_id} no es un id valido` });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ msg: "El producto debe tener minimo 2 imagenes" });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res
        .status(400)
        .json({ msg: `No se encontro el producto con el ID:${_id}` });
    }

    // ?Eliminar fotos de cloudinary
    await product.updateOne(req.body);
    await db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ msg: "Revisar la consola del servidor" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [], slug } = req.body as IProduct;
  if (images.length < 2) {
    return res
      .status(400)
      .json({ msg: "El producto debe de tener minimo 2 imagenes" });
  }

  try {
    await db.connect();
    const productDB = await Product.findOne({ slug: slug });

    if (productDB) {
      return res.status(400).json({
        msg: `El producto con el slug ${slug} ya existe en la base de datos`,
      });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ msg: "Revisar la consola del servidor" });
  }
};
