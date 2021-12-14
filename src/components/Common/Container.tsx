import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '../../theme/GlobalStyle'
import Footer from './Footer'

type ContainerType = {
  children: ReactNode
}

function Container({ children }: ContainerType) {
  return (
    <ContainerWrapper>
      <GlobalStyle />
      {children}
      <Footer />
    </ContainerWrapper>
  )
}

export default Container

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
