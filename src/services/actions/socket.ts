import { TOrder } from '../../utils/types';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';

export const wsActions: IConstWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS
};

export interface IConstWsActions {
  readonly wsInit: typeof WS_CONNECTION_START,
  readonly onOpen: typeof WS_CONNECTION_SUCCESS,
  readonly onClose: typeof WS_CONNECTION_CLOSED,
  readonly onError: typeof WS_CONNECTION_ERROR,
  readonly onOrders: typeof WS_GET_ORDERS
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS
  readonly payload: TOrderPayload
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders

type TOrderPayload = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}
export const wsConnectionStart = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrders = (payload: TOrderPayload): IWsGetOrders => {
  return {
    type: WS_GET_ORDERS,
    payload
  };
};
