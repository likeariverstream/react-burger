import { orderDetailsReducer as reducer } from './order-details';

import {
  GET_ORDER_SUCCESS,
  DELETE_ORDER,
  GET_ORDER_FAILED
} from '../actions/order-details';

const id = `32121`
const initialState = {
  id: '',
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false
}

describe('order-details reducer test', () => {
  it('should handle GET_ORDER_SUCCESS', () => {
    expect(reducer(initialState, { type: GET_ORDER_SUCCESS, payload: id })).toEqual({
      id: id,
      orderRequest: false,
      orderSuccess: true,
      orderFailed: false
    })
  })
  it('should handle DELETE_ORDER', () => {
    expect(reducer(initialState, { type: DELETE_ORDER })).toEqual({

      id: '',
      orderRequest: false,
      orderSuccess: false,
      orderFailed: false
    })
  })
  it('should handle GET_ORDER_FAILED', () => {
    expect(reducer(initialState, { type: GET_ORDER_FAILED })).toEqual({
      id: '',
      orderRequest: false,
      orderSuccess: false,
      orderFailed: true
    })
  })

})
