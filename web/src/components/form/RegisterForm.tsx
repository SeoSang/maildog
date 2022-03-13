import React, { useState } from 'react'

import { Box } from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  useToast,
} from '@chakra-ui/react'

import { UserInfo } from '@/server/types/user'
import useResponisveWidth from '@/src/hooks/useResponisveWidth'
import { useAlreadyLogin } from '@/src/hooks/util/useAlreadyLogin'
import { isValidEmail } from '@/src/utils'
import beAxios from '@/src/utils/axios'

import { WrapToCard } from '../../style'
import { FlexDiv } from '../../style/div'

type Props = {
  setUser: (user: UserInfo) => void
}

const RegisterForm: React.FC<Props> = () => {
  useAlreadyLogin()
  console.log(useResponisveWidth())
  const toast = useToast()

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [checked, setEmailChecked] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [passwordCheck, setPasswordCheck] = useState<string>('')

  const isPasswordChecked = password === passwordCheck

  const onClickRegister = () => {
    if (!email) {
      toast({
        status: 'error',
        description: 'Please input your email',
      })
      return
    }
    if (!password || !passwordCheck) {
      toast({
        status: 'error',
        description: 'Please input your password',
      })
      return
    }
    if (!checked) {
      toast({
        status: 'error',
        description: 'Please check your email',
      })
      return
    }
    if (password !== passwordCheck) {
      toast({
        status: 'error',
        description: 'Password Check is not correct',
      })
      return
    }
  }

  const onClickEmailCheck = async () => {
    if (!isValidEmail(email)) {
      toast({
        status: 'error',
        description: 'Invalid Email format!',
      })
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
    <FlexDiv style={{ minHeight: '100vh' }}>
      <WrapToCard
        w={{
          base: '94%',
          md: '60%',
        }}>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
        </FormControl>
        <FormControl isRequired>
          <Grid
            templateColumns={{
              // sx: isLargerThanSM ? 'repeat(2, 80% 20%)' : 'repeat(1, 100%)',
              base: 'repeat(1, 100%)',
              md: 'repeat(2, 80% 20%)',
            }}
            gap={6}>
            <Input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Button onClick={onClickEmailCheck}>Check</Button>
          </Grid>
          <FormLabel style={{ marginTop: '1rem' }}>Name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            type="text"
            value={name}
            onChange={(e) => {
              if (e.target.value.length >= 60) return
              setName(e.target.value)
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel style={{ marginTop: '1rem' }}>Password</FormLabel>
          <Input
            id="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </FormControl>
        <FormControl isRequired isInvalid={!isPasswordChecked}>
          <FormLabel style={{ marginTop: '1rem' }}>Password Check</FormLabel>
          <Input
            id="passwordCheck"
            type="password"
            placeholder="password check"
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value)
            }}
          />
          {isPasswordChecked ? (
            <FormHelperText>
              We will never share your email and password.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Password Check is not correct.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel style={{ marginTop: '1rem' }}>
            Choose your favorite Dog!
          </FormLabel>
          <Box mb={'2rem'}>
            <Button colorScheme={'teal'} w={'100%'}>
              Select
            </Button>
          </Box>
        </FormControl>
        <FlexDiv>
          <Button
            variant={'outline'}
            style={{ marginTop: '0.5rem' }}
            onClick={onClickRegister}>
            Register
          </Button>
        </FlexDiv>
      </WrapToCard>
    </FlexDiv>
  )
}

export default RegisterForm
