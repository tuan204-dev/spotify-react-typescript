import React from 'react'
import styles from './SongItemTag.module.scss'
import classNames from 'classnames/bind'
import { GrPlayFill } from 'react-icons/gr'
import useDominantColor from '@/hooks/useDominantColor'

const cx = classNames.bind(styles)

interface SongItemTagProps {
  thumbnailUrl?: string
  name: string
  setBgColor: React.Dispatch<React.SetStateAction<string | null>>
}

const SongItemTag: React.FC<SongItemTagProps> = (props) => {
  const { thumbnailUrl, name, setBgColor } = props
  const color = useDominantColor(thumbnailUrl)
  const handleHover = (): void => {
    setBgColor(color)
  }

  return (
    <div onMouseEnter={handleHover} className={cx('song-item-tag')}>
      <div
        className={cx('thumbnail')}
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      ></div>
      <div className={cx('body')}>
        <p className={cx('body-name')}>{name}</p>
        <button className={cx('play-btn')}>
          <GrPlayFill />
        </button>
      </div>
    </div>
  )
}

export default SongItemTag
