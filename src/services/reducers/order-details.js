import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order-details'

const orderDetailsState = {
  id: '',
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
}

export const orderDetailsReducer = (state = orderDetailsState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderSuccess: false,
        id: action.id
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