import { upsert } from '../../db/breed'
import { BreedParams, BreedForDBParams, Weight, Height } from './type'
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

  constructor(breed: BreedForDBParams | BreedParams) {
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
    this.weight = isDBBreed(breed)
      ? {
          imperial: breed.weight_imperial,
          metric: breed.weight_metric,
        }
      : breed.weight
    this.height = isDBBreed(breed)
      ? {
          imperial: breed.height_imperial,
          metric: breed.height_metric,
        }
      : breed.height
  }

  async saveToDB() {
    const targetBreed: any = {
      ...this,
      weight_imperial: this.weight?.imperial,
      weight_metric: this.weight?.metric,
      height_imperial: this.height?.imperial,
      height_metric: this.height?.metric,
    }
    delete targetBreed?.weight
    delete targetBreed?.height
    return upsert(targetBreed)
  }
}

function isDBBreed(
  breed: BreedForDBParams | BreedParams,
): breed is BreedForDBParams {
  return (breed as BreedParams)?.weight === undefined
}
