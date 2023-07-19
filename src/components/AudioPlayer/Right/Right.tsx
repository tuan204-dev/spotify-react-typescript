import { PlayingViewIcon, QueueIcon, SoundIcon, SoundLevel } from '@/assets/icons'
import { Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import { Tooltip } from 'antd'
import classNames from 'classnames/bind'
import { FC, useCallback, useContext, useRef, useState } from 'react'
import styles from './Right.module.scss'

const cx = classNames.bind(styles)

const Right: FC = () => {
  const { audioRef } = useContext(PlayerContext)
  const [volume, setVolume] = useState<number>(1)
  const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('high')

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
    audioRef.current.volume = Number(e.target.value)
    setVolumeLevel(volumeLevelFilter(+e.target.value))
    setVolume(+e.target.value)
  }

  const handleMouseUp = () => {
    return
  }

  const prevVolume = useRef<number>(volume)

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
  return (
    <div className={cx('wrapper')}>
      <Tooltip
        overlayInnerStyle={{ backgroundColor: '#282828' }}
        title="Now Playing View"
      >
        <button className={cx('btn')}>
          <PlayingViewIcon />
        </button>
      </Tooltip>
      <Tooltip overlayInnerStyle={{ backgroundColor: '#282828' }} title="Queue">
        <button className={cx('btn')}>
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
