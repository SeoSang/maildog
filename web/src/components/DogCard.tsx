import { Breed } from '@/server/dog/dogapi/breed'
import { Text, Tooltip, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { SELECTED_BREEDS_MAX } from '../constants'
import { DogContext } from './DogForm'

type ImageContainerProps = {
  clicked: boolean
}

const ImageContainer = styled.div`
  cursor: pointer;
  border-radius: ${(props: ImageContainerProps) =>
    props.clicked ? '10%' : '0'};
  border: ${(props: ImageContainerProps) =>
    props.clicked ? '3mm ridge pink' : 'none'};
  height: auto;

  &:hover {
    border: ${(props: ImageContainerProps) =>
      props.clicked ? '3mm ridge pink' : '1mm solid pink'};
  }
`

const DogCard = ({ breed }: { breed: Breed }) => {
  const toast = useToast()

  const [clicked, setClicked] = useState(false)
  const {
    selectedBreeds,
    addSelectedBreeds,
    removeSelectedBreeds,
  } = useContext(DogContext)

  useEffect(() => {
    setClicked(false)
    if (selectedBreeds?.includes(breed)) {
      setClicked(true)
    }
  }, [breed, breed?.name, selectedBreeds])

  const onClickContainer = () => {
    if (clicked) {
      setClicked((prev) => !prev)
      removeSelectedBreeds(breed)
      return
    }
    if (selectedBreeds.length >= SELECTED_BREEDS_MAX) {
      toast({
        status: 'error',
        description: `You can choose up to ${SELECTED_BREEDS_MAX}.`,
      })
      return
    }
    addSelectedBreeds(breed)
    setClicked((prev) => !prev)
  }

  if (!breed) {
    return <div></div>
  }
  return (
    <Tooltip label={breed.name}>
      <ImageContainer
        className={'image'}
        key={`breed_${breed.id}`}
        data-grid-content-offset="5"
        onClick={onClickContainer}
        clicked={clicked}>
        <img
          src={breed.image?.url}
          style={{ width: '100%' }}
          alt={`image${breed.image?.url}`}
        />
      </ImageContainer>
    </Tooltip>
  )
}

export default DogCard
