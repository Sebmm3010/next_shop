import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart: ICartProduct[];

  // *Metodos
  addProductCart: (value: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product:ICartProduct)=>void;
}

export const CartContext = createContext({} as ContextProps);
