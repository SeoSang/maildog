import daxios from './interceptor'
import { Breed } from './type'

export const getAllBreeds = async (): Promise<Breed[]> => {
  const res = await daxios.get('/breeds')
  return res.data
}
