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
  trending?: SectionProps
  mood?: SectionProps
  focus?: SectionProps
  jazz?: SectionProps
  chill?: SectionProps
  greetingAlbum?: ResponseSectionItem[]
}

export const HomePageContext = createContext({} as HomePageContext)

export const HomePageProvider: FC<HomePageProviderProps> = ({ children }) => {
  const [greetingAlbum, setGreetingAlbum] = useState<ResponseSectionItem[]>([])
  const [featurePlaylist, setFeaturePlaylist] = useState<SectionProps>()
  const [newReleases, setNewRelease] = useState<SectionProps>()
  const [topMixes, setTopMixes] = useState<SectionProps>()
  const [suggestArtists, setSuggestArtists] = useState<SectionProps>()
  const [trending, setTrending] = useState<SectionProps>()
  const [mood, setMood] = useState<SectionProps>()
  const [focus, setFocus] = useState<SectionProps>()
  const [jazz, setJazz] = useState<SectionProps>()
  const [chill, setChill] = useState<SectionProps>()

  useEffect(() => {
    fetchHomePageData({ type: 'newRelease', setData: setNewRelease })
    fetchHomePageData({ type: 'featuredPlaylists', setData: setFeaturePlaylist })
    fetchHomePageData({ type: 'topMixes', setData: setTopMixes })
    fetchHomePageData({ type: 'suggestedArtists', setData: setSuggestArtists })
    fetchHomePageData({
      type: 'category',
      categoryId: '0JQ5DAqbMKFQIL0AXnG5AK',
      categoryName: 'Trending',
      setData: setTrending,
    })
    fetchHomePageData({
      type: 'category',
      categoryId: '0JQ5DAqbMKFzHmL4tf05da',
      categoryName: 'Mood',
      setData: setMood,
    })
    fetchHomePageData({
      type: 'category',
      categoryId: '0JQ5DAqbMKFCbimwdOYlsl',
      categoryName: 'Focus',
      setData: setFocus,
    })
    fetchHomePageData({
      type: 'category',
      categoryId: '0JQ5DAqbMKFAJ5xb0fwo9m',
      categoryName: 'Jazz',
      setData: setJazz,
    })
    fetchHomePageData({
      type: 'category',
      categoryId: '0JQ5DAqbMKFFzDl7qN9Apr',
      categoryName: 'Chill',
      setData: setChill,
    })
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
      value={{
        featurePlaylist,
        newReleases,
        topMixes,
        suggestArtists,
        greetingAlbum,
        trending,
        mood,
        focus,
        jazz,
        chill,
      }}
    >
      {children}
    </HomePageContext.Provider>
  )
}
