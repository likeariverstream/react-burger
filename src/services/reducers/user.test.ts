import { getUserInfoReducer as reducer } from './user'
import {
  GET_USER_INFO,
  PATCH_USER_INFO
} from '../actions/user'

const initialState = {
  success: false,
  user: {
    email: '',
    name: ''
  }
};
const payload = {
  success: true,
  user: {
    email: '@mail.ru',
    name: 'Ivan'
  }
}
describe('user reducer test', () => {
  it('should handle GET_USER_INFO', () => {
    expect(reducer(initialState, { type: GET_USER_INFO, payload: payload })).toEqual({
      success: true,
      user: payload.user
    });
  });
  it('should handle PATCH_USER_INFO', () => {
    expect(reducer(initialState, { type: PATCH_USER_INFO, payload: payload })).toEqual({
      success: true,
      user: payload.user
    });
  });
})
