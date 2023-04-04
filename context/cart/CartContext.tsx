import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  iva: number;
  total: number;
  isCartLoaded: boolean;
  shippingAddress?: ShippingAddress;

  // *Metodos
  addProductCart: (value: ICartProduct) => void;
  updateProductQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (newAddress: ShippingAddress) => void;
  createOrders: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);
