import trackApi from '@/APIs/trackApi'
import { FC, ReactNode, createContext, useEffect, useMemo, useRef, useState } from 'react'
import { ArtistData, RapidTrack, SpotifyTrack } from '../../types'
import rapidDataD from '../assets/data/initTrackRapid.json'

interface PlayBarData {
  trackName?: string
  thumb?: string
  artists?: ArtistData[]
  albumId?: string
}

interface PlayerProviderProps {
  children: ReactNode
}

interface ReturnData {
  duration?: number
  playBarData?: PlayBarData
}

interface PlayerContext extends ReturnData {
  id?: string
  handlePlay: () => void
  handlePause: () => void
  audioRef: React.MutableRefObject<any>
  isPlaying: boolean
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  intervalIdRef: any
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | undefined>('')
  const [spotifyData, setSpotifyData] = useState<SpotifyTrack>({})
  const [rapidData] = useState<RapidTrack>(rapidDataD)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
// ---------------Queue list----------------
  // const [queue, setQueue] = useState<any>()




// -----------------------------------------
  const intervalIdRef = useRef<any>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await trackApi({ id })
      setSpotifyData(data)
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const audioRef = useRef<any>(new Audio(rapidData?.soundcloudTrack?.audio?.[0]?.url))

  useEffect(() => {
    handlePause()
    audioRef.current = new Audio(rapidData?.soundcloudTrack?.audio?.[0]?.url)
  }, [id])

  useEffect(() => {
    audioRef.current.currentTime = currentTime
  }, [currentTime])

  const handlePlay = () => {
    audioRef.current.play()
    setPlaying(true)
  }

  const handlePause = () => {
    audioRef.current.pause()
    setPlaying(false)
  }

  const returnData = useMemo(() => {
    return {
      duration: audioRef.current?.duration,
      playBarData: {
        trackName: spotifyData?.name,
        thumb: spotifyData?.album?.images?.[spotifyData?.album?.images?.length - 1]?.url,
        albumId: spotifyData?.album?.id,
        artists: spotifyData?.artists,
      },
    }
  }, [spotifyData, rapidData, id])

  return (
    <PlayerContext.Provider
      value={{
        id,
        handlePlay,
        handlePause,
        audioRef,
        isPlaying,
        ...returnData,
        setId,
        setCurrentTime,
        intervalIdRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
