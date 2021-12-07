import axios from 'axios'
import { requestInterceptor } from '@/server/bff/interceptor'

const bffAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVICE_URL}/api`,
  timeout: 15000,
  withCredentials: true,
})

bffAxios.interceptors.request.use(requestInterceptor, (err) =>
  Promise.reject(err),
)

export default bffAxios
