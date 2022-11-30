import { LOGIN_USER, LOGOUT_USER } from "../actions/login";
import { TUnionAction } from '../actions/index'
import { getCookie } from "../../utils/coockie";

type TInitialState = {
  isLoggedIn: boolean,
}

const initialState = {
  isLoggedIn: !!getCookie('access') ? true: false,
};

export const loginUserReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case LOGOUT_USER: {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}
