import { TWSActions } from "services/actions/wsActions";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "services/constants/wsConstants";
import { IFeedOrder } from "services/types/data";


export type TWSState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IFeedOrder>;
  total: number | null;
  totalToday: number | null;

  error?: Event;
}

const feedInitialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
};


export const wsReducer = (state = feedInitialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true
      }
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state
      }
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        orders: [],
        wsConnected: false,
      }
    }
    default: {
      return state
    }
  }
}
