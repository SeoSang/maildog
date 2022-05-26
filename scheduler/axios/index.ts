import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config";

const API_KEY_BEAXIOS = process.env.API_KEY_BEAXIOS;

const beAxios = axios.create({
  baseURL: `${API_URL}`,
  timeout: 3000,
  headers: { "x-api-key": API_KEY_BEAXIOS },
  withCredentials: true,
});

const requestInterceptor = (config: AxiosRequestConfig) => {
  // config.headers['x-api-key'] = API_KEY_BEAXIOS
  return config;
};

beAxios.interceptors.request.use(requestInterceptor, function (error) {
  return Promise.reject(error);
});

export default beAxios;
