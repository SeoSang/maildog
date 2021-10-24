import beAxios from '../../utils/axios'

export type CronInfo = {}

export const updateCron = async ({
  cronId,
  selectedBreeds,
}: {
  cronId: number
  selectedBreeds: string[]
}): Promise<CronInfo> => {
  try {
    const result = await beAxios.put(`/cron/${cronId}`, {
      selectedBreeds,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const registerCron = async ({
  email,
  userId,
  selectedBreeds,
}: {
  email: string
  userId: number
  selectedBreeds: string[]
}): Promise<CronInfo> => {
  try {
    const result = await beAxios.post(`/user/${userId}/cron`, {
      selectedBreeds,
      email,
    })
    return result?.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
