import useComponentSize from "@/hooks/useComponentSize";
import React, { createContext, useRef } from "react";

interface MainSizeProps {
  children: React.ReactNode
}

interface MainSizeContext {
  width: number
  height: number
}

export const MainSizeContext = createContext({} as MainSizeContext)

export const MainSizeProvider: React.FC<MainSizeProps> = ({children}) => {

  const mainRef = useRef<HTMLDivElement>(null)

  const size = useComponentSize(mainRef)

  return (
    <div ref={mainRef}>
      <MainSizeContext.Provider value={{...size}}>
        {children}
      </MainSizeContext.Provider>
    </div>
  )
}