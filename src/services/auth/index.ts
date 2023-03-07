import Cookies from 'js-cookie';
import { JWT_ACCESS_TOKEN } from '@app/const/common.const';

export function checkUserLogin() {  
  return !!Cookies.get(JWT_ACCESS_TOKEN);
}

export function saveUserCredential(userCredential: any) {
  Cookies.set(JWT_ACCESS_TOKEN, userCredential);
}

export function getAccessToken() {
  return Cookies.get(JWT_ACCESS_TOKEN);
}

export function clearUserCredential() {
  Cookies.remove(JWT_ACCESS_TOKEN);
}