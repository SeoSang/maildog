import React, { useContext } from 'react'

import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import styled from 'styled-components'

import { isMainInputModalOpenAtom } from '@/src/atom/modal'

import { MainFormContext } from '../hooks/useMainFormContext'
import { ResponsiveWidth } from '../style/theme'
import SelectedDogListCard from './SelectedDogListCard'

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
  margin-top: 50px;

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
  const visible = useAtomValue(isMainInputModalOpenAtom)
  const { email, selectedBreeds } = useContext(MainFormContext)

  return (
    <Container>
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
