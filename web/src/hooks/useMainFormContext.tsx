import React, { createContext, useState, useCallback, useMemo } from 'react'
import { Breed } from '@/server/dog/dogapi/breed'
import { useToast } from '@chakra-ui/react'

import { SELECTED_BREEDS_MAX } from '../constants'

type FormContextValues = {
  page: number
  email: string
  prevPage: () => void
  nextPage: () => void
  selectedBreeds: Breed[]
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setSelectedBreeds: React.Dispatch<React.SetStateAction<Breed[]>>
  addSelectedBreeds: (breed: Breed) => void
  removeSelectedBreeds: (breed: Breed) => void
}

export const MainFormContext = createContext({
  page: 1,
  email: '',
  prevPage: () => {},
  nextPage: () => {},
  selectedBreeds: [],
  setEmail: (_: string) => {},
  setSelectedBreeds: (_: Breed[]) => {},
  addSelectedBreeds: (_: Breed) => {},
  removeSelectedBreeds: (_: Breed) => {},
} as FormContextValues)

const FIRST_PAGE = 1
const MAX_PAGE = 4

const useMainFormContext = () => {
  const [email, setEmail] = useState<string>('')
  const [page, setPage] = useState<number>(1)
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
      if (selectedBreeds.some((b) => b.id === breed.id)) {
        setSelectedBreeds((prev) => prev.filter((b) => b.id !== breed.id))
        return
      }
      toast({ status: 'error', description: 'Not exist in selected breeds!' })
    },
    [selectedBreeds, setSelectedBreeds, toast],
  )

  const prevPage = useCallback(() => {
    setPage((prevPage) => Math.max(FIRST_PAGE, prevPage - 1))
  }, [setPage])

  const nextPage = useCallback(() => {
    setPage((prevPage) => Math.min(MAX_PAGE, prevPage + 1))
  }, [setPage])

  const formValues = useMemo(
    () => ({
      page,
      email,
      selectedBreeds,
      setEmail,
      prevPage,
      nextPage,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    }),
    [
      page,
      email,
      selectedBreeds,
      setEmail,
      prevPage,
      nextPage,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    ],
  )

  return { MainFormContext, formValues }
}

export default useMainFormContext
