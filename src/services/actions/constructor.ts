import { TIngredient } from "../../utils/types";


export const GET_CONSTRUCTOR_ITEM = 'GET_CONSTRUCTOR_ITEM';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const GET_BUN_ITEM = 'GET_BUN_ITEM';
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST';
export const MOVE_CONSTRUCTOR_ITEM = 'CONSTRUCTOR_ITEM';

export interface IGetConstructorItem {
  readonly type: typeof GET_CONSTRUCTOR_ITEM,
  readonly payload: TIngredient
}
export interface IDeleteConstructorItem {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM,
  readonly payload: TIngredient
}
export interface IGetBunItem {
  readonly type: typeof GET_BUN_ITEM,
  readonly payload: TIngredient
}
export interface IСlearConstructorList {
  readonly type: typeof CLEAR_CONSTRUCTOR_LIST,
}

export interface IMoveConstructorItem {
  readonly type: typeof MOVE_CONSTRUCTOR_ITEM,
  readonly payload: {
    dragIndex: number
    hoverIndex: number
  }
}

export type TConstructorAction = 
| IGetConstructorItem
| IDeleteConstructorItem
| IGetBunItem
| IСlearConstructorList
| IMoveConstructorItem

export const getConstructorItem = (element: TIngredient): IGetConstructorItem => ({
  type: GET_CONSTRUCTOR_ITEM,
  payload: element
});

export const deleteConstructorItem = (element: TIngredient): IDeleteConstructorItem => ({
  type: DELETE_CONSTRUCTOR_ITEM,
  payload: element
});

export const getBunItem = (element: TIngredient): IGetBunItem => ({
  type: GET_BUN_ITEM,
  payload: element
});

export const clearConstructorList = (): IСlearConstructorList => ({
  type: CLEAR_CONSTRUCTOR_LIST
});

export const moveConstructorItem = (dragIndex: number, hoverIndex: number): IMoveConstructorItem => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  payload: {
    dragIndex,
    hoverIndex
  }
});
