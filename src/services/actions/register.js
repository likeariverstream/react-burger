import { baseUrl } from "../../utils/constants";
import { request } from '../../utils/utils';

export const REGISTER_USER = 'REGISTER_USER';

const registerUser = (payload) => ({
  type: REGISTER_USER,
  payload
});

export const getRegisterUser = (user) => {
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
