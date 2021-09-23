import React, { useContext } from 'react'

import { MainFormContext } from '../hooks/useMainFormContext'
import CheckDog from './CheckDog'
import DogForm from './DogForm'
import EmailForm from './EmailForm'
import Hello from './Hello'

const MainForm = () => {
  const { page } = useContext(MainFormContext)

  switch (page) {
    case 1:
      return <Hello />
    case 2:
      return <EmailForm />
    case 3:
      return <DogForm />
    case 4:
      return <CheckDog />
    default:
      return <></>
  }
}

export default MainForm
