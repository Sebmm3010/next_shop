import { ICartProduct } from "@/interfaces";
import { createContext } from "react";
import { ShippingAddress } from "./CartProvider";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  iva: number;
  total: number;
  isCartLoaded: boolean;
  shippingAddress?: ShippingAddress

  // *Metodos
  addProductCart: (value: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
