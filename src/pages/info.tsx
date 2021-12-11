import React from 'react'
import { graphql } from 'gatsby'
import Text from 'components/Text'

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

function InfoPage({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}: InfoPageProps) {
  return (
    <div>
      <Text text={title} />
      <Text text={description} />
      <Text text={author} />
    </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
