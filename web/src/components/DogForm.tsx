import { Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import beAxios from 'src/utils/axios'

const DogForm = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const getAllBreedsData = async () => {
    setLoading(true)
    const res = await beAxios('/dog')
    console.log(res.data)
    setData(res.data)
    setLoading(false)
    return res.data
  }
  console.log(data)

  useEffect(() => {
    getAllBreedsData()
  }, [])

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }
  return <div>asd</div>
}

export default DogForm
