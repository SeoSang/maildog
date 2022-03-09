import { CronInfo } from '@/server/types/cron'
import { BeAxiosResult } from '@/server/types'
import { Schedule, Service } from '@/server/types/constant'
import { mapErrorResult } from '@/server/db/util'

import beAxios from '../../utils/axios'

export type RegisterCronProps = {
  type: Service
  userId: number
  count: number
  schedule: Schedule
  breedIdList: number[]
}

export const registerCron = async (
  props: RegisterCronProps,
): Promise<BeAxiosResult> => {
  try {
    const result = await beAxios.post(`/cron`, props)
    return result?.data
  } catch (e: any) {
    return mapErrorResult(e)
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
    return mapErrorResult(e)
  }
}
