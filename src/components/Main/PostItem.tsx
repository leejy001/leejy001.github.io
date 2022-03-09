import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'

function PostItem({
  title,
  date,
  categories,
  summary,
  link,
}: PostFrontmatterType & { link: string }) {
  return (
    <PostItemWrapper to={link}>
      <React.Fragment>
        <ContentWrapper>
          <PostItemContent>
            <Title>{title}</Title>
            <Date>{date}</Date>
            <Category>
              {categories.map(category => (
                <CategoryItem key={category}>{category}</CategoryItem>
              ))}
            </Category>
            <Summary>{summary}</Summary>
          </PostItemContent>
        </ContentWrapper>
      </React.Fragment>
    </PostItemWrapper>
  )
}

export default PostItem

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  transition: 0.3s box-shadow;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-cramp: 2;
  -webkit-box-orient: vertical;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Date = styled.div`
  font-size: 15px;
  font-weight: 400;
  opacity: 0.7;
`

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin: 10px -5px;
`

const CategoryItem = styled.div`
  margin: 2.5px 5px;
  padding: 3px 5px;
  border-radius: 3px;
  background: #08c1ce;
  font-size: 14px;
  font-weight: 700;
  color: white;
`

const Summary = styled.div`
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  opacity: 0.8;
`
