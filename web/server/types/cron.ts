import { Schedule, Service } from '@/server/types/constant'

export type CronInfo = {
  id: number
  userId?: number
  type?: Service
  schedule?: Schedule
  count?: number
  expressions?: string
  valid?: boolean
  created_at?: string
  updated_at?: string
}
