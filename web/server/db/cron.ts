import { CronCreateResultType } from '@/server/types/constant'

import { db } from './knex'
import { KnexRepository } from '.'
import { CronInfo } from '../types/cron'

export type CronCreateResult = {
  code: CronCreateResultType
  cron?: CronInfo
}

class CronRepository extends KnexRepository<CronInfo> {
  async find(item: Partial<CronInfo>): Promise<CronInfo[]> {
    const crons = await super.find(item)
    return crons?.length !== 0 ? crons : []
  }

  async findAll(limit: number): Promise<CronInfo[]> {
    const crons = await super.findAll(limit)
    return crons || []
  }

  async findById(id: number): Promise<CronInfo> {
    const cron = await super.findById(id)
    return cron
  }

  async add(item: Omit<CronInfo, 'id'>): Promise<CronCreateResult> {
    try {
      const prevData = await this.find({ userId: item.userId })
      if (prevData?.length > 0) {
        return { code: CronCreateResultType.EXISTED, cron: prevData[0] }
      }
      const cron = await super.create({
        ...item,
        expressions: '01  *  *  *  *',
      })
      return { code: CronCreateResultType.SUCCESS, cron }
    } catch (e) {
      return { code: CronCreateResultType.ERROR }
    }
  }
}

export const cronRepository = new CronRepository(db, 'crons')
