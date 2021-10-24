import beAxios from '../../utils/axios'

export type UserInfo = {}

export const registerUser = async ({
  email,
  ...etc
}: {
  email: string
}): Promise<UserInfo> => {
  try {
    const result = await beAxios.post(`/user`, {
      email,
      ...etc,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const updateUser = async ({
  email,
  userId,
  ...etc
}: {
  email: string
  userId: number
}): Promise<UserInfo> => {
  try {
    const result = await beAxios.put(`/user/${userId}`, {
      email,
      ...etc,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
