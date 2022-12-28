import { TIngredient } from "../../utils/types";
export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface ISetIngredientDetails {
  readonly type: typeof SET_INGREDIENT_DETAILS,
  readonly payload: TIngredient
}
export interface IDeleteIngredientDetails {
  readonly type: typeof DELETE_INGREDIENT_DETAILS
}

export type TIngredientDetailsAction =
  | ISetIngredientDetails
  | IDeleteIngredientDetails

export const setIngredientDetails = (element: TIngredient): ISetIngredientDetails => ({
  type: SET_INGREDIENT_DETAILS,
  payload: element
});

export const deleteIngredientDetails = (): IDeleteIngredientDetails => ({
  type: DELETE_INGREDIENT_DETAILS,
});
