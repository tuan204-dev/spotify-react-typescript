import { FC } from 'react'
import styles from './ArtistBanner.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ArtistBannerProps {
  name: string
  followerNumber: number
  imgBanner: string
}

const ArtistBanner: FC<ArtistBannerProps> = (props) => {
  const { name, followerNumber, imgBanner } = props

  return (
    <div className={cx('wrapper')} style={{ backgroundImage: `url(${imgBanner})` }}>
      <h1 className={cx('name')}>{name}</h1>
      <span className={cx('follower')}>{followerNumber} followers</span>
    </div>
  )
}

export default ArtistBanner
