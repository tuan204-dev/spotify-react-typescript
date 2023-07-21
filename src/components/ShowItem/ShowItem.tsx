import { FC } from 'react'
import styles from './ShowItem.module.scss'
import classNames from 'classnames/bind'
import { ShowItem as ShowItemProps } from '../../../types'
import { Image, PlayButton } from '../UIs'
import { dateFormatConvertor } from '@/utils'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface ShowItemComponentProps extends ShowItemProps {
  isLoading?: boolean
}

const ShowItem: FC<ShowItemComponentProps> = ({
  name,
  images,
  description,
  release_date,
  id,
  isLoading,
}) => {
  return (
    <div className={cx('main')}>
      <Link to={`/episode/${id}`}>
        <div className={cx('show-item-wrapper')}>
          <div className={cx('thumb')}>
            {!isLoading ? (
              <Image alt={name} src={images?.[0].url} />
            ) : (
              <Skeleton height={'100%'} width={'100%'} />
            )}
          </div>
          <div className={cx('body')}>
            <div className={cx('title')}>
              {!isLoading ? (
                <h4>{name}</h4>
              ) : (
                <Skeleton
                  style={{ marginTop: '6px' }}
                  height={20}
                  width={'30%'}
                  borderRadius={500}
                />
              )}
            </div>
            <div className={cx('desc')}>
              {!isLoading ? (
                description
              ) : (
                <Skeleton
                  style={{ marginTop: '16px' }}
                  width={'50%'}
                  borderRadius={500}
                />
              )}
            </div>
            {!isLoading && (
              <div className={cx('action')}>
                <div className={cx('play-btn')}>
                  <PlayButton
                    size={32}
                    bgColor="#fff"
                    scaleHovering={1.04}
                    transitionDuration={33}
                  />
                </div>
                <div className={cx('release-date')}>
                  {dateFormatConvertor(release_date)}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ShowItem
