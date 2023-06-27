import React, { useContext } from 'react'
import styles from './SongItem.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

const cx = classNames.bind(styles)

interface SongItemProps {
  songName?: string
  artist?: string
  thumb?: string
  duration?: string
  order?: number
  isLoading?: boolean
}

const SongItem: React.FC<SongItemProps> = ({
  songName,
  artist,
  thumb,
  duration = '0m 0s',
  order,
  isLoading = false,
}) => {
  const { width } = useContext(MainLayoutContext)

  function convertDurationString(durationString: string): string {
    const [minutes, seconds] = durationString
      .split('m ')
      .map((part) => parseInt(part))
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const dura = convertDurationString(duration)

  return (
    <div className={cx({ wrapper: true, 'grid-md': width <= 780 })}>
      <div className={cx('order')}>{!isLoading && order}</div>
      <div className={cx('main')}>
        <div className={cx('thumb')}>
          {!isLoading ? (
            <img loading="lazy" src={thumb} alt={songName} />
          ) : (
            <Skeleton height={'100%'} />
          )}
        </div>
        <div className={cx('title')}>
          {!isLoading ? (
            <>
              <p className={cx('name')}>{songName}</p>
              <span className={cx('artist')}>{artist}</span>
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
      <div className={cx('album')}>{!isLoading && 'Album'}</div>
      {width > 780 && <div className={cx('date-add')}></div>}
      <div className={cx('duration')}>{!isLoading && dura}</div>
    </div>
  )
}

export default SongItem
