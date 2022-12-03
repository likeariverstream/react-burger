import { Middleware, MiddlewareAPI } from 'redux';
import { TConstMiddlewareActions } from '../services/actions/index';
import { AppDispatch, RootState } from './types';

export const socketMidlleware = (url: string, actions: TConstMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => {
      return (action) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onOrders } = actions;
        const { isLoggedIn } = getState().login;
        if (type === wsInit) {
          socket = new WebSocket(`${url}${type === wsInit && payload && isLoggedIn? `?token=${payload}` : '' }`);
        }
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen })
          };
          socket.onerror = (event) => {
            dispatch({ type: onError })
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success } = parsedData;
            success && dispatch({ type: onOrders, payload: parsedData });
          };
        }
        if (socket && type === onClose) {
          socket.close(1000);
          socket.onclose = (event) => {
            dispatch({ type: onClose })
          }
        }
        next(action);
      } 
    }
  }
}
