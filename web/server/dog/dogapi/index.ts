import { Breed } from './breed'
import daxios from './interceptor'
import { BreedParams } from './type'

export const getAllBreeds = async (): Promise<BreedParams[]> => {
  const res = await daxios.get('/breeds')
  return res.data
}

export const upsertAllBreedsInfoToDB = async () => {
  const breeds = await getAllBreeds()
  const promises = new Array<Promise<void>>(breeds.length)
  breeds.forEach((breed) => {
    const breedClass = new Breed(breed)
    promises.push(breedClass.saveToDB())
  })
  Promise.all(promises)
    .then((values) => {
      console.log(values)
    })
    .catch((err) => {
      console.log(err)
    })
}
