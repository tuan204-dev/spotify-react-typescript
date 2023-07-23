import React from 'react'
import styles from './BannerItem.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SearchBannerItem } from '@/types/search'

const cx = classNames.bind(styles)

const BannerItem: React.FC<SearchBannerItem> = ({
  title,
  imageUrl,
  bgColor,
}) => {
  return (
    <Link className={cx('main')} to="/">
      <div
        style={{ backgroundColor: `${bgColor}` }}
        className={cx('wrapper')}
      >
        <h4 className={cx('title')}>{title}</h4>
        <div className={cx('img')}>
          <LazyLoadImage effect="blur" src={imageUrl} alt={title} />
        </div>
      </div>
    </Link>
  )
}

export default BannerItem
