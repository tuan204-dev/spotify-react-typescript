import classNames from 'classnames/bind'
import { FC, memo, useState } from 'react'
import { SongItem } from '..'
import { SongItemProps } from '../../../types'
import styles from './TopTracks.module.scss'

const cx = classNames.bind(styles)

interface TopTrackProps {
  songList: {
    track: SongItemProps
  }[]
  isLoading?: boolean
}

const TopTrack: FC<TopTrackProps> = ({ songList, isLoading }) => {
  const [isLess, setLess] = useState<boolean>(true)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>Popular</h2>
      </div>
      <div className={cx('song-list')}>
        {!isLoading
          ? songList
              ?.slice(0, isLess ? 5 : 10)
              .map((item: any, index: number) => (
                <SongItem
                  type="artist"
                  key={item.track.id || index}
                  songName={item.track.name}
                  artists={item.track.artists}
                  thumb={
                    item.track.album.coverArt.sources[
                      item.track.album.coverArt.sources.length - 1
                    ].url
                  }
                  duration={item.track.duration.totalMilliseconds}
                  order={index + 1}
                />
              ))
          : Array(10)
              .fill(0)
              ?.slice(0, isLess ? 5 : 10)
              .map((item: any, index: number) => (
                <SongItem key={item + index} type="artist" isLoading={true} />
              ))}
      </div>
      <div className={cx('show-more-btn')}>
        <button onClick={() => setLess(!isLess)}>
          {isLess ? 'See more' : 'Show less'}
        </button>
      </div>
    </div>
  )
}

export default memo(TopTrack)
