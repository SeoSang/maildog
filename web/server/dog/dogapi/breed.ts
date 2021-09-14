import { upsert } from '../../db/breed'
import { BreedParams, Weight, Height, DogImage, BreedDBParams } from './type'
export class Breed implements BreedParams {
  id: number

  name: string

  temperament: string

  life_span: string

  origin: string

  weight: Weight

  height: Height

  country_code?: string

  alt_names?: string

  wikipedia_url?: string

  bred_for?: string

  breed_group?: string

  image?: DogImage

  constructor(breed: BreedParams | BreedDBParams) {
    this.id = Number(breed.id)
    this.name = breed.name
    this.temperament = breed.temperament
    this.life_span = breed.life_span
    this.origin = breed.origin
    if (breed.alt_names) {
      this.alt_names = breed.alt_names
    }
    if (breed.country_code) {
      this.country_code = breed.country_code
    }
    if (breed.wikipedia_url) {
      this.wikipedia_url = breed.wikipedia_url
    }
    if (breed.bred_for) {
      this.bred_for = breed.bred_for
    }
    if (breed.breed_group) {
      this.breed_group = breed.breed_group
    }
    if (breed.image) {
      this.image = isDBBreed(breed) ? JSON.parse(breed.image) : breed.image
    }
    this.weight = isDBBreed(breed) ? JSON.parse(breed.weight) : breed.weight
    this.height = isDBBreed(breed) ? JSON.parse(breed.height) : breed.height
  }

  async saveToDB() {
    const targetBreed: BreedDBParams = {
      ...this,
      weight: JSON.stringify(this.weight),
      height: JSON.stringify(this.height),
      image: JSON.stringify(this.image),
    }
    return upsert(targetBreed)
  }
}

function isDBBreed(breed: BreedParams | BreedDBParams): breed is BreedDBParams {
  return typeof breed.image === 'string'
}
