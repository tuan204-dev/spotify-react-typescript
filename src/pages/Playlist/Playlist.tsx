import { HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongList } from '@/components'
import { PlayButton } from '@/components/UIs'
import { useComponentSize, useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { fetchSpotifyData, getAccessToken } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { memo, useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Playlist.module.scss'
import { useDocumentTitle } from 'usehooks-ts'

const cx = classNames.bind(styles)

const Playlist: React.FC = () => {
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [navPlayBtnVisible, setNavPlayBtnVisible] = useState<boolean>(false)

  const bgColor = useRaiseColorTone(useDominantColor(data?.images[0].url) || '#121212')

  useDocumentTitle(`${data?.name ? data?.name : 'Playlist'} | Spotify Playlist`)

  const headerRef = useRef<any>()
  const { height: headerHeight } = useComponentSize(headerRef)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await fetchSpotifyData({
        type: 'playlists',
        accessToken: token,
        id: id,
      })
      if (data?.error) {
        navigate('/not-found')
      } else {
        setData({ ...data })
      }
    }
    if (id !== 'undefined') {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
    } else setNavOpacity(yAxis / 64)
    if (yAxis > headerHeight + 14) {
      setNavPlayBtnVisible(true)
    } else setNavPlayBtnVisible(false)
  }

  return (
    <main className={cx('wrapper')}>
      <Navbar
        navOpacity={navOpacity}
        bgColor={bgColor}
        playBtnVisible={navPlayBtnVisible}
        inclPlayBtn
        title={data?.name}
      />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <div ref={headerRef}>
          <Header
            type="Playlist"
            desc={data?.description}
            isLoading={isLoading}
            bgColor={bgColor}
            title={data?.name}
            thumbnail={data?.images[0].url}
            quantity={data?.tracks.total}
          />
        </div>
        <div className={cx('song-list')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('main')}>
            <div className={cx('action-bar')}>
              <PlayButton
                size={56}
                fontSize={24}
                scaleHovering={1.005}
                transitionDuration={33}
              />
              <button className={cx('heart')}>
                <HeartIcon />
              </button>
            </div>
            <SongList
              isLoading={isLoading}
              top={0}
              pivotTop={64}
              songList={data?.tracks.items}
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default memo(Playlist)
