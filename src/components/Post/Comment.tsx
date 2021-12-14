import React, { createRef, useEffect } from 'react'
import styled from '@emotion/styled'

const src = 'https://utteranc.es/client.js'
const repo = 'leejy001/leeblog'

type UtteranceAttributesType = {
  src: string
  repo: string
  'issue-term': string
  label: string
  theme: string
  crossorigin: string
  async: string
}

function Comment() {
  const element = createRef<HTMLDivElement>()

  useEffect(() => {
    if (element.current === null) return
    const utterance: HTMLScriptElement = document.createElement('script')

    const attributes: UtteranceAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterance.setAttribute(key, value)
    })

    element.current.appendChild(utterance)
  }, [])

  return <CommentWrapper ref={element} />
}

export default Comment

const CommentWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`
