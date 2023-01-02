import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';
import { AppThunk } from "../../utils/types";

export const REGISTER_USER = 'REGISTER_USER';

export type TUser = {
  email: string
  password: string
  name: string
}
export type TPayload = {
  success: boolean
  user: TUser | {}
}

export interface IRegisterUser {
  readonly type: typeof REGISTER_USER,
  readonly payload: TPayload
}

export type TRegisterUserAction =
  | IRegisterUser

const registerUser = (payload: TPayload): IRegisterUser => ({
  type: REGISTER_USER,
  payload
});

export const getRegisterUser: AppThunk = (user: TUser) => {
  const { email, password, name } = user;
  const url = `${baseUrl}/auth/register`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      name
    })
  };

  return (dispatch) => {
    request(url, options)
      .then((result) => {
        dispatch(registerUser(result));
      })
      .catch(console.warn)
  }
}
