import React from 'react'

interface Props {
  size: string
}

export default ({ size }: Props) => {
  return <div>{size}</div>
}
