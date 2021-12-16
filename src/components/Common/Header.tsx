import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <p>LeeBlog</p>
      </Link>
      <Link to="/categories">카테고리</Link>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  padding: 20px 50px;
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
