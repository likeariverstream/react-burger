import { GET_USER_INFO, PATCH_USER_INFO } from "../actions/user";

const initialState = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  // accessToken: '',
  // refreshToken: ''
};

export const getUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
        // accessToken: action.payload.accessToken,
        // refreshToken: action.payload.refreshToken
      }
    }
    case PATCH_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
        // accessToken: action.payload.accessToken,
        // refreshToken: action.payload.refreshToken
      }
    }
    default: {
      return state;
    }
  }
}
