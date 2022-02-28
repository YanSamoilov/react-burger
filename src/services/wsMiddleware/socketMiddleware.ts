import { Middleware, MiddlewareAPI } from "redux";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage
} from "services/actions/wsActions";
import { AppDispatch, RootState } from "services/types/hooks";
import { getCookie } from "utils/cookie";

  export const socketMiddleware = (wsUrl: string, actionList: any, authType: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      if(authType === 'withoutAuth') {
        if (type === actionList.wsConnectionStart.type) {
          socket = new WebSocket(wsUrl);
        }
      }
      else if (authType === 'withAuth') {
        if (type === actionList.wsConnectionStartWithAuth.type) {
          const accessToken = getCookie('accessToken');
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }
      if (socket) {
        socket.onopen = event => {
          if (socket?.readyState === 1) dispatch(wsConnectionSuccess());
        };
        socket.onerror = event => {
          dispatch(wsConnectionError());
        };
        socket.onmessage = event => {
          const { data } = event;
          dispatch(wsGetMessage(JSON.parse(data)));
        };
        socket.onclose = event => {
          dispatch(wsConnectionClosed());
        };

        if (type === actionList.wsConnectionStartClosed.type) {
          socket.close(1000, 'reason');
        }
      }
      next(action);
    }
  }
  )
}
