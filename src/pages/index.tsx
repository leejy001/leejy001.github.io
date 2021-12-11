import React from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '../theme/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import CategoryList from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import Footer from 'components/Common/Footer'

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}

function Index() {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <PostList />
      <Footer />
    </Container>
  )
}

export default Index

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
