import { REGISTER_USER } from "../actions/register";

const initialState = {
  success: false,
  user: {},
  accessToken: '',
  refreshToken: ''
};

export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        success: action.payload.success,
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
