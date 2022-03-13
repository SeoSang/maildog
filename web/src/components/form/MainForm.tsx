import React, { useContext } from 'react'

import CronForm from '@/src/components/form/CronForm'

import { MainFormContext } from '../../hooks/useMainFormContext'
import CheckDog from '../CheckDog'
import Hello from '../Hello'
import DogForm from './DogForm'
import EmailForm from './EmailForm'

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
    case 5:
      return <CronForm />
    default:
      return <></>
  }
}

export default MainForm
