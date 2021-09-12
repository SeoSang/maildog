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

export interface BreedParams {
  id: number
  name: string
  temperament: string
  life_span: string
  origin: string
  weight: Weight
  height: Height
  alt_names?: string
  country_code?: string
  wikipedia_url?: string
  bred_for?: string
  breed_group?: string
  image?: DogImage
}

export interface BreedForDBParams {
  id: number
  name: string
  temperament: string
  life_span: string
  origin: string
  weight_imperial: string
  weight_metric: string
  height_imperial: string
  height_metric: string
  alt_names?: string
  country_code?: string
  wikipedia_url?: string
  bred_for?: string
  breed_group?: string
  image?: string
}
