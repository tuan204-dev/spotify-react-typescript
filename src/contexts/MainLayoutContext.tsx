import useComponentSize from '@/hooks/useComponentSize'
import React, {
  FC,
  createContext,
  useRef,
  useState,
  useEffect,
} from 'react'

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
  const [quantityCol, setQuantityCol] = useState<number>(9)

  const size = useComponentSize(mainRef)

  useEffect(() => {
    if (size.width < 1850) setQuantityCol(8)
    if (size.width < 1650) setQuantityCol(7)
    if (size.width < 1450) setQuantityCol(6)
    if (size.width < 1250) setQuantityCol(5)
    if (size.width < 1000) setQuantityCol(4)
    if (size.width < 700) setQuantityCol(3)
    if (size.width < 500) setQuantityCol(2)
  }, [size.width])

  // console.log('im here 2')

  return (
    <div ref={mainRef}>
      <MainLayoutContext.Provider value={{ ...size, quantityCol }}>
        {children}
      </MainLayoutContext.Provider>
    </div>
  )
}
