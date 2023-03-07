import { Http } from "@app/services/http";
import { API_WEB_URL } from "@app/const/common.const";

interface GetAccessTokenParams {
    code: string | any;
}

interface GetAccessTokenData {
    access_token:string,
    token_type:string,
    refresh_token:string,
    expires_in:string,
    scope:string,
}

export const getToken = (params: GetAccessTokenParams) => {
    return Http.request<GetAccessTokenData>({
        url: `${API_WEB_URL}/user/auth/login`,
        method: 'POST',
        body: params,
        // headers: headers
    })
}