import { INGREDIENT_COUNT_INCREASE, INGREDIENT_COUNT_DECREASE, BUN_COUNT_REPLACE } from "../actions/ingredient-counts";

const ingredientCountsState = {
  ingredientsList: [],
}

export const ingredientCountsReducer = (state = ingredientCountsState, action) => {
  switch (action.type) {
    case INGREDIENT_COUNT_INCREASE: {
      return {
        ...state,
        ingredientsList: !state.ingredientsList
          .find(element => element.type === 'bun') || action.element.type !== 'bun'
          ? [...state.ingredientsList, action.element]
          : [...state.ingredientsList]
      }
    }
    case INGREDIENT_COUNT_DECREASE: {
      return {
        ...state,
        ingredientsList: action.element.type !== 'bun'
          ? [...state.ingredientsList.filter(m => m._id !== action.element._id),
          ...(state.ingredientsList.filter(m => m._id === action.element._id).slice(0, -1))]
          : [...state.ingredientsList]
      }
    }
    case BUN_COUNT_REPLACE: {
      return {
        ...state,
        ingredientsList: state.ingredientsList
          .find(element => element.type === 'bun') || action.element.type === 'bun'
          ? state.ingredientsList.map((element) => element.type === action.element.type ? action.element : element)
          : [...state.ingredientsList]
      }
    }
    default: {
      return state
    }
  }
}