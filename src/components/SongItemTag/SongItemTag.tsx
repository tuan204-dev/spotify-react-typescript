import categoryApi from '@/apis/categoryApi'
import { PlayerContext } from '@/contexts/PlayerContext'
import useComponentSize from '@/hooks/useComponentSize'
import useDominantColor from '@/hooks/useDominantColor'
import { SongItemTagProps, SpotifyTrack } from '@/types/track'
import classNames from 'classnames/bind'
import React, { useContext, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import { Image, PlayButton } from '../UIs'
import styles from './SongItemTag.module.scss'
import { SpotifyAlbum } from '@/types/album'

const cx = classNames.bind(styles)

const SongItemTag: React.FC<SongItemTagProps> = (props) => {
  const { thumbnailUrl, name, setBgColor, isLoading, id } = props
  const {
    setCurrentTrack,
    setCurrentTrackIndex,
    setQueue,
    calNextTrackIndex,
    setPlayingType,
  } = useContext(PlayerContext)
  const color = useDominantColor(thumbnailUrl)
  const imgRef = useRef<HTMLDivElement>(null)
  const handleHover = (): void => {
    setBgColor(color)
  }

  const navigate = useNavigate()

  const songTagRef = useRef<HTMLDivElement>(null)

  const { width } = useComponentSize(songTagRef)

  const handleClickPlayBtn = () => {
    const fetchData = async () => {
      const data: SpotifyAlbum = await categoryApi({
        type: 'albums',
        id: id,
      })

      const queueList =
        data?.tracks?.items?.map((item: SpotifyTrack) => {
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
      setQueue([...queueList])
      setCurrentTrack({ ...queueList[0] })
      setCurrentTrackIndex(0)
      calNextTrackIndex()
      setPlayingType('track')
    }
    fetchData()
  }

  return (
    <div
      ref={songTagRef}
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor('#e0e0e0')}
      className={cx('song-item-tag')}
      onClick={() => navigate(`/album/${id}`)}
    >
      <div className={cx('thumbnail')} ref={imgRef}>
        {!isLoading ? (
          // <img src={thumbnailUrl} alt={name} />
          <Image src={thumbnailUrl} alt={name} />
        ) : (
          <Skeleton height={'100%'} />
        )}
      </div>
      <div className={cx('body')}>
        {!isLoading ? (
          <>
            <p className={cx('body-name')}>{name}</p>
            <div
              className={cx({ 'play-btn': true, hidden: width !== -1 && width <= 270 })}
              onClick={(e) => {
                e.stopPropagation()
                handleClickPlayBtn()
              }}
            >
              <PlayButton size={50} scaleHovering={1.1} transitionDuration={33} />
            </div>
          </>
        ) : (
          <Skeleton
            height={26}
            borderRadius={50}
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              paddingInline: '16px',
              marginTop: '-7px',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SongItemTag
