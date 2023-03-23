import { createContext } from "react";

interface ContextProps {
  isSideMenuOpen: boolean;
  //   *Metodos
  toogleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
