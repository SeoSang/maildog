import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import MainForm from '@/src/components/MainForm'
import { BackgroundDiv } from '@/src/style/div'
import LogoutButton from '@/src/components/LogoutButton'

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

const MainImage: any = styled(Image)`
  animation: ${fadeIn} 8s;
  -moz-animation: ${fadeIn} 8s; /* Firefox */
  -webkit-animation: ${fadeIn} 8s; /* Safari and Chrome */
  -o-animation: ${fadeIn} 8s; /* Opera */
  opacity: 0.6;
`

export default function Index() {
  return (
    <>
      <InputModal />
      <LogoutButton />
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
