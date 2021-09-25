import fs from 'fs'
import path from 'path'
import { parseBreedDataToDictionary, parseTemperaments } from './parse'

const temperamentExamples = [
  'Aloof, Clownish, Dignified, Independent, Happy',
  'Outgoing, Friendly, Alert, Confident, Intelligent, Courageous',
]
const temperamentAnswers = [
  ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy'],
  ['Outgoing', 'Friendly', 'Alert', 'Confident', 'Intelligent', 'Courageous'],
]

test('temperament parse test', () => {
  temperamentExamples.forEach((temperamentExample, i) => {
    expect(parseTemperaments(temperamentExample)).toStrictEqual(
      temperamentAnswers[i],
    )
  })
})
test('parse local breeds json to id-name Dictionary', async () => {
  const rawBreeds = fs.readFileSync(
    path.resolve(__dirname, '../../db/breeds.json'),
  )
  const breeds = JSON.parse(rawBreeds.toString())

  const idToNameBreeds = parseBreedDataToDictionary(breeds)
  fs.writeFileSync(
    path.resolve(__dirname, '../../db/idToNameBreeds.json'),
    JSON.stringify(idToNameBreeds),
  )

  const resultJSON = JSON.parse(
    fs
      .readFileSync(path.resolve(__dirname, '../../db/idToNameBreeds.json'))
      .toString(),
  )
  console.log(idToNameBreeds[1])
  expect(idToNameBreeds[1] === resultJSON[1])
})

test('parse local breeds json to name-id Dictionary', async () => {
  const rawBreeds = fs.readFileSync(
    path.resolve(__dirname, '../../db/breeds.json'),
  )
  const breeds = JSON.parse(rawBreeds.toString())

  const nameToIdBreeds = parseBreedDataToDictionary(breeds, false)
  fs.writeFileSync(
    path.resolve(__dirname, '../../db/nameToIdBreeds.json'),
    JSON.stringify(nameToIdBreeds),
  )

  const resultJSON = JSON.parse(
    fs
      .readFileSync(path.resolve(__dirname, '../../db/nameToIdBreeds.json'))
      .toString(),
  )
  const testBreed = 'Akita'
  console.log(nameToIdBreeds[testBreed])
  expect(nameToIdBreeds[testBreed] === resultJSON[testBreed])
})
