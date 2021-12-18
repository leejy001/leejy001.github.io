import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type CategoryListTypes = {
  selectedCategory: string
  categoryList: { [key: string]: number }
}

type CategoryItemTypes = {
  active: boolean
}

type GatsbyLinkTypes = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemTypes

function CategoryList({ selectedCategory, categoryList }: CategoryListTypes) {
  return (
    <CategoryListWrapper>
      <Wrapper>
        {Object.entries(categoryList).map(([name, count]) => (
          <CategoryItem
            to={`?category=${name}`}
            active={name === selectedCategory}
            key={name}
          >
            {name}
            <span>{count}</span>
          </CategoryItem>
        ))}
      </Wrapper>
    </CategoryListWrapper>
  )
}

export default CategoryList

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1024px;
  margin: 15px auto 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`

const CategoryItem = styled(({ active, ...props }: GatsbyLinkTypes) => (
  <Link {...props} />
))<CategoryItemTypes>`
  background-color: #08c1ce;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;
  &:last-of-type {
    margin-right: 0;
  }
  span {
    background-color: white;
    padding: 0 5px;
    border-radius: 5px;
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
