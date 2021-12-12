import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'

type PostTemplateType = {}

// function PostTemplate(props: PostTemplateType) {
//   console.log(props)

//   return <div>Post Template</div>
// }

// export default PostTemplate

const PostTemplate: FunctionComponent<PostTemplateType> = function (props) {
  console.log(props)

  return <div>Post Template</div>
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
