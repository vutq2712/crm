import { CLIENT_ID, REDIRECT_URI } from '@app/const/common.const';
import { CrmLayout, PageWrapper } from '@app/crmkit/layout';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export const Login = () => {
    const router = useRouter();
    const url = {
        pathname: 'https://access.line.me/oauth2/v2.1/authorize',
        query: { 
            ...router.query, 
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            state: CLIENT_ID,
            scope:'profile openid',
        }
      }
    const handleLoginByLine = ()=>{
        router.push(url,undefined,{shallow: true})
    }
    return (
        <PageWrapper metadata={{}}>
            <div className='auth-login-page'>
                <div className="login">
                    <div className='title-thank'>
                    contract<br/>
                    Thank You！
                    </div>
                    <div className='sub-title sub-title1'>
                        お申込み<br/>
                        ありがとうございます
                    </div>
                    <div className='sub-title'>
                        LINEログインしてください
                    </div>
                    <Button onClick={handleLoginByLine} className='btn-login-line' icon={<img src='../assets/icons/line-icon.png'/>} size='large'>Login By line</Button>
                </div>
            </div>
        </PageWrapper>
    );
}

Login.layout = CrmLayout.AUTH;