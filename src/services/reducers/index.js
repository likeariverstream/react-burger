import { ingredientsReducer } from "./ingredients";
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer
})