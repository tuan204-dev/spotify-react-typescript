import { useEffect, useState } from 'react'

const useEllipsisVertical = (e: HTMLElement) => {
  const [isActive, setActive] = useState<boolean>(false)
  useEffect(() => {
    if (e?.offsetHeight < e?.scrollHeight) {
      setActive(true)
    }
  }, [e?.offsetHeight, e?.scrollHeight])

  if (isActive) return true
  return false
}

export default useEllipsisVertical
