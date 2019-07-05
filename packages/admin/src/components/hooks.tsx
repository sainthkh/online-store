import React, { useEffect } from 'react'

export const useOutsideClickDetector = (
  ref: React.MutableRefObject<HTMLDivElement>,
  onClose: () => void
) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref!.current.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.addEventListener('mousedown', handleClickOutside)
    }
  })
}
