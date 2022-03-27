import React, { useEffect, useState } from 'react'

import { Box, Flex, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import {
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { loadBreed } from '@/server/dog/breed'
import { Breed } from '@/server/dog/dogapi/breed'
import { resizeImage } from '@/src/components/DogCard'
import { BackgroundDiv, FlexDiv } from '@/src/style/div'

const Breed = () => {
  const router = useRouter()
  const { id } = router.query

  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)')

  const [breed, setBreed] = useState<Breed | null>(null)
  const [loading, setLoading] = useState(true)

  console.log(breed)

  useEffect(() => {
    setLoading(true)
    loadBreed(id as string).then((res) => {
      if (res.success && res.data) {
        setBreed(res.data)
        setLoading(false)
      }
    })
  }, [router, id])

  if (loading || !breed)
    return (
      <BackgroundDiv>
        <FlexDiv height={'100%'}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </FlexDiv>
      </BackgroundDiv>
    )

  const { width, height } = resizeImage({
    image: breed?.image,
    targetHeight: 260,
  })

  return (
    <BackgroundDiv>
      <Flex
        pt={'30px'}
        direction={isNotSmallerScreen ? 'row' : 'column'}
        w="100%"
        maxWidth={{ base: '100vh', md: '130vh', lg: '130vh', xl: '130vh' }}>
        <Box alignSelf="center" px="32" py="16">
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <ImageWrapper>
            <Image src={breed.image?.url || ''} width={width} height={height} />
          </ImageWrapper>
          <Text fontSize="2xl" color="gray.600" marginTop={3} isTruncated>
            {breed.name}
          </Text>
          <Text fontSize="xl" color="gray.400" isTruncated>
            {breed.breed_group}
          </Text>
        </Box>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Info</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {breed?.name && (
              <Tr>
                <Td>Name</Td>
                <Td>{breed.name}</Td>
              </Tr>
            )}
            {breed?.temperament && (
              <Tr>
                <Td>Temperament</Td>
                <Td>{breed?.temperament}</Td>
              </Tr>
            )}
            {breed?.life_span && (
              <Tr>
                <Td>Life Sapn</Td>
                <Td>{breed?.life_span}</Td>
              </Tr>
            )}
            {breed?.origin && (
              <Tr>
                <Td>Origin</Td>
                <Td>{breed?.origin}</Td>
              </Tr>
            )}
            {breed?.bred_for && (
              <Tr>
                <Td>Bred for</Td>
                <Td>{breed?.bred_for}</Td>
              </Tr>
            )}
            {breed?.weight && (
              <Tr>
                <Td>Weight</Td>
                <Td>{breed?.weight.metric} (kg)</Td>
              </Tr>
            )}
            {breed?.height && (
              <Tr>
                <Td>Height</Td>
                <Td>{breed?.height.metric} (cm)</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Flex>
    </BackgroundDiv>
  )
}

const ImageWrapper = styled.div`
  img {
    border-radius: 13px;
  }
`

export default Breed
