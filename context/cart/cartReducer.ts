import { ICartProduct } from '@/interfaces';
import { CartState } from './';


type CartActionType =
  | { type: "[Cart] - LoadCart from cookies" }
  | { type: "[Cart] - AddProduct", payload: ICartProduct }; 



export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {

   switch (action.type) {
      case '[Cart] - LoadCart from cookies':
         return {
            ...state,
          }

       default:
          return state;
   }

}