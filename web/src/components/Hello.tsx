import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'

type Props = {
  setPage: Dispatch<SetStateAction<number>>
}

const Hello = ({ setPage }: Props) => {
  return (
    <>
      <Heading as="h1" size="4xl" mb="4">
        Maildog!
      </Heading>
      <Button
        size="lg"
        onClick={() => {
          setPage((prevPage) => {
            console.log(prevPage)
            return prevPage + 1
          })
        }}>
        둘러보기
      </Button>
    </>
  )
}

export default Hello
