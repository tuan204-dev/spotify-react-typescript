import { Section as SectionContent } from '@/components'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { ArtistContext } from '@/contexts/ArtistContext'
import { HomePageContext } from '@/contexts/HomePageContext'
import classNames from 'classnames/bind'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styles from './Section.module.scss'
import { SectionProps } from '@/types/section'

const cx = classNames.bind(styles)

const Section: React.FC = () => {
  const [data, setData] = useState<SectionProps | undefined>()
  const featuringRegex = /^\/artist\/.*\/featuring$/
  const relatedRegex = /^\/artist\/.*\/related$/
  const playlistsRegex = /^\/artist\/.*\/playlists$/
  const discoveredOnRegex = /^\/artist\/.*\/discovered-on$/
  const appearsOnRegex = /^\/artist\/.*\/appears-on$/

  const { profile, featuring, relatedArtists, discoveredOn, playlists, appearsOn } =
    useContext(ArtistContext)
  const { featurePlaylist, newReleases, suggestArtists, topMixes } =
    useContext(HomePageContext)

  const { id } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      if (id === 'newReleases') {
        setData({
          title: newReleases?.title,
          href: newReleases?.href,
          dataType: newReleases?.dataType,
          data: newReleases?.data,
          apiType: newReleases?.apiType,
        })
      } else if (id === 'featurePlaylist') {
        setData({
          title: featurePlaylist?.title,
          href: featurePlaylist?.href,
          dataType: featurePlaylist?.dataType,
          data: featurePlaylist?.data,
          apiType: featurePlaylist?.apiType,
        })
      } else if (id === 'topMixes') {
        setData({
          title: topMixes?.title,
          href: topMixes?.href,
          dataType: topMixes?.dataType,
          data: topMixes?.data,
          apiType: topMixes?.apiType,
        })
      } else if (id === 'suggestedArtists') {
        setData({
          title: suggestArtists?.title,
          href: suggestArtists?.href,
          dataType: suggestArtists?.dataType,
          data: suggestArtists?.data,
          apiType: suggestArtists?.apiType,
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
      } else if (appearsOnRegex.test(pathname)) {
        setData({
          title: `Appear On`,
          dataType: 'album',
          data: appearsOn,
          apiType: 'rapid',
        })
      }
    }
    fetchData()
  }, [pathname])

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
