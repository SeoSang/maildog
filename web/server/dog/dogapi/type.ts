interface Weight {
  imperial: string
  metric: string
}

interface Height {
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
