import { getCookie } from "./coockie"
import { baseUrl } from "./constants"

export const request = async (url, options) => {
  const res = await fetch(url, options)
  return checkResponse(res)
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

export const refreshToken = () => {
  const url = `${baseUrl}/auth/token`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refresh')
    })
  };
  request(url, options)
    .then(data => console.log(data))
    .catch(console.warn)
}
