import { getCookie, setCookie } from "./coockie"
import { baseUrl } from "./constants"

export type Trequest = {
  method?: string,
  headers: {
    'Content-Type': string
  },
  body?: string

}

export const request = async (url: string, options?: Trequest): Promise<any> => {
  const res = await fetch(url, options)
  return checkResponse(res)
}

const checkResponse = (res: Response) => {
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
    .then(({ accessToken }) => setCookie('access', accessToken))
    .catch (console.warn)
}
