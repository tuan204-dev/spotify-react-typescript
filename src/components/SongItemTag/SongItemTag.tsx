import useDominantColor from '@/hooks/useDominantColor'
import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import styles from './SongItemTag.module.scss'
import useComponentSize from '@/hooks/useComponentSize'
import Skeleton from 'react-loading-skeleton'
import { SongItemTagProps } from '../../../types'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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

  // console.log('im here')

  return (
    <Link to={`/album?${id}`}>
      <div
        ref={songTagRef}
        onMouseEnter={handleHover}
        onMouseLeave={() => setBgColor('#e0e0e0')}
        className={cx('song-item-tag')}
      >
        <div
          className={cx('thumbnail')}
          ref={imgRef}
          // style={{ backgroundImage: `url(${thumbnailUrl})` }}
        >
          {!isLoading ? (
            <LazyLoadImage effect="blur" src={thumbnailUrl} alt={name} />
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
    </Link>
  )
}

export default SongItemTag
