import { Breed } from '@/server/dog/dogapi/breed'
import { JustifiedGrid } from '@egjs/react-grid'
import React, { useEffect, useState } from 'react'
import windowSize from 'react-window-size'

import DogCard from './DogCard'

type Props = {
  breeds: Breed[]
  windowWidth?: number
  windowHeight?: number
}

type RowRange = {
  min: number
  max: number
}

const DogGrid = ({ breeds, windowWidth, windowHeight }: Props) => {
  const [gridRowRange, setGridRowRange] = useState<RowRange>({ min: 3, max: 4 })

  useEffect(() => {
    if (!windowHeight || !windowWidth) {
      return
    }
    switch (true) {
      case windowWidth > 1200:
        setGridRowRange({ min: 4, max: 5 })
        break
      case windowWidth > 992:
        setGridRowRange({ min: 3, max: 4 })
        break
      case windowWidth > 768:
        setGridRowRange({ min: 2, max: 3 })
        break
      default:
        setGridRowRange({ min: 2, max: 2 })
    }
  }, [windowWidth, windowHeight])

  return (
    <JustifiedGrid
      className="container"
      gap={5}
      defaultDirection={'end'}
      columnRange={[gridRowRange.min, gridRowRange.max]}
      rowRange={0}
      sizeRange={[100, 300]}
      isCroppedSize={false}
      displayedRow={-1}>
      {breeds?.map((breed, i) => (
        <DogCard breed={breed} key={`DogCard_${i}`} />
      ))}
    </JustifiedGrid>
  )
}

export default windowSize(DogGrid)
