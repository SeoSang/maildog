import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'

import { MainFormContext } from '../hooks/useMainFormContext'

const Hello = () => {
  const { nextPage } = useContext(MainFormContext)
  return (
    <>
      <Heading as="h1" size="4xl" mb="4">
        Maildog!
      </Heading>
      <Button size="lg" onClick={nextPage}>
        둘러보기
      </Button>
    </>
  )
}

export default Hello
