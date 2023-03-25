import { ISize } from "./";

export interface ICartProduct {
  _id: string;
  description: string;
  image: string;
  inStock: number;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: "hombre" | "mujer" | "infantil" | "unisex";
  quantity: number;
}
