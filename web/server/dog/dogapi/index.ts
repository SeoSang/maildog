import path from 'path'

import idToNameBreedsJSON from '../../db/json/idToNameBreeds.json'
import { Breed } from './breed'
import daxios from './daxios'
import { BreedImageParam, BreedParams } from './type'

export const getAllBreeds = async (): Promise<BreedParams[]> => {
  if (process.env.NODE_ENV === 'test') {
    const fs = require('fs')
    const rawBreeds = await fs.readFileSync(
      path.resolve(__dirname, '../../db/json/breeds.json'),
    )
    return JSON.parse(rawBreeds)
  }
  try {
    const res = await daxios.get('/breeds')
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getBreedNameById = (id: number | string): string => {
  const keyId = typeof id === 'number' ? id.toString() : id
  if (parseInt(keyId) > Object.keys(idToNameBreedsJSON).length) {
    return ''
  }
  return (idToNameBreedsJSON as any)[keyId]
}

export const getBreedImageUrlsById = async (
  imageParam: BreedImageParam,
): Promise<string[]> => {
  try {
    const res = await daxios.get('/images/search', {
      params: imageParam,
    })
    return res.data.map((breedData: any) => breedData['url'])
  } catch (e) {
    console.error(e)
    return []
  }
}

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
