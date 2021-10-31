import { userRepository } from '../user'

const DUMMY_USER = {
  email: 'dummy@naver.com',
  password: 'password',
  name: '항상 존재하는 더미유저',
  favorite: 'Akita',
  phone: '01000000000',
}

const DUMMY_USER_5 = {
  email: 'dummy5@naver.com',
  password: 'password',
  name: '수정용 더미유저',
  favorite: 'Akita',
  phone: '01000000005',
}

describe('user repository test', () => {
  test('insert dummy user', async () => {
    let [prevDummyUser] = await userRepository.find({ email: DUMMY_USER.email })
    if (!prevDummyUser) {
      prevDummyUser = await userRepository.create(DUMMY_USER)
    }

    expect(prevDummyUser?.name).toBe(DUMMY_USER.name)
    expect(prevDummyUser?.favorite).toBe(DUMMY_USER.favorite)
    expect(prevDummyUser?.phone).toBe(DUMMY_USER.phone)
  })
  test('created_at should not be null', async () => {
    await userRepository.delete('email', 'dummy2@naver.com')
    const result = await userRepository.create({
      email: 'dummy2@naver.com',
    })

    expect(result?.created_at).toBeTruthy()
  })
  test('insert many dummy user', async () => {
    await userRepository.delete('email', 'ddrrpg2@naver.com')
    await userRepository.delete('email', 'ddrrpg3@naver.com')
    const results = await userRepository.createMany([
      {
        email: 'ddrrpg2@naver.com',
        password: 'password',
        name: '서상테스트',
        favorite: 'Akita',
        phone: '01051094539',
      },
      {
        email: 'ddrrpg3@naver.com',
        password: 'password',
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

  test('whether to except password when find', async () => {
    const [user] = await userRepository.find({ email: DUMMY_USER.email })
    if (!user) {
      console.error('no dummy user for test')
      return
    }
    expect(user.password).toBeFalsy()
  })

  test('salted password validate test', async () => {
    const validateResult = await userRepository.validate(
      DUMMY_USER.email,
      DUMMY_USER.password,
    )
    expect(validateResult?.user?.email).toBe(DUMMY_USER.email)
  })

  test('user update test', async () => {
    await userRepository.delete('email', DUMMY_USER_5.email)
    const user = await userRepository.create(DUMMY_USER_5)
    const result = await userRepository.update(user.id, { name: '수정' })
    expect(result.name).toBe('수정')
  })
})
