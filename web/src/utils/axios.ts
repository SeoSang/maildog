import axios from 'axios'

const beAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 2000,
  headers: { 'x-api-key': 'seosang' },
})

beAxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default beAxios
