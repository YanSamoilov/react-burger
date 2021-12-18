import { POST_ORDER_SUCCESS, POST_ORDER_FAILED, HANDLE_CLOSE_ORDER_MODAL} from '../actions/orderDetails';

const orderDetailsInitialState = {
  orderNum: null,
  errorMessage: null
}

export const orderDetails = (state = orderDetailsInitialState, action) => {
  switch(action.type) {
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderNum: action.feed
      }
    };
    case POST_ORDER_FAILED: {
      return {
        ...state,
        errorMessage: `Произошла ошибка: ${action.feed}. Обратитесь к администрации.`
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
