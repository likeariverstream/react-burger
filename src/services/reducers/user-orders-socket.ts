import {
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_GET_ORDERS,
  USER_WS_SEND_MESSAGE,
  USER_WS_USER_NAME_UPDATE
} from '../actions/user-orders-socket';
import { TUnionAction } from '../actions';
import { TOrder } from '../../utils/types'

type TInitialState = {
  wsConnected: boolean,
  orders: Array<TOrder> | []
  total: null | number,
  totalToday: null | number,
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
}

export const userOrdersSocketReduser = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case USER_WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case USER_WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case USER_WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case USER_WS_GET_ORDERS: {
      return {
        ...state,
        orders: state.orders.length < 10
          ? [...state.orders, ...action.payload.orders]
          : [...state.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,

      };
    }
    case USER_WS_SEND_MESSAGE: {
      return {
        ...state,

      };
    }
    case USER_WS_USER_NAME_UPDATE: {
      return {
        ...state,
        // user: action.payload
      };
    }
    default:
      return state
  }
}
