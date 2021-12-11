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
          to={`/?Category=${name}`}
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
  margin: 100px auto 0;
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
`
