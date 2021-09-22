import { Alert, AlertIcon, Button, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState, createContext } from 'react'
import beAxios from 'src/utils/axios'
import { Breed } from 'server/dog/dogapi/breed'
import styled from 'styled-components'

import { WrapToCard } from '../style'
import DogGrid from './DogGrid'
import SelectedDogListCard from './SelectedDogListCard'
import useSelectedBreeds from '../hooks/useSelectedBreeds'

const IMAGE_PER_PAGE = 20

const GridContainer = styled.div`
  width: 80%;
`
type ContextValue = {
  selectedBreeds: Breed[]
  addSelectedBreeds: (breed: Breed) => void
  removeSelectedBreeds: (breed: Breed) => void
  setSelectedBreeds: React.Dispatch<React.SetStateAction<Breed[]>>
}

export const DogContext = createContext({
  selectedBreeds: [],
  addSelectedBreeds: (_: Breed) => {},
  removeSelectedBreeds: (_: Breed) => {},
  setSelectedBreeds: () => {},
} as ContextValue)

// TODO : 이미지 미리 로드하거나, 로딩 바 구현하기

const DogForm = () => {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [dogPage, setDogPages] = useState<number>(0)

  const { value, selectedBreeds } = useSelectedBreeds()

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
    <DogContext.Provider value={value}>
      <GridContainer>
        {selectedBreeds.length !== 0 && (
          <SelectedDogListCard selectedBreeds={selectedBreeds} />
        )}
        <WrapToCard>
          <Alert
            status="info"
            style={{ marginBottom: '0.5rem', borderRadius: '15px' }}>
            <AlertIcon />
            Pick your favorite dogs
          </Alert>
          <DogGrid
            breeds={breeds
              ?.slice(dogPage * IMAGE_PER_PAGE, (dogPage + 1) * IMAGE_PER_PAGE)
              .filter((breed) => breed.image?.url)}
          />
          <Button onClick={prevPage} variant="outline">
            ◀️
          </Button>
          <Button onClick={nextPage} variant="outline">
            ▶️
          </Button>
          {selectedBreeds.length !== 0 && <Button>Finish</Button>}
        </WrapToCard>
      </GridContainer>
    </DogContext.Provider>
  )
}

export default DogForm
