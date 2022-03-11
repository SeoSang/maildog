import React from 'react'

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 65px;
  z-index: 100;
`

const HomeButton = () => {
  return (
    <Container>
      <Link href={'/mypage'}>
        <Button>
          <CgProfile />
        </Button>
      </Link>
    </Container>
  )
}

export default HomeButton
