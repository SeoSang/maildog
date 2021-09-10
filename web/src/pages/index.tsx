import Image from 'next/image'
import { useState } from 'react'
import MainForm from 'src/components/MainForm'
import styled from 'styled-components'

const MainImageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  font-size: 30px;
  z-index: -1;
  align-items: center;
  justify-content: center;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
const MainImage: any = styled(Image)`
  z-index: -1;
  opacity: 0.6;
`
export default function Index() {
  return (
    <>
      <MainImageContainer>
        <MainImage
          src="/main.jpg"
          alt="강아지들!"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <TitleContainer>{<MainForm />}</TitleContainer>
      </MainImageContainer>
    </>
  )
}
