import { getCookie, setCookie } from "./coockie";
import { baseUrl } from "./constants";
import { TIngredient } from "./types";
import { nanoid } from "nanoid";

export type TRequest = {
  method?: string,
  headers: {
    'Content-Type': string
  },
  body?: string
}
export type TOptions = {
  month: 'long',
  day: 'numeric',
  timezone: 'Moscow',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: "short",
}

export const request = async (url: string, options?: TRequest): Promise<any> => {
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
    .catch(console.warn)
}

export const generateKey = (element: TIngredient, index: number) => {
  return `${element._id}${index}`
}

export const filterIngredients = (arr: string[], data: TIngredient[]) => arr.map(item => {
  return data.filter(i => i._id === item);
}).reduce((acc, item) => {
  return acc.concat(item)
}).map((item, index) => ({...item, key: generateKey(item, index)}))

export const calculatePrice = (arr: string[], data: TIngredient[]) => {
  return filterIngredients(arr, data).reduce((acc, item) => acc + item.price, 0)
}

export const includesIngregients = (data: TIngredient[], arr: string[]) => {
  return data.filter((item) => arr.includes(item._id));
}

export const getOrderDate = (date: string) => {
  const options: TOptions = {
    month: 'long',
    day: 'numeric',
    timezone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: "short",
  };
  
  return new Date(Date.parse(date)).toLocaleString("ru", options)
}
