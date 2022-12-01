import { REGISTER_USER, TPayload } from "../actions/register";
import { TUnionAction } from "../actions";

type TInitialState = TPayload

export const initialState: TInitialState = {
  success: false,
  user: {}
};

export const registerUserReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case REGISTER_USER: {
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
