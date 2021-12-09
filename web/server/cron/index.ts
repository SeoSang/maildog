import caxios from '@/server/cron/caxios'
import { CronAddParam } from '@/server/cron/type'

export const addCron = async (param: CronAddParam): Promise<any> => {
  try {
    const res = await caxios.get('/add', { params: param })
    return res
  } catch (e) {
    console.error(e)
    return false
  }
}
