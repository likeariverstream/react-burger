import {
  recoverPasswordReducer as reducer,
  initialState as state
} from './forgot-password';
import { GET_PASSWORD_SUCCESS } from '../actions/forgot-password';

describe('forgot-password reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(state, { type: GET_PASSWORD_SUCCESS, payload: false })).toEqual(state)
  })
  it('should handle GET_PASSWORD_SUCCESS and success', () => {
    expect(reducer({ success: false }, { type: GET_PASSWORD_SUCCESS, payload: true })).toEqual({ success: true })
  })
})

