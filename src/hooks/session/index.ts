import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkUserLogin, clearUserCredential, getAccessToken } from '@app/services/auth';
// import { getProfile, MyProfile } from '@app/api/user/get-profile';
import { userSessionSubject } from './session-subject';
import { getUser } from '@app/api/auth/get-user-info';
import { JWT_ACCESS_TOKEN } from '@app/const/common.const';
import Cookies from 'js-cookie';

/** DO NOT export this variable! */
let isFetchingUserData = false;

function getUserInfo() {
  const userData = userSessionSubject.getValue();
  const shouldNotCallApi = userData || isFetchingUserData;
  if (shouldNotCallApi) return;

  isFetchingUserData = true;
  const token = Cookies.get(JWT_ACCESS_TOKEN);
  
  getUser(token).subscribe(res => {
    userSessionSubject.next(res);        
  });
}

export interface UserSession {
  isLoggedIn: boolean;
  userInfo?: any;
}

export function useSession() {
  const router = useRouter();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const isLoggedIn = checkUserLogin();

    userSessionSubject.subscribe(data => {
      setUserInfo(data);      
    });

    setIsloggedIn(isLoggedIn);
    isLoggedIn && getUserInfo();
  }, []);

  /**
   * This function allow you to sync new data from server and notify to
   * all components that use `useSession` hook about new data.
   */
  const syncDataWithServer = useCallback(() => {
    const isLoggedIn = checkUserLogin();
    isLoggedIn && getUserInfo();
  }, [])

  const logout = useCallback(() => {
    clearUserCredential();
    userSessionSubject.next(undefined);
    isFetchingUserData = false;
    router.push('/auth/login');
  }, [router]);

  return { isLoggedIn, userInfo, syncDataWithServer, logout };
}