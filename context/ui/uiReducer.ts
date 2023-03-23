import { uiState } from './';


type UiActionType = 
   | { type: '[Ui] - setIsSideMenuOpen' } 


export const uiReducer = ( state: uiState, action: UiActionType ): uiState => {

   switch (action.type) {
      case '[Ui] - setIsSideMenuOpen':
         return {
            ...state,
            isSideMenuOpen: !state.isSideMenuOpen
          }

       default:
          return state;
   }

}