import { LOGIN_USER, LOGOUT_USER } from "../actions/login";

const initialState = {
  login: null,
  logout: false,
  user: {},
};



export const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      
      return {
        ...state,
        login: !action.payload.success,
        logout: action.payload.success,
        user: {}
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        login: action.payload.success,
        logout: !action.payload.success,
        user: action.payload.user,
      }
    }
    default: {
      return state;
    }
  }
}
