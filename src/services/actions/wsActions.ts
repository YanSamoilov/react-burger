import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_START_CLOSED,
  WS_CONNECTION_START_WITH_AUTH,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "services/constants/wsConstants";
import { IWSMessageFeed } from "services/types/data";


export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionStartWithAuth {
  readonly type: typeof WS_CONNECTION_START_WITH_AUTH;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: IWSMessageFeed;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSStartConnectionClosed {
  readonly type: typeof WS_CONNECTION_START_CLOSED;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSGetMessage
  | IWSConnectionClosed
  | IWSStartConnectionClosed
  | IWSConnectionStartWithAuth

export const wsConnectionStart = (): IWSConnectionStart => ({
  type: WS_CONNECTION_START
});

export const wsConnectionStartWithAuth = (): IWSConnectionStartWithAuth => ({
  type: WS_CONNECTION_START_WITH_AUTH
});

export const wsConnectionSuccess = (): IWSConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (): IWSConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsGetMessage = (data: IWSMessageFeed): IWSGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: data
});

export const wsConnectionClosed = (): IWSConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
});

export const wsConnectionStartClosed = (): IWSStartConnectionClosed => ({
  type: WS_CONNECTION_START_CLOSED
});
