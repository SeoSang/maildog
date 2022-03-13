import React, { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import RegisterForm from '@/src/components/form/RegisterForm'
import { MainFormContext } from '@/src/hooks/useMainFormContext'
import { BackgroundDiv } from '@/src/style/div'

type Props = {}

const Register: React.FC<Props> = ({}) => {
  const { setUser, isLogined } = useContext(MainFormContext)
  const router = useRouter()

  useEffect(() => {
    if (isLogined) {
      alert('You are already login.')
      router.push('/')
    }
  }, [isLogined, router])
  return (
    <BackgroundDiv>
      <RegisterForm setUser={setUser} />
    </BackgroundDiv>
  )
}

export default Register
