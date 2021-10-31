import { AxiosError } from 'axios'
import httpStatus from 'http-status'

export const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(
    email.match(mail_format) && email.match(mail_format)?.length !== 0,
  )
}

export const alertErrorMessage = (error: AxiosError): void => {
  if (error.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
    alert('Server Error occur!')
    return
  }
  alert(error.response?.data?.message ?? 'Unexpected Error occur!')
}
