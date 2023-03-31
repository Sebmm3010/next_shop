import { IUser } from '@/interfaces';
import { createContext } from 'react';
import { RegisterUser } from './AuthProvider';


interface ContextProps {
  isLogged: boolean;
  user?: IUser;
  // *Metodos
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<RegisterUser>;
}


export const AuthContext = createContext({} as ContextProps );