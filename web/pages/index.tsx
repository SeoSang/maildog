import React from 'react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

import { isMainInputModalOpenAtom } from '@/src/atom/modal'
import HomeButton from '@/src/components/HomeButton'
import LogoutButton from '@/src/components/LogoutButton'
import MainForm from '@/src/components/MainForm'
import { BackgroundDiv } from '@/src/style/div'

import InputModal from '../src/components/InputModal'

const MainImageContainer = styled(BackgroundDiv)`
  display: flex;
  font-size: 30px;
  z-index: -1;
  align-items: center;
  justify-content: center;
`
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
`

export default function Index() {
  const [visible, setVisible] = useAtom(isMainInputModalOpenAtom)

  return (
    <>
      <ButtonContainer>
        <HomeButton />
        <Button
          onClick={() => {
            setVisible((prev) => !prev)
          }}>
          {visible ? <ViewOffIcon /> : <ViewIcon />}
        </Button>
        <LogoutButton />
      </ButtonContainer>
      <InputModal />
      <MainImageContainer>
        <MainImage
          src="/main.jpg"
          alt="강아지들!"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <TitleContainer>
          <MainForm />
        </TitleContainer>
      </MainImageContainer>
    </>
  )
}

const MainImage = styled(Image)`
  animation: ${fadeIn} 8s;
  -moz-animation: ${fadeIn} 8s; /* Firefox */
  -webkit-animation: ${fadeIn} 8s; /* Safari and Chrome */
  -o-animation: ${fadeIn} 8s; /* Opera */
  opacity: 0.6;
`

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  gap: 10px;
  top: 10px;
  left: 10px;
  z-index: 100;
`
