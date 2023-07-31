import searchApi from '@/apis/searchApi'
import { FC, ReactNode, createContext, useEffect, useState, useRef } from 'react'
interface SearchProviderProps {
  children: ReactNode
}

interface SearchContext {
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>
  data: any
  query: string | undefined
  categoryRef: React.MutableRefObject<string>
  isLoading: boolean
}

export const SearchContext = createContext({} as SearchContext)

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string | undefined>('')
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const categoryRef = useRef<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchApi({
        query: query,
        market: 'VN',
        limit: 19,
      })

      setData({ ...data })
      setLoading(false)
    }
    if (query) {
      setData(null)
      setLoading(true)
      fetchData()
    } else {
      setData(null)
    }
  }, [query])

  return (
    <SearchContext.Provider value={{ query, setQuery, data, categoryRef, isLoading }}>
      {children}
    </SearchContext.Provider>
  )
}
