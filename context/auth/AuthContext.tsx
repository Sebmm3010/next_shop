import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
  isLogged: boolean;
  user?: IUser;
  // *Metodos
  loginUser: (email: string, password: string) => Promise<boolean>;
}


export const AuthContext = createContext({} as ContextProps );