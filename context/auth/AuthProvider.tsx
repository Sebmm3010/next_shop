import { FC, useReducer, ReactNode } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "@/interfaces";
import { nextShopApi } from "@/api";
import Cookies from "js-cookie";

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // *Metodos
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
