import { HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongList } from '@/components'
import { useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { fetchSpotifyData, getAccessToken } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { memo, useEffect, useState } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import styles from './Playlist.module.scss'

const cx = classNames.bind(styles)

const Playlist: React.FC = () => {
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const { search } = useLocation()
  const bgColor = useRaiseColorTone(useDominantColor(data?.images[0].url) || '#121212')

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await fetchSpotifyData({
        type: 'playlists',
        accessToken: token,
        id: search.substring(1),
      })
      setData({ ...data })
    }
    if (search !== '?undefined') {
      fetchData()
    }
  }, [search])

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
      return
    }
    setNavOpacity(yAxis / 64)
  }

  console.log(data?.tracks.items)

  return (
    <main className={cx('wrapper')}>
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Header
          type="Playlist"
          desc={data?.description}
          isLoading={isLoading}
          bgColor={bgColor}
          title={data?.name}
          thumbnail={data?.images[0].url}
          quantity={data?.tracks.total}
        />
        <div className={cx('song-list')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('main')}>
            <div className={cx('action-bar')}>
              <button
                className={cx({
                  'play-btn': true,
                })}
              >
                <TbPlayerPlayFilled className={cx('play-btn-child')} />
              </button>
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
