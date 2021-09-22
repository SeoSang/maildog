import { Breed } from '@/server/dog/dogapi/breed'
import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'

import { SELECTED_BREEDS_MAX } from '../constants'

const useSelectedBreeds = () => {
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

  const value = useMemo(
    () => ({
      selectedBreeds,
      addSelectedBreeds,
      setSelectedBreeds,
      removeSelectedBreeds,
    }),
    [
      selectedBreeds,
      addSelectedBreeds,
      setSelectedBreeds,
      removeSelectedBreeds,
    ],
  )

  return { value, selectedBreeds, addSelectedBreeds, removeSelectedBreeds }
}

export default useSelectedBreeds
