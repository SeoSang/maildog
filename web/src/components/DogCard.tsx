import React, { useContext, useEffect, useState } from 'react'

import { Tooltip, useToast } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Breed } from '@/server/dog/dogapi/breed'
import { DogImage } from '@/server/dog/dogapi/type'
import { SubscribeBreedInfo } from '@/server/types/subscribe'
import { selectedBreedsMaxAtom } from '@/src/atom/dogForm'

import { MainFormContext } from '../hooks/useMainFormContext'

const IMAGE_DEFAULT_WIDTH = 1200

type ImageContainerProps = {
  clicked: boolean
  clickable?: boolean
}

const ImageContainer = styled.div`
  width: 300px;
  height: auto;
  position: relative;
  cursor: pointer;
  border-radius: ${(props: ImageContainerProps) =>
    props.clicked ? '10%' : '0'};
  border: ${(props: ImageContainerProps) =>
    props.clicked ? '3mm ridge pink' : 'none'};

  &:hover {
    border: ${(props: ImageContainerProps) =>
      props.clickable === false
        ? 'none'
        : props.clicked
        ? '3mm ridge pink'
        : '1mm solid pink'};
  }
`

export const getImageHeightRatio = (image?: DogImage): number => {
  const height = image?.height
  const width = image?.width
  if (!height || !width || !image) {
    return 1
  }
  return (
    (typeof height === 'number' ? height : parseInt(height)) /
    (typeof width === 'number' ? width : parseInt(width))
  )
}

export const resizeImage = ({
  image,
  targetWidth,
  targetHeight,
}: {
  image?: DogImage
  targetWidth?: number
  targetHeight?: number
}) => {
  if (!image) return { width: targetWidth, height: targetWidth }
  if (targetWidth) {
    return {
      width: targetWidth,
      height: targetWidth * getImageHeightRatio(image),
    }
  }
  if (targetHeight) {
    return {
      width: targetHeight / getImageHeightRatio(image),
      height: targetHeight,
    }
  }
  return { width: targetWidth, height: targetHeight }
}

const DogCard = ({
  breed,
  clickable = true,
  linking = false,
}: {
  breed: Breed | SubscribeBreedInfo
  clickable?: boolean
  linking?: boolean
}) => {
  const toast = useToast()
  const router = useRouter()

  const [clicked, setClicked] = useState(false)
  const selectedBreedsMax = useAtomValue(selectedBreedsMaxAtom)
  const { selectedBreeds, addSelectedBreeds, removeSelectedBreeds } =
    useContext(MainFormContext)

  const { width, height } = resizeImage({
    image: breed?.image,
    targetWidth: IMAGE_DEFAULT_WIDTH,
  })

  useEffect(() => {
    setClicked(false)
    if (selectedBreeds?.some((b) => b.id === breed.id)) {
      setClicked(true)
    }
  }, [breed, breed?.name, selectedBreeds, clickable])

  const onClickContainer = () => {
    if (linking) return router.push(`/breed/${breed.id}`)
    if (!clickable) return
    if (clicked) {
      setClicked((prev) => !prev)
      removeSelectedBreeds(breed)
      return
    }
    if (selectedBreeds.length >= selectedBreedsMax) {
      toast({
        status: 'error',
        description: `You can choose up to ${selectedBreedsMax}.`,
      })
      return
    }
    addSelectedBreeds(breed)
    setClicked((prev) => !prev)
  }

  if (!breed) {
    return <div />
  }

  return (
    <Tooltip label={breed.name}>
      <ImageContainer
        className={'image'}
        key={`breed_${breed.id}`}
        data-grid-content-offset="5"
        onClick={onClickContainer}
        clicked={clickable && clicked}
        clickable={clickable}>
        <Image
          alt={`image${breed.image?.url}`}
          src={`/dog/${breed.name}.jpg`}
          width={width}
          height={height}
        />
      </ImageContainer>
    </Tooltip>
  )
}

export default DogCard
