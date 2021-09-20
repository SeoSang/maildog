import styled from 'styled-components'

type WrapToCardPropsType = {
  bgColor?: string
}

export const WrapToCard = styled.div`
  background-color: ${(props: WrapToCardPropsType) =>
    props.bgColor ?? 'whitesmoke'};
  padding: 2rem;
  border-radius: 13%;
  box-shadow: 5px 5px 5px gray;
`
