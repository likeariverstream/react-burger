import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/utils";
import { setCookie, getCookie } from "../../utils/coockie";


export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload
});

const logoutUser = (payload) => ({
  type: LOGOUT_USER,
  payload
});

export const getLoginUser = (user) => {
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

  return (dispatch) => {
    request(url, options)
      .then((data) => {
        const { success, refreshToken, accessToken } = data;
        if (success) {
          sessionStorage
            .setItem('login', JSON.stringify(true));
          dispatch(loginUser(data));
          setCookie('access', accessToken.split('Bearer ')[1]);
          setCookie('refresh', refreshToken);
        }
      })
      .catch(console.warn)
  }
}

export const logoutUserThunk = (user) => {
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

  return (dispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(logoutUser(data));
        }
      })
      .catch(console.warn)
  }
}
