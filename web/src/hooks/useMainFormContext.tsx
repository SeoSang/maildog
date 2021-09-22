import React, { createContext, useState, useCallback, useMemo } from 'react'
import { Breed } from '@/server/dog/dogapi/breed'
import { useToast } from '@chakra-ui/react'

import { SELECTED_BREEDS_MAX } from '../constants'

type FormContextValues = {
  email: string
  selectedBreeds: Breed[]
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setSelectedBreeds: React.Dispatch<React.SetStateAction<Breed[]>>
  addSelectedBreeds: (breed: Breed) => void
  removeSelectedBreeds: (breed: Breed) => void
}

export const MainFormContext = createContext({
  email: '',
  selectedBreeds: [],
  setEmail: (_: string) => {},
  setSelectedBreeds: (_: Breed[]) => {},
  addSelectedBreeds: (_: Breed) => {},
  removeSelectedBreeds: (_: Breed) => {},
} as FormContextValues)

const useMainFormContext = () => {
  const [email, setEmail] = useState<string>('')
  const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>([])

  const toast = useToast()

  const addSelectedBreeds = useCallback(
    (breed: Breed) => {
      if (selectedBreeds.includes(breed)) {
        toast({ status: 'error', description: 'Already Selcted!' })
        return
      }
      if (selectedBreeds.length >= SELECTED_BREEDS_MAX) {
        toast({
          status: 'error',
          description: `You can choose up to ${SELECTED_BREEDS_MAX}.`,
        })
        return
      }
      setSelectedBreeds((prev) => [...prev, breed])
    },
    [selectedBreeds, setSelectedBreeds, toast],
  )

  const removeSelectedBreeds = useCallback(
    (breed: Breed) => {
      if (!selectedBreeds.includes(breed)) {
        toast({ status: 'error', description: 'Not exist in selected breeds!' })
        return
      }
      setSelectedBreeds((prev) => prev.filter((b) => b.id !== breed.id))
    },
    [selectedBreeds, setSelectedBreeds, toast],
  )

  const formValues = useMemo(
    () => ({
      email,
      selectedBreeds,
      setEmail,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    }),
    [
      email,
      selectedBreeds,
      setEmail,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    ],
  )

  return { MainFormContext, formValues }
}

export default useMainFormContext
