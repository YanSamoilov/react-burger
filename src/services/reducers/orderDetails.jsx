import { POST_ORDER_SUCCESS, POST_ORDER_FAILED, HANDLE_CLOSE_ORDER_MODAL, POST_ORDER_REQUEST} from '../actions/orderDetails';

const orderDetailsInitialState = {
  orderNum: null,
  errorMessage: null
}

export const orderDetails = (state = orderDetailsInitialState, action) => {
  switch(action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderNum: action.orderNum
      }
    };
    case POST_ORDER_FAILED: {
      return {
        orderNum: null,
        errorMessage: `Произошла ошибка: ${action.error}. Обратитесь к администрации.`
      }
    };
    case HANDLE_CLOSE_ORDER_MODAL: {
      return {
        orderNum: null,
        errorMessage: null
      }
    }
    default: {
      return state
    }
  }
}
