import { BeAxiosResult } from '@/server/types'

export const mapSuccessResult = (
  data: any,
  message?: string,
): BeAxiosResult => {
  return {
    data,
    success: true,
    message: message ?? '성공!',
  }
}

export const mapErrorResult = (e: any) => {
  return (
    e.response?.data ?? {
      success: false,
      message: 'A server error has occurred. Please contact the operator.',
    }
  )
}
