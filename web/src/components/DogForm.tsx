import { JustifiedGrid } from '@egjs/react-grid'
import { Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import beAxios from 'src/utils/axios'
import { Breed } from 'server/dog/dogapi/breed'

const DogForm = () => {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<Breed[]>([])

  const getAllBreedsData = async () => {
    setLoading(true)
    const res = await beAxios('/dog')
    console.log(res.data)
    setBreeds(res.data.breeds)
    setLoading(false)
    return res.data
  }
  console.log(breeds)

  useEffect(() => {
    getAllBreedsData()
  }, [])

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }

  return (
    <div>
      <JustifiedGrid
        className="container"
        gap={5}
        defaultDirection={'end'}
        columnRange={[1, 8]}
        rowRange={0}
        sizeRange={[100, 300]}
        isCroppedSize={false}
        displayedRow={-1}>
        {breeds
          ?.slice(0, 100)
          .filter((breed) => breed.image?.url)
          .map((breed, i) => (
            <div
              className={'image'}
              key={`breed_${breed.id}`}
              data-grid-content-offset="40">
              <img
                src={breed.image?.url}
                style={{ width: '100%' }}
                alt={`image${i}`}
              />
              <Text fontSize={'sm'}>{breed.name}</Text>
              {/* {i} */}
            </div>
          ))}
      </JustifiedGrid>
    </div>
  )
}

export default DogForm
