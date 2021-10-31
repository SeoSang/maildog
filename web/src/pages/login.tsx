import { useContext } from 'react'

import LoginForm from '../components/LoginForm'
import { MainFormContext } from '../hooks/useMainFormContext'
import { BackgroundDiv } from '../style/div'

const Login = () => {
  const { setUser } = useContext(MainFormContext)

  return (
    <BackgroundDiv>
      <LoginForm setUser={setUser}></LoginForm>
    </BackgroundDiv>
  )
}

export default Login
