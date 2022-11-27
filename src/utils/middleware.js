import { getCookie } from "./coockie";
const token = getCookie('access');
export const socketMidlleware = (url, actions) => {
  return (store) => {
    let socket = null;
    return (next) => {
      return (action) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onOrders } = actions;
        const { isLoggedIn } = getState().login;
        if (type === wsInit) {
          socket = new WebSocket(url)
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
          socket.onclose = (event) => {
            dispatch({ type: onClose })
          }
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
