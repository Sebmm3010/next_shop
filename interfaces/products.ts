export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: "hombre" | "mujer" | "infantil" | "unisex";

  createdAt: string;
  updatedAt: string;
}

export type ISize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "XXXL"
  | "30"
  | "33"
  | "35"
  | "36"
  | "37"
  | "40"
  | "43";
export type IType =
  | "camisa"
  | "pantalon"
  | "chaqueta"
  | "sombrero"
  | "zapatos"
  | "vestido";
