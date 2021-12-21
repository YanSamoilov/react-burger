import { postOrder } from 'utils/api';

export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const HANDLE_CLOSE_ORDER_MODAL ='HANDLE_CLOSE_ORDER_MODAL';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';

export function getOrderDetails (idsArray) {
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

