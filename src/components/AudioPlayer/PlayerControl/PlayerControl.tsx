import { RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from '@/assets/icons'
import { PlayButton, Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import classNames from 'classnames/bind'
import { FC, useContext } from 'react'
import styles from './PlayerControl.module.scss'

const cx = classNames.bind(styles)

const PlayerControl: FC = () => {
  const {
    handlePlay,
    handlePause,
    isPlaying,
    durationText,
    setTrackProcess,
    durationMs,
  } = useContext(PlayerContext)

  const handlePlayBtn = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
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
        <div onClick={() => handlePlayBtn()} className={cx('btn')}>
          <PlayButton
            size={32}
            bgColor="#fff"
            transitionDuration={0}
            isPlay={isPlaying}
            scaleHovering={1}
          />
        </div>
        <button className={cx('btn')}>
          <SkipForwardIcon />
        </button>
        <button className={cx('btn')}>
          <RepeatIcon />
        </button>
      </div>
      <div className={cx('playback-bar')}>
        <div className={cx('playback-position')}>00:00</div>
        <div className={cx('range')}>
          <Range
            type="trackProcess"
            maxValue={Math.ceil(durationMs ? durationMs / 1000 : 0)}
            setTrackProcess={setTrackProcess}
          />
        </div>
        <div className={cx('playback-duration')}>{durationText}</div>
      </div>
    </div>
  )
}

export default PlayerControl
