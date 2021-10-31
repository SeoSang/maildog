import Image from 'next/image'
import styled from 'styled-components'
import MainForm from 'src/components/MainForm'

import InputModal from '../components/InputModal'

const MainImageContainer = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  font-size: 30px;
  z-index: -1;
  align-items: center;
  justify-content: center;
  /* background-color: pink; */
`
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const MainImage: any = styled(Image)`
  z-index: -1;
  opacity: 0.6;
`

export default function Index() {
  return (
    <>
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
