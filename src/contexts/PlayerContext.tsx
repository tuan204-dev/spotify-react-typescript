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
  setNextTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>
  handlePlay: () => void
  handlePause: () => void
  handleForward: () => void
  handleBack: () => void
  calNextTrackIndex: () => void
  audioRef: React.MutableRefObject<any>
  prevDocumentTitle: React.MutableRefObject<string>
  isPlaying: boolean
  intervalIdRef: any
  currentTrack: SpotifyTrack | undefined
  queue: SpotifyTrack[]
  fakeCurrentIndex?: number
  currentTrackIndex: number
  isReady: boolean
  userClicked: boolean
  nextTrackIndex: number
  isRepeat: boolean
  isShuffle: boolean
  isBtnClickable: boolean
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [audioData, setAudioData] = useState<any>()
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [nextTrackIndex, setNextTrackIndex] = useState<number>(1)
  const [isReady, setReady] = useState<boolean>(false)
  const [userClicked, setUserClicked] = useState<boolean>(false)
  const [isRepeat, setRepeat] = useState<boolean>(false)
  const [isShuffle, setShuffle] = useState<boolean>(false)
  const [isBtnClickable, setBtnClickable] = useState<boolean>(
    localStorage.getItem('spotify_current_track') !== null
  )

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
          limit: 19,
        })

        setQueue((prev) => [...prev, ...data])
      }
      getRecommendation()
    }
  }, [currentTrack])

  // -----------------------------------------------

  const intervalIdRef = useRef<any>()

  const audioRef = useRef<any>(new Audio())

  const prevDocumentTitle = useRef<string>('')

  useMemo(() => {
    if (audioData) {
      audioRef.current.src = audioData.audioLink
    }
  }, [audioData])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAudioTrack(
        `${currentTrack?.name} ${currentTrack?.artists
          ?.map((artist) => artist?.name)
          .join(' ')} ${
          currentTrack?.album?.album_type?.toLocaleLowerCase() === 'album'
            ? `album ${currentTrack?.album?.name}`
            : ''
        }`
      )
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

  useEffect(() => {
    audioRef.current.volume = localStorage.getItem('spotify_volume')
      ? JSON.parse(localStorage.getItem('spotify_volume') as string)
      : 1
  }, [])

  useEffect(() => {
    calNextTrackIndex()
  }, [currentTrack, isShuffle])

  useEffect(() => {
    if (isBtnClickable) return
    if (localStorage.getItem('spotify_current_track') !== null) setBtnClickable(true)
  }, [queue])

  useEffect(() => {
    if (currentTrack && userClicked) {
      if (isPlaying) {
        prevDocumentTitle.current = window.document.title
        window.document.title = `${currentTrack?.name} • ${currentTrack?.artists?.[0]?.name}`
      } else {
        window.document.title = prevDocumentTitle.current
      }
    }
  }, [currentTrack, isPlaying])

  // -----------------------------------------

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
      setCurrentTrack({ ...queue[nextTrackIndex] })
      setCurrentTrackIndex(nextTrackIndex)
      calNextTrackIndex()
      setCurrentTime(0)
    }
  }

  const calNextTrackIndex = () => {
    if (isShuffle) {
      let randomIndex = currentTrackIndex
      while (randomIndex === currentTrackIndex) {
        randomIndex = Math.floor(Math.random() * queue?.length)
      }
      setNextTrackIndex(randomIndex)
    } else {
      setNextTrackIndex(currentTrackIndex + 1)
    }
  }

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
        setNextTrackIndex,
        setRepeat,
        setShuffle,
        calNextTrackIndex,
        audioRef,
        isPlaying,
        intervalIdRef,
        currentTrack,
        queue,
        currentTrackIndex,
        isReady,
        userClicked,
        ...returnData,
        nextTrackIndex,
        isRepeat,
        isShuffle,
        isBtnClickable,
        prevDocumentTitle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
