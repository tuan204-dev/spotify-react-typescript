import { FC } from 'react'
import styles from './LoadingLayout.module.scss'
import classNames from 'classnames/bind'
import { StageSpinner } from 'react-spinners-kit'
import { AudioPlayer } from '@/components'

const cx = classNames.bind(styles)

const LoadingLayout: FC = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('spinner')}>
        <StageSpinner size={100} color="#333" />
      </div>
      <div className={cx('audio-player-bar')}>
        <AudioPlayer />
      </div>
    </div>
  )
}

export default LoadingLayout
