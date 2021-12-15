import React from 'react'
import styled from '@emotion/styled'

function Footer() {
  return (
    <FooterWrapper>
      Thank you Visiting Leeblog 😆
      <br />© 2021 Developer Leejy001, Powered By Gatsby.
    </FooterWrapper>
  )
}

export default Footer

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
