import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import LoginForm from '../components/LoginForm'
import { MainFormContext } from '../hooks/useMainFormContext'
import { BackgroundDiv } from '../style/div'

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
