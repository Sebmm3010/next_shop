import { db } from ".";
import Product from "../models/Product";
import { IProduct } from "@/interfaces";

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
};

interface ProductSlugs {
  slug: string;
}
export const getAllSlugs = async (): Promise<ProductSlugs[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();
  return slugs;
};

export const getProductsByTerms= async (term:string):Promise<IProduct[]>=>{
  const q = term.toString().toLowerCase();
  await db.connect();
  const products = await Product.find({ $text: { $search: q } })
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();
  return products;
}