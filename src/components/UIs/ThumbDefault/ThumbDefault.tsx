import { FC } from 'react'
import styles from './ThumbDefault.module.scss'
import classNames from 'classnames/bind'
import { MusicNote } from '@/assets/icons'

const cx = classNames.bind(styles)

const ThumbDefault: FC = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('icon')}>
        <MusicNote />
      </div>
    </div>
  )
}

export default ThumbDefault
