import useDominantColor from '@/hooks/useDominantColor'
import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import styles from './SongItemTag.module.scss'
import useComponentSize from '@/hooks/useComponentSize'

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

  const songTagRef = useRef<HTMLDivElement>(null)

  const { width } = useComponentSize(songTagRef)

  // console.log('im here')

  return (
    <div
      ref={songTagRef}
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
        <button
          className={cx({
            'play-btn': true,
            'play-btn-hidden': width !== -1 && width <= 270,
          })}
        >
          <TbPlayerPlayFilled className={cx('play-btn-child')} />
        </button>
      </div>
    </div>
  )
}

export default SongItemTag