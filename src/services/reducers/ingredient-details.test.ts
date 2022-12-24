import {
  ingredientDetailsReducer as reducer,
  setIngredientDetails,
  deleteIngredientDetails,
  state
} from './ingredient-details'

import {
  element
} from '../../utils/test-constants'

describe('ingredient-details reducer test', () => {
  it('should handle setIngredientDetails', () => {
    expect(reducer(state, setIngredientDetails(element))).toEqual({
      ingredientDetails: element
    })
  })

  it('should handle deleteIngredientDetails', () => {
    expect(reducer(state, deleteIngredientDetails())).toEqual(state)
  })

})
