import { FC, useReducer, ReactNode } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "@/interfaces";

export interface AuthState {
  isLogged: boolean;
  user?:IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLogged: false,
  user: undefined
};

interface Props {
  children: ReactNode;
}
export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
