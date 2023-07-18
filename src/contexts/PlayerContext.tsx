import trackApi from '@/APIs/trackApi'
import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { ArtistData, RapidTrack, SpotifyTrack } from '../../types'

interface PlayBarData {
  trackName?: string
  thumb?: string
  artists?: ArtistData[]
  albumId?: string
}

interface PlayerProviderProps {
  children: ReactNode
}

interface PlayerContext {
  playBarData?: PlayBarData
  id?: string
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
  isPlaying?: boolean
  handlePlay: () => void
  handlePause: () => void
  durationText?: string
  durationMs?: number
  setTrackProcess: React.Dispatch<React.SetStateAction<number>>
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | undefined>('')
  const [spotifyData, setSpotifyData] = useState<SpotifyTrack>()
  const [rapidData, setRapidData] = useState<RapidTrack>()
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [trackProcess, setTrackProcess] = useState<number>(0)

  useEffect(() => {
    const fetchSpotifyData = async () => {
      const response = await fetch('http://localhost:5000/data/initTrack.json')
      const data = await response.json()
      setSpotifyData(data)
    }

    const fetchRapidData = async () => {
      const response = await fetch('http://localhost:5000/data/initTrackRapid.json')
      const data = await response.json()
      setRapidData(data)
    }
    handlePause()
    fetchSpotifyData()
    fetchRapidData()
  }, [id])

  const audioRef = useRef<any>(new Audio(rapidData?.soundcloudTrack?.audio?.[0]?.url))

  useEffect(() => {
    audioRef.current = new Audio(rapidData?.soundcloudTrack?.audio?.[0]?.url)
  }, [id])

  const handlePlay = useCallback(() => {
    audioRef.current?.play()
    setPlaying(true)
  }, [id])

  const handlePause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [id])

  const contextValue = useMemo(() => {
    return {
      durationText: rapidData?.soundcloudTrack?.audio?.[0]?.durationText,
      durationMs: rapidData?.soundcloudTrack?.audio?.[0]?.durationMs,
      isPlaying: isPlaying,
      id: id,
      setId: setId,
      handlePlay: handlePlay,
      handlePause: handlePause,
      playBarData: {
        trackName: spotifyData?.name,
        thumb: spotifyData?.album?.images?.[0]?.url,
        artists: spotifyData?.artists,
        albumId: spotifyData?.album?.id,
      },
      setTrackProcess: setTrackProcess,
    }
  }, [rapidData, spotifyData, isPlaying, id])

  return (
    <PlayerContext.Provider value={{ ...contextValue }}>
      {children}
    </PlayerContext.Provider>
  )
}
