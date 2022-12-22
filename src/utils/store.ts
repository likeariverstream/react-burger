import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers/index';
import { socketMidlleware } from '../utils/middleware';
import { wsUrl, userOrdersUrl } from '../utils/constants';
import { wsActions } from '../services/actions/socket';
import { userWsActions } from '../services/actions/user-orders-socket'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    socketMidlleware(wsUrl, wsActions),
    socketMidlleware(userOrdersUrl, userWsActions)
  ],
  devTools: true
});
