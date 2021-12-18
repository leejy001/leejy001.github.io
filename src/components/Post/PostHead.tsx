import React from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import PostHeadInfo, { PostHeadInfoType } from './PostHeadInfo'

type GatsbyImgType = {
  image: IGatsbyImageData
  alt: string
  className?: string
}

type PostHeadType = PostHeadInfoType & {
  thumbnail?: IGatsbyImageData
}

function PostHead({ title, date, categories, thumbnail }: PostHeadType) {
  return (
    <PostHeadWrapper>
      {thumbnail && <BackgroundImage image={thumbnail} alt="thumnail" />}
      <PostHeadInfo title={title} date={date} categories={categories} />
    </PostHeadWrapper>
  )
}

export default PostHead

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`

const BackgroundImage = styled((props: GatsbyImgType) => (
  <GatsbyImage {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);

  @media (max-width: 768px) {
    height: 300px;
  }
`
