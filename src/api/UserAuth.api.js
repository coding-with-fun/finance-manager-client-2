import request from "../config/AxiosInterceptor";

let BASE_URL = "/auth";

export const UserSignIn_API = (data) => {
    return request({
        url: BASE_URL + "/signin",
        method: "POST",
        body: data,
    });
};