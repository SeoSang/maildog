import axios, { AxiosRequestConfig } from 'axios'

import { isProduction } from '@/src/utils/index'

const API_KEY_BEAXIOS = process.env.NEXT_PUBLIC_API_KEY_BEAXIOS
const url = isProduction ? 'http://13.52.20.4' : 'http://localhost:3000'

const beAxios = axios.create({
  baseURL: `${url}/api`,
  timeout: 20000,
  headers: { 'x-api-key': API_KEY_BEAXIOS },
  withCredentials: true,
})

const requestInterceptor = (config: AxiosRequestConfig) => {
  // config.headers['x-api-key'] = API_KEY_BEAXIOS
  return config
}

beAxios.interceptors.request.use(requestInterceptor, function (error) {
  return Promise.reject(error)
})

export default beAxios
