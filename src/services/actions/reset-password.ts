import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';
import { AppThunk } from "../../utils/types";


export const GET_RESET_PASSWORD_SUCCESS: 'GET_RESET_PASSWORD_SUCCESS' = 'GET_RESET_PASSWORD_SUCCESS';

export interface IGetResetPasswordSuccess {
  type: typeof GET_RESET_PASSWORD_SUCCESS,
  payload: boolean
}

export type TResetPasswordAction =
  | IGetResetPasswordSuccess

const getResetPasswordSuccess = (payload: boolean): IGetResetPasswordSuccess => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  payload
})

export const getResetPasswordSuccessThunk: AppThunk = () => {
  const url = `${baseUrl}/password-reset/reset`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: '',
      token: ''
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ success, message }) => {
        dispatch(getResetPasswordSuccess(success));
      })
      .catch(console.warn)
  }
}
