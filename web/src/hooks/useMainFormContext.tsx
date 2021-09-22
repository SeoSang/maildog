import { Breed } from '@/server/dog/dogapi/breed'
import React, { createContext, useState, useCallback, useMemo } from 'react'

type FormData = {
  email: string
  selectedBreeds: Breed[]
}

type FormContextValues = {
  formData: FormData
  setEmail: (email: string) => void
  setSelectedBreeds: (breeds: Breed[]) => void
}

const defaultFormValues: FormData = {
  email: '',
  selectedBreeds: [],
}

const FormContext: React.Context<FormContextValues> = createContext({
  formData: defaultFormValues,
  setEmail: (_: string) => {},
  setSelectedBreeds: (_: Breed[]) => {},
})

const useMainFormContext = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormValues)

  const setEmail = useCallback(
    (email: string) => {
      setFormData({ ...formData, email })
    },
    [formData],
  )
  const setSelectedBreeds = useCallback(
    (breeds: Breed[]) => {
      setFormData({ ...formData, selectedBreeds: breeds })
    },
    [formData],
  )

  const formValues = useMemo(
    () => ({
      formData,
      setEmail,
      setSelectedBreeds,
    }),
    [formData, setEmail, setSelectedBreeds],
  )

  return { FormContext, formValues }
}

export default useMainFormContext
