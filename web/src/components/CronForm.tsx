import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { MAIN_PINK } from '@/src/style/theme'
import PageContainer from '@/src/components/PageContainer'
import useResponisveWidth from '@/src/hooks/useResponisveWidth'
import { Schedule, Service } from '@/server/types/constant'
import { registerCron } from '@/src/request/cron'
import { useRouter } from 'next/router'

import { MainFormContext } from '../hooks/useMainFormContext'
import { WrapToCard } from '../style'

const CronForm = () => {
  const router = useRouter()
  const { selectedBreeds, prevPage, user } = useContext(MainFormContext)
  const [service, setService] = useState<Service>(Service.Email)
  const [schedule, setSchedule] = useState<Schedule>(Schedule.Daily)
  const [count, setCount] = useState<number>(1)
  const { isLargerThanSM } = useResponisveWidth()

  const breedIdList = selectedBreeds.map((breed) => breed?.id)

  useEffect(() => {}, [])

  const onChangeService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setService(event.target.value as Service)
  }

  const onChangeSchedule = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSchedule(event.target.value as Schedule)
  }

  const onChangeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(parseInt(event.target.value))
  }

  const onClickOkButton = async () => {
    if (!user?.id) {
      return alert('로그인이 안되었거나 잘못된 유저 정보입니다!')
    }
    if (!(breedIdList.length > 0)) {
      return alert('강아지를 골라주세요!')
    }

    const props = {
      userId: user.id,
      count,
      schedule,
      type: service,
      breedIdList,
    }
    const res = await registerCron(props)
    alert(res.message)
    if (res.success) {
      router.push('/')
    }
  }

  return (
    <>
      <WrapToCard>
        <FormControl id="CronForm">
          <FormLabel>Choose a Service</FormLabel>
          <Select
            bg={MAIN_PINK}
            style={{ width: isLargerThanSM ? 300 : 200 }}
            borderColor={MAIN_PINK}
            // placeholder={Service.Email}
            variant="filled"
            onChange={onChangeService}>
            <option value={Service.Email}>{Service.Email}</option>
          </Select>
          <br />
          <FormLabel>Choose a Schedule</FormLabel>
          <Select
            bg={MAIN_PINK}
            style={{ width: isLargerThanSM ? 300 : 200 }}
            borderColor={MAIN_PINK}
            variant="filled"
            onChange={onChangeSchedule}>
            <option value={Schedule.Daily}>{Schedule.Daily}</option>
            <option value={Schedule.ThreeDaily}>{Schedule.ThreeDaily}</option>
            <option value={Schedule.Weekly}>{Schedule.Weekly}</option>
          </Select>
          <br />
          <FormLabel>Choose how-many picture per Dog</FormLabel>
          <Select
            bg={MAIN_PINK}
            style={{ width: isLargerThanSM ? 300 : 200 }}
            borderColor={MAIN_PINK}
            variant="filled"
            onChange={onChangeCount}>
            <option value={1}>{1}</option>
            <option value={2}>{2}</option>
            <option value={3}>{3}</option>
          </Select>
          <Button style={{ marginTop: '0.5rem' }} onClick={onClickOkButton}>
            OK
          </Button>
        </FormControl>
        <PageContainer prevPage={prevPage} />
      </WrapToCard>
    </>
  )
}

export default CronForm
