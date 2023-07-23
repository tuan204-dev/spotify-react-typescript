import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { fetchHomePageData } from '@/utils'
import searchApi from '@/apis/searchApi'
import { ResponseSectionItem, SectionProps } from '@/types/section'

interface HomePageProviderProps {
  children: ReactNode
}

interface HomePageContext {
  featurePlaylist?: SectionProps
  newReleases?: SectionProps
  topMixes?: SectionProps
  suggestArtists?: SectionProps
  greetingAlbum?: ResponseSectionItem[]
}

export const HomePageContext = createContext({} as HomePageContext)

export const HomePageProvider: FC<HomePageProviderProps> = ({ children }) => {
  const [greetingAlbum, setGreetingAlbum] = useState<ResponseSectionItem[]>([])
  const [featurePlaylist, setFeaturePlaylist] = useState<SectionProps>()
  const [newReleases, setNewRelease] = useState<SectionProps>()
  const [topMixes, setTopMixes] = useState<SectionProps>()
  const [suggestArtists, setSuggestArtists] = useState<SectionProps>()

  useEffect(() => {
    fetchHomePageData({ type: 'newRelease', setData: setNewRelease })
    fetchHomePageData({ type: 'featuredPlaylists', setData: setFeaturePlaylist })
    fetchHomePageData({ type: 'topMixes', setData: setTopMixes })
    fetchHomePageData({ type: 'suggestedArtists', setData: setSuggestArtists })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchApi({
        query: 'album',
        types: ['album'],
        limit: 50,
      })

      setGreetingAlbum(data?.albums.items)
    }

    fetchData()
  }, [])

  return (
    <HomePageContext.Provider
      value={{ featurePlaylist, newReleases, topMixes, suggestArtists, greetingAlbum }}
    >
      {children}
    </HomePageContext.Provider>
  )
}
