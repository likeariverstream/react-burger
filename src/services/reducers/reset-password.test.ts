import { resetPasswordReducer as reducer } from './reset-password'
import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'

const initialState = {
  success: false
}

describe('reset password reducer test', () => {
  it('should handle GET_RESET_PASSWORD_SUCCESS success', () => {
    expect(reducer(initialState, { type: GET_RESET_PASSWORD_SUCCESS, payload: true })).toEqual({
      success: true
    });
  });
  it('should handle GET_RESET_PASSWORD_SUCCESS error', () => {
    expect(reducer(initialState, { type: GET_RESET_PASSWORD_SUCCESS, payload: false })).toEqual(initialState);
  });
});
