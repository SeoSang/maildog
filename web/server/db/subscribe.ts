import { SubscribeInfo } from '@/server/types/subscribe'

import { db } from './knex'
import { KnexRepository } from '.'

class SubscribeRepository extends KnexRepository<SubscribeInfo> {
  async find(item: Partial<SubscribeInfo>): Promise<SubscribeInfo[]> {
    const subscribes = await super.find(item)
    return subscribes?.length !== 0 ? subscribes : []
  }

  async findAll(limit: number): Promise<SubscribeInfo[]> {
    const subscribes = await super.findAll(limit)
    return subscribes || []
  }

  async findById(id: number): Promise<SubscribeInfo> {
    const subscribe = await super.findById(id)
    return subscribe
  }
}

export const subscribeRepository = new SubscribeRepository(db, 'subscribes')
