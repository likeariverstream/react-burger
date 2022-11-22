import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'
import { TUnionAction } from '../actions/index'

type TInitialState = {
  success: boolean
}
const initialState: TInitialState = {
  success: false
}

export const resetPasswordReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case GET_RESET_PASSWORD_SUCCESS: {
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
