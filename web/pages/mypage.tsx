import React, { useContext, useEffect } from 'react'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Box, Flex, Text } from '@chakra-ui/layout'
import Icon from '@chakra-ui/icon'
import { GiDogBowl } from 'react-icons/gi'
import { FaDog, FaUserEdit } from 'react-icons/Fa'
import Image from 'next/image'
import { BackgroundDiv } from '@/src/style/div'
import styled from 'styled-components'
import { isNotLogined, MainFormContext } from '@/src/hooks/useMainFormContext'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { user } = useContext(MainFormContext)
  const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)')
  // const [user, setUser] = useState(null)
  useEffect(() => {
    if (isNotLogined(user)) {
      alert('You need to login!')
      router.push('/login')
    }
  }, [router, user?.id])

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
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <ImageWrapper>
            <Image src={`/dog/${user.favorite}.jpg`} width={260} height={260} />
          </ImageWrapper>
          <Text fontSize="2xl" color="gray.600" marginTop={3} isTruncated>
            {user.name}
          </Text>
          <Text fontSize="xl" color="gray.400" isTruncated>
            {user.email}
          </Text>
        </Box>
        <Box alignSelf="center" px="32" py="16">
          <Text fontWeight="bold" fontSize="2xl">
            Your Dogs
          </Text>
          <Flex direction={isNotSmallerScreen ? 'row' : 'column'} mt={8}>
            <Flex
              rounded="xl"
              direction="column"
              mt={4}
              bg="blue.400"
              h="30vh"
              w="30vh"
              justify="flex-end">
              <Icon color="white" p="4" as={FaDog} w="24" h="24" />
              <Text color="white" p="4" fontSize="xl" fontWeight="semibold">
                About your Dogs
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
              _hover={{ bg: 'green.400' }}>
              <Icon as={FaUserEdit} p="4" w="24" h="24" color="black" />
              <Text color="black" p="4" fontSize="xl" fontWeight="semibold">
                Change your Profile
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </BackgroundDiv>
  )
}

const ImageWrapper = styled.div`
  img {
    border-radius: 13px;
  }
`

export default Profile
