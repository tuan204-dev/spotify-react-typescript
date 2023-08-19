import { RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from '@/assets/icons'
import { PlayButton, Range } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import durationConvertor from '@/utils/durationConvertor'
import classNames from 'classnames/bind'
import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './PlayerControl.module.scss'
import { Tooltip } from 'antd'

const cx = classNames.bind(styles)

const PlayerControl: FC = () => {
  const {
    currentTrack,
    intervalIdRef,
    isPlaying,
    duration,
    audioRef,
    isReady,
    userClicked,
    isShuffle,
    isRepeat,
    isBtnClickable,
    handlePlay,
    handlePause,
    setCurrentTime,
    handleForward,
    handleBack,
    setUserClicked,
    setShuffle,
    setRepeat,
  } = useContext(PlayerContext)
  const [trackProcess, setTrackProcess] = useState<number>(audioRef?.current?.currentTime)

  const startTimer = () => {
    clearInterval(intervalIdRef?.current)
    intervalIdRef.current = setInterval(() => {
      if (!audioRef?.current?.paused) {
        setTrackProcess((prev) => +prev + 1)
      }
    }, 1000)
  }

  useEffect(() => {
    setTrackProcess(0)
    clearInterval(intervalIdRef?.current)
  }, [currentTrack])

  useEffect(() => {
    // console.log(isPlaying)
    if (isPlaying) {
      startTimer()
      handlePlay()
    }
  }, [isPlaying])

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearInterval(intervalIdRef?.current)
    setTrackProcess(+e.target.value)
  }

  const handleMouseUp = () => {
    setCurrentTime(trackProcess)
    startTimer()
  }

  if (audioRef?.current) {
    audioRef.current.onended = () => {
      if (isRepeat) {
        // console.log('repeated')
        setCurrentTime(0)
        setTrackProcess(0)
        startTimer()
        handlePlay()
      } else {
        handleForward()
      }
    }
  }

  const handlePlayBtn = () => {
    // console.log(duration, isPlaying)
    if (!duration && !isReady) return
    if (!userClicked) setUserClicked(true)
    if (isPlaying) {
      clearInterval(intervalIdRef?.current)
      handlePause()
    } else {
      setTrackProcess(audioRef?.current?.currentTime)
      startTimer()
      handlePlay()
    }
  }

  //detect the click event on the keyboard: pause, play, back, forward,...

  navigator.mediaSession.setActionHandler('play', () => {
    handlePlayBtn()
  })

  navigator.mediaSession.setActionHandler('pause', () => {
    handlePlayBtn()
  })

  navigator.mediaSession.setActionHandler('stop', () => {
    handlePlayBtn()
  })

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    handleBack()
  })

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    handleForward()
  })

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <Tooltip
          overlayInnerStyle={{ backgroundColor: '#282828' }}
          title={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
        >
          <button
            onClick={() => isBtnClickable && setShuffle(!isShuffle)}
            className={cx({ btn: true, active: isShuffle })}
          >
            <ShuffleIcon />
          </button>
        </Tooltip>
        <Tooltip overlayInnerStyle={{ backgroundColor: '#282828' }} title="Previous">
          <button onClick={() => isBtnClickable && handleBack()} className={cx('btn')}>
            <SkipBackIcon />
          </button>
        </Tooltip>
        <Tooltip
          overlayInnerStyle={{ backgroundColor: '#282828' }}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          <div onClick={() => isBtnClickable && handlePlayBtn()} className={cx('btn')}>
            <PlayButton
              size={32}
              fontSize={20}
              bgColor="#fff"
              transitionDuration={0}
              isPlay={isPlaying}
              scaleHovering={1}
            />
          </div>
        </Tooltip>
        <Tooltip overlayInnerStyle={{ backgroundColor: '#282828' }} title="Next">
          <button onClick={() => isBtnClickable && handleForward()} className={cx('btn')}>
            <SkipForwardIcon />
          </button>
        </Tooltip>
        <Tooltip
          overlayInnerStyle={{ backgroundColor: '#282828' }}
          title={isRepeat ? 'Disable repeat' : 'Enable repeat'}
        >
          <button
            onClick={() => isBtnClickable && setRepeat((prev) => !prev)}
            className={cx({ btn: true, active: isRepeat })}
          >
            <RepeatIcon />
          </button>
        </Tooltip>
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
