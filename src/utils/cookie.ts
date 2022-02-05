import { IServerReply } from "services/types/data";
import { getNewAccessToken } from "./api";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {

    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}


export function setTokenInCookie(resource: IServerReply, tokenName: string) {
  let authToken;
  if(tokenName === 'accessToken') {
      if (resource.accessToken.indexOf('Bearer') === 0) {
        authToken = resource.accessToken.split('Bearer ')[1];
      }
      if (authToken) {
        setCookie(tokenName, authToken, {expires:1200});
      }
  }
  else {
    authToken = resource.refreshToken;
    if(authToken)
      setCookie(tokenName, authToken);
  }
}


export async function updateAccessToken(refreshToken: string) {

  await getNewAccessToken(refreshToken)
    .then((res) => {

      setTokenInCookie(res, 'accessToken');
      setTokenInCookie(res, 'refreshToken');
      return res.accessToken.split('Bearer ')[1]
    })
    .catch((error) => {
      return error.message
    })
}
