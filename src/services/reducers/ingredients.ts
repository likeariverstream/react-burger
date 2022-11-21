import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients'
import { TIngredient } from '../../utils/types';
import { TUnionAction } from '../actions/index'

type TInitialState = {
  ingredientsList: [] | Array<TIngredient>,
  ingredientsRequest: boolean,
  ingredientsSuccess: boolean,
  ingredientsFailed: boolean,
  currentTab: string
}

const initialState: TInitialState = {
  ingredientsList: [],
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
  currentTab: 'one'
}

export const ingredientsReducer = (state = initialState, action: TUnionAction): TInitialState => {
  switch (action.type) {

    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredientsList: action.payload
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      }
    }
    default: {
      return state;
    }
  }
}
