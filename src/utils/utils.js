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
