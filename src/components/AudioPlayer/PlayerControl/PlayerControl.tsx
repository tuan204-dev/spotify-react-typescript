import { RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from '@/assets/icons'
import { PlayButton, Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import classNames from 'classnames/bind'
import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './PlayerControl.module.scss'
import durationConvertor from '@/utils/durationConvertor'

const cx = classNames.bind(styles)

const PlayerControl: FC = () => {
  const {
    isPlaying,
    handlePlay,
    handlePause,
    setCurrentTime,
    intervalIdRef,
    duration,
    audioRef,
    id,
  } = useContext(PlayerContext)

  const [trackProcess, setTrackProcess] = useState<number>(audioRef?.current?.currentTime)

  useEffect(() => {
    setTrackProcess(0)
    clearInterval(intervalIdRef?.current)
  }, [id])

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearInterval(intervalIdRef?.current)
    setTrackProcess(+e.target.value)
  }

  const handleMouseUp = () => {
    setCurrentTime(trackProcess)
    startTimer()
  }

  const startTimer = () => {
    clearInterval(intervalIdRef?.current)
    intervalIdRef.current = setInterval(() => {
      if (!audioRef?.current?.paused) {
        setTrackProcess((prev) => +prev + 1)
      }
    }, 1000)
  }

  const handlePlayBtn = () => {
    if (!duration) return
    if (isPlaying) {
      clearInterval(intervalIdRef?.current)
      handlePause()
    } else {
      setTrackProcess(audioRef?.current?.currentTime)
      startTimer()
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
        <div className={cx('playback-position')}>
          {durationConvertor({ milliseconds: +trackProcess * 1000 })}
        </div>
        <div className={cx('range')}>
          <Range
            maxValue={Math.floor(duration ? duration : 0)}
            step={1}
            process={trackProcess}
            handleChange={handleRangeChange}
            handleMouseUp={handleMouseUp}
          />
        </div>
        <div className={cx('playback-duration')}>
          {durationConvertor({ milliseconds: duration ? duration * 1000 : 0 })}
        </div>
      </div>
    </div>
  )
}

export default PlayerControl
