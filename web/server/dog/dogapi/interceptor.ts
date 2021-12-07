import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const daxios = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  timeout: 2000,
  headers: { 'x-api-key': process.env.API_KEY_DOGAPI },
})

daxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default daxios
