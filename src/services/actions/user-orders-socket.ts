import { TOrder } from '../../utils/types';

export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START';
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED';
export const USER_WS_GET_ORDERS = 'USER_WS_GET_ORDERS';
export const USER_WS_SEND_MESSAGE = 'USER_WS_SEND_MESSAGE';
export const USER_WS_USER_NAME_UPDATE = 'USER_WS_USER_NAME_UPDATE';

export const userWsActions: IUserConstWsActions = {
  wsInit: USER_WS_CONNECTION_START,
  wsSendMessage: USER_WS_SEND_MESSAGE,
  onOpen: USER_WS_CONNECTION_SUCCESS,
  onClose: USER_WS_CONNECTION_CLOSED,
  onError: USER_WS_CONNECTION_ERROR,
  onOrders: USER_WS_GET_ORDERS
};

export interface IUserConstWsActions {
  readonly wsInit: typeof USER_WS_CONNECTION_START,
  readonly wsSendMessage: typeof USER_WS_SEND_MESSAGE,
  readonly onOpen: typeof USER_WS_CONNECTION_SUCCESS,
  readonly onClose: typeof USER_WS_CONNECTION_CLOSED,
  readonly onError: typeof USER_WS_CONNECTION_ERROR,
  readonly onOrders: typeof USER_WS_GET_ORDERS
}

export interface IUserWsConnectionStart {
  readonly type: typeof USER_WS_CONNECTION_START
}

export interface IUserWsConnectionSuccess {
  readonly type: typeof USER_WS_CONNECTION_SUCCESS
}
export interface IUserWsConnectionError {
  readonly type: typeof USER_WS_CONNECTION_ERROR
}
export interface IUserWsConnectionClosed {
  readonly type: typeof USER_WS_CONNECTION_CLOSED
}
export interface IUserWsGetOrders {
  readonly type: typeof USER_WS_GET_ORDERS
  readonly payload: TOrderPayload
}
export interface IUserWsSendMessage {
  readonly type: typeof USER_WS_SEND_MESSAGE
  readonly payload: string
}
export interface IUserWsUserNameUpdate {
  readonly type: typeof USER_WS_USER_NAME_UPDATE
  readonly payload: string
}

export type TUserWsActions =
  | IUserWsConnectionStart
  | IUserWsConnectionSuccess
  | IUserWsConnectionError
  | IUserWsConnectionClosed
  | IUserWsGetOrders
  | IUserWsSendMessage
  | IUserWsUserNameUpdate

type TOrderPayload = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}
export const userWsConnectionStart = (): IUserWsConnectionStart => {
  return {
    type: USER_WS_CONNECTION_START
  };
};

export const userWsConnectionSuccess = (): IUserWsConnectionSuccess => {
  return {
    type: USER_WS_CONNECTION_SUCCESS
  };
};

export const userWsConnectionError = (): IUserWsConnectionError => {
  return {
    type: USER_WS_CONNECTION_ERROR
  };
};

export const userWsConnectionClosed = (): IUserWsConnectionClosed => {
  return {
    type: USER_WS_CONNECTION_CLOSED
  };
};

export const userWsGetOrders = (payload: TOrderPayload): IUserWsGetOrders => {
  return {
    type: USER_WS_GET_ORDERS,
    payload
  };
};

export const userWsSendMessage = (message: string): IUserWsSendMessage => {
  return {
    type: USER_WS_SEND_MESSAGE,
    payload: message
  };
};

export const userWsUserNameUpdate = (userName: string): IUserWsUserNameUpdate => {
  return {
    type: USER_WS_USER_NAME_UPDATE,
    payload: userName
  };
};


