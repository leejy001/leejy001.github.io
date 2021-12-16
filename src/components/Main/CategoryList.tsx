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
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/categories?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          #{name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: auto;
  background-color: red;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`

const CategoryItem = styled(({ active, ...props }: GatsbyLinkTypes) => (
  <Link {...props} />
))<CategoryItemTypes>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;
  &:last-of-type {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
`
