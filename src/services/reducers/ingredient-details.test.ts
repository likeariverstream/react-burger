import { ingredientDetailsReducer as reducer } from './ingredient-details'


import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/ingredient-details'

const initialState = {
  ingredientDetails: {}
}

const element = {
  "_id": "60d3b41abdacab0026a733cd",
  "name": "Соус фирменный Space Sauce",
  "type": "sauce",
  "proteins": 50,
  "fat": 22,
  "carbohydrates": 11,
  "calories": 14,
  "price": 80,
  "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  "__v": 0,
}

describe('ingredient-details reducer test', () => {
  it('should handle SET_INGREDIENT_DETAILS', () => {
    expect(reducer({ingredientDetails: {}}, {type: SET_INGREDIENT_DETAILS, payload: element })).toEqual({
      ingredientDetails: element})
  })

  it('should handle DELETE_INGREDIENT_DETAILS', () => {
    expect(reducer({ingredientDetails: element}, {type: DELETE_INGREDIENT_DETAILS })).toEqual(initialState)
  })

})
