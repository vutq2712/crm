import { getUser } from '@app/api/auth/get-user-info';
import { CLIENT_ID, REDIRECT_URI } from '@app/const/common.const';
import { ProjectLayout, PageWrapper } from '@app/kit/layout';
import { saveUserCredential } from '@app/services/auth';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ReactFacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login";
import { useForm } from 'react-hook-form';

export const Login = () => {
	const router = useRouter();
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = data => console.log(data);

	const [loginFb, setLoginFb] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  // console.log(watch("username")); 

	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			await saveUserCredential(codeResponse.access_token);
			await router.push('/');
		},
		onError: (error) => console.log('Login Failed:', error)
	});


	const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLoginFb(false);
      return false;
    }
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLoginFb(true);
    } else {
      setLoginFb(false);
    }
  };

	return (
		<PageWrapper metadata={{}}>
			<div className='auth-login-page'>
				<div className="background">
					<div className="shape"></div>
					<div className="shape"></div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
						<h3>Login Here</h3>

						<label>Username</label>
						<input type="text" placeholder="Email or Phone" id="username" {...register("username")}/>

						<label>Password</label>
						<input type="password" placeholder="Password" id="password" {...register("password")}/>

						<button className='btn-login' type='submit'>Log In</button>
						<div className="social">
							<img src="/assets/icons/icon-google.svg" alt="" onClick={() => login()}/>
							{/* <img src="/assets/icons/icon-facebook.svg" alt="" /> */}
							<FacebookLogin
								appId={process.env.FACEBOOK_APP_ID}
								autoLoad={false}
								fields="name,email,picture"
								scope="public_profile,email,user_friends"
								callback={responseFacebook}
								icon="fa-facebook"
								textButton='Facebook'
							/>
						</div>
				</form>
			</div>
		</PageWrapper>
	);
}

Login.layout = ProjectLayout.AUTH;