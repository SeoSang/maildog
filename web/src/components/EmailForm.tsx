import React, { useContext, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'

import PageContainer from './PageContainer'
import { WrapToCard } from '../style'
import { MainFormContext } from '../hooks/useMainFormContext'

type Props = {
  nextPage: () => void
  prevPage: () => void
}

const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(
    email.match(mail_format) && email.match(mail_format)?.length !== 0,
  )
}

const EmailForm = (pageButtons: Props) => {
  const { email, setEmail } = useContext(MainFormContext)
  const [emailChecked, setEmailChecked] = useState(false)

  const onClickRegisterButton = () => {
    // TODO : 토스트로 바꾸기 alert
    if (!isValidEmail(email)) {
      alert('올바르지 않은 이메일입니다.')
      return
    }
    alert('사용가능한 이메일입니다.')
    setEmailChecked(true)
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
          }}
        />
        <FormHelperText>We will never share your email.</FormHelperText>
        <Button style={{ marginTop: '0.5rem' }} onClick={onClickRegisterButton}>
          Register
        </Button>
      </FormControl>
      <PageContainer
        prevPage={pageButtons.prevPage}
        nextPage={emailChecked ? pageButtons.nextPage : undefined}
      />
    </WrapToCard>
  )
}

export default EmailForm
