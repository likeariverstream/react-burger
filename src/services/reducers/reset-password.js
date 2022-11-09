import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'

const initialState = {
  success: false
}

export const resetPasswordReducer = (state = initialState, action) => {
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
