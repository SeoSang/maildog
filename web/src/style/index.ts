import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

type WrapToCardPropsType = {
  bgColor?: string
}

export const WrapToCard = styled(Box)`
  z-index: 1;
  background-color: ${(props: WrapToCardPropsType) =>
    props.bgColor ?? 'whitesmoke'};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 5px 5px 5px gray;
`
