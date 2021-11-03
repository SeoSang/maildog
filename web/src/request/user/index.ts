import { alertErrorMessage } from '@/src/utils'
import { UserInfo } from '@/server/types/user'

import beAxios from '../../utils/axios'

export const registerUser = async ({
  email,
  ...etc
}: {
  email: string
}): Promise<UserInfo | null> => {
  try {
    const result = await beAxios.post(`/user`, {
      email,
      ...etc,
    })
    return result?.data
  } catch (e: any) {
    alertErrorMessage(e)
    return null
  }
}

export const updateUser = async ({
  email,
  userId,
  ...etc
}: {
  email: string
  userId: number
}): Promise<UserInfo | null> => {
  try {
    const result = await beAxios.put(`/user/${userId}`, {
      email,
      ...etc,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return null
  }
}

export const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserInfo | null> => {
  try {
    const result = await beAxios.post(`/user`, {
      email: email.trim(),
      password: password.trim(),
    })
    return result?.data.user
  } catch (e: any) {
    alertErrorMessage(e)
    return null
  }
}

export const loadUser = async (userId: number): Promise<UserInfo | null> => {
  try {
    const result = await beAxios.get(`/user/${userId}`)
    return result?.data
  } catch (e: any) {
    alertErrorMessage(e)
    return null
  }
}
