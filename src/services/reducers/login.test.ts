import {
  loginUserReducer as reducer,
  initialState as state
} from './login';
import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/login';

describe('login reducer test', () => {
  it('should handle LOGOUT_USER', () => {
    expect(reducer({ isLoggedIn: true }, { type: LOGOUT_USER, payload: true })).toEqual({
      isLoggedIn: false
    })
  })
  it('should handle LOGOUT_USER return initialState', () => {
    expect(reducer(state, { type: LOGOUT_USER, payload: true })).toEqual(state)
  })

  it('should handle LOGIN_USER return initialState', () => {
    expect(reducer(state, { type: LOGIN_USER, payload: false })).toEqual(state)
  })
  it('should handle LOGIN_USER true', () => {
    expect(reducer(state, { type: LOGIN_USER, payload: true })).toEqual({
      isLoggedIn: true
    })
  })
})
