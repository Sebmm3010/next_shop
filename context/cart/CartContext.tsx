import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart: ICartProduct[];

  // *Metodos
  addProductCart: (value: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
