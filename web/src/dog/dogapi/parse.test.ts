import { parseTemperaments } from './parse'

const temperamentExamples = [
  'Aloof, Clownish, Dignified, Independent, Happy',
  'Outgoing, Friendly, Alert, Confident, Intelligent, Courageous',
]
const temperamentAnswers = [
  ['Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy'],
  ['Outgoing', 'Friendly', 'Alert', 'Confident', 'Intelligent', 'Courageous'],
]

describe('temperament parse test', () => {
  test('temperament parse test', () => {
    temperamentExamples.forEach((temperamentExample, i) => {
      expect(parseTemperaments(temperamentExample)).toStrictEqual(
        temperamentAnswers[i],
      )
    })
  })
})
