import { FC, useContext } from 'react'
import styles from './Queue.module.scss'
import classNames from 'classnames/bind'
import { PlayerContext } from '@/contexts/PlayerContext'
import { Footer, Navbar, SongList } from '@/components'
import { useDocumentTitle } from 'usehooks-ts'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Queue: FC = () => {
  const { queue } = useContext(PlayerContext)
  useDocumentTitle('Spotify - Play Queue')
  const queueNormalized = queue.filter((item) => item)

  return (
    <main className={cx('queue-wrapper')}>
      <Navbar />
      <div className={cx('body')}>
        {queueNormalized.length !== 0 ? (
          <>
            <h1 className={cx('title')}>Queue</h1>
            <div className={cx('queue-list')}>
              <SongList inclHeader={false} songList={queueNormalized} />
            </div>
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
