import { FC, useReducer, ReactNode } from "react";
import { UiContext, uiReducer } from "./";

export interface uiState {
  isSideMenuOpen: boolean;
}

const UI_INITIAL_STATE: uiState = {
 isSideMenuOpen : false,
};

interface Props {
  children: ReactNode;
}
export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toogleSideMenu=(value:boolean)=>{
    dispatch({type:"[Ui] - setIsSideMenuOpen", payload:value});
  }

  return (
    <UiContext.Provider
      value={{
        ...state,

        // *Metodos
        toogleSideMenu
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
