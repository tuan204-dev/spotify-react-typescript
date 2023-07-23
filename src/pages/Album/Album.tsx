import categoryApi from '@/apis/categoryApi'
import { HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, SongList } from '@/components'
import { PlayButton } from '@/components/UIs'
import { useComponentSize, useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { dateFormatConvertor } from '@/utils'
import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'
import styles from './Album.module.scss'

const cx = classNames.bind(styles)

const Album: React.FC = () => {
  const [data, setData] = useState<any>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [navPlayBtnVisible, setNavPlayBtnVisible] = useState<boolean>(false)

  useDocumentTitle(`${data?.name ? data?.name : 'Album'} | Spotify`)

  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
    threshold: 0,
  })

  const bgColor = useRaiseColorTone(useDominantColor(data?.images[0].url))

  const headerRef = useRef<any>()
  const { height: headerHeight } = useComponentSize(headerRef)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await categoryApi({
        type: 'albums',
        id: id,
      })
      if (data?.error) {
        navigate('/not-found')
      } else setData(data)
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
        inclPlayBtn
        playBtnVisible={navPlayBtnVisible}
        title={data?.name}
      />
      <div onScroll={(e) => isTracking && handleScroll(e)} className={cx('body')}>
        <div
          ref={pivotTrackingRef}
          className={cx('pivot-tracking')}
          style={{ top: `${headerHeight + 104}px` }}
        ></div>
        <div ref={headerRef}>
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
        </div>
        <div className={cx('song-list')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('main')}>
            <div className={cx('action-bar')}>
              <PlayButton
                size={56}
                fontSize={24}
                transitionDuration={33}
                scaleHovering={1.05}
              />
              <button className={cx('heart')}>
                <HeartIcon />
              </button>
            </div>
            <SongList
              type="album"
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
