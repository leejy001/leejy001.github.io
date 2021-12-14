import React, { createRef, useEffect } from 'react'

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

  return <div ref={element} />
}

export default Comment
