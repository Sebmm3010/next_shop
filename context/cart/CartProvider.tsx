import { FC, useReducer, ReactNode, useEffect } from "react";
import Cookie from "js-cookie";
import { ICartProduct } from "@/interfaces";
import { CartContext, cartReducer } from "./";
Cookie;
export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children: ReactNode;
}
export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // * Obtener productos del carro
  useEffect(() => {
    try {
      const cookieCart = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({ type: "[Cart] - LoadCart from cookies", payload: cookieCart });
    } catch (error) {
      dispatch({ type: "[Cart] - LoadCart from cookies", payload: [] });
    }
  }, []);
  // * Setear productos del carro
  useEffect(() => {
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductCart = (value: ICartProduct) => {
    const productsInCart = state.cart.some((p) => p._id === value._id);
    // ? Ingresa el producto si no existe en el carro
    if (!productsInCart)
      return dispatch({
        type: "[Cart] - Update productos del carro",
        payload: [...state.cart, value],
      });

    const diferentsSizeProductInCart = state.cart.some(
      (p) => p._id === value._id && p.size === value.size
    );
    // ?Validar si el producto existe pero tiene otra talla
    if (!diferentsSizeProductInCart)
      return dispatch({
        type: "[Cart] - Update productos del carro",
        payload: [...state.cart, value],
      });

    const updateProducts = state.cart.map((p) => {
      if (p._id !== value._id) return p;
      if (p.size !== value.size) return p;

      p.quantity += value.quantity;
      return p;
    });
    dispatch({
      type: "[Cart] - Update productos del carro",
      payload: updateProducts,
    });
  };
  const updateProductQuantity=(product:ICartProduct)=>{
    dispatch({type:"[Cart] - Cambiar cantidad de productos", payload:product})
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductCart,
        updateProductQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
