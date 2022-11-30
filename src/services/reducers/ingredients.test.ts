import { ingredientsReducer as reducer } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const data = [{
  "_id": "60d3b41abdacab0026a733c8",
  "name": "Филе Люминесцентного тетраодонтимформа",
  "type": "main",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/meat-03.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
  "__v": 0,
  'key': "60d3b41abdacab0026a733c8"
},
{
  "_id": "60d3b41abdacab0026a733c7",
  "name": "Флюоресцентная булка R2-D3",
  "type": "bun",
  "proteins": 44,
  "fat": 26,
  "carbohydrates": 85,
  "calories": 643,
  "price": 988,
  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
  "__v": 0,
  'key': "60d3b41abdacab0026a733c7"
}]

const initialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
}

describe('ingredients reducer test', () => {
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(reducer(initialState, { type: GET_INGREDIENTS_SUCCESS, payload: data })).toEqual({
      ingredientsList: data,
      ingredientsRequest: false,
      ingredientsSuccess: false,
      ingredientsFailed: false,
    })
  })
  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(reducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...initialState,
      ingredientsRequest: true
    })
  })
  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(reducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    })
  })
})
