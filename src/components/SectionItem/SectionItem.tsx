import { getArtistTopTrack } from '@/apis/artistApi'
import categoryApi from '@/apis/categoryApi'
import { UserImgDefault } from '@/assets/icons'
import { PlayerContext } from '@/contexts/PlayerContext'
import { SectionItemI } from '@/types/section'
import { SpotifyTrack } from '@/types/track'
import { dateFormatConvertor } from '@/utils'
import classNames from 'classnames/bind'
import React, { memo, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom'
import { Image, PlayButton, SubTitle } from '../UIs'
import styles from './SectionItem.module.scss'

const cx = classNames.bind(styles)

const SectionItem: React.FC<SectionItemI> = ({
  title,
  name,
  imageUrl,
  id,
  dataType,
  author,
  artists,
  desc,
  isLoading,
  publisher,
  dateAdd,
  type,
}) => {
  const { setCurrentTrack, setCurrentTrackIndex, setQueue, calNextTrackIndex } =
    useContext(PlayerContext)

  const navigate = useNavigate()
  const handleClickPlayBtn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (dataType === 'album' || dataType === 'playlist') {
      const fetchData = async () => {
        const data = await categoryApi({
          type: `${dataType}s`,
          id,
        })
        setQueue(
          dataType === 'playlist'
            ? data?.tracks?.items?.map((item: any) => item?.track)
            : data?.tracks?.items?.map((item: SpotifyTrack) => {
                return {
                  ...item,
                  album: {
                    album_type: data?.album_type,
                    id: data?.name,
                    name: data?.name,
                    images: data?.images,
                  },
                }
              })
        )
        setCurrentTrack(
          dataType === 'playlist'
            ? data?.tracks?.items?.[0]?.track
            : {
                ...data?.tracks?.items?.[0],
                album: {
                  album_type: data?.album_type,
                  id: data?.name,
                  name: data?.name,
                  images: data?.images,
                },
              }
        )
        setCurrentTrackIndex(0)
        calNextTrackIndex()
      }
      fetchData()
    } else if (dataType === 'artist') {
      const fetchData = async () => {
        const data = await getArtistTopTrack(id)
        setQueue(data?.tracks)
        setCurrentTrack(data?.tracks?.[0])
        setCurrentTrackIndex(0)
        calNextTrackIndex()
      }
      fetchData()
    }
  }

  return (
    <div onClick={() => navigate(`/${dataType}/${id}`)} className={cx('wrapper')}>
      <div className={cx({ img: true, isArtist: dataType === 'artist' })}>
        {!isLoading ? (
          dataType === 'artist' ? (
            imageUrl ? (
              <Image src={imageUrl} alt={title || name} />
            ) : (
              <div className={cx('user-img-default')}>
                <UserImgDefault />
              </div>
            )
          ) : (
            <Image src={imageUrl} alt={title || name} />
          )
        ) : (
          <Skeleton height={'100%'} />
        )}
      </div>
      <div className={cx('btn-pivot')}>
        {!isLoading && (
          <div
            className={cx({
              'play-btn': true,
            })}
            onClick={handleClickPlayBtn}
          >
            <PlayButton
              size={50}
              fontSize={24}
              scaleHovering={1.05}
              transitionDuration={33}
            />
          </div>
        )}
      </div>
      <div className={cx('body')}>
        {!isLoading ? (
          <h3 className={cx('heading')}>{title || name}</h3>
        ) : (
          <Skeleton height={30} borderRadius={50} />
        )}
        <div className={cx('desc')}>
          {!isLoading ? (
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (type === 'show' && publisher) ||
                  (dataType === 'episode' && dateFormatConvertor(dateAdd)) ||
                  desc ||
                  (author && `By ${author}`) ||
                  (dataType === 'artist' && 'Artist') ||
                  (artists && <SubTitle data={artists} />) ||
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
              }}
            ></p>
          ) : (
            <Skeleton width={'60%'} height={22.5} borderRadius={50} />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(SectionItem)
