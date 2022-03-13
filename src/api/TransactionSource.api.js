import request from "../config/AxiosInterceptor";

const BASE_URL = "/transaction-source";

export const AddTransactionSource_API = (body) => {
    return request({
        url: BASE_URL + "/add",
        method: "POST",
        body,
    });
};

export const FetchTransactionSources_API = (params) => {
    return request({
        url: BASE_URL + "/fetch",
        method: "GET",
        params,
    });
};
