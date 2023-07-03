import { Footer, Greeting, Navbar, Section } from '@/components'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { SectionProps } from '../../../types'
import styles from './Home.module.scss'
import { fetchHomePageSectionData } from '@/utils'

const cx = classNames.bind(styles)

const Home: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [featurePlaylistData, setFeaturePlaylist] = useState<SectionProps>()
  const [newReleasesData, setNewReleaseData] = useState<SectionProps>()
  const [topMixes, setTopMixes] = useState<SectionProps>()
  const [suggestArtists, setSuggestArtists] = useState<SectionProps>()

  useEffect(() => {
    fetchHomePageSectionData({ type: 'newRelease', setData: setNewReleaseData })
    fetchHomePageSectionData({ type: 'featuredPlaylists', setData: setFeaturePlaylist })
    fetchHomePageSectionData({ type: 'topMixes', setData: setTopMixes })
    fetchHomePageSectionData({
      type: 'suggestedArtists',
      setData: setSuggestArtists,
    })
  }, [])

  console.log(suggestArtists)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    // console.log(yAxis)
    if (yAxis > 64) {
      setNavOpacity(1)
      return
    }
    setNavOpacity(yAxis / 64)
  }

  return (
    <div className={cx('home')}>
      <Navbar isHome navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Greeting bgColor={bgColor} setBgColor={setBgColor} />
        <Section
          title={newReleasesData?.title}
          href={newReleasesData?.href}
          data={newReleasesData?.data}
          dataType={newReleasesData?.dataType}
        />
        <Section
          title={featurePlaylistData?.title}
          href={featurePlaylistData?.href}
          data={featurePlaylistData?.data}
          dataType={featurePlaylistData?.dataType}
        />
        <Section
          title={topMixes?.title}
          href={topMixes?.href}
          data={topMixes?.data}
          dataType={topMixes?.dataType}
        />
        <Section
          title={suggestArtists?.title}
          href={suggestArtists?.href}
          data={suggestArtists?.data}
          dataType={suggestArtists?.dataType}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Home
