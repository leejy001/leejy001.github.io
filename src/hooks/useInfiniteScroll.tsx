import React, {
  MutableRefObject,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { PostItemType } from 'types/PostItem.types'

const PERPAGE = 10

export type InfiniteScrollType = {
  itemRef: MutableRefObject<HTMLDivElement | null>
  postList: PostItemType[]
}

export function useInfiniteScroll(
  selectedCategory: string,
  posts: PostItemType[],
): InfiniteScrollType {
  const itemRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null)

  const [count, setCount] = useState<number>(1)

  const postListCategory = useMemo<PostItemType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostItemType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  )

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return
      setCount(value => value + 1)
      observer.unobserve(entries[0].target)
    })
  }, [])

  useEffect(() => setCount(1), [selectedCategory])

  useEffect(() => {
    if (
      PERPAGE * count >= postListCategory.length ||
      itemRef.current === null ||
      itemRef.current.children.length === 0 ||
      observer.current === null
    )
      return

    observer.current.observe(
      itemRef.current.children[itemRef.current.children.length - 1],
    )
  }, [count, selectedCategory])

  return { itemRef, postList: postListCategory.slice(0, count * PERPAGE) }
}
