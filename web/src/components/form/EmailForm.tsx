import React, { useContext, useState } from 'react'

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'

import { MainFormContext } from '../../hooks/useMainFormContext'
import { WrapToCard } from '../../style'
import { isValidEmail } from '../../utils'
import beAxios from '../../utils/axios'
import PageContainer from '../PageContainer'

const EmailForm = () => {
  const { email, setEmail, prevPage, nextPage } = useContext(MainFormContext)
  const [emailChecked, setEmailChecked] = useState(false)

  const onClickRegisterButton = async () => {
    // TODO : 토스트로 바꾸기 alert
    if (!isValidEmail(email)) {
      alert('Wrong e-mail format.')
      return
    }
    try {
      const res = await beAxios.post('/user/email', { email })
      alert(res.data.message)
      setEmailChecked(true)
    } catch (e: any) {
      alert(e.response.data.message)
      setEmailChecked(false)
    }
  }

  return (
    <WrapToCard>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailChecked(false)
          }}
        />
        <FormHelperText>We will never share your email.</FormHelperText>
        <Button style={{ marginTop: '0.5rem' }} onClick={onClickRegisterButton}>
          Register
        </Button>
      </FormControl>
      <PageContainer
        prevPage={prevPage}
        nextPage={emailChecked ? nextPage : undefined}
      />
    </WrapToCard>
  )
}

export default EmailForm
