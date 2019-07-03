import React, { useEffect } from 'react'

export const useOutsideClickDetector = (
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
