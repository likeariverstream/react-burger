import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START
} from '../actions/socket';
import { TUnionAction } from '../actions';
import { TOrder } from '../../utils/types'

type TInitialState = {
  wsConnected: boolean
  wsStarted: boolean
  orders: Array<TOrder> | []
  total: null | number,
  totalToday: null | number
}

const initialState: TInitialState = {
  wsConnected: false,
  wsStarted: false,
  orders: [],
  total: null,
  totalToday: null
}

export const socketReduser = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsStarted: true
      }
    }
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
        wsConnected: true,
        wsStarted: true,
        orders: state.orders.length < 10
          ? [...state.orders, ...action.payload.orders]
          : [...state.orders],
          total: action.payload.total,
          totalToday: action.payload.totalToday

      };
    }
    default:
      return state
  }
}
