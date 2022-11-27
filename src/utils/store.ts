import {
  createStore,
  compose,
  applyMiddleware,

} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers/index';
import { socketMidlleware } from '../utils/middleware';
import { wsUrl, userOrdersUrl } from '../utils/constants';
import { wsActions } from '../services/actions/socket';
import { userWsActions } from '../services/actions/user-orders-socket'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMidlleware(wsUrl, wsActions), socketMidlleware(userOrdersUrl, userWsActions)));

export const store = createStore(rootReducer, enhancer);
