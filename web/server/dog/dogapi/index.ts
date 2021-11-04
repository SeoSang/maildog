import path from 'path'

import { Breed } from './breed'
import daxios from './interceptor'
import { BreedParams } from './type'

export const getAllBreeds = async (): Promise<BreedParams[]> => {
  if (process.env.NODE_ENV === 'test') {
    const fs = require('fs')
    const rawBreeds = await fs.readFileSync(
      path.resolve(__dirname, '../../db/json/breeds.json'),
    )
    return JSON.parse(rawBreeds)
  }
  const res = await daxios.get('/breeds')
  return res.data
}

// TODO:  ID 바탕으로 Breed 반환
export const getBreedsById = async (): Promise<any> => {}

export const upsertAllBreedsInfoToDB = async () => {
  const breeds = await getAllBreeds()
  const promises = breeds.map((breed) => {
    return new Breed(breed).saveToDB()
  })
  await Promise.all(promises)
    .then((_) => {
      console.log('[INFO] upsert 성공')
    })
    .catch((err) => {
      console.log('[ERROR] upsert 중 에러 발생')
      console.log(err)
    })
}
