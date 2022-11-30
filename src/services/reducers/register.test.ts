import { registerUserReducer as reducer } from './register';
import { REGISTER_USER } from '../actions/register';

const user = {
  email: '@ru',
  name: '121121',
  password: 'dffdfd'
};

const initialState = {
  success: false,
  user: {}
};

describe('register reducer test', () => {
  it('should handle REGISTER_USER success', () => {
    expect(reducer(initialState, { type: REGISTER_USER, payload: { success: true, user: user } })).toEqual({
      success: true,
      user: user
    });
  });

  it('should handle REGISTER_USER error', () => {
    expect(reducer(initialState, { type: REGISTER_USER, payload: { success: false, user: {} } })).toEqual(initialState);
  });

});
