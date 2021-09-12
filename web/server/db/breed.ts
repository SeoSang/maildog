import { BreedForDBParams } from 'server/dog/dogapi/type'

import { db } from './knex'

export const upsert = async (BreedForDB: BreedForDBParams) => {
  const result = await db('breeds').insert(BreedForDB).onConflict('id').merge()
  return result
}

export const find = async () => {
  return db('breeds')
}

export const findById = async (id: string) => {
  return db('breeds').where({ id })
}
