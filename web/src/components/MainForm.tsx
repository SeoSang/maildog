import React, { useCallback, useState } from 'react'

import EmailForm from './EmailForm'
import Hello from './Hello'

const FIRST_PAGE = 1
const MAX_PAGE = 2

const MainForm = () => {
  const [page, setPage] = useState<number>(FIRST_PAGE)
  const nextPage = useCallback(() => {
    setPage((prevPage) => Math.min(MAX_PAGE, prevPage + 1))
  }, [setPage])
  const prevPage = useCallback(() => {
    setPage((prevPage) => Math.max(FIRST_PAGE, prevPage - 1))
  }, [setPage])

  switch (page) {
    case 1:
      return <Hello nextPage={nextPage} />
    case 2:
      return <EmailForm nextPage={nextPage} prevPage={prevPage} />
    default:
      return <></>
  }
}

export default MainForm
