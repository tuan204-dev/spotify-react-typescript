import logoImage from '@/assets/image/logo/logo.svg'
import { htmlCleaner, stringCleaner } from '@/utils'
import classNames from 'classnames/bind'
import React, { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { ArtistList } from '..'
import styles from './Header.module.scss'
import { SubTitle } from '../UIs'
import { HeaderProps } from '../../../types'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const cx = classNames.bind(styles)

//Header of Playlist page & Album page

const Header: React.FC<HeaderProps> = ({
  title,
  thumbnail,
  quantity,
  bgColor,
  desc,
  isLoading,
  type,
  artists,
  releaseDate,
  isWhiteColor = false,
}) => {
  return (
    <main style={{ backgroundColor: `${bgColor}` }} className={cx('wrapper')}>
      <div className={cx('body')}>
        <div className={cx('img')}>
          {!isLoading ? (
            <LazyLoadImage effect="blur" src={thumbnail} alt={title} />
          ) : (
            <Skeleton height={'100%'} />
          )}
        </div>
        <div className={cx('content')}>
          {!isLoading ? (
            <>
              {' '}
              <p className={cx('type')}>
                {(type === 'album' && 'Album') ||
                  (type === 'single' && 'Single') ||
                  (type === 'compilation' && 'Compilation') ||
                  type}
              </p>
              <h2 className={cx('title')}>{title}</h2>
              <div className={cx('desc')}>
                <ArtistList data={htmlCleaner(stringCleaner(desc))} />
              </div>
              <div className={cx('quantity')}>
                <div
                  style={{ backgroundImage: `url(${logoImage})` }}
                  className={cx('logo')}
                ></div>
                {(type === 'album' || type === 'single' || type === 'compilation') && (
                  <>
                    <div className={cx('artist')}>
                      {<SubTitle isWhiteColor={isWhiteColor} data={artists} />}
                    </div>{' '}
                    <div className={cx('dot')}></div>{' '}
                    <div className={cx('release-date')}>{releaseDate?.slice(0, 4)}</div>
                  </>
                )}
                <div className={cx('dot')}></div>
                <div className={'text'}>{`${quantity || 0} songs`}</div>
              </div>{' '}
            </>
          ) : (
            <div style={{}} className={cx('skeleton')}>
              <Skeleton height={'20px'} width={'70px'} borderRadius={50} />
              <Skeleton height={'50px'} width={'90%'} borderRadius={50} />
            </div>
          )}
        </div>
      </div>
      <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
    </main>
  )
}

export default memo(Header)
