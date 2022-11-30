import { Middleware } from 'redux';
import { TConstMiddlewareActions } from '../services/actions/index';

export const socketMidlleware = (url: string, actions: TConstMiddlewareActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => {
      return (action) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onOrders } = actions;
        const { isLoggedIn } = getState().login;
        if (type === wsInit) {
          socket = new WebSocket(`${url}${type === wsInit && payload ? `?token=${payload}` : '' }`);
        }
        if (socket && type === onClose) {
          socket.close(1000);
          socket.onclose = (event) => {
            dispatch({ type: onClose })
          }
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
          if (type === wsSendMessage) {
            const message = { ...payload }
            socket.send(JSON.stringify(message));
          }
        }
        next(action);
      }
    }
  }
}
