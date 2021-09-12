import { upsert } from 'server/db/breed'

import {
  Breed as BreedType,
  BreedForDB as BreedForDBType,
  Weight,
  Height,
} from './type'

export class BreedForDB implements BreedForDBType {
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

  constructor(breedDBObject: Breed) {
    this.id = breedDBObject.id
    this.name = breedDBObject.name
    this.alt_names = breedDBObject.alt_names
    this.temperament = breedDBObject.temperament
    this.life_span = breedDBObject.life_span
    this.origin = breedDBObject.origin
    this.wikipedia_url = breedDBObject.wikipedia_url
    this.country_code = breedDBObject.country_code
    this.weight_imperial = breedDBObject.weight.imperial
    this.weight_metric = breedDBObject.weight.metric
    this.height_imperial = breedDBObject.height.imperial
    this.height_metric = breedDBObject.height.metric
  }

  async saveToDB() {
    upsert(this)
  }
}

export class Breed implements BreedType {
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

  constructor(breedDBObject: BreedForDB) {
    this.id = breedDBObject.id
    this.name = breedDBObject.name
    this.alt_names = breedDBObject.alt_names
    this.temperament = breedDBObject.temperament
    this.life_span = breedDBObject.life_span
    this.origin = breedDBObject.origin
    this.wikipedia_url = breedDBObject.wikipedia_url
    this.country_code = breedDBObject.country_code
    this.weight = {
      imperial: breedDBObject.weight_imperial,
      metric: breedDBObject.weight_metric,
    }
    this.height = {
      imperial: breedDBObject.height_imperial,
      metric: breedDBObject.height_metric,
    }
  }

  async saveToDB() {
    upsert(new BreedForDB(this))
  }
}
