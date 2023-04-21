import { getUser } from '@app/api/auth/get-user-info';
import { CLIENT_ID, REDIRECT_URI } from '@app/const/common.const';
import { ProjectLayout, PageWrapper } from '@app/kit/layout';
import { saveUserCredential } from '@app/services/auth';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export const Login = () => {
	const router = useRouter();

	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			await saveUserCredential(codeResponse.access_token);
			await router.push('/');
		},
		onError: (error) => console.log('Login Failed:', error)
	});

	return (
		<PageWrapper metadata={{}}>
			<div className='auth-login-page'>
				<div className="login">
					<h2>React Google Login</h2>
					<br />
					<br />
					<button onClick={() => login()} className='btn-login'>Sign in with Google 🚀 </button>
				</div>
			</div>
		</PageWrapper>
	);
}

Login.layout = ProjectLayout.AUTH;