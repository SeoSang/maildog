import fs from 'fs'
import path from 'path'

import { parseBreedDataToDictionary, parseTemperaments } from '../parse'
import breedsJSON from '../../../db/json/breeds.json'
import { Breed } from '../breed'

const temperamentExamples = [
  'Aloof, Clownish, Dignified, Independent, Happy',
  'Outgoing, Friendly, Alert, Confident, Intelligent, Courageous',
]
const temperamentAnswers = [
  ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy'],
  ['Outgoing', 'Friendly', 'Alert', 'Confident', 'Intelligent', 'Courageous'],
]

test('json import test', () => {
  console.log(breedsJSON)
})
test('temperament parse test', () => {
  temperamentExamples.forEach((temperamentExample, i) => {
    expect(parseTemperaments(temperamentExample)).toStrictEqual(
      temperamentAnswers[i],
    )
  })
})
test('parse local breeds json to id-name Dictionary', async () => {
  const breeds = breedsJSON.map((b) => new Breed(b))
  const idToNameBreeds = parseBreedDataToDictionary(breeds)
  fs.writeFileSync(
    path.resolve(__dirname, '../../db/json/idToNameBreeds.json'),
    JSON.stringify(idToNameBreeds),
  )

  const resultJSON = JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../db/json/idToNameBreeds.json'),
      )
      .toString(),
  )
  console.log(idToNameBreeds[1])
  expect(idToNameBreeds[1] === resultJSON[1]).toBeTruthy()
})

test('parse local breeds json to name-id Dictionary', async () => {
  const breeds = breedsJSON.map((b) => new Breed(b))

  const nameToIdBreeds = parseBreedDataToDictionary(breeds, false)
  fs.writeFileSync(
    path.resolve(__dirname, '../../db/json/nameToIdBreeds.json'),
    JSON.stringify(nameToIdBreeds),
  )

  const resultJSON = JSON.parse(
    fs
      .readFileSync(
        path.resolve(__dirname, '../../db/json/nameToIdBreeds.json'),
      )
      .toString(),
  )
  const testBreed = 'Akita'
  console.log(nameToIdBreeds[testBreed])
  expect(nameToIdBreeds[testBreed] === resultJSON[testBreed]).toBeTruthy()
})

// FIXME : https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript
