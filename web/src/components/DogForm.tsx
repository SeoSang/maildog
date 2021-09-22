import { Alert, AlertIcon, Badge, Button, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import beAxios from 'src/utils/axios'
import { Breed } from 'server/dog/dogapi/breed'
import styled from 'styled-components'

import { WrapToCard } from '../style'
import DogGrid from './DogGrid'
import SelectedDogListCard from './SelectedDogListCard'
import { MainFormContext } from '../hooks/useMainFormContext'
import { ResponsiveWidth } from '../style/theme'

const IMAGE_PER_PAGE = 20

const GridContainer = styled.div`
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
// TODO : 이미지 미리 로드하거나, 로딩 바 구현하기
// TODO : 페이지 몇페이지인지 표시

const DogForm = () => {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [dogPage, setDogPages] = useState<number>(0)

  const { selectedBreeds } = useContext(MainFormContext)

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
        <Button onClick={prevPage} variant="outline">
          ◀️
        </Button>
        <Button onClick={nextPage} variant="outline">
          ▶️
        </Button>
        {selectedBreeds.length !== 0 && <Button>Finish</Button>}
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
