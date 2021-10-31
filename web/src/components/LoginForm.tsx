import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'
import { UserInfo } from '@/server/types/user'

import { WrapToCard } from '../style'
import beAxios from '../utils/axios'
import { FlexDiv } from '../style/div'
import { alertErrorMessage, isValidEmail } from '../utils'

type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>
}

const isValidData = (email: string, password: string): boolean => {
  if (email.trim().length === 0 || password.trim().length === 0) {
    return false
  }
  if (!isValidEmail(email)) {
    return false
  }
  return true
}

const LoginForm: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const onClickLoginButton = async () => {
    if (!isValidData(email, password)) {
      alert('Wrong data format')
    }
    setEmail(email.trim())
    setPassword(password.trim())
    try {
      const res = await beAxios.post('/user', {
        email: email.trim(),
        password: password.trim(),
      })
      const user = res.data
      setUser(user)
      alert(res.data.message)
    } catch (e: any) {
      alertErrorMessage(e)
    }
  }

  return (
    <FlexDiv style={{ minHeight: '100vh' }}>
      <WrapToCard style={{ width: '60%' }}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <FormHelperText>
            We will never share your email and password.
          </FormHelperText>
          <FlexDiv>
            <Button
              style={{ marginTop: '0.5rem' }}
              onClick={onClickLoginButton}>
              Login
            </Button>
          </FlexDiv>
        </FormControl>
      </WrapToCard>
    </FlexDiv>
  )
}

export default LoginForm
