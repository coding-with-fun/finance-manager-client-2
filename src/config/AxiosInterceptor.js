import axios from "axios";
import { GetUserToken, SetUserToken } from "../utils/HandleUserToken";
import { BACKEND_URL } from "../utils/constants";
import { Toastify } from "../utils/Toastify";
import _ from "lodash";

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = GetUserToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
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
        response = response.data;

        const message = _.get(response, "message");
        const type = response.success ? "success" : "error";

        Toastify({
            message,
            type,
        });

        if (response.success) {
            console.log(response);
            SetUserToken(_.get(response, "data.token"));
            return response;
        }

        throw response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error.response);

        const commonStatusCodes = [404, 500];
        let message = _.get(error, "response.data.message");
        if (commonStatusCodes.includes(_.get(error, "response.status"))) {
            message = "Internal server error";
        }
        Toastify({
            message,
        });

        return Promise.reject(error.response);
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
