import {
  GET_SERVER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,
  POST_EMAIL_FORGOT_PAGE_SUCCESS,
  POST_EMAIL_FORGOT_PAGE_FAILED,
  POST_NEW_PASSWORD_SUCCESS,
  POST_NEW_PASSWORD_FAILED,
  GET_SERVER_REQUEST_RESET
} from "services/constants/userAuth";
import { TUserData } from "services/actions/userAuth";

export interface IUserAuthState {
  user: {
    email: string,
    name: string,
  },
  isAuth: boolean,
  isLoading: boolean,
  registerErrorMessage: string | null,
  authErrorMessage: string | null,
  logoutErrorMessage: string | null,
  changeUserResultMessage: string | null,
  isEmail: 'pushToResetPage' | 'pushToLoginPage' | '',
  postEmailForgotPageErrorMessage: string | null,
  postNewPasswordError: string | null,
}


export const userAuthState: IUserAuthState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  isLoading: false,
  registerErrorMessage: null,
  authErrorMessage: null,
  logoutErrorMessage: null,
  changeUserResultMessage: '',
  isEmail: '',
  postEmailForgotPageErrorMessage: null,
  postNewPasswordError: null,
}

export const authUserReducer = (state = userAuthState, action: TUserData): IUserAuthState => {
  switch (action.type) {
    case GET_SERVER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerErrorMessage: `Произошла ошибка регистрации: ${action.registerErrorMessage}. Обратитесь к администрации.`,
        isLoading: false,
      }
    }
    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.email,
          name: action.name
        },
        isLoading: false,
        isAuth: true,
        authErrorMessage: null,
      }
    }
    case AUTH_USER_FAILED: {
      return {
        ...state,
        authErrorMessage: `Произошла ошибка: ${action.authErrorMessage}. Проверьте введенные данные или попробуйте авторизоваться позже.`,
        isLoading: false,
      }
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.email,
          name: action.name
        },
        isLoading: false,
        changeUserResultMessage: action.changeUserResultMessage,
      }
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeUserResultMessage: `Произошла ошибка: ${action.changeUserErrorMessage}. Повторите попытку позже.`,
        isLoading: false,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: '',
          name: ''
        },
        isLoading: false,
        isAuth: false,
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutErrorMessage: `Произошла ошибка: ${action.logoutErrorMessage}.`,
        isLoading: false,
      }
    }
    case POST_EMAIL_FORGOT_PAGE_SUCCESS: {
      return {
        ...state,
        isEmail: 'pushToResetPage',
        isLoading: false
      }
    }
    case POST_EMAIL_FORGOT_PAGE_FAILED: {
      return {
        ...state,
        postEmailForgotPageErrorMessage: action.postEmailForgotPageErrorMessage,
        isLoading: false
      }
    }
    case POST_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isEmail: 'pushToLoginPage'
      }
    }
    case POST_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        isLoading: false,
        postNewPasswordError: action.postNewpasswordErrorMessage,
      }
    }
    case GET_SERVER_REQUEST_RESET: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}
