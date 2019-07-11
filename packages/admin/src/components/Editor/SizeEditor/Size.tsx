import React from 'react'
import EditableDiv from '../EditableDiv'

interface Props {
  size: string
  onChange: (size: string) => void
}

export default ({ size, onChange }: Props) => {
  return (
    <EditableDiv
      text={size}
      onChange={(text: string) => {
        onChange(text)
      }}
    />
  )
}
