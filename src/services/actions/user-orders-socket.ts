import { TOrder } from '../../utils/types';

export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START';
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED';
export const USER_WS_GET_ORDERS = 'USER_WS_GET_ORDERS';

export const userWsActions: IUserConstWsActions = {
  wsInit: USER_WS_CONNECTION_START,
  onOpen: USER_WS_CONNECTION_SUCCESS,
  onClose: USER_WS_CONNECTION_CLOSED,
  onError: USER_WS_CONNECTION_ERROR,
  onOrders: USER_WS_GET_ORDERS
};

export interface IUserConstWsActions {
  readonly wsInit: typeof USER_WS_CONNECTION_START,
  readonly onOpen: typeof USER_WS_CONNECTION_SUCCESS,
  readonly onClose: typeof USER_WS_CONNECTION_CLOSED,
  readonly onError: typeof USER_WS_CONNECTION_ERROR,
  readonly onOrders: typeof USER_WS_GET_ORDERS
}

export interface IUserWsConnectionStart {
  readonly type: typeof USER_WS_CONNECTION_START
  readonly payload: string | undefined
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

export type TUserWsActions =
  | IUserWsConnectionStart
  | IUserWsConnectionSuccess
  | IUserWsConnectionError
  | IUserWsConnectionClosed
  | IUserWsGetOrders

type TOrderPayload = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}
export const userWsConnectionStart = (payload: string | undefined): IUserWsConnectionStart => {
  return {
    type: USER_WS_CONNECTION_START,
    payload
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
