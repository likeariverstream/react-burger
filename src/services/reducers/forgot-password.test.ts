import {
  recoverPasswordReducer as reducer,
  state
} from './forgot-password';
import { getPasswordSuccessThunk } from '../actions/forgot-password';

describe('forgot-password reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(state, getPasswordSuccessThunk.rejected)).toEqual(state)
  })
  it('should handle GET_PASSWORD_SUCCESS and success', () => {
    expect(reducer({ success: false }, getPasswordSuccessThunk.fulfilled)).toEqual({ success: true })
  })
})

