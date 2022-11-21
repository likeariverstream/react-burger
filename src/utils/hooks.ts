import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { RootState } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { TUnionAction } from '../services/actions';

export const useDispatch = dispatchHook<ThunkDispatch<RootState, never, TUnionAction>>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
