import React, { useRef, useEffect } from 'react'
import { styled } from '@beanovia/theme'

interface Props {
  onChange: () => void
  children: JSX.Element
}

const useOutsideClickDetector = (
  ref: React.MutableRefObject<HTMLDivElement>,
  onChange: () => void
) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref!.current.contains(event.target as Node)) {
      onChange()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.addEventListener('mousedown', handleClickOutside)
    }
  })
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
