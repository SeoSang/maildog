import styled from 'styled-components'

import { MAIN_PINK, MAIN_SKY_BLUE } from '@/src/style/theme'

interface FlexDivProps {
  background?: string
  width?: string
  height?: string
  flex?: string
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  margin?: string
  padding?: string
  gap?: string
}

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(p: FlexDivProps) => (p.direction ? p.direction : 'row')};
  justify-content: ${(p: FlexDivProps) => (p.justify ? p.justify : 'center')};
  align-items: ${(p: FlexDivProps) => (p.align ? p.align : 'center')};
  width: ${(p: FlexDivProps) => (p.width ? p.width : '100%')};
  height: ${(p: FlexDivProps) => (p.height ? p.height : 'auto')};
  background: ${(p: FlexDivProps) => p.background};
  margin: ${(p: FlexDivProps) => (p.margin ? p.margin : 'auto')};
  padding: ${(p: FlexDivProps) => (p.padding ? p.padding : 'auto')};
  gap: ${(p: FlexDivProps) => (p.gap ? p.gap : 'none')};
`

export const BackgroundDiv = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #ffc0cb;
  background-image: linear-gradient(
    45deg,
    ${MAIN_SKY_BLUE} 22%,
    ${MAIN_PINK} 98%
  );
`
