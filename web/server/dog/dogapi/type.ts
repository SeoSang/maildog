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

export interface Breed {
  id: string
  name: string
  temperament: string
  life_span: string
  alt_names: string
  wikipedia_url: string
  origin: string
  weight: Weight
  country_code: string
  height: Height
}

export interface BreedForDB {
  id: string
  name: string
  temperament: string
  life_span: string
  alt_names: string
  wikipedia_url: string
  origin: string
  weight_imperial: string
  weight_metric: string
  country_code: string
  height_imperial: string
  height_metric: string
}
