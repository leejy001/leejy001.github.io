import React from 'react'
import styled from '@emotion/styled'
import GlobalStyle from '../theme/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import CategoryList from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import Footer from 'components/Common/Footer'
import { graphql } from 'gatsby'
import { PostItemType } from 'types/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
}

type IndexPostsType = {
  data: {
    allMarkdownRemark: {
      edges: PostItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

function Index({
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}: IndexPostsType) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <PostList posts={edges} />
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

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`
