import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import styles from './Home.module.scss'
import { Footer, Greeting, Navbar, Section } from '@/components'
import { SectionProps } from '@/components/Section/Section'
import { getAccessToken, getNewReleases } from './../../utils/fetchData'

const cx = classNames.bind(styles)

const Home: React.FC = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [albumsData, setAlbumsData] = useState<SectionProps | null>(null)
  const [playlistData, setPlaylistData] = useState<SectionProps | null>(
    null
  )
  const [artistsData, setArtistsData] = useState<any>()
  // const [trendingData, setTrendingData] = useState<SectionProps | null>(
  //   null
  // )
  // const [topMixesData, setTopMixesData] = useState<SectionProps | null>(
  //   null
  // )

  const [newReleasesData, setNewReleaseData] = useState<any>()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const trendingRes = await fetch('/data/00001.json')
  //     const trendingData = await trendingRes.json()
  //     // console.log(trendingData)
  //     setTrendingData(trendingData)
  //   }

  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const topMixesRes = await fetch('/data/00002.json')
  //     const topMixesData = await topMixesRes.json()
  //     setTopMixesData(topMixesData)
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const responseData = await getNewReleases({
        accessToken: token,
        limit: 10,
        country: 'VN',
      })

      setNewReleaseData({
        title: 'New Releases',
        href: '/section?newReleases',
        dataType: 'album',
        data: responseData
      })
    }

    fetchData()
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

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ): void => {
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
        {/* <Section {...trendingData} />
        <Section {...playlistData} />
        <Section {...topMixesData} /> */}
        {/* <Section {...albumsData}/> */}
        <Section
          title={newReleasesData?.title}
          href={newReleasesData?.href}
          data={newReleasesData?.data}
          dataType={newReleasesData?.dataType}
        />
        <Section
          title={playlistData?.title}
          href={playlistData?.href}
          data={playlistData?.data}
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
