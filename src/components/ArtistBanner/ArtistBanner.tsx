import { Verified } from '@/assets/icons'
import classNames from 'classnames/bind'
import { FC } from 'react'
import styles from './ArtistBanner.module.scss'
import { Image } from '../UIs'

const cx = classNames.bind(styles)

interface ArtistBannerProps {
  name?: string
  avatar?: string
  followerNumber?: number
  dominantColor?: string
  monthlyListeners?: number
  bgBannerOpacity?: number
  isVerified?: boolean
  inclHeaderImg?: boolean
  isLoading?: boolean
}

const ArtistBanner: FC<ArtistBannerProps> = (props) => {
  const {
    name,
    monthlyListeners,
    dominantColor,
    bgBannerOpacity,
    isVerified,
    inclHeaderImg,
    avatar,
    isLoading,
  } = props

  return (
    <div className={cx({ wrapper: true, 'no-header-img': !inclHeaderImg })}>
      {!isLoading && (
        <div className={cx('main')}>
          {!inclHeaderImg && (
            <div className={cx('avatar')}>
              {/* <img src={avatar} alt="avt" /> */}
              <Image src={avatar} alt="avt" />
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
      )}
      <div
        className={cx('blur')}
        style={{
          backgroundColor: dominantColor,
          opacity: inclHeaderImg ? bgBannerOpacity : 1,
        }}
      ></div>
    </div>
  )
}

export default ArtistBanner
