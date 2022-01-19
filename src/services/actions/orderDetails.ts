import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'services/types/hooks';
import { postOrder } from 'utils/api';
import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  HANDLE_CLOSE_ORDER_MODAL,
  POST_ORDER_REQUEST
} from '../constants/orderDetails';

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  orderNum: number | null;
}

export interface IHandleCloseOrderModal {
  readonly type: typeof HANDLE_CLOSE_ORDER_MODAL;
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
  error: string | null;
}

export type TOrderDetailsActions =
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IHandleCloseOrderModal;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TOrderDetailsActions>
>;

export const getOrderDetails: AppThunk = (idsArray: ReadonlyArray<string>) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    })
    postOrder(idsArray)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNum: res.order.number
        })
      })
      .catch((error) => {
        dispatch({
          type: POST_ORDER_FAILED,
          error: error,
        })
      })
  }
}

