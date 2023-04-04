import { FC, useReducer, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { AuthContext, authReducer } from "./";
import { IUser } from "@/interfaces";
import { nextShopApi } from "@/api";
import Cookies from "js-cookie";
import axios from "axios";

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}
export interface RegisterUser {
  hasError: boolean;
  message?: string;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined,
};

interface Props {
  children: ReactNode;
}
export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // console.log(data?.user);
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser});
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await nextShopApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await nextShopApi.post("/user/login", {
        email,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterUser> => {
    try {
      const { data } = await nextShopApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Register-Login", payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "El usuario no pudo ser registrado - Intente de nuevo",
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove("cart");
    Cookies.remove("name");
    Cookies.remove("lastName");
    Cookies.remove("address1");
    Cookies.remove("address2");
    Cookies.remove("city");
    Cookies.remove("postalCode");
    Cookies.remove("country");
    Cookies.remove("phone");
    signOut();
    // router.reload();
    // Cookies.remove("token");
    dispatch({ type: "[Auth] - Logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // *Metodos
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
