import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'services/types/hooks';
import { postRegisterUser, postAuthUser, postLogOut, patchNewUserData, getNewAccessToken, getPermissionChangePassword, postNewPassword } from 'utils/api';
import { setTokenInCookie, getCookie, deleteCookie } from 'utils/cookie';
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
  POST_NEW_PASSWORD_FAILED
} from 'services/constants/userAuth';
import {
  IServerRequest,
  IRegisterUserSuccess,
  IRegisterUserFailed,
  IAuthUserSuccess,
  IAuthUserFailed,
  ILogOutSuccess,
  ILogOutFailed,
  IChangeUserSuccess,
  IChangeUserFailed,
  IPostEmailForgotPageSuccess,
  IPostEmailForgotPageFailed,
  IPostNewPasswordSuccess,
  IPostNewPasswordFailed
} from 'services/types/data';

export type TUserData =
  | IServerRequest
  | IRegisterUserSuccess
  | IRegisterUserFailed
  | IAuthUserSuccess
  | IAuthUserFailed
  | ILogOutSuccess
  | ILogOutFailed
  | IChangeUserSuccess
  | IChangeUserFailed
  | IPostEmailForgotPageSuccess
  | IPostEmailForgotPageFailed
  | IPostNewPasswordSuccess
  | IPostNewPasswordFailed

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TUserData>
>;

export const postNewPasswordAction: AppThunk = (password: string, value: string) => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    postNewPassword({ password: password, token: value })
      .then((res) => {
        dispatch({
          type: POST_NEW_PASSWORD_SUCCESS,
        })
      })
      .catch((error) => {
        dispatch({
          type: POST_NEW_PASSWORD_FAILED,
          postNewpasswordErrorMessage: error
        })
      })
  }
}

export const postEmailFromForgotPage: AppThunk = (email: string) => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    getPermissionChangePassword(email)
      .then((res) => {
        dispatch({
          type: POST_EMAIL_FORGOT_PAGE_SUCCESS,
        })
      })
      .catch((error) => {
        dispatch({
          type: POST_EMAIL_FORGOT_PAGE_FAILED,
          postEmailForgotPageErrorMessage: error,
        })
      })
  }
}

export const registerUser: AppThunk = (user: { email: string, password: string, name: string }) => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    postRegisterUser(user)
      .then((res) => {
        setTokenInCookie(res, 'accessToken');
        setTokenInCookie(res, 'refreshToken');
        dispatch({
          type: REGISTER_USER_SUCCESS,
        })
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          registerErrorMessage: error,
        })
      })
  }
}

export const patchNewUserDataAction: AppThunk = (user: { email: string, password: string, name: string }) => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    let refreshToken = getCookie('refreshToken');
    let accessToken = getCookie('accessToken');

    if (accessToken) {
      patchNewUserData(user, accessToken)
        .then((res) => {
          dispatch({
            type: CHANGE_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name,
            changeUserResultMessage: 'Данные успешно изменены'
          })
        })
        .catch((error) => {
          dispatch({
            type: CHANGE_USER_FAILED,
            changeUserErrorMessage: error,
          })
        })
    }
    else if (refreshToken) {
      getNewAccessToken(refreshToken)
        .then((res) => {
          setTokenInCookie(res, 'accessToken');
          setTokenInCookie(res, 'refreshToken');
          accessToken = getCookie('accessToken');
          if (accessToken) {
            patchNewUserData(user, accessToken)
              .then((res) => {
                dispatch({
                  type: CHANGE_USER_SUCCESS,
                  email: res.user.email,
                  name: res.user.name,
                  changeUserResultMessage: 'Данные успешно изменены'
                })
              })
              .catch((error) => {
                dispatch({
                  type: CHANGE_USER_FAILED,
                  changeUserErrorMessage: error,
                })
              })
          }
        })
        .catch((error) => {
          return error.message
        })
    }
  }
}

export const authUser: AppThunk = (user: { email: string, password: string }) => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    postAuthUser(user)
      .then((res) => {
        setTokenInCookie(res, 'accessToken');
        setTokenInCookie(res, 'refreshToken');

        dispatch({
          type: AUTH_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
      })
      .catch((error) => {
        dispatch({
          type: AUTH_USER_FAILED,
          authErrorMessage: error,
        })
      })
  }
}

export const logoutUser: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_SERVER_REQUEST
    })

    postLogOut()
      .then(() => {
        deleteCookie('accessToken');
        deleteCookie('accessToken');
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        })
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_USER_FAILED,
          logoutErrorMessage: error,
        })
      })
  }
}

