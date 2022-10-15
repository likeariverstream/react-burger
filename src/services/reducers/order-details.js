import { GET_ORDER_DETAILS } from '../actions/order-details'

const orderDetailsState = {
  id: ''
}

export const orderDetailsReducer = (state = orderDetailsState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        id: action.id
      }
    }
    default: {
      return state
    }
  }
}