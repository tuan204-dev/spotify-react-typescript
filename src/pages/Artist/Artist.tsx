import React from 'react'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'
import styles from './Artist.module.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchArtistData, getAccessToken } from '@/utils/fetchData'
import { Navbar } from '@/components'
import ArtistBanner from '@/components/ArtistBanner/ArtistBanner'

const cx = classNames.bind(styles)

const Artist: React.FC = () => {
  const [data, setData] = useState<any>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [navPlayBtnVisible, setNavPlayBtnVisble] = useState<boolean>(false)

  const { search } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await fetchArtistData({
        accessToken: token,
        id: search.substring(1),
      })
      console.log(data)
      setData(data)
    }

    if (search !== '?undefined') {
      fetchData()
    }
  }, [search])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
      return
    }
    setNavOpacity(yAxis / 64)
  }

  return (
    <main className={cx('wrapper')}>
      <Navbar
        type="artist"
        artistName={data?.name}
        playBtnVisible={navPlayBtnVisible}
        navOpacity={navOpacity}
      />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <ArtistBanner
          name={data?.name}
          followerNumber={data?.followers.total}
          imgBanner={data?.images[0].url}
        />
      </div>
    </main>
  )
}

export default Artist
