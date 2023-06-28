import React, {memo} from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import logoImage from '@/assets/image/logo/logo.svg'
import Skeleton from 'react-loading-skeleton'
import htmlCleaner from '@/utils/htmlCleaner'

const cx = classNames.bind(styles)

interface HeaderProps {
  title?: string
  thumbnail?: string
  quantity?: number
  type?: 'Playlist' | 'Album'
  bgColor?: string
  desc?: string
  isLoading?: boolean
  artist?: string
  releaseDate?: string
}

const Header: React.FC<HeaderProps> = ({
  title,
  thumbnail,
  quantity,
  bgColor,
  desc,
  isLoading,
  type,
  artist,
  releaseDate,
}) => {
  // console.log(desc)

  return (
    <main
      style={{ backgroundColor: `${bgColor}` }}
      className={cx('wrapper')}
    >
      <div className={cx('body')}>
        <div className={cx('img')}>
          {!isLoading ? (
            <img src={thumbnail} alt={title} />
          ) : (
            <Skeleton height={'100%'} />
          )}
        </div>
        <div className={cx('content')}>
          {!isLoading ? (
            <>
              {' '}
              <p className={cx('type')}>{type}</p>
              <h2 className={cx('title')}>{title}</h2>
              <span className={cx('desc')}>{htmlCleaner(desc) || ''}</span>
              <div className={cx('quantity')}>
                <div
                  style={{ backgroundImage: `url(${logoImage})` }}
                  className={cx('logo')}
                ></div>
                {type === 'Album' && (
                  <>
                    <div className={cx('artist')}>{artist}</div>{' '}
                    <div className={cx('dot')}></div>{' '}
                    <div className={cx('release-date')}>{releaseDate?.slice(0,4)}</div>
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
      <div
        style={{ backgroundColor: `${bgColor}` }}
        className={cx('bg-blur')}
      ></div>
    </main>
  )
}

export default memo(Header)
