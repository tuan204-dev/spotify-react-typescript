import { ClockIcon, HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongItem, SongList } from '@/components'
import { useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { convertDateFormat } from '@/utils'
import { fetchSpotifyData, getAccessToken } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { useInView } from 'react-intersection-observer'
import { useLocation } from 'react-router-dom'
import styles from './Album.module.scss'

const cx = classNames.bind(styles)

const Album: React.FC = () => {
  const [data, setData] = useState<any>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(true)

  const bgColor = useRaiseColorTone(useDominantColor(data?.images[0].url))

  const { search } = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      const data = await fetchSpotifyData({
        accessToken: token,
        type: 'albums',
        id: search.substring(1),
      })
      setData(data)
    }
    if (search !== '?undefined') {
      fetchData()
    }
  }, [search])

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

  // const { ref, inView } = useInView({
  //   threshold: 0,
  // })

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
              top={0}
              pivotTop={64}
              songList={data?.tracks.items}
              isLoading={isLoading}
              isAlbumTrack
            />
          </div>
        </div>

        <div className={cx('copy-rights')}>
          <p className={cx('date')}>{convertDateFormat(data?.release_date)}</p>
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
