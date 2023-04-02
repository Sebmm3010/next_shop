import { ICartProduct } from "@/interfaces";
import { CartState, ShippingAddress } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from cookies"; payload: ICartProduct[] }
  | { type: "[Cart] - Update productos del carro"; payload: ICartProduct[] }
  | { type: "[Cart] - Cambiar cantidad de productos"; payload: ICartProduct }
  | { type: "[Cart] - Eliminar producto carrito"; payload: ICartProduct }
  | { type: "[Cart] - Load Address from Cookies"; payload: ShippingAddress }
  | { type: "[Cart] - Update Address from Cookies"; payload: ShippingAddress }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        iva: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies":
      return {
        ...state,
        isCartLoaded: true,
        cart: action.payload,
      };
    case "[Cart] - Update productos del carro":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Cambiar cantidad de productos":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case "[Cart] - Eliminar producto carrito":
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
        }),
      };

    case "[Cart] - Update order summary": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "[Cart] - Load Address from Cookies": {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    case "[Cart] - Update Address from Cookies": {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    default:
      return state;
  }
};
