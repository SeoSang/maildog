import React, { createContext, useCallback, useMemo, useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { Breed } from '@/server/dog/dogapi/breed'
import { SubscribeBreedInfo } from '@/server/types/subscribe'
import { UserInfo } from '@/server/types/user'

import { SELECTED_BREEDS_MAX } from '../constants'

const NOT_LOGIN_ID = -1

export const notLoginUser: UserInfo = {
  id: NOT_LOGIN_ID,
  email: 'dummy@naver.com',
}

type FormContextValues = {
  page: number
  user: UserInfo | null
  email: string
  isLogined: boolean
  prevPage: () => void
  nextPage: () => void
  selectedBreeds: (Breed | SubscribeBreedInfo)[]
  setUser: (user: UserInfo | null) => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setSelectedBreeds: React.Dispatch<React.SetStateAction<Breed[]>>
  addSelectedBreeds: (breed: Breed | SubscribeBreedInfo) => void
  removeSelectedBreeds: (breed: Breed | SubscribeBreedInfo) => void
}

export const MainFormContext = createContext({
  page: 1,
  user: null,
  isLogined: false,
  email: '',
  prevPage: () => {},
  nextPage: () => {},
  selectedBreeds: [],
  setUser: (_: UserInfo | null) => {},
  setEmail: (_: string) => {},
  setSelectedBreeds: (_: (Breed | SubscribeBreedInfo)[]) => {},
  addSelectedBreeds: (_: Breed | SubscribeBreedInfo) => {},
  removeSelectedBreeds: (_: Breed | SubscribeBreedInfo) => {},
} as FormContextValues)

const FIRST_PAGE = 1
const MAX_PAGE = 5

const useMainFormContext = () => {
  const [page, setPage] = useState<number>(1)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [email, setEmail] = useState<string>('')
  const [selectedBreeds, setSelectedBreeds] = useState<
    (Breed | SubscribeBreedInfo)[]
  >([])

  const toast = useToast()

  const addSelectedBreeds = useCallback(
    (breed: Breed | SubscribeBreedInfo) => {
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
    (breed: Breed | SubscribeBreedInfo) => {
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

  const isLogined = useMemo(
    () => user !== null && user.id !== NOT_LOGIN_ID,
    [user],
  )

  const formValues = useMemo(
    () => ({
      page,
      user,
      email,
      isLogined,
      selectedBreeds,
      setUser,
      setEmail,
      prevPage,
      nextPage,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    }),
    [
      page,
      user,
      email,
      isLogined,
      selectedBreeds,
      setUser,
      setEmail,
      prevPage,
      nextPage,
      setSelectedBreeds,
      addSelectedBreeds,
      removeSelectedBreeds,
    ],
  )

  return { MainFormContext, formValues, setUser }
}

export const isNotLogined = (user: UserInfo | null) => {
  return user?.id === notLoginUser.id
}

export default useMainFormContext
