import { Alert, AlertIcon, Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { WrapToCard } from '../style'
import DogGrid from './DogGrid'
import { MainFormContext } from '../hooks/useMainFormContext'
import { ResponsiveWidth } from '../style/theme'
import { FlexDiv } from '../style/div'
import beAxios from '../utils/axios'

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

const CheckDog = () => {
  const { selectedBreeds, email, nextPage, prevPage } = useContext(
    MainFormContext,
  )

  const onClickYes = async () => {
    try {

      await beAxios.post('/user/dog', {
        selectedBreeds,
        email,
      })
    }
  }
  return (
    <GridContainer>
      <WrapToCard>
        <Alert
          status="success"
          fontSize={{ base: '14px', md: '20px', lg: '28px' }}
          style={{ marginBottom: '0.5rem', borderRadius: '15px' }}>
          <AlertIcon />
          Are these the puppies you chose?
        </Alert>
        <DogGrid
          breeds={selectedBreeds.filter((breed) => breed.image?.url)}
          clickable={false}
        />
        <FlexDiv style={{ gap: '5px', marginTop: '10px' }}>
          <Button onClick={nextPage} colorScheme="blue">
            Yes
          </Button>
          <Button onClick={prevPage} colorScheme="red">
            No
          </Button>
        </FlexDiv>
      </WrapToCard>
    </GridContainer>
  )
}

export default CheckDog
