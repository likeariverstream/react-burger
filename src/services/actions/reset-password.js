import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';

export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';

const getResetPasswordSuccess = (payload) => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  payload
})

export const getResetPasswordSuccessThunk = () => {
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
