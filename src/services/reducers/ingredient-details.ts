import {
  SET_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from '../actions/ingredient-details';
import { TIngredient } from '../../utils/types';
import { TUnionAction } from '../actions/index'

type TInitialState = {
  ingredientDetails: {
    _id?: string,
    carbohydrates?: string,
    fat?: string,
    proteins?: string,
    calories?: string
    name?: string,
    image?: string
  } | TIngredient
}
const initialState: TInitialState = {
  ingredientDetails: {}
}

export const ingredientDetailsReducer = (state = initialState, action: TUnionAction): TInitialState => {
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
