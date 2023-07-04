import useComponentSize from '@/hooks/useComponentSize'
import React, { FC, createContext, useRef, useState, useEffect } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

interface MainLayoutContext {
  height: number
  width: number
  quantityCol: number
}

export const MainLayoutContext = createContext({} as MainLayoutContext)

export const MainLayoutProvider: FC<MainLayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const [quantityCol, setQuantityCol] = useState<number>(4)

  const size = useComponentSize(mainRef)

  useEffect(() => {
    if (size.width < 548) setQuantityCol(2)
    else if (size.width < 748) setQuantityCol(3)
    else if (size.width < 1048) setQuantityCol(4)
    else if (size.width < 1248) setQuantityCol(5)
    else if (size.width < 1448) setQuantityCol(6)
    else if (size.width < 1648) setQuantityCol(7)
    else if (size.width < 1868) setQuantityCol(8)
    else setQuantityCol(9)
  }, [size.width])

  return (
    <div ref={mainRef}>
      <MainLayoutContext.Provider value={{ ...size, quantityCol }}>
        {children}
      </MainLayoutContext.Provider>
    </div>
  )
}
