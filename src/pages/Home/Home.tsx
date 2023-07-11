import { Footer, Greeting, Navbar, Section } from '@/components'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { SectionProps } from '../../../types'
import styles from './Home.module.scss'
import { fetchHomePageSectionData } from '@/utils'
import { useDocumentTitle } from 'usehooks-ts'
import { useInView } from 'react-intersection-observer'

const cx = classNames.bind(styles)

const Home: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [featurePlaylistData, setFeaturePlaylist] = useState<SectionProps>()
  const [newReleasesData, setNewReleaseData] = useState<SectionProps>()
  const [topMixes, setTopMixes] = useState<SectionProps>()
  const [suggestArtists, setSuggestArtists] = useState<SectionProps>()

  useDocumentTitle('Spotify - Clone')
  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    fetchHomePageSectionData({ type: 'newRelease', setData: setNewReleaseData })
    fetchHomePageSectionData({ type: 'featuredPlaylists', setData: setFeaturePlaylist })
    fetchHomePageSectionData({ type: 'topMixes', setData: setTopMixes })
    fetchHomePageSectionData({
      type: 'suggestedArtists',
      setData: setSuggestArtists,
    })
  }, [])

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
          style={{ top: '66px' }}
        ></div>
        <Greeting bgColor={bgColor} setBgColor={setBgColor} />
        <Section
          apiType="spotify"
          title={newReleasesData?.title}
          href={newReleasesData?.href}
          data={newReleasesData?.data}
          dataType={newReleasesData?.dataType}
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
          title={featurePlaylistData?.title}
          href={featurePlaylistData?.href}
          data={featurePlaylistData?.data}
          dataType={featurePlaylistData?.dataType}
        />
        <Section
          apiType="spotify"
          title={topMixes?.title}
          href={topMixes?.href}
          data={topMixes?.data}
          dataType={topMixes?.dataType}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Home
