import { DogImage, Height, Weight } from '@/server/dog/dogapi/type'
import { Schedule, Service } from '@/server/types/constant'

export type SubscribeInfo = {
  id: number
  cronId: number
  breedId: number
  valid?: boolean
  created_at?: string
  updated_at?: string
}

export type SubscribeExtendInfo = SubscribeInfo & {
  userId: number
  expressions: string
  schedule: Schedule
  type: Service
  count: number
  priority: number
  valid: number
  cronId: number
  name: string
  temperament: string
  life_span: string
  alt_names: string
  wikipedia_url: string
  origin: string
  country_code: string
  bred_for: string
  breed_group: string
  weight: Weight
  height: Height
  image: DogImage
}
