import { userRepository } from '../user'

describe('user repository test', () => {
  test('insert dummy user', async () => {
    await userRepository.delete('name', '서상테스트')
    const result = await userRepository.create({
      email: 'ddrrpg@naver.com',
      name: '서상테스트',
      favorite: 'Akita',
      phone: '01051094539',
    })

    expect(result?.name).toBe('서상테스트')
  })
  test('created_at should not be null', async () => {
    await userRepository.delete('email', 'dummy@naver.com')
    const result = await userRepository.create({
      email: 'dummy@naver.com',
    })

    expect(result?.created_at).toBeTruthy()
  })
  test('insert many dummy user', async () => {
    await userRepository.delete('email', 'ddrrpg2@naver.com')
    await userRepository.delete('email', 'ddrrpg3@naver.com')
    const results = await userRepository.createMany([
      {
        email: 'ddrrpg2@naver.com',
        name: '서상테스트',
        favorite: 'Akita',
        phone: '01051094539',
      },
      {
        email: 'ddrrpg3@naver.com',
        name: '서상테스트',
        favorite: 'Akita',
        phone: '01051094539',
      },
    ])
    expect(results).toBeTruthy()
    const user2 = await userRepository.find({ email: 'ddrrpg2@naver.com' })
    expect(user2?.[0].name).toBe('서상테스트')
  })

  test('find and remove all dummy users', async () => {
    const findResult = await userRepository.find({ name: '서상테스트' })
    const results = await Promise.all([
      userRepository.delete('email', 'ddrrpg@naver.com'),
      userRepository.delete('email', 'ddrrpg2@naver.com'),
      userRepository.delete('email', 'ddrrpg3@naver.com'),
    ])
    expect(results.every((val) => val === 1 || val === 0)).toBeTruthy()
  })
})
