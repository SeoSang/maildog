import { BreedDBParams } from 'server/dog/dogapi/type'

import { KnexRepository } from '.'
import { Breed } from '../dog/dogapi/breed'
import { db } from './knex'

class BreedRepository extends KnexRepository<Breed> {
  async find(item: Partial<Breed>): Promise<Breed[]> {
    const breeds = await super.find(item)
    return breeds.map((breed) => new Breed(breed))
  }

  async findAll(limit: number): Promise<Breed[]> {
    const breeds = await super.findAll(limit)
    return breeds.map((breed) => new Breed(breed))
  }

  async findById(id: string): Promise<Breed> {
    const breed = await super.findById(id)
    return new Breed(breed)
  }

  async create(item: Omit<Breed, 'id'>): Promise<Breed> {
    return new Breed(await super.create(item))
  }
}

export const breedRepository = new BreedRepository(db, 'breeds')

export const upsert = async (BreedForDB: BreedDBParams) => {
  const result = await db('breeds').insert(BreedForDB).onConflict('id').merge()
  return result
}

export const findAll = async () => {
  const breeds = await db('breeds')
  const parsedBreeds = breeds.map((breed) => new Breed(breed))
  return parsedBreeds
}
