import { Http } from "@app/services/http";
import { API_WEB_URL } from "@app/const/common.const";

interface GetAccessTokenParams {
  code: string | any;
}

interface GetAccessTokenData {
  access_token: string,
  token_type: string,
  refresh_token: string,
  expires_in: string,
  scope: string,
}

export const getUser = (token: string) => {
  return Http.request({
    url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    method: 'GET',
    // headers: headers
  })
}