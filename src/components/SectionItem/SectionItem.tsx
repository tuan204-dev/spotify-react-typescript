import { UserImgDefault } from '@/assets/icons'
import { dateFormatConvertor } from '@/utils'
import classNames from 'classnames/bind'
import React, { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
import { Image, PlayButton, SubTitle } from '../UIs'
import styles from './SectionItem.module.scss'
import { SectionItemI } from '@/types/section'

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
  // if(!imageUrl) return

  return (
    <Link to={`/${dataType}/${id}`}>
      <div className={cx('wrapper')}>
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
    </Link>
  )
}

export default memo(SectionItem)
