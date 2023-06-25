import React, { memo } from 'react'
import styles from './SectionItem.module.scss'
import classNames from 'classnames/bind'
import { SectionItemI } from '../../../types'
import { TbPlayerPlayFilled } from 'react-icons/tb'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const cx = classNames.bind(styles)

const SectionItem: React.FC<SectionItemI> = ({
  title,
  name,
  imageUrl,
  isLoading,
}) => {
  // console.log(title, name, imageUrl)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('img')}>
        {!isLoading ? (
          <>
            <img loading="lazy" src={imageUrl} alt={title || name} />
            <button
              className={cx({
                'play-btn': true,
              })}
            >
              <TbPlayerPlayFilled className={cx('play-btn-child')} />
            </button>
          </>
        ) : (
          <Skeleton height={'100%'} />
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          ) : (
            <Skeleton width={'60%'} height={22.5} borderRadius={50} />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(SectionItem)
