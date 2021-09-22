import React from 'react'
import { Breed } from '@/server/dog/dogapi/breed'
import { Badge, Button, Stack } from '@chakra-ui/react'

import { FlexDiv } from '../style/div'

type Props = {
  selectedBreeds: Breed[]
}

const SelectedDogListCard = ({ selectedBreeds }: Props) => {
  return (
    <div style={{ position: 'sticky' }}>
      <FlexDiv direction="row">
        <Button variant="ghost">Selected</Button>
        <Stack
          style={{ border: '1mm solid gray', padding: 5, borderRadius: '5px' }}
          spacing={2}
          direction="row"
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
    </div>
  )
}

export default SelectedDogListCard
