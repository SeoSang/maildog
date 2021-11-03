import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { UserInfo } from '@/server/types/user'
import { loginUser } from '@/src/request/user'
import { encryptObject } from '@/src/utils/encrypt'

import { WrapToCard } from '../style'
import { FlexDiv } from '../style/div'
import { isValidEmail } from '../utils'

type Props = {
  setUser: (user: UserInfo) => void
}

const isValidData = (email: string, password: string): boolean => {
  if (email.trim().length === 0 || password.trim().length === 0) {
    return false
  }
  return isValidEmail(email)
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

    const user = await loginUser({ email, password })
    if (user) {
      alert('Login Success!')
      setUser(user)
      window.localStorage.setItem('godliamUser', encryptObject(user))
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
