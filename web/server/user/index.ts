import { mapErrorResult } from '@/server/db/util'
import { BeAxiosResult } from '@/server/types'
import { UserInfo } from '@/server/types/user'
import beAxios from '@/src/utils/axios'

export type RegisterParmas = {
  email: string
  name: string
  phone: string
  favorite: string
  password: string
}

export const register = async (
  params: RegisterParmas,
): Promise<BeAxiosResult<UserInfo>> => {
  try {
    const res = await beAxios.post('/user/register', params)
    return {
      success: true,
      message: 'register success.',
      data: res.data.user,
    }
  } catch (e) {
    console.error(e)
    return mapErrorResult(e)
  }
}
