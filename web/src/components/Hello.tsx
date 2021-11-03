import React, { useContext } from 'react'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import Link from 'next/link'

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
        <Link href={'login'}>
          <Button size="lg">Login</Button>
        </Link>
      </FlexDiv>
    </>
  )
}

export default Hello
