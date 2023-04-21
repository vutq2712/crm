import { useSession } from '@app/hooks/session'
import { useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { clearUserCredential } from '@app/services/auth';


export function Index() {
  const { userInfo,logout } = useSession();
  const router = useRouter();

  const logOut = async () => {
    await googleLogout();
    await logout();
    // await clearUserCredential();
    // await router.push('/auth/login')
  };

  return (
    <>
      {userInfo && (
        <div>
          <img src={userInfo.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {userInfo.name}</p>
          <p>Email Address: {userInfo.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      )}
    </>
  )
}
