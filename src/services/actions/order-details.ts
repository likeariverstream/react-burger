import { baseUrl } from '../../utils/constants';
import { request } from '../../utils/utils';
// import { clearConstructorList } from '../reducers/constructor';
import { AppThunk } from '../../utils/types';
import { getCookie } from "../../utils/coockie";

export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const DELETE_ORDER: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderSucces {
  type: typeof GET_ORDER_SUCCESS,
  payload: string
}
export interface IDeleteOrder {
  type: typeof DELETE_ORDER
}
export interface IGetOrderFailed {
  type: typeof GET_ORDER_FAILED
}

export type TOrderAction =
  | IGetOrderSucces
  | IDeleteOrder
  | IGetOrderFailed


const getOrderSucces = (id: string): IGetOrderSucces => ({
  type: GET_ORDER_SUCCESS,
  payload: id
});

export const deleteOrder = (): IDeleteOrder => ({
  type: DELETE_ORDER,
})

export const getOrderDetails: AppThunk = (idList: string[]) => {
  const url = `${baseUrl}/orders`;
  const options = {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + getCookie('access'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: idList,
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ success, order: { number } }) => {
        if (success) {
          dispatch(getOrderSucces(number))
        }
      })
      .then(() => {
        // dispatch(clearConstructorList())
      })
      .catch(console.warn)
  }
}
