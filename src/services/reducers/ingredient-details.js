import {SET_INGREDIENT_DETAILS} from '../actions/ingredient-details';

const ingredientDetailsState = {
  ingredientDetails: {}

}

export const ingredtientDetailsReducer = (state = ingredientDetailsState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.element
      }
    }
    default: {
      return state
    }
  }
}
