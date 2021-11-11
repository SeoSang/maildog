import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import LoginForm from '../src/components/LoginForm'
import { MainFormContext } from '../src/hooks/useMainFormContext'
import { BackgroundDiv } from '../src/style/div'

const Login = () => {
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
      <LoginForm setUser={setUser} />
    </BackgroundDiv>
  )
}

export default Login
