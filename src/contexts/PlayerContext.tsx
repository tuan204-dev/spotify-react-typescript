import { getAudioTrack, getTrackRecommendation } from '@/apis/trackApi'
import { ArtistData } from '@/types/artist'
import { SpotifyTrack } from '@/types/track'
import { FC, ReactNode, createContext, useEffect, useMemo, useRef, useState } from 'react'

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
  setCurrentTrack: React.Dispatch<React.SetStateAction<SpotifyTrack | undefined>>
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  setQueue: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setReady: React.Dispatch<React.SetStateAction<boolean>>
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setUserClicked: React.Dispatch<React.SetStateAction<boolean>>
  handlePlay: () => void
  handlePause: () => void
  handleForward: () => void
  handleBack: () => void
  audioRef: React.MutableRefObject<any>
  isPlaying: boolean
  intervalIdRef: any
  currentTrack: SpotifyTrack | undefined
  queue: SpotifyTrack[]
  fakeCurrentIndex?: number
  currentTrackIndex: number
  isReady: boolean
  userClicked: boolean
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [audioData, setAudioData] = useState<any>()
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [isReady, setReady] = useState<boolean>(false)
  const [userClicked, setUserClicked] = useState<boolean>(false)

  // ---------------Queue list----------------
  const [queue, setQueue] = useState<SpotifyTrack[]>([
    JSON.parse(localStorage.getItem('spotify_current_track') as string),
  ])
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | undefined>(
    JSON.parse(localStorage.getItem('spotify_current_track') as string)
  )

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem('spotify_current_track', JSON.stringify(currentTrack))
    }
    if (currentTrackIndex >= queue.length - 1 && currentTrack) {
      const getRecommendation = async () => {
        const data = await getTrackRecommendation({
          seed_artists: currentTrack?.artists?.[0]?.id as string,
          seed_tracks: currentTrack?.id,
        })

        setQueue((prev) => [...prev, ...data])
      }
      getRecommendation()
    }
  }, [currentTrack])

  // -----------------------------------------------
  const intervalIdRef = useRef<any>()

  const audioRef = useRef<any>(new Audio())

  useMemo(() => {
    if (audioData) {
      audioRef.current.src = audioData.audioLink
    }
  }, [audioData])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAudioTrack(
        `${currentTrack?.name} ${
          currentTrack?.artists?.[currentTrack?.artists?.length - 1]?.name
        }`
      )
      console.log(currentTrack, queue)
      setAudioData(data)
    }
    handlePause()
    setReady(false)
    if (queue.filter((item) => item).length !== 0) {
      fetchData()
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
  }, [currentTime])

  const handlePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  const handlePause = () => {
    // if (!audioRef.current?.paused) {
    audioRef.current.pause()
    setPlaying(false)
    // }
  }

  const handleBack = () => {
    // console.log('backed')
    handlePause()
    if (currentTrackIndex > 0) {
      setCurrentTrack({ ...queue[currentTrackIndex - 1] })
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
    setCurrentTime(0)
  }

  const handleForward = () => {
    if (currentTrackIndex < queue.length - 1) {
      handlePause()
      setCurrentTrack({ ...queue[currentTrackIndex + 1] })
      setCurrentTrackIndex(currentTrackIndex + 1)
      setCurrentTime(0)
    }
  }

  useEffect(() => {
    audioRef.current.volume = localStorage.getItem('spotify_volume')
      ? JSON.parse(localStorage.getItem('spotify_volume') as string)
      : 1
  }, [])

  const returnData = useMemo(() => {
    return {
      duration: audioData?.durationMs / 1000,
      playBarData: {
        trackName: currentTrack?.name,
        thumb:
          currentTrack?.album?.images?.[currentTrack?.album?.images?.length - 1]?.url,
        albumId: currentTrack?.album?.id,
        artists: currentTrack?.artists,
      },
    }
  }, [currentTrack, audioData])

  audioRef.current.onloadeddata = () => {
    if (userClicked) {
      setReady(true)
      setPlaying(true)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        handlePlay,
        handlePause,
        setCurrentTime,
        setCurrentTrack,
        setQueue,
        setCurrentTrackIndex,
        handleForward,
        handleBack,
        setPlaying,
        setReady,
        setUserClicked,
        audioRef,
        isPlaying,
        intervalIdRef,
        currentTrack,
        queue,
        currentTrackIndex,
        isReady,
        userClicked,
        ...returnData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
