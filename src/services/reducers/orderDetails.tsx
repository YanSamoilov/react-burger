import { POST_ORDER_SUCCESS, POST_ORDER_FAILED, HANDLE_CLOSE_ORDER_MODAL, POST_ORDER_REQUEST, ADD_CURRENT_ORDER_DETAILS, REMOVE_CURRENT_ORDER_DETAILS } from '../constants/orderDetails';
import { TOrderDetailsActions } from '../actions/orderDetails';
import { IFeedOrder } from 'services/types/data';

export type TOrderDetails = {
  orderNum: null | number;
  errorMessage: null | string;
  isLoading: boolean;
  currentOrderDetails: null | IFeedOrder;
}

const orderDetailsInitialState: TOrderDetails = {
  orderNum: null,
  errorMessage: null,
  isLoading: false,
  currentOrderDetails: null,
}

export const orderDetails = (state = orderDetailsInitialState, action: TOrderDetailsActions): TOrderDetails => {
  switch (action.type) {
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
        ...state,
        orderNum: null,
        errorMessage: `Произошла ошибка: ${action.error}. Обратитесь к администрации.`,
        isLoading: false
      }
    }
    case HANDLE_CLOSE_ORDER_MODAL: {
      return {
        ...state,
        orderNum: null,
        errorMessage: null,
        isLoading: false
      }
    }
    case ADD_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrderDetails: action.payload
      }
    }
    case REMOVE_CURRENT_ORDER_DETAILS: {
      return {
        ...state,
        currentOrderDetails: null
      }
    }
    default: {
      return state
    }
  }
}
