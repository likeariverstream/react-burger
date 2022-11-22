import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,

} from '../actions/ingredient-details';

const initialState = {
  ingredientDetails: {},
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      }
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: {}
      }
    }
    default: {
      return state
    }
  }
}
