import { JustifiedGrid } from '@egjs/react-grid'
import { Alert, AlertIcon, Button, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import beAxios from 'src/utils/axios'
import { Breed } from 'server/dog/dogapi/breed'
import styled from 'styled-components'
import windowSize from 'react-window-size'

import { WrapToCard } from '../style'

const IMAGE_PER_PAGE = 20

const GridContainer = styled.div`
  width: 80%;
`

type Props = {
  windowWidth: number
  windowHeight: number
}

type RowRange = {
  min: number
  max: number
}

const DogForm = ({ windowWidth, windowHeight }: Props) => {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [dogPage, setDogPages] = useState<number>(0)
  const [gridRowRange, setGridRowRange] = useState<RowRange>({ min: 3, max: 4 })

  useEffect(() => {
    console.log({ windowWidth, windowHeight })
    switch (true) {
      case windowWidth > 1200:
        setGridRowRange({ min: 4, max: 5 })
        break
      case windowWidth > 992:
        setGridRowRange({ min: 3, max: 4 })
        break
      case windowWidth > 768:
        setGridRowRange({ min: 2, max: 3 })
        break
      default:
        setGridRowRange({ min: 2, max: 2 })
    }
  }, [windowWidth, windowHeight])

  const getAllBreedsData = async () => {
    setLoading(true)
    const res = await beAxios('/dog')
    console.log(res.data)
    setBreeds(res.data.breeds)
    setLoading(false)
    return res.data
  }

  const nextPage = () => {
    if (dogPage * IMAGE_PER_PAGE >= breeds.length) {
      return
    }
    setDogPages((prev) => prev + 1)
  }

  const prevPage = () => {
    if (dogPage === 0) {
      return
    }
    setDogPages((prev) => prev - 1)
  }

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
    <GridContainer>
      <WrapToCard>
        <Alert status="info" style={{ marginBottom: '0.5rem' }}>
          <AlertIcon />
          Pick your favorite dogs
        </Alert>
        <JustifiedGrid
          className="container"
          gap={5}
          defaultDirection={'end'}
          columnRange={[gridRowRange.min, gridRowRange.max]}
          rowRange={0}
          sizeRange={[100, 300]}
          isCroppedSize={false}
          displayedRow={-1}>
          {breeds
            ?.slice(dogPage * IMAGE_PER_PAGE, (dogPage + 1) * IMAGE_PER_PAGE)
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
        <Button onClick={prevPage} variant="outline">
          ◀️
        </Button>
        <Button onClick={nextPage} variant="outline">
          ▶️
        </Button>
      </WrapToCard>
    </GridContainer>
  )
}

export default windowSize(DogForm)
