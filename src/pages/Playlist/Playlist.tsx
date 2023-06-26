import { ClockIcon, HeartIcon } from '@/assets/icons'
import Header from '@/components/Header/Header'
import Navbar from '@/components/Navbar/Navbar'
import SongItem from '@/components/SongItem/SongItem'
import useDominantColor from '@/hooks/useDominantColor'
import { fetchPlaylist } from '@/utils/fetchData'
import classNames from 'classnames/bind'
import React, { useEffect, useState, useRef } from 'react'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import styles from './Playlist.module.scss'

const cx = classNames.bind(styles)

const Playlist: React.FC = () => {
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const { search } = useLocation()
  const bgColor = useDominantColor(data?.track_details.pimg)

  const divRef = useRef<any>(null)


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlaylist(search.substring(1))
      setData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

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

  

  return (
    <main className={cx('wrapper')}>
      <Navbar navOpacity={navOpacity} bgColor={bgColor} />
      <div onScroll={(e) => handleScroll(e)} className={cx('body')}>
        <Header
          isLoading={isLoading}
          bgColor={bgColor}
          title={data?.track_details.pname}
          thumbnail={data?.track_details.pimg}
          quantity={data?.track_details.count}
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
              <div ref={divRef} id="freeze-top-row" className={cx('freeze-top-row')}>
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Date added</div>
                <div className={cx('clock-icon')}>
                  <ClockIcon />
                </div>
              </div>
              <div className={cx('songs')}>
                {(() => {
                  if (!isLoading) {
                    const output = []
                    for (let i = 0; i < data?.track_details.count; i++) {
                      output.push(
                        <SongItem
                          key={i}
                          songName={data?.track_details[`${i}`].song_name}
                          artist={data?.track_details[`${i}`].artist}
                          thumb={data?.track_details[`${i}`].thumb}
                          duration={data?.track_details[`${i}`].duration}
                          order={i + 1}
                        />
                      )
                    }
                    return output
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
      </div>
    </main>
  )
}

export default Playlist
