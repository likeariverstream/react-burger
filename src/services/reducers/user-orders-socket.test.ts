import { 
  userOrdersSocketReduser as reducer,
   initialState as state } from './user-orders-socket';
import {
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_GET_ORDERS
} from '../actions/user-orders-socket';

import { token, orders as data } from '../../utils/test-constants';

describe('user-orders-socket reducer test', () => {
  it('should handle USER_WS_CONNECTION_START', () => {
    expect(reducer(state, { type: USER_WS_CONNECTION_START, payload: token })).toEqual({
      wsConnected: false,
      wsStarted: true,
      orders: [],
      total: null,
      totalToday: null
    });
  });
  it('should handle USER_WS_CONNECTION_SUCCESS', () => {
    expect(reducer({ ...state, wsConnected: false }, { type: USER_WS_CONNECTION_SUCCESS })).toEqual({
      ...state,
      wsConnected: true
    });
  });
  it('should handle USER_WS_CONNECTION_ERROR', () => {
    expect(reducer(state, { type: USER_WS_CONNECTION_ERROR })).toEqual({
      ...state,
      wsConnected: false,
    });
  });
  it('should handle USER_WS_CONNECTION_CLOSED', () => {
    expect(reducer({ ...state, wsConnected: true }, { type: USER_WS_CONNECTION_CLOSED })).toEqual({
      ...state,
      wsConnected: false,
    });
  });
  it('should handle USER_WS_GET_ORDERS', () => {
    expect(reducer(state, { type: USER_WS_GET_ORDERS, payload: data })).toEqual({
      wsConnected: true,
      wsStarted: true,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday
    });
  });
})
