import axios from "axios";
import React from "react";
import axiosRetry from "axios-retry";
import StatusCodes from "./StatusCodes";
import { store } from "../redux/store";
import { logoutSuccess } from "../redux/reducer/userSlice";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosRetry(instance, {
  retries: 3,
  retryCondition: (error) => {
    return error?.response?.data?.EC === StatusCodes.ACCESS_TOKEN_EXPIRED; // access token hết hạn
  },
  retryDelay: (retryCount, error) => {
    return retryCount * 100;
  },
});

export const loadingBarRef = React.createRef();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
    // Do something before request is sent
    // Config header
    config.headers["User-Role"] = "admin";

    return config;
  },
  function (error) {
    // Do something with request error
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Refresh token hết hạn hoặc các trường hợp xác thực người dụng bị lỗi (khác lỗi access token hết hạn)
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.EC === StatusCodes.UNAUTHORIZED
    ) {
      store.dispatch(logoutSuccess()); // xóa bỏ thông tin người dùng lưu tại redux và yêu cầu login lại
      // window.location.href = "/login";
    }

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
