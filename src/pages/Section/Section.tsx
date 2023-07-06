import { Section as SectionContent } from '@/components'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { getAccessToken, getFeaturedPlaylists, getNewReleases } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ResponseSectionItem } from '../../../types'
import styles from './Section.module.scss'
import { fetchHomePageSectionData } from '@/utils'

const cx = classNames.bind(styles)

export interface SectionData {
  title?: string
  href?: string
  dataType?: string
  data?: ResponseSectionItem[]
}

const Section: React.FC = () => {
  const [data, setData] = useState<SectionData>({})

  const { search } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      if (search === '?newReleases') {
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
        })
      } else if (search === '?featurePlaylist') {
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
        })
      } else if (search === '?topMixes') {
        fetchHomePageSectionData({ type: 'topMixes', setData: setData, limit: 50 })
      } else if (search === '?suggestedArtists') {
        fetchHomePageSectionData({
          type: 'suggestedArtists',
          setData: setData,
          limit: 50,
        })
      }
    }
    fetchData()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <Navbar type='section' />
      <div className={cx('body')}>
        <SectionContent
          isClickable
          isFull
          dataType={data.dataType}
          title={data.title}
          data={data.data}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Section
