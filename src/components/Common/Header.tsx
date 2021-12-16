import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <HeaderWrapper>
      <Wrapper>
        <Inner>
          <Link to="/">
            <p>LeeBlog</p>
          </Link>
          <Link to="/categories">
            <IconWrapper>
              <FontAwesomeIcon icon={faBookmark} color="#08c1ce" />
              <p>카테고리</p>
            </IconWrapper>
          </Link>
        </Inner>
        <Inner>
          <LinkIconWrapper>
            <a
              href="https://github.com/leejy001"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FontAwesomeIcon icon={faGithub} color="#08c1ce" />
            </a>
          </LinkIconWrapper>
        </Inner>
      </Wrapper>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
  padding: 10px 30px;
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  border-bottom: 1px solid rgb(230, 230, 230);
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconWrapper = styled.div`
  display: flex;
  margin-top: 7px;
  margin-left: 30px;
  p {
    margin-left: 3px;
    margin-top: -1px;
    font-size: 15px;
  }
`

const LinkIconWrapper = styled.div``
