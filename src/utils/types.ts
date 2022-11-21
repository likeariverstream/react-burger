import { store } from './store';
import { ThunkAction } from 'redux-thunk';
import { TUnionAction } from '../services/actions/index'
import {
  Action,
  ActionCreator
} from 'redux'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TUnionAction>
>;


export type TsetCookie = {
  name: string,
  value: string,
  props: { [key: string]: any }
} & { expires?: string | number | Date }

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  id?: string
}

