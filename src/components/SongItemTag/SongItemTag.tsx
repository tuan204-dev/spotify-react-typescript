import useDominantColor from '@/hooks/useDominantColor'
import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import styles from './SongItemTag.module.scss'
import useComponentSize from '@/hooks/useComponentSize'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface SongItemTagProps {
  thumbnailUrl?: string
  name?: string
  isLoading?: boolean
  setBgColor: React.Dispatch<React.SetStateAction<string>>
}

const SongItemTag: React.FC<SongItemTagProps> = (props) => {
  const { thumbnailUrl, name, setBgColor, isLoading } = props
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
      onMouseLeave={() => setBgColor('#e0e0e0')}
      className={cx('song-item-tag')}
    >
      <div
        className={cx('thumbnail')}
        // style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
        {!isLoading ? (
          <img src={thumbnailUrl} alt={name} />
        ) : (
          <Skeleton height={'100%'} />
        )}
      </div>
      <div className={cx('body')}>
        {!isLoading ? (
          <>
            <p className={cx('body-name')}>{name}</p>
            <button
              className={cx({
                'play-btn': true,
                'play-btn-hidden': width !== -1 && width <= 270,
              })}
            >
              <TbPlayerPlayFilled className={cx('play-btn-child')} />
            </button>
          </>
        ) : (
          <Skeleton
            height={26}
            borderRadius={50}
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              paddingInline: '16px',
              marginTop: '-7px',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SongItemTag
