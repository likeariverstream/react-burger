import {
  getUserInfoReducer as reducer,
  initialState as state
} from './user'
import {
  GET_USER_INFO,
  PATCH_USER_INFO
} from '../actions/user';

import { payload } from '../../utils/test-constants'

describe('user reducer test', () => {
  it('should handle GET_USER_INFO', () => {
    expect(reducer(state, { type: GET_USER_INFO, payload: payload })).toEqual({
      success: true,
      user: payload.user
    });
  });
  it('should handle PATCH_USER_INFO', () => {
    expect(reducer(state, { type: PATCH_USER_INFO, payload: payload })).toEqual({
      success: true,
      user: payload.user
    });
  });
})
