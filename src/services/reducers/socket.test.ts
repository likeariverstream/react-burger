import {
  socketReduser as reducer,
  initialState as state
} from './socket';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../actions/socket';
import { orders as data } from '../../utils/test-constants'

describe('socket reducer test', () => {
  it('should handle WS_CONNECTION_START', () => {
    expect(reducer(state, { type: WS_CONNECTION_START })).toEqual({
      ...state,
      wsStarted: true
    });
  });
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer({ ...state, wsConnected: false }, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...state,
      wsConnected: true
    });
  });
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(reducer(state, { type: WS_CONNECTION_ERROR })).toEqual({
      ...state,
      wsConnected: false,
    });
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(reducer({ ...state, wsConnected: true }, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...state,
      wsConnected: false,
    });
  });
  it('should handle WS_GET_ORDERS', () => {
    expect(reducer(state, { type: WS_GET_ORDERS, payload: data })).toEqual({
      wsConnected: true,
      wsStarted: true,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday
    });
  });
})
