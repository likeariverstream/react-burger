import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/utils";
import { clearConstructorList } from "./constructor";

export const DELETE_ORDER = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const getOrderSucces = (id) => ({
  type: GET_ORDER_SUCCESS,
  payload: id
});

export const deleteOrder = () => ({
  type: DELETE_ORDER,
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
    console.log()
    request(url, options)
      .then(({ success, order: { number } }) => {
        if (success) {
          dispatch(getOrderSucces(number))
        }
      })
      .then(() => {
        dispatch(clearConstructorList())
      })
      .catch(console.warn)
  }
}
