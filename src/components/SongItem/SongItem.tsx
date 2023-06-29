import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { convertDateFormat } from '@/utils/convertDateFormat'
import classNames from 'classnames/bind'
import React, { memo, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Artists } from '../UIs'
import styles from './SongItem.module.scss'

const cx = classNames.bind(styles)

interface SongItemProps {
  songName?: string
  artists?: any[]
  thumb?: string
  duration?: number
  order?: number
  isLoading?: boolean
  album?: string
  dateAdd?: string
  isAlbumTrack?: boolean
  isExplicit?: boolean
}


const SongItem: React.FC<SongItemProps> = ({
  songName,
  artists,
  thumb,
  duration = 0,
  order,
  isLoading = false,
  dateAdd,
  album,
  isAlbumTrack = false,
  isExplicit = false,
}) => {
  const { width } = useContext(MainLayoutContext)

  return (
    <div
      className={cx({
        wrapper: true,
        'grid-md': width <= 780 && !isAlbumTrack,
        'is-album-track': isAlbumTrack,
      })}
    >
      <div className={cx('order')}>{!isLoading && order}</div>
      <div className={cx('main')}>
        {!isAlbumTrack && (
          <div className={cx('thumb')}>
            {!isLoading ? (
              <img loading="lazy" src={thumb} alt={songName} />
            ) : (
              <Skeleton height={'100%'} />
            )}
          </div>
        )}
        <div className={cx('title')}>
          {!isLoading ? (
            <>
              <p className={cx('name')}>{songName}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isExplicit && <span className={cx('explicit')}>E</span>}
                {/* <div className={cx('artists')}>{Artist(artists)}</div> */}
                <Artists artists={artists}/>
              </div>
            </>
          ) : (
            <>
              <Skeleton
                borderRadius={50}
                height={'15px'}
                width={'200px'}
              />
              <Skeleton borderRadius={50} height={'10px'} width={'60px'} />
            </>
          )}
        </div>
      </div>
      {!isAlbumTrack && (
        <>
          <div className={cx('album')}>{!isLoading && album}</div>
          {width > 780 && (
            <div className={cx('date-add')}>
              {dateAdd !== '1970-01-01T00:00:00Z' && dateAdd
                ? convertDateFormat(dateAdd)
                : ''}
            </div>
          )}
        </>
      )}
      <div className={cx('duration')}>
        {!isLoading &&
          `${String(Math.floor(duration / 60000)).padStart(
            2,
            '0'
          )}:${String(Math.floor((duration % 60000) / 1000)).padStart(
            2,
            '0'
          )}`}
      </div>
    </div>
  )
}

export default memo(SongItem)
