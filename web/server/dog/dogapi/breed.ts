import { Knex } from 'knex'

import { BreedDBParams, BreedParams, DogImage, Height, Weight } from './type'

export class Breed implements BreedParams {
  id: number

  name: string

  temperament?: string

  life_span?: string

  origin?: string

  weight?: Weight

  height?: Height

  country_code?: string

  alt_names?: string

  wikipedia_url?: string

  bred_for?: string

  breed_group?: string

  image?: DogImage

  created_at?: Knex.Raw | string

  constructor(breed: BreedParams | BreedDBParams) {
    this.id = Number(breed.id)
    this.name = breed.name
    this.temperament = breed.temperament
    this.life_span = breed.life_span
    this.origin = breed.origin
    breed.created_at && (this.created_at = breed.created_at)
    breed.alt_names && (this.alt_names = breed.alt_names)
    breed.country_code && (this.country_code = breed.country_code)
    breed.wikipedia_url && (this.wikipedia_url = breed.wikipedia_url)
    breed.bred_for && (this.bred_for = breed.bred_for)
    breed.breed_group && (this.breed_group = breed.breed_group)
    breed.image &&
      (this.image = isDBBreed(breed) ? JSON.parse(breed.image) : breed.image)
    this.weight = isDBBreed(breed) ? JSON.parse(breed.weight) : breed.weight
    this.height = isDBBreed(breed) ? JSON.parse(breed.height) : breed.height
  }
}

function isDBBreed(breed: BreedParams | BreedDBParams): breed is BreedDBParams {
  return typeof breed.image === 'string'
}
