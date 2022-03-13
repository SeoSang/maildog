import React, { useContext } from 'react'

import { UnlockIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { logoutUser } from '@/src/request/user'

import { MainFormContext } from '../hooks/useMainFormContext'

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
    <Button onClick={onClickLogout}>
      <UnlockIcon />
    </Button>
  )
}

export default LogoutButton
