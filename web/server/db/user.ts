import { db } from './knex'
import { KnexRepository } from '.'
import { UserInfo } from '../types/user'

class UserRepository extends KnexRepository<UserInfo> {
  // async find(item: Partial<Breed>): Promise<Breed[]> {
  //   const users = await super.find(item)
  //   return users.map((breed) => new Breed(breed))
  // }
  // async findAll(limit: number): Promise<Breed[]> {
  //   const users = await super.findAll(limit)
  //   return users.map((breed) => new Breed(breed))
  // }
  // async findById(id: string): Promise<Breed> {
  //   const breed = await super.findById(id)
  //   return new Breed(breed)
  // }
  // async create(item: Omit<Breed, 'id'>): Promise<Breed> {
  //   return new Breed(await super.create(item))
  // }
}

export const userRepository = new UserRepository(db, 'users')
