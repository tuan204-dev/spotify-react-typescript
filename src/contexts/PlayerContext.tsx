/* eslint-disable react-hooks/exhaustive-deps */
import { getAudioLink } from '@/apis/getAudioLink'
import { getTrackRecommendation } from '@/apis/trackApi'
import { ArtistData } from '@/types/artist'
import { ImageSource } from '@/types/others'
import { Episode } from '@/types/show'
import { SpotifyTrack } from '@/types/track'
import { FC, ReactNode, createContext, useEffect, useMemo, useRef, useState } from 'react'

interface PlayBarData {
  trackName?: string
  thumb?: string
  artists?: ArtistData[]
  albumId?: string
  episode?: string
  show?: (
    | {
        id?: string
        images?: ImageSource[]
        name?: string
        publisher?: string
      }
    | undefined
  )[]
}

interface PlayerProviderProps {
  children: ReactNode
}

interface ReturnData {
  duration?: number
  playBarData?: PlayBarData
}

export interface CurrentTrack extends SpotifyTrack, Episode {}

interface PlayerContext extends ReturnData {
  setCurrentTrack: React.Dispatch<React.SetStateAction<CurrentTrack | undefined>>
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  setQueue: React.Dispatch<React.SetStateAction<CurrentTrack[]>>
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setReady: React.Dispatch<React.SetStateAction<boolean>>
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setUserClicked: React.Dispatch<React.SetStateAction<boolean>>
  setNextTrackIndex: React.Dispatch<React.SetStateAction<number>>
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>
  setPlayingType: React.Dispatch<React.SetStateAction<'track' | 'show'>>
  handlePlay: () => void
  handlePause: () => void
  handleForward: () => void
  handleBack: () => void
  calNextTrackIndex: () => void
  audioRef: React.MutableRefObject<any>
  prevDocumentTitle: React.MutableRefObject<string>
  isPlaying: boolean
  intervalIdRef: any
  currentTrack?: CurrentTrack
  queue: SpotifyTrack[]
  fakeCurrentIndex?: number
  currentTrackIndex: number
  isReady: boolean
  userClicked: boolean
  nextTrackIndex: number
  isRepeat: boolean
  isShuffle: boolean
  isBtnClickable: boolean
  playingType: 'track' | 'show'
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [audioData, setAudioData] = useState<any>()
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [nextTrackIndex, setNextTrackIndex] = useState<number>(1)
  const [playingType, setPlayingType] = useState<'track' | 'show'>('track')

  // ----------Control-----------------
  const [currentTime, setCurrentTime] = useState<number>(0) //s
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [isReady, setReady] = useState<boolean>(false)
  const [userClicked, setUserClicked] = useState<boolean>(false) //detect the user clicked or yet
  const [isRepeat, setRepeat] = useState<boolean>(false)
  const [isShuffle, setShuffle] = useState<boolean>(false)
  const [isBtnClickable, setBtnClickable] = useState<boolean>(false)

  // ---------------Queue list----------------
  const [queue, setQueue] = useState<CurrentTrack[]>([])
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | undefined>()

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem('spotify_current_track', JSON.stringify(currentTrack))
    }
    if (currentTrackIndex >= queue?.length - 1 && currentTrack) {
      if (playingType === 'track') {
        const getRecommendation = async () => {
          const data = await getTrackRecommendation({
            seed_artists: currentTrack?.artists?.[0]?.id as string,
            seed_tracks: currentTrack?.id,
            limit: 19,
          })
          setQueue((prev) => [...prev, ...data])
        }
        getRecommendation()
      } else if (queue?.length >= 2) {
        setCurrentTrackIndex(0)
        setCurrentTrack({ ...queue[0] })
        calNextTrackIndex()
      }
    }
  }, [currentTrack])

  // -----------------------------------------------

  const intervalIdRef = useRef<any>()

  const audioRef = useRef<HTMLAudioElement>(new Audio())

  const prevDocumentTitle = useRef<string>('')

  // set default  state from localStorage
  useEffect(() => {
    audioRef.current.volume = localStorage.getItem('spotify_volume')
      ? JSON.parse(localStorage.getItem('spotify_volume') as string)
      : 1
    const initTrack =
      JSON.parse(localStorage.getItem('spotify_current_track') as string) || undefined
    const initPlayingType =
      JSON.parse(localStorage.getItem('spotify_playing_type') as 'track' | 'show') ??
      'track'

    setPlayingType(initPlayingType)
    setCurrentTrack(initTrack && { ...initTrack })
    setQueue(initTrack ? [{ ...initTrack }] : [])
    setBtnClickable(Boolean(initTrack))
  }, [])

  useMemo(() => {
    if (audioData) {
      audioRef.current.src = audioData.audioLink
      audioRef.current.load()
    }
  }, [audioData])

  useEffect(() => {
    const fetchData = async () => {
      const query =
        playingType === 'track'
          ? `${currentTrack?.name} - ${currentTrack?.artists
              ?.map((artist) => artist?.name)
              .join(' ')} ${
              currentTrack?.album?.album_type?.toLocaleLowerCase() === 'album'
                ? `album: ${currentTrack?.album?.name}`
                : ''
            }`
          : `${currentTrack?.show?.publisher} ${currentTrack?.name} ${currentTrack?.type} original`
      const data = await getAudioLink({
        query,
        duration_ms: currentTrack?.duration_ms as number,
        type: playingType,
      })
      setAudioData(data)
    }
    handlePause()
    setReady(false)
    if (queue?.filter((item: CurrentTrack) => item).length !== 0) {
      fetchData()
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
  }, [currentTime])

  useEffect(() => {
    calNextTrackIndex()
  }, [currentTrack, isShuffle])

  useEffect(() => {
    localStorage.setItem('spotify_playing_type', JSON.stringify(playingType))
  }, [playingType])

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
          playingType === 'track'
            ? currentTrack?.album?.images?.[currentTrack?.album?.images?.length - 1]?.url
            : currentTrack?.images?.[currentTrack?.images?.length - 1]?.url,
        albumId: currentTrack?.album?.id,
        artists: currentTrack?.artists,
        episode: currentTrack?.id,
        show: [currentTrack?.show],
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
        setPlayingType,
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
        playingType,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
