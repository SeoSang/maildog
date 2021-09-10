import { Button } from '@chakra-ui/button'
import React from 'react'
import styled from 'styled-components'

const PageContainerDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  gap: 10px;
`

type Props = {
  nextPage: () => void
  prevPage: () => void
}

const PageContainer = ({ nextPage, prevPage }: Props) => {
  return (
    <PageContainerDiv>
      {prevPage && (
        <Button onClick={prevPage} variant="outline">
          ◀️
        </Button>
      )}
      {nextPage && (
        <Button onClick={nextPage} variant="outline">
          ▶️
        </Button>
      )}
    </PageContainerDiv>
  )
}

export default PageContainer
