import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import queryString, { ParsedQuery } from 'query-string'
import Container from 'components/Common/Container'
import CategoryList, { CategoryListTypes } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import { PostItemType } from 'types/PostItem.types'

type CategoriesType = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostItemType[]
    }
    file: {
      publicURL: string
    }
  }
}

function CategoriesPage({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}: CategoriesType) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
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
    <Container
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Container>
  )
}

export default CategoriesPage

export const getCategories = graphql`
  query getCategories {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: { frontmatter: { categories: { ne: null } } }
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
      publicURL
    }
  }
`
