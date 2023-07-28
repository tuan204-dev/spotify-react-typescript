import { Footer, Navbar, SongItem, SongList } from '@/components'
import { PlayerContext } from '@/contexts/PlayerContext'
import { documentTitle } from '@/utils'
import classNames from 'classnames/bind'
import { FC, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Queue.module.scss'

const cx = classNames.bind(styles)

const Queue: FC = () => {
  const {
    queue,
    currentTrack,
    currentTrackIndex,
    isShuffle,
    isPlaying,
    prevDocumentTitle,
  } = useContext(PlayerContext)

  useEffect(() => {
    if (isPlaying) {
      prevDocumentTitle.current = 'Spotify - Play Queue'
    } else {
      documentTitle('Spotify - Play Queue')
    }
  }, [isPlaying])

  const queueNormalized = queue.filter((item) => item)

  return (
    <main className={cx('queue-wrapper')}>
      <Navbar />
      <div className={cx('body')}>
        {queueNormalized.length !== 0 ? (
          <>
            <h1 className={cx('title')}>Queue</h1>
            <div className={cx('now-playing')}>
              <h2 className={cx('sub-title')}>Now playing</h2>
              <SongItem
                id={currentTrack?.id}
                albumData={currentTrack?.album}
                artists={currentTrack?.artists}
                duration={currentTrack?.duration_ms}
                isExplicit={currentTrack?.explicit}
                order={1}
                songName={currentTrack?.name}
                thumb={
                  currentTrack?.album?.images?.[currentTrack?.album?.images?.length - 1]
                    ?.url ?? currentTrack?.images?.[currentTrack?.images?.length - 1]?.url
                }
                originalData={currentTrack}
              />
            </div>
            {queue?.filter((item) => item)?.length > 1 && (
              <div className={cx('queue-list')}>
                <h2 className={cx('sub-title')}>Next</h2>
                <SongList
                  inclHeader={false}
                  songList={
                    isShuffle
                      ? queueNormalized.filter((track) => track?.id !== currentTrack?.id)
                      : queueNormalized.slice(currentTrackIndex + 1)
                  }
                  adjustOrder={1}
                />
              </div>
            )}
          </>
        ) : (
          <div className={cx('queue-notify')}>
            <h1 className={cx('content')}>No Queue Tracks</h1>
            <Link to="/">
              <div className={cx('home-btn')}>Home</div>
            </Link>
            <a
              className={cx('help')}
              href="https://www.facebook.com/tuan204.dev"
              target="_blank"
            >
              Help
            </a>
          </div>
        )}
        <Footer />
      </div>
    </main>
  )
}

export default Queue
