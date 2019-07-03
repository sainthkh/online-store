import React, { useRef } from 'react'
import { styled } from '@beanovia/theme'
import { useOutsideClickDetector } from './hooks'

interface Props {
  onChange: () => void
  children: React.ReactNode
}

export default ({ onChange, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null!)
  useOutsideClickDetector(ref, onChange)

  return <Wrap ref={ref}>{children}</Wrap>
}

const Wrap = styled.div({
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 2,
})
