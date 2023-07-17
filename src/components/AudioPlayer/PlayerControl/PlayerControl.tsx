import { FC, useContext, useRef, useState } from 'react'
import styles from './PlayerControl.module.scss'
import classNames from 'classnames/bind'
import { RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from '@/assets/icons'
import { PlayButton, Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import durationConvertor from '@/utils/durationConvertor'

const cx = classNames.bind(styles)

const PlayerControl: FC = () => {
  const { setPlaying, duration, trackProcess, setTrackProcess, setCurrentTimeTrack } =
    useContext(PlayerContext)
  const [process, setProcess] = useState<number>(trackProcess ? trackProcess : 0)

  

  const intervalRef = useRef<any>()

  const startTimer = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTrackProcess((prev) => Number(prev) + 1)
    }, 1000)
  }

  const handleRangeOnChange = (e: any) => {
    clearInterval(intervalRef.current)
    setProcess(e.target.value)
  }

  const handleRangeOnMouseUp = (e: any) => {
    startTimer()
    setCurrentTimeTrack(e.target.value)
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('btn')}>
          <ShuffleIcon />
        </button>

        <button className={cx('btn')}>
          <SkipBackIcon />
        </button>
        <div onClick={() => setPlaying((prev) => !prev)} className={cx('btn')}>
          <PlayButton size={32} bgColor="#fff" transitionDuration={0} />
        </div>
        <button className={cx('btn')}>
          <SkipForwardIcon />
        </button>
        <button className={cx('btn')}>
          <RepeatIcon />
        </button>
      </div>
      <div className={cx('playback-bar')}>
        <div className={cx('playback-position')}>0:00</div>
        <div className={cx('range')}>
          <Range
            process={process}
            handleRangeOnChange={handleRangeOnChange}
            handleRangeOnMouseUp={handleRangeOnMouseUp}
            duration={Math.ceil(duration ? duration / 1000 : 0)}
          />
        </div>
        <div className={cx('playback-duration')}>
          {durationConvertor(duration ? duration : 0)}
        </div>
      </div>
    </div>
  )
}

export default PlayerControl
