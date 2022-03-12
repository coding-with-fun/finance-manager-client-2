const { default: axios } = require("axios");

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("auth_token");
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
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export const request = async ({
    url,
    method = "GET",
    params,
    body,
    headers,
}) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1";
    const res = await axios.request({
        url: BASE_URL + url,
        method,
        params,
        data: body,
        headers,
    });

    return res;
};
