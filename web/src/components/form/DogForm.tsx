import React, { useContext, useEffect, useState } from 'react'

import {
  Alert,
  AlertIcon,
  Badge,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'

import { Breed } from '@/server/dog/dogapi/breed'
import { SubscribeBreedInfo } from '@/server/types/subscribe'
import beAxios from '@/src/utils/axios'

import { MainFormContext } from '../../hooks/useMainFormContext'
import { WrapToCard } from '../../style'
import { ResponsiveWidth } from '../../style/theme'
import DogGrid from '../DogGrid'
import SelectedDogListCard from '../SelectedDogListCard'

const IMAGE_PER_PAGE = 20

const GridContainer = styled.div`
  z-index: 1;
  width: 90%;
  margin: 15px;

  @media (min-width: ${ResponsiveWidth.md}px) {
    width: 85%;
    margin: 22px;
  }

  @media (min-width: ${ResponsiveWidth.xl}px) {
    width: 80%;
    margin: 30px;
  }
`

const DogForm = ({ onClickFinish }: { onClickFinish?: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<(Breed | SubscribeBreedInfo)[]>([])
  const [dogPage, setDogPages] = useState<number>(0)

  const { selectedBreeds, nextPage } = useContext(MainFormContext)

  const toast = useToast()

  useEffect(() => {
    const getAllBreedsData = async () => {
      setLoading(true)
      const res = await beAxios('/dog')
      setBreeds(res.data.breeds)
      setLoading(false)
      return res.data
    }
    getAllBreedsData()
  }, [])

  const nextDogs = () => {
    if (dogPage * IMAGE_PER_PAGE >= breeds.length) {
      return
    }
    setDogPages((prev) => prev + 1)
  }

  const prevDogs = () => {
    if (dogPage === 0) {
      return
    }
    setDogPages((prev) => prev - 1)
  }

  const onClickFinishButton = () => {
    if (selectedBreeds.length === 0) {
      toast({
        status: 'error',
        description: `Please pick your breeds.`,
      })
    }
    toast({
      status: 'success',
      description: `You choose ${selectedBreeds.length} breeds`,
    })
    nextPage()
  }

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
      {selectedBreeds.length !== 0 && (
        <SelectedDogListCard selectedBreeds={selectedBreeds} />
      )}
      <WrapToCard>
        <Alert
          status="info"
          fontSize={{ base: '14px', md: '20px', lg: '28px' }}
          style={{ marginBottom: '0.5rem', borderRadius: '15px' }}>
          <AlertIcon />
          Pick your favorite breeds
        </Alert>
        <DogGrid
          breeds={breeds
            ?.slice(dogPage * IMAGE_PER_PAGE, (dogPage + 1) * IMAGE_PER_PAGE)
            .filter((breed) => breed.image?.url)}
        />
        <Button onClick={prevDogs} variant="outline">
          ◀️
        </Button>
        <Button onClick={nextDogs} variant="outline">
          ▶️
        </Button>
        {selectedBreeds.length !== 0 && (
          <Button onClick={onClickFinish ?? onClickFinishButton}>Finish</Button>
        )}
        <br />
        <Badge variant="outline" colorScheme="green">
          {dogPage + 1}
        </Badge>
        -
        <Badge variant="outline" colorScheme="green">
          {Math.ceil(breeds.length / IMAGE_PER_PAGE)}
        </Badge>
      </WrapToCard>
    </GridContainer>
  )
}

export default DogForm
