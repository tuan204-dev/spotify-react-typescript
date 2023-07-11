import { getAccessToken, searchData } from '@/utils/fetchData'
import { ReactNode, FC, createContext, useState, useEffect } from 'react'
interface SearchProviderProps {
  children: ReactNode
}

interface SearchContext {
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>
  data: any
  query: string | undefined
}

export const SearchContext = createContext({} as SearchContext)

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string | undefined>('')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await searchData({
        query: query,
        accessToken: token,
        market: 'VN',
      })

      setData({ ...data })
    }
    if (query) {
      fetchData()
    } else {
      setData(null)
    }
  }, [query])

  return (
    <SearchContext.Provider value={{ query, setQuery, data }}>
      {children}
    </SearchContext.Provider>
  )
}
