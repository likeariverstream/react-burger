import {
   orderDetailsReducer as reducer,
   initialState as state } from './order-details';

import {
  GET_ORDER_SUCCESS,
  DELETE_ORDER,
  GET_ORDER_FAILED
} from '../actions/order-details';

import { id } from '../../utils/test-constants';

describe('order-details reducer test', () => {
  it('should handle GET_ORDER_SUCCESS', () => {
    expect(reducer(state, { type: GET_ORDER_SUCCESS, payload: id })).toEqual({
      id: id,
      orderRequest: false,
      orderSuccess: true,
      orderFailed: false
    })
  })
  it('should handle DELETE_ORDER', () => {
    expect(reducer(state, { type: DELETE_ORDER })).toEqual({
      ...state,
      id: '',
      orderSuccess: false,
    })
  })
  it('should handle GET_ORDER_FAILED', () => {
    expect(reducer(state, { type: GET_ORDER_FAILED })).toEqual({
      ...state,
      id: '',
      orderFailed: true,
      orderRequest: false,
    })
  })

})
