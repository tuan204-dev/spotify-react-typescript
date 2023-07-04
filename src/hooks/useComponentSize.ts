import { useEffect, useState, RefObject } from 'react'

interface ComponentSize {
  height: number
  width: number
}

const useComponentSize = (ref: RefObject<HTMLElement>): ComponentSize => {
  const [componentSize, setComponentSize] = useState<ComponentSize>({
    width: -1,
    height: -1,
  })

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { clientHeight, clientWidth } = ref.current
        setComponentSize({ height: clientHeight, width: clientWidth })
      }
    }

    handleResize() // Initial size

    const observer = new ResizeObserver(handleResize)
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref.current?.clientHeight, ref.current?.clientHeight])

  return componentSize
}

export default useComponentSize
