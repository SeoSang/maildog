import { SubscribeBreedInfo } from '@/server/types/subscribe'

import { Breed } from './breed'

export const parseTemperaments = (temperament: string): string[] => {
  const result = temperament.split(',').map((temper) => temper.trim())
  return result
}

type Dictionary = {
  [id: string]: string
}

export const parseBreedDataToDictionary = (
  breed: (Breed | SubscribeBreedInfo)[],
  idToName = true,
): Dictionary => {
  if (idToName) {
    return breed.reduce((prev, breed) => {
      return Object.assign(prev, { [breed.id]: breed.name })
    }, {})
  }
  return breed.reduce((prev, breed) => {
    return Object.assign(prev, { [breed.name]: breed.id })
  }, {})
}
