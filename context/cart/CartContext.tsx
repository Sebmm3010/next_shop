import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  iva: number;
  total: number;

  // *Metodos
  addProductCart: (value: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
