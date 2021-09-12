import { BreedForDB } from 'server/dog/dogapi/breed'

import { db } from './knex'

export const upsert = async (BreedForDB: BreedForDB) => {
  const prev = await db('breeds').where({ id: BreedForDB.id })
  return prev
    ? db('breeds').where({ id: BreedForDB.id }).update(BreedForDB)
    : db('breeds').insert(BreedForDB)
}

export const find = async () => {
  return db('breeds')
}

export const findById = async (id: string) => {
  return db('breeds').where({ id })
}
