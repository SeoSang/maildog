import axios from 'axios'

const caxios = axios.create({
  baseURL: 'https://www.easycron.com/rest',
  timeout: 2000,
})

caxios.interceptors.request.use(
  function (config) {
    config.params = { token: process.env.API_KEY_CRON }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default caxios
