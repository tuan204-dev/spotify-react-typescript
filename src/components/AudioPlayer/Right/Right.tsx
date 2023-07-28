import { PlayingViewIcon, QueueIcon, SoundIcon, SoundLevel } from '@/assets/icons'
import { Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import { Tooltip } from 'antd'
import classNames from 'classnames/bind'
import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './Right.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '@/App'

const cx = classNames.bind(styles)

const Right: FC = () => {
  const { audioRef, isBtnClickable, playingType } = useContext(PlayerContext)
  const { setPlayingViewShowed, isPlayingViewShowed } = useContext(AppContext)
  const [volume, setVolume] = useState<number>(
    JSON.parse(localStorage.getItem('spotify_volume') as string) ?? 1
  )
  const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('high')
  const prevVolume = useRef<number>(volume)

  const { pathname, key } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (playingType === 'show') {
      setPlayingViewShowed(false)
    }
  }, [playingType])

  const volumeLevelFilter = useCallback((value: number): SoundLevel => {
    if (+value === 0) {
      return 'mute'
    } else if (+value < 0.33) {
      return 'low'
    } else if (+value < 0.66) {
      return 'medium'
    } else {
      return 'high'
    }
  }, [])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = Number(e.target.value)
    localStorage.setItem('spotify_volume', JSON.stringify(volumeValue))
    audioRef.current.volume = volumeValue
    setVolumeLevel(volumeLevelFilter(volumeValue))
    setVolume(volumeValue)
  }

  const handleMouseUp = () => {
    return
  }

  const handleSoundClicked = () => {
    if (volumeLevel === 'mute') {
      audioRef.current.volume = prevVolume.current
      setVolume(prevVolume.current)
      setVolumeLevel(volumeLevelFilter(prevVolume.current))
    } else {
      prevVolume.current = volume
      audioRef.current.volume = 0
      setVolume(0)
      setVolumeLevel('mute')
    }
  }

  const handleClickQueueBtn = () => {
    if (pathname !== '/queue') {
      navigate('/queue')
    } else if (key !== 'default') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const handleClickPlayingView = () => {
    if (playingType === 'show') return
    if (isBtnClickable) {
      setPlayingViewShowed((prev) => !prev)
    }
  }

  return (
    <div className={cx('wrapper')}>
      <Tooltip
        overlayInnerStyle={{ backgroundColor: '#282828' }}
        title="Now Playing View"
      >
        <button
          className={cx({ btn: true, active: isPlayingViewShowed })}
          onClick={handleClickPlayingView}
        >
          <PlayingViewIcon />
        </button>
      </Tooltip>
      <Tooltip overlayInnerStyle={{ backgroundColor: '#282828' }} title="Queue">
        <button
          onClick={handleClickQueueBtn}
          className={cx({ btn: true, active: pathname === '/queue' })}
        >
          <QueueIcon />
        </button>
      </Tooltip>
      <div className={cx('volume')}>
        <Tooltip
          overlayInnerStyle={{ backgroundColor: '#282828' }}
          title={volumeLevel === 'mute' ? 'Ummute' : 'Mute'}
        >
          <button className={cx('btn')} onClick={handleSoundClicked}>
            <SoundIcon level={volumeLevel} />
          </button>
        </Tooltip>
        <Range
          maxValue={1}
          step={0.01}
          process={volume}
          handleChange={handleVolumeChange}
          handleMouseUp={handleMouseUp}
        />
      </div>
    </div>
  )
}

export default Right
