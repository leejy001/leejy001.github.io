import React from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'
import { PostItemType } from 'types/PostItem.types'

type PostListType = {
  posts: PostItemType[]
}

function PostList({ posts }: PostListType) {
  return (
    <PostListWrapper>
      {posts.map(({ node: { id, frontmatter } }: PostItemType) => (
        <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
      ))}
    </PostListWrapper>
  )
}

export default PostList

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;
  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px; 20px;
  }
`
