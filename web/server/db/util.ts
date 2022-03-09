import { RepositoryResult } from '@/server/types'

export const mapSuccessResult = (
  data: any,
  message?: string,
): RepositoryResult => {
  return {
    data,
    success: true,
    message: message ?? '성공!',
  }
}
