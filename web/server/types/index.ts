export type BeAxiosResult<T = any> = {
  success: boolean
  message: string
  data?: T
}
