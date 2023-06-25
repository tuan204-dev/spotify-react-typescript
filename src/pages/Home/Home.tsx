import Greeting from '@/components/Greeting/Greeting'
import Navbar from '@/components/Navbar/Navbar'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react'
import styles from './Home.module.scss'
import Footer from '@/components/Footer/Footer'
import Section, { SectionProps } from '@/components/Section/Section'

const cx = classNames.bind(styles)

const Home = () => {
  const [bgColor, setBgColor] = useState<string>('#c0b8c1')
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [trendingData, setTrendingData] = useState<SectionProps | null>(
    null
  )
  const [topMixesData, setTopMixesData] = useState<SectionProps | null>(
    null
  )
  const [albumsData, setAlbumsData] = useState<SectionProps | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      const trendingRes = await fetch('/data/trending.json')
      const trendingData = await trendingRes.json()
      setTrendingData(trendingData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const topMixesRes = await fetch('/data/topMixes.json')
      const topMixesData = await topMixesRes.json()
      setTopMixesData(topMixesData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const albumsRes = await fetch('/data/initAlbums.json')
      const albumsData = await albumsRes.json()
      setAlbumsData(albumsData)
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
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Greeting bgColor={bgColor} setBgColor={setBgColor} />
        <Section {...trendingData}/>
        <Section {...topMixesData}/>
        <Section {...albumsData}/>
        <Footer />
      </div>
    </div>
  )
}

export default Home
