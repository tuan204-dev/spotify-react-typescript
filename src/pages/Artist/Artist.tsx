import {
  AboutArtist,
  Discography,
  Footer,
  Navbar,
  Section,
  TopTracks,
} from '@/components'
import ArtistBanner from '@/components/ArtistBanner/ArtistBanner'
import { PlayButton } from '@/components/UIs'
import { useComponentSize } from '@/hooks'
import { fetchArtistData } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Artist.module.scss'

const cx = classNames.bind(styles)

const Artist: React.FC = () => {
  const [overviewData, setOverViewData] = useState<any>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [bgBannerOpacity, setBgBannerOpacity] = useState<number>(0)
  const [bgBannerScale, setBgBannerScale] = useState<number>(1.05)
  const [navPlayBtnVisible, setNavPlayBtnVisible] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)

  const bannerRef = useRef<any>()

  const { height: bannerHeight } = useComponentSize(bannerRef)

  const { search } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtistData(search.substring(1))
      setOverViewData(data)
    }
    fetchData()
  }, [search])

  useEffect(() => {
    setLoading(Boolean(!overviewData))
  }, [overviewData])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    // console.log(yAxis)
    if (yAxis > bannerHeight / 2) {
      setNavOpacity(1)
      setBgBannerOpacity(1)
      setBgBannerScale(1.2)
    } else {
      setNavOpacity((2 * yAxis) / bannerHeight)
      setBgBannerOpacity((2 * yAxis) / bannerHeight)
      setBgBannerScale(1.05 - 0.05 * ((2 * yAxis) / bannerHeight))
    }

    if (yAxis > 0.6 * bannerHeight) {
      setNavOpacity(1)
    } else setNavOpacity(yAxis / (0.6 * bannerHeight))

    if (yAxis > bannerHeight + 14) {
      setNavPlayBtnVisible(true)
    } else setNavPlayBtnVisible(false)
  }

  return (
    <main className={cx('wrapper')}>
      <Navbar
        type="artist"
        artistName={overviewData?.profile.name}
        playBtnVisible={navPlayBtnVisible}
        navOpacity={navOpacity}
        bgColor={
          overviewData?.visuals?.headerImage?.extractedColors?.colorRaw?.hex ||
          overviewData?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex
        }
      />
      <div
        className={cx('banner-img')}
        style={{
          backgroundImage: `url(${overviewData?.visuals?.headerImage?.sources[0]?.url})`,
          transform: `scale(${bgBannerScale})`,
          height: `${bannerHeight}px`,
          backgroundColor:
            !overviewData?.visuals?.headerImage?.sources[0]?.url &&
            overviewData?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex,
        }}
      ></div>
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: `${bannerHeight}px`,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#121212',
              zIndex: -1,
            }}
          ></div>
          <div
            style={{
              backgroundColor:
                overviewData?.visuals?.headerImage?.extractedColors?.colorRaw?.hex ||
                overviewData?.visuals?.avatarImage?.extractedColors?.colorRaw?.hex,
              top: `${bannerHeight}px`,
            }}
            className={cx('bg-blur')}
          ></div>
          <div ref={bannerRef}>
            <ArtistBanner
              name={overviewData?.profile?.name}
              avatar={overviewData?.visuals?.avatarImage?.sources[0]?.url}
              followerNumber={overviewData?.stats?.followers}
              monthlyListeners={overviewData?.stats.monthlyListeners}
              dominantColor={
                overviewData?.visuals?.headerImage?.extractedColors?.colorRaw?.hex
              }
              bgBannerOpacity={bgBannerOpacity}
              isVerified={overviewData?.profile?.verified}
              isHeaderImg={!!overviewData?.visuals?.headerImage?.sources[0]?.url}
              isLoading={isLoading}
            />
          </div>
          <div className={cx('action-bar')}>
            <PlayButton size={56} transitionDuration={33} scaleHovering={1.005} />
            <button className={cx('follow-btn')}>Follow</button>
          </div>
          <TopTracks
            isLoading={isLoading}
            songList={overviewData?.discography?.topTracks?.items}
          />
          <Discography data={overviewData?.discography} />

          {overviewData?.relatedContent?.featuring?.items.length !== 0 && (
            <Section
              title={`Featuring ${overviewData?.profile?.name}`}
              data={overviewData?.relatedContent?.featuring?.items}
              dataType="playlist"
              isClickable={false}
            />
          )}
          {overviewData?.relatedContent?.relatedArtists?.items.length !== 0 && (
            <Section
              title="Fans also like"
              data={overviewData?.relatedContent?.relatedArtists?.items}
              dataType="artist"
              type="artist"
              isClickable={false}
            />
          )}
          {overviewData?.profile?.playlists?.items?.length !== 0 && (
            <Section
              title="Artist Playlists"
              data={overviewData?.profile?.playlists?.items}
              dataType="playlist"
              isClickable={false}
            />
          )}
          {overviewData?.relatedContent?.discoveredOn?.items?.length !== 0 && (
            <Section
              title="Discovered on"
              data={overviewData?.relatedContent?.discoveredOn?.items}
              dataType="playlist"
              type="artist"
              isClickable={false}
            />
          )}
          {overviewData?.visuals?.headerImage?.sources[0]?.url && (
            <AboutArtist
              stats={overviewData?.stats}
              profile={overviewData?.profile}
              visuals={overviewData?.visuals}
              isLoading={isLoading}
            />
          )}
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default Artist
