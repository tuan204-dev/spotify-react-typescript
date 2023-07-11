import { fetchArtistData } from '@/utils/fetchData'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface ArtistProviderProps {
  children: ReactNode
}

interface ArtistContext {
  profile: {
    id: string | undefined
    name: string | undefined
    bio: string | undefined
    isVerified: boolean | undefined
  }
  avatarImg: string | undefined
  headerImg: string | undefined
  colorRaw: string | undefined
  stats: {
    followerNumbers: number | undefined
    monthlyListeners: number | undefined
  }
  topTracks: any[] | undefined
  discography: {
    popularReleases: any[] | undefined
    albums: any[] | undefined
    singles: any[] | undefined
  }
  playlists: any[] | undefined
  featuring: any[] | undefined
  relatedArtists: any[] | undefined
  discoveredOn: any[] | undefined
  aboutImg: string
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
  isLoading: boolean
  visuals: any
}

export const ArtistContext = createContext({} as ArtistContext)

export const ArtistProvider: FC<ArtistProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | undefined>('')
  const [responseData, setResponseData] = useState<any>()
  const [artistData, setArtistData] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const regex = /^\/artist\//

  const { pathname } = useLocation()

  useEffect(() => {
    if (!regex.test(pathname)) {
      setArtistData(undefined)
      setResponseData(undefined)
    }
  }, [id, pathname])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtistData(id)
      setResponseData(data)
    }
    if (id !== '') fetchData()
  }, [id])

  useEffect(() => {
    setArtistData((prev: any) => {
      return {
        ...prev,
        profile: {
          id: responseData?.id,
          name: responseData?.profile?.name,
          bio: responseData?.profile?.biography?.text,
          isVerified: responseData?.profile?.verified,
        },
        headerImg: responseData?.visuals?.headerImage?.sources[0]?.url,
        avatarImg: responseData?.visuals?.avatarImage?.sources[0]?.url,
        colorRaw:
          responseData?.visuals?.headerImage?.extractedColors?.colorRaw ||
          responseData?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex,
        stats: {
          followerNumbers: responseData?.stats?.followers,
          monthlyListeners: responseData?.stats?.monthlyListeners,
        },
        topTracks: responseData?.discography?.topTracks?.items,
        discography: {
          popularReleases: responseData?.discography?.popularReleases.items,
          albums: responseData?.discography?.albums.items,
          singles: responseData?.discography?.singles.items,
        },
        playlists: responseData?.profile?.playlists?.items,
        featuring: responseData?.relatedContent?.featuring?.items,
        relatedArtists: responseData?.relatedContent?.relatedArtists?.items,
        discoveredOn: responseData?.relatedContent?.featuring?.items,
        aboutImg: responseData?.visuals?.gallery?.items[0]?.sources[0]?.url,
        visuals: responseData?.visuals,
      }
    })
  }, [responseData])

  useEffect(() => {
    setLoading(Boolean(!responseData))
  }, [responseData])

  return (
    <ArtistContext.Provider value={{ ...artistData, setId, isLoading }}>
      {children}
    </ArtistContext.Provider>
  )
}
