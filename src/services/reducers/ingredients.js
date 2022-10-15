/* список всех полученных ингредиентов,
список всех ингредиентов в текущем конструкторе бургера,
объект текущего просматриваемого ингредиента,
объект созданного заказа.
 */
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients'

const initialState = {
  ingredientsList: [],
  constructorList: [],
  ingredientDetails: {},
  orderDetails: {},
  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFailed: false,
  currentTab: 'one'
}

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredientsList: action.data
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