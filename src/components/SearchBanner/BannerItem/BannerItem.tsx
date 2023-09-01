import { Image } from '@/components/UIs'
import { SearchBannerItem } from '@/types/search'
import classNames from 'classnames/bind'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BannerItem.module.scss'

const cx = classNames.bind(styles)

const BannerItem: React.FC<SearchBannerItem> = ({ title, imgUrl, id, bgColor }) => {
  return (
    <Link className={cx('main')} to={`/genre/${id}`}>
      <div style={{ backgroundColor: `${bgColor}` }} className={cx('wrapper')}>
        <div className={cx('title')}>
          <h4
            className={cx('title-text')}
            dangerouslySetInnerHTML={{ __html: title as string }}
          ></h4>
        </div>
        <div className={cx('img')}>
          <Image alt={title} colorRaw={bgColor} inclSkeleton={false} src={imgUrl} />
        </div>
      </div>
    </Link>
  )
}

export default BannerItem
