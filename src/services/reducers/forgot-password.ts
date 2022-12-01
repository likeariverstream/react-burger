import { GET_PASSWORD_SUCCESS } from "../actions/forgot-password";
import { TUnionAction } from '../actions/index'

type TIinitialState = {
  success: boolean
}

export const initialState: TIinitialState = {
  success: false
}

export const recoverPasswordReducer = (state = initialState, action: TUnionAction): TIinitialState => {
  switch (action.type) {
    case GET_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
