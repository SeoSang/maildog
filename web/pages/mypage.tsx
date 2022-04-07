import React, { useContext, useEffect, useState } from 'react'

import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaDog, FaUserEdit } from 'react-icons/Fa'
import { GiDogBowl } from 'react-icons/gi'
import styled from 'styled-components'

import { deleteCron, loadUserCronBreeds } from '@/server/cron'
import { SubscribeBreedInfo } from '@/server/types/subscribe'
import DogCard, { resizeImage } from '@/src/components/DogCard'
import { isNotLogined, MainFormContext } from '@/src/hooks/useMainFormContext'
import { BackgroundDiv } from '@/src/style/div'

import nameToIdBreedsMap from '../../web/server/db/json/nameToIdBreeds.json'

const Profile = () => {
  const router = useRouter()
  const { user } = useContext(MainFormContext)
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)')
  const [breeds, setBreeds] = useState<SubscribeBreedInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log({ user })
  useEffect(() => {
    if (isNotLogined(user)) {
      alert('You need to login!')
      // router.push('/login')
      return
    }
    if (breeds.length === 0 && user?.id) {
      setIsLoading(true)
      loadUserCronBreeds(user?.id).then((res) => {
        console.log({ res })
        setIsLoading(false)
        if (res.success && res.data) setBreeds(res.data)
      })
    }
  }, [router, user?.id])

  const onClickChangeDogs = () => {
    if (!user) return
    if (
      !confirm(
        'The existing cron will be deleted. Do you still want to proceed?',
      )
    ) {
      return
    }
    deleteCron(user?.id).then((res) => {
      if (res.success) router.push('/')
    })
  }

  if (!user) {
    return (
      <BackgroundDiv>
        <span>Login Please</span>
      </BackgroundDiv>
    )
  }

  return (
    <BackgroundDiv>
      <Flex
        direction={isNotSmallerScreen ? 'row' : 'column'}
        w="100%"
        maxWidth={{ base: '100vh', md: '130vh', lg: '130vh', xl: '130vh' }}>
        <Box alignSelf="center" px="32" py="16">
          <Tooltip label={user.favorite}>
            <ImageWrapper>
              <Image
                src={`/dog/${user.favorite}.jpg`}
                width={260}
                height={260}
              />
            </ImageWrapper>
          </Tooltip>
          <Text fontSize="2xl" color="gray.600" marginTop={3} isTruncated>
            {user.name}
          </Text>
          <Text fontSize="xl" color="gray.400" isTruncated>
            {user.email}
          </Text>
        </Box>
        <Box alignSelf="center" px="32" py="16">
          {breeds?.length > 0 ? (
            <Text fontWeight="bold" fontSize="2xl">
              The puppies you subscribe to.
            </Text>
          ) : (
            <Flex
              style={{ gap: 10 }}
              direction={isNotSmallerScreen ? 'row' : 'column'}
              mt={8}>
              {/*<Box alignSelf="center">*/}
              <Text fontWeight="bold" fontSize="2xl">
                You dont have a dog subscribing.
              </Text>
              <Link href={'/'}>
                <Button variant={'outline'}>Go</Button>
              </Link>
              {/*</Box>*/}
            </Flex>
          )}
          <Flex
            style={{ gap: 10 }}
            direction={isNotSmallerScreen ? 'row' : 'column'}
            mt={8}>
            {isLoading && 'loading..'}
            {!isLoading &&
              breeds?.map((breed: SubscribeBreedInfo) => {
                const { width, height } = resizeImage({
                  image: breed?.image,
                  targetHeight: 200,
                })
                return (
                  <Flex
                    key={`Breed_${breed?.id}`}
                    rounded="xl"
                    direction="row"
                    mt={4}
                    h={height}
                    w={width}
                    justify="flex-end">
                    <DogCard breed={breed} clickable={false} linking />
                  </Flex>
                )
              })}
          </Flex>
          <Flex direction={isNotSmallerScreen ? 'row' : 'column'} mt={8}>
            <Link
              href={`/breed/${
                (nameToIdBreedsMap as any)[user.favorite ?? 'Akita']
              }`}>
              <Flex
                rounded="xl"
                direction="column"
                mt={4}
                bg="blue.400"
                h="30vh"
                w="30vh"
                justify="flex-end"
                _hover={{ bg: 'teal.400' }}>
                <Icon color="white" p="4" as={FaDog} w="24" h="24" />

                <Text color="white" p="4" fontSize="xl" fontWeight="semibold">
                  About your Favorite
                </Text>
              </Flex>
            </Link>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              ml={isNotSmallerScreen ? 4 : 0}
              bg="gray.100"
              h="30vh"
              w="30vh"
              justify="flex-end"
              onClick={onClickChangeDogs}
              _hover={{ bg: 'teal.400' }}>
              <Icon color="black" p="4" as={GiDogBowl} w="24" h="24" />
              <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                Change your Dogs
              </Text>
            </Flex>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              ml={isNotSmallerScreen ? 4 : 0}
              bg="gray.100"
              h="30vh"
              w="30vh"
              justify="flex-end"
              _hover={{ bg: 'green.400' }}
              onClick={() => {
                alert('Sorry, it will be coming soon!')
              }}>
              <Icon as={FaUserEdit} p="4" w="24" h="24" color="black" />
              <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                Change your Profile
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {/*<DogForm />*/}
    </BackgroundDiv>
  )
}

const ImageWrapper = styled.div`
  img {
    border-radius: 13px;
  }
`

export default Profile
