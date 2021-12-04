import { Knex } from 'knex'

export interface Weight {
  imperial: string
  metric: string
}

export interface Height {
  imperial: string
  metric: string
}

export interface DogImage {
  id: string
  height: number
  url: string
  width: number
}

export type JsonParam = 'weight' | 'height' | 'image'

export interface BreedParams {
  id: number
  name: string
  temperament?: string
  life_span?: string
  origin?: string
  weight?: Weight
  height?: Height
  alt_names?: string
  country_code?: string
  wikipedia_url?: string
  bred_for?: string
  breed_group?: string
  image?: DogImage
  created_at?: Knex.Raw | string
}

export interface BreedImageParam {
  size?: 'full' | 'med' | 'small' | 'thumb'
  order?: 'RANDOM' | 'ASC' | 'DESC'
  limit?: number
  page?: number
  breed_id: number
}

export interface BreedDBParams extends Omit<BreedParams, JsonParam> {
  weight: string
  height: string
  image?: string
}
