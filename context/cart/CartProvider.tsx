import { FC, useReducer, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { ICartProduct, IOrder, ShippingAddress } from "@/interfaces";
import { CartContext, cartReducer } from "./";
import { nextShopApi } from "@/api";

// export interface ShippingAddress {
//   name: string;
//   lastName: string;
//   address1: string;
//   address2?: string;
//   city: string;
//   postalCode: string;
//   country: string;
//   phone: string;
// }
export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  iva: number;
  total: number;
  isCartLoaded: boolean;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  iva: 0,
  total: 0,
  isCartLoaded: false,
  shippingAddress: undefined,
};

interface Props {
  children: ReactNode;
}
export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // * Obtener productos del carro
  useEffect(() => {
    try {
      const cookieCart = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
        : [];
      dispatch({ type: "[Cart] - LoadCart from cookies", payload: cookieCart });
    } catch (error) {
      dispatch({ type: "[Cart] - LoadCart from cookies", payload: [] });
    }
  }, []);

  // *Obtener la direccion de envio por cookies
  useEffect(() => {
    if (Cookies.get("name")) {
      const addressData = {
        name: Cookies.get("name") || "",
        lastName: Cookies.get("lastName") || "",
        address1: Cookies.get("address1") || "",
        address2: Cookies.get("address2") || "",
        city: Cookies.get("city") || "",
        postalCode: Cookies.get("postalCode") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };
      dispatch({
        type: "[Cart] - Load Address from Cookies",
        payload: addressData,
      });
    }
  }, []);

  // * Setear productos del carro
  useEffect(() => {
    if (state.cart.length > 0) Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // *Calcular valores para eorder summary
  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const ivaPorcentaje = Number(process.env.NEXT_PUBLIC_IVA || 0);
    const orderSummary = {
      numberOfItems,
      subTotal,
      iva: subTotal * ivaPorcentaje,
      total: subTotal * (ivaPorcentaje + 1),
    };
    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

  // *Funciones del context
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

  const updateProductQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Cambiar cantidad de productos",
      payload: product,
    });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Eliminar producto carrito", payload: product });
  };

  const updateAddress = (newAddress: ShippingAddress) => {
    Cookies.set("name", newAddress.name);
    Cookies.set("lastName", newAddress.lastName);
    Cookies.set("address1", newAddress.address1);
    Cookies.set("address2", newAddress.address2 || "");
    Cookies.set("city", newAddress.city);
    Cookies.set("postalCode", newAddress.postalCode);
    Cookies.set("country", newAddress.country);
    Cookies.set("phone", newAddress.phone);
    dispatch({
      type: "[Cart] - Update Address from Cookies",
      payload: newAddress,
    });
  };

  const createOrders = async () => {
    if (!state.shippingAddress) {
      throw new Error("No hay direccion de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart.map(p=>({...p, size:p.size!})),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      iva: state.iva,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await nextShopApi.post("/orders", body);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        // *Metodos
        addProductCart,
        updateProductQuantity,
        removeCartProduct,
        updateAddress,
        createOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
