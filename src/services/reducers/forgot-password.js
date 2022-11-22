import { GET_PASSWORD_SUCCESS } from "../actions/forgot-password";

const initialState = {
  success: false
}

export const recoverPasswordReducer = (state = initialState, action) => {
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
