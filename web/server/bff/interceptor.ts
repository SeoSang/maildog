import { AxiosRequestConfig } from 'axios'

export const requestInterceptor = (config: AxiosRequestConfig) => {
  config.headers['authorization'] = process.env.AUTHORIZATION
}
