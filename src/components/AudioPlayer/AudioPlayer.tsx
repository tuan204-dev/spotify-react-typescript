import classNames from 'classnames/bind'
import { FC, useContext } from 'react'
import styles from './AudioPlayer.module.scss'
import Left from './Left/Left'
import PlayerControl from './PlayerControl/PlayerControl'
import { PlayerContext } from '@/contexts/PlayerContext'
import Right from './Right/Right'

const cx = classNames.bind(styles)

const AudioPlayer: FC = () => {
  const { currentTrack } = useContext(PlayerContext)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left')}>{currentTrack && <Left />}</div>

      <div className={cx('center')}>
        <PlayerControl />
      </div>

      <div className={cx('right')}>
        <Right />
      </div>
    </div>
  )
}

export default AudioPlayer
