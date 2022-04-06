import React from 'react'

import { Badge, Button, Stack } from '@chakra-ui/react'
import styled from 'styled-components'

import { Breed } from '@/server/dog/dogapi/breed'
import { SubscribeBreedInfo } from '@/server/types/subscribe'

import useResponisveWidth from '../hooks/useResponisveWidth'
import { FlexDiv } from '../style/div'

const Container = styled.div`
  position: sticky;
  top: 10px;
  z-index: 10;
  padding: 5px;
  margin-bottom: 5px;
  overflow-x: auto;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 1px 1px 1px gray;
`

type Props = {
  selectedBreeds: (Breed | SubscribeBreedInfo)[]
  includeTitle?: boolean
}

const SelectedDogListCard = ({
  selectedBreeds,
  includeTitle = true,
}: Props) => {
  const { isLargerThanLG } = useResponisveWidth()
  return (
    <Container>
      <FlexDiv direction="row">
        {includeTitle && <Button variant="ghost">Selected</Button>}
        <Stack
          style={{
            padding: 5,
            marginBottom: '3px',
          }}
          spacing={2}
          direction={isLargerThanLG ? 'row' : 'column'}
          align="center">
          {selectedBreeds.map((breed, i) => {
            return (
              <Badge colorScheme="green" key={`selectedDog_badge${i}`}>
                {breed.name}
              </Badge>
            )
          })}
        </Stack>
      </FlexDiv>
    </Container>
  )
}

export default SelectedDogListCard
