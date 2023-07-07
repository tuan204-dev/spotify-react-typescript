import { FC, useState } from 'react'
import styles from './TopTracks.module.scss'
import classNames from 'classnames/bind'
import { SongItemProps } from '../../../types'
import { SongItem } from '..'

const cx = classNames.bind(styles)

interface TopTrackProps {
  songList: SongItemProps[]
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
            key={index}
            songName={item.name}
            artists={item.artists}
            thumb={item.album.images[item.album.images.length - 1].url}
            duration={item.duration_ms}
            order={index + 1}
            isExplicit={item.explicit}
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
