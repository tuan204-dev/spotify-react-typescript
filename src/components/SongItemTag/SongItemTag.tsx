import useComponentSize from '@/hooks/useComponentSize'
import useDominantColor from '@/hooks/useDominantColor'
import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { SongItemTagProps } from '../../../types'
import styles from './SongItemTag.module.scss'
import { PlayButton } from '../UIs'

const cx = classNames.bind(styles)

const SongItemTag: React.FC<SongItemTagProps> = (props) => {
  const { thumbnailUrl, name, setBgColor, isLoading, id } = props
  const color = useDominantColor(thumbnailUrl)
  const imgRef = useRef<HTMLDivElement>(null)
  const handleHover = (): void => {
    setBgColor(color)
  }

  const songTagRef = useRef<HTMLDivElement>(null)

  const { width } = useComponentSize(songTagRef)

  return (
    <Link to={`/album?${id}`}>
      <div
        ref={songTagRef}
        onMouseEnter={handleHover}
        onMouseLeave={() => setBgColor('#e0e0e0')}
        className={cx('song-item-tag')}
      >
        <div className={cx('thumbnail')} ref={imgRef}>
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
              <div
                className={cx({ 'play-btn': true, hidden: width !== -1 && width <= 270 })}
              >
                <PlayButton size={50} scaleHovering={1.1} transitionDuration={33} />
              </div>
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
    </Link>
  )
}

export default SongItemTag
