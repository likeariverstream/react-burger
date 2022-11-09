import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { combineReducers } from 'redux';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { recoverPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { registerUserReducer } from './register';
import { loginUserReducer } from './login';
import { getUserInfoReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  recoverPassword: recoverPasswordReducer,
  resetPassword: resetPasswordReducer,
  user: registerUserReducer,
  login: loginUserReducer,
  info: getUserInfoReducer
});
