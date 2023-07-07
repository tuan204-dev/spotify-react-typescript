import { HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongList } from '@/components'
import { PlayButton } from '@/components/UIs'
import { useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { dateFormatConvertor } from '@/utils'
import { fetchSpotifyData, getAccessToken } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Album.module.scss'

const cx = classNames.bind(styles)

const Album: React.FC = () => {
  const [data, setData] = useState<any>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(true)

  const bgColor = useRaiseColorTone(useDominantColor(data?.images[0].url))

  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await fetchSpotifyData({
        accessToken: token,
        type: 'albums',
        id: search.substring(1),
      })
      if (data?.error) {
        navigate('/not-found')
      } else setData(data)
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

  return (
    <main className={cx('wrapper')}>
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Header
          type={data?.album_type}
          artists={data?.artists}
          releaseDate={data?.release_date}
          desc={data?.description}
          bgColor={bgColor}
          title={data?.name}
          thumbnail={data?.images[0].url}
          quantity={data?.tracks.total}
          isLoading={isLoading}
          isWhiteColor
        />
        <div className={cx('song-list')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('main')}>
            <div className={cx('action-bar')}>
              <PlayButton
                size={56}
                fontSize={24}
                transitionDuration={33}
                scaleHovering={1.005}
              />
              <button className={cx('heart')}>
                <HeartIcon />
              </button>
            </div>
            <SongList
              type='album'
              top={0}
              pivotTop={64}
              songList={data?.tracks.items}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className={cx('copy-rights')}>
          <p className={cx('date')}>{dateFormatConvertor(data?.release_date)}</p>
          {data?.copyrights.map((item: any, index: number) => (
            <p key={index}>
              {item.text.replace(/\(C\)|\(P\)/g, (match: any) => {
                return match === '(C)' ? '©' : '℗'
              })}
            </p>
          ))}
        </div>

        <Footer />
      </div>
    </main>
  )
}

export default Album
