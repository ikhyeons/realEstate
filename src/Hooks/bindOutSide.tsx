import { useEffect } from 'react'

export const useBindClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: (e: React.MouseEvent) => void,
) => {
  useEffect(() => {
    // Invoke Function onClick outside of element
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside(e)
      }
    }
    document.addEventListener('mousedown', handleClickOutside) // bind
    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // dispose
    }
  }, [ref, onClickOutside])
}

export default useBindClickOutside
