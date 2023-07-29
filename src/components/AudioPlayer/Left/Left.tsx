import { HeartIcon } from '@/assets/icons'
import { Image, SubTitle } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import { useEllipsisHorizontal } from '@/hooks'
import classNames from 'classnames/bind'
import { FC, useContext, useMemo, useRef } from 'react'
import Marquee from 'react-fast-marquee'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import styles from './Left.module.scss'

const cx = classNames.bind(styles)

const Left: FC = () => {
  const { playBarData, playingType } = useContext(PlayerContext)
  const isLoading = useMemo(
    () => Boolean(!playBarData?.trackName),
    [playBarData?.trackName]
  )

  const trackNameRef = useRef<any>()
  const isEllipsisActive = useEllipsisHorizontal(
    trackNameRef.current,
    playBarData?.trackName
  )

  return (
    <div className={cx('wrapper')}>
      <div className={cx('thumb')}>
        <Image src={playBarData?.thumb} alt={playBarData?.trackName} />
      </div>
      <div className={cx('body')}>
        <div>
          <div ref={trackNameRef} className={cx('name')}>
            <span className={cx('pivot')}>{playBarData?.trackName}</span>
            {!isLoading ? (
              isEllipsisActive ? (
                <Marquee speed={15} pauseOnHover={true}>
                  <Link
                    to={
                      playingType === 'track'
                        ? `/album/${playBarData?.albumId}`
                        : `/episode/${playBarData?.episode}`
                    }
                  >
                    <span>{playBarData?.trackName}</span>
                  </Link>
                </Marquee>
              ) : (
                <Link
                  to={
                    playingType === 'track'
                      ? `/album/${playBarData?.albumId}`
                      : `/episode/${playBarData?.episode}`
                  }
                >
                  <span>{playBarData?.trackName}</span>
                </Link>
              )
            ) : (
              <Skeleton width={124} height={16} borderRadius={50} />
            )}
          </div>
          <div className={cx('artists')}>
            {!isLoading ? (
              <SubTitle
                fontSize={11}
                apiType="spotify"
                type={playingType === 'track' ? 'artist' : 'show'}
                data={playingType === 'track' ? playBarData?.artists : playBarData?.show}
              />
            ) : (
              <Skeleton width={50} borderRadius={50} />
            )}
          </div>
        </div>
      </div>
      <div className={cx('icon')}>{!isLoading && <HeartIcon size={16} />}</div>
    </div>
  )
}

export default Left
