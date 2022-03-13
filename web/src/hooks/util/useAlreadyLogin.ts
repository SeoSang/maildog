import { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { MainFormContext } from '@/src/hooks/useMainFormContext'

export const useAlreadyLogin = () => {
  const router = useRouter()
  const { isLogined } = useContext(MainFormContext)

  useEffect(() => {
    if (isLogined) {
      alert('You are already login.')
      router.push('/')
    }
  }, [isLogined, router])
}
