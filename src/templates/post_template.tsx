import { graphql } from 'gatsby'
import React from 'react'
import { PostFrontmatterType } from 'types/PostItem.types'
import Template from '../components/Common/Container'
import PostHead from '../components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import Comment from 'components/Post/Comment'

export type PostPageItemType = {
  node: {
    html: string
    frontmatter: PostFrontmatterType
  }
}

type PostTemplateType = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
}

function PostTemplate({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostTemplateType) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]
  return (
    <Template>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostContent html={html} />
      <Comment />
    </Template>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
