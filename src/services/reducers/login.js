import { LOGIN_USER, LOGOUT_USER } from "../actions/login";

const initialState = {
  login: false,
  logout: false,
  user: {},
  accessToken: '',
  refreshToken: ''
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
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    }
    default: {
      return state;
    }
  }
}

