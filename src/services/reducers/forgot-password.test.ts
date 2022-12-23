import {
  recoverPasswordReducer as reducer
} from './forgot-password';
import { getPasswordSuccessThunk } from '../actions/forgot-password';

describe('forgot-password reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer({ success: false }, getPasswordSuccessThunk.rejected)).toEqual({ success: false })
  })
  it('should handle GET_PASSWORD_SUCCESS and success', () => {
    expect(reducer({ success: false }, getPasswordSuccessThunk.fulfilled)).toEqual({ success: true })
  })
})

