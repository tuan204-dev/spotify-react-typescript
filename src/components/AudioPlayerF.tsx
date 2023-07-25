import { PlayerContext } from '@/contexts/PlayerContext'
import { useContext } from 'react'

interface AudioPlayerFParams {
  audioUrl: string
}

const AudioPlayerF = ({ audioUrl }: AudioPlayerFParams) => {
  const { audioRef } = useContext(PlayerContext)

  audioRef.current = new Audio(audioUrl)

  return <div></div>
}

export default AudioPlayerF
