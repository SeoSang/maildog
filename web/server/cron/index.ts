import caxios from '@/server/cron/caxios'
import { CronAddParam } from '@/server/cron/type'
import { mapErrorResult } from '@/server/db/util'
import { BeAxiosResult } from '@/server/types'
import { SubscribeBreedInfo } from '@/server/types/subscribe'
import beAxios from '@/src/utils/axios'

export const addCron = async (param: CronAddParam): Promise<any> => {
  try {
    const res = await caxios.get('/add', { params: param })
    return res
  } catch (e) {
    console.error(e)
    return false
  }
}
export const loadUserCronBreeds = async (
  userId: number,
): Promise<BeAxiosResult<SubscribeBreedInfo[]>> => {
  try {
    const res = await beAxios.get(`/cron/user/${userId}`)
    return {
      success: true,
      message: 'Load user cron success.',
      data: res.data.cron,
    }
  } catch (e) {
    console.error(e)
    return mapErrorResult(e)
  }
}
