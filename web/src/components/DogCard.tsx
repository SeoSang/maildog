import React, { useContext, useState, useEffect } from 'react'
import { Breed } from '@/server/dog/dogapi/breed'
import { Tooltip, useToast } from '@chakra-ui/react'
import styled from 'styled-components'

import { SELECTED_BREEDS_MAX } from '../constants'
import { MainFormContext } from '../hooks/useMainFormContext'

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

const DogCard = ({
  breed,
  clickable = true,
}: {
  breed: Breed
  clickable?: boolean
}) => {
  const toast = useToast()

  const [clicked, setClicked] = useState(false)
  const {
    selectedBreeds,
    addSelectedBreeds,
    removeSelectedBreeds,
  } = useContext(MainFormContext)

  useEffect(() => {
    setClicked(false)
    console.log({ selectedBreeds })
    if (selectedBreeds?.some((b) => b.id === breed.id)) {
      setClicked(true)
    }
  }, [breed, breed?.name, selectedBreeds, clickable])

  const onClickContainer = () => {
    if (!clickable) {
      return
    }
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
        clicked={clickable && clicked}>
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
