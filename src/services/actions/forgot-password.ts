import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';
import { AppThunk, AppDispatch } from "../../utils/types";

export const GET_PASSWORD_SUCCESS: 'GET_PASSWORD_SUCCESS' = 'GET_PASSWORD_SUCCESS';

export interface IGetPasswordSuccess {
  readonly type: typeof GET_PASSWORD_SUCCESS,
  readonly payload: boolean
}

export type TForgotPasswordAcion =
  | IGetPasswordSuccess

const getPasswordSuccess = (payload: boolean): IGetPasswordSuccess => ({
  type: GET_PASSWORD_SUCCESS,
  payload
})

export const getPasswordSuccessThunk: AppThunk = () => {
  const url = `${baseUrl}/password-reset`;
  const options = {
    method: 'POST' | 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ''
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ success, message }) => {

        dispatch(getPasswordSuccess(success));
      })
      .catch(console.warn);
  }
}
