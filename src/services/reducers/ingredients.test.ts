import { 
  ingredientsReducer as reducer,
   initialState as state} from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

import { data } from '../../utils/test-constants';

describe('ingredients reducer test', () => {
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(reducer(state, { type: GET_INGREDIENTS_SUCCESS, payload: data })).toEqual({
      ...state,
      ingredientsFailed: false,
      ingredientsRequest: false,
      ingredientsList: data
    })
  })
  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(reducer(state, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...state,
      ingredientsRequest: true
    })
  })
  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(reducer(state, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...state,
      ingredientsFailed: true,
      ingredientsRequest: false
    })
  })
})
