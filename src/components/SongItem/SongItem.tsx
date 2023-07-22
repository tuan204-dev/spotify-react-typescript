import { PlayIcon } from '@/assets/icons'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { dateFormatConvertor } from '@/utils'
import durationConvertor from '@/utils/durationConvertor'
import classNames from 'classnames/bind'
import React, { memo, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { SongItemProps } from '../../../types'
import { Image, SubTitle } from '../UIs'
import styles from './SongItem.module.scss'
import { PlayerContext } from '@/contexts/PlayerContext'

const cx = classNames.bind(styles)

const SongItem: React.FC<SongItemProps> = ({
  songName,
  artists,
  thumb,
  duration = 0,
  order,
  isLoading = false,
  dateAdd,
  albumData,
  isExplicit = false,
  type = 'default',
  id,
}) => {
  const { width } = useContext(MainLayoutContext)
  const { setId } = useContext(PlayerContext)

  return (
    <div
      onClick={() => setId(id)}
      className={cx({
        wrapper: true,
        'grid-md': width <= 780 && type !== 'album',
        'is-album-track': type === 'album',
        'is-search-result': type === 'search',
      })}
    >
      {type !== 'search' && (
        <div className={cx('order')}>
          {!isLoading && (
            <>
              <span className={cx('order-number')}>{order}</span>{' '}
              <button className={cx('order-icon')}>
                <PlayIcon />
              </button>
            </>
          )}
        </div>
      )}
      <div className={cx('main')}>
        {type !== 'album' && (
          <div className={cx('thumb')}>
            {!isLoading ? (
              <Image src={thumb} alt={songName} />
            ) : (
              <Skeleton height={'100%'} />
            )}
          </div>
        )}
        <div className={cx('title')}>
          {!isLoading ? (
            <>
              <p className={cx('name')}>{songName}</p>
              {type !== 'artist' && (
                <div className={cx('sub-title')}>
                  {isExplicit && <span className={cx('explicit')}>E</span>}
                  <SubTitle data={artists} />
                </div>
              )}
            </>
          ) : (
            <>
              <Skeleton borderRadius={50} height={'15px'} width={'200px'} />
              <Skeleton borderRadius={50} height={'10px'} width={'60px'} />
            </>
          )}
        </div>
      </div>
      {type !== 'album' && type !== 'search' && (
        <>
          <div className={cx('album')}>
            {!isLoading && <SubTitle type="album" data={[{ ...albumData }]} />}
          </div>
          {width > 780 && (
            <div className={cx('date-add')}>
              {dateAdd !== '1970-01-01T00:00:00Z' && dateAdd
                ? dateFormatConvertor(dateAdd)
                : ''}
            </div>
          )}
        </>
      )}
      <div className={cx('duration')}>
        {!isLoading && durationConvertor({ milliseconds: duration })}
      </div>
    </div>
  )
}

export default memo(SongItem)
