export const request = (url, options) => {
  return fetch(url, options)
    .then(checkResponse)
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`)
}