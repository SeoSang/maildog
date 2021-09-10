import React from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'
import styled from 'styled-components'

import PageContainer from './PageContainer'

const FormContainer = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
  border-radius: 13%;
  box-shadow: 5px 5px 5px gray;
`

type Props = {
  nextPage: () => void
  prevPage: () => void
}

const EmailForm = (pageButtons: Props) => {
  return (
    <FormContainer>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <Button style={{ marginTop: '0.5rem' }}>Register</Button>
      </FormControl>
      <PageContainer {...pageButtons} />
    </FormContainer>
  )
}

export default EmailForm
