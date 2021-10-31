import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'

import { MainFormContext } from '../hooks/useMainFormContext'
import { FlexDiv } from '../style/div'

const Hello = () => {
  const { nextPage } = useContext(MainFormContext)
  return (
    <>
      <Heading as="h1" size="4xl" mb="4">
        Maildog!
      </Heading>
      <FlexDiv gap="6px">
        <Button size="lg" onClick={nextPage}>
          Register
        </Button>
        <Button size="lg" onClick={nextPage}>
          Login
        </Button>
      </FlexDiv>
    </>
  )
}

export default Hello
