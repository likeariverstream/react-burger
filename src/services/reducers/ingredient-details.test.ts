import {
  ingredientDetailsReducer as reducer,
  initialState as state
} from './ingredient-details'

import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions/ingredient-details'

import {
  element
} from '../../utils/test-constants'

describe('ingredient-details reducer test', () => {
  it('should handle SET_INGREDIENT_DETAILS', () => {
    expect(reducer(state, { type: SET_INGREDIENT_DETAILS, payload: element })).toEqual({
      ingredientDetails: element
    })
  })

  it('should handle DELETE_INGREDIENT_DETAILS', () => {
    expect(reducer({ ingredientDetails: element }, { type: DELETE_INGREDIENT_DETAILS })).toEqual(state)
  })

})
