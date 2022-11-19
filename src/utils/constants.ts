import { TrootState, AppDispatch } from '../index';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const useTypedSelector: TypedUseSelectorHook<TrootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch
