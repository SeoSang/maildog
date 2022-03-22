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

export const mapErrorResult = (e: any, msg?: string) => {
  return (
    e.response?.data ?? {
      success: false,
      message:
        msg ?? 'A server error has occurred. Please contact the operator.',
    }
  )
}
