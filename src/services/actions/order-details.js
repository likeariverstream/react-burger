import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/utils";
import { clearConstructorList } from "./constructor";


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const getOrderSucces = (id) => ({
  type: GET_ORDER_SUCCESS,
  id
});

export const getOrderRequest = () => ({
  type: GET_ORDER_REQUEST
})

export const getOrderDetails = (idList) => {
  const url = `${baseUrl}/orders`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: idList
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ order: { number } }) => {
        dispatch(getOrderSucces(number))
      })
      .then(() => dispatch(clearConstructorList()))
      .catch(console.warn)
  }
}