/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useContext } from 'react'
import styles from './SongList.module.scss'
import classNames from 'classnames/bind'
import SongItem from '../SongItem/SongItem'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { useInView } from 'react-intersection-observer'
import { ClockIcon } from '@/assets/icons'
import { SongListProps } from '@/types/track'

const cx = classNames.bind(styles)

const SongList: FC<SongListProps> = ({
  songList,
  pivotTop,
  isLoading = false,
  top,
  type = 'default',
}) => {
  const { width } = useContext(MainLayoutContext)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  return (
    <div className={cx('wrapper')}>
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
      <div className={cx('songs')}>
        {(() => {
          let order = 1
          if (!isLoading) {
            return songList?.map((item: any, index: number) => (
              <SongItem
                type={type}
                key={index}
                order={order++}
                thumb={
                  item?.album?.images[item?.album?.images?.length - 1]?.url ||
                  item?.track?.album?.images[item?.track?.album?.images?.length - 1]?.url
                }
                songName={item?.name || item?.track?.name}
                artists={item?.artists || item?.track?.artists}
                albumData={{
                  name: item?.album?.name || item?.track?.album?.name,
                  id: item?.track?.album?.id,
                }}
                dateAdd={item?.added_at}
                duration={item?.duration_ms || item?.track?.duration_ms}
                isExplicit={item?.explicit || item?.track?.explicit}
                isLoading={isLoading}
                id={item?.track?.id || item?.id}
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
