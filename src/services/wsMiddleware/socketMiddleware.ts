import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "services/types/hooks";
import { getCookie } from "utils/cookie";

  export const socketMiddleware = (wsUrl: string, actionsList: any, authType: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      if(authType === 'withoutAuth') {
        if (type === actionsList.wsConnectionStart.type) {
          socket = new WebSocket(wsUrl);
        }
      }
      else if (authType === 'withAuth') {
        if (type === actionsList.wsConnectionStartWithAuth.type) {
          const accessToken = getCookie('accessToken');
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }
      if (socket) {
        socket.onopen = event => {
          if (socket?.readyState === 1) dispatch(actionsList.wsConnectionSuccess());
        };
        socket.onerror = event => {
          dispatch(actionsList.wsConnectionError());
        };
        socket.onmessage = event => {
          const { data } = event;
          dispatch(actionsList.wsGetMessage(JSON.parse(data)));
        };
        socket.onclose = event => {
          dispatch(actionsList.wsConnectionClosed());
        };

        if (type === actionsList.wsConnectionStartClosed.type) {
          socket.close(1000, 'reason');
        }
      }
      next(action);
    }
  }
  )
}
