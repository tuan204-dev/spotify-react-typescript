import { FC } from 'react'
import styles from './ArtistBanner.module.scss'
import classNames from 'classnames/bind'
import { Verified } from '@/assets/icons'

const cx = classNames.bind(styles)

interface ArtistBannerProps {
  name: string
  avatar: string
  followerNumber?: number
  dominantColor?: string
  monthlyListeners: number
  bgBannerOpacity?: number
  isVerified?: boolean
  isHeaderImg?: boolean
  isLoading?: boolean
}

const ArtistBanner: FC<ArtistBannerProps> = (props) => {
  const {
    name,
    monthlyListeners,
    dominantColor,
    bgBannerOpacity,
    isVerified,
    isHeaderImg,
    avatar,
    isLoading,
  } = props

  console.log('rerender')

  return (
    <div className={cx({ wrapper: true, 'no-header-img': !isHeaderImg })}>
      <div className={cx('main')}>
        {!isHeaderImg && (
          <div className={cx('avatar')}>
            <img src={avatar} alt="avt" />
          </div>
        )}
        <div className={cx('info')}>
          {isVerified && (
            <div className={cx('verified')}>
              <span className={cx('icon')}>
                <Verified />
                <div className={cx('check-white')}></div>
              </span>
              <span className={cx('text')}>Verified Artist</span>
            </div>
          )}
          <h1 className={cx('name')}>{name}</h1>
          {!isLoading && (
            <span className={cx('monthly-listener')}>
              {monthlyListeners?.toLocaleString()} monthly listeners
            </span>
          )}
        </div>
      </div>
      <div
        className={cx('blur')}
        style={{
          backgroundColor: dominantColor,
          opacity: isHeaderImg ? bgBannerOpacity : 1,
        }}
      ></div>
    </div>
  )
}

export default ArtistBanner
