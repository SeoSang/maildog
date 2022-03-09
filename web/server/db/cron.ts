import { db } from './knex'
import { KnexRepository } from '.'
import { CronInfo } from '../types/cron'

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

  async create(item: Omit<CronInfo, 'id'>): Promise<CronInfo> {
    const prevData = await this.find({ userId: item.userId })
    if (prevData?.length > 0) {
      return prevData[0]
    }
    const cron = await super.create(item)
    return cron
  }
}

export const userRepository = new CronRepository(db, 'crons')
