import { SpotifyTrack } from '@/types/track'
import classNames from 'classnames/bind'
import { FC, memo, useState } from 'react'
import { SongItem } from '..'
import styles from './TopTracks.module.scss'

const cx = classNames.bind(styles)

interface TopTrackProps {
  songList?: SpotifyTrack[]
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
              .map((item, index: number) => (
                <SongItem
                  id={item?.id}
                  type="artist"
                  key={item?.id ?? index}
                  songName={item?.name}
                  artists={item?.artists}
                  thumb={item?.album?.images?.[item?.album?.images?.length - 1]?.url}
                  duration={item?.duration_ms}
                  order={index + 1}
                  originalData={item}
                />
              ))
          : Array(10)
              .fill(0)
              ?.slice(0, isLess ? 5 : 10)
              .map((item: any, index: number) => (
                <SongItem key={item + index} type="artist" isLoading={true} />
              ))}
      </div>
      {songList?.length && songList?.length > 5 && (
        <div className={cx('show-more-btn')}>
          <button onClick={() => setLess(!isLess)}>
            {isLess ? 'See more' : 'Show less'}
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(TopTrack)
