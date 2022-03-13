import React from 'react'

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

const HomeButton = () => {
  return (
    <Link href={'/mypage'}>
      <Button>
        <CgProfile />
      </Button>
    </Link>
  )
}

export default HomeButton
