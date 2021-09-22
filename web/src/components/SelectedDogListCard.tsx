import { Breed } from '@/server/dog/dogapi/breed'
import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

type Props = {
  selectedBreeds: Breed[]
}

const SelectedDogListCard = ({ selectedBreeds }: Props) => {
  return (
    <Stack spacing={2} direction="row" align="center">
      {selectedBreeds.map((breed, i) => {
        return (
          <Button colorScheme="teal" size="xs" key={`selectedDog_button_${i}`}>
            {breed.name}
          </Button>
        )
      })}
    </Stack>
  )
}

export default SelectedDogListCard
