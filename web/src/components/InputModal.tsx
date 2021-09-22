import React, { useState, useContext } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import styled from 'styled-components'

import { MainFormContext } from '../hooks/useMainFormContext'
import SelectedDogListCard from './SelectedDogListCard'

const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
`

const InputTable = styled(Table)`
  position: absolute;
  padding: 10px;
  background-color: antiquewhite;
  border-radius: 10px;
  margin-top: 10px;
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
      <InputTable variant="simple" style={{ opacity: visible ? 1 : 0 }}>
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
