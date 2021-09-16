import { BreedDBParams } from 'server/dog/dogapi/type'

import { Breed } from '../dog/dogapi/breed'
import { db } from './knex'

export const upsert = async (BreedForDB: BreedDBParams) => {
  const result = await db('breeds').insert(BreedForDB).onConflict('id').merge()
  return result
}

export const findAll = async () => {
  const breeds = await db('breeds')
  const parsedBreeds = breeds.map((breed) => new Breed(breed))
  return parsedBreeds
}

export const findById = async (id: string) => {
  return db('breeds').where({ id })
}
