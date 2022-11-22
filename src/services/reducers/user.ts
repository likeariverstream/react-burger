import { GET_USER_INFO, PATCH_USER_INFO } from "../actions/user";
import { TUnionAction } from "../actions";

type TInitialState = {
  success: boolean,
  user: {
    email: string,
    name: string
  }
}
const initialState: TInitialState = {
  success: false,
  user: {
    email: '',
    name: ''
  }
};

export const getUserInfoReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      }
    }
    case PATCH_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      }
    }
    default: {
      return state;
    }
  }
}

