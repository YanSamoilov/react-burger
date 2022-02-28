import { BASE_URL } from './constants';
import { getCookie } from './cookie';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getIngredientsData = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}ingredients`);
  return checkResponse(response);
};

export const postOrder = async (arrayId: ReadonlyArray<string>, accessToken: any): Promise<any> => {
  const response = await fetch(`${BASE_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: "Bearer " + accessToken
    },
    body: JSON.stringify({
      ingredients: arrayId
    })
  })
  return checkResponse(response);
};

//Авторизация пользователя.
export const postAuthUser = async (userData: { email: string, password: string }): Promise<any> => {

  const response = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return checkResponse(response);
}

//Регистрация пользователя.
export const postRegisterUser = async (userData: { email: string, password: string, name: string }): Promise<any> => {

  const response = await fetch(`${BASE_URL}auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return checkResponse(response);
}

//Запрос для разрешения смены пароля, отправка почты.
export const getPermissionChangePassword = async (email: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": email
    })
  })
  return checkResponse(response);
}

//Запрос на смену пароля. Отправка нового пароля.
export const postNewPassword = async (newPassword: { password: string, token: string }): Promise<any> => {
  const response = await fetch(`${BASE_URL}password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'password': newPassword.password,
      'token': newPassword.token
    })
  })
  return checkResponse(response);
}

//Запрос на выход из системы.
export const postLogOut = async () => {
  const refreshToken = getCookie('refreshToken');
  const response = await fetch(`${BASE_URL}auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
  return checkResponse(response);
}

//Запрос на обновление accessToken.
export const getNewAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${BASE_URL}auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: refreshToken
    })
  })
  return checkResponse(response);
}

//Запрос данных о пользователе.
export const getUserData = async (accessToken: string) => {
  const response = await fetch(`${BASE_URL}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: "Bearer " + accessToken,
    }
  })
  return checkResponse(response);
}

export const patchNewUserData = async (userData: { email: string, password: string, name: string }, accessToken: string): Promise<any> => {

  const response = await fetch(`${BASE_URL}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(userData)
  })
  return checkResponse(response);
}
