import React from 'react'

type TextProps = {
  text: string
}

function Text({ text }: TextProps) {
  return <div>{text}</div>
}

export default Text
