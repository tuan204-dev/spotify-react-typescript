import { getArtistAlbums } from '@/apis/artistApi'
import categoryApi from '@/apis/categoryApi'
import { HeartIcon } from '@/assets/icons'
import { Footer, Header, Navbar, Section, SongList } from '@/components'
import { PlayButton } from '@/components/UIs'
import { PlayerContext } from '@/contexts/PlayerContext'
import { useComponentSize, useRaiseColorTone } from '@/hooks'
import useDominantColor from '@/hooks/useDominantColor'
import { SpotifyAlbum } from '@/types/album'
import { dateFormatConvertor, documentTitle } from '@/utils'
import classNames from 'classnames/bind'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Album.module.scss'
import { ResponseSectionItem } from '@/types/section'

const cx = classNames.bind(styles)

const Album: React.FC = () => {
  const {
    setCurrentTrack,
    setQueue,
    setCurrentTrackIndex,
    calNextTrackIndex,
    setPlayingType,
    isPlaying,
    prevDocumentTitle,
  } = useContext(PlayerContext)
  const [data, setData] = useState<SpotifyAlbum>()
  const [navOpacity, setNavOpacity] = useState<number>(0)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [navPlayBtnVisible, setNavPlayBtnVisible] = useState<boolean>(false)
  const [artistAlbums, setArtistAlbums] = useState<SpotifyAlbum[]>()

  useEffect(() => {
    if (isPlaying) {
      prevDocumentTitle.current = `${data?.name ? data?.name : 'Album'} | Spotify`
    } else {
      documentTitle(`${data?.name ? data?.name : 'Album'} | Spotify`)
    }
  }, [isPlaying, data])

  const { ref: pivotTrackingRef, inView: isTracking } = useInView({
    threshold: 0,
  })

  const bgColor = useRaiseColorTone(useDominantColor(data?.images?.[0].url))

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
    const fetchArtistAlbum = async () => {
      const artistAlbums = await getArtistAlbums(data?.artists?.[0]?.id)
      if (artistAlbums?.items?.length && artistAlbums?.items?.length !== 0) {
        setArtistAlbums([...artistAlbums.items])
      }
    }
    fetchArtistAlbum()
  }, [data?.artists?.[0]?.id])

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

  const handleClickPlayBtn = () => {
    const queueList =
      data?.tracks?.items?.map((item) => {
        return {
          ...item,
          album: {
            images: data?.images,
            id: data?.id,
            album_type: data?.album_type,
            name: data?.name,
          },
        }
      }) || []
    setQueue(queueList)
    setCurrentTrack(queueList[0])
    setCurrentTrackIndex(0)
    setPlayingType('track')
    calNextTrackIndex()
  }
  console.log(data)
  console.log(artistAlbums)

  return (
    <main className={cx('wrapper')}>
      <Navbar
        navOpacity={navOpacity}
        bgColor={bgColor}
        inclPlayBtn
        playBtnVisible={navPlayBtnVisible}
        title={data?.name}
        handleClickPlayBtn={handleClickPlayBtn}
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
            thumbnail={data?.images?.[0].url}
            quantity={data?.tracks?.total}
            isLoading={isLoading}
            isWhiteColor
          />
        </div>
        <div className={cx('song-list')}>
          <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
          <div className={cx('main')}>
            <div className={cx('action-bar')}>
              <div onClick={() => handleClickPlayBtn()}>
                <PlayButton
                  size={56}
                  fontSize={24}
                  transitionDuration={33}
                  scaleHovering={1.05}
                />
              </div>
              <button className={cx('heart')}>
                <HeartIcon />
              </button>
            </div>
            <SongList
              type="album"
              top={0}
              pivotTop={64}
              songList={data?.tracks?.items || []}
              isLoading={isLoading}
              albumId={data?.id}
              albumImages={data?.images}
              albumName={data?.name}
              albumType={data?.album_type}
            />
          </div>
        </div>

        <div className={cx('copy-rights')}>
          <p className={cx('date')}>{dateFormatConvertor(data?.release_date)}</p>
          {data?.copyrights?.map((item, index: number) => (
            <p key={index}>
              {item?.text?.replace(/\(C\)|\(P\)/g, (match) => {
                return match === '(C)' ? '©' : '℗'
              })}
            </p>
          ))}
        </div>
        <div className={cx('artist-albums')}>
          <Section
            apiType="spotify"
            data={
              artistAlbums?.filter((album: SpotifyAlbum) => album?.id !== data?.id) as
                | ResponseSectionItem[]
                | undefined
            }
            dataType="album"
            isClickable={false}
            title={`More by ${data?.artists?.[0]?.name}`}
            type="album"
          />
          <Footer />
        </div>
      </div>
    </main>
  )
}

export default Album
