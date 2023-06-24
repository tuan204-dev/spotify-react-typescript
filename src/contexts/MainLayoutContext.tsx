import useComponentSize from '@/hooks/useComponentSize'
import React, { FC, createContext, useRef } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

interface MainLayoutContext {
  height: number
  width: number
}

export const MainLayoutContext = createContext({} as MainLayoutContext)

export const MainLayoutProvider: FC<MainLayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null)

  const size = useComponentSize(mainRef)
  // console.log('im here 2')

  return (
    <div ref={mainRef}>
      <MainLayoutContext.Provider value={{ ...size }}>
        {children}
      </MainLayoutContext.Provider>
    </div>
  )
}
