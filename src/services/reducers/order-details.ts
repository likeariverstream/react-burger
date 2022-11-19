import {
  DELETE_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order-details'

const initialState = {
  id: '',
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
}

export const orderDetailsReducer = (state = initialState, action: {type: string, payload: string}) => {
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
        orderFailed: true,
        orderRequest: false
      }
    }
    default: {
      return state
    }
  }
}
