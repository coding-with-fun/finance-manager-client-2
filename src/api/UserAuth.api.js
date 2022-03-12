import request from "../config/AxiosInterceptor";

const BASE_URL = "/auth";

export const UserSignIn_API = (data) => {
    return request({
        url: BASE_URL + "/signin",
        method: "POST",
        body: data,
    });
};

export const UserSignUp_API = (data) => {
    return request({
        url: BASE_URL + "/signup",
        method: "POST",
        body: data,
    });
};
