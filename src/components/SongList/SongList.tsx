import { FC, useContext } from 'react'
import styles from './SongList.module.scss'
import classNames from 'classnames/bind'
import SongItem from '../SongItem/SongItem'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { useInView } from 'react-intersection-observer'
import { ClockIcon } from '@/assets/icons'
import { SongListProps } from '../../../types'

const cx = classNames.bind(styles)

const SongList: FC<SongListProps> = ({ songList, pivotTop, isLoading = false }) => {
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
          // zIndex: '-9',
          width: '200px',
          height: '10px',
          backgroundColor: 'red',
        }}
      ></div>
      <div
        className={cx({
          'freeze-top-row': true,
          stuck: !inView,
          'grid-md': width <= 780,
        })}
      >
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        {width > 780 && <div>Date added</div>}
        <div className={cx('clock-icon')}>
          <ClockIcon />
        </div>
      </div>
      <div className={cx('songs')}>
        {(() => {
          let order = 1
          if (!isLoading) {
            return songList?.map((item: any, index: number) => (
              <SongItem
                key={index}
                order={order++}
                thumb={item?.album.images[0].url}
                songName={item?.name}
                artists={item?.artists}
                album={item?.album.name}
                dateAdd={item?.added_at}
                duration={item?.duration_ms}
                isExplicit={item?.explicit}
                isLoading={isLoading}
              />
            ))
          } else {
            return Array(9)
              .fill(0)
              .map((item, index) => <SongItem isLoading={isLoading} key={item + index} />)
          }
        })()}
      </div>
    </div>
  )
}

export default SongList
