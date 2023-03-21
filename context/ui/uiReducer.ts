import { uiState } from './';


type UiActionType = 
   | { type: '[Ui] - setIsSideMenuOpen', payload:boolean } 


export const uiReducer = ( state: uiState, action: UiActionType ): uiState => {

   switch (action.type) {
      case '[Ui] - setIsSideMenuOpen':
         return {
            ...state,
            isSideMenuOpen: action.payload
          }

       default:
          return state;
   }

}