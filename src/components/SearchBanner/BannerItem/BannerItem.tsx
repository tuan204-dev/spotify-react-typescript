import { useColorGenerator } from '@/hooks'
import { SearchBannerItem } from '@/types/search'
import classNames from 'classnames/bind'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import styles from './BannerItem.module.scss'

const cx = classNames.bind(styles)

const BannerItem: React.FC<SearchBannerItem> = ({ title, imageUrl, id }) => {
  const bgColor = useColorGenerator({ min: 0, max: 200 })

  return (
    <Link className={cx('main')} to={`/genre/${id}`}>
      <div style={{ backgroundColor: `${bgColor}` }} className={cx('wrapper')}>
        <h4 className={cx('title')}>{title}</h4>
        <div className={cx('img')}>
          <LazyLoadImage effect="blur" src={imageUrl} alt={title} />
        </div>
      </div>
    </Link>
  )
}

export default BannerItem
