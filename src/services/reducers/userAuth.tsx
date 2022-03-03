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
  isLoadingAuth: boolean,
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
  isLoadingAuth: false,
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
        isLoadingAuth: true,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoadingAuth: false,
        isAuth: true,
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerErrorMessage: `Произошла ошибка регистрации: ${action.registerErrorMessage}. Обратитесь к администрации.`,
        isLoadingAuth: false,
      }
    }
    case AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.email,
          name: action.name
        },
        isLoadingAuth: false,
        isAuth: true,
        authErrorMessage: null,
      }
    }
    case AUTH_USER_FAILED: {
      return {
        ...state,
        authErrorMessage: `Произошла ошибка: ${action.authErrorMessage}. Проверьте введенные данные или попробуйте авторизоваться позже.`,
        isLoadingAuth: false,
      }
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.email,
          name: action.name
        },
        isLoadingAuth: false,
        changeUserResultMessage: action.changeUserResultMessage,
      }
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeUserResultMessage: `Произошла ошибка: ${action.changeUserErrorMessage}. Повторите попытку позже.`,
        isLoadingAuth: false,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: '',
          name: ''
        },
        isLoadingAuth: false,
        isAuth: false,
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutErrorMessage: `Произошла ошибка: ${action.logoutErrorMessage}.`,
        isLoadingAuth: false,
      }
    }
    case POST_EMAIL_FORGOT_PAGE_SUCCESS: {
      return {
        ...state,
        isEmail: 'pushToResetPage',
        isLoadingAuth: false
      }
    }
    case POST_EMAIL_FORGOT_PAGE_FAILED: {
      return {
        ...state,
        postEmailForgotPageErrorMessage: action.postEmailForgotPageErrorMessage,
        isLoadingAuth: false
      }
    }
    case POST_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoadingAuth: false,
        isEmail: 'pushToLoginPage'
      }
    }
    case POST_NEW_PASSWORD_FAILED: {
      return {
        ...state,
        isLoadingAuth: false,
        postNewPasswordError: action.postNewpasswordErrorMessage,
      }
    }
    case GET_SERVER_REQUEST_RESET: {
      return {
        ...state,
        isLoadingAuth: false,
      }
    }
    default: {
      return state
    }
  }
}
