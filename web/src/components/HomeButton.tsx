import React from 'react'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

const HomeButton = () => {
  return (
    <Link href={'/mypage'}>
      <Button>
        <ArrowBackIcon />
      </Button>
    </Link>
  )
}

export default HomeButton
