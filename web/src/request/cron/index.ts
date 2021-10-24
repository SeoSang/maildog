import beAxios from '../../utils/axios'

export type CronInfo = {}

export const registerCron = async ({
  email,
  userId,
  breedIds,
}: {
  email: string
  userId: number
  breedIds: number[]
}): Promise<CronInfo> => {
  try {
    const result = await beAxios.post(`/user/${userId}/cron`, {
      breedIds,
      email,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const updateCron = async ({
  cronId,
  breedIds,
}: {
  cronId: number
  breedIds: number[]
}): Promise<CronInfo> => {
  try {
    const result = await beAxios.put(`/cron/${cronId}`, {
      breedIds,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
