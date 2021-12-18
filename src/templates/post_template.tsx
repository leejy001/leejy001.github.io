import React from 'react'
import { graphql } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'
import Container from '../components/Common/Container'
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
  location: {
    href: string
  }
}

function PostTemplate({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}: PostTemplateType) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        showThumbnail,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0]
  return (
    <Container title={title} description={summary} url={href} image={publicURL}>
      <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      />
      <PostContent html={html} />
      <Comment />
    </Container>
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
            showThumbnail
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`
