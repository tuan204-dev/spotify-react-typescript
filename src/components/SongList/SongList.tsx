/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useContext } from 'react'
import styles from './SongList.module.scss'
import classNames from 'classnames/bind'
import SongItem from '../SongItem/SongItem'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { useInView } from 'react-intersection-observer'
import { ClockIcon } from '@/assets/icons'
import { SongListProps } from '@/types/track'
import { PlayerContext } from '@/contexts/PlayerContext'

const cx = classNames.bind(styles)

const SongList: FC<SongListProps> = ({
  songList,
  pivotTop,
  isLoading = false,
  top,
  type = 'default',
  albumId,
  albumImages,
  inclHeader = true,
  albumName,
  albumType,
  adjustOrder = 0,
}) => {
  const { width } = useContext(MainLayoutContext)
  const { playingType } = useContext(PlayerContext)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  return (
    <div className={cx('wrapper')}>
      {inclHeader && (
        <>
          <div
            ref={ref}
            style={{
              position: 'absolute',
              top: `-${pivotTop}px`,
            }}
          ></div>
          <div
            style={{ top: `${top}px` }}
            className={cx({
              'freeze-top-row': true,
              stuck: !inView,
              'grid-md': width <= 780,
              'is-album-track': type === 'album',
            })}
          >
            {type !== 'album' ? (
              <>
                {' '}
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                {width > 780 && <div>Date added</div>}
                <div className={cx('clock-icon')}>
                  <ClockIcon />
                </div>{' '}
              </>
            ) : (
              <>
                <div>#</div>
                <div>Title</div>
                <div className={cx('clock-icon')}>
                  <ClockIcon />
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div className={cx('songs')}>
        {(() => {
          let order = 1
          if (!isLoading) {
            return songList?.map((item: any, index: number) => (
              <SongItem
                type={type}
                key={index}
                order={order++ + adjustOrder}
                thumb={
                  item?.album?.images?.[item?.album?.images?.length - 1]?.url ||
                  item?.track?.album?.images[item?.track?.album?.images?.length - 1]
                    ?.url ||
                  item?.images?.[item?.images?.length - 1]?.url
                }
                songName={item?.name ?? item?.track?.name}
                artists={item?.artists ?? item?.track?.artists}
                albumData={{
                  name: item?.album?.name ?? item?.track?.album?.name,
                  id: item?.track?.album?.id ?? item?.album?.id,
                }}
                dateAdd={item?.added_at}
                duration={item?.duration_ms ?? item?.track?.duration_ms}
                isExplicit={item?.explicit ?? item?.track?.explicit}
                isLoading={isLoading}
                id={item?.track?.id ?? item?.id}
                originalData={
                  (type === 'playlist' && item?.track) ||
                  (type === 'album' && {
                    ...item,
                    album: {
                      images: albumImages,
                      id: albumId,
                      album_type: albumType,
                      name: albumName,
                    },
                  }) ||
                  (playingType === 'show' && item) ||
                  item
                }
              />
            ))
          } else {
            return Array(9)
              ?.fill(0)
              ?.map((item, index) => (
                <SongItem isLoading={isLoading} key={item + index} />
              ))
          }
        })()}
      </div>
    </div>
  )
}

export default memo(SongList)
