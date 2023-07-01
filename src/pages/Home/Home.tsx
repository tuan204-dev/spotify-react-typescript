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
  const [albumsData, setAlbumsData] = useState<SectionProps | null>(null)
  const [playlistData, setPlaylistData] = useState<SectionProps | null>(null)
  const [artistsData, setArtistsData] = useState<SectionProps>()
  const [featurePlaylistData, setFeaturePlaylist] = useState<SectionProps>()
  const [newReleasesData, setNewReleaseData] = useState<SectionProps>()

  useEffect(() => {
    fetchHomePageSectionData({ type: 'newRelease', setData: setNewReleaseData })
    fetchHomePageSectionData({ type: 'featuredPlaylists', setData: setFeaturePlaylist })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const albumsRes = await fetch('/data/00005.json')
      const albumsData = await albumsRes.json()
      setAlbumsData(albumsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const artistsRes = await fetch('/data/00004.json')
      const artistsData = await artistsRes.json()
      setArtistsData(artistsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const playlistRes = await fetch('/data/00003.json')
      const playlistData = await playlistRes.json()
      setPlaylistData(playlistData)
    }
    fetchData()
  }, [])

  // console.log(trendingData, topMixesData)

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
          title={playlistData?.title}
          href={playlistData?.href}
          data={playlistData?.data?.slice(0, 10)}
          dataType={playlistData?.dataType}
        />
        <Section
          title={albumsData?.title}
          href={albumsData?.href}
          data={albumsData?.data}
          dataType={albumsData?.dataType}
        />
        <Section
          title={artistsData?.title}
          href={artistsData?.href}
          data={artistsData?.data}
          dataType={artistsData?.dataType}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Home
