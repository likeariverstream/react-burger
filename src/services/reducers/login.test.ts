import { loginUserReducer as reducer } from './login';
import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/login';
import { getCookie } from '../../utils/coockie';


const initialState = {
  isLoggedIn: !!getCookie('access') ? true: false,
};

describe('login reducer test', () => {
  it('should handle LOGOUT_USER', () => {
    expect(reducer({isLoggedIn: true}, {type: LOGOUT_USER, payload: true })).toEqual({
      isLoggedIn: false
    })
  })
  it('should handle LOGOUT_USER return initialState', () => {
    expect(reducer(initialState, {type: LOGOUT_USER, payload: true })).toEqual(initialState)
  })

  it('should handle LOGIN_USER return initialState', () => {
    expect(reducer(initialState, {type: LOGIN_USER, payload: false })).toEqual(initialState)
  })
})
