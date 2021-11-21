import React, { useContext, useState } from 'react'
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import styled from 'styled-components'

import { MainFormContext } from '../hooks/useMainFormContext'
import SelectedDogListCard from './SelectedDogListCard'
import { ResponsiveWidth } from '../style/theme'

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
`

const InputTable = styled(Table)`
  position: absolute;
  padding: 10px;
  background-color: antiquewhite;
  border-radius: 10px;
  margin-top: 10px;

  width: 360px !important;

  @media (min-width: ${ResponsiveWidth.md}px) {
    width: 760px !important;
  }

  @media (min-width: ${ResponsiveWidth.xl}px) {
    width: 1000px !important;
  }
`

/**
 * 입력된 input 값들을 확인하는 모달
 */
const InputModal = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const { email, selectedBreeds } = useContext(MainFormContext)
  const onClickTrigger = () => {
    setVisible((prev) => !prev)
  }
  return (
    <Container>
      <Button onClick={onClickTrigger}>
        {visible ? <ViewOffIcon /> : <ViewIcon />}
      </Button>
      <InputTable
        variant="simple"
        style={{ opacity: visible ? 1 : 0, display: visible ? '' : 'none' }}>
        <Thead>
          <Tr>
            <Th>Column</Th>
            <Th>value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>e-mail</Td>
            <Td>{email}</Td>
          </Tr>
          <Tr>
            <Td>breeds</Td>
            <Td>
              <SelectedDogListCard
                selectedBreeds={selectedBreeds}
                includeTitle={false}
              />
            </Td>
          </Tr>
        </Tbody>
      </InputTable>
    </Container>
  )
}

export default InputModal
