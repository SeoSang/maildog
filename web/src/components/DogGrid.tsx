import { Breed } from '@/server/dog/dogapi/breed'
import { JustifiedGrid } from '@egjs/react-grid'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'rooks'

import DogCard from './DogCard'

type Props = {
  breeds: Breed[]
  clickable?: boolean
}

type RowRange = {
  min: number
  max: number
}

const DogGrid = ({ breeds, clickable }: Props) => {
  const [gridRowRange, setGridRowRange] = useState<RowRange>({ min: 3, max: 4 })

  const { innerWidth } = useWindowSize()

  useEffect(() => {
    if (!innerWidth) {
      return
    }
    switch (true) {
      case innerWidth > 1200:
        setGridRowRange({ min: 4, max: 5 })
        break
      case innerWidth > 992:
        setGridRowRange({ min: 3, max: 4 })
        break
      case innerWidth > 768:
        setGridRowRange({ min: 2, max: 3 })
        break
      default:
        setGridRowRange({ min: 2, max: 2 })
    }
  }, [innerWidth])

  return (
    <JustifiedGrid
      className="container"
      style={{ height: '100%' }}
      gap={5}
      defaultDirection={'end'}
      columnRange={[gridRowRange.min, gridRowRange.max]}
      rowRange={0}
      sizeRange={[100, 300]}
      isCroppedSize={false}
      displayedRow={-1}>
      {breeds?.map((breed, i) => (
        <DogCard breed={breed} key={`DogCard_${i}`} clickable={clickable} />
      ))}
    </JustifiedGrid>
  )
}

export default DogGrid
