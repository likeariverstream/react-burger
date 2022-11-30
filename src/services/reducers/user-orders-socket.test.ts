import { userOrdersSocketReduser as reducer } from './user-orders-socket';
import {
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_GET_ORDERS
} from '../actions/user-orders-socket';

const initialState = {
  wsConnected: false,
  wsStarted: false,
  orders: [],
  total: null,
  totalToday: null
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI1OGU2OWI1MThhMDAxYmI4ODBiMyIsImlhdCI6MTY2OTc0MDIyOSwiZXhwIjoxNjY5NzQxNDI5fQ.fe8_m9IesAkeCXWncfFMuAEKRwCNA83iSy_Nq4ddDNQ"

const data = {
  "success": true,
  "orders": [
    {
      "_id": "6382e9409b518a001bb8819f",
      "ingredients": [
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Краторный бургер",
      "createdAt": "2022-11-27T04:36:16.320Z",
      "updatedAt": "2022-11-27T04:36:16.691Z",
      "number": 30998
    },
    {
      "_id": "6382eebe9b518a001bb881a5",
      "ingredients": [
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Краторный бургер",
      "createdAt": "2022-11-27T04:59:42.401Z",
      "updatedAt": "2022-11-27T04:59:42.736Z",
      "number": 30999
    },
  ],
  "total": 31224,
  "totalToday": 170
}

describe('user-orders-socket reducer test', () => {
  it('should handle USER_WS_CONNECTION_START', () => {
    expect(reducer(initialState, { type: USER_WS_CONNECTION_START, payload: token })).toEqual({
      wsConnected: false,
      wsStarted: true,
      orders: [],
      total: null,
      totalToday: null
    });
  });
  it('should handle USER_WS_CONNECTION_SUCCESS', () => {
    expect(reducer({ ...initialState, wsConnected: false }, { type: USER_WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true
    });
  });
  it('should handle USER_WS_CONNECTION_ERROR', () => {
    expect(reducer(initialState, { type: USER_WS_CONNECTION_ERROR })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  it('should handle USER_WS_CONNECTION_CLOSED', () => {
    expect(reducer({ ...initialState, wsConnected: true }, { type: USER_WS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  it('should handle USER_WS_GET_ORDERS', () => {
    expect(reducer(initialState, { type: USER_WS_GET_ORDERS, payload: data })).toEqual({
      wsConnected: true,
      wsStarted: true,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday
    });
  });
})
