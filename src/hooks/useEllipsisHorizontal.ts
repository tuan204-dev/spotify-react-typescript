import { useEffect, useState } from 'react'

const useEllipsisHorizontal = (e: HTMLElement, dependency?: any) => {
  const [isActive, setActive] = useState<boolean>(false)

  useEffect(() => {
    setActive(false)
  }, [dependency])

  useEffect(() => {
    if (e?.offsetWidth < e?.scrollWidth) {
      setActive(true)
    }
  }, [e?.offsetWidth, e?.scrollWidth])

  if (isActive) return true
  return false
}

export default useEllipsisHorizontal
