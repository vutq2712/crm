import { getToken } from '@app/api/auth/get-access-token';
import { CLIENT_ID, CLIENT_SECRET, CODE_VERIFIER, GRANT_TYPE, REDIRECT_URI } from '@app/const/common.const';
import { CrmAppContext } from '@app/context/crm-app.ctx';
import { ProjectLayout, getLayout } from '@app/kit/layout';
import { useSubscription } from '@app/hooks/subscription';
import { getAccessToken, saveUserCredential } from '@app/services/auth';
import '@app/styles/globals.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


type NextPageWithLayout = NextPage & {
  layout?: ProjectLayout;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);
  const router = useRouter();
  const subscription = useSubscription();
  useEffect(()=>{
    if (router.query.code) {
      const getAccessTokenSub = getToken({
        code: router.query.code
      }).subscribe(res=>{
        saveUserCredential(res.token)        
      })

      subscription.add(getAccessTokenSub);
    }
  },[router.query])

  useEffect(()=>{
    if (!getAccessToken()) {
      router.push('/auth/login');
    }
  },[])

  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <CrmAppContext.Provider value={{}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CrmAppContext.Provider>
    </GoogleOAuthProvider>
  )
}
