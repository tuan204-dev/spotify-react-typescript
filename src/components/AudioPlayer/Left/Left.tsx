import { FC, useContext, useMemo } from 'react'
import styles from './Left.module.scss'
import classNames from 'classnames/bind'
import { Image, SubTitle } from '@/components/UIs'
import { Link } from 'react-router-dom'
import { HeartIcon } from '@/assets/icons'
import { PlayerContext } from '@/contexts/PlayerContext'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

const Left: FC = () => {
  const { playBarData } = useContext(PlayerContext)
  const isLoading = useMemo(
    () => Boolean(!playBarData?.trackName),
    [playBarData?.trackName]
  )

  return (
    <div className={cx('wrapper')}>
      <div className={cx('thumb')}>
        <Image src={playBarData?.thumb} alt={playBarData?.trackName} />
      </div>
      <div className={cx('body')}>
        <div className={cx('name')}>
          {!isLoading ? (
            <Link to={`/album/${playBarData?.albumId}`}>
              <span>{playBarData?.trackName}</span>
            </Link>
          ) : (
            <Skeleton width={124} height={16} borderRadius={50} />
          )}
        </div>
        <div className={cx('artists')}>
          {!isLoading ? (
            <SubTitle
              fontSize={11}
              apiType="spotify"
              type="artist"
              data={playBarData?.artists}
            />
          ) : (
            <Skeleton width={50} borderRadius={50} />
          )}
        </div>
      </div>
      <div className={cx('icon')}>{!isLoading && <HeartIcon size={16} />}</div>
    </div>
  )
}

export default Left
