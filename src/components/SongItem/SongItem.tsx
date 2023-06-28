import React, { Fragment, memo, useContext } from 'react'
import styles from './SongItem.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface SongItemProps {
  songName?: string
  artists?: any[]
  thumb?: string
  duration?: number
  order?: number
  isLoading?: boolean
  album?: string
  isAlbumTrack?: boolean
  isExplicit?: boolean
}

const Artist = (artists?: any[]) => {
  const renderData: any[] = []
  // console.log(artists)
  if (artists) {
    if (artists.length === 1) {
      renderData.push(
        <Link key={0} to={`/artist?${artists[0].id}`}>
          <span className={cx('artist-item')}>{artists[0].name}</span>
        </Link>
      )
    } else {
      for (let i = 0; i < artists.length - 1; i++) {
        renderData.push(
          <Fragment key={i}>
            <Link to={`/artist?${artists[i].id}`}>
              <span className={cx('artist-item')}>{artists[i].name}</span>
            </Link>
            {', '}
          </Fragment>
        )
      }

      renderData.push(
        <Link key={artists.length - 1} to={`/artist?${artists[artists.length - 1].id}`}>
          <span className={cx('artist-item')}>{artists[artists.length - 1].name}</span>
        </Link>
      )
    }
  }

  return renderData
}

const SongItem: React.FC<SongItemProps> = ({
  songName,
  artists,
  thumb,
  duration = 0,
  order,
  isLoading = false,
  album,
  isAlbumTrack = false,
  isExplicit = false,
}) => {
  const { width } = useContext(MainLayoutContext)

  // console.log('im here')

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
                {isAlbumTrack && isExplicit && (
                  <span className={cx('explicit')}>E</span>
                )}
                <div className={cx('artists')}>{Artist(artists)}</div>
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
          {width > 780 && <div className={cx('date-add')}></div>}
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
