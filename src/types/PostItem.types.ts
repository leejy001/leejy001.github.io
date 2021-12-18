import { IGatsbyImageData } from 'gatsby-plugin-image'

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  summary: string
  showThumbnail: boolean
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
    publicURL: string
  }
}

export type PostItemType = {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: PostFrontmatterType
  }
}
