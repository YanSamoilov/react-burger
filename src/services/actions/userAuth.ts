import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'services/types/hooks';
import { postRegisterUser, postAuthUser, postLogOut, patchNewUserData, getNewAccessToken, getPermissionChangePassword, postNewPassword, getUserData } from 'utils/api';
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
  POST_NEW_PASSWORD_FAILED,
  GET_SERVER_REQUEST_RESET
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
  IPostNewPasswordFailed,
  IServerRequestReset
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
  | IServerRequestReset

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TUserData>
>;

export const getServerRequest = (): IServerRequest => ({
  type: GET_SERVER_REQUEST
});

export const postNewPasswordSuccess = (): IPostNewPasswordSuccess => ({
  type: POST_NEW_PASSWORD_SUCCESS
});

export const postNewPasswordFailed = (postNewpasswordErrorMessage: string): IPostNewPasswordFailed => ({
  type: POST_NEW_PASSWORD_FAILED,
  postNewpasswordErrorMessage
});

export const postEmailForgotPageSuccess = (): IPostEmailForgotPageSuccess => ({
  type: POST_EMAIL_FORGOT_PAGE_SUCCESS
});

export const postEmailForgotPageFailed = (postEmailForgotPageErrorMessage: string): IPostEmailForgotPageFailed => ({
  type: POST_EMAIL_FORGOT_PAGE_FAILED,
  postEmailForgotPageErrorMessage
});

export const registerUserSuccess = (): IRegisterUserSuccess => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerUserFailed = (registerErrorMessage: string): IRegisterUserFailed => ({
  type: REGISTER_USER_FAILED,
  registerErrorMessage
});

export const changeUserSuccess = (email: string, name: string, changeUserResultMessage: string): IChangeUserSuccess => ({
  type: CHANGE_USER_SUCCESS,
  email,
  name,
  changeUserResultMessage
});

export const changeUserFailed = (changeUserErrorMessage: string): IChangeUserFailed => ({
  type: CHANGE_USER_FAILED,
  changeUserErrorMessage
});

export const authUserSuccess = (email: string, name: string): IAuthUserSuccess => ({
  type: AUTH_USER_SUCCESS,
  email,
  name
})

export const authUserFailed = (authErrorMessage: string): IAuthUserFailed => ({
  type: AUTH_USER_FAILED,
  authErrorMessage
});

export const logOutSuccess = (): ILogOutSuccess => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logOutFailed = (logoutErrorMessage: string): ILogOutFailed => ({
  type: LOGOUT_USER_FAILED,
  logoutErrorMessage
});

export const getServerRequestReset = (): IServerRequestReset => ({
  type: GET_SERVER_REQUEST_RESET
})

//Отправка нового пароля на сервер.
export const postNewPasswordAction: AppThunk = (password: string, value: string) => {
  return function (dispatch) {
    dispatch(getServerRequest());
    postNewPassword({ password: password, token: value })
      .then((res) => {
        dispatch(postNewPasswordSuccess());
      })
      .catch((error) => {
        dispatch(postNewPasswordFailed(error));
      })
  }
}

//Отправка почты для получения ключа для смены пароля.
export const postEmailFromForgotPage: AppThunk = (email: string) => {
  return function (dispatch) {
    dispatch(getServerRequest());

    getPermissionChangePassword(email)
      .then((res) => {
        dispatch(postEmailForgotPageSuccess());
      })
      .catch((error) => {
        dispatch(postEmailForgotPageFailed(error));
      })
  }
}

//Отправка данных для регистрации.
export const registerUser: AppThunk = (user: { email: string, password: string, name: string }) => {
  return function (dispatch) {
    dispatch(getServerRequest());

    postRegisterUser(user)
      .then((res) => {
        setTokenInCookie(res, 'accessToken');
        setTokenInCookie(res, 'refreshToken');
        dispatch(registerUserSuccess());
      })
      .catch((error) => {
        dispatch(registerUserFailed(error))
      })
  }
}

//Отправка новых данных пользователя.
export const patchNewUserDataAction: AppThunk = (user: { email: string, password: string, name: string }) => {
  return function (dispatch) {
    dispatch(getServerRequest())

    let refreshToken = getCookie('refreshToken');
    let accessToken = getCookie('accessToken');

    if (accessToken) {
      patchNewUserData(user, accessToken)
        .then((res) => {
          dispatch(changeUserSuccess(
            res.user.email,
            res.user.name,
            'Данные успешно изменены'
          ));
        })
        .catch((error) => {
          dispatch(changeUserFailed(error))
        });
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
                dispatch(changeUserSuccess(
                  res.user.email,
                  res.user.name,
                  'Данные успешно изменены'
                ));
              })
              .catch((error) => {
                dispatch(dispatch(changeUserFailed(error)));
              })
          }
        })
        .catch((error) => {
          return error.message
        })
    }
  }
}

//Авторизация пользователя.
export const authUser: AppThunk = (user: { email: string, password: string }) => {
  return function (dispatch) {
    dispatch(getServerRequest())

    postAuthUser(user)
      .then((res) => {
        setTokenInCookie(res, 'accessToken');
        setTokenInCookie(res, 'refreshToken');

        dispatch(authUserSuccess(
          res.user.email,
          res.user.name
        ));
      })
      .catch((error) => {
        dispatch(authUserFailed(error));
      })
  }
}

//Выход пользователя из приложения.
export const logoutUser: AppThunk = () => {
  return function (dispatch) {
    dispatch(getServerRequest())

    postLogOut()
      .then(() => {
        deleteCookie('accessToken');
        deleteCookie('accessToken');
        dispatch(logOutSuccess());
      })
      .catch((error) => {
        dispatch(logOutFailed(error));
      })
  }
}

//Получение данных о пользователе.
export const getUserDataAction: AppThunk = (path) => {
  return function (dispatch) {
    dispatch(getServerRequest())
    let refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      return
    }
    getNewAccessToken(refreshToken)
      .then((res) => {
        setTokenInCookie(res, 'accessToken');
        setTokenInCookie(res, 'refreshToken');
        const accessToken = getCookie('accessToken');
        if (accessToken) {
          getUserData(accessToken)
            .then((res) => {
              dispatch(authUserSuccess(
                res.user.email,
                res.user.name
              ));
            })
            .catch((error) => {
              dispatch(authUserFailed(error))
            })
        }
      })
      .catch(() => {
        dispatch(getServerRequestReset());
      })
  }
}
