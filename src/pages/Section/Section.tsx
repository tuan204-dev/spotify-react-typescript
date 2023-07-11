import { Section as SectionContent } from '@/components'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { ArtistContext } from '@/contexts/ArtistContext'
import { fetchHomePageSectionData } from '@/utils'
import { getAccessToken, getFeaturedPlaylists, getNewReleases } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { SectionProps } from '../../../types'
import styles from './Section.module.scss'

const cx = classNames.bind(styles)

const Section: React.FC = () => {
  const [data, setData] = useState<SectionProps | undefined>()
  const featuringRegex = /^\/artist\/.*\/featuring$/
  const relatedRegex = /^\/artist\/.*\/related$/
  const playlistsRegex = /^\/artist\/.*\/playlists$/
  const discoveredOnRegex = /^\/artist\/.*\/discovered-on$/

  const { profile, featuring, relatedArtists, discoveredOn, playlists } =
    useContext(ArtistContext)

  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      if (id === 'newReleases') {
        const token = await getAccessToken()
        const responseData = await getNewReleases({
          accessToken: token,
          limit: 25,
          country: 'VN',
        })

        setData({
          title: 'New Releases',
          href: '/section?newReleases',
          dataType: 'album',
          data: responseData,
          apiType: 'spotify',
        })
      } else if (id === 'featurePlaylist') {
        const token = await getAccessToken()
        const responseData = await getFeaturedPlaylists({
          accessToken: token,
          limit: 25,
          country: 'VN',
        })

        setData({
          title: 'Feature Playlist',
          href: '/section?featurePlaylist',
          dataType: 'playlist',
          data: responseData,
          apiType: 'spotify',
        })
      } else if (id === 'topMixes') {
        fetchHomePageSectionData({ type: 'topMixes', setData: setData, limit: 50 })
      } else if (id === 'suggestedArtists') {
        fetchHomePageSectionData({
          type: 'suggestedArtists',
          setData: setData,
          limit: 50,
        })
      } else if (featuringRegex.test(pathname)) {
        setData({
          title: `Featuring ${profile?.name}`,
          dataType: 'playlist',
          data: featuring,
          apiType: 'rapid',
        })
      } else if (relatedRegex.test(pathname)) {
        setData({
          title: `Fans also like`,
          dataType: 'artist',
          data: relatedArtists,
          apiType: 'rapid',
        })
      } else if (discoveredOnRegex.test(pathname)) {
        setData({
          title: `Discovered on`,
          dataType: 'playlist',
          data: discoveredOn,
          apiType: 'rapid',
        })
      } else if (playlistsRegex.test(pathname)) {
        setData({
          title: `Artist Playlists`,
          dataType: 'playlist',
          data: playlists,
          apiType: 'rapid',
        })
      }
    }
    fetchData()
  }, [profile])

  return (
    <div className={cx('wrapper')}>
      <Navbar type="section" />
      <div className={cx('body')}>
        <SectionContent
          apiType={data?.apiType}
          isClickable
          isFull
          dataType={data?.dataType}
          title={data?.title}
          data={data?.data}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Section
