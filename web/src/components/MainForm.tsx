import React, { useState } from 'react'

import Hello from './Hello'

const MainForm = () => {
  const [page, setPage] = useState<number>(0)

  switch (page) {
    case 0:
      return <Hello setPage={setPage} />
    default:
      return <></>
  }
}

export default MainForm
