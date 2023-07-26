import logoImage from '@/assets/image/logo/logo.svg'
import { HeaderProps } from '@/types/others'
import { transformDomain } from '@/utils'
import classNames from 'classnames/bind'
import React, { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { Image, SubTitle, ThumbDefault } from '../UIs'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

//Header of Playlist page & Album page

const Header: React.FC<HeaderProps> = ({
  title,
  thumbnail,
  quantity,
  bgColor,
  desc,
  isLoading,
  type,
  artists,
  releaseDate,
  isWhiteColor = false,
  headerType,
  publisher,
  showName,
  showId,
}) => {
  return (
    <main style={{ backgroundColor: `${bgColor}` }} className={cx('wrapper')}>
      <div className={cx({ body: true, show: headerType === 'show' })}>
        <div className={cx('img')}>
          {!isLoading ? (
            thumbnail ? (
              <Image src={thumbnail} alt={title} />
            ) : (
              <ThumbDefault />
            )
          ) : (
            <Skeleton height={'100%'} />
          )}
        </div>
        <div className={cx('content')}>
          {!isLoading ? (
            <>
              {' '}
              <p className={cx('type')}>
                {(type === 'album' && 'Album') ||
                  (type === 'single' && 'Single') ||
                  (type === 'compilation' && 'Compilation') ||
                  (type === 'podcast' && 'Podcast') ||
                  (type === 'episode' && 'Podcast Episode') ||
                  type}
              </p>
              <h2 className={cx('title')}>{title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: desc ? transformDomain(desc) : '' }}
                className={cx('desc')}
              >
                {/* <ArtistList data={htmlCleaner(stringCleaner(desc))} /> */}
              </div>
              {headerType === 'show' ? (
                <Link to={type === 'episode' ? `/show/${showId}` : ''}>
                  <div className={cx({ publisher: true, underline: type === 'episode' })}>
                    <span>{publisher || showName}</span>
                  </div>
                </Link>
              ) : (
                <div className={cx('quantity')}>
                  <div
                    style={{ backgroundImage: `url(${logoImage})` }}
                    className={cx('logo')}
                  ></div>
                  {(type === 'album' || type === 'single' || type === 'compilation') && (
                    <>
                      <div className={cx('artist')}>
                        {<SubTitle isWhiteColor={isWhiteColor} data={artists} />}
                      </div>{' '}
                      <div className={cx('dot')}></div>{' '}
                      <div className={cx('release-date')}>{releaseDate?.slice(0, 4)}</div>
                    </>
                  )}
                  <div className={cx('dot')}></div>
                  <div className={'text'}>{`${quantity || 0} songs`}</div>
                </div>
              )}
            </>
          ) : (
            <div style={{}} className={cx('skeleton')}>
              <Skeleton height={'20px'} width={'70px'} borderRadius={50} />
              <Skeleton height={'50px'} width={'90%'} borderRadius={50} />
            </div>
          )}
        </div>
      </div>
      <div style={{ backgroundColor: `${bgColor}` }} className={cx('bg-blur')}></div>
    </main>
  )
}

export default memo(Header)
