import { ICartProduct } from "@/interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from cookies" }
  | { type: "[Cart] - UpdateProducts in cart"; payload: ICartProduct[] };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies":
      return {
        ...state,
      };
   case "[Cart] - UpdateProducts in cart":
      return {
         ...state,
         cart:[...action.payload]
      }

    default:
      return state;
  }
};
