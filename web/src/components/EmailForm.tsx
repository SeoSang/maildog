import React from 'react'
import { FormControl, FormLabel, FormHelperText, Input } from '@chakra-ui/react'

const EmailForm = () => {
  return (
    <FormControl id="email">
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  )
}

export default EmailForm
