import { CurrentTrack, PlayerContext } from '@/contexts/PlayerContext'
import { ShowItem as ShowItemProps } from '@/types/show'
import { dateFormatConvertor } from '@/utils'
import durationConvertor from '@/utils/durationConvertor'
import classNames from 'classnames/bind'
import { FC, memo, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { Image, PlayButton } from '../UIs'
import styles from './ShowItem.module.scss'

const cx = classNames.bind(styles)

interface ShowItemComponentProps {
  isLoading?: boolean
  show?: {
    name?: string
    id?: string
    publisher?: string
  }
  item?: ShowItemProps
}

const ShowItem: FC<ShowItemComponentProps> = ({ item, show, isLoading }) => {
  const {
    setQueue,
    setCurrentTrack,
    setCurrentTrackIndex,
    setPlayingType,
    calNextTrackIndex,
  } = useContext(PlayerContext)

  const navigate = useNavigate()

  const handleClickPlayBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    const dataNormalized = { ...item, show }
    setQueue([{ ...(dataNormalized as CurrentTrack) }])
    setCurrentTrack({ ...dataNormalized })
    setCurrentTrackIndex(0)
    setPlayingType('show')
    calNextTrackIndex()
  }

  return (
    <div className={cx('main')}>
      <div
        onClick={() => navigate(`/episode/${item?.id}`)}
        className={cx('show-item-wrapper')}
      >
        <div className={cx('thumb')}>
          {!isLoading ? (
            <Image alt={item?.name} src={item?.images?.[0].url} />
          ) : (
            <Skeleton height={'100%'} width={'100%'} />
          )}
        </div>
        <div className={cx('body')}>
          <div className={cx('title')}>
            {!isLoading ? (
              <h4>{item?.name}</h4>
            ) : (
              <Skeleton
                style={{ marginTop: '6px' }}
                height={20}
                width={'30%'}
                borderRadius={500}
              />
            )}
          </div>
          <div className={cx('desc')}>
            {!isLoading ? (
              item?.description
            ) : (
              <Skeleton style={{ marginTop: '16px' }} width={'50%'} borderRadius={500} />
            )}
          </div>
          {!isLoading && (
            <div className={cx('action')}>
              <div onClick={handleClickPlayBtn} className={cx('play-btn')}>
                <PlayButton
                  size={32}
                  bgColor="#fff"
                  scaleHovering={1.04}
                  transitionDuration={33}
                />
              </div>
              <div className={cx('release-date')}>
                <span>{dateFormatConvertor(item?.release_date)}</span>
                <div className={cx('dot')}></div>
                <span>
                  {durationConvertor({ milliseconds: item?.duration_ms, type: 'long' })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ShowItem)
