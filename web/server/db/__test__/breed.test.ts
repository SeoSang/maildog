import { breedRepository } from '../breed'

describe('breed test', () => {
  test('find breeds 10', async () => {
    const result = await breedRepository.findAll(10)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  test('find breed by id', async () => {
    const result = await breedRepository.findById('1')
    expect(result.name).toBe('Affenpinscher')
    const result2 = await breedRepository.findById('6')
    expect(result2.name).toBe('Akita')

    // 파싱 잘 됐는지 테스트
    expect(typeof result.image?.url === 'string').toBeTruthy()
  })
})
