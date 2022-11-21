import { baseUrl } from "../../utils/constants";
import { TIngredient } from "../../utils/types";
import { request } from "../../utils/utils";
import { AppThunk, AppDispatch } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly payload: Array<TIngredient>
}
export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredients =
  | IGetIngredientsSuccess
  | IGetIngredientsRequest
  | IGetIngredientsFailed

export const getIngredientsSuccess = (data: Array<TIngredient>): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
})

const url = `${baseUrl}/ingredients`;
export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    request(url)
      .then(({ data }) => {
        dispatch(getIngredientsSuccess(data))
      })
      .catch(console.warn)
  }
}
