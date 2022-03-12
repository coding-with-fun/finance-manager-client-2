import axios from "axios";
import { GetUserToken } from "../utils/HandleUserToken";
import { BACKEND_URL } from "../utils/constants";

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = GetUserToken();
        config.headers["Authorization"] = "Bearer " + token;
        if (token) {
        }

        config.headers["Content-Type"] = "application/json";

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log(response);
        response = response.data;

        if (response.success) {
            return response;
        }

        return Promise.reject(response);
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        return Promise.reject(error);
    }
);

const request = async ({ url, method = "GET", params, body, headers }) => {
    const BASE_URL = BACKEND_URL + "/api/v1";

    const res = await axios.request({
        url: BASE_URL + url,
        method,
        params,
        data: body,
        headers,
    });

    return res;
};

export default request;
