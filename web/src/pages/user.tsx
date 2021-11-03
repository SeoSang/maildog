import React, { useContext } from 'react'
import { MainFormContext } from '@/src/hooks/useMainFormContext'

const User = () => {
  const { user } = useContext(MainFormContext)

  return (
    <>
      <div>{user?.id}</div>
      <div>{user?.email}</div>
      <div>{user?.password}</div>
    </>
  )
}

export default User
