import { FC, useContext, useEffect } from 'react'
import styles from './PlayingView.module.scss'
import classNames from 'classnames/bind'
import { PlayerContext } from '@/contexts/PlayerContext'
import { AboutArtist } from '..'
import { ArtistContext } from '@/contexts/ArtistContext'
import { Image, SubTitle } from '../UIs'
import Marquee from 'react-fast-marquee'
import { CloseIcon, HeartIcon } from '@/assets/icons'
import { Link } from 'react-router-dom'
import { AppContext } from '@/App'
import NextSong from './NextSong/NextSong'

const cx = classNames.bind(styles)

const PlayingView: FC = () => {
  const { currentTrack, queue, nextTrackIndex } = useContext(PlayerContext)
  const { setId, isLoading, profile, stats, aboutImg, avatarImg } =
    useContext(ArtistContext)
  const { setPlayingViewShowed } = useContext(AppContext)

  useEffect(() => {
    setId(currentTrack?.artists?.[0]?.id)
  }, [currentTrack])

  return (
    <div className={cx('playing-view-wrapper')}>
      <div>
        <div className={cx('header')}>
          <div className={cx('close-btn')}>
            <button onClick={() => setPlayingViewShowed(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className={cx('track-banner')}>
          <div>
            <Image src={currentTrack?.album?.images?.[0]?.url} alt={currentTrack?.name} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('title')}>
            <Link to={`/album/${currentTrack?.album?.id}`}>
              <Marquee pauseOnHover={true} speed={25}>
                <h2 className={cx('name-track')}>{currentTrack?.name}</h2>
              </Marquee>
            </Link>
            <span className={cx('artist')}>
              <Marquee pauseOnHover={true} speed={35}>
                <SubTitle data={currentTrack?.artists} fontSize={16} type="artist" />
              </Marquee>
            </span>
          </div>
          <div className={cx('heart-btn')}>
            <HeartIcon size={16} />
          </div>
        </div>
        <div className={cx('about-artist')}>
          <div>
            <AboutArtist
              type="playing-view"
              profile={profile}
              stats={stats}
              aboutImg={aboutImg ?? avatarImg}
              inclHeader={false}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className={cx('next-song')}>
          <NextSong nextSong={queue[nextTrackIndex]} />
        </div>
      </div>
    </div>
  )
}

export default PlayingView
