/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from "axios";
import { ReactChild, ReactFragment, ReactPortal, ReactNode } from "react";
import { toast, ToastContentProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Error {
  message:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | ((props: ToastContentProps<{}>) => ReactNode)
    | null
    | undefined;
}

const baseURL = process.env.REACT_APP_API_URL;
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (!token) {
      return config;
    }
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const notify = (error?: Error | undefined) => {
  if (error) {
    toast.error(error.message, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success("Success!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

instance.interceptors.response.use(
  (response) => {
    notify();
    return response;
  },
  (error) => {
    notify(error);
    return Promise.reject(error);
  }
);

export default instance;
