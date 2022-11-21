import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers/index'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ActionCreator<
  // ThunkAction<ReturnType, Action, RootState, TApplicationActions>
// >;
