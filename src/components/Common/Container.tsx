import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import GlobalStyle from '../../theme/GlobalStyle'
import Footer from './Footer'

type ContainerType = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

function Container({
  title,
  description,
  url,
  image,
  children,
}: ContainerType) {
  return (
    <ContainerWrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="leejy001" />
        <meta name="twitter:creator" content="leejy001" />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer />
    </ContainerWrapper>
  )
}

export default Container

const ContainerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`
