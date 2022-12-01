import {
  resetPasswordReducer as reducer,
  initialState as state
} from './reset-password'
import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'

describe('reset password reducer test', () => {
  it('should handle GET_RESET_PASSWORD_SUCCESS success', () => {
    expect(reducer(state, { type: GET_RESET_PASSWORD_SUCCESS, payload: true })).toEqual({
      success: true
    });
  });
  it('should handle GET_RESET_PASSWORD_SUCCESS error', () => {
    expect(reducer(state, { type: GET_RESET_PASSWORD_SUCCESS, payload: false })).toEqual(state);
  });
});
