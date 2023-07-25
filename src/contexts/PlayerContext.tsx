import { getTrackRecommendation } from '@/apis/trackApi'
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
  handlePlay: () => void
  handlePause: () => void
  audioRef: React.MutableRefObject<any>
  isPlaying: boolean
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  intervalIdRef: any
  setCurrentTrack: React.Dispatch<React.SetStateAction<SpotifyTrack | undefined>>
  currentTrack: SpotifyTrack | undefined
  setQueue: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>
  queue: SpotifyTrack[]
  fakeCurrentIndex?: number
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>
  currentTrackIndex: number
  handleForward: () => void
  handleBack: () => void
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [rapidData, setRapidData] = useState<any>()
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)

  //------------------------------------------------------
  // const [fakeData, setFakeData] = useState<any>()
  // const [fakeCurrentIndex, setFakeCurrentIndex] = useState<number>(0)

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
  }, [currentTrackIndex, currentTrack])

  // -----------------------------------------------
  const intervalIdRef = useRef<any>()

  const audioRef = useRef<any>(new Audio())

  // useMemo(() => {
  //   if (rapidData) {
  //     console.log(rapidData)
  //     audioRef.current.src = rapidData?.soundcloudTrack?.audio[0]?.url
  //   }
  // }, [rapidData])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getAudioTrack({ id: currentTrack?.id })
  //     console.log(data)
  //     setRapidData(data)
  //   }
  //   handlePause()
  //   fetchData()
  // }, [currentTrackIndex])

  // const handlePlay = () => {
  //   if (audioRef.current?.paused) {
  //     audioRef.current.play()
  //     setPlaying(true)
  //   }
  // }

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = currentTime
  //   }
  // }, [currentTime])

  // const handlePause = () => {
  //   // if (!audioRef.current?.paused) {
  //   audioRef.current.pause()
  //   setPlaying(false)
  //   // }
  // }

  // const handleForward = () => {
  //   handlePause()
  //   setCurrentTrack({ ...queue[currentTrackIndex + 1] })
  //   setCurrentTrackIndex(currentTrackIndex + 1)
  //   setCurrentTime(0)
  // }

  // const handleBack = () => {
  //   handlePause()
  //   if (currentTrackIndex > 0) {
  //     setCurrentTrack({ ...queue[currentTrackIndex - 1] })
  //     setCurrentTrackIndex(currentTrackIndex - 1)
  //   }
  //   setCurrentTime(0)
  // }
  // console.log(rapidData)

  //---------------------------------------

  useMemo(() => {
    if (rapidData) {
      // console.log(rapidData)
      audioRef.current.src = rapidData?.soundcloudTrack?.audio[0]?.url
    }
  }, [rapidData])

  useEffect(() => {
    const fetchData = async () => {
      switch (currentTrackIndex % 3) {
        case 0: {
          const response = await fetch('https://api.npoint.io/b116c0633c2ffe944c9f')
          const data = await response.json()
          // console.log(data)
          setRapidData(data)
          break
        }
        case 1: {
          const response = await fetch('https://www.npoint.io/docs/0a036d37ba0b464261d7')
          const data = await response.json()
          console.log(data)
          setRapidData(data)
          break
        }
        case 2: {
          const response = await fetch('https://api.npoint.io/3c7bb8294d77ef942000')
          const data = await response.json()
          console.log(data)
          setRapidData(data)
          break
        }
      }
      // const data = await getAudioTrack({id: currentTrack?.id})
      // console.log(data)
      // setRapidData(data)
    }
    handlePause()
    fetchData()
  }, [currentTrackIndex, currentTrack])

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
    // setFakeCurrentIndex(() => {
    //   if (fakeCurrentIndex === 0) {
    //     return 0
    //   } else {
    //     return fakeCurrentIndex - 1
    //   }
    // })
    if (currentTrackIndex > 0) {
      setCurrentTrack({ ...queue[currentTrackIndex - 1] })
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
    setCurrentTime(0)
  }

  const handleForward = () => {
    // console.log('forwarded', fakeCurrentIndex)
    if (currentTrackIndex < queue.length - 1) {
      handlePause()
      setCurrentTrack({ ...queue[currentTrackIndex + 1] })
      setCurrentTrackIndex(currentTrackIndex + 1)
      setCurrentTime(0)
    }
  }

  // console.dir(audioRef.current)

  // ----------------------------------------------------
  // useMemo(() => {
  //   if (rapidData) {
  //     audioRef.current.src = rapidData?.soundcloudTrack?.audio[0]?.url
  //   }
  // }, [rapidData])

  // useEffect(() => {
  //   handlePause()
  //   const fetchAudio = async () => {
  //     const data = await getAudioTrack({ id: currentTrack?.id })
  //     console.log(data)
  //     setRapidData(data)
  //   }
  //   if (currentTrack) {
  //     fetchAudio()
  //   }
  // }, [currentTrack])

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = currentTime
  //   }
  // }, [currentTime])

  // const handlePlay = () => {
  //   if (audioRef.current.paused) {
  //     console.log('playing')
  //     audioRef.current.play()
  //   }
  //   setPlaying(true)
  // }

  // const handlePause = () => {
  //   if (!audioRef.current.paused) {
  //     console.log('paused')
  //     audioRef.current.pause()
  //   }
  //   setPlaying(false)
  // }

  // console.dir(audioRef.current)
  // const handlePlay = useCallback(() => {
  //   audioRef.current.play()
  //   setPlaying(true)
  // }, [rapidData, audioRef.current])
  // const handlePause = useCallback(() => {
  //   if (audioRef.current) {
  //     audioRef.current.pause()
  //   }
  //   setPlaying(false)
  // }, [rapidData, audioRef.current])

  // console.log(currentTime)

  // const handleForward = () => {
  //   handlePause()
  //   setCurrentTrack({ ...queue[currentTrackIndex + 1] })
  //   setCurrentTrackIndex(currentTrackIndex + 1)
  //   setCurrentTime(0)
  // }

  // const handleBack = () => {
  //   if (currentTrackIndex !== 0) {
  //     handlePause()
  //     setCurrentTrack({ ...queue[currentTrackIndex - 1] })
  //     setCurrentTrackIndex(currentTrackIndex - 1)
  //   }
  //   setCurrentTime(0)
  // }

  // --------------------------

  useEffect(() => {
    audioRef.current.volume = localStorage.getItem('spotify_volume')
      ? JSON.parse(localStorage.getItem('spotify_volume') as string)
      : 1
  }, [])

  const returnData = useMemo(() => {
    return {
      duration: rapidData?.soundcloudTrack?.audio?.[0]?.durationMs / 1000,
      // duration: fakeData?.soundcloudTrack?.audio?.[0]?.durationMs / 1000,
      // duration: audioRef.current?.duration / 1000 || 1,
      playBarData: {
        trackName: currentTrack?.name,
        thumb:
          currentTrack?.album?.images?.[currentTrack?.album?.images?.length - 1]?.url,
        albumId: currentTrack?.album?.id,
        artists: currentTrack?.artists,
      },
    }
  }, [currentTrack, audioRef.current, rapidData])

  return (
    <PlayerContext.Provider
      value={{
        handlePlay,
        handlePause,
        audioRef,
        isPlaying,
        ...returnData,
        // fakeCurrentIndex,
        setCurrentTime,
        intervalIdRef,
        setCurrentTrack,
        currentTrack,
        setQueue,
        queue,
        setCurrentTrackIndex,
        currentTrackIndex,
        handleForward,
        handleBack,
      }}
    >
      {children}
      {/* <audio/> */}
    </PlayerContext.Provider>
  )
}
