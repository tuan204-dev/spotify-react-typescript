import { FC, useState } from 'react'
import styles from './TopTracks.module.scss'
import classNames from 'classnames/bind'
import { SongItemProps } from '../../../types'
import { SongItem } from '..'

const cx = classNames.bind(styles)

interface TopTrackProps {
  songList: {
    track: SongItemProps
  }[]
}

const TopTrack: FC<TopTrackProps> = ({ songList }) => {
  const [isLess, setLess] = useState<boolean>(true)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <h2>Popular</h2>
      </div>
      <div className={cx('song-list')}>
        {songList?.slice(0, isLess ? 5 : 10).map((item: any, index: number) => (
          <SongItem
            type="artist"
            key={index}
            songName={item.track.name}
            artists={item.track.artists}
            thumb={item.track.album.coverArt.sources[item.track.album.coverArt.sources.length - 1].url}
            duration={item.track.duration.totalMilliseconds}
            order={index + 1}
          />
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

export default TopTrack
