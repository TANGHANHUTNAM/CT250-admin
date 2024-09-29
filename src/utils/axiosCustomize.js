import axios from "axios";
import React from "react";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
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
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
