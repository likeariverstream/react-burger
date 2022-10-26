import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { combineReducers } from 'redux';
import { ingredtientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  ingredtientDetails: ingredtientDetailsReducer,
  orderDetails: orderDetailsReducer,
})
