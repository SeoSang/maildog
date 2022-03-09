import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { MAIN_PINK } from '@/src/style/theme'
import PageContainer from '@/src/components/PageContainer'
import useResponisveWidth from '@/src/hooks/useResponisveWidth'

import { MainFormContext } from '../hooks/useMainFormContext'
import { WrapToCard } from '../style'

enum Service {
  Email = 'Email',
  KakaoTalk = 'KakaoTalk',
}

enum Schedule {
  Daily = 'Daily',
  ThreeDaily = 'ThreeDaily',
  Weekly = 'Weekly',
}

const CronForm = () => {
  const { selectedBreeds, prevPage } = useContext(MainFormContext)
  const [service, setService] = useState<Service>(Service.Email)
  const [schedule, setSchedule] = useState<Schedule>(Schedule.Daily)
  const [count, setCount] = useState<number>(1)
  const { isLargerThanSM } = useResponisveWidth()

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

  const onClickOkButton = () => {
    console.log({
      type: service,
      schedule,
      breedIdList: selectedBreeds.map((breed) => breed?.id),
      count,
    })
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
            placeholder="Service"
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
            placeholder="Schedule"
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
            placeholder="count"
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
