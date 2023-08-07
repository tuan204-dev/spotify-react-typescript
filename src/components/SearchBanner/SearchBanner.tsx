import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { SearchContext } from '@/contexts/SearchContext'
import classNames from 'classnames/bind'
import React, { useContext } from 'react'
import BannerItem from './BannerItem/BannerItem'
import styles from './SearchBanner.module.scss'

const cx = classNames.bind(styles)

const SearchBanner: React.FC = () => {
  const { quantityCol } = useContext(MainLayoutContext)
  const { categoriesData } = useContext(SearchContext)

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('heading')}>Browse all</h2>
      <div
        style={{ gridTemplateColumns: `repeat(${quantityCol}, 1fr)` }}
        className={cx('body')}
      >
        {categoriesData?.map((item, index) => (
          <BannerItem
            title={item?.title}
            imgUrl={item?.imgUrl}
            id={item?.id}
            bgColor={item?.bgColor}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(SearchBanner)
