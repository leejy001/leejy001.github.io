import React from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

const GlobalStyle = () => {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
