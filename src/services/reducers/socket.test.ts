import { socketReduser as reducer } from './socket';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../actions/socket';

const initialState = {
  wsConnected: false,
  wsStarted: false,
  orders: [],
  total: null,
  totalToday: null
}

const data = {
  "success": true,
  "orders": [
    {
      "_id": "63862edc9b518a001bb8944e",
      "ingredients": [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733ca"
      ],
      "status": "done",
      "name": "Бессмертный флюоресцентный space метеоритный бургер",
      "createdAt": "2022-11-29T16:10:04.491Z",
      "updatedAt": "2022-11-29T16:10:04.919Z",
      "number": 31313
    },
    {
      "_id": "63862dd29b518a001bb8944b",
      "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733c8"
      ],
      "status": "done",
      "name": "Люминесцентный экзо-плантаго краторный астероидный традиционный-галактический бургер",
      "createdAt": "2022-11-29T16:05:38.243Z",
      "updatedAt": "2022-11-29T16:05:38.655Z",
      "number": 31312
    },
    {
      "_id": "63862d6c9b518a001bb8944a",
      "ingredients": [
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c6"
      ],
      "status": "done",
      "name": "Space краторный бургер",
      "createdAt": "2022-11-29T16:03:56.747Z",
      "updatedAt": "2022-11-29T16:03:57.186Z",
      "number": 31311
    },
  ],
  "total": 31222,
  "totalToday": 175
}

describe('socket reducer test', () => {
  it('should handle WS_CONNECTION_START', () => {
    expect(reducer(initialState, { type: WS_CONNECTION_START })).toEqual({
      wsConnected: false,
      wsStarted: true,
      orders: [],
      total: null,
      totalToday: null
    });
  });
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer({ ...initialState, wsConnected: false }, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true
    });
  });
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(reducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(reducer({ ...initialState, wsConnected: true }, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });
  it('should handle WS_GET_ORDERS', () => {
    expect(reducer(initialState, { type: WS_GET_ORDERS, payload: data })).toEqual({
      wsConnected: true,
      wsStarted: true,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday
    });
  });
})
