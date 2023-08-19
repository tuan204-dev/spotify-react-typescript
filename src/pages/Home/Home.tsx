import { Footer, Greeting, Navbar, Section } from '@/components'
import { HomePageContext } from '@/contexts/HomePageContext'
import { PlayerContext } from '@/contexts/PlayerContext'
import { documentTitle } from '@/utils'
import classNames from 'classnames/bind'
import { useContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

const Home: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)

  const { isPlaying, prevDocumentTitle } = useContext(PlayerContext)
  const {
    featurePlaylist,
    newReleases,
    suggestArtists,
    topMixes,
    trending,
    chill,
    focus,
    jazz,
    mood,
  } = useContext(HomePageContext)

  useEffect(() => {
    if (isPlaying) {
      prevDocumentTitle.current = 'Spotify - Clone'
    } else {
      documentTitle('Spotify - Clone')
    }
  }, [isPlaying])

  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
    threshold: 0,
  })

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
    } else setNavOpacity(yAxis / 64)
  }

  return (
    <div className={cx('home')}>
      <Navbar type="home" navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => isTracking && handleScroll(e)} className={cx('body')}>
        <div
          ref={pivotTrackingRef}
          className={cx('pivot-tracking')}
          style={{ top: '100px' }}
        ></div>
        <Greeting bgColor={bgColor} setBgColor={setBgColor} />
        <Section
          apiType="spotify"
          title={trending?.title}
          href={trending?.href}
          data={trending?.data}
          dataType={trending?.dataType}
        />
        <Section
          apiType="spotify"
          title={featurePlaylist?.title}
          href={featurePlaylist?.href}
          data={featurePlaylist?.data}
          dataType={featurePlaylist?.dataType}
        />
        <Section
          apiType="spotify"
          title={suggestArtists?.title}
          href={suggestArtists?.href}
          data={suggestArtists?.data}
          dataType={suggestArtists?.dataType}
        />
        <Section
          apiType="spotify"
          title={focus?.title}
          href={focus?.href}
          data={focus?.data}
          dataType={focus?.dataType}
        />
        <Section
          apiType="spotify"
          title={newReleases?.title}
          href={newReleases?.href}
          data={newReleases?.data}
          dataType={newReleases?.dataType}
        />
        <Section
          apiType="spotify"
          title={topMixes?.title}
          href={topMixes?.href}
          data={topMixes?.data}
          dataType={topMixes?.dataType}
        />
        <Section
          apiType="spotify"
          title={chill?.title}
          href={chill?.href}
          data={chill?.data}
          dataType={chill?.dataType}
        />
        <Section
          apiType="spotify"
          title={jazz?.title}
          href={jazz?.href}
          data={jazz?.data}
          dataType={jazz?.dataType}
        />
        <Section
          apiType="spotify"
          title={mood?.title}
          href={mood?.href}
          data={mood?.data}
          dataType={mood?.dataType}
        />

        <Footer />
      </div>
    </div>
  )
}

export default Home
