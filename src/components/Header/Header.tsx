import React from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import logoImage from '@/assets/image/logo/logo.svg'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface HeaderProps {
  title?: string
  thumbnail?: string
  quantity?: number
  type?: 'playlist' | 'album'
  bgColor?: string
  isLoading?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  thumbnail,
  quantity,
  bgColor,
  isLoading,
}) => {
  console.log(title)

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
              <p className={cx('type')}>Playlist</p>
              <h2 className={cx('title')}>{title}</h2>
              <div className={cx('quantity')}>
                <div
                  style={{ backgroundImage: `url(${logoImage})` }}
                  className={cx('logo')}
                ></div>
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

export default Header
