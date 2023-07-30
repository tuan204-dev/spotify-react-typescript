import episodeApi from '@/apis/episodeApi'
import { Footer, Header, Navbar } from '@/components'
import { useDominantColor, useEllipsisVertical } from '@/hooks'
import classNames from 'classnames/bind'
import { FC, useEffect, useRef, useState, useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link, useParams } from 'react-router-dom'
import { Episode as EpisodeData } from '@/types/show'
import styles from './Episode.module.scss'
import { PlayButton } from '@/components/UIs'
import { dateFormatConvertor } from '@/utils'
import durationConvertor from '@/utils/durationConvertor'
import { PlusCircle } from '@/assets/icons'
import { CurrentTrack, PlayerContext } from '@/contexts/PlayerContext'

const cx = classNames.bind(styles)

const Episode: FC = () => {
  const {
    setQueue,
    setCurrentTrack,
    setCurrentTrackIndex,
    setPlayingType,
    calNextTrackIndex,
    currentTrack
  } = useContext(PlayerContext)
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [data, setData] = useState<EpisodeData>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isExpanded, setExpanded] = useState<boolean>(false)
  const { ref: pivotTrackingRef, inView: isTracking } = useInView() //put above all

  const bgColor = useDominantColor(data?.images?.[0].url) || '#121212'

  const { id } = useParams()

  const headerRef = useRef<any>()
  const descRef = useRef<any>()

  const isEllipsisActive = useEllipsisVertical(descRef.current)

  useEffect(() => {
    const fetchData = async () => {
      const data = await episodeApi({ id })
      setData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setLoading(Boolean(!data))
  }, [data])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis > 64) {
      setNavOpacity(1)
    } else setNavOpacity(yAxis / 64)
  }

  const handleClickPlayBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (currentTrack?.id === data?.id) return
    setQueue([{ ...(data as CurrentTrack) }])
    setCurrentTrack({ ...data })
    setCurrentTrackIndex(0)
    setPlayingType('show')
    calNextTrackIndex()
  }

  return (
    <main className={cx('episode-wrapper')}>
      <Navbar bgColor={bgColor} navOpacity={navOpacity} />
      <div className={cx('body')} onScroll={(e) => isTracking && handleScroll(e)}>
        <div
          ref={pivotTrackingRef}
          className={cx('pivot-tracking')}
          style={{ top: `${64}px` }}
        ></div>
        <div ref={headerRef}>
          <Header
            type="episode"
            headerType="show"
            title={data?.name}
            thumbnail={data?.images?.[0]?.url}
            bgColor={bgColor}
            showName={data?.show?.name}
            showId={data?.show?.id}
            isLoading={isLoading}
          />
        </div>
        <div className={cx('main')}>
          <div style={{ backgroundColor: bgColor }} className={cx('bg-blur')}></div>
          <div className={cx('action-bar')}>
            <div className={cx('top')}>
              <span>{dateFormatConvertor(data?.release_date)}</span>
              <div className={cx('dot')}></div>
              <span ref={descRef}>
                {durationConvertor({ milliseconds: data?.duration_ms, type: 'long' })}
              </span>
            </div>
            <div className={cx('bottom')}>
              <div onClick={handleClickPlayBtn} className={cx('play-btn')}>
                <PlayButton size={56} scaleHovering={1.04} transitionDuration={33} />
              </div>
              <div className={cx('plus-btn')}>
                <PlusCircle />
              </div>
            </div>
          </div>
          <div className={cx('content')}>
            <h2 className={cx('title')}>Episode Description</h2>
            <div className={cx({ desc: true, expanded: !isExpanded })}>
              <span
                dangerouslySetInnerHTML={{ __html: data?.html_description as string }}
              ></span>
            </div>
            {isEllipsisActive && (
              <div className={cx('expand-btn')}>
                <button onClick={() => setExpanded((prev) => !prev)}>
                  {isExpanded ? 'Show less' : '... Show more'}
                </button>
              </div>
            )}
          </div>
          <Link to={`/show/${data?.show?.id}`}>
            <div className={cx('see-all-btn')}>
              <button>See all episode</button>
            </div>
          </Link>
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default Episode
