import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { PostItemType } from 'types/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import quertString, { ParsedQuery } from 'query-string'
import Introduction from 'components/Main/Introduction'
import CategoryList, { CategoryListTypes } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import Container from 'components/Common/Container'

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
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Container>
  )
}

export default Index

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
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
