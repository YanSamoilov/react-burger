import { AppThunk, IFeedOrder } from 'services/types/data';
import { postOrder } from 'utils/api';
import { getCookie } from 'utils/cookie';
import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  HANDLE_CLOSE_ORDER_MODAL,
  POST_ORDER_REQUEST,
  ADD_CURRENT_ORDER_DETAILS,
  REMOVE_CURRENT_ORDER_DETAILS
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

export interface IAddCurrentOrderDetails {
  readonly type: typeof ADD_CURRENT_ORDER_DETAILS;
  payload: IFeedOrder
}

export interface IRemoveCurrentOrderDetails {
  readonly type: typeof REMOVE_CURRENT_ORDER_DETAILS;
}

export type TOrderDetailsActions =
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IHandleCloseOrderModal
  | IAddCurrentOrderDetails
  | IRemoveCurrentOrderDetails;

export const postOrderRequest = (): IPostOrderRequest => ({
  type: POST_ORDER_REQUEST
});

export const postOrderSuccess = (orderNum: number): IPostOrderSuccess => ({
  type: POST_ORDER_SUCCESS,
  orderNum
});

export const postOrderFailed = (error: string): IPostOrderFailed => ({
  type: POST_ORDER_FAILED,
  error
});

export const handleCloseOrderModal = (): IHandleCloseOrderModal => ({
  type: HANDLE_CLOSE_ORDER_MODAL
});

export const addCurrentOrderDetails = (currentOrder: IFeedOrder): IAddCurrentOrderDetails => ({
  type: ADD_CURRENT_ORDER_DETAILS,
  payload: currentOrder
})

export const removeCurrentOrderDetails = (): IRemoveCurrentOrderDetails => ({
  type: REMOVE_CURRENT_ORDER_DETAILS,
})

export const getOrderDetails: AppThunk = (idsArray: ReadonlyArray<string>) => {
  const accessToken = getCookie('accessToken');
  return function (dispatch) {
    dispatch(postOrderRequest())
    postOrder(idsArray, accessToken)
      .then((res) => {
        dispatch(postOrderSuccess(res.order.number))
      })
      .catch((error) => {
        dispatch(postOrderFailed(error))
      })
  }
}

