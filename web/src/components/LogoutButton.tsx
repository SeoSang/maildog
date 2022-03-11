import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import { logoutUser } from '@/src/request/user'
import { useRouter } from 'next/router'

import { MainFormContext } from '../hooks/useMainFormContext'

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 120px;
  z-index: 100;
`

const LogoutButton = () => {
  const { isLogined, setUser } = useContext(MainFormContext)
  const router = useRouter()

  if (!isLogined) {
    return null
  }
  const onClickLogout = async () => {
    window.localStorage.clear()
    setUser(null)
    await logoutUser()
    router.push('/')
  }
  return (
    <Container>
      <Button onClick={onClickLogout}>
        <UnlockIcon />
      </Button>
    </Container>
  )
}

export default LogoutButton
