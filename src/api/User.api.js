import request from "../config/AxiosInterceptor";

const BASE_URL = "/user";

export const FetchUserDetails_API = () => {
    return request({
        url: BASE_URL + "/",
    });
};
