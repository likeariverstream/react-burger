import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE
} from '../actions/socket';
import { TUnionAction } from '../actions';
import { TOrder } from '../../utils/types'

type TInitialState = {
  wsConnected: boolean,
  orders: Array<TOrder> | []
  total: null | number,
  totalToday: null | number
}

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
}

export const socketReduser = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: state.orders.length < 10
          ? [...state.orders, ...action.payload.orders]
          : [...state.orders],
          total: action.payload.total,
          totalToday: action.payload.totalToday

      };
    }
    case WS_SEND_MESSAGE: {
      return {
        ...state,

      };
    }
    case WS_USER_NAME_UPDATE: {
      return {
        ...state,
        // user: action.payload
      };
    }
    default:
      return state
  }
}
