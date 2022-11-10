import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';

export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS';

const getPasswordSuccess = (payload) => ({
  type: GET_PASSWORD_SUCCESS,
  payload
})

export const getPasswordSuccessThunk = () => {
  const url = `${baseUrl}/password-reset`;
  const options = {
    method: 'POST',
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
