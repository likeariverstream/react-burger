import { baseUrl } from "../../utils/constants";
import { request, refreshToken } from "../../utils/utils";
import { getCookie } from "../../utils/coockie";
import { AppDispatch, AppThunk } from "../../utils/types";

export const GET_USER_INFO = 'GET_USER_INFO';
export const PATCH_USER_INFO = 'PATCH_USER_INFO';

export type TUser = {
  email: string,
  name: string,
}
export type TPayload = {
  success: boolean,
  user: TUser
}

export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO,
  readonly payload: TPayload
}

export interface IPatchUserInfo {
  readonly type: typeof PATCH_USER_INFO,
  readonly payload: TPayload
}

export type TUserAction =
  | IGetUserInfo
  | IPatchUserInfo


const getUserInfo = (payload: TPayload): IGetUserInfo => ({
  type: GET_USER_INFO,
  payload
});

const patchUserInfo = (payload: TPayload): IPatchUserInfo => ({
  type: PATCH_USER_INFO,
  payload
});

export const getUserInfoThunk: AppThunk = () => {
  const url = `${baseUrl}/auth/user`;
  const options = {
    headers: {
      authorization: 'Bearer ' + getCookie('access'),
      'Content-Type': 'application/json'
    }
  };

  return (dispatch: AppDispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(getUserInfo(data));
        }
      })
      .catch((err) => {
        if (err === 'jwt expired') {
          refreshToken();
        }
        getUserInfoThunk();
      })
      
  }
}

export const patchUserInfoThunk: AppThunk = (email: string, name: string, password: string) => {
  const url = `${baseUrl}/auth/user`;
  const options = {
    method: 'PATCH',
    headers: {
      authorization: 'Bearer ' + getCookie('access'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      name,
      password
    })
  };

  return (dispatch: AppDispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(patchUserInfo(data));
        }
      })
      .catch((err) => {
        if (err) {
          refreshToken()
        }
      })
  }
}
