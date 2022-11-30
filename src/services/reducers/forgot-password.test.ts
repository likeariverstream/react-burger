import { recoverPasswordReducer as reducer } from './forgot-password';
import { GET_PASSWORD_SUCCESS } from '../actions/forgot-password';
const initialState = {
  success: false
}

describe('forgot-password reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: GET_PASSWORD_SUCCESS, payload: false })).toEqual(initialState)
  })
  it('should handle GET_PASSWORD_SUCCESS and success', () => {
    expect(reducer(undefined, { type: GET_PASSWORD_SUCCESS, payload: true })).toEqual({success: true})
  })
})

