import { useEffect, useState } from 'react'

import { Button } from '@chakra-ui/react'

const AsyncImage = (props: any) => {
  const [loadedSrc, setLoadedSrc] = useState(null)
  useEffect(() => {
    setLoadedSrc(null)
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src)
      }
      const image = new Image()
      image.addEventListener('load', handleLoad)
      image.src = props.src
      return () => {
        image.removeEventListener('load', handleLoad)
      }
    }
  }, [props.src])
  if (loadedSrc === props.src) {
    return <img {...props} />
  }
  return <Button isLoading />
}

export default AsyncImage
