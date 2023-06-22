import useDominantColor from '@/hooks/useDominantColor'
import classNames from 'classnames/bind'
import React from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import styles from './SongItemTag.module.scss'

const cx = classNames.bind(styles)

interface SongItemTagProps {
  thumbnailUrl?: string
  name: string
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

const SongItemTag: React.FC<SongItemTagProps> = (props) => {
  const { thumbnailUrl, name, setBgColor } = props
  const color = useDominantColor(thumbnailUrl)
  const handleHover = (): void => {
    setBgColor(color)
  }

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor('#c0b8c1')}
      className={cx('song-item-tag')}
    >
      <div
        className={cx('thumbnail')}
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      ></div>
      <div className={cx('body')}>
        <p className={cx('body-name')}>{name}</p>
        <button className={cx('play-btn')}>
          <TbPlayerPlayFilled className={cx('play-btn-child')} />
        </button>
      </div>
    </div>
  )
}

export default SongItemTag
