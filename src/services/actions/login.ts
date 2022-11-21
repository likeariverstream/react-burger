import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/utils";
import { setCookie, getCookie, deleteCookie } from "../../utils/coockie";
import { AppDispatch, AppThunk } from "../../utils/types";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export type TUser = {
  email: string
  password: string
}
export interface ILoginUser {
  readonly type: typeof LOGIN_USER,
  readonly payload: boolean
}

export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER,
  readonly payload: boolean
}

export type TLoginAction =
  | ILoginUser
  | ILogoutUser

const loginUser = (payload: boolean): ILoginUser => ({
  type: LOGIN_USER,
  payload
});

const logoutUser = (payload: boolean): ILogoutUser => ({
  type: LOGOUT_USER,
  payload
});

export const getLoginUser: AppThunk = (user: TUser) => {
  const { email, password } = user;
  const url = `${baseUrl}/auth/login`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  };

  return (dispatch: AppDispatch) => {
    request(url, options)
      .then((data) => {
        const { success, refreshToken, accessToken } = data;
        if (success) {
          sessionStorage
            .setItem('login', JSON.stringify(true));
          dispatch(loginUser(success));
          setCookie('access', accessToken.split('Bearer ')[1]);
          setCookie('refresh', refreshToken);
        }
      })
      .catch(console.warn)
  }
}

export const logoutUserThunk: AppThunk = () => {
  const url = `${baseUrl}/auth/logout`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refresh')
    })
  };

  return (dispatch: AppDispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(logoutUser(success));
          deleteCookie('access')
        }
      })
      .catch(console.warn)
  }
}
