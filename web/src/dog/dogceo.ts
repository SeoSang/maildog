import axios from 'axios'

interface DogApiImageResult {
  imgSrc?: string[]
  status: string
}

const getRandomDogImage = async (count = 1): Promise<DogApiImageResult> => {
  try {
    const res = await axios.get(
      `https://dog.ceo/api/breeds/image/random/${count}`,
    )
    return {
      imgSrc: res?.data?.message,
      status: 'success',
    }
  } catch (err) {
    return {
      status: 'getRandomDogImage 실패',
    }
  }
}

const getAllBreeds = async () => {
  try {
    const res = await axios.get('https://dog.ceo/api/breeds/list/all')
    return res.data
  } catch (err) {
    return {
      status: 'getRandomDogImage 실패',
    }
  }
}

getRandomDogImage().then((res) => console.log(res))
getAllBreeds().then((res) => console.log(res))
