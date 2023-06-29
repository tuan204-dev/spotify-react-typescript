import { ClockIcon, HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongItem } from '@/components'
import { useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { convertDateFormat } from '@/utils/convertDateFormat'
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

  const { ref, inView } = useInView({
    threshold: 0,
  })

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

  console.log(data)

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
          <div
            style={{ backgroundColor: `${bgColor}` }}
            className={cx('bg-blur')}
          ></div>
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

            <div className={cx('list')}>
              <div
                ref={ref}
                style={{
                  position: 'absolute',
                  top: '-64px',
                  zIndex: '-9',
                }}
              ></div>
              <div
                className={cx({ 'freeze-top-row': true, stuck: !inView })}
              >
                <div>#</div>
                <div>Title</div>
                <div className={cx('clock-icon')}>
                  <ClockIcon />
                </div>
              </div>
              <div className={cx('songs')}>
                {/* <SongItem isExplicit={true} isAlbumTrack songName='Song names'artist='MCK' duration={0} order={1} /> */}
                {(() => {
                  // console.log(data?.tracks.items, isLoading)
                  let order = 1
                  if (!isLoading) {
                    // console.log('im here')
                    return data?.tracks.items.map(
                      (item: any, index: number) => {
                        return (
                          <SongItem
                            key={index}
                            isExplicit={item?.explicit}
                            isAlbumTrack
                            isLoading={isLoading}
                            songName={item?.name}
                            artists={item?.artists}
                            order={order++}
                            duration={item?.duration_ms}
                          />
                        )
                      }
                    )
                  } else {
                    return Array(9)
                      .fill(0)
                      .map((item, index) => (
                        <SongItem
                          isLoading={isLoading}
                          key={item + index}
                        />
                      ))
                  }
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className={cx('copy-rights')}>
          <p className={cx('date')}>
            {convertDateFormat(data?.release_date)}
          </p>
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
