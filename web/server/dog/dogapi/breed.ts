import { upsert } from '../../db/breed'
import { BreedParams, BreedForDBParams, Weight, Height } from './type'
export class Breed implements BreedParams {
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

  constructor(breed: BreedForDBParams | BreedParams) {
    this.id = breed.id
    this.name = breed.name
    this.alt_names = breed.alt_names
    this.temperament = breed.temperament
    this.life_span = breed.life_span
    this.origin = breed.origin
    this.wikipedia_url = breed.wikipedia_url
    this.country_code = breed.country_code

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
    upsert({
      ...this,
      weight_imperial: this.weight.imperial,
      weight_metric: this.weight.metric,
      height_imperial: this.height.imperial,
      height_metric: this.height.metric,
    })
  }
}

function isDBBreed(
  breed: BreedForDBParams | BreedParams,
): breed is BreedForDBParams {
  return (breed as BreedParams)?.weight === undefined
}
