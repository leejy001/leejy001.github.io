import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { PostItemType } from 'types/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import quertString, { ParsedQuery } from 'query-string'
import GlobalStyle from '../theme/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import CategoryList, { CategoryListTypes } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import Footer from 'components/Common/Footer'

type IndexPostsType = {
  location: {
    search: string
  }
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
  location: { search },
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}: IndexPostsType) {
  const parsed: ParsedQuery<string> = quertString.parse(search)
  console.log(search.category)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListTypes['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostItemType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })
          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )
  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
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
