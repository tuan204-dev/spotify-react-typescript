import trackApi from '@/APIs/trackApi'
import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { ArtistData } from '../../types'

interface ResponData {
  trackName?: string
  thumb?: string
  duration?: number
  albumId?: string
  artists?: ArtistData[]
}

interface PlayerContext extends ResponData {
  setId: React.Dispatch<React.SetStateAction<string | undefined>>
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setTrackProcess: React.Dispatch<React.SetStateAction<number>>
  trackProcess?: number
  id?: string
  setCurrentTimeTrack: (currentTime: number) => void
}

interface PlayerProviderProps {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContext)

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const audioUrl =
    'https://scd.dlod.link/?expire=1689593913078&p=ej488R4uEBcN4gcuaCxdoZIawxhCFRAlc91rLufaw7dDmzzCPzm2yKsCGjJRLY6CWOw38VqKGGjYj-92PCp0-nA9oI15UiApBgMtrmVv-Shdm67tHxnAL9y8FBUwb5x6gmzzJi9bfmPNmkfSqQ2IDZMHFGMJrq7W0YQvFAjGM9s&s=KVDtDDumJAfewzODF-F9yMg8nWmZwtYd0TqPgihB1uw'
  const audio = useMemo(() => new Audio(audioUrl), [audioUrl])
  const [id, setId] = useState<string | undefined>('')
  const [isPlaying, setPlaying] = useState<boolean>(!audio?.paused)
  const [trackProcess, setTrackProcess] = useState<number>(0)

  const [responseData, setResponseData] = useState<ResponData>()

  const setCurrentTimeTrack = useCallback((currentTime: number) => {
    if (audio) {
      audio.currentTime = currentTime
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await trackApi({ id })
      console.log(data)
      setResponseData({
        trackName: data?.name,
        thumb: data?.album?.images[0]?.url,
        duration: data?.duration_ms,
        albumId: data?.album?.id,
        artists: data?.artists,
      })
    }

    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  return (
    <PlayerContext.Provider
      value={{ setId, setPlaying, ...responseData, id, trackProcess, setTrackProcess, setCurrentTimeTrack }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
