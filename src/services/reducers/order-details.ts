import {
  DELETE_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order-details';
import { TUnionAction } from '../../services/actions/index';

type TInitialState = {
  id: string,
  orderRequest: boolean,
  orderSuccess: boolean,
  orderFailed: boolean
}

export const initialState: TInitialState = {
  id: '',
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
}

export const orderDetailsReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case DELETE_ORDER: {
      return {
        ...state,
        id: '',
        orderSuccess: false
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderSuccess: true,
        id: action.payload
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      }
    }
    default: {
      return state
    }
  }
}
