import { createContext } from "react";

interface ContextProps {
  isSideMenuOpen: boolean;
  //   *Metodos
  toogleSideMenu: (value:boolean) => void;
}

export const UiContext = createContext({} as ContextProps);
