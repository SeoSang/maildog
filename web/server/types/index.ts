export type RepositoryResult<T = any> = {
  success: boolean
  message: string
  data?: T
}
