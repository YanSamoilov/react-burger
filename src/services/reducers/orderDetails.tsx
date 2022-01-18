import { POST_ORDER_SUCCESS, POST_ORDER_FAILED, HANDLE_CLOSE_ORDER_MODAL, POST_ORDER_REQUEST} from '../constants/orderDetails';
import { TOrderDetailsActions } from '../actions/orderDetails';

export type TOrderDetails = {
  orderNum: null | number;
  errorMessage: null | string;
  isLoading: boolean;
}

const orderDetailsInitialState: TOrderDetails = {
  orderNum: null,
  errorMessage: null,
  isLoading: false
}

export const orderDetails = (state = orderDetailsInitialState, action: TOrderDetailsActions): TOrderDetails => {
  switch(action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderNum: action.orderNum,
        isLoading: false
      }
    }
    case POST_ORDER_FAILED: {
      return {
        orderNum: null,
        errorMessage: `Произошла ошибка: ${action.error}. Обратитесь к администрации.`,
        isLoading: false
      }
    }
    case HANDLE_CLOSE_ORDER_MODAL: {
      return {
        orderNum: null,
        errorMessage: null,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
