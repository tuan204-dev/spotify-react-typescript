import { SongItem } from '@/components'
import { Image, PlayButton, SubTitle } from '@/components/UIs'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import classNames from 'classnames/bind'
import { FC, useContext, useLayoutEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './TopResult.module.scss'
import { PlayerContext } from '@/contexts/PlayerContext'
import { SpotifyTrack } from '@/types/track'

const cx = classNames.bind(styles)

interface TopResultProps {
  topResult: SpotifyTrack
  songs: SpotifyTrack[]
}

const TopResult: FC<TopResultProps> = ({ topResult, songs }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const { width } = useContext(MainLayoutContext)
  const {
    setCurrentTrack,
    setQueue,
    setCurrentTrackIndex,
    calNextTrackIndex,
    setPlayingType,
    currentTrack
  } = useContext(PlayerContext)

  useLayoutEffect(() => {
    if (topResult && songs && topResult?.album?.images?.[0]?.url) {
      setLoading(false)
    } else setLoading(true)
  }, [topResult, songs])

  const handleClickPlayBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (currentTrack?.id === topResult?.id) return
    setCurrentTrack({ ...topResult })
    setQueue([{ ...topResult }])
    setCurrentTrackIndex(0)
    setPlayingType('track')
    calNextTrackIndex()
  }

  return (
    <div className={cx({ wrapper: true, responsive: width <= 1000 })}>
      <div className={cx('left')}>
        <div className={cx('header')}>
          <h2 className={cx('heading')}>Top result</h2>
        </div>
        <div className={cx('body')}>
          <div className={cx('thumb')}>
            {!isLoading ? (
              <Image src={topResult?.album?.images?.[0]?.url} alt={topResult?.name} />
            ) : (
              <Skeleton height="100%" width="100%" />
            )}
          </div>
          <div className={cx('main')}>
            <>
              <div className={cx('name')}>
                {!isLoading ? (
                  <h3>{topResult?.name}</h3>
                ) : (
                  <Skeleton height="30px" width="180px" borderRadius={50} />
                )}
              </div>
              <div className={cx('artists')}>
                {!isLoading ? (
                  <SubTitle data={topResult?.artists} />
                ) : (
                  <Skeleton height="18px" width="240px" borderRadius={50} />
                )}
              </div>
            </>
          </div>
          <div className={cx('btn-pivot')}>
            {!isLoading && (
              <div onClick={(e) => handleClickPlayBtn(e)} className={cx('play-btn')}>
                <PlayButton
                  size={50}
                  scaleHovering={1.05}
                  transitionDuration={33}
                  fontSize={24}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cx('right')}>
        <div className={cx('header')}>
          <h2 className={cx('heading')}>Songs</h2>
        </div>
        <div className={cx('body')}>
          {!isLoading
            ? songs
                ?.slice(0, 4)
                .map((item, index) => (
                  <SongItem
                    id={item?.id}
                    isLoading={isLoading}
                    key={item?.id || index}
                    songName={item?.name}
                    artists={item?.artists}
                    thumb={item?.album?.images?.[item?.album?.images?.length - 1]?.url}
                    duration={item.duration_ms}
                    order={index + 1}
                    albumData={{ name: item?.album?.name }}
                    isExplicit={item?.explicit}
                    type="search"
                    originalData={item}
                  />
                ))
            : Array(4)
                .fill(0)
                .map((item, index) => (
                  <SongItem
                    isLoading={isLoading}
                    type="search"
                    key={index}
                    order={item}
                  />
                ))}
        </div>
      </div>
    </div>
  )
}

export default TopResult
