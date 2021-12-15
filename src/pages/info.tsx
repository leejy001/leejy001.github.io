import React from 'react'
import { graphql } from 'gatsby'

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
  return <div></div>
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
