import {
  registerUserReducer as reducer,
  initialState as state
} from './register';
import { REGISTER_USER } from '../actions/register';
import { user } from '../../utils/test-constants'

describe('register reducer test', () => {
  it('should handle REGISTER_USER success', () => {
    expect(reducer(state, { type: REGISTER_USER, payload: { success: true, user: user } })).toEqual({
      success: true,
      user: user
    });
  });

  it('should handle REGISTER_USER error', () => {
    expect(reducer(state, { type: REGISTER_USER, payload: { success: false, user: {} } })).toEqual(state);
  });

});
